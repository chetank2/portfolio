## 1. Overview

TigerSight is Freight Tiger's AI-powered logistics control tower, designed to help operations teams monitor live movement, detect disruptions early, understand network impact, and act faster.

It was not conceived as another reporting dashboard. It was designed as an operational layer above the TMS that turns fragmented transport signals into actionable awareness.

At Freight Tiger, the TMS remains the system of record. TigerSight is the layer that helps users answer:

- what needs attention right now
- what is likely to go wrong next
- where risk is concentrated
- what action should follow

Over time, TigerSight evolved into a structured execution environment with four operational surfaces inside **Execute**:

- **Live View**
- **Exceptions**
- **Network**
- **Summary Dashboard**

That shift mattered. The product moved from showing transport data to supporting operational decision-making.

## 2. Product Context

Logistics operations rarely happen in one clean workflow. Journey states, delays, branch health, alerts, transporter issues, and escalation decisions are usually scattered across multiple systems, calls, spreadsheets, and WhatsApp groups.

That fragmentation creates recurring operational problems:

- teams can access data but still struggle to identify real risk
- issue prioritization takes too long
- monitoring, diagnosis, and response happen across disconnected surfaces
- users become the integration layer between systems

TigerSight was designed to reduce that fragmentation by bringing together fleet monitoring, exception triage, network intelligence, AI-assisted reasoning, and operational summaries in one ecosystem.

The platform is still strongest in FTL-style, journey-led operations, but the direction increasingly includes PTL contexts as well, especially in operational summaries and broader execution visibility.

## 3. Problem

The problem was never lack of data. It was lack of decision support.

Traditional logistics dashboards answer questions like:

- where are the vehicles
- how many journeys are delayed
- what happened

Operations teams need a different layer:

- what needs attention now
- what is already delayed vs likely to become delayed
- which branch, transporter, route, or consignee is driving the issue
- whether a problem is isolated or systemic
- what the next action should be

Without that layer, even a data-rich product becomes operationally weak. Users spend too much time manually stitching together signals instead of deciding.

TigerSight was designed to close that gap between visibility and action.

## 4. Users

TigerSight serves multiple operational roles, each with a different lens.

### Primary users

- control tower operators managing active journeys and exception triage
- operations managers reviewing delay concentration and branch-level issues
- logistics leaders tracking systemic performance across transporters, routes, and facilities

### Secondary users

- planning and network teams studying recurring disruption patterns
- innovation and automation stakeholders evaluating AI- and agent-led workflows
- teams gradually moving from FTL-led monitoring into broader PTL-aware execution visibility

This mattered because the product could not be optimized around one generic dashboard. It had to support multiple modes of operational thinking while keeping each mode legible.

## 5. Core Product Thesis

**Logistics operations should be managed as a live command problem, not a reporting problem.**

That led to one of the most important product decisions in the work: organize the experience around **operating intent**, not just backend entities.

Instead of structuring the product only around objects like orders, loads, or journeys, TigerSight was organized around jobs:

- understand what is happening
- monitor live movement
- handle disruptions
- understand network effects
- support future action and automation

That thinking shaped the architecture:

- **Overview** for high-level health and context
- **Execute** for live operational work
- **Plan** for future-facing decision support
- **Audit** for review, confidence, and traceability
- **Agents** for structured AI and automation direction

Within **Execute**, the workflow becomes even more explicit:

- **Live View** for monitoring
- **Exceptions** for triage
- **Network** for structural intelligence
- **Summary Dashboard** for compact execution summaries

That hierarchy reflects how users actually work.

## 6. My Design Perspective

### 6.1 Designing for operational seriousness

TigerSight was intentionally framed as a premium control-tower product, not a clerical admin interface.

In logistics, perceived seriousness affects trust and adoption. The product needed to feel worthy of operational attention.

### 6.2 Designing for awareness before detail

The core interaction model was built around moving from broad awareness into focused inspection:

- map-first visibility
- left-rail summaries and filters
- right-panel inspection
- progressive drilldowns
- AI-assisted overlays for interpretation

The goal was not density for its own sake. The goal was to reduce ambiguity quickly.

## 7. Key Product Decisions

### 1. Make Execute the operational home

One of the clearest product decisions was to make **Execute** the place where live work happens, rather than letting execution logic blur into Overview or static reporting.

### 2. Separate operational modes inside Execute

Instead of forcing all operational questions into one overloaded screen, Execute was split into four focused views:

- Live View
- Exceptions
- Network
- Summary Dashboard

This created a better match between user intent and surface design.

### 3. Make exception handling the strongest wedge

TigerSight's strongest near-term value comes from helping teams detect, classify, prioritize, and respond to disruptions faster.

### 4. Expand from journey-level visibility to network intelligence

The Network view extends the product beyond firefighting and creates a path into structural understanding.

### 5. Treat AI as workflow support, not novelty

TigerSight's AI direction is strongest when embedded into operational tasks such as trip interpretation, alert reasoning, and next-step recommendations.

## 8. Key Design Decisions

### 1. Build around a command loop

The strongest TigerSight surfaces follow a simple loop:

**detect -> understand -> prioritize -> act**

That loop created coherence across views and kept the product from becoming passive reporting software.

### 2. Use the map as a workflow surface

The map is not decoration. In TigerSight it becomes the orientation layer for movement, disruption, route context, and investigation.

### 3. Support drilldown from macro to micro

A control tower cannot stop at the KPI level. The product needed to let users move from:

- fleet-level states
- exception types and reasons
- branch, transporter, route, and consignee views
- individual journeys
- AI-supported interpretation

### 4. Distinguish operational issue types clearly

The Exception Console became significantly stronger once different issue states were separated instead of collapsed under one generic "delay" concept.

This included:

- **Delayed**
- **Going to be delayed**
- **Detained**
- **Compliance**
- **Driving Issues**

That made the product model more truthful and operationally useful.

### 5. Design AI outputs as operational artifacts

The AI layer works best when it produces outputs users can immediately act on:

- trip intelligence
- what's happening
- what's next
- actions required

## 9. Live View

Live View acts as the active operational radar for the fleet.

It brings together:

- journey-state segmentation
- live vehicle map
- branch, transporter, route, and consignee breakdowns
- journey selection and right-panel context
- quick transitions into deeper inspection

From a design perspective, Live View is where users orient themselves before deciding whether an issue requires intervention.

It is intentionally map-first and state-led, because in logistics the first question is often spatial and temporal: where is the movement, and what state is it in?

## 10. The Exception Console

The Exception Console is the strongest operational core of TigerSight.

It brings together:

- delayed and predicted-delay monitoring
- detained vehicles as a separate operational state
- compliance and driving-issue modes
- reason-level charts and drilldowns
- branch, transporter, route, and consignee analysis
- map-linked journey inspection
- AI-assisted trip interpretation

This is where the product most clearly moves from dashboard thinking to decision-support thinking.

Users can start from a fleet-level signal, isolate the issue type, narrow it by reason or dimension, inspect the affected journey, and move into action with more context.

## 11. The Network View

The Network dashboard extends the product from journey-level problem-solving into structural intelligence.

It allows users to inspect:

- branches
- places
- consignees
- inbound and outbound movement
- lane and trip flow
- facility-level health
- network patterns

This changes TigerSight from a tool for handling what is broken right now into a tool for understanding what repeatedly breaks and where the network is fragile.

That is important strategically because it gives the product a path from exception management into logistics intelligence.

## 12. Summary Dashboard Inside Execute

Placing the **Summary Dashboard** inside **Execute** instead of a generic overview surface was a meaningful product refinement.

These summaries still belong to execution work. They are not only leadership reporting. They act as compact operational summaries for users who need a quick read on current execution health.

This also opens a cleaner path for PTL-aware operational visibility. While TigerSight remains strongest in journey-led FTL workflows, Summary Dashboard is one of the places where broader execution summaries can begin to support both FTL and PTL contexts without forcing the entire product into one model prematurely.

## 13. AI and Agentic Direction

TigerSight's AI direction matters because it moves the product beyond visibility.

The most valuable direction is not generic "AI insights." It is structured operational support:

- trip intelligence summaries
- key findings from live conditions
- likely causes of disruption
- recommended next steps
- action-oriented outputs for operators

The dedicated **Agents** direction reinforces the idea that TigerSight is evolving from a monitoring layer into a more active operational platform.

## 14. Relationship to My Journeys

TigerSight and My Journeys are connected, but they solve different layers of the operational workflow.

- **TigerSight** is the awareness and triage layer
- **My Journeys** is the deeper execution layer for journey-level work

That relationship is important because it explains Freight Tiger's broader product strategy:

- first orient the operator
- then route them into execution with context already narrowed

TigerSight is not a replacement for journey-level execution. It is the control tower that makes that execution more informed.

## 15. Strengths

- intent-led product architecture instead of entity-led navigation
- strong wedge in exception-driven operations
- map-first interaction model that fits logistics workflows
- clearer separation between monitoring, triage, network analysis, and summary
- believable path from visibility into intelligence and automation
- AI framed as workflow support rather than novelty
- stronger product hierarchy after placing Summary Dashboard under Execute

## 16. Weaknesses and Risks

### Mixed surface maturity

Some parts of the product feel closer to decision-grade operational tools, while others still feel more exploratory.

### Product hierarchy pressure

Concepts such as Overview, Execute, Summary Dashboard, War Room, and Agents can overlap unless each is tied to a clear job-to-be-done.

### Dependability requirements

A true enterprise control tower still depends on strong permissions, auditability, trust signals, and role-aware complexity.

### Geographic correctness and compliance

Because the product is map-heavy and used in an Indian context, political map correctness is not cosmetic. It directly affects trust and product credibility.

### PTL expansion complexity

Supporting PTL meaningfully is not just a toggle problem. It changes how monitoring, summarization, and execution should be modeled. That expansion needs deliberate product framing, not superficial parity.

## 17. Outcome

TigerSight represents a meaningful shift in Freight Tiger's product direction: from reporting and monitoring toward command-center decision support.

Its most important contribution is the effort to unify fragmented logistics work into one operational loop:

- monitor
- detect
- understand
- prioritize
- respond

That is a strong and defensible direction for a logistics platform.

## 18. My Takeaway

TigerSight reinforced that high-ambition B2B products create more value when they are organized around **operational intent** rather than around raw system entities.

It also reinforced a harder product lesson: the next step in a complex control tower is not simply more surface area. It is better hierarchy, stronger trust, and clearer definition of what each mode is responsible for.
