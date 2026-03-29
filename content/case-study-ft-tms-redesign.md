## 1. What I Walked Into

When I joined Freight Tiger, every user — CXO, manager, executive — landed on the same page: My Trips. It was the most-used surface in the entire TMS. And it was broken in ways that went deeper than UI.

Master trips and child trips showed as separate rows in the same table. If a shipment had multiple drops (SPMD), child trips were created for each drop. Return journeys also generated child trips. The count above the table said 1,867 trips — but that included child trips that weren't visible as separate entries. Users saw one number, the table showed another. Nobody trusted the data.

Trip details opened in a tiny inline frame below each row, packed with tabs — tracking, shipments, documents, alerts. On a 1366x720 screen (the most common in logistics operations), this was unusable. You couldn't compare trips. You couldn't see details properly.

And the architecture couldn't support what Freight Tiger needed next: MPMD (multi-pick multi-drop), multimodal, and cross-border journeys.

Beyond My Trips, there was no summary, no overview, no way to understand what was happening across operations without manually filtering through hundreds of rows. Managers depended on phone calls, WhatsApp messages, and daily reports to understand status.

We had alerts everywhere. No one knew which one mattered.

## 2. What Users Actually Said

- "I have 100s of trips running daily, and we are just two managers. We cannot handle 50 alerts a day."
- "I need to know what is burning."
- "My dispatch manager was pissed at me because he had to pay the contracted labourers, and the truck was delayed by a day."
- "I don't know where to start and what to look for."
- "When my customer complains about a delay, I check the ETA to inform them of the arrival time."

They couldn't prioritize because the interface treated every trip equally. Exceptions were buried. The system gave them data but never told them what mattered.

## 3. The Redesign — Two Connected Layers

Version 10 was not a UI refresh. It was a complete rethinking of how logistics operations work inside Freight Tiger's TMS. I designed two connected layers, each solving a different part of the problem:

- **TigerSight** — the new landing experience that replaced the old trip list. Shows operational health at a glance and routes users to where attention is needed.
- **My Journeys** — the deep operational layer where journey-level analysis and action happens. Replaces My Trips with a correct hierarchy and dedicated detail pages.

A third layer — **Control Tower** — sits above the TMS as an orchestration layer, pulling exceptions from all modules and coordinating resolution through AI agents and human operators. That is covered in a separate case study.

The flow: user lands on TigerSight → sees what needs attention → clicks through to My Journeys with pre-filtered context.

## TigerSight — From Blind List to Operational Awareness

### What changed

TigerSight replaced the trip list as the landing page. Instead of a flat list, users see KPI cards — delayed shipments, long stoppages, route deviations, detained trucks, SLA status. When a user clicks "Delayed Shipments," they navigate directly to My Journeys with that filter already applied.

No manual filtering. No losing context. The dashboard does the cognitive work that ops teams were doing in their heads.

### How behavior actually changed

**Starting point shifted.** Users stopped landing on a list and scrolling. They scanned KPIs first, then clicked into issues. Behavior moved from search to recognition.

**Manual filtering dropped.** Before: filter by delay, then by region, then by alert type. After: click one KPI card, already filtered.

**Manager dependency reduced.** Managers stopped needing constant status updates from ops teams. The dashboard showed live status. Daily "what's happening?" calls became less necessary.

**Conversations changed.** Before TigerSight, people asked "What's happening?" After, they asked "Why is this delayed?" The shift was from discovery to diagnosis.

### Organized around intent, not entities

TigerSight is structured around operational modes — execute, overview, plan, agents — not database tables. Most enterprise tools organize around entities (orders, shipments, vehicles). TigerSight organizes around jobs: monitor live conditions, handle disruptions, understand network effects, automate intervention.

### What didn't land perfectly

**Map adoption split users.** Some loved the map view — it matched how they think spatially. Others ignored it because they're list-driven operators. Not all users think spatially, and designing for both without cluttering either took iteration.

**"Dashboard" perception.** Early stakeholder reactions sometimes reduced TigerSight to "a nice dashboard." The design had to prove it was a decision surface, not a reporting surface. The mission-critical visual framing — closer to an operations theater than an admin tool — was intentional to counter this.

## My Journeys — Fixing the Architecture and the Interface

### The hierarchy fix

One journey shows as one row. Loads (previously child trips) are nested inside the journey where they belong. The count now matches reality.

### The new journey list

![My Journeys — In Transit view with status tabs, exception badges, and journey table](/assets/my-journeys/in-transit.png)

The list view became the operational control surface. Status tabs across the top — Planned, En Route to Loading, At Loading, In Transit, At Unloading, In Return, Delivered — let users segment by journey state instantly. Exception badges (Long Stoppage, Route Deviation, Delayed) and delay buckets (0–6 hrs, 6–12 hrs, 12+ hrs) surface problems before users have to search.

Each row shows the essentials: consignee, route, vehicle, status, SLA, and alerts. On-time journeys are quiet. Delayed or problematic journeys are visually loud — with colored badges like "Driver Change," "Wrong GPS ID," or "Transit Delay" that draw the eye.

### Dedicated journey details page

Clicking a journey opens a full page with clear tabs — Tracking, Loads, Escalations, Yard Ops.

![Journey Details — Tracking tab with map, delivery status, and milestone timeline](/assets/my-journeys/in-transit-alt.png)

The Tracking tab shows a delivery status banner at the top (delivering in X days, on-time or delayed, driver SIM status, vehicle details), a full-screen map with the route and current position, and a milestone summary on the right showing stops completed, distance travelled, and time spent.

![Journey Details — Timeline view with planned route and journey progress](/assets/my-journeys/in-transit-summary.png)

A second view shows a Gantt-style timeline bar for journey progress, the planned route with all stops and waypoints, journey metadata, and a comments section. This gives users the full picture of where a journey has been and what happened along the way.

### The Loads tab — the architecture fix made visible

![Loads tab — load list on left, load details with tracking and map on right](/assets/my-journeys/loads-alt.png)

This is where the master/child trip fix becomes real. All loads for a journey are listed on the left. Selecting a load shows its tracking details, current location, STA, and a map with the route — all in the same view without leaving the journey context.

![Loads tab — load details with LRN, invoices, and item details](/assets/my-journeys/loads.png)

Each load also has a details view showing LRN numbers, invoice information, item details with material codes and quantities, and delivery/pickup addresses. Previously, this information was scattered across child trip rows and cramped inline frames. Now it's organized under one journey with clean navigation between loads.

### Map view

![Map view — vehicle list on left, full-screen map showing all routes and positions](/assets/my-journeys/map-view.png)

The map view shows all vehicles with their routes on a full-screen map, with a journey list panel on the left. Users can select any vehicle to see its route, current position, and journey details. This view serves the spatial thinkers — ops managers who need to see where everything is geographically.

### Exception-first design

Badges on each journey row show on-time, delayed, long stoppage, route deviation, detained. Problems surface themselves instead of hiding in a flat list.

### Customizable info bar

Every customer had different needs. A cement company wanted temperature data. A shipping company needed container IDs. A manufacturer used SAP IDs. The table columns became configurable because one-size-fits-all doesn't work in logistics.

### What pushed back

**Users resisted the dedicated page.** Some ops users said: "Now I have to click and go to another page. Earlier I could quickly expand."

They were optimized for speed and familiarity. I was optimizing for clarity and scalability.

I solved this by keeping the row-level summary strong enough that most decisions could be made without clicking in, ensuring fast back navigation, and carrying pre-filtered context so users didn't lose their place. The tradeoff was deliberate: **I sacrificed micro-speed for macro clarity.** The inline frame couldn't support MPMD, multimodal, or cross-border journeys. The new architecture could.

**Exception badges overwhelmed some users initially.** With badges for every alert type visible at once, some users felt "everything looks like a problem." The system had shifted from neutral to opinionated — and opinionated systems need calibration. We tuned thresholds, reduced noise, and grouped related alerts instead of showing each one individually.

**Journey model created conceptual complexity.** Backend discussions got tangled: what's a journey vs a load vs a leg? How do we map legacy data? What happens to existing reports? The new model was more correct, but harder to explain. Accurate and easy-to-understand pulled in opposite directions.

### Design leading architecture

When my PM and I showed the new UI prototypes to the architecture team, the designs exposed missing relationships in the existing data model. The visual separation of journeys from loads, the milestone timeline, the way we showed legs and stops — these became the blueprint for how the backend Journey Model was structured.

Instead of UI following architecture, the design led it. The interface became the specification for API structures and data mapping.

### What I had to cut

Some things I wanted but couldn't ship in v10:

- Cross-journey comparison view — valuable for spotting patterns across shipments
- Bulk action handling across multiple journeys
- Predictive alerts for future delays
- SLA simulation tools

Scope decisions are design decisions. Saying what you cut shows you understand priority.

## 4. Key Design Decisions

**Organize around operational intent, not database entities.** TigerSight uses execute/overview/plan/agents — not orders/shipments/vehicles. Users think in jobs, not tables.

**Exception-first everything.** Across both layers, the design principle was the same: surface problems before users have to search for them. But this required constant calibration — opinionated systems need tuning.

**Sacrifice micro-speed for macro clarity.** The dedicated journey page was slower than inline expansion for one trip. But it scaled for complex journeys, enabled proper load hierarchy, and supported the architecture that MPMD and multimodal required.

**Design as architecture blueprint.** The UI prototypes shaped how the backend Journey Model was structured. This flipped the traditional process — design led architecture instead of following it.

## 5. Outcome

- Journey counts match reality — no more master/child confusion
- Users reach journey details in one click instead of expanding cramped inline frames
- Architecture supports SPSD, SPMD, MPMD, multimodal, and cross-border trips
- Managers shifted from asking "what's happening?" to "why is this delayed?"
- Manual filtering reduced through pre-filtered navigation from TigerSight
- Design prototypes directly influenced the Journey Model backend architecture
- v10 design patterns scaled across other TMS modules

## 6. What I Learned

- **Correct and easy-to-understand pull in opposite directions.** The new journey model was architecturally right but harder to explain. Design had to bridge that gap.
- **Opinionated systems need calibration.** Exception-first design is powerful but initially overwhelming. Thresholds, grouping, and noise reduction are ongoing design work.
- **Users optimize for familiarity, not clarity.** Pushback on the dedicated page taught me that better doesn't automatically mean preferred. You have to earn the transition.

## 7. Takeaway

> The strongest product redesigns don't just fix interfaces. They fix mental models, influence system architecture, and change how people work — not just what they see.
