# Element Dimensions — Portfolio Site

**Viewport:** 1440 × 900 (Desktop)
**Total Page Height:** 6055px

---

## Root

| Element | Tag | Width | Height | Padding | Margin | Max Width | Font Size | Line Height | Display |
|---------|-----|-------|--------|---------|--------|-----------|-----------|-------------|---------|
| HTML | `html` | 1440 | 6055 | 0 | 0 | none | 16px | 24px | block |
| Body | `body` | 1440 | 6055 | 0 | 0 | none | 16px | 24px | block |

---

## Navigation (Fixed Header)

| Element | Tag | Width | Height | Padding | Margin | Max Width | Font Size | Line Height | Display | Border |
|---------|-----|-------|--------|---------|--------|-----------|-----------|-------------|---------|--------|
| Navigation Header | `header` | 1440 | 65 | 0 | 0 | none | 16px | 24px | block | bottom 1px, bg: rgba(13,13,13,0.8), backdrop-filter: blur(12px) |
| └ Nav Container | `nav` | 1200 | 64 | 0 48px | 0 120px | 1200px | 16px | 24px | flex | — |
| &nbsp;&nbsp;└ Logo | `a` | 24 | 28 | 0 | 0 | none | 20px | 28px | block | — |
| &nbsp;&nbsp;└ Desktop Nav Links | `div` | 393 | 20 | 0 | 0 | none | 16px | 24px | flex (gap: 32px) | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Nav Link | `a` | 78 | 20 | 0 | 0 | none | 14px | 20px | block | — |

---

## Hero Section

| Element | Tag | Width | Height | Padding | Margin | Max Width | Font Size | Line Height | Display | Border Radius |
|---------|-----|-------|--------|---------|--------|-----------|-----------|-------------|---------|---------------|
| Hero Section | `section` | 1200 | 900 | 96px 48px 0 | 0 120px | 1200px | 16px | 24px | flex | — |
| └ Hero Gradient Blob 1 | `div` | 571 | 571 | 0 | 0 | none | — | — | block (absolute) | 50% |
| └ Hero Gradient Blob 2 | `div` | 406 | 406 | 0 | 0 | none | — | — | block (absolute) | 50% |
| └ Hero Content Wrapper (z-10) | `div` | 1104 | 360 | 0 | 0 | none | 16px | 24px | flex (gap: 64px) | — |
| &nbsp;&nbsp;└ Hero Text Column | `div` | 784 | 360 | 0 | 0 | none | 16px | 24px | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Hero Tagline H1 | `h1` | 784 | 180 | 0 | 0 | none | 72px | 90px | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Hero Subtitle | `p` | 784 | 28 | 0 | 24px 0 0 | none | 20px | 28px | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Hero Bio | `p` | 576 | 48 | 0 | 16px 0 0 | 576px | 16px | 24px | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ View Selected Work CTA | `a` | 176 | 24 | 0 | 0 | none | 16px | 24px | inline-flex (gap: 8px) | — |
| &nbsp;&nbsp;└ Profile Image Container | `div` | 256 | 256 | 0 | 0 | none | — | — | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Profile Image | `img` | 256 | 256 | 0 | 0 | 100% | — | — | block | 9999px (rounded-full) |

---

## Selected Work Section

| Element | Tag | Width | Height | Padding | Margin | Max Width | Font Size | Line Height | Display | Gap |
|---------|-----|-------|--------|---------|--------|-----------|-----------|-------------|---------|-----|
| Work Section | `section` | 1440 | 1030 | 96px 0 | 0 | none | 16px | 24px | block | — |
| └ Work Container | `div` | 1200 | 838 | 0 48px | 0 120px | 1200px | 16px | 24px | block | — |
| &nbsp;&nbsp;└ Section Heading Wrapper | `div` | 1104 | 68 | 0 | 0 0 48px | none | 16px | 24px | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Section Label | `span` | 1104 | 16 | 0 | 0 0 12px | none | 12px | 16px | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Section H2 | `h2` | 1104 | 40 | 0 | 0 | none | 36px | 40px | block | — |
| &nbsp;&nbsp;└ Deep Cards Grid | `div` | 1104 | 324 | 0 | 0 | none | 16px | 24px | grid | 24px |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Deep Card (each) | `div` | 538 | 298 | 32px | 0 | none | 16px | 24px | flex-col | — |
| &nbsp;&nbsp;└ More Work Heading | `h3` | 1104 | 28 | 0 | 0 0 32px | none | 18px | 28px | block | — |
| &nbsp;&nbsp;└ Supporting Cards Grid | `div` | 1104 | 274 | 0 | 0 | none | 16px | 24px | grid | 24px |

### Card Anatomy (Deep Project Card)

| Element | Tag | Width | Height | Padding | Font Size | Line Height | Border |
|---------|-----|-------|--------|---------|-----------|-------------|--------|
| Card Outer (hover wrapper) | `div` | 540 | 300 | 0 | — | — | 1px, radius: 12px |
| └ Card Inner | `div` | 538 | 298 | 32px | — | — | bg: #1a1a1a |
| &nbsp;&nbsp;└ Title | `h3` | — | — | 0 | 24px | 32px | — |
| &nbsp;&nbsp;└ Tagline | `p` | — | — | 0 (mt: 4px) | 14px | 20px | — |
| &nbsp;&nbsp;└ Description | `p` | — | — | 0 (mt: 16px) | 14px | 20px | — |
| &nbsp;&nbsp;└ Tags Container | `div` | — | — | 0 (mt: 16px) | — | — | gap: 8px |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Tag Pill | `span` | auto | 28 | 4px 12px | 12px | 16px | radius: full |
| &nbsp;&nbsp;└ Case Study Link | `a` | — | — | 0 (mt: 16px) | 14px | 20px | — |

---

## Built with AI Section

| Element | Tag | Width | Height | Padding | Margin | Max Width | Font Size | Line Height | Display | Gap |
|---------|-----|-------|--------|---------|--------|-----------|-----------|-------------|---------|-----|
| AI Section | `section` | 1440 | 636 | 96px 0 | 0 | none | 16px | 24px | block | — |
| └ AI Container | `div` | 1200 | 444 | 0 48px | 0 120px | 1200px | 16px | 24px | block | — |
| &nbsp;&nbsp;└ AI Cards Grid | `div` | 1104 | 288 | 0 | 0 | none | 16px | 24px | grid | 24px |

### AI Card Anatomy

| Element | Tag | Width | Height | Padding | Font Size | Border |
|---------|-----|-------|--------|---------|-----------|--------|
| Card Outer (hover wrapper) | `div` | 540 | 288 | 0 | — | 1px, radius: 12px |
| └ Card Inner | `div` | 538 | 286 | 24px | — | bg: #1a1a1a |
| &nbsp;&nbsp;└ "Built with AI" Badge | `span` | 109 | 26 | 4px 10px | 12px | 1px, radius: full |
| &nbsp;&nbsp;└ Title | `h3` | — | — | 0 | 18px | — |
| &nbsp;&nbsp;└ Tagline | `p` | — | — | 0 (mt: 4px) | 14px | — |
| &nbsp;&nbsp;└ Description | `p` | — | — | 0 (mt: 12px) | 14px | — |
| &nbsp;&nbsp;└ Tags Container | `div` | — | — | 0 (mt: 16px) | — | gap: 8px |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Tag Pill | `span` | auto | 28 | 4px 12px | 12px | radius: full |
| &nbsp;&nbsp;└ Links Row | `div` | — | — | 0 (mt: 16px) | 14px | gap: 16px |

---

## Writing Section

| Element | Tag | Width | Height | Padding | Margin | Max Width | Display |
|---------|-----|-------|--------|---------|--------|-----------|---------|
| Writing Section | `section` | 1440 | 506 | 96px 0 | 0 | none | block |
| └ Writing Container | `div` | 1200 | 314 | 0 48px | 0 120px | 1200px | block |

### Article Card

| Element | Tag | Width | Height | Padding | Font Size | Line Height | Border |
|---------|-----|-------|--------|---------|-----------|-------------|--------|
| Article Card | `div` | 672 | 198 | 24px | 16px | 24px | 1px, radius: 12px |
| └ Title | `h3` | 622 | 28 | 0 | 20px | 28px | — |
| └ Date + Categories | `p` | 622 | 40 | 0 (mt: 12px) | 14px | 20px | — |
| └ Summary | `p` | 622 | — | 0 (mt: 12px) | 14px | 20px | — |
| └ Read Link | `a` | — | — | 0 (mt: 16px) | 14px | 20px | — |

---

## App Designs Section (Horizontal Scroll)

| Element | Tag | Width | Height | Padding | Margin | Max Width | Display | Gap |
|---------|-----|-------|--------|---------|--------|-----------|---------|-----|
| Apps Section | `section` | 1440 | 708 | 96px 0 | 0 | none | block | — |
| └ Apps Container | `div` | 1200 | 516 | 0 48px | 0 120px | 1200px | block | — |
| &nbsp;&nbsp;└ Horizontal Scroll | `div` | 1104 | 400 | 0 | 0 | none | flex | 16px |

### App Gallery Item

| Element | Tag | Width | Height | Padding | Font Size | Border |
|---------|-----|-------|--------|---------|-----------|--------|
| Gallery Item Wrapper | `div` | 320 | 400 | 0 | — | — |
| └ Gallery Card | `div` | 320 | 400 | 0 | — | 1px, radius: 12px |
| &nbsp;&nbsp;└ Image Container | `div` | 318 | 318 | 0 | — | aspect: 1:1 |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Image | `img` | 318 | 318 | 0 | — | — |
| &nbsp;&nbsp;└ Text Container | `div` | 318 | 80 | 16px | — | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Title | `h4` | 286 | 24 | 0 | 16px (fw: 600) | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Tagline | `p` | 286 | — | 0 (mt: 4px) | 14px | — |

---

## Websites Section

| Element | Tag | Width | Height | Padding | Margin | Max Width | Display | Gap |
|---------|-----|-------|--------|---------|--------|-----------|---------|-----|
| Websites Section | `section` | 1440 | 591 | 96px 0 | 0 | none | block | — |
| └ Websites Container | `div` | 1200 | 399 | 0 48px | 0 120px | 1200px | block | — |
| &nbsp;&nbsp;└ Websites Grid | `div` | 1104 | 283 | 0 | 0 | none | grid (3 cols) | 24px |

### Website Card

| Element | Tag | Width | Height | Padding | Font Size | Border |
|---------|-----|-------|--------|---------|-----------|--------|
| Website Card | `div` | 352 | 283 | 0 | — | 1px, radius: 12px |
| └ Image | `img` | 350 | 197 | 0 | — | aspect: 16:9 |
| └ Text Container | `div` | 350 | 84 | 16px | — | — |
| &nbsp;&nbsp;└ Title | `h3` | — | — | 0 | 18px | — |
| &nbsp;&nbsp;└ Tagline | `p` | — | — | 0 (mt: 4px) | 14px | — |

---

## Resume Section

| Element | Tag | Width | Height | Padding | Margin | Max Width | Display | Gap |
|---------|-----|-------|--------|---------|--------|-----------|---------|-----|
| Resume Section | `section` | 1440 | 1188 | 96px 0 | 0 | none | block | — |
| └ Resume Container | `div` | 1200 | 996 | 0 48px | 0 120px | 1200px | block | — |

### Timeline Item

| Element | Tag | Width | Height | Padding | Font Size | Display | Gap |
|---------|-----|-------|--------|---------|-----------|---------|-----|
| Timeline Item | `div` | 1104 | 216 | 0 | 16px | flex | 32px |
| └ Period Column | `div` | 160 | 216 | 0 | — | block | — |
| &nbsp;&nbsp;└ Period Text | `span` | — | — | 0 | 14px | — | — |
| └ Dot + Content | `div` | — | — | 0 | — | flex | 16px |
| &nbsp;&nbsp;└ Timeline Dot | `div` | 10 | 10 | 0 | — | block | radius: full |
| &nbsp;&nbsp;└ Timeline Line | `div` | 1 | flex | 0 (mt: 8px) | — | block | — |
| &nbsp;&nbsp;└ Content Area | `div` | — | — | 0 0 40px | — | block | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Role | `h3` | — | — | 0 | 16px (semibold) | — | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Company · Location | `p` | — | — | 0 | 14px | — | — |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Highlights List | `ul` | — | — | 0 (mt: 12px) | — | — | space-y: 8px |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└ Highlight Item | `li` | — | — | 0 | 14px | flex | gap: 8px |

### Skills & Tools

| Element | Tag | Width | Height | Padding | Font Size | Display | Gap |
|---------|-----|-------|--------|---------|-----------|---------|-----|
| Skills Container | `div` | 528 | 100 | 0 | — | flex wrap | 8px |
| └ Skill Tag | `span` | ~107 | 28 | 6px 12px | 12px | block | radius: full |

---

## Contact Section

| Element | Tag | Width | Height | Padding | Margin | Font Size | Display | Gap |
|---------|-----|-------|--------|---------|--------|-----------|---------|-----|
| Contact Section | `section` | 1440 | 378 | 96px 0 | 0 | 16px | block | — |
| └ Contact Container | `div` | 1200 | 186 | 0 48px | 0 120px | 16px | block (text-center) | — |
| &nbsp;&nbsp;└ Heading | `h2` | 1104 | 48 | 0 | 0 0 16px | 48px | block | — |
| &nbsp;&nbsp;└ Subtext | `p` | — | — | 0 | 0 0 48px | 16px | block | — |
| &nbsp;&nbsp;└ Buttons Container | `div` | 1104 | 50 | 0 | 0 | 16px | flex | 16px |
| &nbsp;&nbsp;&nbsp;&nbsp;└ Email Button | `a` | 133 | 50 | 12px 32px | 0 | 16px | flex | radius: full |
| &nbsp;&nbsp;&nbsp;&nbsp;└ LinkedIn Button | `a` | 131 | 50 | 12px 32px | 0 | 16px | flex | radius: full, border: 1px |

---

## Footer

| Element | Tag | Width | Height | Padding | Margin | Max Width | Display |
|---------|-----|-------|--------|---------|--------|-----------|---------|
| Footer | `footer` | 1200 | 117 | 0 48px | 0 120px | 1200px | block |
| └ Section Divider | `div` | 1104 | 1 | 0 | 0 | none | block |
| └ Footer Content | `div` | 1104 | 116 | 48px 0 | 0 | none | block |
| &nbsp;&nbsp;└ Logo Text | `span` | — | — | 0 | 0 | — | — |
| &nbsp;&nbsp;└ Version | `span` | — | — | 0 | 0 | — | — |
| &nbsp;&nbsp;└ Copyright | `span` | — | — | 0 | 0 | — | — |

---

## Design System Summary

### Spacing Scale (8px grid)

| Token | Value | Used In |
|-------|-------|---------|
| 4px | 0.25rem | Tag pill padding-y, small gaps |
| 8px | 0.5rem | Flex gaps, margins |
| 12px | 0.75rem | Card padding (inner), label margins |
| 16px | 1rem | Card text padding, flex gaps, margins |
| 24px | 1.5rem | Grid gaps, card padding, margins |
| 32px | 2rem | Nav gap, section sub-margins |
| 48px | 3rem | Container inline padding, footer padding, section margins |
| 64px | 4rem | Section padding (mobile) |
| 96px | 6rem | Section padding (desktop), hero top padding |

### Typography Scale

| Element | Font | Size | Line Height | Weight |
|---------|------|------|-------------|--------|
| Hero Tagline | Instrument Serif | 72px | 90px | 400 |
| Contact Heading | Inter | 48px | 48px | 600 |
| Section H2 | Inter | 36px | 40px | 600 |
| Card Title (deep) | Inter | 24px | 32px | 600 |
| Hero Subtitle | Inter | 20px | 28px | 400 |
| Article Title | Inter | 20px | 28px | 600 |
| Logo | Inter | 20px | 28px | 700 |
| Card Title (supporting) | Inter | 18px | 28px | 600 |
| Body | Inter | 16px | 24px | 400 |
| Button Text | Inter | 16px | 24px | 500 |
| Nav Link | Inter | 14px | 20px | 400 |
| Card Description | Inter | 14px | 20px | 400 |
| Timeline Period | Inter | 14px | 20px | 400 |
| Section Label | Inter | 12px | 16px | 500 |
| Tag Pill | Inter | 12px | 16px | 400 |

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #0d0d0d | Page background |
| `--bg-secondary` | #141414 | Alternating section background |
| `--bg-card` | #1a1a1a | Card backgrounds |
| `--bg-card-hover` | #1e1e1e | Card hover state |
| `--border-subtle` | #2a2a2a | Card borders, dividers |
| `--border-hover` | #3a3a3a | Card hover borders |
| `--text-primary` | #ffffff | Headings, primary text |
| `--text-secondary` | #a0a0a0 | Body text, descriptions |
| `--text-tertiary` | #5a5a5a | Labels, periods, meta |
| `--accent-muted` | rgba(255,255,255,0.06) | Tag pill backgrounds |

### Border Radius

| Value | Used In |
|-------|---------|
| 12px | Cards (all types) |
| full (9999px) | Tag pills, buttons, timeline dot, AI badge |
| 9999px (rounded-full) | Profile image |
| 50% | Gradient blobs (CSS) |

### Layout

| Property | Value |
|----------|-------|
| Max content width | 1200px |
| Container inline padding | 48px (desktop), 24px (mobile) |
| Container auto margin | centered (`0 120px` at 1440px viewport) |
| Grid gap (cards) | 24px |
| Grid columns (deep cards) | 2 |
| Grid columns (supporting) | 3 |
| Grid columns (websites) | 3 |
| Horizontal scroll item width | 320px |
