# Basic Networking

A roughly one-hour HackSU session combining slides and live hardware demos. Built for CS majors with mixed
experience, including people encountering networking for the first time.

The running question: **What happens when my laptop sends data to another computer?**

## Start here

- [Session plan](docs/session-plan.md): learning goals, timing, and what to cut.
- [Slide outline](slides/outline.md): slide content, speaker prompts, and demo transitions.
- [Demo runbook](demos/README.md): equipment, setup, commands, expected observations, and fallbacks.
- [References](docs/references.md): primary sources for developing the talk.

## Scope

Cover TCP/IP and the OSI model, Ethernet and MAC addresses, IPv4 versus IPv6, switches versus hubs versus routers,
and DSL versus cable versus fiber versus cellular access. Use a Cisco Catalyst 10/100 switch, an unmanaged switch,
and a mobile hotspot to connect the concepts to physical equipment.

Port security is an optional replacement demo. EtherChannel is an optional conceptual extension until compatible
hardware is confirmed. The core session fits 60 minutes including questions.

## Current state

This is the initial planning material, not a finished slide deck. The demo instructions assume Windows presenter
commands, two Ethernet-capable hosts, and an isolated lab. Those hosts and any adapters still need confirming.
The exact Catalyst model, software, console access, and hotspot Ethernet capability are also unconfirmed.

## Before building the deck

- [ ] Identify the Catalyst model and software, and test console access.
- [ ] Confirm two hosts, Ethernet adapters, cables, and presenter display arrangements.
- [ ] Rehearse the offline demo and save backup output from the actual hardware.
- [ ] Decide whether the hotspot segment or port security will occupy the optional demo slot.
- [ ] Turn the outline into slides in the preferred presentation format.
- [ ] Rehearse to 53 minutes, leaving seven minutes for recap and questions.
