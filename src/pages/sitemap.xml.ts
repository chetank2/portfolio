import { caseStudies } from "../data/caseStudies";
import { standaloneCaseStudies } from "../data/standaloneCaseStudies";
import {
  CASE_STUDY_PASSWORD_LOCK_ENABLED,
  isProtectedCaseStudy,
} from "../lib/caseStudyProtection";

export const prerender = true;

const SITE_URL = "https://chetank.vercel.app";

const staticRoutes = ["/", "/work", "/llms.txt", "/design.md"];

function isPublicCaseStudy(slug: string, protectedFlag?: boolean): boolean {
  if (!CASE_STUDY_PASSWORD_LOCK_ENABLED) return true;
  return !protectedFlag && !isProtectedCaseStudy(slug);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function uniqueRoutes(routes: string[]): string[] {
  return Array.from(new Set(routes));
}

function routeToUrl(route: string): string {
  return `${SITE_URL}${route === "/" ? "" : route}`;
}

export async function GET() {
  const markdownCaseStudyRoutes = caseStudies
    .filter((study) => isPublicCaseStudy(study.slug, study.protected))
    .map((study) => `/work/${study.slug}`);

  const standaloneCaseStudyRoutes = Object.values(standaloneCaseStudies)
    .filter((study) => isPublicCaseStudy(study.slug, study.protected))
    .map((study) => `/work/${study.slug}`);

  const humanCaseStudyRoutes = uniqueRoutes([
    ...markdownCaseStudyRoutes,
    ...standaloneCaseStudyRoutes,
  ]);

  const machineCaseStudyRoutes = humanCaseStudyRoutes.map((route) =>
    route.replace("/work/", "/machine/work/"),
  );

  const routes = uniqueRoutes([
    ...staticRoutes,
    ...humanCaseStudyRoutes,
    ...machineCaseStudyRoutes,
  ]);

  const urls = routes
    .map((route) => `  <url><loc>${escapeXml(routeToUrl(route))}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}
