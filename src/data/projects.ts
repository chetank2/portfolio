import type { Project, Experience, Article } from "../types";

export const deepProjects: Project[] = [
  {
    slug: "freight-invoicing",
    title: "Freight Invoicing & Reconciliation",
    tagline: "Fixing broken billing logic in logistics systems",
    description:
      "Redesigned the freight billing system by introducing a pre-invoice reconciliation layer. Split into three modules — Bills, Invoicing, and Disputes — with charge-level approval and ePOD-based validation.",
    tags: ["System Design", "B2B SaaS", "Freight Tiger"],
    type: "deep",
    caseStudyUrl: "/work/freight-invoicing",
  },
  {
    slug: "journey-redesign",
    title: "Journey Management Redesign",
    tagline: "Turning a data-heavy logistics screen into an actionable system",
    description:
      "Redesigned the journey tracking experience from a data dump into an action-first system. Defined clear journey lifecycle states and shifted from data-first to action-first design.",
    tags: ["UX Redesign", "Logistics", "Freight Tiger"],
    type: "deep",
    caseStudyUrl: "/work/journey-redesign",
  },
];

export const supportingProjects: Project[] = [
  {
    slug: "ft-design-system",
    title: "FT Design System",
    tagline: "80+ components, 300+ tokens, 3 themes",
    description:
      "Production-grade React component library built with Radix UI and Tailwind CSS. Includes 187 icons, 16 chart types, and AI-readable documentation.",
    tags: ["Design System", "React", "v4.21.0"],
    type: "supporting",
    liveUrl: "https://ftdesignsystem.netlify.app",
  },
  {
    slug: "gatekeeper",
    title: "Gatekeeper App",
    tagline: "Journey closure logic for plant operations",
    description:
      "Fixed incorrect journey closure by introducing stop-visit instances and event-based tracking with geofence and gate-in/gate-out methods.",
    tags: ["Mobile", "Logistics", "System Design"],
    type: "supporting",
  },
  {
    slug: "billing-flexibility",
    title: "Billing Flexibility",
    tagline: "Designing for real-world transporter behavior",
    description:
      "Designed dual billing flows for cycle-based and non-cycle transporters. System supports both without forcing user behavior into system constraints.",
    tags: ["B2B", "Billing", "System Design"],
    type: "supporting",
  },
];

export const aiProjects: Project[] = [
  {
    slug: "designqa",
    title: "DesignQA",
    tagline: "Figma-to-Web comparison tool",
    description:
      "Extracts design data from Figma and compares against live web implementations. Identifies deviations in colors, typography, spacing, and layout. Generates detailed HTML reports.",
    tags: ["Node.js", "Puppeteer", "MCP Protocol", "Electron"],
    type: "ai",
    liveUrl: "https://designqa-rho.vercel.app",
    repoUrl: "https://github.com/chetank2/designqa",
  },
  {
    slug: "coupontracker",
    title: "CouponTracker",
    tagline: "On-device ML coupon recognition system",
    description:
      "Full-stack coupon recognition with on-device LLM, YOLO detection, and smart OCR fallback chain. Includes training pipeline with MLflow and offline-first architecture.",
    tags: ["Kotlin", "Python", "YOLOv8", "On-device ML"],
    type: "ai",
    repoUrl: "https://github.com/chetank2/coupontracker",
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
  "Cursor AI",
  "Adobe XD",
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
