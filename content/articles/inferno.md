---
title: "Inferno"
description: "An open-source game engine."
navigation: true
date: "2019-12-10"
img: "/img/inferno/preview.png"
tags:
  - C++20
  - GLSL
  - Lua
  - CMake
  - Software
---

<small>An open-source game engine.<br>
Repository at
[GitHub](https://github.com/riyyi/inferno){target="_blank"},
[GitLab](https://gitlab.com/riyyi/inferno){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/inferno){target="_blank"}.
</small>

Video games have always been a hobby of mine, but what if I could combine my
profession with this hobby? Then you get this project, a game engine!

This open-source game engine is written in C++20, GLSL and Lua with the
libraries EnTT, glad, GLFW, GLM, sol3 and stb, using the build tool CMake.

## Abstractions

Making a game engine is not an easy task, if the project has any chance of
success it needs a solid foundation. Therefor, the main focus of the project
thus far has been to work on solid, easy-to-use abstractions. The additional
benefit of this approach is that I learned a lot about software design in the
process.

### Events

The library used for window and context creation and receiving input is GLFW,
this is abstracted away in a "Window" wrapper class. This "Window" is created in
the "Application" class, which also binds the callback function for event
handling.

```cpp
// Make it more readable
#define NF_BIND_EVENT(f) std::bind(&f, this, std::placeholders::_1)

m_window = std::make_unique<Window>();
m_window->setEventCallback(NF_BIND_EVENT(Application::onEvent));
```

The event callback is stored in a std::function.

```cpp
inline void setEventCallback(const std::function<void(Event&)>& callback) { m_eventCallback = callback; }
```

Inside the "Window" wrapper, we first associate the wrapper to the internal "GLFWwindow" object.
```cpp
glfwSetWindowUserPointer(m_window, this);
```

Then, it can set the appropriate callback functions. In this example, we set the
position of the mouse. It gets the "Window" wrapper from the association, then
creates an event object, which is passed on to the callback function.

```cpp
// Mouse position callback
glfwSetCursorPosCallback(m_window, [](GLFWwindow* window, double xPos, double yPos) {
	Window& w = *(Window*)glfwGetWindowUserPointer(window);

	MousePositionEvent event(xPos, yPos);
	w.m_eventCallback(event);
});
```

All we have to do to handle these incoming events is create an event dispatcher
and call dispatch. The dispatcher simply checks if the current event is of the
same type as the provided event and calls the function if this is the case.

```cpp
void Application::onEvent(Event& e)
{
	EventDispatcher dispatcher(e);
	dispatcher.dispatch<MousePositionEvent>(NF_BIND_EVENT(Application::onMousePosition));
}
```

### Logging

I wanted logging to work with both `printf` and `std::cout` style logging. To
make logging fast and easy to use, it also has to be compatible with
user-defined types. The class hierarchy looks like the following:

```
.
└── LogStream
	└── BufferedLogStream
		├── DebugLogStream
		└── StringLogStream
```

"LogStream" is an abstract class with a pure virtual function named "write", to
be used as the interface. We need both variants of the write function in order
to also print extended ASCII characters.

```cpp
class LogStream {
public:
	virtual void write(const char* characters, int length) const = 0;
	virtual void write(const unsigned char* characters, int length) const = 0;
};
```

To extend the functionality of the "LogStream" class, we override the bitwise
left shift `<<` operator. Support for user-defined types is added in the same way.

```cpp
const LogStream& operator<<(const LogStream& stream, const std::string& value)
{
	stream.write(value.c_str(), value.length());
	return stream;
}

const LogStream& operator<<(const LogStream& stream, bool value)
{
	return stream << (value ? "true": "false");
}
```

In order to keep I/O performance high, logging is done in a buffered manner.
When a "BufferedLogStream" is created it allocates an array of 128 bytes in
length on the stack, which you can then write to. If the buffer size is
exceeded, the buffer grows automatically to the required size in chunks of 128,
this time on the heap.

```cpp
// Append to buffer
memcpy(buffer() + m_count, characters, length);

// Buffer is increased in chunks of 128 bytes
size_t newCapacity = (m_count + bytes + BUFFER_SIZE - 1) & ~(BUFFER_SIZE - 1);
```

The "DebugLogStream" class is used to display messages. It has two variables to
configure this behavior, "newline" and "type", to indicate if a newline should
be printed and the color of the message. When the object goes out of scope, it
will print everything that was added to the buffer in one go.

```cpp
fwrite(buffer(), 1, count(), stdout);
```

Now we get to the actual usage of the system. Using helper functions, printing
colored and formatted messages is easy. Each helper function also has a
non-newline variant as newlines are optional. They simply create a
"DebugLogStream" and return it.

```cpp
DebugLogStream dbg(bool newline);
DebugLogStream info(bool newline);
DebugLogStream warn(bool newline);
DebugLogStream danger(bool newline);
DebugLogStream success(bool newline);

dbg() << "Hello World! " << 2.5 << " " << true;
info() << "This will be printed in blue.";
```

The printf style logging is more complicated than the previous use case. This is
because the function needs to be able to process any number of arguments and of
any type, this is accomplished using a template parameter pack. We use recursion
to loop through all the parameters in this pack, with an overload for when there
is no parameter expansion. Because the "DebugLogStream" is used for printing,
all the type overloads are available to us, so we don't have to specify the type
like usual with `printf`.

```cpp
void dbgln(Log type, bool newline);
void dbgln(Log type, bool newline, const char* format);

template<typename T, typename... P>
void dbgln(Log type, bool newline, const char* format, T value, P&&... parameters)
{
	std::string_view view { format };

	for(uint32_t i = 0; format[i] != '\0'; i++) {

		if (format[i] == '{' && format[i + 1] == '}') {
			DebugLogStream(type, false) << view.substr(0, i) << value;
			dbgln(type, newline, format + i + 2, parameters...);
			return;
		}
	}
}
```

This style of logging also has a bunch of helper functions to make using them
quick and easy.

```cpp
template<typename... P> void dbgln(const char* format, P&&... parameters) { dbgln(Log::None, true, format, std::forward<P>(parameters)...); }
template<typename... P> void infoln(const char* format, P&&... parameters) { dbgln(Log::Info, true, format, std::forward<P>(parameters)...); }
template<typename... P> void warnln(const char* format, P&&... parameters) { dbgln(Log::Warn, true, format, std::forward<P>(parameters)...); }
template<typename... P> void dangerln(const char* format, P&&... parameters) { dbgln(Log::Danger, true, format, std::forward<P>(parameters)...); }
template<typename... P> void successln(const char* format, P&&... parameters) { dbgln(Log::Success, true, format, std::forward<P>(parameters)...); }

dbgln("Hello {}, print anything! {} {}", "World", 2.5, true);
dangerln("This will print in {}.", "red");
```

Finally, "StringLogStream" is used to convert any supported type into a
std::string. This is achieved by simply converting the buffer in
"BufferedLogStream" to a string and setting the provided string to it when the
object goes out of scope.

```cpp
StringLogStream str(std::string* fill);

std::string result;
str(&result) << "Add " << "anything " << 2.5 << " " << false;
```

### Shaders

"Shader" functionality is split into two classes, "Shader" and "ShaderManager".
The manager does exactly what the name would suggest, it manages the resources.
Using convenient functions you can `add`, `load`, `check existence`, `remove`
shaders. The shaders get stored in a hash table (hash map), with the key being
its name and the value a `std::shared_ptr` to the shader object. Adding anything
to the manager that has already been loaded will simply return the existing
instance, to prevent duplication. The other pairs "Texture/TextureManager",
"Font/FontManager" and "Gltf/GltfManager" are structured similarly.

```cpp
void add(const std::string& name, const std::shared_ptr<Shader>& shader);
std::shared_ptr<Shader> load(const std::string& name);
std::shared_ptr<Shader> load(const std::string& vertexSource,
                             const std::string& fragmentSource);
bool exists(const std::string& name);

void remove(const std::string& name);
void remove(const std::shared_ptr<Shader>& shader);

std::unordered_map<std::string, std::shared_ptr<Shader>> m_shaderList;
```

To construct a "Shader", only a name needs to be provided. It will then load,
compile and link both the vertex and fragment shader files. Any errors like
files not existing or GLSL syntax errors will be printed to the console.

```cpp
// Get file contents
std::string vertexSrc = File::read(name + ".vert");
std::string fragmentSrc = File::read(name + ".frag");

// Compile shaders
uint32_t vertexID = compileShader(GL_VERTEX_SHADER, vertexSrc.c_str());
uint32_t fragmentID = compileShader(GL_FRAGMENT_SHADER, fragmentSrc.c_str());

// Link shaders
if (vertexID > 0 && fragmentID > 0) {
	m_id = linkShader(vertexID, fragmentID);
}
```

An uniform is a global "Shader" variable, to set uniform data, there are
functions for the most common used data types. ASSERT is a wrapper for `dbgln`,
which can print any registered data types, explained in the
[Logging](#logging)
section.

```cpp
int32_t findUniform(const std::string& name) const;

void setInt(const std::string& name, int value);
void setInt(const std::string& name, int* values, uint32_t count);
void setFloat(const std::string& name, float value) const;
void setFloat(const std::string& name, float v1, float v2, float v3, float v4) const;
void setFloat(const std::string& name, glm::vec2 value) const;
void setFloat(const std::string& name, glm::vec3 value) const;
void setFloat(const std::string& name, glm::vec4 value) const;
void setFloat(const std::string& name, glm::mat3 matrix) const;
void setFloat(const std::string& name, glm::mat4 matrix) const;

void bind() const;
void unbind() const;

int32_t Shader::findUniform(const std::string& name) const
{
	int32_t location = glGetUniformLocation(m_id, name.c_str());
	ASSERT(location != -1, "Shader could not find uniform '{}'", name);
	return location;
}

void Shader::setInt(const std::string& name, int value)
{
	// Set unifrom int
	glUniform1i(findUniform(name), value);
}
```

In the renderer we only need to do the following. The `the` function in
"ShaderManager" is a static function that gets the instance of the singleton.

```cpp
m_shader = ShaderManager::the().load("assets/glsl/batch-quad");

m_shader->bind();
m_shader->setFloat("u_projectionView", cameraProjectionView);
m_shader->unbind();
```

### Buffers

Rendering in OpenGL is done using a set of two buffers, the vertex buffer and
the index buffer. The vertex buffer is used to store geometry data, in the
format of points. From these points, you can construct triangles, which can
actually be rendered. The constructed triangles are stored as indexes to points
in the index buffer, the simplest form of an index buffer of a single triangle
looks like the following: `[0, 1, 2]`. When you have these two buffers set up
correctly, you can draw a triangle.

```cpp
void RenderCommand::drawIndexed(const VertexArray& vertexArray, uint32_t indexCount)
{
	uint32_t count = indexCount ? indexCount : vertexArray.getIndexBuffer()->getCount();
	glDrawElements(GL_TRIANGLES, count, GL_UNSIGNED_INT, nullptr);
}
```

To create a vertex buffer a lot of manual setup is needed. This includes offset
calculation, which is very prone to errors, so these steps are abstracted away
in the "VertexBuffer" class. A "VertexBuffer" object stores a "BufferLayout",
which stores a `std::vector` of "BufferElements". "BufferElements" are what
OpenGL calls vertex attributes, which allows us to specify any input we want,
because of this we also have to specify how the data should be interpreted. The
"BufferElement" objects hold the variables `type`, the types `size`, `offset` in
the buffer and if the data is normalized, these can be accessed via getter
functions. Now for the fun part of vertex buffers, the "BufferLayout", via a
`std::initializer_list` they can be constructed very easily.

```cpp
BufferLayout::BufferLayout(const std::initializer_list<BufferElement>& elements)
	: m_elements(elements)
{
	calculateOffsetsAndStride();
}

void BufferLayout::calculateOffsetsAndStride()
{
    m_stride = 0;
	for (auto& element : m_elements) {
		element.setOffset(m_stride);
		m_stride += element.getSize();
	}
}
```

Because of OpenGL's C-like API, rendering requires manual binding of the vertex
attribute configurations and vertex buffers, which is a lot of boilerplate. In
order to simplify this, a new concept was added called a vertex array object
(also known as VAO), which is actually required in OpenGL's core profile. VAOs
store the vertex attribute configuration and the associated vertex buffers, they
are abstracted away in the "VertexArray" class which stores the "VertexBuffers"
and an "IndexBuffer". When adding a "VertexBuffer" to a "VertexArray", it will
set up the vertex attribute configuration.

```cpp
void VertexArray::addVertexBuffer(std::shared_ptr<VertexBuffer> vertexBuffer)
{
	const auto& layout = vertexBuffer->getLayout();
	ASSERT(layout.getElements().size(), "VertexBuffer has no layout");

	bind();
	vertexBuffer->bind();

	uint32_t index = 0;
	for (const auto& element : layout) {
		glEnableVertexAttribArray(index);
		glVertexAttribPointer(
			index,
			element.getTypeCount(),
			element.getTypeGL(),
			element.getNormalized() ? GL_TRUE : GL_FALSE,
			layout.getStride(),
			reinterpret_cast<const void*>(element.getOffset()));

		index++;
	}
	m_vertexBuffers.push_back(std::move(vertexBuffer));

	unbind();
	vertexBuffer->unbind();
}
```

The final usage looks like the following, notice how the layout is created
easily using the `std::initializer_list` in the `setLayout` function.

```cpp
// Create vertex array
m_vertexArray = std::make_shared<VertexArray>();

// Create vertex buffer
auto vertexBuffer = std::make_shared<VertexBuffer>(sizeof(QuadVertex) * vertexCount);
vertexBuffer->setLayout({
	{ BufferElementType::Vec3,  "a_position" },
	{ BufferElementType::Vec4,  "a_color" },
	{ BufferElementType::Vec2,  "a_textureCoordinates" },
	{ BufferElementType::Float, "a_textureIndex" },
});
m_vertexArray->addVertexBuffer(vertexBuffer);

uint32_t indices[] { 0, 1, 2, 2, 3, 0 };

// Create index buffer
auto indexBuffer = std::make_shared<IndexBuffer>(indices, sizeof(uint32_t) * indexCount);
m_vertexArray->setIndexBuffer(indexBuffer);
```

## Design Structure

Pictured below are all the classes currently in the codebase and the
relationships between them.

![design](/img/inferno/design.png "design")

## Preview

There isn't much visual to show as of now.

![preview](/img/inferno/preview.png "preview")
