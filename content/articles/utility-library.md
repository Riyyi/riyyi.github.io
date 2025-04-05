---
title: "Utility Library"
description: "Utility library."
navigation: true
date: "2022-08-17"
img: "/img/ruc-example-unit-test.png"
tags:
  - C++20
  - CMake
  - Software
---

<small>Utility library.<br>
Repository at
[GitHub](https://github.com/riyyi/ruc){target="_blank"},
[GitLab](https://gitlab.com/riyyi/ruc){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/ruc){target="_blank"}.
</small>

C++20 utility library without any dependencies, using build tool CMake.

This is an attempt at deduplicating all the commonly used functionality across
my projects and create one cohesive style.

## Argument parsing

placeholder

## Formatting library

placeholder

## JSON parsing

This is a full implementation of the JSON
[RFC 7159](https://datatracker.ietf.org/doc/html/rfc7159)
specification. Created mostly
for fun, but also for the convenient API.

First, lets specify some JSON that we want to parse.

```js
{
	"window": {
		"title": "Inferno",
		"width": 1280
		"height": 720,
		"fullscreen": "windowed",
		"vsync": false,
	}
}
```

Then, define the structs the JSON will get serialized into.
```cpp
struct WindowProperties {
    std::string title { "Inferno" };
    uint32_t width { 1280 };
    uint32_t height { 720 };
    std::string fullscreen { "borderless" };
    bool vsync { true };
};

struct SettingsProperties {
    WindowProperties window;
};
```

To deserialize the JSON into the struct defined above, we first need to read the
contents of the JSON file. Then we call the parse function on it, which will
return an instance of the base class of the JSON library. Calling the get
function on this instance will try to convert it to the specified type, using
user-declared conversion functions, more on this later.

```cpp
ruc::Json object = ruc::Json::parse(ruc::File("assets/settings.json").data());

if (object.type() != ruc::Json::Type::Object) {
    ruc::warn("Settings invalid formatting");
    return false;
}

SettingsProperties properties = object.get<SettingsProperties>();
```

Serializing back into JSON is simple: just create an instance of the JSON base
class, whose constructor takes in any type. After, call the dump function on it.

```cpp
ruc::Json object = properties;

auto file = ruc::File("assets/settings.json");
file.clear();
file.append(object.dump(1, '\t'));
file.append("\n");
file.flush();
```

So how does this work, how are the JSON objects mapped to the C++ instances? The
library is using a [clever
trick](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4381.html){target="_blank"}
with Argument-Dependent Lookup (ADL). "Lookup" refers to name lookup, which is
the process a C++ compiler uses to resolve identifiers to their declarations. We
let the compiler search for a function of a specific shape, anywhere in the
project, that allows the library to find functions declared by the user of that
library! What this effectively means is that all a user has to do is declare a
`to` and `from` conversion function anywhere in his project and these will get
used automatically by the library.

Below the implementation of the window settings.

```cpp
void fromJson(const ruc::Json& object, WindowProperties& window)
{
	VERIFY(object.type() == ruc::Json::Type::Object);

	if (object.exists("title"))
		object.at("title").getTo(window.title);
	if (object.exists("width"))
		object.at("width").getTo(window.width);
	if (object.exists("height"))
		object.at("height").getTo(window.height);
	if (object.exists("fullscreen"))
		object.at("fullscreen").getTo(window.fullscreen);
	if (object.exists("vsync"))
		object.at("vsync").getTo(window.vsync);
}

void toJson(ruc::Json& object, const WindowProperties& window)
{
	object = ruc::Json {
		{ "title", window.title },
		{ "width", window.width },
		{ "height", window.height },
		{ "fullscreen", window.fullscreen },
		{ "vsync", window.vsync },
	};
}

void fromJson(const ruc::Json& object, SettingsProperties& settings)
{
	VERIFY(object.type() == ruc::Json::Type::Object);

	if (object.exists("window"))
		object.at("window").getTo(settings.window);
}

void toJson(ruc::Json& object, const SettingsProperties& settings)
{
	object = ruc::Json {
		{ "window", settings.window }
	};
}
```

## Unit test macros

These are some macros to quickly setup a unit test. The usage is made very
simple, as there is no need to setup a main function entrypoint.

To accomplish this, the macro has a trick to declare the unit test inside of a
struct and that also has a static variable of that struct type. Because its
static it will get allocated on program startup and in the constructor of the
struct it will register the unit test function in the `TestSuite` class.

What this effectively means, is that after the CMake configuration is setup, all
a user has to do is create a `.cpp` file and put a test inside of it with the
`TEST_CASE` macro.

```cpp
#include "macro.h"
#include "testcase.h"
#include "testsuite.h"

TEST_CASE(ExampleUnitTest)
{
    // Test a boolean value
    EXPECT(true);
}

TEST_CASE(ExampleUnitTestTrue)
{
    // Test 2 values, true
    int leftside = 3;
    int rightside = 3;
    EXPECT_EQ(leftside, rightside);
}

TEST_CASE(ExampleUnitTestFalse)
{
    // Test 2 values, false
    int leftside = 3;
    int rightside = 5;
    EXPECT_EQ(leftside, rightside);
}
```

Output of the testcases above:

![example unit test](/img/ruc-example-unit-test.png "example unit test")
