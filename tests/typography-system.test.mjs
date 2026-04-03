import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = "/Users/user/Documents/portfolio";

async function read(path) {
  return readFile(`${root}${path}`, "utf8");
}

test("human-facing Astro pages and components do not use font-mono utility classes", async () => {
  const paths = [
    "/src/pages/index.astro",
    "/src/pages/work/[slug].astro",
    "/src/pages/work/aftercrop.astro",
    "/src/pages/work/fitx.astro",
    "/src/pages/work/freight-invoicing.astro",
    "/src/pages/work/fromfarm.astro",
    "/src/pages/work/inflight.astro",
    "/src/pages/work/journey-redesign.astro",
    "/src/pages/work/monastery.astro",
    "/src/pages/work/swiggy.astro",
    "/src/pages/work/todo.astro",
    "/src/pages/work/wewrk.astro",
    "/src/components/astro/AIProjectCard.astro",
    "/src/components/astro/ArticleCard.astro",
    "/src/components/astro/CaseStudyView.astro",
    "/src/components/astro/Footer.astro",
    "/src/components/astro/Navigation.astro",
    "/src/components/astro/SectionHeading.astro",
    "/src/components/astro/SupportingProjectCard.astro",
    "/src/components/astro/TimelineItem.astro",
    "/src/components/react/NavigationMenu.tsx",
    "/src/components/react/ProtectedCaseStudy.tsx",
  ];

  for (const path of paths) {
    const content = await read(path);
    assert.doesNotMatch(content, /\bfont-mono\b/, `${path} still uses font-mono`);
  }
});

test("human UI typography helpers in global styles use display font instead of mono", async () => {
  const css = await read("/src/styles/global.css");

  const humanSelectors = [
    /\.section-number\s*\{[\s\S]*?font-family:\s*var\(--font-display\)/,
    /\.view-mode-toggle__option\s*\{[\s\S]*?font-family:\s*var\(--font-display\)/,
    /\.theme-toggle-button\s*\{[\s\S]*?font-family:\s*var\(--font-display\)/,
    /\.tag-pill\s*\{[\s\S]*?font-family:\s*var\(--font-display\)/,
  ];

  for (const selector of humanSelectors) {
    assert.match(css, selector);
  }
});

test("machine mode and code contexts still use mono font", async () => {
  const css = await read("/src/styles/global.css");

  assert.match(css, /html\.machine-mode[\s\S]*font-family:\s*var\(--font-mono\)/);
  assert.match(css, /\.machine-text-block\s*\{[\s\S]*?font-family:\s*var\(--font-mono\)/);
  assert.match(css, /\.machine-page-shell__nav-link\s*\{[\s\S]*?font-family:\s*var\(--font-mono\)/);
  assert.match(css, /\.longform-content code,[\s\S]*font-family:\s*var\(--font-mono\)/);
});

test("human-facing pages and components use semantic typography classes instead of raw size and weight utilities", async () => {
  const paths = [
    "/src/pages/index.astro",
    "/src/pages/work/[slug].astro",
    "/src/components/astro/CaseStudyView.astro",
    "/src/components/astro/SectionHeading.astro",
    "/src/components/astro/ProjectCard.astro",
    "/src/components/astro/SupportingProjectCard.astro",
    "/src/components/astro/AIProjectCard.astro",
    "/src/components/astro/ArticleCard.astro",
    "/src/components/astro/WebsiteCard.astro",
    "/src/components/astro/TimelineItem.astro",
    "/src/components/astro/CaseStudyRelatedLinks.astro",
    "/src/components/astro/Hero.astro",
    "/src/components/react/AnimatedHero.tsx",
    "/src/components/react/NavigationMenu.tsx",
    "/src/components/react/ProtectedCaseStudy.tsx",
    "/src/components/react/ImageLightbox.tsx",
  ];

  const rawUtilityPattern = /\b(?:font-(?:600|700|800)|text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl))\b/;

  for (const path of paths) {
    const content = await read(path);
    assert.doesNotMatch(content, rawUtilityPattern, `${path} still uses raw typography utilities`);
  }
});
