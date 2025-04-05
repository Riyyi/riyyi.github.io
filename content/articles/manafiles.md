---
title: "Manafiles"
description: "Config file and package tracking utility."
navigation: false
date: "2021-09-04"
img: "/img/manafiles-unit-test.png"
tags:
  - C++20
  - CMake
  - Software
---

<small>Config file and package tracking utility.<br>
Repository at
[GitHub](https://github.com/riyyi/manafiles){target="_blank"},
[GitLab](https://gitlab.com/riyyi/manafiles){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/manafiles){target="_blank"}.
</small>

Written in C++20, using the build tool CMake.

The goal of this project is simple reproducibility of a Linux system, without
using symlinks. This is achieved by managing configuration files and keeping
track of what packages were installed.

In order to use the same bundle of files for multiple systems, the program
allows to specify variables inside of the configuration files. These
configuration lines will then get commented or uncommented when pushing the
configuration to the system, depending on the value of the variables. The
variables that are supported are the `distribution` the `hostname`, the
`username`, and the display `session`, which is either X.Org or Wayland.

Below an example of a variable block, where I set the amount of jobs the
compiler will use, depending on the hostname, because my desktop has more cores
than my laptop.

```
# >>> hostname=arch-desktop
MAKEFLAGS="-j8"
# <<<
# >>> hostname=arch-laptop
# MAKEFLAGS="-j4"
# <<<
```

List of features:

- Manage dotfiles and system config files.
- Selectively comment and uncomment depending on machine configuration.
- Store a list of all installed packages.
- Install packages from a stored list.
- Pattern matching in the config file and cli arguments.
- Test suite with unit tests, using my own macros.

Pictured below is the output of running the test suite:

<div class="row">
<div class="col-6">

![manafiles unit test output](/img/manafiles-unit-test.png "manafiles unit test output")

</div>
</div>
