# Hardware demo runbook

## Inventory and assumptions

Confirmed inventory:

- TP-Link 5-port Gigabit desktop switch, used as the unmanaged switch in this runbook.
- GL.iNet AC1200 wireless travel router, used separately for local DHCP and gateway inspection.
- Cisco Catalyst 3560 series PoE switch: 48 copper 10/100 Fast Ethernet ports and four SFP slots.
  No SFP modules are available. Use copper ports for every Catalyst connection in this demo.

Each available Catalyst copper link supports at most 100 Mb/s, including the link to the TP-Link Gigabit switch.
Check negotiated speed and duplex during rehearsal. Its multilayer capabilities depend on software/features and configuration;
this session keeps the Catalyst in its switching role. PoE is a brief hardware explanation, not an additional demo.
No PoE-powered endpoint has been confirmed. Power the travel router according to its own model's instructions.

Still needed or unconfirmed:

- Two hosts with Ethernet, including adapters if necessary.
- Three Ethernet patch cables, plus a spare.
- Catalyst console cable/adapter, terminal software, and authorized access.
- Exact Catalyst product ID, software, interface names, VLAN state, and supported commands.
- TP-Link model number and confirmation of its unmanaged operation.
- GL.iNet model number, firmware, router-mode settings, LAN subnet, DHCP state, power supply, and Wi-Fi credentials.
- Optional upstream mobile hotspot and service, if internet access will be shown. The travel router is not assumed
  to have a cellular modem or any particular upstream connection configured.
- Projector readability for both the console and host terminal.

Commands below are Windows host examples and common Cisco IOS forms, not verified device-specific instructions.
Use the actual model's manual and CLI help before configuration. Do not paste configuration into an unidentified switch.

## Preflight

1. Work on an isolated lab, disconnected from venue, campus, and production networks.
2. Record `show version`, `show inventory`, `show interfaces status`, `show vlan brief`, and the existing configuration
   using the commands supported by this IOS release. Check the chassis label if inventory output is unavailable.
   Keep backups private; configurations can contain credentials. Do not reset or erase the switch for the demo.
3. Select three unused access ports in the same lab VLAN. Confirm they are forwarding and not trunk or aggregation
   members. Record their original settings before any changes. Existing port security can invalidate the demo.
4. Label two host-facing Fast Ethernet ports and a third Fast Ethernet port for the TP-Link inter-switch link.
   The SFP slots are unused. Interface names such as `FastEthernet0/1` still need checking against the console output.
5. Start with host A and host B directly attached to two Catalyst ports. Keep the unmanaged switch disconnected.
6. Record the hosts' original Ethernet settings, then configure these example static addresses through OS settings:
   A = `192.168.50.10/24`, B = `192.168.50.20/24`, with no gateway or DNS on the isolated Ethernet adapters.
   Use another private subnet if these addresses overlap an active interface or VPN route.
7. For demo 1, disconnect Wi-Fi/VPN if it would confuse the path. Confirm the Ethernet adapters and links are up.
8. Rehearse ping in both directions. If required, allow ICMP echo only on the isolated lab interface with an
   appropriately scoped firewall rule. Record and later remove that rule; do not disable the firewall globally.
9. Save screenshots or text output of successful ping, neighbor entries, and MAC-table observations.
10. Rehearse to 12 minutes. Do not make the first session with the hardware the live presentation.

## Demo 1: local delivery and MAC learning (12 minutes)

The presenter uses this physical setup. Attendees follow the [Packet Tracer companion lab](../labs/packet-tracer.md)
on their own laptops, with installation, sign-in, and a two-PC/one-switch starter prepared beforehand.
No attendee needs access to the real switch console or demo LAN. Pairing or watching is a valid fallback.

Finish the concept slides first, then keep both demonstrations together from 36:00 to 53:00.
Use these local-network checkpoints: topology at 36:00, ping/tables at 38:00, an optional second simulated
switch at 42:00, and disconnection at 45:00. Continue directly into the travel-router demonstration at 48:00.
Pause briefly for attendees after the first successful ping.
PC command syntax differs from Windows: use plain `ping 192.168.50.20` in Packet Tracer. Keep the presenter's
hardware and console projected; packet animation is an optional attendee exploration. The minimum checkpoint is
a successful ping plus ARP and MAC-table observations. Cap individual troubleshooting at one minute.

### A. Identify the path (0-2 minutes)

Read out the physical connections: host A to Catalyst, host B to Catalyst. No internet uplink is present.
Ask whether the hosts should still communicate.

On each Windows host:

```powershell
ipconfig /all
```

Point to the Ethernet address, subnet mask, and physical address. A MAC printed here should correspond to a learned
switch entry after that host sends traffic, allowing for different punctuation formats.

### B. Generate traffic and inspect state (2-6 minutes)

On host A:

```powershell
ping -n 4 192.168.50.20
arp -a
```

On host B:

```powershell
ping -n 4 192.168.50.10
```

On the Catalyst, use the supported spelling:

```text
show mac address-table dynamic
```

Some older IOS versions use `show mac-address-table dynamic`. Check CLI help during rehearsal.

Expected observations: ping replies if the hosts and firewall permit it; host A has a neighbor entry for host B;
the switch associates each host MAC with its ingress port and VLAN. Existing traffic may have populated the tables
before the demonstration. Do not promise an empty table or flush the entire switch table to create one.

Explain that ARP maps IPv4 addresses to MACs on the host. The switch MAC table maps MACs to ports within a VLAN.
The switch learns source MACs. Known destinations are forwarded toward the learned port; unknown unicast and
broadcast frames are flooded to eligible other ports in that VLAN.

### C. Put another switch in the path (6-9 minutes)

1. Unplug host B from its Catalyst port.
2. Connect host B to the unmanaged switch.
3. Connect exactly one cable from the unmanaged switch to the selected Catalyst uplink port.
4. Wait for forwarding, repeat ping, and inspect the Catalyst MAC table again.

Expected: host B's source MAC is learned on the uplink after new traffic. That entry identifies the path to B,
not the identity of the unmanaged switch. Multiple hosts behind that switch would appear behind the same uplink.
It still forwards Ethernet without a management console.

Never add a second inter-switch cable here. Without a correctly configured supported aggregation setup, it can
create a Layer 2 loop. Do not rely on unknown spanning-tree behavior to make it safe.

### D. Break one link and recover (9-12 minutes)

Run `ping -t 192.168.50.20` on A, unplug B's Ethernet cable, show the changed result, then reconnect it and stop
ping with Ctrl+C. Recovery may take time while the link negotiates and the switch port reaches forwarding state.

An ARP or MAC entry may remain cached after a failure. A table entry is learned state, not a real-time proof that
the host is reachable. Tie the cable and link LEDs back to OSI layer 1.

## Demo 2: travel router, DHCP, and gateway (5 minutes)

1. Finish the wired demo before changing the presenter's connections.
2. Use the GL.iNet in router mode with local DHCP enabled, rehearsed before the session. Disconnect the demo host's
   wired lab cable, set its Wi-Fi adapter to automatic addressing, and join the travel router's Wi-Fi.
3. Run `ipconfig /all`. Inspect the actual Wi-Fi address, subnet mask, DHCP server, gateway, and DNS settings.
   Do not assume a factory-default router address; use the configured subnet and observed gateway.
4. Run `route print` and identify the default route through the GL.iNet. Show its LAN settings or DHCP lease list
   in the model's administration interface if rehearsed. Avoid exposing Wi-Fi passwords or administration credentials.
5. Explain that DHCP and a default route can exist with no working upstream internet connection. If a separate
   upstream has been configured and verified, optionally open an ordinary webpage.

GL.iNet router mode supplies routing, local DHCP, NAT, and firewall functions. Access-point mode has a different
role, so confirm the configured mode. The router's Wi-Fi link is not a cellular connection. A separate mobile
hotspot could provide upstream access only through a method supported and rehearsed on the exact GL.iNet model.
Leave the wired switch lab separate; do not bridge networks through host internet connection sharing.
Inspecting a default route does not demonstrate a packet being forwarded across two networks.

Fallback: show saved adapter and route output from this travel router. Keep unnecessary personal information off
screen. Internet access is not required. Packet Tracer's ARP/ping walkthrough is another optional replacement for
this five-minute slot if a topology has been prepared and rehearsed; it does not extend the hour.

## Optional replacement: port security (5 minutes)

Only use this after rehearsing on the identified Catalyst. It replaces demo 2. The following common IOS example
assumes an unused lab access port, already in the intended VLAN, with no existing security configuration.
Save its original configuration first. Use a dedicated host port, never the console path, uplink, or EtherChannel member.

Example interface `FastEthernet0/1`, to be replaced with the actual selected port:

```text
configure terminal
interface FastEthernet0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 1
 switchport port-security violation restrict
end
show port-security interface FastEthernet0/1
```

Connect A and generate traffic, then swap in B and generate traffic before the learned secure address ages out.
Observe the secure address and violation counter with supported `show port-security` commands. In restrict mode,
unauthorized source traffic is dropped while the port remains up. If the platform cannot demonstrate this reliably,
use saved output. MAC limits are not cryptographic authentication.

Rollback example for this previously unsecured lab port:

```text
configure terminal
interface FastEthernet0/1
 no switchport port-security
end
```

Restore the remaining original port configuration and verify ordinary traffic works. Do not save temporary demo
settings to startup configuration. Consult the model-specific guide for secure address cleanup and restrictions.

## EtherChannel: discussion only with the current inventory

A live bundle requires compatible aggregation support at both ends, consistent member configuration, and a
rehearsed failure test. The TP-Link and GL.iNet are not confirmed aggregation peers for the Catalyst.
Use the appendix explanation or a separately prepared Packet Tracer topology with two compatible switches.
Do not configure parallel physical links as an experiment during the session.

## Failure handling and cleanup

- No console: show saved MAC-table output; host ping and ARP can still run live.
- No second host: show saved host and switch output. A one-host setup cannot demonstrate peer delivery.
- No ping replies: check link, VLAN, host addresses, and scoped firewall rules. Switch to backup after 60 seconds.
- No IPv6: show the documentation example; do not promise live IPv6 or carrier support.
- Afterward: restore host addressing, Wi-Fi/VPN state, temporary firewall rules, and original switch port settings.
- Verify the restored configuration and connectivity appropriate to the original setup. Disconnect the isolated lab.
