# Minimal Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage from a card-heavy, multi-section layout to a minimal, text-only single-page portfolio inspired by [Raufan's portfolio](reference screenshot), while preserving case study pages and machine mode.

**Architecture:** Replace the entire homepage (`index.astro`) with a single-column, text-focused layout. Remove Hero, ProjectCard, AIProjectCard, ArticleCard, TimelineItem components from the homepage. Keep Navigation minimal (just logo + theme toggle). Keep all case study routes (`/work/[slug]`) and `/work` archive intact. The homepage becomes pure prose with highlighted company names, bold keywords, and underlined project links.

**Tech Stack:** Astro, Tailwind CSS v4, existing fonts (swap Syne display for a cleaner feel — use Newsreader as the primary body font for the minimal aesthetic)

---

## Content Mapping (Reference → Chetan's Version)

The reference design has these content blocks. Here's how they map to Chetan's portfolio:

| Reference (Raufan) | Chetan's Version |
|---|---|
| "Hey, I'm Raufan." | "Hey, I'm **Chetan**." |
| Tokyo-based product designer, 10+ years | Hyderabad-based product designer, 8+ years building across industries |
| Currently at Uniqlo, before SmartNews, tiket.com, Tokopedia | Currently designing at **Freight Tiger**. Before I designed for **Konic Technologies**, **Versatile Mobitech**, and more. |
| "I help those companies create designs that scale..." | "I help teams build systems that scale, bring clarity to complex operations, and make enterprise software feel simple." |
| "intentional, collaborative, empathetic" | "**systematic**, **collaborative**, and **empathetic**" |
| Project links (SmartNews FTUX, Design System, tiket.com Discover, etc.) | Project links (Redesigning Freight Tiger's TMS, Control Tower, FT Design System, Aftercrop, CouponTracker, Design QA) |
| Closing section: YouTube, Substack, photography | Closing section: Medium writing, GitHub projects, side interests |

---

## File Structure

### Files to Create
- `src/pages/index-minimal.astro` → will replace `src/pages/index.astro`

### Files to Modify
- `src/pages/index.astro` — complete rewrite with minimal layout
- `src/components/astro/Navigation.astro` — simplify to just logo + theme toggle (no nav links)
- `src/components/astro/Footer.astro` — simplify to match minimal style
- `src/styles/global.css` — add highlight/pill styles for company names

### Files Untouched
- `src/pages/work/index.astro` — archive page stays as-is
- `src/pages/work/[slug].astro` — case study pages stay as-is
- `src/data/projects.ts` — data stays, homepage just uses it differently
- `src/layouts/BaseLayout.astro` — stays as-is
- All React components — stay for case study pages, just not imported on homepage

---

## Task 1: Create Branch

**Files:** None (git operation)

- [ ] **Step 1: Create and switch to new branch**

```bash
git checkout -b redesign/minimal-homepage
```

- [ ] **Step 2: Verify branch**

```bash
git branch --show-current
```
Expected: `redesign/minimal-homepage`

---

## Task 2: Add Minimal Homepage Styles

**Files:**
- Modify: `src/styles/global.css` (append new utility styles)

- [ ] **Step 1: Add highlight and minimal-page styles to global.css**

Add these styles at the end of `global.css` (before any closing blocks):

```css
/* ── Minimal homepage ── */
.highlight-pill {
  background-color: var(--color-highlight, rgba(200, 230, 210, 0.45));
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: inherit;
}

.theme-dark .highlight-pill {
  --color-highlight: rgba(120, 180, 140, 0.2);
}

.minimal-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
}

@media (min-width: 640px) {
  .minimal-page {
    padding: 6rem 2rem 8rem;
  }
}

.minimal-page p {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-text-primary);
  margin-bottom: 1.75rem;
}

.minimal-page .intro-line {
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 2.5rem;
}

.minimal-page .section-gap {
  margin-top: 3.5rem;
}

.minimal-page a.project-link {
  display: block;
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--color-border);
  padding: 0.75rem 0;
  transition: color 0.2s ease;
}

.minimal-page a.project-link:hover {
  color: var(--color-text-primary);
  text-decoration-color: var(--color-text-primary);
}

.minimal-page .closing-section {
  margin-top: 4rem;
}

.minimal-page .closing-section a {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--color-border);
  transition: text-decoration-color 0.2s ease;
}

.minimal-page .closing-section a:hover {
  text-decoration-color: var(--color-text-primary);
}
```

- [ ] **Step 2: Verify dev server still works**

```bash
cd /Users/Personal/Documents/Portfolio && npm run dev
```
Expected: Server starts without CSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add minimal homepage utility styles"
```

---

## Task 3: Simplify Navigation for Homepage

**Files:**
- Modify: `src/components/astro/Navigation.astro`

- [ ] **Step 1: Rewrite Navigation.astro to be minimal**

The navigation should show just the logo on the left and theme toggle on the right. No nav links, no hamburger menu. Non-fixed positioning (static, scrolls with page).

```astro
---
import ThemeToggle from "../react/ThemeToggle.tsx";

interface Props {
  minimal?: boolean;
}

const { minimal = false } = Astro.props;

const links = [
  { label: "Work", href: "/#work" },
  { label: "Built with AI", href: "/#ai" },
  { label: "Writing", href: "/#writing" },
  { label: "Experience", href: "/#resume" },
  { label: "Contact", href: "/#contact" },
];
---

<header
  class:list={[
    "site-header border-b",
    !minimal && "fixed top-0 left-0 right-0 z-50",
  ]}
>
  <nav class:list={[
    "mx-auto h-14 sm:h-16 flex items-center justify-between",
    minimal
      ? "max-w-[640px] px-6 sm:px-8"
      : "max-w-[1200px] 2xl:max-w-[1600px] px-5 sm:px-6 md:px-12 2xl:px-24",
  ]}>
    <a href="/" class="inline-flex items-center text-text-primary hover:opacity-80 transition-opacity duration-300" aria-label="Chetan Kummari home">
      <img
        src="/che-logo.svg"
        alt="చే."
        width="36"
        height="44"
        class="site-logo h-7 sm:h-8 w-auto"
        loading="eager"
      />
    </a>

    {minimal ? (
      <ThemeToggle client:load />
    ) : (
      <>
        {/* Desktop nav */}
        <div class="hidden md:flex items-center gap-4 lg:gap-8">
          <div class="flex items-center gap-8">
            {links.map((link) => (
              <a
                href={link.href}
                class="text-text-secondary hover:text-accent transition-colors duration-300 link-hover"
              >
                <span class="type-ui-meta">{link.label}</span>
              </a>
            ))}
          </div>
          <ThemeToggle client:load />
        </div>

        {/* Mobile nav */}
        <div class="md:hidden flex items-center gap-2">
          <ThemeToggle client:load />
          <NavigationMenu client:load links={links} />
        </div>
      </>
    )}
  </nav>
</header>
```

**Note:** Add the missing import for NavigationMenu at the top:
```astro
---
import NavigationMenu from "../react/NavigationMenu.tsx";
import ThemeToggle from "../react/ThemeToggle.tsx";
```

- [ ] **Step 2: Commit**

```bash
git add src/components/astro/Navigation.astro
git commit -m "feat: add minimal mode to Navigation component"
```

---

## Task 4: Rewrite Homepage

**Files:**
- Modify: `src/pages/index.astro` — complete rewrite

- [ ] **Step 1: Rewrite index.astro with minimal text layout**

Replace the entire file content with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Navigation from "../components/astro/Navigation.astro";
import MachinePageShell from "../components/astro/MachinePageShell.astro";
import ViewModeToggle from "../components/astro/ViewModeToggle.astro";
import Footer from "../components/astro/Footer.astro";
import {
  deepProjects,
  aiProjects,
  experience,
  article,
} from "../data/projects";

function formatProjectLine(project: (typeof deepProjects)[number] | (typeof aiProjects)[number]) {
  const href = project.caseStudyUrl ?? "#";
  if (project.protected) {
    return `- ${project.title} — ${project.tagline} (${href}, protected)`;
  }
  if (project.caseStudyUrl?.startsWith("/work/")) {
    return `- ${project.title} — ${project.tagline} (${project.caseStudyUrl}, /machine${project.caseStudyUrl})`;
  }
  return `- ${project.title} — ${project.tagline} (${href})`;
}

const homeMachineText = [
  "# Chetan Kummari",
  "> Senior Product Designer focused on complex B2B systems, design systems, and AI-assisted product building.",
  "",
  "## Work",
  ...deepProjects.map(formatProjectLine),
  "",
  "## Built with AI",
  ...aiProjects.map(formatProjectLine),
  "",
  "## Experience",
  ...experience.flatMap((exp) => [
    `### ${exp.role} — ${exp.company}`,
    `- Location: ${exp.location}`,
    `- Period: ${exp.period}`,
    ...exp.highlights.map((highlight) => `- ${highlight}`),
    "",
  ]),
  "## Writing",
  `- ${article.title} — ${article.summary} (${article.url})`,
  "",
  "## Contact",
  "- Resume: https://drive.google.com/file/d/1KQSSWbCDAwvKiQgXSI1ssj7m3p-vtZmD/view",
  "- Email: mailto:mymailchetan25@gmail.com",
  "- X: https://x.com/kchetank19",
  "- LinkedIn: https://linkedin.com/in/chetan-kumar25/",
  "- GitHub: https://github.com/chetank2",
].join("\n");

const caseStudyLinks = [
  ...deepProjects.map((p) => ({
    title: `${p.title} — ${p.tagline}`,
    href: p.caseStudyUrl ?? "#",
    protected: p.protected,
  })),
  ...aiProjects.map((p) => ({
    title: `${p.title} — ${p.tagline}`,
    href: p.caseStudyUrl ?? "#",
    protected: false,
  })),
];
---

<BaseLayout>
  <div data-view-panel="human">
    <Navigation minimal />
  </div>

  <main id="main">
    <div data-view-panel="machine" hidden class="bg-bg-deep min-h-screen">
      <MachinePageShell
        title="Chetan Kummari"
        pageHref="/"
        pageLabel="portfolio page"
        text={homeMachineText}
      />
    </div>

    <div data-view-panel="human">
      <div class="minimal-page">
        <!-- Greeting -->
        <p class="intro-line">
          Hey, I'm <span class="highlight-pill">Chetan</span>.
        </p>

        <!-- Bio -->
        <p>
          I'm a product designer with 8+ years of experience building across industries. I love to build stuff and learn new things out of it, and currently exploring many things on AI as a designer.
        </p>

        <p>
          Currently designing at <span class="highlight-pill">Freight Tiger</span>, building systems for India's freight logistics. Before I designed for <span class="highlight-pill">Konic Technologies</span>, <span class="highlight-pill">Versatile Mobitech</span>, and more.
        </p>

        <!-- What I do -->
        <div class="section-gap">
          <p>
            I help teams build systems that scale, bring clarity to complex operations, and make enterprise software feel human. Experienced in B2B platforms, design systems, and operational tools where the challenge is less about visual polish and more about clarity under complexity.
          </p>

          <p>
            Those experiences shaped me to be more <strong>systematic</strong>, <strong>collaborative</strong>, and <strong>empathetic</strong>. Here are some projects that reflect that journey:
          </p>
        </div>

        <!-- Project links -->
        <div class="section-gap">
          {caseStudyLinks.map((link) => (
            <a
              href={link.href}
              class="project-link"
            >
              {link.title}{link.protected ? " ↗" : ""}
            </a>
          ))}
        </div>

        <!-- Closing -->
        <div class="closing-section">
          <p>
            Last but not least, good design begins with curiosity. Outside design, I write about <a href={article.url} target="_blank" rel="noopener noreferrer">complex table design</a>, build side projects on <a href="https://github.com/chetank2" target="_blank" rel="noopener noreferrer">GitHub</a>, and share my work on <a href="https://x.com/kchetank19" target="_blank" rel="noopener noreferrer">X</a> and <a href="https://linkedin.com/in/chetan-kumar25/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
          </p>
        </div>
      </div>
    </div>
  </main>

  <ViewModeToggle />
  <div data-view-panel="human">
    <Footer minimal />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rewrite homepage with minimal text-only layout"
```

---

## Task 5: Simplify Footer

**Files:**
- Modify: `src/components/astro/Footer.astro`

- [ ] **Step 1: Add minimal prop to Footer**

```astro
---
interface Props {
  minimal?: boolean;
}

const { minimal = false } = Astro.props;

const footerLinks = [
  { label: "Resume", href: "https://drive.google.com/file/d/1KQSSWbCDAwvKiQgXSI1ssj7m3p-vtZmD/view", external: true },
  { label: "X", href: "https://x.com/kchetank19", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/chetan-kumar25/", external: true },
  { label: "GitHub", href: "https://github.com/chetank2", external: true },
];
---

<footer class="border-t border-border">
  <div class:list={[
    "mx-auto py-10 sm:py-14",
    minimal
      ? "max-w-[640px] px-6 sm:px-8"
      : "max-w-[1200px] 2xl:max-w-[1600px] px-5 sm:px-6 md:px-12 2xl:px-24",
  ]}>
    <div class="footer-clean">
      <p class="type-ui-meta text-text-tertiary">&copy; 2026 Chetan Kummari</p>
      <nav class="footer-link-row" aria-label="Footer">
        {footerLinks.map((link) => (
          <a
            href={link.href}
            class="type-ui-meta text-text-tertiary transition-colors duration-300 hover:text-text-primary"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/astro/Footer.astro
git commit -m "feat: add minimal mode to Footer component"
```

---

## Task 6: Verify & Polish

**Files:** None new — visual verification

- [ ] **Step 1: Run dev server and verify**

```bash
cd /Users/Personal/Documents/Portfolio && npm run dev
```

Open `http://localhost:4321` and verify:
- Greeting line with highlighted "Chetan"
- Bio paragraphs with highlighted company names
- Section about what he does with bold keywords
- Simple underlined project links
- Closing section with external links
- Minimal nav (logo + theme toggle)
- Footer aligned to content width
- Dark mode works correctly with highlight pills
- Machine mode still works (`?view=machine`)

- [ ] **Step 2: Check case study pages still work**

Visit `/work` and `/work/aftercrop` to confirm nothing is broken.

- [ ] **Step 3: Run build**

```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Final commit if any polish needed**

```bash
git add -A
git commit -m "polish: fine-tune minimal homepage styles"
```

---

## Summary of Changes

| What | Before | After |
|---|---|---|
| Homepage layout | Hero + card grid + sections + animations | Single-column prose, 640px max-width |
| Navigation | Fixed header, 5 nav links, hamburger menu | Static header, logo + theme toggle only |
| Project display | Image cards in 2-col grid | Simple underlined text links |
| Typography | Syne display + Newsreader body | Newsreader body throughout |
| Animations | ScrollReveal, Framer Motion stagger | None on homepage |
| Components used | Hero, ProjectCard, AIProjectCard, ArticleCard, TimelineItem, SectionHeading | None (pure HTML/CSS) |
| Case study pages | Unchanged | Unchanged |
| Machine mode | Unchanged | Unchanged |
| `/work` archive | Unchanged | Unchanged |
