export interface CaseStudyPage {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  company: string;
  timeline: string;
  backHref: string;
  contentFile: string;
  protected?: boolean;
}

export const caseStudies: CaseStudyPage[] = [
  {
    slug: "designqa",
    title: "Design QA",
    tagline: "Automating the pixel-level checks I didn't have time to do manually",
    role: "Designer & Builder",
    company: "Independent",
    timeline: "2025 - 2026",
    backHref: "/#ai",
    contentFile: "case-study-designqa.md",
  },
  {
    slug: "coupontracker",
    title: "CouponTracker",
    tagline: "From screenshot scraping to a multi-surface coupon recognition platform",
    role: "Builder / Product Designer",
    company: "Independent",
    timeline: "2025 - 2026",
    backHref: "/#ai",
    contentFile: "case-study-coupontracker.md",
  },
  {
    slug: "component-first-design",
    title: "Component-first Design Concept",
    tagline: "Making all component variants visible and editable from code",
    role: "Designer & Builder",
    company: "Independent (Prototype)",
    timeline: "2026",
    backHref: "/#ai",
    contentFile: "case-study-component-first-design.md",
  },
  {
    slug: "ft-tms-redesign",
    title: "Redesigning Freight Tiger's TMS",
    tagline: "From a broken trip list to TigerSight + My Journeys — awareness and execution redesigned together",
    role: "Senior Product Designer",
    company: "Freight Tiger",
    timeline: "2024 - 2026",
    backHref: "/#work",
    contentFile: "case-study-ft-tms-redesign.md",
    protected: true,
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
    protected: true,
  },
  {
    slug: "tigersight",
    title: "TigerSight",
    tagline: "Designing an AI-powered logistics control tower for real-time operations",
    role: "Senior Product Designer",
    company: "Freight Tiger",
    timeline: "2025 - 2026",
    backHref: "/#work",
    contentFile: "case-study-tigersight.md",
    protected: true,
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
    protected: true,
  },
  {
    slug: "ft-design-system",
    title: "FT Design System",
    tagline: "Building a 125+ component design system with AI as a force multiplier",
    role: "Design System Architect & Sole Developer",
    company: "Freight Tiger",
    timeline: "2025 - 2026",
    backHref: "/#work",
    contentFile: "case-study-ft-design-system.md",
  },
];
