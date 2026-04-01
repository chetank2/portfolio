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

export function serializeMachineCaseStudyCollection(caseStudies) {
  const lines = [
    "# Chetan Kummari Portfolio",
    "",
    "Description: Portfolio of product design, AI-assisted builds, logistics workflows, and case studies.",
    "Stack: Astro, React, Tailwind CSS",
    "Repo: https://github.com/chetank2/portfolio",
    "",
    "Human pages:",
    ...caseStudies.map((caseStudy) => `- /work/${caseStudy.slug}`),
    "",
    "Machine pages:",
    ...caseStudies.map((caseStudy) => `- /machine/work/${caseStudy.slug}`),
    "",
    "Rules:",
    "- Human pages are the visual portfolio experience.",
    "- Machine pages are plain-text, deterministic versions for LLMs and crawlers.",
    "- Protected case studies are excluded from this file and from dedicated /machine routes.",
    "- Use `?view=machine` on supported human routes for in-browser preview.",
    "",
  ];

  return lines.join("\n").trimEnd() + "\n";
}
