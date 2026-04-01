## 1. The Orchestration Gap

Freight Tiger's TMS manages thousands of shipments daily across multiple modules — journey tracking, invoicing, planning, PTL workflows. Each module generates its own exceptions: delayed journeys, route deviations, long stoppages, detained trucks, SLA breaches.

We had alerts everywhere. No one knew which one mattered.

An operations team member had to check multiple surfaces, make manual calls, maintain spreadsheets, and hold context in their head. A delayed truck might sit unnoticed for hours because the alert was in one system and the person who could act on it was watching another.

Operations teams spent most of their time discovering problems instead of solving them.

## 2. Foundation: What Was Already Shipped

Before building Control Tower, we solved the visibility layer first through the Reporting Module.

What we built:

- self-serve reporting
- scheduled and on-demand reports
- standardized templates
- audit-ready logs

Impact:

- less than 2 minutes report generation
- 90%+ reduction in turnaround time
- 138+ hours saved per month

You cannot build intelligent systems on unreliable data. The reporting layer gave us a reliable foundation. Once visibility worked, the next question was obvious: how do we move from visibility to action?

## 3. Where Control Tower Sits

Control Tower is not inside the TMS. It sits above it as an orchestration layer.

It pulls exceptions from all modules — My Journeys, invoicing, planning, PTL — and presents them in two forms:

- **Tickets** for managed service teams who resolve issues on behalf of clients
- **Alerts** for consignors who need visibility into what's happening with their shipments

Same exceptions, different presentation based on the user's role. This distinction matters: managed service operators need a workflow-driven ticket system. Consignors need awareness and the ability to escalate.

![Control Tower — Alert list with priority cards, SLA tracking, and AI/human agent assignment](/assets/control-tower/alert-list.png)

The alert list shows all active exceptions with priority summary cards at the top (Critical, High, Medium, Low, On Hold, Expired), a resolution progress ring, and a table showing each alert's type, vehicle, driver, transporter, assigned agent (AI or human), SLA countdown with visual progress bars, and alert duration.

## 4. Human–AI Collaboration

The core principle: **AI assists. Humans control.**

AI handles:

- alert detection and classification
- prioritization (P0 to P3)
- automated outreach to drivers and transporters via IVR
- monitoring and validation
- escalation logic

Humans handle:

- ambiguity and edge cases
- final decisions
- compliance and penalties
- exceptions AI cannot resolve

Users can take over from AI at any point, or assign back when appropriate. Every action — whether by AI or human — is logged in a full audit trail.

## 5. A Real Scenario — Long Stoppage at a Loading Plant

A truck reaches a loading plant. Expected loading time: 1 hour. Three hours pass. The truck hasn't moved.

![Alert Details — Long stoppage timeline with AI actions, map, risk score, and human takeover controls](/assets/control-tower/alert-details.png)

The alert detail view shows the full progressive story on the right — stoppage detected, AI agent assigned, monitoring in progress, driver unreachable. The left side shows the vehicle's position on the map with the stoppage location. Risk score, confidence, and impact are visible at the top. At the bottom: "Stop AI Agent" and "Take over from AI Agent" buttons — the controlled autonomy in action.

**Detection.** The system sees no movement within the geofence. AI classifies it as a long stoppage. Initial priority: P2.

**Automated handling.** AI calls the driver via IVR and asks for a reason. Possible outcomes: "waiting for loading," "documentation delay," or no response.

**Escalation.** No response from the driver. Delay exceeds the threshold. Priority escalates from P2 to P1. AI contacts the transporter.

**Human handoff.** Still unresolved. A ticket is assigned to an ops executive. They see the full timeline — who was contacted, when, what was said, what failed. They don't start from zero.

**Resolution.** The ops executive calls the plant, identifies a loading queue bottleneck, gets the truck prioritized.

**Closure.** The system records the resolution reason, all timestamps, every action by AI and human. Full audit trail.

Without Control Tower, this delay gets discovered late, escalation is informal, and there's no record of what happened. With Control Tower, the issue becomes a managed workflow from the moment it's detected.

### What the user sees

Not just an alert. They see:

- a timeline showing the full story of the issue
- who acted at each step (AI agent / human agent / system / transporter)
- current state and what needs to happen next
- suggested actions and resolution workflows

Every alert is treated as a progressive story, not a static record.

## 6. Key Design Decisions

### Timeline-based interface

Every alert is an evolving operational story — what happened, who acted, what changed, what the current state means. This made the system understandable under live operational pressure.

### Ownership clarity at every step

Each step clearly identifies the acting entity — AI agent, human agent, system, or transporter. This is critical for enterprise trust and accountability.

### Controlled autonomy

Users can take over from AI or assign back when appropriate. This creates a practical balance between automation and operational control.

### Triage-inspired priority model

- P0 = critical, P1 = high, P2 = medium, P3 = low
- Escalations follow layered severity progression (L1 to L3)

This encodes urgency in a consistent and operationally meaningful way.

### Actionable UI

Instead of exposing data, the interface surfaces suggested actions, next best steps, and resolution workflows. The product is useful for execution, not only observation.

## 7. What Was Hard

**Calibrating AI autonomy.** Too aggressive and the system creates noise — every minor delay becomes an alert. Too conservative and issues slip through. Finding the right thresholds was ongoing work, not a one-time design decision.

**Enterprise trust is earned slowly.** Operations teams don't switch from spreadsheets and phone calls to an automated system overnight. The full audit trail, clear ownership labels, and the ability to override AI at any step — these were trust-building design decisions, not features. Automation must always be inspectable and controllable.

**Ticket vs alert distinction.** Managed service teams and consignors need fundamentally different interfaces for the same underlying data. Getting this right meant understanding two different mental models and serving both without building two separate products.

## 8. System Design for Scalability

The system was designed as a state-driven model. Each step in the alert lifecycle is driven by structured fields — event type, actor (AI / Human / System), status, and context.

The UI renders each state using consistent layers:

- header
- action summary
- why this happened / what next
- supporting evidence

This allows consistency across alert types, scalability across workflows, and easier extension to future agents and automations.

## 9. How This Connects

Control Tower is the orchestration layer in a broader redesign of Freight Tiger's TMS:

- **TigerSight** gives the bird's-eye operational view and routes users to where attention is needed
- **My Journeys** is where deep journey-level analysis and action happens
- **Control Tower** sits above everything, pulling exceptions from all modules and coordinating resolution through AI agents and human operators

While TigerSight and My Journeys are surfaces within the TMS, Control Tower operates above it — watching everything and intervening when something breaks.

## 10. Outcome

- Structured alert system replacing scattered manual tracking
- AI-assisted resolution reducing human workload for routine exceptions
- Clear escalation logic so critical issues reach the right person faster
- Full audit trail for every exception — who acted, when, why
- Foundation for scaling automation across all TMS modules

## 11. What I Would Improve Next

If this evolved further, I would explore:

- a stronger explainability layer for why AI acted the way it did
- cost and risk impact visualization tied to each exception
- multi-alert orchestration views for handling related issues together
- policy simulation and what-if scenarios for threshold tuning

## 12. Takeaway

> Enterprise users don't trust automation because it exists. They trust it when they can inspect it, control it, and understand why it acted.
