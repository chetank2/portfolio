# All Case Studies

This file consolidates the current long-form portfolio case studies from the repo into one Markdown document.

---

# My Journeys

Designing a unified operational surface for tracking, decision-making, and closure

## TL;DR

I redesigned My Journeys from a broken table and unreliable lifecycle system into a unified operational surface that models journeys correctly, supports real-world ambiguity, and helps operations teams decide and act faster.

## Overview

My Journeys was one of the most heavily used parts of the product. It was where operations teams tracked active movements, identified issues, and managed execution. Over time, it had degraded into a mix of a table, a dashboard, and a partially broken lifecycle system.

The problem was not just UI clutter. The underlying model of journeys was flawed, and the interface reflected that confusion. I treated this as a system redesign, not a table redesign, and rebuilt both the lifecycle logic and the decision surface together.

## Product Gallery

Developed screens from My Journeys showing the final operational flow from the main in-transit surface into map context, journey details, and loads management.

- In Transit: The primary operational surface for understanding live journey state, blockers, and next actions.
- Map View: A spatial layer from the in-transit experience for understanding route context and operational status visually.
- Journey Details: The actual journey details page, combining map context, timeline signals, and operational status in one view.
- Loads: The loads surface for scanning active movements, spotting exceptions, and switching into the right operational context.
- Journey Summary: A condensed status layer for reading progress, key state changes, and closure-related signals at a glance.
- Loads Alternate State: Another loads state demonstrating the same hierarchy and actionability at operational scale.

## What Made This Hard

Two layers were broken at the same time.

At the system level, the journey lifecycle was incorrectly modeled. It assumed linear movement and clean closure, while real operations involved reuse, repeated stops, missing data, and ambiguity.

At the interface level, the table had become overloaded with information. It exposed everything but helped with nothing. Fixing only the UI would not solve the problem. Fixing only the lifecycle would not make the product usable. Both had to be redesigned together.

## Problem

The lifecycle system treated journeys as linear flows that started and ended cleanly. In reality, routes were reused, stops repeated, and signals arrived inconsistently. This led to overwritten data, incorrect closure states, and unreliable journey tracking.

The table interface had accumulated too many columns, statuses, and visual elements. Everything competed for attention. It was slow to scan, hard to prioritize, and not usable under operational pressure. Together, these issues created a system where users had to manually reconstruct reality from unreliable data and noisy interfaces.

## Context

Operations teams used this screen to manage large numbers of active journeys in real time. Their goal was not to read detailed rows. Their goal was to quickly identify what was going wrong and decide what to do next.

Data came from multiple sources including GPS pings, geofence events, and manual updates. Real-world patterns such as route reuse and repeated locations exposed the limitations of a system that assumed each stop occurred only once.

## Reframing the Problem

I reframed My Journeys from a data table into an operational decision system. The key shift was moving from showing journey data to:

- helping users understand journey state
- helping users identify risk
- helping users decide what action to take

This required fixing both the underlying model and the way it was presented.

## System Redesign: Lifecycle Model

The first step was correcting how journeys were modeled. I moved away from treating journeys as simple sequences of stops and instead introduced a state-driven model.

A critical concept was separating a stop from a visit. The same physical location could appear multiple times in a journey, but each occurrence needed to be tracked as a separate visit. This allowed patterns like A -> B -> A to be handled without corrupting data.

Instead of overwriting journey state, I leaned toward preserving event history. Each signal contributed to an evolving state rather than replacing previous information.

Closure was redesigned to be event-driven. A journey did not close because a user followed a fixed flow. It closed when the correct combination of events occurred.

## Interface Redesign: Table as Decision Surface

Once the model was corrected, I redesigned the table to reflect how users actually think. The table was no longer treated as a container of columns. It was treated as a surface for decision-making.

I reorganized information around intent. Status, exceptions, and action-relevant signals were prioritized. Secondary information was reduced or removed. Hierarchy became the main tool — important states stood out clearly while non-critical information moved into the background.

## Edge Cases Handled

The redesign accounted for route reuse such as A -> B -> A, missing or delayed tracking signals, manual overrides, ambiguous states, and large datasets with multiple filters applied simultaneously.

## Key Design Decisions

- Treated the table as a decision surface rather than a data grid
- Grouped information by operational intent instead of letting columns compete equally
- Removed visual noise aggressively — many accumulated elements were not helping decision-making
- Aligned the interface with the lifecycle model so the UI reflected corrected system state

## Outcome

The result was a system where users could trust what they saw and act on it quickly.

Journey tracking became more accurate because the lifecycle model reflected real-world behavior. Closure became more reliable because it was tied to events rather than assumptions. The interface became easier to scan because it emphasized what mattered.

## Why This Project Matters

This project represents how I approach complex product problems. I do not treat UI issues in isolation. I look at the underlying system, fix the model, and then design the interface to reflect that model. My Journeys is not just a table redesign. It is a case study in turning a broken operational surface into a reliable decision system.

## Learnings

- Operational products break when their internal models do not match reality. Fixing the model often has more impact than adding features.
- Interfaces should reflect how decisions are made, not how data is stored.
- Simplicity in UI often comes from deeper complexity in system design, not from removing features blindly.

---

# Freight Invoicing & Reconciliation System

Shifting billing validation before invoice creation

## Overview

Freight billing in logistics usually looks like a finance workflow on the surface, but the real problem sits deeper in the operational model. In the existing flow, invoices were often generated first and validated later. That meant the system treated invoicing as the start of truth instead of the outcome of validation.

This caused a predictable cycle: invoice generation, mismatch discovery, dispute creation, manual correction, delay, and frustration. My role was to redesign that workflow so billing became more reliable, operationally grounded, and easier to trust.

## What Made This Hard

This was not a simple invoicing UI problem. The complexity came from the fact that billing relied on multiple upstream inputs that were not always synchronized or equally reliable. Rate cards, vehicle types, route data, additional charges, and ePOD status all influenced whether a bill was actually correct.

The hard part was designing a system that supported real-world exceptions without making the workflow so flexible that it became financially unsafe.

## Problem

The earlier flow generated invoices before teams had a chance to validate the underlying freight logic. As a result:

- invoices became the place where problems were discovered
- finance and operations were forced into reactive correction loops
- disputes increased because the system had no trusted pre-check stage
- users had to reverse-engineer why a number was wrong instead of reviewing it before the document existed

From a product perspective, the system was encouraging users to make errors expensive.

## Users and Their Needs

- Operations teams needed clarity on whether a journey was financially ready for billing and where mismatches existed
- Finance teams needed a workflow that reduced downstream disputes and produced a more defensible invoice trail
- Transport partners needed transparency into what was accepted, under review, and being challenged

## Approach

I started by mapping the current billing lifecycle end to end. Rather than focusing only on screens, I focused on where truth was established, where ambiguity entered the process, and where users were forced into reactive behavior.

The design direction became clear: billing needed a reconciliation stage before invoice creation.

> An invoice should be the output of agreement, not the place where disagreement begins.

That meant the product needed to separate these moments: operational completion, commercial validation, invoice generation, and dispute adjustment if exceptions still remained.

## Key Decisions

### 1. Move validation before invoice generation

Instead of allowing invoice creation to happen first, I introduced a structured review layer where charges and billing conditions could be validated before formal billing documents were generated. This reduced the cost of mistakes, shifted the workflow from reactive to preventive, and gave users a clear stage for agreement.

### 2. Review at the charge level, not only the invoice level

Users did not reason about billing as abstract invoice lines. They reasoned in terms of freight charges, accessorials, and specific financial components. The system needed to surface validation at the level users actually understood — aligning the product model with user mental models and making partial disagreements easier to handle.

### 3. Support controlled reversals

Many enterprise systems become fragile because they assume upstream events are permanent. In reality, delivery confirmation and supporting documents can change, be corrected, or be challenged. Supporting controlled reversals preserved operational realism and prevented brittle logic.

### 4. Preserve traceability

Any financial correction needed a clear trail. Even when the system supported exceptions, it had to do so without collapsing trust. This made decisions defensible, reduced ambiguity between teams, and created a stronger basis for accountability.

## Solution

I designed a pre-invoice reconciliation workflow that sat between operational completion and invoice generation. The solution included:

- a reconciliation stage before invoice creation
- visibility into mismatched charges and validation status
- charge-level review and approval behavior
- structured support for exceptions and financial adjustments
- a clearer decision path for when billing could proceed

This changed the product from a dispute-triggering system into a validation-first system.

## Edge Cases

The strongest systems are usually defined by how they handle exceptions, not happy paths. Important edge cases included:

- ePOD approved and later reversed
- transporter submission before all required billing inputs were finalized
- partial mismatch affecting only one charge category
- contracted freight differing from actual operational reality
- situations where the invoice should be blocked without stopping the whole operational lifecycle

## Outcome

The redesigned workflow improved the quality of billing decisions before invoice creation. Fewer preventable disputes entered formal billing, collaboration between operations and finance became clearer, the audit trail became more reliable, and user confidence in billing status and readiness improved.

## Learnings

- Validation timing matters as much as validation logic
- Enterprise workflows fail when products encode the wrong moment of truth
- Real trust comes from balancing structure and flexibility
- Financial UX is not about making screens simple, but about making decisions safer and clearer

---

# Design QA

## 1. The Frustration

At Freight Tiger, I work on multiple projects at any given time. After design handoff, the small things start slipping — a color off by a shade, padding wrong by 4px, font weight not matching. These aren't dramatic failures. They're death-by-a-thousand-cuts quality problems.

I can check flows and logic quickly. But sitting with Figma and production open side-by-side, comparing every color, every spacing value, every text style across multiple projects — that takes real time. And when those small discrepancies don't get caught, they compound into a negative quality impression over time.

The feedback loop made it worse: spot an issue during design UAT, document it, communicate back to the developer, wait for the fix, re-check. Multiply that across several projects running in parallel, and the cost adds up fast.

**The core question:** Can I automate the pixel-level comparison so I can focus my time on the things that actually need design judgment?

## 2. What I Built

DesignQA is a tool that extracts design specs from Figma files, extracts implementation data from live web pages, and compares the two — surfacing every visual discrepancy so I don't have to find them manually.

It compares:

- colors and color palettes
- typography — font families, sizes, weights
- spacing values
- layout and positioning
- screenshot-level visual differences

The output is practical: it shows all discrepancies and generates an Excel sheet that can be uploaded directly to DevRev or Linear to create issues. No fancy reports — just actionable differences in a format that fits into real team workflows.

## 3. How It Grew

The tool started as an Electron app for my MacBook — built for my own use during design UAT.

Then other people wanted to try it, so I built a web version on Vercel that anyone could access. Then teammates on Windows needed it, so I added Windows support. I also tried building a Chrome extension, but couldn't get that working successfully.

Each step was driven by a real need, not planned architecture. The tool expanded because people wanted to use it in different contexts.

## 4. My Role — Designer Building with AI

I built this using Claude, Cursor, and Codex as pair programmers. My role was product vision, design decisions, and quality judgment. AI handled the code generation, implementation, and debugging.

This is a pattern across my projects: I don't write code from scratch. I design the product, make the architectural choices, and use AI tools to execute. The judgment about what to build and why is mine. The code generation is AI-assisted.

## 5. Key Technical Decisions

### Dual-database approach

The tool needed to work offline on desktop (SQLite, no infrastructure needed) and in the cloud as a web app (Supabase Postgres). Instead of picking one, I designed it with an adapter pattern — the right database is selected at startup based on the environment. This let me develop locally with zero setup and deploy to production without rewriting anything.

### Figma integration via MCP

The tool communicates with Figma's desktop application through the Model Context Protocol, extracting design tokens, colors, and typography in real-time. If MCP isn't available, it falls back to the Figma REST API. This graceful degradation means the tool works in both desktop and cloud contexts.

### Cross-platform from one codebase

The same codebase runs across Electron (macOS/Windows), web browser, and Docker. Environment detection at startup determines the runtime context and configures everything automatically.

## 6. Integration Attempts

I tried connecting directly with Linear and DevRev to push issues automatically instead of going through Excel export. I couldn't complete those integrations, but the intent was to shorten the feedback loop even further — from "export sheet, upload to tracker" to "push issues directly from the tool."

## 7. What Happened Next

After I built DesignQA, Claude and Cursor released Figma integration — users could paste production screens and make changes directly. That partially solved the design UAT challenge I had been working on.

But it also revealed a deeper problem that DesignQA wasn't designed to solve, and that led to my next project: Component-first Design.

## 8. Results

- **124 commits** from concept to production
- **62+ React components** with consistent design language
- **Cross-platform** — macOS, Windows, web, Docker
- **838 components** successfully extracted from a single Figma file
- Built entirely through AI-assisted development as a designer

## 9. Takeaway

> The goal is not to detect design gaps better. It is to make the gap between design and implementation small enough that it stops costing teams time.

---

# CouponTracker

## Links

- [Live View](https://ftdesignsystem.netlify.app)
- [npm Package](https://www.npmjs.com/package/ft-design-system)
- [GitHub Repo](https://github.com/chetanft/components)

## 1. Overview

CouponTracker began as a practical attempt to solve a messy everyday problem: coupon details were trapped inside screenshots, difficult to compare, and easy to forget once they expired. What started as a screenshot-based coupon extraction idea has now evolved into a much broader system — a production-oriented coupon recognition platform with an Android app, web-based ML training interfaces, a mobile PWA for offline annotation, and a full model training and deployment pipeline.

But the project is not just about coupons. It is built on a thesis about where consumer AI is heading — and what that means for how products should be designed.

## 2. The Thesis

In early 2025, something shifted. AI tools became accessible enough that anyone could build an app. Cloud APIs made it easy to call a model, get a result, and ship a feature. But I started asking a different question:

**Why should the model live in the cloud at all?**

There are now free, capable models that can run entirely on a phone. The trajectory is clear — models are becoming a pseudo-operating-system layer on your device. If that is where things are heading, then designing products around cloud inference is designing for a dependency that will not age well.

So I made a deliberate choice: build CouponTracker as an on-device-first product.

- **No server costs** — the user's phone does the work, no cloud billing to maintain
- **No API latency** — extraction happens instantly, not after a network round-trip
- **No internet required** — the app works fully offline, which matters in real-world usage
- **No data leaving the device** — coupon screenshots stay on the user's phone, which is both a privacy and trust advantage
- **No dependency on someone else's model tokens** — no rate limits, no pricing changes, no third-party shutdown risk

This was not a technical optimization. It was a product philosophy: if the intelligence can live on the device, it should.

## 3. Why This Matters for My Role

I am a designer and builder, not a traditional developer. I do not write Kotlin or Python from scratch — I use AI tools like Claude, Cursor, and Codex to build. That is part of the point.

If someone like me can design and ship a multi-surface AI product without deep coding knowledge, then the barrier to building is already lower than most people think. The remaining challenge is not code. It is product judgment — knowing what to build, why, and how the pieces fit together.

CouponTracker is proof that design thinking, AI-assisted building, and strong product instincts can produce real systems, not just prototypes.

## 4. How It Started

The original product problem came from repeated friction in handling coupon screenshots:

- coupon codes were buried inside image-based offers
- cashback and expiry data appeared inconsistently
- there was no clean way to consolidate offers across apps
- users needed a fast way to retrieve all coupons or filter them by app
- expired offers created clutter if they were not lifecycle-managed

The earliest version of the idea was centered on a conversational workflow: ingest screenshots, extract coupon details, store them in a structured format, and retrieve them on demand.

That early thinking shaped the product direction, but the solution expanded far beyond a simple OCR utility.

## 5. What It Became

CouponTracker is now implemented as a complete coupon recognition system with multiple coordinated surfaces.

### Android mobile application

The Android app is the main end-user experience. It includes:

- on-device MiniCPM-Llama3-V2.5 Vision Model for intelligent coupon extraction
- two-stage multi-coupon detection using a YOLO-based flow with interactive boundary adjustment
- a smart fallback chain: LLM-based extraction -> model-based extraction -> pattern methods -> ML Kit OCR with quality validation
- deferred persistence — users preview extraction results before saving
- duplicate detection and enhanced UI state handling
- offline-first architecture with local storage
- batch processing and smart capture support
- WhatsApp sharing — because coupons are inherently social, and WhatsApp is where sharing already happens in India

### Web-based training interface

A web training interface for managing the ML side of the system:

- a complete ML training pipeline with orchestration
- real-time annotation and pre-annotation services
- a model registry and automated packaging flow
- a comprehensive evaluation framework
- MLflow integration for experiment tracking

This turns CouponTracker into a continuously improvable system rather than a fixed app.

### Mobile PWA for offline annotation

A mobile Progressive Web App designed for offline training workflows:

- touch-based annotation for mobile devices
- offline storage using IndexedDB
- service worker support for full offline capability
- installable PWA behavior
- drag-and-drop upload workflows

Instead of assuming all model improvement work happens on desktop, the product adds a mobile-first annotation path that can operate offline.

## 6. Key Design Decisions

### On-device intelligence over cloud dependency

This is the central architectural decision. Rather than calling a cloud API for every extraction, the app downloads and runs models locally. This removes server costs, eliminates latency, preserves user privacy, and makes the app work without internet. As models continue to shrink and improve, this approach will only get stronger.

### Layered extraction instead of single-engine dependence

The fallback chain — LLM -> model-based -> pattern matching -> ML Kit OCR — is the right approach for messy coupon content, where screenshot quality, visual design, and text structure vary heavily. A single engine would be fragile. A layered approach improves resilience.

### Preview-before-save workflow

The deferred persistence approach lets users preview outcomes before save, reducing incorrect records and maintaining data quality.

### WhatsApp as the sharing layer

Coupons are social — people share deals with family and friends. Rather than building a sharing system from scratch, the app uses WhatsApp, which is where most sharing already happens in India. Meet users where they are.

### Closed-loop learning system

By combining annotation tools, orchestration, evaluation, registry, and deployment flows, the project supports continuous model improvement rather than static release-based upgrades.

## 7. Architecture

The system is composed of end-user experiences, model infrastructure, and deployment tooling.

### Core pipeline

- `coupon_scraper.py` for coupon data collection
- `image_processor.py` for image preprocessing and enhancement
- `coupon_annotator.py` for field detection and annotation
- `coupon_trainer_cli.py` for training workflows
- `update_app.py` for Android app model deployment

### Technical stack

- **Android:** Kotlin, Jetpack Compose, Room DB, ML Kit
- **Backend and tooling:** Python, Flask, MLflow, PyTorch
- **Models:** YOLOv8, custom OCR models, TensorFlow Lite
- **Frontend and offline tooling:** PWA, IndexedDB, Service Workers
- **Infrastructure:** Docker, Gradle, Git LFS

## 8. Execution Evolution

### Phase 1 — Screenshot extraction concept

The project began with the basic need to extract coupon details from screenshots and organize them into a retrieval flow.

### Phase 2 — Structured coupon management

The schema became clearer: app name, coupon code, cashback, expiry date, plus query-driven retrieval.

### Phase 3 — On-device intelligence and multi-coupon handling

Recognition stopped being a simple OCR task. The app incorporated on-device models, ROI extraction, quality validation, and two-stage detection for handling multiple coupons in one flow.

### Phase 4 — Training infrastructure and feedback loop

The product expanded into tooling for annotation, model training, evaluation, packaging, and deployment. This turned it from a feature into a platform.

### Phase 5 — Production-oriented multi-surface system

CouponTracker is now production-ready, with Android, training web UI, testing workflows, and deployment pathways all represented in the system design.

## 9. Why This Project Is Strong

The strongest part of CouponTracker is not that it recognizes coupons. It is that it represents a product thesis about where AI is going — and builds accordingly.

- on-device-first intelligence instead of cloud dependency
- a designer-builder shipping a real multi-surface AI product using AI tools
- robustness through layered recognition strategies
- data quality through preview-before-save and validation
- model improvement infrastructure through annotation and training
- social sharing through WhatsApp instead of building custom infrastructure
- deployment-ready system thinking rather than prototype-only thinking

## 10. Outcome

CouponTracker now reads as a product platform rather than a narrow feature. It solves the original user problem — turning screenshot-based coupon content into usable structured information — while also establishing the training, validation, and deployment infrastructure needed to keep that system improving over time.

More importantly, it demonstrates that a designer with strong product instincts and AI-assisted building tools can ship production-grade systems. The bottleneck is not coding ability. It is knowing what to build and why.

> The strongest product work starts with a point of view about where things are heading, then builds the system that proves it.

---

# Component-first Design Concept

## 1. Where This Came From

After building DesignQA, tools like Claude, Cursor, and Codex released features that let you paste production screens and edit them directly. That partially solved the design UAT problem I had been working on.

But it exposed a deeper challenge: **SaaS apps are complex. One screen can't show everything.**

The same screen has multiple elements, and each element has multiple variants. In production, not all variants are visible — some are configured for specific customers, some are edge cases, some only appear under certain conditions. A demo account won't cover them all.

If I paste a production screen into an AI tool and edit it, I can change what's visible on that screen. But I can't edit the other variations. I can't see the full picture of what a component actually supports.

## 2. How I Actually Work

After building DesignQA and thinking about this problem, I realized the answer was already in my own design process.

My workflow at Freight Tiger is:

- design all flows and hand them over to the developer
- after initial implementation, I don't redesign full screens for changes
- instead, I design **element variations** — all the states and variants of a specific component for that requirement
- this saves time and gives developers something they can directly map to code by searching for that component

Showing all variations of an element in the Figma file helps developers find and change things quickly in the codebase.

**The idea:** What if I could mimic this process in code? What if the codebase itself could show all component variations the way Figma shows them — and let you edit them visually?

## 3. What I Built

A VS Code extension (prototype stage) that:

- **scans the entire codebase** and pulls out modules and components automatically
- **shows them on a canvas** inside the same extension — no context switching
- **equips the canvas with Figma-like tools** where you can edit variants, add new variants, change colors, fonts, and other properties
- **generates prompts from your changes** that you can give to AI tools, so they can make the actual code changes

The key insight: instead of going from design -> code, this goes from code -> visual surface -> edit -> back to code. The source of truth stays in the codebase, but the editing experience feels like a design tool.

## 4. Why This Matters

### The variant visibility problem

Most tools assume you're editing what you can see on screen. But in complex SaaS products, the screen only shows one state of many. Component-first design makes all states visible and editable regardless of what's currently rendered in production.

### Code as the source of truth

Figma files drift from implementation. This tool reads the actual code — the real types, the real props, the real variants. If the code says a button has 4 variants, the canvas shows 4 variants. No manual documentation needed.

### Honest about what it knows

Not every extraction is perfect. The tool uses confidence signals — marking whether a piece of data was extracted with certainty, inferred, or is a placeholder. A rough render with an honest "inferred" badge is more useful than a polished render that might be wrong.

## 5. The Design Decisions

### Designer-facing, developer-powered

The canvas should feel like a design tool but be driven entirely by code data. Technical prop names become semantic labels. Type classifications become visual badges. Enum values become variant options in a visual matrix.

### Multiple view modes for variants

A component with 3 status values, 2 sizes, and 4 interaction states has 24 possible variants. The tool offers:

- **Matrix view** — 2D grid for comparison across variants
- **Strip view** — horizontal scroll for browsing
- **Detail view** — single variant with full property panel

### Artifact-based pipeline

Instead of parsing code and rendering in one pass, the system generates intermediate files at every stage. Each step produces something inspectable and debuggable. Early prototypes that tried to do everything in memory were impossible to debug.

## 6. Current Status

This is a working prototype. The extraction pipeline works, the canvas renders components, and the prompt generation produces usable output. It is not production-ready — it's a concept that proves the idea works.

The thesis is that the most scalable bridge between design and development is not another handoff artifact. It is making what's already implemented visible, inspectable, and editable in a way that feels natural to designers.

## 7. What I Learned

- **Your own workflow is often the best product spec.** The idea came directly from how I already work — designing element variations instead of full screens.
- **AI tools solve the editing problem but not the visibility problem.** You can paste a screen and change it, but you can't see what you can't see.
- **Confidence signals matter more than polish.** A tool that's honest about what it extracted is more trustworthy than one that looks perfect but might be wrong.
- **Type systems are underused.** TypeScript types already contain the information about what a component supports. Most tools ignore this and ask developers to re-describe their components manually.

## 8. Takeaway

> The most useful design tool for complex products isn't one that helps you draw screens. It's one that makes the implemented reality visible and editable — so you can work with what actually exists, not what you think exists.

---

# Control Tower

Designing a Human-AI Control Tower for Logistics Operations

From Visibility to Exception Orchestration at Freight Tiger

## 1. Context

Freight Tiger operates in a high-volume, high-risk logistics environment where thousands of shipments run daily, multiple stakeholders are involved, and real-time execution is fragmented across systems.

The operational reality includes:

- shippers tracking SLA performance and service quality
- transporters managing vehicle movement and execution dependencies
- drivers acting as the last-mile source of many real-world signals
- operations teams coordinating action when something breaks

The key problem was that operations teams spent most of their time reacting to issues instead of preventing them.

## 2. Problem

Before Control Tower, operations struggled with both visibility and execution.

### Operational gaps

- no unified view of journey health
- alerts existed, but there was no prioritization or orchestration layer
- teams relied on manual calls, spreadsheets, and multiple dashboards to understand what was happening

### Execution issues

- high alert noise and low signal clarity
- no clear ownership of issues
- delayed escalations
- no strong audit trail of actions taken

### Business impact

- SLA breaches
- delayed resolution cycles
- high operational workload
- low visibility for managers and clients

This meant the organization had signals, but not a reliable system for turning signals into coordinated action.

## 3. Foundation: What Was Already Shipped

Before building Control Tower, we solved the visibility layer first through the Reporting Module.

### Reporting Module (Shipped)

What we built:

- self-serve reporting
- scheduled and on-demand reports
- standardized templates
- audit-ready logs

### Impact of the reporting foundation

- less than 2 minutes report generation
- 90%+ reduction in turnaround time
- 138+ hours saved per month
- elimination of manual reporting workflows

### Critical insight

You cannot build intelligent systems on unreliable data.

The reporting layer gave us a stronger operational foundation. Once visibility became reliable, the next product question became obvious: how do we move from visibility to action?

## 4. Opportunity

Once reporting solved access to visibility, the next opportunity was not to create yet another dashboard. It was to build a system that could detect, prioritize, and resolve operational issues.

The key product questions became:

- can the system detect meaningful issues instead of surfacing raw noise?
- can it prioritize based on impact and urgency?
- can AI reduce manual intervention?
- can humans be guided only when judgment is actually needed?

This shifted the problem from analytics to execution orchestration.

## 5. Vision

### Control Tower = System of Action

The vision for Control Tower was not a passive dashboard. It was a system that:

- converts fragmented signals into real-time decisions
- prioritizes alerts based on impact and urgency
- automates resolution where possible
- escalates intelligently when needed

This was a major conceptual shift:

- dashboard -> execution system
- data visibility -> decision orchestration
- manual actions -> AI-assisted workflows
- reactive operations -> proactive control

## 6. Core Design Shift

The most important design change was redefining what a control tower means.

A traditional dashboard centers around visibility. This control tower needed to center around intervention.

That meant the product had to answer:

1. what is going wrong?
2. how severe is it?
3. what should happen next?
4. can the system handle it without human effort?
5. if not, who should take over and when?

This turned the control tower from a monitoring layer into an orchestration layer.

## 7. Key Concept: Human-AI Collaboration

We designed the system so AI and humans each handled the part of operations they are best suited for.

### AI handles

- alert detection
- prioritization (P0-P3)
- monitoring and validation
- driver and transporter outreach through automation
- escalation logic

### Humans handle

- ambiguity
- exceptions AI cannot resolve
- final decisions
- compliance and penalties

### Design principle

**AI assists. Humans control.**

This principle influenced everything from ownership states to escalation design and auditability.

## 8. Alert Lifecycle Example: Long Stoppage

To make the system concrete, one example workflow was long stoppage handling.

### Timeline flow

1. **Detected**  
Vehicle remains stationary beyond the configured threshold.

2. **AI assigned**  
Monitoring begins and the system classifies the issue.

3. **Automated handling**  
Movement is tracked and initial outreach begins.

4. **Escalation**  
If there is no useful change or response, the system raises priority.

5. **Advanced attempts**  
Transporter outreach and deeper intervention logic are triggered.

6. **Human handoff**  
An operations executive takes over when automation is insufficient.

7. **Resolution**  
The issue is verified, documented, and closed.

This lifecycle showed that the product was not just displaying an alert. It was managing the alert as an evolving operational story.

## 9. Key UX Decisions

### 1. Timeline-based interface

Every alert was treated as a progressive story instead of a static record.

The timeline showed:

- what happened
- who acted
- what changed
- what the current state meant

This made the system much more understandable under live operational pressure.

### 2. Ownership clarity

Each step clearly identified whether the acting entity was:

- AI agent
- human agent
- system
- transporter

This was critical for enterprise trust and accountability.

### 3. Controlled autonomy

Users could:

- take over from AI
- assign back to AI when appropriate

This created a practical balance between automation and operational control.

### 4. Priority and escalation model

We introduced a triage-inspired structure:

- P0 = critical
- P1 = high
- P2 = medium
- P3 = low

Escalations also followed layered severity progression such as L1 to L3. This helped the system encode urgency in a consistent and operationally meaningful way.

### 5. Actionable UI

Instead of just exposing data, the interface surfaced:

- current alert state
- recommended next step
- escalation stage
- ownership and intervention path

This kept the UI focused on action rather than passive inspection.

---

# TigerSight

Designing an AI-Powered Logistics Control Tower for Real-Time Operations

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

---

# PTL Module Design

## Overview

Part-truckload operations introduced a different operational model from full-truckload workflows. A single journey could involve multiple shipments, multiple drop points, and fragmented tracking states. The existing product assumptions did not hold up well under that structure.

## Problem

The product was shaped around FTL logic, but PTL required grouped shipments, split deliveries, and more complex coordination.

## Approach

I studied where PTL diverged from the current model and designed a workflow around grouped and fragmented operations instead of treating them as exceptions.

## Key Decisions

- Represented relationships across shipment units more clearly
- Supported multi-point coordination
- Preserved enough flexibility to reflect real operations without losing structure

## Outcome

The PTL module gave operators a clearer way to manage fragmented shipments and established a better foundation for supporting PTL at the system level.

## Takeaway

> Extending a product from one operational model to another usually requires rethinking assumptions, not just adding screens.

---

# FT Design System

## 1. Overview

As Freight Tiger expanded across dashboards, tables, upload flows, navigation, and charting surfaces, the lack of a unified component library started slowing both design and development. Designers worked in Figma, developers copied UI code between features, and every new workflow introduced more visual and implementation drift.

The challenge was bigger than building a few shared components. I needed to create a production-grade design system from scratch, make it Figma-faithful, package it for real consumption, document it for both humans and AI tools, and do all of this as a solo builder using AI as a force multiplier rather than a replacement.

## 2. Problem

Before the design system, the product surface had no reliable source of UI truth.

That showed up as:

- inconsistent components across features
- repeated one-off implementation decisions
- weak design-to-code fidelity
- duplicated effort across teams
- poor scalability as the platform grew

The problem was not simply missing components. The real problem was the absence of a shared design and implementation language.

## 3. What Made This Hard

This project was difficult because it combined three different problems at once:

- **design fidelity** — components had to match Figma precisely, not approximately
- **platform architecture** — the system had to be consumable via npm, docs, Storybook, and machine-readable formats
- **scaling constraints** — I had to build and maintain the whole ecosystem solo

The deeper challenge was that the design system had to work in an AI-assisted development world. It was not enough for the system to be consistent when hand-coded by developers. It also had to survive AI-generated code suggestions without visual drift.

## 4. Scale

- **134+** production-ready React components
- **194** custom icons
- **476+** commits to date
- **126 versions** published to npm, from v1.0.1 to v5.0.5
- **13,880 downloads** in the last year, ~1,157/month
- **Stack:** React, TypeScript, Tailwind CSS v4, Radix UI, Rollup
- First published June 6, 2025, actively maintained through April 1, 2026

## 5. Phase 1 — Foundation and Figma Translation

The system began with a large first drop rather than a slow component-by-component crawl. The initial foundation included Button, Table variants, Checkbox, Badge, 190+ icons, and a working npm package with CommonJS, ESM, and TypeScript declarations.

### Key early decisions

- Atomic Design architecture from day one
- CSS custom properties for all design tokens
- Figma treated as the design contract
- Storybook stories generated alongside components
- TypeScript typing baked into the library

This phase established the principle that fidelity mattered. AI could help scaffold, but every component still had to match the design system's intended measurements, states, and structure.

## 6. How I Used AI

I used AI coding tools like Cursor, Claude, and Codex as pair programmers. They helped me translate Figma specs into typed React scaffolds, generate Storybook stories, and accelerate repetitive implementation work. But the architecture, validation, token design, and quality standards remained mine.

AI increased throughput, but it did not replace design-system judgment.

## 7. Phase 2 — Distribution and Consumption

Once the core library was stable, I focused on making it easy to consume.

- npm and GitHub Packages publishing
- UMD bundles for CDN usage
- integration templates for Next.js, Vite, and Create React App

This mattered because a design system fails if it is technically correct but hard to adopt.

## 8. AI-First Documentation

This is where the project became much more forward-looking.

I realized that AI tools were becoming major consumers of component libraries. So I built documentation for both human developers and AI agents:

- `components.json` — structured component metadata
- `design-system.mdx` — rich design system context
- platform-specific optimized prompts
- downloadable JSON and MDX artifacts
- documentation sync scripts to prevent drift between docs and implementation

Instead of documenting only for humans, I treated AI agents as first-class consumers of the design system.

### Dual-audience documentation

- **human mode** — rich interactive docs experience
- **machine mode** — `llms.txt`, `/machine/*`, `component-schema.json`, `registry.json`, and `examples.json` for AI agents

This ensured that AI tools received structured component information instead of scraping a human-first documentation experience.

## 9. Phase 3 — Scale and Quality Infrastructure

As the system scaled into the v4 era, the library grew from a small base into 100+ components. New additions included complex navigation, overlays, file-handling patterns, advanced form controls, and charts.

### Component breakdown

- 27 atoms
- 71 molecules
- 22 organisms
- 3 charts
- 2 templates

That growth forced a quality infrastructure investment.

### Quality gates

- token consistency audits
- cross-component consistency checks
- size contract checks for touch targets
- theme token parity checks
- nightly CI token audits
- component behavior contracts in `/specs/`

This is what made solo scaling possible without losing trust in the system.

## 10. Token Architecture

I built a stronger token backbone that became central to the design system:

- 7 color families, 9 shades each
- 63 semantic color tokens
- 50+ component-specific tokens
- support for light mode, dark mode, and glass morphism themes
- auto-generated token reference docs

### Hardcoded token debt crisis

One of the biggest system refactors was eliminating hardcoded values from the component library. Debt dropped from **282 issues to 23** — a 98.2% reduction — with hardcoded values replaced across 128 component files.

This was not cosmetic cleanup. It was what made theming, consistency, and long-term maintainability actually work.

## 11. Phase 4 — v5 and Architectural Evolution

The v5 phase introduced the biggest structural changes:

- migration of interactive primitives to Radix UI
- Tailwind CSS v4 upgrade
- introduction of the AI protection layer

### Why Radix mattered

By migrating to Radix, the system gained:

- built-in accessibility
- keyboard navigation
- stronger focus management
- more durable interaction primitives across components

## 12. Signature Innovation — AI Protection Layer

The most original contribution in this project was the AI protection system.

I designed the library so AI-generated class overrides could not easily break the design system.

### Export layers

- `ft-design-system` — AI-protected default
- `ft-design-system/ai` — explicit protected layer
- `ft-design-system/core` — unprotected layer for human control

### Protection mechanisms

- `filterAIClasses()` — filters unsafe Tailwind overrides
- `cnSafe()` — safe class merging
- `withAIProtection()` — HOC wrapper for protection

These mechanisms filtered unsafe Tailwind overrides such as arbitrary colors, padding, heights, and radii that AI tools often introduce.

### Why this matters

Most design systems assume humans are the only consumers. This system recognizes that AI is now an implementation participant. The design system therefore needs to defend itself against AI-generated style drift.

That is not just a code utility. It is a product-level architectural decision.

## 13. Figma to Code Bridge

To close the designer-to-developer loop, I integrated Figma Code Connect so designers could select a component in Figma and see the exact React implementation to use.

This moved the design system beyond a library and into a workflow bridge between design and engineering.

## 14. Technical Architecture

At a high level, the system worked like this:

- **Figma** as the single source of design truth
- **Component source** as the single source of code truth
- **Multiple outputs** from that shared foundation: npm package, docs site, Storybook, and machine-mode artifacts

That architecture mattered because it kept the system coherent even as outputs expanded.

### Infrastructure

- 40+ npm scripts
- 6 GitHub Actions workflows
- automated token audits and release pipelines

## 15. Challenges and How I Solved Them

### Figma-to-code fidelity

AI-generated UI tends to be close, not exact. I solved this by treating Figma as the contract, using commit-level precision, and validating details manually against design specs.

### AI tools breaking design consistency

AI assistants often add arbitrary Tailwind overrides. I solved this with the AI protection layer so the system could resist style drift even when AI was part of implementation.

### Documentation for humans and AI

Human developers need interactive examples. AI tools need structured machine-friendly data. I solved this with dual-mode documentation instead of forcing one format to do both jobs.

### Scaling without a team

I solved solo scale with automation, sync pipelines, validation gates, and release workflows that reduced the cost of system maintenance.

### Token debt

I solved the hardcoded-value problem with a systematic refactor and CI checks that prevented regression.

## 16. Outcomes

The system became a production-grade shared UI foundation, a Figma-faithful implementation layer, and a model for how design systems need to evolve in an AI-assisted development environment.

---

---

# Aftercrop

Mobile-first warehouse operations software — A Konic Technologies Product

## Overview

In India, medium-sized warehouses and cold storage facilities are disorganised but vital for farmers and reducing food waste. Current tracking methods are outdated and overly complex. We created user-friendly, mobile-first software to simplify warehouse operations and bring them into the modern era.

## Research

Interviews with warehouse operators revealed a consistent lack of emphasis on design and usability. Ethnographic studies showed a significant gap in user-friendly solutions. Competitive analysis confirmed that the market lacked products with true mobile and desktop parity.

## Three Key Realisations

1. **Design & Usability** — There is scope for a delightful product experience on both mobile and desktop platforms.
2. **Adaptability** — The solution needs to be easy-to-use and fit into existing workflows without disrupting daily operations.
3. **Availability** — There is potential for a modern cloud-based SaaS solution with strong data security.

## Target Audience

1. **Owners / Power Users** — Need dashboards, summaries, and high-level oversight of operations.
2. **Managers** — Mobile-first users transitioning from pen-and-paper workflows.
3. **Staff / Workers** — Require a simple, guided process with minimal learning curve.

## USP

- **Design takes precedence** — Usability and visual clarity are the top priority.
- **Least disruption** — Workflows mirror current pen-and-paper processes.
- **Portability** — Mobile-first approach for on-the-go warehouse management.

## Solution

### Focus 1: Mobile-first Design

Cards instead of tables for better mobile readability. An app-like feel with minimal typing required. No training needed for staff to get started, and fast loading even on slow networks.

### Focus 2: Process Similar to Current Flow

Incoming shipment processing simplified to 3 sections — taking just a couple of minutes to complete. Outgoing shipment designed as an "Add to Cart" experience that feels familiar and intuitive.

### Focus 3: Data Security

User roles with exact permissions ensure data stays secure. The vehicle logs page is the simplest page in the system — just one input field — demonstrating the commitment to minimal complexity.

## Launch

The MVP was shipped in approximately 3 months. Changes were released 2-3 times per week with continuous feedback loops from real warehouse operators, ensuring the product evolved based on actual usage patterns.

---

# Fit X

A fitness app designed for tracking goals, team collaboration and creating personalized plans

## The Problem

People face challenges maintaining consistent physical activity. A lack of motivation often leads to incomplete fitness programs. Existing apps provide non-customizable, one-size-fits-all workout plans that fail to account for individual needs and preferences.

## The Goal

Create a mobile app that enables users to track their daily physical activity and promotes team collaboration. The app should provide customizable workout plans that adapt to individual fitness levels and goals.

## My Approach

- **User Motivation** — Team collaboration features to keep users engaged and accountable.
- **Customizable Workouts** — A user-friendly interface for creating personalized workout plans.
- **Activity Tracking** — Real-time feedback and visualizations to monitor progress.
- **User Collaboration** — Challenges and group activities to foster a sense of community.

## Design Process

Empathize -> Define -> Ideate -> Prototype -> Test

## Research Insights

User interviews and affinity mapping revealed key pain points that guided the design direction:

- lack of active tracking and real-time feedback
- lack of plan makers for personalized workouts
- lack of group coordination for team fitness
- too many ads disrupting the experience
- frequent and irrelevant notifications

## Persona — Ashok

Ashok is a 30-year-old working professional with a busy schedule. He wants to stay fit but struggles to find the right tools and motivation to maintain a consistent fitness routine.

### Goals

- maintain consistent physical activity despite a demanding work schedule
- follow a personalized fitness journey tailored to his needs
- build community connection through group fitness

### Challenges

- motivation hurdles when working out alone
- limited customization in existing fitness apps
- misses the community feel from group fitness classes

## Competitive Analysis

Analyzed Cultfit, Nike Running, and Adidas Running apps to understand the current landscape.

> How might we provide active tracking, personalized plans, and group coordination — all in one seamless experience?

## Solution

The solution focuses on three core features:

1. **Regular stats and progress tracking** — Visualize activity data with clear, motivating feedback.
2. **Build & customize workouts** — Create personalized workout plans tailored to individual goals.
3. **Create teams with friends** — Form groups for team workouts, challenges, and accountability.

## Key Screens

- Splash & Onboarding
- Stats Screen (Individual & Teams)
- Workouts Screen
- Create Workout
- Team Creation (3-step flow)
- Workout Recording

---

# Swiggy Meal Subscriptions

Designing a scheduling and subscription feature for food delivery

## The Task

Regular Swiggy users don't have time when they actually want to order food. The challenge was to build a feature that allows users to schedule orders and create weekly or monthly meal subscriptions.

## Goal

Allow customers to save time and order food more frequently — aiming for 15-20 orders per month through automated scheduling and subscriptions.

## Three User Flows

### Flow 1: From Box Page

Box page -> Tooltip prompt -> Subscription page

### Flow 2: From Past Orders

Past orders -> Select order -> Convert to subscription

### Flow 3: From Favorites

Favorites -> Select favorite -> Convert to subscription

## Subscription Design — 3 Steps

### Step 1: Add Food Items

Same experience as normal ordering — users browse restaurants, select items, and add them to their subscription cart.

### Step 2: Name & Categorize

Name the subscription and choose the meal type (breakfast, lunch, dinner) for easy identification and management.

### Step 3: Schedule & Plan

Choose a plan (Weekly or Monthly), select specific days of the week, and set the auto-order time for each delivery.

## Key Design Decisions

- **Only one CTA button** — Following Swiggy's existing design pattern to maintain consistency.
- **Mimicked existing ordering flow** — Reduced learning curve by building on familiar interactions.
- **Split into 2 steps** — Broke down the subscription setup to reduce cognitive load.
- **Minimized input fields** — Used tap gestures instead of typing wherever possible.

## Constraints & Edge Cases

- food items can only be from one restaurant per subscription
- no modifications allowed after a subscription period starts
- average delivery charge is built into the subscription fee
- system notifies users if a restaurant is closed on a scheduled day

---

# In-flight Food Ordering

An app to help passengers order food inside a plane

## Problem Statement

Help flight passengers place in-flight food orders for immediate consumption through a mobile app — making the dining experience seamless at 35,000 feet.

## Why This Matters

> The current in-flight catering global market is valued at $8.5 billion. In 2017 alone, 1.14 million tonnes of food was wasted from in-flight catering — a staggering figure that highlights the need for smarter ordering systems.

## Understanding the Goal

An aeroplane carries people from various cultures, languages, and regions — each with different dietary restrictions and preferences. It is a significant challenge for cabin crew to cater to every passenger individually.

A food ordering app reduces aisle congestion, avoids awkward conversations between crew and passengers, and helps airlines analyze eating patterns to optimize their catering operations.

## Defining the Audience

- **Geography** — Global audience requiring internationalization and multi-language support
- **Culture** — Different faiths and dietary needs (halal, kosher, vegetarian, vegan)
- **Medical conditions** — Users with allergies and specific dietary restrictions
- **Age** — Passengers ranging from 1 to 80 years old with varying tech comfort levels

## Context & Needs

Passengers are already onboard when they use the app. Currently, ordering food is a hassle — call the crew, wait for them to reach your seat, place the order, then anxiously wait for delivery.

The app provides a quick, self-service ordering experience without requiring crew assistance, giving passengers control over their dining experience.

## Solution — User Story (Ravi)

Ravi's 11-step user journey illustrates the complete experience:

Download app -> Board flight -> Connect to Wi-Fi -> Open app -> Enter seat number -> Browse menu -> Set preferences -> Select items -> Place order -> Receive food -> Great dining experience

## Deliverables

- task flows
- user flows
- information architecture
- hi-fidelity wireframes
- Figma prototype

---

# To Do Reimagine

Reimagining the to-do app for work-from-home employees

## Problem

People forget tasks. Working from home blurs the boundaries between work and personal life. The question worth asking: do generic to-do lists actually work for the current era?

> Work-from-home has fundamentally changed how we manage time — but our task management tools haven't kept up.

## Target Users

Employees working from home — where personal and work life are always in conflict. These users juggle meetings, household chores, personal errands, and deep work, all from the same physical space.

## User Research — 8 Pain Points

1. Fragmented accounts across multiple task apps
2. Cross-platform sync issues between devices
3. Anxiety triggers from overwhelming task counts
4. Limited and uninformative widgets
5. Tedious input with no voice assistant support
6. Annoying recurring task management
7. Poor calendar integration
8. Hard rescheduling of missed or postponed tasks

## Redefined Problem

Work-from-home employees find it difficult to manage personal and work tasks in one place. This mismanagement causes frustration, anxiety, and ultimately reduces productivity across both domains.

## Reimagined Features

1. **Unified view** — All tasks from work and personal life in one place, clearly separated but always accessible.
2. **Voice & NLP** — Reduce time spent adding tasks through natural language processing and voice input.
3. **Cross-device sync** — Seamless synchronization across all devices without account fragmentation.
4. **"Free time" metric** — Show available free time instead of anxiety-inducing task counts.
5. **Smart postponing** — Intelligently postpone low-priority recurring tasks based on workload.
6. **Useful widgets** — "What's next" and "free time for the day" widgets that provide actionable at-a-glance information.
7. **Family sharing** — Share your schedule so family knows when you're busy, reducing interruptions.

---

# We Wrk

Connecting people with artisans for home repairs

## Problem

People are busy, and finding reliable artisans for home repairs is difficult. How do you find a good artisan? How much do they charge? How do you contact them?

On the other side, artisans also struggle to find consistent work unless they are personally recommended. Both sides of the marketplace face friction.

## Solution

An app connecting people and artisans to get home repairs done efficiently. A dual-sided platform that serves both customers looking for reliable help and artisans looking for steady work.

## Customer Side

### Explore Screen

Find artisans by location and type of work. Browse profiles, view ratings, and chat directly with artisans before booking.

### Work Screens

Track ongoing, completed, and scheduled works in one organized view. Stay on top of all your home repair projects.

### Cancelling Work

Cancel a booking with inline feedback — helping improve the platform by understanding why cancellations happen.

### Profile & Notifications

Manage personal details and stay updated on booking confirmations, artisan arrivals, and work completions.

## Artisan Side

### Sign Up

Simple onboarding with phone number, security card verification, and job snaps to showcase their work and build trust.

### Explore

Map-based work discovery with distance filter and chat. Artisans can browse available jobs in their area and connect with customers directly.

### My Jobs

Requested, ongoing, and completed jobs — all in one place. A clear overview of their work pipeline and history.

---

# From Farm

An app revolutionizing fresh produce purchasing directly from farmers

## Overview

Designed `From Farm`, an app that connects consumers directly with farmers for fresh produce. By eliminating middlemen, the platform ensures freshness, fair pricing for farmers, and transparency for buyers.

## Case Studies on Behance

- UX Case Study: Research, user flows, and interaction design on Behance
  https://www.behance.net/gallery/95744555/From-farm-UX
- UI Case Study: Visual design and high-fidelity screens on Behance
  https://www.behance.net/gallery/95746631/From-farm-UI

---

# Monastery

A minimalist finance management app for effortless expense tracking

## Overview

Designed `Monastery`, a minimalist finance management app focused on making expense tracking and management effortless. The design prioritizes clean, minimal UI that reduces friction and helps users stay on top of their finances without cognitive overload.

## Case Study on Behance

- Monastery App — Full Case Study
  https://www.behance.net/gallery/96240671/Monastery-App
