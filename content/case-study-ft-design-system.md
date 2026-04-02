## Links

<div class="case-study-link-list">
  <a class="case-study-link-list__item" href="https://ftdesignsystem.netlify.app" target="_blank" rel="noopener noreferrer">
    <span class="case-study-link-list__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M3 12h18"></path>
        <path d="M12 3a14.5 14.5 0 0 1 0 18"></path>
        <path d="M12 3a14.5 14.5 0 0 0 0 18"></path>
      </svg>
    </span>
    <span>Live View</span>
    <span class="case-study-link-list__arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17L17 7"></path>
        <path d="M9 7h8v8"></path>
      </svg>
    </span>
  </a>
  <a class="case-study-link-list__item" href="https://www.npmjs.com/package/ft-design-system" target="_blank" rel="noopener noreferrer">
    <span class="case-study-link-list__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 7.5h18v9H12v-6H9v6H3z"></path>
      </svg>
    </span>
    <span>npm Package</span>
    <span class="case-study-link-list__arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17L17 7"></path>
        <path d="M9 7h8v8"></path>
      </svg>
    </span>
  </a>
  <a class="case-study-link-list__item" href="https://github.com/chetanft/components" target="_blank" rel="noopener noreferrer">
    <span class="case-study-link-list__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.91c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.11 2.73.64.72 1.03 1.63 1.03 2.75 0 3.96-2.33 4.82-4.56 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.22C22 6.58 17.52 2 12 2z"></path>
      </svg>
    </span>
    <span>GitHub Repo</span>
    <span class="case-study-link-list__arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17L17 7"></path>
        <path d="M9 7h8v8"></path>
      </svg>
    </span>
  </a>
</div>

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
- **126 versions** published to [npm](https://www.npmjs.com/package/ft-design-system), from v1.0.1 to v5.0.5
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

The system delivered:

- a production-ready component foundation for the entire platform
- faster and more consistent implementation across teams
- stronger design-to-code alignment
- AI-aware documentation and consumption patterns
- a more scalable theming and accessibility foundation

## 17. What I Learned

- accessibility primitives should be part of the foundation, not an afterthought
- token systems should come before component sprawl
- machine-readable documentation should be designed early
- AI is a powerful multiplier, but architecture still requires human judgment

## 18. What I Would Improve Next

If I were rebuilding this from scratch, I would:

- adopt Radix primitives from day one
- define the complete token model earlier
- build machine-mode documentation into the initial architecture instead of adding it later

## 19. Closing

> A design system is not just a component library. It is an operating system for product consistency.

This project shows how I think about systems, not just screens. It combines design fidelity, developer experience, architecture, documentation, automation, accessibility, and AI-era constraints into one coherent platform layer.
