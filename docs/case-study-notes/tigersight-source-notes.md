# TigerSight Source Notes

Saved for future case-study writing, product review, and portfolio refinements.

## Source Material

Case Study
TigerSight is not just a dashboard. From the repo, it is positioned as an AI-assisted logistics control tower layered on top of FreightTiger’s TMS, with the product promise centered on live visibility, exception response, network understanding, and eventually autonomous operations. That thesis is visible in the app shell, which routes users into execute, plan, overview, and agents modes rather than into a single reporting surface (App.tsx (line 136), SummaryDashboardPage.tsx (line 59), SummaryDashboardPage.tsx (line 180)).

From a product-design perspective, the repo shows a deliberate attempt to turn logistics monitoring into an “operations theater.” The user is welcomed into an immersive fullscreen experience before seeing the product, with branding that explicitly says “AI-Powered Control Tower” and emphasizes real-time fleet visibility and proactive risk management (App.tsx (line 80), WelcomePage.tsx (line 39), WelcomePage.tsx (line 94)). This is a strong statement of intent: the product wants to feel mission-critical, not clerical. That matters because logistics users often live between high-volume operational work and low-trust enterprise software. TigerSight is trying to increase perceived value by feeling closer to an air-traffic-control console than a spreadsheet UI.

Product Problem Being Solved
The core user problem appears to be fragmentation. A logistics operator normally has to piece together journey status, delays, stoppages, carrier performance, branch issues, and network-level patterns across multiple systems. TigerSight tries to collapse that fragmented workflow into one decision layer. The central console combines live vehicles, exception counts, severity/category breakdowns, tracking details, journey alerts, road-snapped paths, street view, and AI-generated interpretation in one workspace (ExceptionCommandConsole.tsx (line 11), ExceptionCommandConsole.tsx (line 234)). That is strong product thinking because it targets the operational bottleneck directly: not “can the system store transport data,” but “can an operator notice risk early and act with confidence.”

Likely Primary Users
The repo suggests at least four user archetypes:

Control tower operators handling live disruptions and exception triage.
Logistics managers reviewing fleet/network health and performance.
Planning or network teams looking at order, shipment, and lane patterns.
Innovation or leadership stakeholders exploring AI agents and optimization tools.
This segmentation is implied by the tab model and modules: live exception console, network dashboard, summary/war-room views, traditional orders/shipments flows, and an agents area with voice calling, Sentry, Optima, and diversion detection (SummaryDashboardPage.tsx (line 16), AgentsService.ts (line 72)).

Experience Architecture
The strongest design decision in the project is the split between operational modes instead of business entities. The product is not organized primarily around “orders,” “journeys,” and “shipments.” It is organized around what the user is trying to do:

execute: live monitoring, exceptions, network, summary
plan: orders, shipments, PTL
overview: war-room view
agents: AI-led automation surfaces
That is a better product model than a standard ERP/TMS navigation tree because it aligns with user intent, not backend tables. The routing confirms this operating-model-first information architecture (SummaryDashboardPage.tsx (line 65), SummaryDashboardPage.tsx (line 183)).

Why the Exception Console Is the Product Core
The exception console looks like the real wedge. It merges:

live map
severity and category filters
delay buckets
branch/transporter/consignee breakdowns
journey-status tabs
detail overlays
AI analysis
right-rail contextual drilldown
This is good product design because the interface is built around narrowing ambiguity. The user starts broad, filters by severity/category/bucket/status, selects a journey, and then sees path, alerts, details, and recommended interpretation. That is a clear triage loop. It is much better than a KPI dashboard that simply tells the user something is wrong without helping them isolate where and why (ExceptionCommandConsole.tsx (line 171), ExceptionCommandConsole.tsx (line 252)).

From a product-thinking angle, this wedge is smart because exception response is where willingness-to-pay is highest. “Visibility” is easy to commoditize. “Faster identification and resolution of delays, stoppages, and route issues” is closer to measurable ROI.

Why the Network View Matters
The network dashboard extends the product from trip-level monitoring to system-level understanding. It lets the user move between branches, places, and consignees; switch between map and node graph; inspect outbound/inbound journey counts; and study lane/trip performance (NetworkDashboard.tsx (line 135), NetworkDashboard.tsx (line 170), NetworkDashboard.tsx (line 211)). This is important strategically. It means TigerSight is not only about firefighting. It wants to become the operating system for network intelligence. That creates expansion potential into planning, procurement, and performance benchmarking.

Why the Agents Area Changes the Category
The agents area is the clearest sign of the broader ambition. The hardcoded catalog includes voice-calling agents, a network optimizer, Sentry for auto-triage, and diversion detection (AgentsService.ts (line 72)). This pushes the product from “control tower dashboard” toward “operational copilots + autonomous workflows.” That is strong product thinking because dashboards alone eventually flatten into reporting tools. Agents create a second value layer: not just seeing problems, but resolving them.

The seeded voice assistants are also telling. They are operationally specific: delay caller, POD confirmation, arrival confirmation (AgentsService.ts (line 136)). This shows the team understands that AI adoption in logistics will come from narrow operational jobs with obvious utility, not generic chatbots.

Design Strengths
The strongest product-design strengths are:

Map-first interaction model for operational contexts.
Intent-based navigation instead of entity-based navigation.
Strong drilldown path from macro view to specific journey.
Visual and emotional positioning that makes the product feel high-value.
Clear attempt to translate AI into workflows, not novelty.
The welcome and loading sequences, while theatrical, help reinforce that this is a premium control surface rather than a commodity admin tool (App.tsx (line 66), WelcomePage.tsx (line 105)). For executive demos, pilots, and adoption in enterprises, that matters more than many teams admit.

Design Weaknesses
The biggest weakness is product coherence. The repo contains several maturity levels at once:

real API-backed operational surfaces
mock-backed war-room/cockpit modules
partially stubbed permissions
beta/live agent experiments
duplicated view-switcher patterns across modules
For example, permissions are effectively bypassed today; usePermissions returns all tabs and always allows access (usePermissions.ts (line 22)). That is not just a technical shortcut. It weakens enterprise product readiness because role-based tailoring is central to operational software.

Similarly, the war-room service explicitly uses mock data by default (warRoomApiService.ts (line 1)). That suggests some surfaces are still narrative/demo layers rather than trusted operator tools. From a product perspective, that creates risk: users may not know which parts are decision-grade and which are showcase-grade.

There is also information-architecture drift. The same product has “liveview,” “exceptions,” “summary dashboard,” “war-room,” and “cockpit” as adjacent ideas. That may reflect internal exploration, but it can confuse users unless the team defines each mode with a very crisp job-to-be-done.

Product Thinking Assessment
The product strategy appears to be:

Land with live visibility and exceptions.
Expand into network intelligence and planning support.
Differentiate with AI-generated analysis.
Move toward agentic resolution and automation.
That is a credible strategy. It creates a path from dashboard to decision layer to action layer. It also matches how enterprise SaaS grows: first consolidate data, then improve decisions, then automate work.

The best evidence of this is the AI insight layer. The fleet insight service is not designed as a generic chatbot. Its prompt asks for a control-tower briefing, pattern detection, and control-tower actions (fleetInsightService.ts (line 7), fleetInsightService.ts (line 103)). That is good product thinking because it packages AI into a familiar operational artifact: a briefing. Users trust framed outputs more than unbounded model responses.

Business Value Narrative
If I were writing the product case study for stakeholders, the business value case would be:

Reduce delay detection time.
Reduce operator cognitive load.
Increase actionability of fleet and network data.
Improve OTIF and carrier accountability.
Create leverage through automation rather than headcount.
That value narrative is especially strong in Optima and Sentry. Optima explicitly targets cost and OTIF improvement. Sentry targets alert detection, triage, driver calling, and escalation (AgentsService.ts (line 94), AgentsService.ts (line 105)).

Where the Product Is Still Fragile
The main risks are trust, clarity, and enterprise hardening.

Trust: mixed mock and real data can undermine operator confidence.
Clarity: too many overlapping modes can dilute the core story.
Hardening: permissions are stubbed, and the AI service currently contains a hardcoded API key, which is a serious product/operational risk because it weakens trust and deployment readiness (fleetInsightService.ts (line 187)).
That last point is not just security hygiene. In product terms, it affects whether TigerSight can graduate from pilot/demo behavior into a platform other enterprises can trust.

My Product Design Verdict
This is a high-ambition B2B operations product with a strong core concept and unusually good product instincts for workflow-centered design. The strongest idea is not the styling or the AI branding. It is the decision to turn fragmented logistics operations into one navigable command loop: detect, understand, prioritize, act.

The current repo feels like a product in transition from “impressive control tower prototype” to “reliable operational platform.” The design ambition is already there. The next product step is not more surface area. It is sharper product hierarchy:

define one primary operational home
make every adjacent view support that home
separate decision-grade surfaces from demo-grade surfaces
harden permissions, data provenance, and trust signals
If you want, I can turn this into a proper case-study document with sections like Problem, Users, JTBD, UX Strategy, Strengths, Gaps, Roadmap, and Portfolio Narrative in a polished presentation-ready format.

## Expanded Drafts

TigerSight Case Study
Product Design Perspective and Product Thinking Perspective

1. Overview
TigerSight is a logistics control tower product built on top of FreightTiger’s TMS ecosystem. Its purpose is not simply to display transport data, but to help operations teams monitor live movement, detect risk early, understand operational bottlenecks, and take action faster.

At a product level, TigerSight sits between a traditional TMS and an AI operations layer. The TMS is the system of record. TigerSight is trying to become the system of awareness and response.

This is visible in the repo structure itself. The app is not modeled as a basic dashboard with static reports. It is organized into execution-focused surfaces such as liveview, exceptions, network, summary, war-room, and agents, which indicates a product built around operational use cases rather than raw data entities (SummaryDashboardPage.tsx (line 59), App.tsx (line 136)).

2. Product Context
In transport and logistics operations, users usually struggle with three recurring problems:

Information is fragmented across journeys, orders, carriers, branches, and customer locations.
Most systems show status, but do not help teams interpret risk or prioritize response.
Operations teams spend too much time moving from monitoring to diagnosis to action.
TigerSight addresses this by creating a unified control surface where live vehicle monitoring, exception management, network visibility, and AI-assisted analysis live in one ecosystem.

The product promise is clear in the onboarding and welcome experience: real-time fleet visibility, exception monitoring, proactive risk management, and AI-powered insights across the logistics network (WelcomePage.tsx (line 39), WelcomePage.tsx (line 94)).

This immediately frames the product as a high-value operational command system, not a passive reporting dashboard.

3. Problem Statement
TigerSight is solving the problem of operational blindness in logistics.

Even when a TMS captures events correctly, operations teams still face questions like:

Which journeys need immediate attention right now?
Is the issue isolated or systemic?
Which branch, transporter, consignee, or route is causing the most disruption?
What is the likely root cause?
What should the control tower team do next?
Traditional dashboards answer “what happened.” TigerSight is trying to answer:

what matters now,
why it matters,
where the issue is concentrated,
and what action should follow.
That is a meaningful shift from analytics software to decision-support software.

4. Target Users
The repo suggests that TigerSight is designed for multiple operational personas.

Primary Users
Control tower operators monitoring active fleets and exceptions in real time.
Regional or branch operations managers overseeing delays, stoppages, and response quality.
Logistics heads who need a macro view of network health and performance.
Secondary Users
Planning teams optimizing shipment flows and network structure.
Innovation or transformation teams evaluating AI automation tools.
Leadership stakeholders who need war-room style visibility into active operations.
The product design supports this range through separate views for live execution, network analysis, planning-oriented tabs, and AI agents (SummaryDashboardPage.tsx (line 16), agentsService.ts (line 72)).

5. Core Product Thesis
The strongest product thesis in TigerSight is this:

Logistics operations should be managed as a live command problem, not a reporting problem.

That is why the product architecture emphasizes modes like:

execute
overview
plan
agents
instead of merely “orders,” “journeys,” and “shipments.”

This is good product thinking because users in operational environments do not think in terms of backend entities. They think in terms of tasks:

monitor live activity,
handle disruptions,
review network impact,
improve flow,
automate repetitive intervention.
TigerSight’s navigation structure reflects those jobs more than database structure, which is a sign of mature product framing (SummaryDashboardPage.tsx (line 65), SummaryDashboardPage.tsx (line 180)).

6. Product Design Perspective
6.1 Experience Design
The first thing TigerSight does is establish emotional positioning.

Before users even reach the main shell, the product offers a fullscreen, cinematic welcome experience with globe-based motion and “AI-Powered Control Tower” language (App.tsx (line 80), WelcomePage.tsx (line 15)).

From a product-design perspective, this does three things:

elevates perceived product value,
reinforces a mission-critical identity,
distinguishes the product from ordinary enterprise dashboards.
This kind of framing is important in B2B tools where adoption often depends as much on executive confidence and operator trust as on pure feature depth.

6.2 Information Architecture
TigerSight’s architecture is one of its best decisions.

Rather than present a flat dashboard, the app separates experience layers:

Live execution surfaces
Summary and war-room surfaces
Planning-related tabs
Agentic/AI workflows
This gives the product breadth without forcing every user into the same interface.

However, there is also some overlap in vocabulary:

liveview
exceptions
summary
war-room
cockpit
This suggests the product is still evolving its conceptual hierarchy. The intent is strong, but the taxonomy is not fully stabilized yet.

6.3 Visual System
The product leans heavily on maps, panels, overlays, and high-signal status displays. This is appropriate because logistics operations are spatial and temporal by nature. A map-first interface makes the product feel immediately relevant to real transport workflows.

The visual approach prioritizes:

situational awareness,
drilldown density,
status segmentation,
multi-panel workflows.
This makes sense for advanced users. It is not trying to be minimal. It is trying to be operationally useful.

7. The Exception Console as the Core Experience
The exception console appears to be the heart of the product.

It combines:

a live vehicle map,
exception counts,
severity and category filters,
delay bucket filters,
branch/transporter/consignee breakdowns,
journey status tabs,
selected journey overlays,
AI analysis,
detailed response context.
This is a strong product decision because it compresses the full operational loop into one interface:

detect,
filter,
inspect,
interpret,
act.
This is better than a traditional dashboard, which often stops at “detect.”

From a UX perspective, this console reduces context-switching. Operators do not need to jump across separate tools for counts, map context, journey detail, and reasoning support. The structure is designed to help users move from broad operational awareness to a very specific problem object (ExceptionCommandConsole.tsx (line 11), ExceptionCommandConsole.tsx (line 234)).

This is one of the strongest product-design decisions in the codebase.

8. Network Dashboard as a Strategic Expansion
The network dashboard expands the product from journey-level visibility into system-level intelligence.

It allows users to inspect:

branches,
places,
consignees,
node-based relationships,
outbound and inbound journeys,
live trip overlays,
lane-level performance.
This matters strategically because it moves TigerSight beyond “operations firefighting” and into “network intelligence.” That broadens both value and audience.

If the exception console is about immediate response, the network view is about structural understanding. A strong control tower product needs both:

what is broken right now,
and what structural pattern is creating repeat failures.
TigerSight is clearly aiming for that duality (NetworkDashboard.tsx (line 135), NetworkDashboard.tsx (line 170)).

9. AI and Agentic Product Thinking
The most ambitious part of TigerSight is the shift from visibility to intelligence and automation.

The repo includes:

fleet intelligence generation,
rule-based and LLM-assisted analysis,
voice-calling assistants,
network optimization,
diversion detection,
a “Sentry” exception agent.
This is not AI as decoration. It is AI positioned around operational jobs.

The fleet insight system is especially notable because it does not ask the model for a vague summary. It asks for a control-tower briefing, pattern analysis, attention-required signals, and action recommendations (fleetInsightService.ts (line 7)).

That is strong product thinking. Good AI products do not expose raw model output. They wrap the model in the language, format, and workflow that users already trust.

Similarly, the voice assistant catalog is built around specific operational triggers:

long stoppage,
transit delay,
POD confirmation,
arrival coordination.
This is exactly how AI adoption tends to work in enterprise operations: through narrow, high-value task automation rather than generic chat experiences (agentsService.ts (line 133)).

10. Strengths of the Product
10.1 Strong Category Vision
TigerSight is trying to define a category between TMS, control tower, and AI operations layer. That is much stronger than building a “dashboard.”

10.2 Good Job-to-Be-Done Alignment
The app aligns well with real operator jobs:

see what needs attention,
understand the issue,
drill into context,
decide what to do.
10.3 High-Leverage Wedge
The exception console is a credible entry point. Exception management is closer to measurable ROI than generic visibility.

10.4 Expansion Potential
The network, optimization, and agents modules provide a believable path from monitoring to planning to automation.

10.5 Strong Perceived Value
The immersive welcome, map-led experience, and war-room framing help the product feel premium and strategic.

11. Weaknesses and Product Risks
11.1 Mixed Maturity Across Surfaces
Not all modules appear equally mature. Some are tightly tied to real APIs, while others still rely on mock-backed structures, especially the war-room service (warRoomApiService.ts (line 1)).

From a product standpoint, this creates trust risk. If users cannot tell which views are decision-grade and which are exploratory/demo-grade, confidence declines.

11.2 Role Clarity Is Not Hardened
Permissions are effectively stubbed right now, with all tabs available and module access broadly allowed (usePermissions.ts (line 22)).

For enterprise operations software, role-based tailoring is not optional. Different users need different complexity levels and access boundaries.

11.3 Conceptual Overlap
The coexistence of summary, war-room, cockpit, exceptions, and liveview suggests the product story is still broadening rather than narrowing.

This is common in ambitious products, but eventually the team will need to define:

the true operational home,
the executive summary home,
the experimentation layer,
and the automation layer.
11.4 Trust and Production Readiness
AI can increase value only if the product also signals operational trust. Hardening data provenance, permissions, and deployment discipline will matter as much as UX quality.

12. Product Strategy Embedded in the Repo
The likely product strategy seems to be:

Phase 1: Visibility
Give users a unified, map-led real-time operations surface.

Phase 2: Triage
Help users quickly understand which journeys, branches, or transporters need attention.

Phase 3: Intelligence
Generate briefings, pattern analysis, and recommended actions automatically.

Phase 4: Action
Introduce agents that can call, escalate, optimize, or detect diversion.

This is a strong progression because it maps to how enterprise value compounds:

first consolidate signals,
then improve decisions,
then automate action.
TigerSight’s architecture already points in that direction.

13. Product Design Lessons from This Project
This repo offers several lessons from a product design standpoint:

Lesson 1
Operational software becomes more valuable when it is organized around user intent, not backend objects.

Lesson 2
Maps are not just a visualization layer here. They are a workflow surface.

Lesson 3
AI is most effective when embedded into a specific artifact like a briefing, alert, or operational action.

Lesson 4
Perceived seriousness matters in enterprise operations. The product’s immersive framing helps reinforce that this is a control system, not a reporting widget.

Lesson 5
The hardest part of ambitious B2B products is not feature ideation. It is converging multiple promising concepts into one clear product hierarchy.

14. Final Assessment
TigerSight is a strong example of a product moving from dashboard thinking to command-center thinking.

Its most important achievement is not visual polish or AI positioning alone. It is the way the product tries to unify fragmented logistics operations into one coherent decision loop:

monitor,
detect,
understand,
prioritize,
respond.
That is a meaningful and defensible product direction.

Today, the repo feels like a product in transition:

part enterprise control tower,
part advanced prototype,
part AI operations lab.
That is not a weakness by itself. It often happens in products that are pushing into a new category. The real challenge ahead is product consolidation:

sharpen the primary workflow,
reduce overlap between modes,
harden trust-critical layers,
and ensure every advanced surface reinforces the same core value proposition.
If that happens, TigerSight can evolve from an impressive operational interface into a differentiated logistics intelligence platform.

Portfolio Case Study
TigerSight
Designing an AI-Powered Logistics Control Tower for Real-Time Operations

Project Summary
TigerSight is a control tower product built on top of FreightTiger’s TMS ecosystem. It was designed to help logistics teams move beyond passive reporting and toward live operational decision-making. The product combines real-time fleet visibility, exception management, network intelligence, and emerging AI agents inside a unified command interface.

The core challenge was clear: transport operations teams already had data, but they lacked a system that could help them understand what mattered now, why it mattered, and what to do next.

Problem
In logistics operations, information is fragmented across journeys, orders, transporters, branches, and customer locations. Most tools expose status but do not support rapid triage. As a result, operators spend too much time stitching together data across systems before they can even begin resolving a disruption.

TigerSight addresses this by creating one operational layer where users can:

monitor live movement,
detect exceptions,
isolate affected journeys,
understand network-level implications,
and access AI-assisted recommendations.
Product Goal
The goal was to create a control-tower experience that feels operational, immediate, and high trust. Instead of behaving like a static dashboard, TigerSight aims to function as a live command environment.

My Product Read on the Solution
The strongest product decision is that TigerSight is organized around workflows, not just business entities. The app separates experiences into execution, overview, planning, and agents. That means the product reflects what users are trying to do, rather than how the backend is structured.

This is especially important in logistics, where operators do not think in terms of normalized data models. They think in terms of questions:

What is delayed right now?
Which route or branch is driving the issue?
Which journeys need intervention first?
Is this isolated or systemic?
TigerSight is trying to answer those questions directly.

Key Experience Areas
Live Exception Console
This is the strongest part of the product. It combines map visibility, exception counts, severity filters, delay buckets, status segmentation, right-rail drilldowns, and AI-generated interpretation. It turns exception handling into a compact decision loop:

detect,
filter,
inspect,
interpret,
act.
This is much more valuable than a dashboard that only reports counts.

Network View
The network experience expands the product from trip-level awareness into system-level understanding. By allowing users to inspect branches, consignees, lanes, trip flow, and network health, TigerSight begins to support not only operational response but also structural optimization.

War-Room and Summary Surfaces
These views appear intended for high-level situational awareness, possibly for leadership, escalation calls, or centralized monitoring environments. The product’s visual design here supports the feeling of a mission-critical command center.

AI and Agents
TigerSight’s AI direction is notable because it is applied to operational jobs rather than generic chat. Voice calling, diversion detection, network optimization, and automated alert handling suggest a product strategy that moves from visibility to assistance to action.

Design Strengths
Intent-based information architecture.
Strong operational framing and category positioning.
Map-first experience suited to logistics workflows.
Good drilldown path from macro signal to individual journey.
AI positioned as workflow augmentation, not novelty.
Challenges
Some surfaces feel more mature than others.
There is conceptual overlap between liveview, exceptions, summary, war-room, and cockpit.
The product still appears to be balancing demo value, innovation exploration, and enterprise readiness.
Outcome
TigerSight shows the evolution of a logistics product from dashboard thinking to control-tower thinking. The product has the ingredients of a differentiated operational platform:

live monitoring,
decision support,
network intelligence,
automation pathways.
Its next step is not more breadth. Its next step is sharper consolidation around one primary operational story.

Product Review Memo
TigerSight Product Review
What’s Working, What’s Not, Opportunities, Recommendations

What’s Working
The product has a strong core thesis
TigerSight is not trapped in “dashboard as reporting UI” thinking. It is trying to become an operational decision layer on top of the TMS. That is a stronger and more defensible category position.

The exception console is a credible wedge
The live exception workflow is where the product feels most valuable. It is tightly aligned with high-friction user work, and it appears to reduce the time required to detect and diagnose operational issues.

The AI strategy is better than average
The product does not use AI as a vague assistant. It uses AI for specific control-tower outputs such as fleet briefings, alert triage, voice intervention, and route/diversion analysis. That is a much stronger product pattern.

The network view creates expansion potential
By offering facility, consignee, and lane-level views, TigerSight expands beyond immediate exception handling into network understanding and optimization.

The visual language supports positioning
The immersive welcome, fullscreen framing, map-led canvases, and war-room concepts help the product feel strategic and premium.

What’s Not Working
The product hierarchy is not fully clear
There are too many adjacent operational concepts:

liveview
exceptions
summary
war-room
cockpit
A new user may struggle to understand the difference between these modes, especially if they are all presented as core surfaces.

Maturity is uneven
Some parts of the product look close to operational tooling, while others feel exploratory or presentation-oriented. That is normal in an evolving product, but risky if users treat every surface as equally authoritative.

Role design is underdeveloped
Enterprise operations software depends heavily on role-sensitive access and tailored complexity. If every user sees the same surface set, the product risks becoming too broad and too cognitively heavy.

Trust may become a blocker
For a control-tower product, user trust is everything. If data provenance, permissions, and production discipline are not fully hardened, the product may look impressive but still fail to become a default operational surface.

Opportunities
Define one primary operational home
Choose the most important daily-use surface and make it unquestionably primary. Everything else should support it.

Separate operational, executive, and experimental views
Users should know whether they are in:

operator mode,
network strategy mode,
executive summary mode,
or innovation/AI mode.
Turn AI into outcome-based modules
Instead of “AI insights” broadly, package AI around repeatable business outcomes:

delay resolution,
exception escalation,
carrier accountability,
ETA risk detection,
proactive consignee coordination.
Build a trust system into the product
Show whether a view is:

live,
API-backed,
inferred,
simulated,
or recommendation-only.
That would significantly improve user confidence.

Recommendations
Recommendation 1
Make the exception console the anchor product.
This appears to be the strongest and most differentiated workflow. It should be the default center of gravity.

Recommendation 2
Simplify the surface taxonomy.
Reduce naming overlap and define a clean model for each major mode.

Recommendation 3
Formalize user roles.
Create tailored views for operator, manager, planner, and executive personas.

Recommendation 4
Use AI only where the next action is clear.
Every AI feature should end in a recommended operational action, not just a summary.

Recommendation 5
Invest in production trust.
Make role handling, source transparency, and data confidence visible parts of the UX.

Bottom Line
TigerSight has strong product instincts and a credible market direction. It is much more compelling as a control-tower product than as a traditional dashboard. The main challenge now is consolidation and trust hardening, not ideation.

Strategic Recommendations Deck Outline
TigerSight: Strategic Product Recommendations

Slide 1: Product Position
TigerSight should be positioned as:
The operational intelligence and response layer on top of FreightTiger TMS

Not:

just a dashboard,
just a reporting tool,
just an AI showcase.
Slide 2: Core User Value
The product should consistently answer four user questions:

What needs attention right now?
Why is it happening?
Where is it concentrated?
What should we do next?
Slide 3: Primary Product Wedge
The best entry point is:
Live exception triage and operational response

Why:

high urgency,
high frequency,
clear ROI,
strong differentiation.
Slide 4: Product Ladder
Recommended value ladder:

Visibility
Triage
Intelligence
Action
Automation
TigerSight already has building blocks across all five levels.

Slide 5: Information Architecture Recommendation
Recommended top-level structure:

Operate
Network
Plan
Automate
Executive
This is cleaner than the current mixture of summary/liveview/cockpit/war-room naming.

Slide 6: User Segmentation Recommendation
Define separate experiences for:

Operator
Operations Manager
Network Planner
Executive
Automation Admin
Slide 7: AI Strategy Recommendation
Focus AI around repeatable operational jobs:

briefing,
prioritization,
anomaly detection,
intervention,
escalation,
optimization.
Avoid generic AI assistant positioning.

Slide 8: Trust Strategy Recommendation
Introduce visible trust cues:

live vs simulated,
API-backed vs inferred,
recommendation vs action,
data freshness,
confidence indicators.
Slide 9: Short-Term Priorities
sharpen primary workflow,
simplify surface taxonomy,
harden role handling,
improve source transparency,
align demo-grade and production-grade experiences.
Slide 10: Long-Term Vision
TigerSight can evolve into:
a logistics operating system that not only shows transport activity, but interprets it and helps resolve it autonomously.

Concise Executive Summary
TigerSight is a high-ambition logistics control tower product with a strong core idea: convert fragmented transport data into live operational awareness and action. Its best product decision is to organize around workflows such as execution, exception response, network understanding, and automation rather than only around entities like orders and journeys.

The strongest area is the exception console, which offers a compelling operator workflow and a believable ROI story. The product’s broader opportunity lies in extending from visibility to intelligence and eventually to automation through agents. The main risks are product sprawl, uneven maturity across surfaces, and the need for stronger trust and role clarity.

The product is already more than a dashboard. Its next challenge is to become a coherent platform.
