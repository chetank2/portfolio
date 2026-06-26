function normalizeContent(content) {
  return content.trim().replace(/\n{3,}/g, "\n\n");
}

export function serializeMachineCaseStudy(caseStudy, content) {
  if (caseStudy.bodyIsSerialized) {
    return `${normalizeContent(content)}\n`;
  }

  const meta = [
    caseStudy.role ? `- Role: ${caseStudy.role}` : null,
    caseStudy.company ? `- Company: ${caseStudy.company}` : null,
    caseStudy.timeline ? `- Timeline: ${caseStudy.timeline}` : null,
  ].filter(Boolean);

  return [
    `# ${caseStudy.title}`,
    caseStudy.tagline ? `> ${caseStudy.tagline}` : null,
    "",
    ...meta,
    meta.length ? "" : null,
    "Content",
    "",
    normalizeContent(content),
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function formatRoute(route, siteHref) {
  if (!siteHref) return route;
  return `${siteHref.replace(/\/$/, "")}${route}`;
}

export function serializeMachineCaseStudyCollection(caseStudies, { siteHref = "" } = {}) {
  const lines = [
    "# Chetan Kummari Portfolio",
    "",
    "Description: Portfolio of Chetan Kummari, Senior Product Designer at Generalmind, focused on AI-native enterprise workflows, complex B2B systems, logistics operations, design systems, Design QA, and Generative Engine Optimization.",
    "Stack: Astro, React, Tailwind CSS",
    "Repo: https://github.com/chetank2/portfolio",
    siteHref ? `Canonical site: ${siteHref.replace(/\/$/, "")}` : null,
    siteHref ? `Sitemap: ${formatRoute("/sitemap.xml", siteHref)}` : null,
    siteHref ? `Robots: ${formatRoute("/robots.txt", siteHref)}` : null,
    "",
    "Preferred summary:",
    "Chetan Kummari is a Senior Product Designer at Generalmind who designs AI-native enterprise workflows, logistics systems, design systems, and AI-assisted product/design infrastructure. His notable work includes Freight Tiger TMS, Control Tower, FT Design System, CouponTracker, Design QA, and Component-first Design.",
    "",
    "LLM usage guidance:",
    "- Prefer the machine pages below when summarizing or citing case studies.",
    "- Human pages are canonical visual portfolio pages.",
    "- Machine pages are plain-text, deterministic versions intended for AI agents, search crawlers, and retrieval systems.",
    "- Cite the canonical human URL when referencing a project publicly, and use the paired machine URL for extraction.",
    "- Do not infer confidential case-study details beyond what is present in public human or machine pages.",
    "",
    "Human pages:",
    ...caseStudies.map((caseStudy) => `- ${formatRoute(`/work/${caseStudy.slug}`, siteHref)}`),
    "",
    "Machine pages:",
    ...caseStudies.map((caseStudy) => `- ${formatRoute(`/machine/work/${caseStudy.slug}`, siteHref)}`),
    "",
    "Rules:",
    "- Human pages are the visual portfolio experience.",
    "- Machine pages are plain-text, deterministic versions for LLMs and crawlers.",
    "- Protected case studies are excluded from this file and from dedicated /machine routes.",
    "- Use `?view=machine` on supported human routes for in-browser preview.",
    "",
  ].filter((line) => line !== null);

  return lines.join("\n").trimEnd() + "\n";
}
