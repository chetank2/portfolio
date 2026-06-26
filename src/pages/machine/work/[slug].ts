import { loadMachineCaseStudyBySlug, loadMachineCaseStudyContent, loadMachineCaseStudySlugs, serializeMachineCaseStudy } from "../../../lib/machine/index.js";
import { portfolioMachineLinks } from "../../../data/projects";

export const prerender = true;

export async function getStaticPaths() {
  const slugs = await loadMachineCaseStudySlugs();

  return slugs.map((slug) => ({
    params: { slug },
  }));
}

export async function GET({ params }) {
  const slug = params?.slug;

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const caseStudy = await loadMachineCaseStudyBySlug(slug);

  if (!caseStudy) {
    return new Response("Not found", { status: 404 });
  }

  const content = await loadMachineCaseStudyContent(caseStudy);
  const siteHref = portfolioMachineLinks.siteHref.replace(/\/$/, "");

  return new Response(serializeMachineCaseStudy(caseStudy, content), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Link": `<${siteHref}/work/${caseStudy.slug}>; rel="canonical", <${siteHref}/llms.txt>; rel="alternate"; type="text/plain"`,
      "X-Robots-Tag": "index, follow",
    },
  });
}
