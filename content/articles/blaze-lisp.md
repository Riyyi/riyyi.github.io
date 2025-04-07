---
title: "blaze lisp"
description: "An implementation of the MAL (Make a Lisp) project."
navigation: false
date: "2023-03-18"
img: "/img/mal-steps.png"
tags:
  - C++20
  - CMake
  - Software
---

<small>An implementation of the MAL (Make a Lisp) project.<br>
Repository at
[GitHub](https://github.com/riyyi/blaze){target="_blank"},
[GitLab](https://gitlab.com/riyyi/blaze){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/blaze){target="_blank"}.
</small>

After having implemented the JSON serializer for my [utility
library](/articles/utility-library), I became interested in interpreters. The
utility library just has the `tokenization` step of an interpreter, so my tought
was, what's next? That's right, `parsing`.

Having used Emacs quite a bit, I wasn't shy of Lisp. Then, I came across the MAL
([Make a Lisp](https://github.com/kanaka/mal){target="_blank"}) project, and
decided to look into it. The project lays out the implementation steps of making
a Lisp programming language in 10 or so steps and also provides you with unit
tests that have to pass to proceed to the next step. There are also a bunch of
reference implementations to refer to, in case you get stuck.

Feeling like implementing a fully interpreted language was a bit of an
undertaking and realizing that in a Lisp `parsing` and `interpreting` is
basically combined into one step, it seemed achievable and I decided to give the
MAL project a go.

The final architechture that has to be implemented is pictured below.

<div class="row">
<div class="col-lg-9 col-xl-6">

![](/img/mal-steps.png "")

</div>
</div>

I managed to do a full implementation, including `variables`, `if` statements,
`loops`, `functions`, `try/catch` exceptions, `lists`, `arrays`, `hash-maps` and
even `macros`.

With the REPL you can try things out and play around easily.


```
./repl
Blaze [C++]
user>
```

```elisp
user> 123
123
user> (+ 1 2.5)
3.5
user> (- 10 (- 5 3))
8
user> "hello world"
"hello world"
user> (= 2 3)
true
user> (if (> 2 4) "yes" "no")
"no"
user> (count (list 3 6 2 9))
4
user> (count '(3 6 2 9)) ; list shorthand
4
user> (list? [2.1 nil "text"]) ; array / vector
false
user> {:a (+ 7 8)} ; hash-map
{"a" 15}
user> (def! mul (fn* [x y] (* x y))) ; defining a function
#<user-function>(0x5f35f38815d0)
user> (mul 4 5)
20
```

This project was really interesting and the language is quite powerful, powerful
enough to accomplish self-hosting! This means that an interpreter (or rather,
eval+apply) _for_ this language, can be written _in_ the language.

If you're curious about reading more examples, a good place is probably the
testsuite for the project, those have a bunch of unit tests and are available
[here](https://github.com/kanaka/mal/tree/master/impls/tests).
