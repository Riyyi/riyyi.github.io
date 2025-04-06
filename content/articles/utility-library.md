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

This is a simple argument parsing feature, with the attempt of making it simpler
to use than getopt. All you have to do is specify the variables you want to use,
then add the options and arguments on the `ArgParser` object and finally call
the `parse` function.

```cpp
#include <string>
#include <vector>

#include "ruc/argparser.h"

int main(int argc, const char* argv[])
{
	bool verbose = false;
	std::vector<std::string> targets {};

	ruc::ArgParser argParser;
	argParser.addOption(verbose, 'v', "verbose", nullptr, nullptr);
	argParser.addArgument(targets, "targets", nullptr, nullptr, ruc::ArgParser::Required::No);
	argParser.parse(argc, argv);

	// Do some work here..

	return 0;
}
```

The `nullptr`'s in the above example were going to be used for automatic help
string generation, but that isn't implemented yet.

## Formatting library

This is basically a partial copy of the `fmt` library, from before that became
part of the C++20 standard and I didn't want to use an additional dependency in
my projects, because that is less fun!

The part of `fmt` that is implement is the
"[mini-language](https://fmt.dev/11.1/syntax/#format-specification-mini-language)",
which is a very convenient API.

```cpp
#include <string>

#include "ruc/format/format.h"
#include "ruc/format/print.h"

int main(int argc, const char* argv[])
{
	std::string fmt = format(
		R"(
	number {}
	string {}
	bool {}j
	double {}
	double {:.2} with 2 precision
)", 123, "this is a string", true, 456.789, 3.14159265359);
	print("{}\n", fmt);

	return 0;
}
```

Which results the the output.

```
	number 123
	string this is a string
	bool true
	double 456.789000
	double 3.14 with 2 precision
```

The implementation consists of 2 major parts, the parsing of the format string
and the `format` and `print` functions. The parsing part isn't that complex, so
wont be discussed here. The other secion is interesting, however.

The functions are implemented with variadic arguments using type erasure, this
improves both compile time and binary size significantly. What it also does, is
allow the library to work on types that are specified by the user and are
therefor not part of the library.

The formatter implements all the primitives and some of the STL types, it can be
extended by the user. The basic use-case is to specify to just the `format`
function, but the `parser` function can also be overwritten.

```cpp
// In the header we are extending the existing formatter for vectors,
// so we take advantage of their nice formatting automatically
template<>
struct ruc::format::Formatter<glm::vec4> : Formatter<std::vector<float>> {
	void format(Builder& builder, glm::vec4 value) const;
};

// Then in the implementation, we implement the format functon
void ruc::format::Formatter<glm::vec4>::format(Builder& builder, glm::vec4 value) const
{
	return Formatter<std::vector<float>>::format(builder, { value.x, value.y, value.z, value.w });
}
```

Users can even extend formatters based on their own formats. In this example we
are extending the vector (`glm::vec4`) formatter, so we can also print matrices
(`glm::mat4`).

```cpp
template<>
struct ruc::format::Formatter<glm::mat4> : Formatter<glm::vec4> {
	void format(Builder& builder, glm::mat4 value) const;
};

void ruc::format::Formatter<glm::mat4>::format(Builder& builder, glm::mat4 value) const
{
	builder.putString("mat4 ");
	Formatter<glm::vec4>::format(builder, value[0]);
	builder.putString("\n     ");
	Formatter<glm::vec4>::format(builder, value[1]);
	builder.putString("\n     ");
	Formatter<glm::vec4>::format(builder, value[2]);
	builder.putString("\n     ");
	return Formatter<glm::vec4>::format(builder, value[3]);
}
```

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
