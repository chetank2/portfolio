![Hero visual for My Journeys and the redesigned TMS experience](/assets/ft-tms-redesign/New%20images/Hero-My%20Journeys.png)

## 1. Overview

When I joined Freight Tiger, the core operational surface of the TMS was `My Trips`. Every user, from executives to operations teams, landed on the same page. It was the most-used part of the product, but it was failing in ways that went deeper than UI.

The interface was cluttered, the counts were unreliable, trip details opened in cramped inline panels, and the product gave users data without helping them decide what mattered. What looked like a screen redesign problem was actually a product systems problem.

I redesigned the TMS around two connected layers:

- `TigerSight` for operational awareness
- `My Journeys` for journey-level execution

Together, they shifted the product from passive monitoring to active operational decision-making.

## 2. Problem

![Problem view showing the broken legacy trip experience](/assets/ft-tms-redesign/New%20images/problem1.png)

![Additional problem-state view highlighting issues in the old TMS flow](/assets/ft-tms-redesign/New%20images/Problem2.png)

The old experience was centered on a flat trip list called `My Trips`, but the structure underneath it was broken.

Master trips and child trips appeared inconsistently. In cases like single-pick multi-drop and return flows, the system created child trips that distorted counts and hierarchy. Users saw one number above the table and a different reality inside it. Trust broke down.

The details experience was also weak. Trip information opened in a tiny inline frame below each row, packed with tabs and hard to use on the low-resolution screens common in logistics operations. Users could not compare properly, could not understand state quickly, and could not scale their workflow across large numbers of active movements.

At a broader level, the TMS had no strong operational overview. Managers depended on calls, WhatsApp messages, and daily reports to understand what was happening. Alerts existed everywhere, but the system did not help users prioritize.

## 3. Users And Context

This product was used by logistics operations teams managing large numbers of active trips every day. Their job was not to read tables in detail. Their job was to quickly answer:

- What is going wrong?
- Which journeys need attention first?
- What action should I take next?

The most actionable research findings were operational, not cosmetic:

- **Help users prioritize which trips need attention first.** Teams were monitoring hundreds of vehicles and could not tell which delays or alerts mattered most without excessive filtering.

  > "I need to know what is burning."

  > "I have 100s of trips running daily, and we are just two managers. We cannot handle 50 alerts a day."

  > "My dispatch manager was pissed at me because he had to pay the contracted labourers, and the truck was delayed by a day."

- **Provide an overview from pickup to drop.** Users needed a clear operational picture before drilling into individual journeys.

  > "I don't know where to start and what to look for."

  > "I want to know where the vehicles are stuck so that I can call the right people and alert them in advance."

- **Make trip status and delay risk explicit.** Users were unsure whether a trip was on track or likely to miss plan.

  > "How do I find out if the trip is delayed?"

  > "When my customer complains about a delay, I check the ETA to inform them of the arrival time."

- **Remove tracking health as a primary concept.** Users did not understand tracking health, did not discover it on their own, and did not respond to it as a meaningful workflow tool.

  > "Just tell me the tracking method."

- **Remove creation time as a key identifier.** Consignors were not using trip creation time to identify journeys. They relied on business identifiers like SAP IDs, sales order references, and invoice-linked numbers.

- **Support the IDs users actually search by.** Search behavior was consistently tied to operational identifiers rather than internal system metadata, and the product had to stay configurable for customer-specific metadata like invoice IDs, SAP IDs, container identifiers, and temperature data.

  > "When my customer enquires about an invoice, I search by the invoice number."

  > "I search SAP unique feed ID, or sales order number on the Trip list to track the sales order."

## 4. Approach

The work started as a usability and actionability effort, initially focused on pin-able filters and making the trip list easier to use. But direct research, support-call observation, and workflow analysis made it clear that the issue was not just filtering. The product's model and the interface were both wrong.

I reframed the design problem around a core principle: operational products should be organized around decisions, not raw records.

That led to a two-layer redesign:

- `TigerSight` became the awareness layer, surfacing operational health and routing users into the right context
- `My Journeys` became the execution layer, where users analyze and act on journey-level problems

This was not a UI refresh. It was a redesign of product structure, decision flow, and system logic together.

## 5. Key Decisions

### 1. Replace the landing trip list with an awareness layer

![TigerSight awareness layer replacing the old landing trip list](/assets/ft-tms-redesign/New%20images/Replace%20the%20landing%20trip%20list%20with%20an%20awareness%20layer.png)

Instead of sending every user into a flat list, I designed `TigerSight` as the new landing experience. It surfaces delayed shipments, long stoppages, route deviations, detained trucks, SLA health, and other exception-led signals.

This changed the user's starting point from scrolling and filtering to recognition. Users could see what mattered first, then move into execution with the right context already narrowed.

### 2. Redesign My Trips into My Journeys

![My Trips redesigned into My Journeys with journey-level structure](/assets/ft-tms-redesign/New%20images/Redesign%20My%20Trips%20into%20My%20Journeys__.png)

`My Journeys` became the deep operational surface for journey-level analysis and action. One journey became one row. Loads were nested under the journey where they belonged instead of appearing as disconnected child trips.

This fixed both trust and structure. Counts matched reality, and the interface began reflecting the actual operational object users were working with.

### 3. Treat the table as a decision surface, not a data grid

The list was redesigned around operational intent. Status tabs, exception badges, delay buckets, and action-relevant signals became the primary structure. On-time journeys stayed visually quiet. Delayed or risky journeys became visually prominent.

The goal was not to show everything. The goal was to help users decide.

I wrote more about this thinking in [Designing tables in complex logistics products](https://medium.com/@chetank19/designing-tables-in-complex-logistics-products-fa003ebaca56).

### 4. Move from inline details to dedicated journey pages

![Transition from inline details to dedicated journey pages](/assets/ft-tms-redesign/New%20images/Move%20from%20inline%20details%20to%20dedicated%20journey%20pages__.png)

The old inline detail frame was fast for one-off use but fundamentally limited. It could not scale to richer journey structures or more complex workflows.

I introduced dedicated journey detail pages with tracking, loads, escalations, maps, milestone summaries, and timeline views. This was a deliberate tradeoff: I sacrificed some micro-speed in favor of clarity, scalability, and architectural correctness.

### 5. Support customization where logistics reality demands it

I designed custom views where users could choose the columns and data points they wanted to see in the listing page, and add those directly to the table from a larger set of available fields.

This solved a major operations problem: different users depended on different identifiers and metadata, so the table needed to adapt to each person's workflow instead of forcing one fixed structure on everyone.

## 6. Solution

My Journeys fixed both the architecture and the interface by turning the list into a clearer decision surface and giving each journey a scalable detail model.

### The Hierarchy Fix

One journey shows as one row. Loads, previously child trips, are nested inside the journey where they belong. The count now matches reality.

### The New Journey List

![My Journeys list view with status tabs, exception badges, and journey table](/assets/ft-tms-redesign/New%20images/The%20new%20journey%20list.png)

The list view became the operational control surface. Status tabs across the top, `Planned`, `En Route to Loading`, `At Loading`, `In Transit`, `At Unloading`, `In Return`, `Delivered`, let users segment by journey state instantly. Exception badges like `Long Stoppage`, `Route Deviation`, and `Delayed`, along with delay buckets such as `0-6 hrs`, `6-12 hrs`, and `12+ hrs`, surface problems before users have to search.

Each row shows the essentials: consignee, route, vehicle, status, SLA, and alerts. On-time journeys are quiet. Delayed or problematic journeys are visually loud, with colored badges like `Long Stoppage`, `Route Deviation`, or `Transit Delay` that draw the eye.

### Dedicated Journey Details Page

Clicking a journey opens a full page with clear tabs: `Tracking`, `Loads`, `Escalations`, `Yard Ops`.

The `Tracking` tab shows a delivery status banner at the top, delivering in X days, on-time or delayed, driver SIM status, vehicle details, a full-screen map with the route and current position, and a milestone summary on the right showing stops completed, distance travelled, and time spent.

![Journey details tracking view with map, delivery status, and milestone summary](/assets/ft-tms-redesign/New%20images/Dedicated%20journey%20details%20page1.png)

A second view shows a Gantt-style timeline bar for journey progress, the planned route with all stops and waypoints, journey metadata, and a comments section. This gives users the full picture of where a journey has been and what happened along the way.

![Journey details timeline view with planned route and journey progress](/assets/ft-tms-redesign/New%20images/Dedicated%20journey%20details%20page2.png)

### The Loads Tab

![Loads tab with load list on the left and selected load tracking details on the right](/assets/ft-tms-redesign/New%20images/The%20Loads%20tab.png)

This is where the master/child trip fix becomes real. All loads for a journey are listed on the left. Selecting a load shows its tracking details, current location, STA, and a map with the route, all in the same view without leaving the journey context.

Each load also has a details view showing LRN numbers, invoice information, item details with material codes and quantities, and delivery and pickup addresses. Previously, this information was scattered across child trip rows and cramped inline frames. Now it is organized under one journey with clean navigation between loads.

### Map View

![Map view showing all vehicles, routes, and the journey list panel](/assets/ft-tms-redesign/New%20images/Map%20view.png)

The map view shows all vehicles with their routes on a full-screen map, with a journey list panel on the left. Users can select any vehicle to see its route, current position, and journey details. This view serves the spatial thinkers, ops managers who need to see where everything is geographically.

## 7. Why This Was Difficult

This was difficult because two layers were broken at the same time.

First, the product structure itself did not match how logistics operations actually work. The old system treated trips too simply, which led to confusing hierarchy, unreliable counts, and weak detail handling.

Second, the interface on top of that structure did not help users make decisions. The old `My Trips` experience made users scroll, filter, and inspect rows manually instead of clearly showing what needed attention first.

That meant this could not be solved as a visual cleanup of the old screen. `My Journeys` had to fix both the operational structure and the decision-making interface together.

The challenge was not just to make the product look better. It was to decide where to simplify, where to preserve complexity, and how to redesign the system so it became both more accurate and easier to use.

## 8. Outcome

The redesign changed the product from a broken monitoring surface into a more coherent operational system.

The most important outcome was that the product became more usable for the actual questions operations teams were trying to answer every day.

- users could prioritize better instead of treating every trip and alert as equally urgent
- the product gave a clearer pickup-to-drop overview, so users could understand where to focus before drilling into details
- trip status and delay risk became easier to read, helping teams respond faster when journeys were likely to slip
- the system moved away from low-value signals like tracking health and creation time, and toward the identifiers and operational data users actually relied on
- custom views made the listing page more relevant across different customers and workflows, because users could choose the columns and data points they needed most
- users reached details through a dedicated structure rather than cramped inline frames
- managers shifted from asking `what's happening?` to asking `why is this delayed?`

At a product level, the system became more trustworthy, more actionable, and better aligned with how logistics teams actually work.

## 9. Learnings

Operational products break when their internal models do not match reality.

Better UI alone does not fix decision problems. In systems like this, the interface and the product model have to be redesigned together.

I also learned that:

- users often optimize for familiarity before they recognize the value of clarity
- opinionated systems need tuning, especially around alerts and exceptions
- simplicity in UI often comes from deeper system design, not fewer features
- design can and should shape architecture when the current model is blocking product progress

## 10. Takeaway

This project shows how I approach complex B2B product design: not by polishing screens in isolation, but by aligning system structure, user mental models, and interface behavior.

At Freight Tiger, that meant turning a broken trip list into a two-layer operational system:

- `TigerSight` for awareness
- `My Journeys` for execution

The result was not just a cleaner product. It was a more truthful and more useful one.
