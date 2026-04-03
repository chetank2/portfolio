import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = "/Users/user/Documents/portfolio";

async function read(path) {
  return readFile(`${root}${path}`, "utf8");
}

test("global machine copy handler exists outside MachinePageShell", async () => {
  const layout = await read("/src/layouts/BaseLayout.astro");
  assert.match(layout, /data-machine-copy/);
});

test("protected case study page defines a shared top action bar", async () => {
  const page = await read("/src/pages/work/[slug].astro");
  assert.match(page, /data-case-study-topbar/);
  assert.match(page, /data-case-study-lock/);
});

test("protected case study component no longer renders its own floating lock button row", async () => {
  const component = await read("/src/components/react/ProtectedCaseStudy.tsx");
  assert.doesNotMatch(component, /Lock again/);
});

test("hero resume link uses the bordered secondary button style", async () => {
  const hero = await read("/src/components/astro/Hero.astro");
  assert.match(hero, /border border-border/);
  assert.match(hero, /Open Resume/);
});

test("scroll reveal hydrates on load and does not use a delayed negative in-view margin", async () => {
  const [homePage, caseStudyPage, caseStudyView, scrollReveal] = await Promise.all([
    read("/src/pages/index.astro"),
    read("/src/pages/work/[slug].astro"),
    read("/src/components/astro/CaseStudyView.astro"),
    read("/src/components/react/ScrollReveal.tsx"),
  ]);

  for (const source of [homePage, caseStudyPage, caseStudyView]) {
    assert.doesNotMatch(source, /<ScrollReveal client:visible\b/);
  }

  assert.match(scrollReveal, /client:load|useInView/);
  assert.doesNotMatch(scrollReveal, /margin:\s*"-80px"/);
});

test("homepage contact and shared footer use centered mailto-focused contact layout", async () => {
  const [homePage, footer] = await Promise.all([
    read("/src/pages/index.astro"),
    read("/src/components/astro/Footer.astro"),
  ]);

  assert.match(homePage, /id="contact"/);
  assert.match(homePage, /SectionHeading number="07" label="Contact" title="Let's Build Better Systems"/);
  assert.match(homePage, /mailto:mymailchetan25@gmail\.com/);
  assert.match(homePage, /Let's Build Better Systems/);
  assert.doesNotMatch(homePage, />\s*Get in Touch\s*</);

  assert.doesNotMatch(footer, /mailto:mymailchetan25@gmail\.com/);
  assert.doesNotMatch(footer, /label:\s*"Work"/);
  assert.doesNotMatch(footer, /label:\s*"Built with AI"/);
  assert.doesNotMatch(footer, /label:\s*"Writing"/);
  assert.doesNotMatch(footer, /label:\s*"Resume"/);
  assert.doesNotMatch(footer, /label:\s*"Email"/);
  assert.match(footer, /label:\s*"X", href:\s*"https:\/\/x\.com\/kchetank19"/);
  assert.match(footer, /label:\s*"LinkedIn", href:\s*"https:\/\/linkedin\.com\/in\/chetan-kumar25\/"/);
  assert.match(footer, /&copy; 2026 Chetan Kummari/);
});
