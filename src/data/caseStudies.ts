export interface CaseStudyPage {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  company: string;
  timeline: string;
  backHref: string;
  contentFile: string;
}

export const caseStudies: CaseStudyPage[] = [
  {
    slug: "designqa",
    title: "Design QA",
    tagline: "Turning visual review into a measurable design-to-code quality system",
    role: "Builder / Product Designer",
    company: "Independent",
    timeline: "2025 - 2026",
    backHref: "/#ai",
    contentFile: "case-study-designqa.md",
  },
  {
    slug: "coupontracker",
    title: "CouponTracker",
    tagline: "From screenshot scraping to a coupon recognition platform",
    role: "Builder / Product Designer",
    company: "Independent",
    timeline: "2025 - 2026",
    backHref: "/#ai",
    contentFile: "case-study-coupontracker.md",
  },
  {
    slug: "component-first-design",
    title: "Component-first Design Concept",
    tagline: "Making implemented UI explorable like design",
    role: "Product Designer",
    company: "Independent Concept",
    timeline: "2026",
    backHref: "/#ai",
    contentFile: "case-study-component-first-design.md",
  },
  {
    slug: "control-tower",
    title: "Control Tower",
    tagline: "Designing a Human–AI control tower for logistics operations",
    role: "Senior Product Designer",
    company: "Freight Tiger",
    timeline: "2024 - 2025",
    backHref: "/#work",
    contentFile: "case-study-control-tower.md",
  },
{
    slug: "ptl-module-design",
    title: "PTL Module Design",
    tagline: "Designing for fragmented shipments instead of forcing FTL assumptions",
    role: "Senior Product Designer",
    company: "Freight Tiger",
    timeline: "2024 - 2025",
    backHref: "/#work",
    contentFile: "case-study-ptl-module.md",
  },
  {
    slug: "ft-design-system",
    title: "FT Design System",
    tagline: "Building a production design system that scales with both humans and AI",
    role: "Senior Product Designer",
    company: "Freight Tiger",
    timeline: "2024 - 2025",
    backHref: "/#work",
    contentFile: "case-study-ft-design-system.md",
  },
];
