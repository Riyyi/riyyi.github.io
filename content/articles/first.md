---
title: "My First Blog Post"
description: "This is a test article."
---

# Hello World

This is a test article.

## Component Rendering

::ExampleComponent
#namedslot
This is a Named Slot
#default
This is the Default Slot
::

### Testing Some Markdown Features

A link: [website-vue](https://github.com/riyyi/website-vue)

A codeblock:
```js [file.js]{2} meta-info=val
export default () => {
console.log('Code block')
}
```

```cpp
int i = 0;
```

```php
protected static $router;
$path = parse_url($_SERVER['REQUEST_URI'])['path'];
```

Inline `hightlight`.

`const code: string = 'highlighted code inline'`{lang="ts"}

- An
- Unordered
- List
