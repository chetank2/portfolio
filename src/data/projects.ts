import type { Project, Experience, Article } from "../types";

export interface ProjectLink {
  title: string;
  description: string;
  href: string;
}

export const portfolioMachineLinks = {
  siteHref: "https://portfolio-seven-ivory-74.vercel.app",
  resumeHref: "https://drive.google.com/file/d/1KQSSWbCDAwvKiQgXSI1ssj7m3p-vtZmD/view",
  emailHref: "mailto:mymailchetan25@gmail.com",
  xHref: "https://x.com/kchetank19",
  linkedInHref: "https://linkedin.com/in/chetan-kumar25/",
};

export const deepProjects: Project[] = [
  {
    slug: "ft-tms-redesign",
    title: "Redesigning Freight Tiger's TMS",
    tagline: "From a broken trip list to an operational system that changed how users work",
    description:
      "Designed TigerSight (awareness) and My Journeys (execution) as one connected system — fixing broken architecture, changing user behavior, and influencing how the backend was built.",
    tags: ["System Design", "Architecture", "UX Redesign", "Freight Tiger"],
    type: "deep",
    protected: true,
    cardImageLight: "/assets/home/journeys-light.png",
    cardImageDark: "/assets/home/journeys-dark.png",
    caseStudyUrl: "/work/ft-tms-redesign",
  },
  {
    slug: "control-tower",
    title: "Control Tower",
    tagline: "From visibility to exception orchestration",
    description:
      "Designed a Human–AI control tower that detects, prioritizes, and resolves operational issues — shifting logistics teams from reactive handling to guided action.",
    tags: ["Operations", "Logistics", "Decision Systems"],
    type: "deep",
    protected: true,
    cardImageLight: "/assets/home/control-tower-light.png",
    cardImageDark: "/assets/home/control-tower-dark.png",
    caseStudyUrl: "/work/control-tower",
  },
  {
    slug: "ft-design-system",
    title: "FT Design System",
    tagline: "125+ components, AI protection, dual-mode docs",
    description:
      "Built a production design system from scratch as a solo builder — 125+ React components, token architecture, AI protection layer, and dual-audience documentation for humans and AI agents.",
    tags: ["Design System", "React", "AI Protection", "Freight Tiger"],
    type: "deep",
    cardImageLight: "/assets/home/ft-design-system-light.png",
    cardImageDark: "/assets/home/ft-design-system-dark.png",
    liveUrl: "https://ftdesignsystem.netlify.app",
    npmUrl: "https://www.npmjs.com/package/ft-design-system",
    caseStudyUrl: "/work/ft-design-system",
  },
  {
    slug: "aftercrop",
    title: "Aftercrop",
    tagline: "Mobile-first warehouse operations",
    description:
      "A mobile-first software solution designed to simplify warehouse operations. With a keen focus on design, adaptability, and user-friendliness.",
    tags: ["Mobile App", "Warehouse Ops", "UX Design"],
    type: "deep",
    cardImageLight: "/assets/aftercrop/hero.avif",
    cardImageDark: "/assets/aftercrop/hero.avif",
    caseStudyUrl: "/work/aftercrop",
  },
];

export const supportingProjects: Project[] = [
  {
    slug: "tigersight",
    title: "TigerSight",
    tagline: "AI-powered logistics control tower for real-time operations",
    description:
      "Designed an AI-powered control tower that turns fragmented transport signals into live operational awareness, exception triage, network intelligence, and AI-assisted decision support.",
    tags: ["Control Tower", "AI", "Operations Design"],
    type: "supporting",
    protected: true,
    caseStudyUrl: "/work/tigersight",
  },
  {
    slug: "freight-invoicing",
    title: "Freight Invoicing & Reconciliation System",
    tagline: "Shifting billing validation before invoice creation",
    description:
      "Redesigned freight billing by introducing a pre-invoice reconciliation layer that reduced disputes, improved auditability, and made billing decisions clearer for logistics and finance teams.",
    tags: ["System Design", "B2B SaaS", "Freight Tiger"],
    type: "supporting",
    protected: true,
    caseStudyUrl: "/work/freight-invoicing",
  },
  {
    slug: "ptl-module-design",
    title: "PTL Module Design",
    tagline: "Designing for fragmented shipments",
    description:
      "Created a PTL workflow for grouped shipments, split deliveries, and multi-point coordination without forcing FTL assumptions.",
    tags: ["PTL", "Logistics", "Workflow Design"],
    type: "supporting",
    protected: true,
    caseStudyUrl: "/work/ptl-module-design",
  },
];

export const aiProjects: Project[] = [
  {
    slug: "coupontracker",
    title: "CouponTracker",
    tagline: "From screenshots to a full recognition platform",
    description:
      "Built a multi-surface coupon recognition system — Android app with layered AI extraction, web-based ML training pipeline, offline PWA annotation, and automated model deployment.",
    tags: ["Kotlin", "Python", "YOLOv8", "On-device ML", "PWA"],
    type: "ai",
    repoUrl: "https://github.com/chetank2/coupontracker",
    caseStudyUrl: "/work/coupontracker",
  },
  {
    slug: "designqa",
    title: "Design QA",
    tagline: "Automating design-to-code checks across projects",
    description:
      "Built a cross-platform tool that compares Figma designs against live production pages and exports discrepancies as trackable issues — because pixel-checking manually across multiple projects doesn't scale.",
    tags: ["Electron", "Cross-platform", "Figma MCP", "AI-built"],
    type: "ai",
    liveUrl: "https://designqa-rho.vercel.app",
    repoUrl: "https://github.com/chetank2/designqa",
    caseStudyUrl: "/work/designqa",
  },
  {
    slug: "component-first-design",
    title: "Component-first Design Concept",
    tagline: "Edit component variants visually, generate code changes",
    description:
      "A VS Code extension prototype that scans a codebase, shows all component variants on a canvas, and lets you edit them with Figma-like tools — generating prompts for AI tools to make the code changes.",
    tags: ["VS Code Extension", "Prototype", "Design-to-Code"],
    type: "ai",
    caseStudyUrl: "/work/component-first-design",
  },
];

export const appProjects: Project[] = [
  {
    slug: "fitx",
    title: "Fit X",
    tagline: "Fitness app for motivation and tracking",
    image: "/assets/app-case-studies/fitx.png",
    description: "A fitness app focused on user motivation, tracking, and engagement for healthier lifestyles.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/fitx",
  },
  {
    slug: "swiggy",
    title: "Swiggy",
    tagline: "Food delivery scheduling feature",
    image: "/assets/app-case-studies/swiggy.svg",
    description: "A case study addressing the challenge of time constraints in food delivery by designing a scheduling feature and subscription model.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/swiggy",
  },
  {
    slug: "inflight",
    title: "Inflight",
    tagline: "In-flight dining mobile app",
    image: "/assets/app-case-studies/inflight.svg",
    description: "A case study tackling the challenge of in-flight dining by designing a user-friendly mobile app for on-demand food orders.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/inflight",
  },
  {
    slug: "todo",
    title: "To Do",
    tagline: "App redesign case study",
    image: "/assets/app-case-studies/todo.png",
    description: "A journey to reimagine and redesign an existing app, enhancing its usability and aesthetics.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/todo",
  },
  {
    slug: "wewrk",
    title: "We Wrk",
    tagline: "Connecting artisans for home repairs",
    image: "/assets/app-case-studies/wewrk.png",
    description: "Addressing the modern challenge of finding reliable artisans and facilitating home repairs through an innovative mobile application.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/wewrk",
  },
  {
    slug: "fromfarm",
    title: "From Farm",
    tagline: "Fresh produce from farmers",
    image: "/assets/app-case-studies/from-farm.png",
    description: "Designing 'From Farm,' an app revolutionizing the way we buy fresh produce directly from farmers.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/fromfarm",
  },
  {
    slug: "monastery",
    title: "Monastery",
    tagline: "Minimalist finance management",
    image: "/assets/app-case-studies/monastery.png",
    description: "A minimalist finance management app for effortless expense tracking and management.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/monastery",
  },
];

export const websiteProjects: Project[] = [
  {
    slug: "learn-hadiya",
    title: "Learn Hadiya",
    tagline: "Language learning web app",
    description:
      "User-friendly web app for foreigners to learn the Hadiya language in Ethiopia.",
    image: "/assets/project-learnhadiya.jpg",
    tags: [],
    type: "website",
    liveUrl: "https://www.learnhadiya.com/",
  },
  {
    slug: "aftercrop-microsite",
    title: "Aftercrop",
    tagline: "SaaS warehouse management microsite",
    description:
      "Microsite for SaaS-based cold storage and warehouse operations management.",
    image: "/assets/project-aftercrop-microsite.png",
    tags: [],
    type: "website",
    liveUrl: "https://aftercrop.in/",
  },
  {
    slug: "konic",
    title: "Konic",
    tagline: "Enterprise tech company microsite",
    description:
      "Microsite for Konic Technologies enterprise applications.",
    image: "/assets/project-konic.png",
    tags: [],
    type: "website",
    liveUrl: "https://www.konic.net/en/",
  },
];

export const experience: Experience[] = [
  {
    role: "Senior Product Designer",
    company: "Freight Tiger",
    location: "Bangalore",
    period: "Dec 2023 – Present",
    highlights: [
      "Revamped FTL tracking end-to-end, from Add Journey to live tracking, making the flow simpler and faster to use.",
      "Handled platform scale of roughly 1.6 lakh shipments per month, with around 1.5 lakh tracked monthly.",
      "Improved tracking quality from 84% to about 96–97%.",
      "Designed TigerSight as the operational awareness and control-tower layer for live monitoring, exception handling, and network intelligence.",
      "Designed Freight Invoicing flows to make logistics billing, reconciliation, and operational handoff clearer and more usable.",
      "Designed full PTL flows including order creation, tracking, ePOD, invoicing, reconciliation, dispute management, and courier recommendation.",
      "Built the Planning module for dispatch and capacity planning.",
      "Created a design system from scratch with tokens, components, states, Storybook, and an npm package.",
      "Designed Control Tower for FTL exceptions with alert rules, issue cards, triage views, and audit trail.",
      "Designed the Gatekeeper app for tracking FTL vehicles inside plants.",
      "Built hackathon demos across planning to invoicing, including a dispatch planning POC for non-cuboidal and liquid cargo.",
      "Designed for enterprise users across TML warehouses, JSW and Dalmia plants, Asian Paints warehouses, and Zepto dark stores.",
    ],
  },
  {
    role: "Product Designer, Co-Founder",
    company: "Konic Technologies",
    location: "Hyderabad",
    period: "Jan 2021 – Dec 2023",
    highlights: [
      "Co-founded and designed AfterCrop, a mobile-first WMS for small and medium warehouses.",
      "Researched market gaps and aimed for off-the-shelf flows with easy onboarding.",
      "Built simple card and list UI with power features for operations and clear owner summaries.",
      "Focused on low-disruption workflows and portability for users with varied literacy and tech levels.",
      "Shipped a working prototype and defined data security and cloud SaaS access patterns.",
    ],
  },
  {
    role: "UX/UI Designer",
    company: "Versatile Mobitech Pvt Ltd Technologies",
    location: "Hyderabad",
    period: "Sep 2020 – Nov 2020",
    highlights: [
      "Collaborated with stakeholders and developers to redesign Android apps and websites.",
      "Led the design team and recruited and managed a junior designer.",
      "Worked with clients from Dubai, Nigeria, and the United States.",
      "Designed the QPL mobile cricket quiz app, Wrkman, and a warehouse management app for an apparel chain in the US.",
    ],
  },
  {
    role: "UX/UI Designer",
    company: "Freelance Designer",
    location: "Hyderabad",
    period: "Aug 2017 – Dec 2020",
    highlights: [
      "Worked as a product designer for the Learn Hadiya project.",
      "Developed and launched the web app in collaboration with a developer and stakeholders.",
    ],
  },
  {
    role: "UI Designer",
    company: "Avantari Medical Technologies",
    location: "Hyderabad",
    period: "Mar 2017 – Jul 2017",
    highlights: [
      "Designed mobile apps, logos, and 3D product mockups.",
      "Created a Blender-based animation advert and storyboarded an advertisement.",
    ],
  },
];

export const skills = [
  "User Research",
  "Design Systems",
  "Prototyping",
  "Visual Design",
  "Interaction Design",
  "Information Architecture",
  "User Testing",
  "Design Thinking",
  "Wireframing",
  "User Flows",
];

export const tools = [
  "Figma",
  "Claude",
  "Codex",
  "Cursor AI",
  "Adobe Illustrator",
  "Adobe After Effects",
];

export const article: Article = {
  title: "Tables Aren't the Problem. Your Mental Model of Tables Is.",
  date: "February 2026",
  categories: ["UX", "Product Design", "Design Systems"],
  summary:
    "Examines table design in complex logistics products. A complete redesign of data tables across six logistics products with a five-part design framework.",
  url: "https://medium.com/@chetank19/designing-tables-in-complex-logistics-products-fa003ebaca56",
};

const allProjects: Project[] = [
  ...deepProjects,
  ...supportingProjects,
  ...aiProjects,
  ...appProjects,
  ...websiteProjects,
];

export function findProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function getProjectLinksBySlug(slug: string): ProjectLink[] {
  const project = findProjectBySlug(slug);

  if (!project) {
    return [];
  }

  const links: ProjectLink[] = [];

  if (project.liveUrl) {
    links.push({
      title: "Live Product",
      description: "Open the shipped product or live demo.",
      href: project.liveUrl,
    });
  }

  if (project.repoUrl) {
    links.push({
      title: "GitHub Repository",
      description: "View the project code and build details.",
      href: project.repoUrl,
    });
  }

  if (project.npmUrl) {
    links.push({
      title: "npm Package",
      description: "Browse the published package and install details.",
      href: project.npmUrl,
    });
  }

  return links;
}
