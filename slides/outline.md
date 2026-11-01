# Slide outline

Working content for a future deck. Keep the main slides brief; use the notes as presenter guidance.
Slide numbers follow the timing in the [session plan](../docs/session-plan.md).

## 1. How does data leave your laptop? (00:00-02:00)

- Two computers want to talk. What must exist between them?
- Today: follow data from a local cable to an internet connection.
- No prior networking knowledge required.

Speaker prompt: ask who has used `ping` and who has configured a switch. Both groups should have something to watch.

## 2. Meet the hardware (02:00-04:00)

- A hub repeats incoming signals to its other ports and shares a collision domain.
- An Ethernet switch learns source MAC addresses and forwards using destination MAC addresses within a VLAN.
- A router forwards packets between IP networks using its routing table.

Show the Catalyst 3560 series 48-port PoE switch and TP-Link 5-port Gigabit desktop switch. Both switch Ethernet;
management adds visibility and configuration. Explain PoE as power for compatible endpoints over Ethernet.
The GL.iNet AC1200 wireless travel router supplies the separate router/DHCP demonstration. Exact product IDs remain
unconfirmed. This Catalyst has 48 copper 10/100 Fast Ethernet ports and four SFP slots without modules. Use a
Fast Ethernet port for the TP-Link link. Keep multilayer routing capabilities out of the core demo.
There is no physical hub in the listed equipment, so explain its behavior rather than claim to demonstrate one.
Home routers and hotspots often combine routing, Wi-Fi, DHCP, NAT, and firewall functions in one box.

## 2a. Networking vendors (04:00-05:00)

- Cisco: recognize Catalyst and connect it to the switch on the table.
- Ubiquiti: recognize UniFi gateways, switches, and access points.
- HPE Aruba Networking: recognize CX switches and campus/branch Wi-Fi products.
- TP-Link: distinguish Omada business products from the desktop switch in this demo.
- GL.iNet: connect travel routers to the AC1200 on the table.

Keep this to recognition, not a buying guide. Shared protocols allow compatible equipment from different vendors
to communicate; management tools, supported features, licensing, and support vary by model and product family.
Vendor names on the slide link to primary sources. Do not imply every product has the same capabilities or that
the TP-Link desktop switch belongs to Omada. This minute comes from the opening equipment/device discussion.

## 3. OSI: a map for asking better questions (05:00-09:00)

1. Physical: signals, connectors, link.
2. Data link: Ethernet frames, MAC addresses, local switching.
3. Network: IP addresses and routing.
4. Transport: TCP/UDP and ports.
5. Session: managing conversations.
6. Presentation: data representation and related transformations.
7. Application: protocols such as HTTP and DNS.

Use one example: unplugged cable, wrong IP route, then an application error. The model helps narrow where to look.
Real implementations do not always divide neatly into seven separate components.

## 4. TCP/IP and encapsulation (09:00-13:00)

- Application roughly maps to OSI 5-7; transport to 4; internet to 3; link to 1-2.
- An application message travels inside transport data, an IP packet, and a link-layer frame.
- Each layer solves a different delivery problem.

Trace an Ethernet/TCP example: HTTP data, TCP segment, IP packet, Ethernet frame, physical signals.
On a routed Ethernet path, routers replace link-layer framing for the next hop. Ordinary routing preserves the
destination IP, while NAT can change IP addresses and transport ports. TTL/hop limit changes along the route.

## 5. Three kinds of address (13:00-16:00)

- MAC: local link-layer delivery, for example `02:00:00:00:00:0a`.
- IP: network-layer addressing, for example `192.168.50.10`.
- Transport port: an endpoint identifier used by TCP or UDP, for example TCP port 443.

Examples are illustrative, not discovered hardware values. A MAC address is not an immutable identity; it can be
locally assigned or randomized. A transport port is not a physical switch socket.

## 6. IPv4: local or through a gateway? (16:00-19:00)

- IPv4 addresses have 32 bits, usually written as four decimal octets.
- `192.168.50.10/24` and `192.168.50.20/24` are on the same example subnet.
- An off-subnet destination normally uses a route through a gateway.

For a same-subnet IPv4 peer, ARP resolves its IP to a local MAC. For an off-subnet destination, the host typically
resolves the next-hop gateway's MAC instead. A switch is not the default gateway just because traffic passes through it.

## 7. IPv6: more than longer addresses (19:00-23:00)

- IPv6 has 128-bit addresses, written in hexadecimal with colon separators.
- Example documentation address: `2001:db8::10`; `fe80::/10` is link-local space.
- IPv6 uses Neighbor Discovery rather than ARP; it has no broadcast.
- Dual stack means a device can use IPv4 and IPv6 together.

Explain compressed zeros without a full addressing exercise. A link-local address does not prove global IPv6
internet connectivity. IPv6 does not automatically provide encryption or make a network secure.

## 8. Demo: watch a switch learn (23:00-35:00)

Open the [demo runbook](../demos/README.md#demo-1-local-delivery-and-mac-learning-12-minutes).
The presenter uses physical equipment; attendees use the [Packet Tracer companion lab](../labs/packet-tracer.md).
Distribute installation and starter-topology preparation before the session. Do not spend demo time on account setup.

- Predict: does local communication require the internet?
- Show: host configuration, ping, ARP, switch MAC table.
- Move: a host behind the unmanaged switch, then observe the Catalyst uplink.
- Break: disconnect one host cable, then restore it.

Ask why multiple source MACs can appear on a single switch port. No parallel links are needed.
Pause for the first ping/table checkpoint. A second simulated switch and ARP/ICMP animation are extensions;
attendees can watch or pair if they fall behind. The existing 12-minute slot includes these checkpoints.

## 9. TCP, UDP, DNS, DHCP (35:00-41:00)

- IP provides packet delivery without a delivery guarantee.
- TCP provides a reliable, ordered byte stream, using acknowledgments and retransmission.
- UDP provides datagrams without built-in delivery or ordering guarantees; applications can add those features.
- DNS resolves names; DHCP can supply host configuration.

TCP connections can still fail. Do not equate UDP with "always faster" or TCP with "all web traffic".
HTTP/3 uses QUIC over UDP. DNS is not limited to UDP. `ping` uses ICMP, not TCP.
The offline lab uses static IPv4 configuration; its switches do not need to run DHCP for it to work.

## 10. Getting beyond the LAN (41:00-48:00)

- DSL carries access traffic over telephone copper; distance and line quality affect performance.
- Cable uses coaxial access, often in a hybrid fiber/coax network; shared capacity and provisioning matter.
- Fiber carries optical signals; service rates, sharing, and symmetry depend on the deployment and plan.
- Cellular uses a radio access network; coverage, spectrum, congestion, and plan limits matter.

Compare medium, installation constraints, latency, upload/download capacity, and mobility without fixed speed claims.
These describe access technologies, not alternatives to TCP/IP. Do not imply fiber service is always dedicated
or symmetric. The TP-Link-to-Catalyst copper link supports at most 100 Mb/s, despite the TP-Link's Gigabit ports.
Check its negotiated speed; it may be lower. The Catalyst's SFP slots are unused because no modules are available.

Use a hotspot as the conceptual example: laptop-to-hotspot Wi-Fi and hotspot-to-carrier cellular are different links.
The GL.iNet travel router is not assumed to have a cellular modem; a separate hotspot would be optional upstream equipment.
A modem or optical network terminal handles the access connection; a router handles IP forwarding, even when
functions are combined in one device.

## 11. Demo: inspect the travel router (48:00-53:00)

Use [demo 2](../demos/README.md#demo-2-travel-router-dhcp-and-gateway-5-minutes), or replace it with the rehearsed
port-security demo. A prepared Packet Tracer ARP/ping walkthrough can occupy the same slot instead.

- Inspect the Wi-Fi adapter's address, prefix, gateway, and DNS settings.
- Identify the address assigned by GL.iNet DHCP and the default route through its LAN gateway.
- Explain why local DHCP and a gateway do not prove an upstream internet connection exists.
- Compare with the isolated wired lab, which worked without an internet gateway.

No live speed test is required. It would measure this setup at this moment, not rank all access technologies.

## 12. Put the path back together (53:00-60:00)

- MAC delivers on a link; IP routes between networks; transport connects application endpoints.
- Models help you identify which part of the path to investigate.
- Questions and the troubleshooting exercise from the session plan.

## Appendix A. Port security

Limit learned source MAC addresses on a supported access port, then observe a violation from a second host.
Use a dedicated lab port and the runbook's rollback. This limits MAC use; it is not strong device authentication.

## Appendix B. EtherChannel

Combine compatible physical links into a logical link for aggregate capacity and resilience. LACP negotiates
membership when both endpoints support it. Traffic hashing usually keeps one flow on one member, so two 100 Mb/s
members do not normally make one flow run at 200 Mb/s.

The TP-Link and GL.iNet are not confirmed aggregation peers. Do not connect two links between the physical switches
to improvise a bundle. A prepared Packet Tracer topology can provide two compatible switches for an optional
simulation; save a physical demonstration for confirmed compatible equipment and a separate rehearsal.
