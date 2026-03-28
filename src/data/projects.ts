import type { Project, Experience, Article } from "../types";

export const deepProjects: Project[] = [
  {
    slug: "journey-redesign",
    title: "My Journeys",
    tagline: "Designing a unified operational surface for tracking, decision-making, and closure",
    description:
      "Redesigned a broken table and lifecycle system into a unified operational surface that models journeys correctly and helps teams decide and act faster.",
    tags: ["System Design", "UX Redesign", "Freight Tiger"],
    type: "deep",
    caseStudyUrl: "/work/journey-redesign",
  },
  {
    slug: "control-tower",
    title: "Control Tower",
    tagline: "From visibility to exception orchestration",
    description:
      "Designed a Human–AI control tower that detects, prioritizes, and resolves operational issues — shifting logistics teams from reactive handling to guided action.",
    tags: ["Operations", "Logistics", "Decision Systems"],
    type: "deep",
    caseStudyUrl: "/work/control-tower",
  },
];

export const supportingProjects: Project[] = [
  {
    slug: "freight-invoicing",
    title: "Freight Invoicing & Reconciliation System",
    tagline: "Shifting billing validation before invoice creation",
    description:
      "Redesigned freight billing by introducing a pre-invoice reconciliation layer that reduced disputes, improved auditability, and made billing decisions clearer for logistics and finance teams.",
    tags: ["System Design", "B2B SaaS", "Freight Tiger"],
    type: "supporting",
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
    caseStudyUrl: "/work/ptl-module-design",
  },
  {
    slug: "ft-design-system",
    title: "FT Design System",
    tagline: "125+ components, AI protection, dual-mode docs",
    description:
      "Built a production design system from scratch as a solo builder — 125+ React components, token architecture, AI protection layer, and dual-audience documentation for humans and AI agents.",
    tags: ["Design System", "React", "AI Protection", "Freight Tiger"],
    type: "supporting",
    liveUrl: "https://ftdesignsystem.netlify.app",
    npmUrl: "https://www.npmjs.com/package/ft-design-system",
    caseStudyUrl: "/work/ft-design-system",
  },
];

export const aiProjects: Project[] = [
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
];

export const appProjects: Project[] = [
  {
    slug: "fitx",
    title: "Fit X",
    tagline: "Fitness app for motivation and tracking",
    image: "/assets/project-fitx.png",
    description: "A fitness app focused on user motivation, tracking, and engagement for healthier lifestyles.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/fitx",
  },
  {
    slug: "aftercrop",
    title: "Aftercrop",
    tagline: "Mobile-first warehouse operations",
    image: "/assets/project-aftercrop.png",
    description: "A mobile-first software solution designed to simplify warehouse operations. With a keen focus on design, adaptability, and user-friendliness.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/aftercrop",
  },
  {
    slug: "swiggy",
    title: "Swiggy",
    tagline: "Food delivery scheduling feature",
    image: "/assets/project-swiggy.svg",
    description: "A case study addressing the challenge of time constraints in food delivery by designing a scheduling feature and subscription model.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/swiggy",
  },
  {
    slug: "inflight",
    title: "Inflight",
    tagline: "In-flight dining mobile app",
    image: "/assets/project-inflight.svg",
    description: "A case study tackling the challenge of in-flight dining by designing a user-friendly mobile app for on-demand food orders.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/inflight",
  },
  {
    slug: "todo",
    title: "To Do",
    tagline: "App redesign case study",
    image: "/assets/project-todo.svg",
    description: "A journey to reimagine and redesign an existing app, enhancing its usability and aesthetics.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/todo",
  },
  {
    slug: "wewrk",
    title: "We Wrk",
    tagline: "Connecting artisans for home repairs",
    image: "/assets/project-wewrk.png",
    description: "Addressing the modern challenge of finding reliable artisans and facilitating home repairs through an innovative mobile application.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/wewrk",
  },
  {
    slug: "fromfarm",
    title: "From Farm",
    tagline: "Fresh produce from farmers",
    image: "/assets/project-fromfarm.png",
    description: "Designing 'From Farm,' an app revolutionizing the way we buy fresh produce directly from farmers.",
    tags: [],
    type: "app",
    caseStudyUrl: "/work/fromfarm",
  },
  {
    slug: "monastery",
    title: "Monastery",
    tagline: "Minimalist finance management",
    image: "/assets/project-monastery.png",
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
  },
];

export const experience: Experience[] = [
  {
    role: "Senior Product Designer",
    company: "Freight Tiger",
    location: "Bangalore",
    period: "Dec 2023 – Present",
    highlights: [
      "Revamped FTL tracking end-to-end. Platform scale: ~1.6L shipments/month.",
      "Tracking quality improved from 84% → 96–97%.",
      "Built Design System from scratch — tokens, components, Storybook, npm package.",
      "Designed full PTL flows, Control Tower, Gatekeeper app, and Planning module.",
    ],
  },
  {
    role: "Product Designer, Co-Founder",
    company: "Konic Technologies",
    location: "Hyderabad",
    period: "Jan 2021 – Dec 2023",
    highlights: [
      "Co-founded and designed AfterCrop (WMS) for small-medium warehouses.",
      "Mobile-first design supporting varied literacy and tech levels.",
      "Shipped working prototype with cloud SaaS access patterns.",
    ],
  },
  {
    role: "UX/UI Designer",
    company: "Versatile Mobitech",
    location: "Hyderabad",
    period: "Sep 2020 – Nov 2020",
    highlights: [
      "Led the design team. Collaborated with foreign clients from Dubai, Nigeria, and America.",
      "Designed QPL, Wrkman, and a warehouse management app.",
    ],
  },
  {
    role: "Freelance Designer",
    company: "Independent",
    location: "Hyderabad",
    period: "Aug 2017 – Dec 2020",
    highlights: [
      "Designed and launched Learn Hadiya web app.",
    ],
  },
];

export const skills = [
  "Design Systems",
  "System Design",
  "Interaction Design",
  "Prototyping",
  "Information Architecture",
  "Visual Design",
  "Product Thinking",
  "AI-Assisted Building",
  "Design-to-Code",
  "User Research",
];

export const tools = [
  "Figma",
  "Claude Code",
  "Cursor AI",
  "Codex",
  "Storybook",
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
