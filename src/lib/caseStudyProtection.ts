export const SHARED_CASE_STUDY_PASSWORD = "chetan19";

export const PROTECTED_CASE_STUDY_SLUGS = new Set([
  "journey-redesign",
  "control-tower",
  "freight-invoicing",
  "ptl-module-design",
  "tigersight",
]);

export function isProtectedCaseStudy(slug: string): boolean {
  return PROTECTED_CASE_STUDY_SLUGS.has(slug);
}
