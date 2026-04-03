## Overview

TigerSight is Freight Tiger's AI-powered logistics control tower, built on top of the TMS to help operations teams monitor live movement, detect disruptions early, understand network impact, and act faster.

This was never intended to be another reporting dashboard. The goal was to create an operational layer that turns fragmented transport signals into awareness, prioritization, and action support.

Over time, TigerSight evolved into a structured execution environment inside Freight Tiger with four core operational surfaces:

- Live View
- Exceptions
- Network
- Summary Dashboard

That shift changed the product from passive visibility into a control surface for real-time operations.

---

## Product Context

Freight Tiger's TMS already contained trips, milestones, alerts, and transport events. But users still had to piece together what mattered.

Journey state might be visible in one part of the system, exception alerts in another, branch or lane patterns elsewhere, and escalation decisions often happened outside the product entirely.

That created a familiar operations problem:

- teams could access data but struggled to identify risk quickly
- issue prioritization took too long
- monitoring, diagnosis, and action happened across disconnected surfaces
- decision quality depended too much on individual effort

TigerSight was designed to close that gap.

It sits between the **system of record** and the **system of action**. The TMS stores transport data. TigerSight transforms that data into operational awareness, exception workflows, network understanding, and AI-assisted decision support.

---

## Problem

The problem was not lack of visibility. It was lack of decision support.

Traditional logistics dashboards can answer where vehicles are, how many journeys are delayed, or what happened. But operations teams need something more useful:

- what needs attention right now
- what is already delayed versus likely to become delayed
- whether the issue is isolated or systemic
- which branch, transporter, route, or consignee is driving the problem
- what action should follow next

Without that layer, even a data-rich dashboard remains operationally weak.

TigerSight was designed to move Freight Tiger from monitoring to command-center decision support.

---

## Users

TigerSight serves multiple operational lenses rather than one generic dashboard audience.

The primary users are control tower operators managing live journeys and disruptions, operations managers monitoring fleet and branch health, and logistics leaders tracking systemic issues across transporters, routes, and facilities.

The secondary users include planning teams studying recurring breakdowns, innovation stakeholders evaluating AI-led intervention, and teams gradually expanding from FTL-led workflows toward PTL-aware execution visibility.

This mattered because the product could not be designed around one static reporting view. It had to support different ways of thinking without collapsing into noise.

---

## Core Product Thesis

The strongest product thesis behind TigerSight was simple:

**Logistics operations should be managed as a command problem, not a reporting problem.**

That idea shaped the entire product structure.

Instead of organizing the experience purely around system entities like trips, loads, or orders, TigerSight was organized around user intent. That became visible in the top-level structure:

- Overview
- Execute
- Plan
- Audit
- Agents

Inside **Execute**, the product became more explicit still:

- **Live View** for monitoring
- **Exceptions** for triage
- **Network** for structural understanding
- **Summary Dashboard** for compact operational summaries

This was not just an information architecture decision. It was a product model aligned with how users actually work.

---

## What I Designed

My role was not limited to one screen or one sprint. I helped shape TigerSight across multiple connected layers:

- operational information architecture
- map-first workflows
- exception-led interactions
- network intelligence surfaces
- execution summaries
- AI-assisted trip interpretation
- production-facing interaction behavior and system consistency

As the product matured, the work also became increasingly code-driven. I used code not just to validate visual ideas, but to shape interaction patterns, panel behavior, routing logic, and the operational fidelity of the experience.

That mattered because TigerSight was not meant to stay as a proof-of-concept. It had to become a product direction that could work for real customers.

---

## Live View

Live View became the active monitoring surface for the fleet.

It combines journey-state segmentation, a live map, high-level counts, and breakdowns by branch, transporter, route, and consignee. Users can select any journey and immediately inspect more context in the right panel.

The point of Live View is orientation. It helps teams understand current fleet state before they enter deeper investigation or triage.

From a design perspective, it works as the operational radar of the product.

---

## The Exception Console

The Exception Console became the strongest operational core of TigerSight.

It evolved from a simple delay surface into a broader issue console with modes such as:

- Delayed
- Going to be delayed
- Detained
- Compliance
- Driving Issues

That change was important. Not every operational problem should be treated as the same type of delay.

The Exception Console now supports issue-type segmentation, reason-level charts, branch/transporter/route/consignee drilldowns, map-linked inspection, single-journey overlays, and AI-assisted interpretation.

This is where the product most clearly shifts from visibility into decision support. Users start with a signal, narrow the ambiguity, inspect the affected journey, and get help understanding what to do next.

---

## The Network View

The Network dashboard extended TigerSight from journey-level operations into structural logistics intelligence.

Instead of focusing on one disrupted trip, it helps users understand branches, places, consignees, inbound and outbound flow, lane patterns, and facility-level health.

This changes the product from something that only answers "what is broken right now?" into something that begins to answer "what keeps breaking, where, and why?"

That shift is strategically important because it gives TigerSight a path beyond exception handling into network intelligence.

---

## Summary Dashboard Under Execute

A meaningful product refinement was placing **Summary Dashboard under Execute**, rather than letting it overlap with Overview.

That made the hierarchy cleaner. Summary Dashboard became a compact execution-summary surface, not a generic reporting screen.

It helps users quickly understand current operational health while staying inside the execution context.

It also creates a better space for PTL-aware visibility. TigerSight remains strongest in FTL-led, journey-based workflows, but summary-oriented surfaces are one of the right places for broader PTL execution visibility to grow.

---

## AI and Agentic Direction

TigerSight's AI direction became strongest when it behaved like workflow support rather than novelty.

The most valuable outputs were not generic "AI insights," but structured operational artifacts:

- trip intelligence
- key findings
- what's happening
- what's next
- actions required

These outputs worked because they fit how operators already think and act.

The emergence of an **Agents** direction pushes this further. It suggests a future where TigerSight does not only help teams understand the system, but also supports intervention and structured action.

---

## From POC to Production

One of the most important parts of this project is that TigerSight did not remain a concept.

Many B2B design initiatives stop at a vision deck, a prototype, or an internal demo. TigerSight moved much further. It evolved through concept exploration, proof-of-concept interactions, shared map shells, reusable panel behavior, tighter execution hierarchy, FT design system alignment, and production hardening across themes, states, and customer contexts.

That meant the design challenge changed over time.

Early on, the question was: **What should a logistics control tower feel like?**

Later, the question became: **How does this become a stable operational product that works across real customer conditions?**

That second question is where a lot of the real product work happened.

---

## Vibe Coding as a Design Method

A major part of this project was using code-driven iteration as part of the design process.

Not in the superficial sense of generating screens quickly, but in a more useful way: using code to validate interaction ideas directly in the product, refine operational workflows, and close the gap between design intent and shipped behavior.

As a product designer, this changed my role. I was not only defining screens and flows. I was also shaping panel behavior, interaction patterns, layout systems, and production-facing refinements.

That mattered because TigerSight could not become a strong product through static design alone. It needed repeated iteration inside the real system.

The value of this approach was not speed for its own sake. It was fidelity. It helped move the work beyond a flashy proof-of-concept into a usable and increasingly production-grade product direction.

---

## Connection to My Journeys

TigerSight and My Journeys solve two connected but different layers of the same operational problem.

TigerSight is the **awareness and triage layer**. It helps users understand what matters, where risk is concentrated, and what needs action first.

My Journeys is the **execution layer**. It is where users go deeper into the operational object itself: the journey, its loads, tracking details, escalation context, and execution workflow.

This connection is important because it explains Freight Tiger's broader product strategy. The system no longer throws every user into a flat list. Instead, it first helps them orient, then routes them into execution with the right context already narrowed.

That relationship is what makes the older TMS redesign story still important. My Journeys solved the structural execution problem. TigerSight added the awareness and control-tower layer above it.

---

## Strengths

TigerSight's biggest strengths come from how deliberately it organizes operational work.

It has an intent-led architecture instead of an entity-led one. It has a strong wedge in exception-driven operations. It uses a map-first interaction model that fits logistics workflows. It separates monitoring, triage, network intelligence, and summary views more clearly than most enterprise systems do. It presents AI as workflow support rather than novelty. And importantly, it pushed design work beyond concept into production-facing product development.

---

## Risks

TigerSight also carries the risks common to ambitious operational systems.

Surface maturity is still uneven in places, which creates trust pressure. Product hierarchy still needs discipline to avoid overlap between concepts like Overview, Execute, Summary Dashboard, and Agents. PTL expansion needs deliberate product modeling rather than shallow parity. And because the product is map-heavy and used in an Indian operational context, geographic correctness is a trust issue, not just a visual one.

---

## Outcome

TigerSight represents a meaningful shift in Freight Tiger's product direction.

It moves the system from monitoring and reporting toward command-center decision support.

Its value is not only visual or AI-led. Its value lies in unifying fragmented logistics work into a clearer loop:

monitor, detect, understand, prioritize, and respond.

That is a strong and defensible direction for a logistics platform.

---

## Takeaway

TigerSight reinforced that strong B2B products are not built by polishing isolated screens. They are built by aligning system structure, user intent, workflow logic, interaction behavior, and increasingly product reality in code.

It also reinforced that code-driven design is only valuable when anchored in product thinking. Used carelessly, it creates shallow novelty. Used well, it helps turn ambitious concepts into real product systems.

TigerSight was one of the clearest examples I've had of that happening in practice.
