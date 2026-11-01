# Basic Networking

A roughly one-hour HackSU session combining slides and live hardware demos. Built for CS majors with mixed
experience, including people encountering networking for the first time.

The running question: **What happens when my laptop sends data to another computer?**

## Start here

- Run `python app.py` and open <http://127.0.0.1:5174> for the deck, or `/notes` for speaker notes.
- Run `python build.py`, then open `dist/index.html` for an offline static copy.
- [Slide outline](slides/outline.md): slide content, speaker prompts, and demo transitions.
- [Demo runbook](demos/README.md): equipment, setup, commands, expected observations, and fallbacks.
- The deck includes linked references and matching speaker notes with the full run of show.

## Setup and presenting

Use Python 3.13 or newer:

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python app.py
```

Use arrows, space, Page Up / Page Down, or the navigation buttons. Home and End jump to the first and last slide.
The NOTES link opens the presenter reference separately. For a static build, use `.venv\Scripts\python build.py`.
Keep the entire `dist/` folder together, including `static/`, when copying it to another machine.

The 22 main slides cover the scheduled hour, including live demos and questions. Three appendix slides cover
optional port security, EtherChannel, and references. The five-minute travel-router segment can be replaced with
rehearsed port security; appendices do not add time to the session.

All presentation assets are local. Following external reference links requires internet access.
The ignored `docs/` folder contains local planning material and is not needed to run or build the deck.

## Scope

Cover TCP/IP and the OSI model, Ethernet and MAC addresses, IPv4 versus IPv6, switches versus hubs versus routers,
and DSL versus cable versus fiber versus cellular access. Use this hardware to connect concepts to physical equipment:

- TP-Link 5-port Gigabit desktop switch, used as the unmanaged switch in the lab.
- GL.iNet AC1200 wireless travel router, used for DHCP and gateway inspection.
- Cisco Catalyst 3560 series PoE switch: 48 copper 10/100 Fast Ethernet ports and four SFP slots.
  No SFP modules are available, so the demo uses copper ports for hosts and the inter-switch link.

The earlier mobile hotspot is optional upstream equipment, not required by the updated demos.
The GL.iNet is not assumed to contain a cellular modem.

Port security is an optional replacement demo. EtherChannel is an optional conceptual extension until compatible
hardware is confirmed. The core session fits 60 minutes including questions.

## Current state

The deck and speaker notes are in `templates/`, with shared assets in `static/`. The demo instructions assume Windows presenter
commands, two Ethernet-capable hosts, and an isolated lab. Those hosts and any adapters still need confirming.
The exact Catalyst product ID, software, console access, TP-Link model, and GL.iNet model remain unconfirmed.
The copper ports support at most 100 Mb/s. Check the negotiated speed during rehearsal; the SFP slots remain unused.

## Before presenting

- [ ] Identify the Catalyst product ID and software, test console access, and check negotiated copper link speeds.
- [ ] Identify the GL.iNet and TP-Link model numbers; rehearse router mode and local DHCP on the GL.iNet.
- [ ] Confirm two hosts, Ethernet adapters, cables, and presenter display arrangements.
- [ ] Rehearse the offline demo and save backup output from the actual hardware.
- [ ] Decide whether travel-router inspection or port security will occupy the optional demo slot.
- [ ] Rehearse to 53 minutes, leaving seven minutes for recap and questions.

## Template credit

Adapted from the [HacKSU Presentation Template](https://github.com/hacksu/HacKSU-Presentation-Template)
at [64f8d8e](https://github.com/hacksu/HacKSU-Presentation-Template/commit/64f8d8e05d02bca1d09b2462683606781f6fa62a).
The Flask routes, static builder, visual theme, logo, and particle background come from that template.
