# Packet Tracer companion lab

The presenter demonstrates on the physical Catalyst and TP-Link switches. You reproduce the same ideas in your
own Packet Tracer network during minutes 36-48, after the concept slides. You do not need to connect your laptop to the demo equipment.
Watching or sharing a screen with another attendee is fine if Packet Tracer is not ready.

## Before the session

1. Download Packet Tracer for your computer from the [Cisco Resource Hub](https://www.netacad.com/resources/lab-downloads).
   Follow [Cisco's installation and first-launch instructions](https://www.netacad.com/skillsforall/files/Cisco_Packet_Tracer_Download_and_Installation_Instructions.pdf).
2. Install it and complete the required Cisco sign-in before arriving. Launch it again to check access.
   Use a supported desktop/laptop OS; Packet Tracer is not a phone/tablet app.
3. Download the starter below, configure the PC addresses using the table, and save a working copy before sending
   any traffic. Save a local copy of this guide too. The manual construction steps remain available as a fallback.
   Installation and account troubleshooting are outside the one-hour session.

## Activity downloads

- [Starter activity](packet-tracer/networking-starter.pkt): PC0 and PC1 cabled to a 2960 switch. PC IPv4 settings
  are blank so they can be configured as an exercise.
- [Completed example](packet-tracer/networking-completed.pkt): the same topology, with `192.168.50.10/24` and
  `192.168.50.20/24`. Gateway and DNS are unset. No ping or other simulation traffic has been generated.

**Status: tested in Packet Tracer 8.2.2 on 2026-11-10.** The activity opened, the switch booted with
`FastEthernet0/1` and `FastEthernet0/2` up, and the PC0-to-PC1 ping worked. Other Packet Tracer versions and
Simulation Mode have not been checked.

The files use an 8.1-format seed shipped with the installed Packet Tracer 8.2.2 samples, plus PC definitions from
its bundled samples. They were authored offline with
[packet-tracer-pkt-format 0.4.1](https://github.com/aacanadaa/packet-tracer-pkt-format).
That library is not needed to open the activities.

## First test in Packet Tracer

1. Open `networking-completed.pkt`. Check for two PCs, one 2960 switch, and two cables, with no file-conversion error.
2. Confirm PC0's `FastEthernet0` connects to Switch0 `FastEthernet0/1`, and PC1 connects to `FastEthernet0/2`.
3. Check both PCs' IPv4 settings against the table below. Wait for the switch ports to reach forwarding state.
4. From PC0, run `ping 192.168.50.20`, retry once if needed, then check `arp -a` and `show mac address-table`.
   Success is expected from the configuration, but has not been observed in the application yet.
5. Open `networking-starter.pkt`. Confirm the same devices and cables are present but PC IPv4 fields are blank.
   Enter the table's addresses and repeat the ping test. Save a working copy after it succeeds.

An error on opening is a file-compatibility issue to report separately from a loaded topology whose ping fails.

## Open the starter, or build it manually

Open the supplied starter to skip device placement and cabling. If it cannot be opened, create this same topology
manually and use the remainder of the guide.

In a new **Logical** workspace, add two PCs from **End Devices** and one **2960** switch from
**Network Devices > Switches**. The simulated switch does not need to match the physical 3560's exact model.

Connect each PC's `FastEthernet0` to a different switch port with **Copper Straight-Through** cables:

```text
PC0 (host A) --- Switch0 (2960) --- PC1 (host B)
                  Fa0/1  Fa0/2
```

Use PC0 to switch `FastEthernet0/1` and PC1 to switch `FastEthernet0/2`. Wait for the links to forward.
Leave the switch's default access-port/VLAN settings in this new activity.

On each PC, open **Desktop > IP Configuration**, select static IPv4 configuration, and enter:

| Setting | PC0 / host A | PC1 / host B |
| --- | --- | --- |
| IPv4 address | `192.168.50.10` | `192.168.50.20` |
| Subnet mask | `255.255.255.0` | `255.255.255.0` |
| Default gateway | Unset | Unset |
| DNS server | Unset | Unset |

Do not add a router, internet cloud, or DHCP server. Use **Save As** to save `networking-working.pkt` before your
first ping. Keep the downloaded files unchanged so you can reopen a clean activity if you get lost.

## Follow the physical demo

| Session time | Presenter: actual equipment | You: Packet Tracer |
| --- | --- | --- |
| 36:00-38:00 | Trace the two hosts and Catalyst connections | Open your starter; check the addresses and links |
| 38:00-42:00 | Ping, inspect ARP and the Catalyst MAC table | Run the commands below; optionally step through ARP/ICMP |
| 42:00-45:00 | Move B behind the TP-Link switch | Watch first; add a second simulated switch if you are ready |
| 45:00-48:00 | Unplug B, reconnect, observe recovery | Disconnect/reconnect B's simulated cable and repeat ping |

The minimum finish is **one successful ping, one peer ARP entry, and one learned switch MAC entry**.
The second switch and packet animation are extensions. Stop when the presenter moves on; this is not a race.

### 1. Ping and compare the tables

On PC0, open **Desktop > Command Prompt**:

```text
ipconfig
ping 192.168.50.20
arp -a
```

Packet Tracer's PC prompt is simulated. Use plain `ping` here; the Windows presenter's `-n` and `-t` options
are not required. An initial timeout can occur while neighbor resolution or link forwarding completes; retry once.

Open Switch0's **CLI** tab, press Enter if necessary, and use:

```text
enable
show mac address-table
```

Expected: A can reach B, A learns a peer IP-to-MAC mapping, and Switch0 learns the hosts' source MACs on their ports.
Compare values from your own activity; they will not match the presenter's hardware MAC addresses.

### 2. Optional: watch ARP before ICMP

Before your first ping, switch to **Simulation** mode and use **Edit Filters** to show **ARP** and **ICMP**.
Use **Add Simple PDU**, select PC0 then PC1, and advance with **Capture / Forward**. Inspect an event's PDU
information to connect Ethernet addressing to the IP/ICMP conversation. Return to **Realtime** before moving cables.

Ask: why does the host need a MAC address before it can send to the local IPv4 peer?
If the peer is already cached, ARP may not appear. Reopen the untouched starter and try before generating traffic.
**Reset Simulation** clears the event list; do not assume it clears every device's learned state.

### 3. Optional: put another switch in the path

Remove only B's original cable in your simulation. Add a second 2960, connect B to it, then connect the switches
with exactly one link, using **Automatically Choose Connection Type** if needed. For example, use `Fa0/24` on
each switch for that inter-switch link. Leave the new switch's access ports in the default VLAN.

Send traffic again and inspect Switch0. B's source MAC should now be learned toward the second switch.
The second 2960 represents the TP-Link's forwarding role, not its exact hardware or management features.
Do not add a second parallel inter-switch link.

### 4. Disconnect and recover

Remove B's cable in your simulation, then try the ping again. Reconnect it and wait for forwarding before retrying.
A table entry may remain after disconnection; cached state does not prove current reachability.
Save your working activity if you want to explore it after the workshop.

## If something goes wrong

- Check both PC addresses, masks, cable endpoints, and link status. Same subnet and same VLAN are required here.
- If you are still stuck after a minute, watch the physical demo or pair with someone. Continue later from your starter.
- Do not change your real laptop's network settings to fix the simulated network.
- A simulated link rate or delay is not a measurement of the actual Catalyst, TP-Link, or travel router.
- The GL.iNet demonstration remains presenter-led. No matching simulated travel router is required.

## References

- [Cisco: first Packet Tracer lab](https://tutorials.ptnetacad.net/help/default/myFirstPTLab.htm)
- [Cisco: Simulation Mode](https://tutorials.ptnetacad.net/help/default/mode_simulation.htm)
- [Cisco: PDU information](https://tutorials.ptnetacad.net/help/default/mode_simulation_PDUinfo.htm)
