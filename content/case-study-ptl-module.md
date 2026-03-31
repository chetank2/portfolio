## 1. The Fragmentation Problem

PTL execution in Indian logistics has been one of the most fragmented operational workflows. Unlike FTL, where one truck carries one shipment on a defined route, PTL involves multiple couriers, shared capacity, split deliveries, and billing models that vary by partner.

Before this module existed, teams operated across disconnected systems. Order booking happened on courier dashboards. Allocation decisions were made over WhatsApp. Tracking came from multiple portals with inconsistent status language. Billing was a spreadsheet exercise where finance teams manually mapped courier invoices to dockets.

There was no single system that spanned the full lifecycle: order to allocation to tracking to billing to reconciliation. Every handoff between stages introduced delay, error, or lost context.

## 2. Who This Was For

**Plant and branch operations teams** — managing day-to-day PTL shipments, courier allocation, and manifestation. They needed a system that replaced courier portals and manual coordination with structured, system-driven workflows.

**Logistics managers** — responsible for courier performance, SLA adherence, and execution oversight across branches. They needed consolidated visibility instead of stitching together data from multiple sources.

**Finance teams** — handling freight auditing and reconciliation. They needed automated billing derived from contracted rates, not manually computed invoices prone to disputes.

**Supply chain heads** — who needed real-time visibility into PTL costs, courier effectiveness, and performance trends without depending on operations teams to compile reports.

## 3. What the Product Needed to Become

Freight Tiger's TMS was built around FTL assumptions — one vehicle, one journey, linear tracking. PTL broke every one of those assumptions. A single order could be split across couriers. A single courier could carry shipments from multiple shippers. Tracking milestones differed by partner. Billing structures ranged from simple per-kg rates to multi-dimensional slab models.

The challenge was not to bolt PTL onto the existing system. It was to design a module that modeled PTL as its own operational reality while remaining coherent within the broader TMS.

I approached this as a system design problem first and an interface problem second.

## 4. Designing the Lifecycle

The module needed to support seven distinct stages, each with its own logic, users, and failure modes:

1. **Contract Master** — A flexible rate card engine supporting everything from simple per-kg pricing to complex slab structures with courier-specific rules. This became the foundation for automated billing downstream.

2. **Order Booking & Serviceability** — Creating PTL shipments directly within FT with real-time courier serviceability checks. Operations teams no longer needed to switch to courier portals to check if a route was serviceable.

3. **Courier Allocation** — System-driven logic that evaluated serviceability, rates, TAT, and customer-specific rules to recommend or auto-assign the best courier for each shipment.

4. **Manifestation** — One-click generation of courier-compliant manifests and shipping labels, eliminating manual formatting and portal dependency.

5. **Tracking** — End-to-end milestone visibility across all shipments — Booked, Picked Up, In Transit, Out for Delivery, Delivered — with normalized status mapping, EDD logic, and SLA adherence tracking.

6. **Freight Bills** — Automated bill generation using the Contract Master, ensuring accurate freight computation at a shipment level with no manual intervention.

7. **Reconciliation** — A structured process to compare courier invoices against system-computed freight, surface discrepancies, and resolve disputes before payment.

The key design principle: each stage feeds the next. An order flows into allocation, allocation into tracking, tracking into billing, billing into reconciliation. No stage operates in isolation.

## 5. Product Gallery

![Orders — Booked orders list with courier partners, origins, destinations, and dispatch details](/assets/ptl/orders.png)

The orders surface shows all booked shipments with courier assignment, origin-destination pairs, dispatch dates, and shipping mode. Tabs separate orders by lifecycle state — All Orders, Ready to Ship, Booked, Failed, Cancelled — so operations teams can focus on what needs attention right now. Each row carries enough context to act without drilling into details.

![Ready to Ship — Pre-transit orders awaiting courier assignment and pickup](/assets/ptl/ready-to-ship.png)

The Ready to Ship view isolates orders that have been created but not yet dispatched. This is the critical handoff point between booking and execution. Status indicators — Serviceable, Unserviceable, Processing — surface allocation readiness at a glance, so teams can identify blocked shipments before they become delays.

![Active Shipments — Live shipment tracking with courier, status, SLA, and delivery filters](/assets/ptl/active-shipments.png)

The active shipments surface consolidates tracking across all couriers into a single, normalized view. Every courier's tracking language is mapped to a consistent set of milestones — Booked, Picked Up, In Transit, Out for Delivery, Delivered. SLA indicators, EDD dates, and status filters let logistics managers monitor execution at scale without switching between courier portals.

![Shipment Details — Individual shipment view with delivery proof, tracking timeline, and consignment details](/assets/ptl/shipment-details.png)

The shipment detail view brings together everything about a single shipment — delivery confirmation with proof of delivery status, courier and SLA details, consignor and consignee information, invoice and box details, and a complete tracking timeline showing every milestone from dispatch to delivery. This is the view operations teams use when investigating exceptions or confirming delivery status.

![Reconciliation Summary — Billing cycle overview with invoiced vs. charged amounts, overcharges, and variance filters](/assets/ptl/reconciliation.png)

The reconciliation surface is where finance teams audit courier invoices against system-computed freight. Summary cards at the top show total invoices uploaded, contracted amounts, overcharges, and disputed amounts for the billing cycle. The table below surfaces invoice-level variance, weight mismatches, POD availability, and action status — giving finance teams a clear, filterable view of where discrepancies exist.

![Reconciliation — Overcharged invoices with courier-level variance, POD status, and action tracking](/assets/ptl/reconciliation-overcharged.png)

Filtering to overcharged invoices isolates the invoices where the courier charged more than the contracted rate. Each row shows the base freight, invoiced weight, charged amount, and variance — so finance teams can quickly identify patterns (specific couriers, modes, or weight brackets) and take targeted action instead of auditing every invoice manually.

## 6. Key Design Decisions

### Normalized tracking language

Every courier reports status differently. Some use detailed milestone codes, others return sparse updates. I designed a normalized status model that mapped all courier-specific statuses into a single, consistent tracking language within FT. This made SLA monitoring, delay detection, and cross-courier comparison possible without requiring operations teams to learn each courier's conventions.

### Reconciliation before payment, not after

The previous workflow generated invoices first and discovered problems later. I moved reconciliation upstream — courier invoices are compared against system-computed freight before approval, not after payment. This eliminated the most expensive category of disputes: the ones discovered after money has already moved.

### Progressive disclosure across the lifecycle

Each surface shows only what the user needs at that stage. The orders view focuses on booking status and dispatch readiness. The shipments view focuses on tracking and SLA. The reconciliation view focuses on financial accuracy. Users do not need to carry context from one stage to understand another — each view is self-contained while remaining part of a connected flow.

### System-driven allocation over manual selection

Instead of letting operations teams manually pick couriers based on familiarity or habit, the allocation engine evaluates serviceability, contracted rates, TAT, and customer rules. This shifted allocation from tribal knowledge to repeatable, auditable logic — reducing costs and improving consistency across branches.

### Charge-level visibility in reconciliation

Finance teams do not think in invoice totals. They think in terms of specific charge components — base freight, fuel surcharges, handling charges. The reconciliation view surfaces variance at the charge level, not just the invoice level, so teams can pinpoint exactly where a discrepancy originated.

## 7. What Was Hard

**Modeling courier diversity.** Each courier has different rate structures, status vocabularies, manifest formats, and billing practices. The system had to absorb all of that variation and present it through a unified interface without losing the specificity that operations teams depend on.

**Balancing automation with override.** System-driven allocation works well for the majority of shipments, but operations teams need the ability to override when they have context the system does not — a known courier issue, a customer preference, a time-sensitive shipment. The design had to support automation as the default while keeping manual control accessible and non-disruptive.

**Getting reconciliation right.** Freight reconciliation involves matching courier invoices against contracted rates across multiple charge dimensions — weight slabs, distance, mode, accessorials. Edge cases are the norm: weight mismatches, partial deliveries, rate card exceptions. The reconciliation engine had to be accurate enough to be trusted and flexible enough to handle the exceptions that every billing cycle produces.

**Designing for different literacy levels.** Branch operations teams, logistics managers, and finance teams have different mental models, different vocabularies, and different definitions of what "done" means. The same underlying data had to be presented through surfaces that matched each user's decision-making context.

## 8. Impact

The module consolidated what previously required multiple courier portals, spreadsheets, WhatsApp threads, and manual follow-ups into a single system-driven workflow.

- **50–70% faster PTL operations** — order creation, allocation, and manifesting became system-driven instead of manual
- **Automated billing with zero manual computation** — charges derived directly from the Contract Master, eliminating human errors and interpretation differences
- **Up to 90% reduction in invoice disputes** — structured reconciliation aligned courier invoices with system-computed freight before payment
- **Consolidated tracking across all couriers** — normalized status language made SLA monitoring and delay prediction consistent regardless of courier
- **Faster cash cycles** — automated reconciliation reduced invoice approval delays and improved working capital efficiency

## 9. What Connects to What

The PTL Module is part of a broader redesign of Freight Tiger's TMS:

- **My Journeys** handles full-truckload tracking, lifecycle management, and operational decision-making
- **Control Tower** sits above all modules as an orchestration layer, pulling exceptions and coordinating resolution
- **Freight Invoicing** manages the FTL billing and reconciliation workflow

PTL operates as its own module with its own logic, but shares the same design language, data infrastructure, and operational philosophy as the rest of the system. Exceptions from PTL feed into Control Tower. Billing principles from PTL align with the Freight Invoicing module. The module was designed to be part of the ecosystem, not an isolated feature.

## 10. What I Would Improve Next

- **Smarter allocation** — ML-driven courier selection that learns from historical delivery performance, not just static rules
- **Delay prediction** — using tracking patterns to predict SLA breaches before they happen, similar to how Control Tower handles FTL exceptions
- **Rate discovery** — helping shippers compare courier rates across lanes in real time, turning allocation from a logistics decision into a procurement advantage
- **Cross-courier analytics** — giving supply chain heads a unified view of cost, performance, and reliability across all courier partners over time

## 11. Takeaway

> Extending a product from one operational model to another is not about adding screens — it is about understanding the new model deeply enough to design a system that respects its complexity while making it operationally simple.
