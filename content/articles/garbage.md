---
title: "GarbAGE (Garbage Accurate GameBoy Emulator)"
description: "GameBoy Emulator that is not that accurate."
navigation: false
date: "2022-08-17"
img: "/img/garbage.png"
tags:
  - C++20
  - CMake
  - Software
---

<small>GarbAGE (Garbage Accurate GameBoy Emulator).<br>
Repository at
[GitHub](https://github.com/riyyi/garbage){target="_blank"},
[GitLab](https://gitlab.com/riyyi/garbage){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/garbage){target="_blank"}.
</small>

This is an exploration into emulators by me and a friend of mine. The only thing
thats really implemented are the CPU opcodes. The cool thing however, is that
for the rendering portion of the application we are using my own
[game engine](/articles/inferno)! No other libraries were used.

The simplest game to test is Dr. Mario and even that one doesnt render
correctly, but we do get graphics that you can make out, pretty cool!

![garbage](/img/garbage.png "garbage")

Preview video of the boot sequence and intro of the Dr. Mario game.

::VideoLazy{:src="/img/garbage-preview.webm"}
::
