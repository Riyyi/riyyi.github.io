---
title: "Smart Outlet"
description: "Home automation smart outlet."
navigation: false
date: "2018-10-31"
img: "/img/smart-outlet/result.jpg"
tags:
  - Hardware
---

This page describes my version of a smart socket for home automation.
The device can be toggled via the button on the enclosure or a wireless signal.

## Build

Pictured below is a scetch of the concept of the project.<br>
As well as an electrical circuit.

![](/img/smart-outlet/concept-drawing.jpg "")

The MDF enclosure is cut out with a laser cutter. The base of the design is
generated via
[boxes.py](https://www.festi.info/boxes.py/ClosedBox).
Holes have been added to the base so that the cable,
socket, LED and button can be mounted.

![](/img/smart-outlet/box-design.png "")

The button is printed with a 3D printer, the bottom part of the button is
extended by 2mm on each side (4mm in total), so that it stays in place.

![](/img/smart-outlet/button-3d-model.png "")

This is the final electrical circuit that was used, which is made in Fritzing.
All hardware components (minus the power supply) are incorporated in this
circuit. A red LED is used as an example appliance that can be toggled.

![](/img/smart-outlet/fritzing.png "")

Pictured below is a model of the design in Tinkercad, the button will be printed
in 3D and the housing will be cut out with the laser cutter. The black cylinder
represents the power cable.

Front view.

![](/img/smart-outlet/concept-3d-front.png "")

Side view.

![](/img/smart-outlet/concept-3d-side.png "")

Back view.

![](/img/smart-outlet/concept-3d-back.png "")

Box cut out.

![](/img/smart-outlet/box-cut-out.jpg "")

3D printed button.

![](/img/smart-outlet/button-3d-print.jpg "")

Overview of all the electronics.

![](/img/smart-outlet/electronics-overview.jpg "")

The electronics mounted in the box.

![](/img/smart-outlet/electronics-in-box.jpg "")

Completed assembly.

![](/img/smart-outlet/result.jpg "")

Domoticz is used as a controller, which completes the smart outlet project. View
the demo below.

::VideoLazy{:src="/img/smart-outlet/demo.webm"}
::
