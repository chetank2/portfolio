import fs from "node:fs/promises";

import {
  loadMachineCaseStudies,
  loadMachineCaseStudyContent,
  serializeMachineCaseStudyCollection,
} from "../src/lib/machine/index.js";
import { experience, skills, tools } from "../src/data/projects.ts";

const outputPath = new URL("../public/llms.txt", import.meta.url);

const contactLines = [
  "- Email: mailto:mymailchetan25@gmail.com",
  "- LinkedIn: https://linkedin.com/in/chetan-kumar25/",
  "- GitHub: https://github.com/chetank2",
];

async function main() {
  const caseStudies = await loadMachineCaseStudies();
  const caseStudiesWithContent = await Promise.all(
    caseStudies.map(async (caseStudy) => ({
      ...caseStudy,
      content: await loadMachineCaseStudyContent(caseStudy),
    }))
  );

  const baseDocument = serializeMachineCaseStudyCollection(caseStudiesWithContent).trimEnd();
  const resumeLines = experience.flatMap((exp) => [
    `### ${exp.role} — ${exp.company}`,
    `- Location: ${exp.location}`,
    `- Period: ${exp.period}`,
    ...exp.highlights.map((highlight) => `- ${highlight}`),
    "",
  ]);

  const document = [
    baseDocument,
    "",
    "Resume:",
    ...resumeLines,
    "Skills:",
    `- ${skills.join(", ")}`,
    "",
    "Tools:",
    `- ${tools.join(", ")}`,
    "",
    "Contact:",
    ...contactLines,
    "",
  ].join("\n");

  await fs.mkdir(new URL("../public", import.meta.url), { recursive: true });
  await fs.writeFile(outputPath, document, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
