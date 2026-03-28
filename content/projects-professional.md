# Professional Projects

---

## 1. Freight Invoicing & Reconciliation

*Fixing broken billing logic in logistics systems*

### Overview

Freight billing in logistics is not just invoicing. It is a trust system between transporters and consignors.

The existing system generated invoices before validating freight correctness. This led to:

- Frequent disputes
- Manual reconciliation
- Payment delays
- Operational overhead

This project redesigned the billing system by introducing a pre-invoice reconciliation layer.

### Problem

The core issue was not UI. It was system order.

**Existing flow:**

1. Journey completed
2. Invoice generated
3. Discrepancies found
4. Disputes raised
5. Manual corrections

This created a loop: **invoice → dispute → correction → rework**

**Key gaps:**

- No validation before invoice
- No single source of truth
- ePOD not enforced properly
- Charge-level errors hidden inside line items

**Insight:**
Billing errors were not happening during invoicing. They were happening *before* invoicing, but the system ignored it.

So fixing UI or invoice screens alone would not work. The solution needed:

- Validation before invoice
- Clear ownership of changes
- Structured reconciliation

### Solution

I redesigned the system into three clear modules:

#### Module 1: Bills (Validation + Reconciliation)

- Central place for freight correctness
- Checks:
  - Distance
  - Vehicle type
  - Contract rates
  - Additional charges
- Enabled charge-level approval (not just line-level)

> This is critical. Users don't think in "line items". They think in "charges".

#### Module 2: Invoicing (Execution Layer)

- Invoice generated only after validation
- Locked data → no further edits
- Supports:
  - Digital signatures
  - Final submission

#### Module 3: Disputes (Exception Layer)

- Handles post-invoice issues
- Credit / Debit notes
- Clear audit trail

> This separated normal flow vs exception flow.

### Key Design Decisions

**1. Move validation before invoice**

Most systems do this wrong. This single change reduces an estimated 70–80% of disputes.

**2. Support dual workflows**

Two real-world cases:

- Both transporter & consignor use the platform
- Only consignor uses the platform (Excel upload case)

System supports both without breaking flow.

**3. ePOD as a gate**

- Reconciliation only after ePOD approval
- Ensures proof before billing

**4. Charge-level approval**

Instead of: approve entire bill
Users can: approve / reject individual charges

> This matches the real mental model.

**5. Handle real-world messiness**

Edge cases supported:

- Pre-invoice submission
- Post-invoice corrections
- Reversal of wrongly approved ePODs
- Credit / debit note adjustments

### User Flow (Simplified)

1. Journey completed
2. ePOD approved
3. Bill generated
4. User reviews charges
5. Reconciliation done
6. Invoice generated
7. (Optional) Dispute raised

### What Changed

| Before | After |
|--------|-------|
| Reactive system | Proactive system |
| Errors found late | Errors caught early |
| High dependency on disputes | Disputes become exceptions |

### Impact (Expected)

- % reduction in disputes (to be validated with data)
- Time saved in billing cycle
- Reduction in manual effort

> To strengthen: Add real metrics from internal measurement or user feedback.

### What I Learned

- Billing is not a UI problem. It is a system sequencing problem.
- Users don't think in system terms (line items). They think in real-world concepts (charges).
- B2B systems must handle imperfect behavior, not ideal flows.

### What I Would Do Next

- Add analytics:
  - Where most disputes happen
  - Which charges are frequently edited
- Automate validation using rules / ML
- Build trust score for transporters

---

## 2. Journey Management Redesign

*Turning a data-heavy logistics screen into an actionable system*

### Overview

In logistics, journeys are the core unit of execution. Every delay, cost, and exception connects back to a journey.

The existing "My Journeys" experience had evolved into a data dump:

- Too many columns
- Mixed signals (status, alerts, actions)
- No clear priority

Users were seeing data, but not able to act on it.

This project focused on redesigning the experience into an action-first system.

### Problem

The screen was not designed with a clear purpose. It tried to be:

- A tracking dashboard
- A reporting table
- A notification system
- An action interface

**Result: It failed at all four.**

**Key issues:**

**1. No clear mental model**

- What is a journey state?
- When is a journey "complete" vs "achieved"?
- Users had to interpret system logic

**2. High cognitive load**

- Too many columns
- No prioritization
- Important signals lost in noise

**3. No actionability**

- Users had to scan manually
- No quick way to answer: *"What needs my attention now?"*

**4. Inconsistent states**

Different systems defined journey stages differently:

- In transit
- At loading
- Completed
- Assumed (achieved)

> This broke trust.

### Insight

The problem was not "table design".

It was: **The system does not know what a journey means.**

Until the system defines:

- Clear states
- Clear transitions
- Clear priorities

...UI will always become messy.

### Solution

I redesigned the system around three principles:

#### Principle 1: Define a clear journey lifecycle

Standardized journey states:

- En route to loading
- At loading
- In transit
- At destination
- Return (if applicable)
- Completed

Also introduced:

- **Achieved** state → when no data is available but progress is inferred

> This removes ambiguity between actual vs assumed progress.

#### Principle 2: Make it action-first, not data-first

Instead of: *show everything*
We shifted to: **show what matters now**

Key changes:

- Actionable filters (priority-based)
- Clear status signals
- Reduced noise

Users can now quickly answer:

- Which journeys are delayed?
- Which need intervention?

#### Principle 3: Separate signal from data

| Before | After |
|--------|-------|
| Everything looked equal | Status = primary, Details = secondary |

Used:

- Visual hierarchy
- State-driven indicators

### Key Design Decisions

**1. "Completed" vs "Achieved"**

- **Completed** → confirmed via data (geofence, events)
- **Achieved** → inferred (no direct signal)

> This is subtle but critical. You are exposing system confidence to the user.

**2. Don't overload rows**

- Avoid mini dashboards inside rows
- Keep rows scannable
- Details revealed progressively

**3. Filters > Columns**

Instead of adding more columns, give users control via filters.

> Columns scale badly. Filters scale well.

**4. Align system + UI**

Worked with system logic:

- Geofence events
- Gate-in / Gate-out
- Event timestamps

UI reflects system truth, not guesswork.

### Example Flow

**User goal:** Find delayed journeys

| Before | After |
|--------|-------|
| Scan entire table | Apply "Delayed" filter |
| Check multiple columns | View only relevant journeys |
| No clear indicator | Take action immediately |

### What Changed

| Before | After |
|--------|-------|
| Data-heavy | Actionable |
| Reactive | Prioritized |
| Confusing states | Clear lifecycle |

### Impact (Expected)

- Time to identify delayed journeys ↓
- Number of actions taken per session ↑
- Reduced dependency on manual tracking

> To strengthen: Add real metrics. Without them, this reads as UI designer work, not product designer work.

### What I Learned

- Tables are not UI components. They are decision systems.
- Without a clear mental model, UI always degrades over time.
- B2B users don't want information. They want clarity + control.

### What I Would Do Next

- Add alerting system (proactive, not reactive)
- Predict delays using historical data
- Personalize views based on user role

### To Make This Top-Tier

1. Add before vs after screens
2. Add journey lifecycle state diagram
3. Add event → state mapping diagram
4. Add 1 real user quote
5. Add 1 measurable metric (even small)
6. Show what was rejected (cards? dashboards?) and why

---

## 3. FT Design System

*The design system for enterprise products*

**Live:** [ftdesignsystem.netlify.app](https://ftdesignsystem.netlify.app)
**Current Version:** v4.21.0
**Built with:** AI-assisted development (AI tools used for coding)

### Overview

As the product scaled across multiple modules, UI became inconsistent: different spacing, typography, colors. Components behaving differently. No shared foundation between design and engineering.

This project focused on building a system-first design foundation — now a production-grade React component library.

### Problem

UI inconsistency was not a design issue. It was a lack of system.

**Key gaps:**

- No unified token system
- No spacing consistency
- No theme support
- No standard component behavior

**Result:** Slower development. Visual inconsistency. Hard to scale.

### Solution — What Was Built

| Metric | Count |
|--------|-------|
| Components | 80+ (125 with variants) |
| Design Tokens | 300+ |
| Themes | 3 (Light, Dark, Night) |
| Icons | 187 |
| Chart Types | 16 |
| Building Blocks | 5 page-level patterns |
| TypeScript | 100% |

### Component Architecture (Atomic Design)

**Atoms (23)** — Avatar, Badge, Button, Checkbox, Input, Label, Switch, Text, Typography, and more

**Molecules (50+)** — Alert, Breadcrumb, Calendar, Carousel, Date Picker, Dropdown, Modal, Notification, Pagination, Slider, Tabs, Tooltip, Upload, and more

**Organisms (20+)** — App Header, Data Entry Table, Drawer, Form, Grid, Navigation Launcher, Table, User Profile, and more

### Design Tokens

**1. Color System (7 categories, semantic naming)**

| Category | Range | Purpose |
|----------|-------|---------|
| Primary | 900–100 | Brand colors |
| Secondary | 900–100 | Supporting palette |
| Tertiary | 900–0 | Neutral tones |
| Neutral | 900–100 | Blue-based neutrals |
| Positive | 900–100 | Success states (green) |
| Warning | 900–100 | Warning states (orange) |
| Danger | 900–100 | Error states (red) |

Exportable in: HEX, RGB, HSL, CSS variables, Tailwind classes, OKLCH

**2. Typography Scale** — Defined type ramp with semantic naming

**3. Spacing** — 8-point grid system

### Multi-theme Support

- Light, Dark, Night modes
- Optional glassmorphism
- Token-based switching via CSS variables
- Automatic theme detection via localStorage

### Chart Components (16 types)

Area, Bar, Line, Pie, Radar, Radial, Scatter, Bubble, Doughnut, Polar Area, Gauge, Bullet, Waterfall, Dual Axes, Horizontal Bar, Stacked Bar (CSS)

### Building Blocks (Page-Level Patterns)

- **Dashboard** — Complete layout with header, cards, data table
- **Login Page** — Clean auth page with form and branding
- **Listing Page with Filters** — Quick filters + table
- **My Journeys Listing Page** — Filters, tabs, table view, responsive card view
- **Formula Builder** — Interactive rule-based dropdown builder

### Icon Library (187 icons)

Customizable: color, stroke width, size, absolute stroke width. Covers common UI patterns and domain-specific functions (truck, warehouse, route-deviation, tracker).

### AI-Readable Documentation

- Introduced structured docs (llms.txt)
- Machine-readable rules for Cursor, Copilot, Claude, and other AI coding assistants
- Forward-looking decision for AI-native development workflows

### Technical Foundation

- Built on **Radix UI** primitives (accessibility)
- Styled with **Tailwind CSS** (customization)
- **Tree-shakeable exports** with minimal runtime overhead
- Complete **TypeScript** definitions for every component, prop, and event
- **WAI-ARIA compliant** — tested with screen readers and keyboard navigation
- Comprehensive **Storybook** documentation
- CLI tools for automated setup, verification, and updates

### Key Decisions

- System before components
- Tokens before styles
- Consistency over flexibility
- Atomic hierarchy (atoms → molecules → organisms)
- Performance first (tree-shakeable, optimized bundles)
- AI-ready documentation from day one

### Impact

- Faster design → dev handoff
- Reduced UI inconsistencies
- Easier scaling across modules
- Shared language between design and engineering

> Missing: adoption metrics. Need proof of team usage.

### Learning

Design systems fail when they are treated as libraries. They should be treated as infrastructure.

---

## 4. Gatekeeper App – Journey Closure System

*Fixing incorrect journey closure in logistics tracking*

### Overview

Journey closure logic was inconsistent across customers: different closure triggers, events overwriting each other, wrong journey states. This created unreliable tracking.

### Problem

The system treated locations as static: "A → B"

But real journeys are:

- A → B → A (return)
- Multi-stop
- Repeated locations

The system was not designed for reality.

### Solution

**1. Defined closure methods**

- Geofence entry
- Gate-in
- Gate-out (final closure)

**2. Introduced stop-visit instances**

Instead of reusing the same location, created separate visit instances internally. This prevents event overwrite issues.

**3. Event-based tracking**

- Every event has a timestamp
- Journey state derived from events

### Key Decision

Separate UI simplicity from backend correctness. Users see a simple journey. System handles complexity internally.

### Impact

- Accurate journey closure
- No incorrect overwrites
- Better tracking reliability

### Learning

Real-world systems are messy. If backend is wrong, UI cannot fix it.

---

## 5. Billing Flexibility (Cycles vs Non-Cycles)

*Designing for real-world transporter behavior*

### Overview

Billing systems assumed all transporters follow cycles. But in reality:

- Large transporters → follow cycles
- Small transporters → don't

System was breaking for a large segment.

### Problem

Rigid system design forced users into cycle-based flow. Result: workarounds and manual processes.

### Solution

Designed dual flows:

**1. Cycle-based billing** — Structured billing periods. Used by large transporters.

**2. Non-cycle billing** — Direct bill handling. Flexible submission.

**3. Hierarchy design** — Cycle → Transporter → Bills. Works for both models.

### Key Decision

Do not enforce system logic on user behavior.

### Impact

- Supports wider user base
- Reduced workarounds

### Learning

In B2B: flexibility beats ideal systems.

---

## 6. Logistics Planner (ML – Early Stage)

*Exploring optimization in logistics planning*

### Overview

Goal: Build ML-based planner for cost optimization, route optimization, and load optimization.

### Problem

Current planning systems are rule-based, static, and suboptimal.

### Approach

Defined MVP plan:

1. **Data layer** — Trip data, cost data, constraints
2. **Feature engineering** — Distance, load capacity, delivery timelines
3. **Optimization models** — Route optimization, cost minimization

### Reality Check

This is not a finished project. It is an exploration phase.

### Learning

ML success depends more on data quality and constraints modeling — not just algorithms.

---

## Portfolio Structure Guide

| Type | Projects | Depth |
|------|----------|-------|
| **Deep case studies** | Freight Invoicing, Journey Redesign | Full narrative |
| **Supporting projects** | Design System, Gatekeeper, Billing Flexibility | Tight + sharp |
| **Optional** | ML Planner (only if framed honestly) | Brief |

### To reach top-tier level

- Add metrics to deep case studies
- Add tradeoffs and what was rejected
- Add failures and what you learned from them
- Show decision → tradeoff → measurable outcome
