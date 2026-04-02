# Design System Tokens And Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add semantic radius tokens, document the design system, install Remotion, refine motion to stay subtle, and verify dependency safety for the portfolio site.

**Architecture:** Keep the current Astro + React structure intact and extend the existing global token layer rather than refactoring the whole styling system. Use semantic CSS custom properties for radius, preserve Framer Motion for page interactions, and add Remotion as an isolated animation capability rather than replacing runtime UI motion.

**Tech Stack:** Astro, React, TypeScript, Tailwind CSS v4, Framer Motion, Remotion, npm

---

### Task 1: Add Semantic Radius Tokens

**Files:**
- Modify: `/Users/user/Documents/portfolio/src/styles/global.css`
- Modify: `/Users/user/Documents/portfolio/src/components/astro/CaseStudyRelatedLinks.astro`
- Modify: `/Users/user/Documents/portfolio/src/components/astro/CaseStudyView.astro`
- Modify: `/Users/user/Documents/portfolio/src/components/react/ProtectedCaseStudy.tsx`

- [ ] **Step 1: Add semantic radius variables**

Define `--radius-sm`, `--radius-md`, `--radius-lg`, and `--radius-xl` from the existing base radius token in `global.css`.

- [ ] **Step 2: Map key reusable surfaces to semantic radii**

Update the highest-visibility rounded surfaces to use inline style or utility-compatible CSS rules based on the new semantic radius tokens instead of only hardcoded shape choices.

- [ ] **Step 3: Verify radius token wiring**

Run: `rg -n "radius-sm|radius-md|radius-lg|radius-xl" /Users/user/Documents/portfolio/src/styles/global.css /Users/user/Documents/portfolio/src/components`

Expected: token definitions plus at least a few production surfaces using them.

### Task 2: Document The Design System

**Files:**
- Create: `/Users/user/Documents/portfolio/design-system.md`

- [ ] **Step 1: Write the design system document**

Document:
- theme token model
- semantic radius tokens
- typography mapping
- motion principles
- component surface conventions

- [ ] **Step 2: Verify the document exists and is readable**

Run: `sed -n '1,220p' /Users/user/Documents/portfolio/design-system.md`

Expected: clear sections covering tokens, radii, and motion guidance.

### Task 3: Install Remotion

**Files:**
- Modify: `/Users/user/Documents/portfolio/package.json`
- Modify: `/Users/user/Documents/portfolio/package-lock.json`

- [ ] **Step 1: Inspect live package metadata before install**

Run: `npm view remotion version dist-tags repository --json`

Expected: valid npm metadata for the package and no obvious package-name spoofing.

- [ ] **Step 2: Install Remotion**

Run: `npm install remotion`

Expected: package and lockfile updated cleanly.

- [ ] **Step 3: Verify installed package**

Run: `npm ls remotion`

Expected: one resolved installed version in the local tree.

### Task 4: Refine Motion To Stay Subtle

**Files:**
- Modify: `/Users/user/Documents/portfolio/src/lib/animations.ts`
- Modify: `/Users/user/Documents/portfolio/src/components/react/AnimatedHero.tsx`
- Modify: `/Users/user/Documents/portfolio/src/components/react/ScrollReveal.tsx`
- Modify: `/Users/user/Documents/portfolio/src/styles/global.css`

- [ ] **Step 1: Reduce motion intensity**

Adjust animation distances, duration, and stagger timing to feel more restrained while preserving hierarchy.

- [ ] **Step 2: Add or extend subtle motion helpers**

Keep the motion system centralized in `animations.ts` and avoid introducing flashy transforms.

- [ ] **Step 3: Verify reduced-motion support remains intact**

Run: `rg -n "prefers-reduced-motion|fadeUp|fadeIn|stagger" /Users/user/Documents/portfolio/src/styles/global.css /Users/user/Documents/portfolio/src/lib/animations.ts /Users/user/Documents/portfolio/src/components/react`

Expected: reduced-motion handling still present and the motion helpers still centralized.

### Task 5: Supply-Chain Review And Verification

**Files:**
- Modify: `/Users/user/Documents/portfolio/package-lock.json`

- [ ] **Step 1: Run npm audit**

Run: `npm audit --json`

Expected: JSON report with vulnerability counts for direct and transitive dependencies.

- [ ] **Step 2: Review direct package metadata**

Run: `npm view astro react react-dom framer-motion lucide-react remotion --json version repository dist-tags`

Expected: all packages resolve to expected upstreams with consistent metadata.

- [ ] **Step 3: Verify production build**

Run: `npm run build`

Expected: Astro build completes successfully with 0 build errors.
