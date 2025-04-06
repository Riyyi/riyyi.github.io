---
title: "Xbox 360 Controller Type-C Mod"
description: "Mod to change the Xbox 360 wired controller to Type-C."
navigation: false
date: "2022-11-28"
img: "/img/type-c-mod/controller-after.jpg"
tags:
  - Hardware
---

<small>Mod to change the Xbox 360 wired controller to Type-C.<br>

## Result

![](/img/type-c-mod/controller-before.jpg "")

![](/img/type-c-mod/controller-after.jpg "")

## Tools

::GridWithImage
---
rows:
  - title: Soldering iron
  - title: Wire stripper
    src: "/img/type-c-mod/wire-stripper.jpg"
  - title: Round file
    src: "/img/type-c-mod/round-file.jpg"
  - title: Nail file
    src: "/img/type-c-mod/nail-file.jpg"
---
::

## Shopping list

::GridWithImage
---
rows:
  - title: Solder
  - title: 3D printed bezel
    src: "/img/type-c-mod/printed-bezel.jpg"
  - title: USB Type-C female socket
    src: "/img/type-c-mod/port.jpg"
---
::

Unfortunately, the original design was a little fragile at the round part that
would slide into the housing and it would snap off. I tweaked the design by
moving the USB port up by 1mm and reinforcing it by attaching it on the sides,
as there was space to do so. The 3D bezel design was taken from here:
[thingiverse.com/thing:3066354](https://thingiverse.com/thing:3066354).<br>
The new edited design:
[thingiverse.com/thing:5664077](https://thingiverse.com/thing:5664077).<br>
This is the USB-C port I used:
[aliexpress.com/item/1005002328403673.html](https://aliexpress.com/item/1005002328403673.html)

## Build

Unmodified, the original cable hole is a little too narrow to fit a Type-C port.

![](/img/type-c-mod/before-filing.jpg "")

I used the nail file to slightly widen the hole, this is what it looks like afterwards.

![](/img/type-c-mod/after-filing.jpg "")

Initially, my plan was to replace the original connector with a male pin header
and dupont connectors, but my soldering iron couldn't get hot enough to melt the
solder of the thick pins. So instead, I repurposed the original wires.

![](/img/type-c-mod/failed-idea.jpg "")

I used a third hand to help keep the port in place while soldering.

![](/img/type-c-mod/soldering-port.jpg "")

Finished soldering.

![](/img/type-c-mod/soldering-port-finished.jpg "")

Test fitting everything together.

![](/img/type-c-mod/test-fit.jpg "")
