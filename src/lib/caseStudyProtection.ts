export const SHARED_CASE_STUDY_PASSWORD = "chetan19";

export const PROTECTED_CASE_STUDY_SLUGS = new Set([
  "journey-redesign",
  "control-tower",
  "freight-invoicing",
  "ptl-module-design",
  "tigersight",
  "ft-tms-redesign",
]);

export function isProtectedCaseStudy(slug: string): boolean {
  return PROTECTED_CASE_STUDY_SLUGS.has(slug);
}

/**
 * Build-time secret check. When `INCLUDE_PROTECTED_CONTENT=true` is set in the
 * build environment, protected case study markup, assets, and machine text are
 * rendered into the static output. Otherwise protected content is fully
 * stripped at build time so nothing NDA-sensitive reaches the deployed HTML.
 *
 * This is an intentional design: Vercel production builds default to false,
 * local/private builds can set it true to preview the full content.
 */
export function canRevealProtectedContent(): boolean {
  if (typeof process === "undefined") return false;
  return process.env?.INCLUDE_PROTECTED_CONTENT === "true";
}

/**
 * Convenience: true when the given slug's full content should be rendered into
 * the static output.
 */
export function shouldRenderProtectedBody(slug: string): boolean {
  return !isProtectedCaseStudy(slug) || canRevealProtectedContent();
}
