---
title: "Remote Power Button"
description: "Activate the power and reset button of a PC remotely."
navigation: false
date: "2025-08-14"
img: "/img/remote-power-button/pcb-test.jpg"
tags:
  - PCB Frabrication
  - Schematic
  - ESP32
  - Hardware
---

<small>Activate the power and reset button of a PC remotely.<br>
Repository at
[GitHub](https://github.com/riyyi/remote-power-button){target="_blank"},
[GitLab](https://gitlab.com/riyyi/remote-power-button){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/remote-power-button){target="_blank"}.
</small>

I'm setting up a home server again and this time I want to do it in an actual
rackmount (previously I just had an Intel NUC with a 3.5" drive slapped on top).
When working on this I figured, why not put the desktop computers in the rack as
well. That way, they can get out of the living room.

The problem is that in order to turn on the computers, I would have to climb 2
flights of stairs. This could definitely be automated. My idea is to create a
remote power and reset button using the ESP32 platform. These microcontrollers
have built-in WiFi and also have software libraries available to easily program
WiFi communication.

## Prototype

The first prototype was made on a breadboard with some basic components, just to
see if this could work without relays, as those are big and switch between
states slowly.

![breadboard](/img/remote-power-button/breadboard.jpg "breadboard")

And it did work! In the video I show the first ESP32 sending a packet over WiFi
to the second ESP32 and it in turn activating the MOSFET to short the
computer's motherboard front-panel headers.

::VideoLazy{:src="/img/remote-power-button/breadboard-test.webm"}
::

<div class="row">
<div class="col-12 col-lg-7 col-xl-6">

When everything was working I got some prototype boards and tried soldering the
components onto it, starting with the easier of the two designs, the client.

Because this wasnt going that well and my soldering iron isnt the best, I kind
of gave up on this idea. Especially because this was the design with fewer
components.

Another big factor in the decision, is because I knew JLCPCB fabricates PCBs and
also solders components onto them. I was interested in trying this service,
because its cool to have a really small board (much smaller that would be
possible by hand) with lots of components on it, And also because it seems like
a useful skill to acquire.

A friend of mine already knew a lot about hardware and PCB design and was
willing to help with any of my questions, which gave me the confidence to know
this project would succeed.

</div>
<div class="col-12 col-lg-5 col-xl-6">

![prototype top](/img/remote-power-button/prototype-top.jpg "prototype top"){.w-50}
![prototype bottom](/img/remote-power-button/prototype-bottom.jpg "prototype bottom"){.w-50 .float-end}

</div>
</div>

## Schematic

The first step in creating a PCB is to design the schematic. The tool I'm going
to use is EasyEDA Pro. This is a design tool that integrates the LCSC components
catalog and JLCPCB PCB service. It also ties the schematic and PCB design
together, so if a component is updated in one it will be reflected in the other.
This complete packages makes it a bit easier.

In the schematic below, the first 2 rows of component blocks are everything
needed for a functioning ESP32-C3 with USB flashing support. The last row is for
the functionality I needed for the client and server. The components for both
are in the same design, as having multiple different boards would increase
manufacturing costs.

![schematic](/img/remote-power-button/schematic.png "schematic")

My advice, when trying to create your own design(s), is to try to use as many
"Basic Part" components from the "JLCPCB Part Class" as possible. This is
because the "Extended Part" components need to be loaded into the machine
specifically for your order, which has a fee of $3.00 per component type. This
can increase costs for a small batch order quickly.

<div class="text-center">

![EasyEDA basic part](/img/remote-power-button/easyeda-basic-part.png "EasyEDA basic part")

</div>

The filters in the right-hand panel will become visible after selecting a
category in the left-hand panel.

## PCB Design

<div class="row">
<div class="col-12 col-lg-7 col-xl-6">


Something I didn't have experience with before is impedance. Impedance is the
resistance of a system at a particular frequency. High speed USB, even 2.0,
requires special attention when designing traces for them, to account for this.

USB works by having the receiver measure the voltage difference between the two
data lines, as opposed to measuring the absolute value. These two PCB traces are
called a differential pair, they carry the same signal but inverted (one
possitive, one negative). Since the receiver only measures the difference, the
noise cancels out, making the signal more resistant to interference.

The USB 2.0 spec requires an impedance of 90Ω. This is dependant on the PCB
used, as the thickness of the layers affects the resistance. JLCPCB provides a
[calculator](https://jlcpcb.com/pcb-impedance-calculator){target="_blank"} to
determine the trace width and spacing required to achieve consistent impedance.

Pictured is the final design of the PCB. The design tool also supports a 3D
viewer and model exporter, which will come in handy when designing a case for
the project later.

</div>
<div class="col-12 col-lg-5 col-xl-6">

![pcb design](/img/remote-power-button/pcb-design.png "pcb design"){.w-50}
![pcb design 3d](/img/remote-power-button/pcb-design-3d.png "pcb design3f"){.w-50}

</div>
</div>

## Ordering the PCB

<div class="row">
<div class="col-12">

When ordering, if your design contains a differential pair, make sure to set
`Specify Stackup` to `Yes` and pick the PCB type you have done the impedance
calculations for! In my case I stuck with the default 4-layer PCB type
`JLC04161H-7628`.

During the order process, the PCB and component placement will be rendered in a
preview, to verify everything went as excepted. That will look like the
following.

</div>
<div class="col-12 col-lg-6">

![pcb simulation top](/img/remote-power-button/pcb-simulation-top.png "pcb simulation top"){.w-50 .p-2}
![pcb simulation bottom](/img/remote-power-button/pcb-simulation-bottom.png "pcb simulation bottom"){.w-50 .p-2}

</div>
<div class="col-12 col-lg-6">

![component placement top](/img/remote-power-button/component-placement-top.png "component placement top"){.w-50}
![component placement bottom](/img/remote-power-button/component-placement-bottom.png "component placement bottom"){.w-50}

</div>
</div>

The order arrived pretty quickly, within two weeks. This was including
fabrication and the slow shipping option (because that was cheaper). The PCB
looks really cool! All the features seems to be working on inital testing.

<div class="row">
<div class="col-12 col-lg-6">

![pcb top](/img/remote-power-button/pcb-top.jpg "pcb top"){.w-50 .pe-2}
![pcb bottom](/img/remote-power-button/pcb-bottom.jpg "pcb bottom"){.w-50 .ps-2}

</div>
<div class="col-12 col-lg-6">

![pcb test](/img/remote-power-button/pcb-test.jpg "pcb test")

</div>
</div>

## 3D Enclosure

The 3D enclosure was designed in Tinkercad, as that is easy to use and I knew it
already. Also because the CAD software situation isn't the best on Linux and
Blender isn't optimized for fabrication. You can find the project
[here](https://www.tinkercad.com/embed/lt5qYAdK8P9){target="_blank"}.

<div class="row">
<div class="col-12 col-lg-6">

![pcb test](/img/remote-power-button/3d-enclosure-design-inside.png "pcb test")

</div>
<div class="col-12 col-lg-6">

![pcb test](/img/remote-power-button/3d-enclosure-design-outside.png "pcb test")

</div>
</div>

## References

- https://www.instructables.com/Build-Custom-ESP32-Boards-From-Scratch-the-Complet/
- https://www.espressif.com/sites/default/files/documentation/esp32-c3-wroom-02_datasheet_en.pdf
- https://www.espressif.com/sites/default/files/documentation/esp32-c3_datasheet_en.pdf
- https://www.espressif.com/sites/default/files/documentation/esp32-c3_technical_reference_manual_en.pdf

- [(YouTube) MOSFET Explained - How MOSFET Works](https://www.youtube.com/watch?v=AwRJsze_9m4){target="_blank"}
- [(YouTube) Altium Designer RF Impedance Matching (e.g. 50Ω, USB, ...)](https://www.youtube.com/watch?v=ULK_fRNbZcs){target="_blank"}
