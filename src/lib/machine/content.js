import fs from "node:fs/promises";

import { resolveMachineRepoPath } from "./paths.js";

function stripFrontmatter(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function loadMachineCaseStudyContent(caseStudy) {
  if (typeof caseStudy.content === "string" && caseStudy.content.trim()) {
    return caseStudy.content.trim();
  }

  if (typeof caseStudy.contentFile === "string" && caseStudy.contentFile.trim()) {
    const filePath = resolveMachineRepoPath("content", caseStudy.contentFile);
    const content = await fs.readFile(filePath, "utf8");
    return stripFrontmatter(content);
  }

  throw new Error(`Missing machine content for case study: ${caseStudy.slug}`);
}
