# Design System

## Overview

This portfolio uses a lightweight token-driven design system layered on top of Astro, React, and Tailwind CSS v4. The goal is consistency without overbuilding: shared semantic tokens for color, typography, radius, and motion drive the highest-visibility surfaces, while component-level styling stays pragmatic.

## Theme Tokens

The theme is defined in [`src/styles/global.css`](/Users/user/Documents/portfolio/src/styles/global.css) with light and dark mode token sets.

### Core token groups

- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--sidebar`, `--sidebar-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--border`, `--ring`, `--input`

### Portfolio semantic mappings

The site continues to use a semantic portfolio layer so components do not need to know raw token names:

- `--color-bg-deep`
- `--color-bg-surface`
- `--color-bg-elevated`
- `--color-bg-hover`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-tertiary`
- `--color-accent`
- `--color-accent-soft`
- `--color-accent-border`
- `--color-border`
- `--color-border-hover`

These semantic variables are mapped from the base theme tokens, which lets the site evolve its palette without rewriting every component.

## Typography

Typography is intentionally semantic rather than component-local.

- `--font-display`: primary UI heading stack
- `--font-body`: reading and narrative content stack
- `--font-mono`: labels, metadata, controls, and machine-like UI copy

Current mapping:

- display: `--font-sans`
- body: `--font-serif`
- mono: `--font-mono-stack`

## Semantic Radius Tokens

The site now exposes semantic radius tokens derived from the base `--radius` token.

- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-xl`

### Radius guidance

- `--radius-sm`: compact controls and tighter UI
- `--radius-md`: default inputs and secondary containers
- `--radius-lg`: cards, buttons, and modal-adjacent surfaces
- `--radius-xl`: prominent containers, galleries, and hero-level cards

### Utility classes

To reduce repeated inline radius values, the global stylesheet defines:

- `.radius-sm`
- `.radius-md`
- `.radius-lg`
- `.radius-xl`

These should be preferred for reusable surfaces instead of scattering hardcoded `rounded-*` choices everywhere.

## Motion System

The site currently uses Framer Motion for runtime UI animation and Remotion is installed for animation workflows that should stay outside the runtime page interaction layer.

### Runtime motion principles

- animations should be subtle
- use opacity and small translation first
- avoid exaggerated scale, blur, or parallax
- preserve readability over spectacle
- keep reduced-motion support intact

### Current runtime motion helpers

Defined in [`src/lib/animations.ts`](/Users/user/Documents/portfolio/src/lib/animations.ts):

- `fadeUp`
- `fadeIn`
- `staggerContainer`
- `scaleIn`
- `staggerFast`
- `slideInLeft`

### Motion usage rules

- hero text should reveal softly, not bounce
- section reveals should use low-distance vertical movement
- overlays and dialogs should fade and scale minimally
- ambient background motion should stay slow and low-contrast

## Component Surface Conventions

Use these conventions when creating or updating portfolio UI:

- cards: elevated background, subtle border, `radius-lg` or `radius-xl`
- form inputs: `radius-md` or `radius-lg`, visible focus border
- protected content containers: `radius-xl`
- pills and compact badges: `radius-xl` only when the shape should read as soft and capsule-like
- media frames: `radius-xl` for primary content, `radius-lg` for supporting content

## Animation Tooling

### Framer Motion

Use Framer Motion for:

- hero reveals
- section entrance transitions
- menu and overlay motion
- small runtime UI interactions

### Remotion

Use Remotion for:

- reusable motion experiments
- branded animation studies
- rendered motion assets or video-style sequences
- future case-study animation exports

Do not use Remotion as a replacement for straightforward runtime UI transitions already handled well by Framer Motion.

## Supply Chain Review Policy

Before adding new frontend dependencies:

- confirm package identity with `npm view`
- inspect repository metadata and dist-tags
- run `npm audit`
- prefer mature packages with clear upstream ownership
- avoid installing overlapping packages when an existing dependency already solves the runtime problem

## Verification

Whenever token or motion changes are made:

1. run `npm run build`
2. inspect key hero and case-study surfaces in both themes
3. confirm reduced-motion behavior remains intact
4. verify new dependencies with audit and package metadata checks
