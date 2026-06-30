---
version: alpha
name: Chetan Portfolio Design System
description: Design tokens and visual language for the redesign/minimal-homepage branch.
themes:
  light:
    color:
      background: "#ffffff"
      surface: "#fafafa"
      elevated: "#ffffff"
      hover: "#f4f4f5"
      textPrimary: "#0a0a0a"
      textSecondary: "#71717a"
      accent: "#18181b"
      border: "#e4e4e7"
      borderHover: "#d4d4d8"
      destructive: "#ef4444"
    effects:
      headerBackground: "rgba(255, 255, 255, 0.82)"
      headerBorder: "rgba(10, 10, 10, 0.08)"
      grainOpacity: 0.018
      selection: "rgba(24, 24, 27, 0.12)"
      cardShadowHover: "0 12px 32px rgba(24, 24, 27, 0.04), 0 8px 16px rgba(24, 24, 27, 0.06)"
      modalBackdrop: "rgba(255, 255, 255, 0.88)"
  dark:
    color:
      background: "#0a0a0a"
      surface: "#171717"
      elevated: "#0a0a0a"
      hover: "#27272a"
      textPrimary: "#fafafa"
      textSecondary: "#a1a1aa"
      accent: "#fafafa"
      border: "#27272a"
      borderHover: "#52525b"
      destructive: "#7f1d1d"
    effects:
      headerBackground: "rgba(10, 10, 10, 0.85)"
      headerBorder: "rgba(255, 255, 255, 0.08)"
      grainOpacity: 0.035
      selection: "rgba(250, 250, 250, 0.18)"
      cardShadowHover: "0 12px 40px rgba(250, 250, 250, 0.02), 0 2px 8px rgba(0, 0, 0, 0.4)"
      modalBackdrop: "rgba(10, 10, 10, 0.90)"
  machine:
    color:
      background: "#0b0a08"
      surface: "#13120e"
      elevated: "#1b1a14"
      hover: "#23221a"
      textPrimary: "#f0ebe0"
      textSecondary: "#8c8577"
      textTertiary: "#56524a"
      accent: "#c8a555"
      accentSoft: "rgba(200, 165, 85, 0.10)"
      accentBorder: "rgba(200, 165, 85, 0.20)"
      border: "#252318"
      borderHover: "#353225"
typography:
  display:
    family: "Libre Baskerville, EB Garamond, ui-serif, Georgia, serif"
    use: "Quiet editorial headings, case-study titles, and portfolio section titles."
  body:
    family: "EB Garamond, ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
    use: "Longform reading, captions, metadata, and restrained navigation."
  mono:
    family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    use: "Inline technical terms, code, and machine-readable labels."
typeScale:
  title:
    size: "1.65rem"
    lineHeight: 1.3
    weight: 400
    letterSpacing: "-0.01em"
  sectionTitle:
    size: "1.35rem"
    lineHeight: 1.35
    weight: 400
  subsectionTitle:
    size: "1.1rem"
    lineHeight: 1.5
    weight: 500
    style: italic
  body:
    size: "1.15rem"
    lineHeight: 1.85
  meta:
    size: "0.9rem"
    lineHeight: 1.5
    letterSpacing: "0.01em"
  small:
    size: "0.8rem"
    lineHeight: 1.5
    letterSpacing: "0.02em"
  caseStudySection:
    size: "1.75rem"
    md: "2rem"
    xl2: "2.25rem"
    weight: 700
  caseStudySubsection:
    size: "1.125rem"
    md: "1.25rem"
    xl2: "1.375rem"
    weight: 700
radii:
  base: "0.625rem"
  sm: "0.375rem"
  md: "0.625rem"
  lg: "0.875rem"
  xl: "1.25rem"
layout:
  editorialContainer:
    maxWidth: "600px"
    paddingX: "1.5rem"
    desktopPaddingX: "2rem"
  minimalPage:
    maxWidth: "600px"
    padding: "5rem 1.5rem 6rem"
    desktopPadding: "7rem 2rem 8rem"
  wideCaseStudy:
    maxWidth: "900px"
    readingWidth: "600px"
motion:
  sectionReveal:
    initialOpacity: 0.72
    initialTransform: "translateY(18px)"
    opacityDuration: "720ms"
    transformDuration: "760ms"
    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
  reducedMotion:
    opacity: 1
    transform: none
    transition: none
components:
  backLink:
    typography: "body, 0.9rem, italic"
    color: "textTertiary"
    markerWidth: "1rem"
    hoverMarkerWidth: "1.5rem"
  stickyBackRow:
    background: "color-mix(in srgb, background 82%, transparent)"
    backdropFilter: "blur(16px)"
    padding: "0.85rem max(1.5rem, 50vw - 300px)"
  projectLink:
    typography: "body, 1.1rem, 1.7 line-height"
    padding: "0.6rem 0"
    border: "1px solid color-mix(in srgb, textPrimary 8%, transparent)"
---

# Chetan Portfolio Design System

## Principles

The interface is intentionally editorial: generous white space, serif typography, low-chroma surfaces, and quiet interaction states. The design should feel like a portfolio meant for reading, not a dashboard or marketing site.

Use contrast through type, rhythm, and spacing before adding color. The palette stays nearly monochrome in light and dark modes, with the machine mode reserved for AI-readable surfaces and alternate system views.

## Color

Use `background`, `surface`, and `elevated` as the page structure. Use `textPrimary` for reading content, `textSecondary` for supporting copy, and `border` for subtle separation. Accent color should be sparse and mostly typographic.

Machine mode uses warm graphite and muted gold. It should feel distinct from the human portfolio without becoming decorative.

## Typography

Display and body type both use serif families. Headings should remain calm and literary, with minimal letter-spacing changes. Body copy should keep the longform rhythm: large enough to read, loose enough to breathe, and never compressed into dense product-copy blocks.

Use monospace only for code, technical labels, and machine-readable phrases.

## Layout

The primary reading container is 600px wide. Case studies can use wider image blocks, but longform text should return to the reading width. Avoid nested cards, heavy panels, or decorative containers that interrupt the editorial rhythm.

## Motion

Motion is subtle and section-based. Reveals should move content gently into place and never call attention away from reading. Respect reduced-motion preferences by removing transform and transition effects.

## Components

Back links use an understated horizontal mark and italic serif text. Sticky back rows use glass-like blur only after scroll, with enough top and bottom padding to feel intentional.

Project links are text-led rows with hairline borders. Use hover states to improve affordance, not to create a separate visual style.
