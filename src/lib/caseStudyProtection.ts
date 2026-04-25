export const SHARED_CASE_STUDY_PASSWORD = "chetan19";

export const PASSWORD_REQUEST_CHANNELS = {
  linkedin: {
    label: "LinkedIn",
    href: "https://linkedin.com/in/chetan-kumar25/",
  },
  x: {
    label: "X",
    href: "https://x.com/messages/compose",
    recipientId: "784100815891894272",
  },
  email: {
    label: "Email",
    href: "mailto:mymailchetan25@gmail.com",
  },
} as const;

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

export function buildPasswordRequestMessage(caseStudyTitle: string): string {
  return [
    "Hey Chetan,",
    "",
    `I'd like to view your protected case study: ${caseStudyTitle}.`,
    "Could you please share the password?",
  ].join("\n");
}

export function buildPasswordRequestEmailUrl(caseStudyTitle: string): string {
  const message = buildPasswordRequestMessage(caseStudyTitle);
  const subject = `Password request: ${caseStudyTitle}`;
  const emailHref = PASSWORD_REQUEST_CHANNELS.email.href;

  return `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export function buildPasswordRequestXUrl(caseStudyTitle: string): string {
  const message = buildPasswordRequestMessage(caseStudyTitle);
  const xChannel = PASSWORD_REQUEST_CHANNELS.x;
  const params = new URLSearchParams({
    recipient_id: xChannel.recipientId,
    text: message,
  });

  return `${xChannel.href}?${params.toString()}`;
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
