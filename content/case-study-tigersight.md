## 1. Overview

TigerSight was designed as an AI-powered logistics control tower layered on top of Freight Tiger's TMS. The opportunity was not to create another reporting dashboard, but to build a system that helps operations teams understand what matters now, why it matters, and what should happen next.

From a product design perspective, TigerSight sits between the system of record and the system of action. The TMS stores transport events. TigerSight is the layer that turns those signals into operational awareness, decision support, and eventually automation.

That shift defined the project. I was not designing a dashboard for passive visibility. I was designing a control surface for live operations.

## 2. Product Context

Logistics operations teams usually work across fragmented tools and fragmented mental models. Journey status may live in one place, exception alerts in another, branch or lane patterns somewhere else, and escalation decisions in people's heads, calls, or spreadsheets.

That fragmentation creates three recurring issues:

- teams can see data, but still struggle to understand operational risk
- identifying the right issue often takes too long
- users move from monitoring to diagnosis to action through multiple disconnected surfaces

TigerSight was designed to compress that workflow into one product ecosystem where live visibility, exception handling, network understanding, and AI-assisted intervention come together.

## 3. Problem

The product problem was not a lack of data. It was a lack of decision support.

Traditional dashboards answer questions like:

- what happened
- how many journeys are delayed
- where the vehicles are

But operations teams need a different layer of support:

- what needs attention right now
- where the risk is concentrated
- whether the issue is isolated or systemic
- what action should follow

Without that layer, the operator becomes the integration point between multiple systems. That increases cognitive load, slows response, and makes decision quality depend too much on individual effort.

## 4. Users

TigerSight implied multiple user groups, each with a different operational lens.

### Primary users

- control tower operators managing live disruptions and exception triage
- operations managers reviewing fleet and network health
- logistics leaders tracking systemic issues across branches, lanes, and partners

### Secondary users

- planning and network teams studying route or shipment patterns
- innovation stakeholders evaluating AI-driven intervention and automation workflows

This mattered because the product could not be shaped around one generic dashboard. It needed to support multiple modes of operational thinking without collapsing into noise.

## 5. Core Product Thesis

The strongest product thesis behind TigerSight was this:

> Logistics operations should be managed as a live command problem, not a reporting problem.

That led to one of the most important product decisions in the project: the app was organized around operating modes rather than only around backend entities.

Instead of centering the experience on tables like orders, shipments, or journeys, the product moved users into intent-led zones such as:

- execute
- overview
- plan
- agents

This was a strong product decision because users in operational environments think in terms of jobs:

- monitor live conditions
- handle disruptions
- understand network effects
- improve future flow
- automate repetitive intervention

Designing around those jobs created a more meaningful product architecture than a standard enterprise navigation tree.

## 6. My Design Perspective

### 6.1 Designing for perceived seriousness

TigerSight did not present itself like a clerical enterprise tool. The welcome and app framing positioned it as an AI-powered control tower with a mission-critical identity.

That was an intentional design move. In logistics, user adoption is influenced not only by utility but also by whether the product feels trustworthy, premium, and worthy of operational attention. The experience needed to feel closer to an operations theater than a static admin interface.

### 6.2 Designing for awareness before detail

Maps, panels, overlays, and segmented status blocks were not just stylistic choices. They reflected the fact that logistics is spatial, time-sensitive, and interruption-heavy. A map-first interface helps users orient quickly. Layered panels help them move from broad awareness into focused inspection.

The visual system was intentionally dense, but the goal was not density for its own sake. The goal was to support faster operational understanding.

## 7. Key Product Decisions

### 1. Organize around operational intent

One of the strongest product decisions was to separate the experience into operational modes rather than flatten everything into one dashboard. This made the system more aligned with what users were trying to do in the moment.

### 2. Make exception handling the product core

The exception console emerged as the most important wedge because that is where operational urgency and business value are highest. Visibility alone is easy to commoditize. Faster detection, prioritization, and response to real disruptions is much more defensible.

### 3. Expand from trip-level visibility to network intelligence

The network view mattered strategically because it extended the product beyond firefighting. It created a path from immediate issue response into structural understanding, which opens up longer-term value in planning, procurement, and performance improvement.

### 4. Treat AI as workflow support, not novelty

TigerSight's AI direction was strongest when it focused on specific operational jobs such as briefings, alert triage, diversion detection, voice intervention, and optimization. That was a better product decision than exposing a generic assistant because enterprise users trust structured outputs and narrow job-specific helpers more than open-ended AI.

## 8. Key Design Decisions

### 1. Build the product around a command loop

The core UX pattern across the strongest surfaces followed a clear loop:

detect -> understand -> prioritize -> act

That loop gave the product coherence and prevented it from stopping at passive reporting.

### 2. Use map-led interaction for operational contexts

The map was treated as a workflow surface, not just a visualization. This helped users connect journey state, route movement, delay patterns, and local context in one place.

### 3. Support drilldown from macro to micro

A strong control tower product cannot trap users at the KPI level. I leaned toward interfaces that start broad, then let users filter by severity, category, delay bucket, branch, transporter, or specific journey until ambiguity narrows.

### 4. Design AI outputs as operational artifacts

The AI layer was strongest when it produced something users already understand, such as a control-tower briefing or a recommended next action. That design choice matters because it turns AI from a novelty layer into something operationally legible.

### 5. Create premium emotional framing without losing utility

The immersive entry experience and war-room tone were useful because they elevated perceived value. But the product still needed to earn trust through clarity and usefulness once the user entered the operational surfaces.

## 9. The Exception Console

The exception console felt like the real product core.

It brought together:

- live fleet visibility
- exception counts
- severity and category filters
- delay buckets
- journey state segmentation
- detail overlays
- contextual right-rail information
- AI-assisted interpretation

From a designer's perspective, this was the most coherent workflow in the product because it narrowed ambiguity instead of simply exposing information. The user could start with a fleet-level signal, isolate what mattered, inspect the affected journey, and get help interpreting what to do next.

This is where the product most clearly moved from dashboard thinking to decision-support thinking.

## 10. The Network View

The network dashboard extended the product into a different but equally important layer of value.

Instead of focusing on one disrupted journey, it allowed users to study:

- branches
- places
- consignees
- lane and trip patterns
- inbound and outbound journey health
- node-level network relationships

That changed the product from a tool for handling what is broken right now into a tool for understanding what keeps breaking repeatedly. Strategically, this is what gives TigerSight room to become a logistics intelligence platform rather than only an exception console.

## 11. AI and Agentic Direction

TigerSight's AI layer was the clearest sign that the product ambition was broader than visibility.

The most valuable direction was not "AI insights" in the abstract. It was AI embedded into operational jobs:

- create control-tower briefings
- triage alert streams
- detect diversion and route risk
- call drivers or transporters for follow-up
- recommend optimization actions

This was strong product thinking because enterprise AI adoption usually comes from narrow, high-utility jobs. The more the system can convert fragmented operations into structured decisions and repeatable interventions, the more credible the product becomes.

## 12. Strengths

- intent-led information architecture instead of entity-led navigation
- a strong wedge in live exception handling
- map-first operational design that fits logistics workflows
- believable expansion from visibility into intelligence and automation
- AI positioned as workflow augmentation rather than a generic layer
- strong emotional framing that increases perceived product value

## 13. Weaknesses and Risks

TigerSight also showed signs of a product still consolidating.

### Mixed surface maturity

Some modules felt decision-grade, while others appeared closer to exploratory or showcase surfaces. That creates trust risk if users cannot easily distinguish what is operationally authoritative.

### Product hierarchy drift

Concepts such as liveview, exceptions, summary, war-room, and cockpit risk overlapping unless each one is tied to a very crisp job-to-be-done.

### Role clarity and enterprise hardening

For an enterprise control tower, permissions, trust signals, and role-sensitive complexity matter as much as feature richness. Without those layers, the product can feel ambitious but not fully dependable.

## 14. Outcome

TigerSight represents a meaningful shift in product direction: from reporting and monitoring toward command-center decision support.

Its most important contribution is not just the visual style or the AI positioning. It is the effort to unify fragmented logistics operations into one navigable decision loop:

- monitor
- detect
- understand
- prioritize
- respond

That is a strong and defensible product direction for a logistics platform.

## 15. My Takeaway

TigerSight taught me that high-ambition B2B products create the most value when they are designed around operational intent rather than around system entities.

It also reinforced a harder lesson: in ambitious products, the next step is rarely more surface area. The next step is sharper hierarchy, stronger trust, and clearer definition of what the product wants to be primary.

TigerSight already showed the ambition of a differentiated control tower. The design challenge going forward is to consolidate that ambition into one clearer operational home.
