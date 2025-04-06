---
title: "Bank ATM"
description: "Bank ATM."
navigation: true
date: "2018-03-18"
img: "/img/bank-atm/arduino-fritzing.png"
tags:
  - C++14
  - Qt4
  - Software
  - Hardware
---

<small>Bank ATM.<br>

The goal of this project was to create a banking system, including an ATM
client. It was created for one of the courses (project 3) at Hogeschool
Rotterdam and was written in C++14 and Qt4.

The
[slides](https://docs.google.com/presentation/d/1W0L4e7r0Vqp5Qp3RaNcMhqrt1gkLSrU4T6heOZz_IqQ){target="_blank"}
for the presentation that I gave at Hogeschool Rotterdam.

## Product demo

Korte video waarin de meeste functionaliteit van de bank ATM wordt getoond.

::VideoLazy{:src="https://riyyi.com/media/bank-atm-demo.webm"}
::

## Overzicht componenten

- Bank
   - MySQL server
   - Native applicatie
- Arduino Nano
   - RFID-RC522
   - Matrix membrane 4x4 keypad
- USB kabel voor seriële communicatie

![component summary](/img/bank-atm/component-summary.png "component summary")

## Overzicht systeem

De applicatie bestaat uit 3 threads, welke allemaal een unieke functie hebben.
De main thread bevat de GUI. De database thread voert alle queries uit en slaat
deze data op. En als laatst de serial thread, deze thread bevat een listener die
alle seriële data ontvangt. Afhankelijk van wat de serial thread aan user input
ontvangt zal de SerialCommand class "commando's" uitvoeren die de GUI en
database thread gebruiken.

![system summary](/img/bank-atm/system-summary.png "system summary")

## Database ERD

Hieronder is de ER (Entity-relationship) diagram te vinden.

![database ERD](/img/bank-atm/database-erd.png "database ERD")

## Database ontwerp

- MySQL server
- Lokaal opgeslagen

Hieronder is de EER (Enhanced entity-relationship) diagram te vinden.

![database EER](/img/bank-atm/database-design.png "database EER")

## Arduino - fritzing

- Arduino Nano
- RFID-RC522
- Matrix membrane 4x4 keypad

![arduino design](/img/bank-atm/arduino-fritzing.png "arduino design")

## GUI

- Native applicatie
- Geschreven in C++14 en Qt4
- Cross platform (build tool: qmake)
- Multithreaded

Ten alle tijden kan de sessie worden afgebroken door de pas uit de pinautomaat
te verwijderen, de interface wordt daarna naar de inlogpagina doorgestuurd. Alle
velden waar de gebruiker gegevens kan invoeren, hebben de mogelijkheid voor het
weergeven van foutmeldingen.

Hieronder zijn schermvoorbeelden te vinden.

![GUI flow](/img/bank-atm/gui-flow.png "GUI flow")
