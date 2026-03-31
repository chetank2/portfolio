export interface StandaloneMetaItem {
  label: string;
  value: string;
}

export interface StandaloneImageMedia {
  src: string;
  alt: string;
  className?: string;
}

export interface StandaloneGalleryImage {
  src: string;
  title: string;
  description: string;
  cardClass?: string;
  imageClass?: string;
}

export interface StandaloneCardLink {
  title: string;
  description: string;
  href: string;
}

export interface StandaloneListItem {
  title?: string;
  text: string;
}

export interface StandaloneSubsection {
  title: string;
  paragraphs?: string[];
  chips?: string[];
  bullets?: Array<string | StandaloneListItem>;
  ordered?: boolean;
}

export type StandaloneContentBlock =
  | { type: "paragraphs"; paragraphs: string[] }
  | { type: "quote"; text: string }
  | { type: "bullets"; items: Array<string | StandaloneListItem>; ordered?: boolean }
  | { type: "chips"; rows: string[][] }
  | { type: "subsections"; items: StandaloneSubsection[] }
  | { type: "cards"; items: StandaloneCardLink[] }
  | { type: "gallery"; images: StandaloneGalleryImage[] };

export interface StandaloneCaseStudySection {
  title: string;
  blocks: StandaloneContentBlock[];
}

export interface StandaloneCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  backHref: string;
  protected?: boolean;
  meta: StandaloneMetaItem[];
  media?: StandaloneImageMedia;
  sections: StandaloneCaseStudySection[];
}

const paragraphs = (...items: string[]): StandaloneContentBlock => ({
  type: "paragraphs",
  paragraphs: items,
});

const quote = (text: string): StandaloneContentBlock => ({
  type: "quote",
  text,
});

const bullets = (
  items: Array<string | StandaloneListItem>,
  ordered = false,
): StandaloneContentBlock => ({
  type: "bullets",
  items,
  ordered,
});

const chips = (...rows: string[][]): StandaloneContentBlock => ({
  type: "chips",
  rows,
});

const subsections = (...items: StandaloneSubsection[]): StandaloneContentBlock => ({
  type: "subsections",
  items,
});

const cards = (...items: StandaloneCardLink[]): StandaloneContentBlock => ({
  type: "cards",
  items,
});

const gallery = (...images: StandaloneGalleryImage[]): StandaloneContentBlock => ({
  type: "gallery",
  images,
});

const mediaImage = (src: string, alt: string, className?: string): StandaloneImageMedia => ({
  src,
  alt,
  className,
});

function formatBulletItem(item: string | StandaloneListItem, ordered: boolean, index: number): string {
  const prefix = ordered ? `${index + 1}. ` : "- ";

  if (typeof item === "string") {
    return `${prefix}${item}`;
  }

  if (item.title) {
    return `${prefix}${item.title} - ${item.text}`;
  }

  return `${prefix}${item.text}`;
}

function serializeBlock(block: StandaloneContentBlock): string[] {
  switch (block.type) {
    case "paragraphs":
      return block.paragraphs.flatMap((paragraph) => [paragraph, ""]);
    case "quote":
      return [`> ${block.text}`, ""];
    case "bullets":
      return [
        ...block.items.map((item, index) => formatBulletItem(item, block.ordered ?? false, index)),
        "",
      ];
    case "chips":
      return [
        ...block.rows.map((row) => `- ${row.join(" -> ")}`),
        "",
      ];
    case "subsections":
      return block.items.flatMap((item) => [
        `### ${item.title}`,
        "",
        ...(item.paragraphs ?? []).flatMap((paragraph) => [paragraph, ""]),
        ...(item.chips ? [`- ${item.chips.join(" -> ")}`, ""] : []),
        ...(item.bullets
          ? item.bullets.map((bullet, index) => formatBulletItem(bullet, item.ordered ?? false, index)).concat("")
          : []),
      ]);
    case "cards":
      return [
        ...block.items.map((item) => `- [${item.title}](${item.href})${item.description ? ` — ${item.description}` : ""}`),
        "",
      ];
    case "gallery":
      return [
        ...block.images.map((image) => `- ${image.title}: ${image.description}`),
        "",
      ];
  }
}

function serializeStudy(study: StandaloneCaseStudy): string {
  const lines = [
    `# ${study.title}`,
    study.tagline ? `> ${study.tagline}` : null,
    "",
    ...study.meta.map((meta) => `- ${meta.label}: ${meta.value}`),
    study.meta.length ? "" : null,
  ];

  for (const section of study.sections) {
    lines.push(`## ${section.title}`, "");
    for (const block of section.blocks) {
      lines.push(...serializeBlock(block));
    }
  }

  return lines
    .filter((line) => line !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const standaloneCaseStudies: Record<string, StandaloneCaseStudy> = {
  "journey-redesign": {
    slug: "journey-redesign",
    title: "My Journeys",
    tagline: "Designing a unified operational surface for tracking, decision-making, and closure",
    backHref: "/#work",
    protected: true,
    meta: [
      { label: "Role", value: "Senior Product Designer" },
      { label: "Company", value: "Freight Tiger" },
      { label: "Timeline", value: "2024" },
    ],
    sections: [
      {
        title: "TL;DR",
        blocks: [
          paragraphs(
            "I redesigned My Journeys from a broken table and unreliable lifecycle system into a unified operational surface that models journeys correctly, supports real-world ambiguity, and helps operations teams decide and act faster.",
          ),
        ],
      },
      {
        title: "Overview",
        blocks: [
          paragraphs(
            "My Journeys was one of the most heavily used parts of the product. It was where operations teams tracked active movements, identified issues, and managed execution. Over time, it had degraded into a mix of a table, a dashboard, and a partially broken lifecycle system.",
            "The problem was not just UI clutter. The underlying model of journeys was flawed, and the interface reflected that confusion. I treated this as a system redesign, not a table redesign, and rebuilt both the lifecycle logic and the decision surface together.",
          ),
        ],
      },
      {
        title: "Product Gallery",
        blocks: [
          paragraphs(
            "Developed screens from My Journeys showing the final operational flow from the main in-transit surface into map context, journey details, and loads management.",
          ),
          gallery(
            {
              src: "/assets/my-journeys/in-transit.png",
              title: "In Transit",
              description: "The primary operational surface for understanding live journey state, blockers, and next actions.",
              cardClass: "md:col-span-2",
              imageClass: "h-64 sm:h-72 md:h-80",
            },
            {
              src: "/assets/my-journeys/map-view.png",
              title: "Map View",
              description: "A spatial layer from the in-transit experience for understanding route context and operational status visually.",
              cardClass: "md:col-span-1",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/my-journeys/in-transit-alt.png",
              title: "Journey Details",
              description: "The actual journey details page, combining map context, timeline signals, and operational status in one view.",
              cardClass: "md:col-span-1",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/my-journeys/loads.png",
              title: "Loads",
              description: "The loads surface for scanning active movements, spotting exceptions, and switching into the right operational context.",
              cardClass: "md:col-span-2",
              imageClass: "h-60 sm:h-64 md:h-72",
            },
            {
              src: "/assets/my-journeys/in-transit-summary.png",
              title: "Journey Summary",
              description: "A condensed status layer for reading progress, key state changes, and closure-related signals at a glance.",
              cardClass: "md:col-span-1",
              imageClass: "h-52 sm:h-56 md:h-64",
            },
            {
              src: "/assets/my-journeys/loads-alt.png",
              title: "Loads Alternate State",
              description: "Another loads state demonstrating the same hierarchy and actionability at operational scale.",
              cardClass: "md:col-span-1",
              imageClass: "h-52 sm:h-56 md:h-64",
            },
          ),
        ],
      },
      {
        title: "What Made This Hard",
        blocks: [
          paragraphs(
            "Two layers were broken at the same time.",
            "At the system level, the journey lifecycle was incorrectly modeled. It assumed linear movement and clean closure, while real operations involved reuse, repeated stops, missing data, and ambiguity.",
            "At the interface level, the table had become overloaded with information. It exposed everything but helped with nothing. Fixing only the UI would not solve the problem. Fixing only the lifecycle would not make the product usable. Both had to be redesigned together.",
          ),
        ],
      },
      {
        title: "Problem",
        blocks: [
          paragraphs(
            "The lifecycle system treated journeys as linear flows that started and ended cleanly. In reality, routes were reused, stops repeated, and signals arrived inconsistently. This led to overwritten data, incorrect closure states, and unreliable journey tracking.",
            "The table interface had accumulated too many columns, statuses, and visual elements. Everything competed for attention. It was slow to scan, hard to prioritize, and not usable under operational pressure. Together, these issues created a system where users had to manually reconstruct reality from unreliable data and noisy interfaces.",
          ),
        ],
      },
      {
        title: "Context",
        blocks: [
          paragraphs(
            "Operations teams used this screen to manage large numbers of active journeys in real time. Their goal was not to read detailed rows. Their goal was to quickly identify what was going wrong and decide what to do next.",
            "Data came from multiple sources including GPS pings, geofence events, and manual updates. Real-world patterns such as route reuse and repeated locations exposed the limitations of a system that assumed each stop occurred only once.",
          ),
        ],
      },
      {
        title: "Reframing the Problem",
        blocks: [
          paragraphs("I reframed My Journeys from a data table into an operational decision system. The key shift was moving from showing journey data to:"),
          bullets([
            "Helping users understand journey state",
            "Helping users identify risk",
            "Helping users decide what action to take",
          ]),
          paragraphs("This required fixing both the underlying model and the way it was presented."),
        ],
      },
      {
        title: "System Redesign: Lifecycle Model",
        blocks: [
          paragraphs(
            "The first step was correcting how journeys were modeled. I moved away from treating journeys as simple sequences of stops and instead introduced a state-driven model.",
            "A critical concept was separating a stop from a visit. The same physical location could appear multiple times in a journey, but each occurrence needed to be tracked as a separate visit. This allowed patterns like A → B → A to be handled without corrupting data.",
            "Instead of overwriting journey state, I leaned toward preserving event history. Each signal contributed to an evolving state rather than replacing previous information.",
            "Closure was redesigned to be event-driven. A journey did not close because a user followed a fixed flow. It closed when the correct combination of events occurred.",
          ),
        ],
      },
      {
        title: "Interface Redesign: Table as Decision Surface",
        blocks: [
          paragraphs(
            "Once the model was corrected, I redesigned the table to reflect how users actually think. The table was no longer treated as a container of columns. It was treated as a surface for decision-making.",
            "I reorganized information around intent. Status, exceptions, and action-relevant signals were prioritized. Secondary information was reduced or removed. Hierarchy became the main tool — important states stood out clearly while non-critical information moved into the background.",
          ),
        ],
      },
      {
        title: "Edge Cases Handled",
        blocks: [paragraphs("The redesign accounted for route reuse such as A → B → A, missing or delayed tracking signals, manual overrides, ambiguous states, and large datasets with multiple filters applied simultaneously.")],
      },
      {
        title: "Key Design Decisions",
        blocks: [
          bullets(
            [
              "Treated the table as a decision surface rather than a data grid",
              "Grouped information by operational intent instead of letting columns compete equally",
              "Removed visual noise aggressively — many accumulated elements were not helping decision-making",
              "Aligned the interface with the lifecycle model so the UI reflected corrected system state",
            ],
          ),
        ],
      },
      {
        title: "Outcome",
        blocks: [
          paragraphs(
            "The result was a system where users could trust what they saw and act on it quickly.",
            "Journey tracking became more accurate because the lifecycle model reflected real-world behavior. Closure became more reliable because it was tied to events rather than assumptions. The interface became easier to scan because it emphasized what mattered.",
          ),
        ],
      },
      {
        title: "Why This Project Matters",
        blocks: [
          paragraphs(
            "This project represents how I approach complex product problems. I do not treat UI issues in isolation. I look at the underlying system, fix the model, and then design the interface to reflect that model. My Journeys is not just a table redesign. It is a case study in turning a broken operational surface into a reliable decision system.",
          ),
        ],
      },
      {
        title: "Learnings",
        blocks: [
          bullets([
            "Operational products break when their internal models do not match reality. Fixing the model often has more impact than adding features.",
            "Interfaces should reflect how decisions are made, not how data is stored.",
            "Simplicity in UI often comes from deeper complexity in system design, not from removing features blindly.",
          ]),
        ],
      },
    ],
  },
  "freight-invoicing": {
    slug: "freight-invoicing",
    title: "Freight Invoicing & Reconciliation System",
    tagline: "Shifting billing validation before invoice creation",
    backHref: "/#work",
    protected: true,
    meta: [
      { label: "Role", value: "Senior Product Designer" },
      { label: "Company", value: "Freight Tiger" },
      { label: "Timeline", value: "2024" },
    ],
    sections: [
      {
        title: "Overview",
        blocks: [
          paragraphs(
            "Freight billing in logistics usually looks like a finance workflow on the surface, but the real problem sits deeper in the operational model. In the existing flow, invoices were often generated first and validated later. That meant the system treated invoicing as the start of truth instead of the outcome of validation.",
            "This caused a predictable cycle: invoice generation, mismatch discovery, dispute creation, manual correction, delay, and frustration. My role was to redesign that workflow so billing became more reliable, operationally grounded, and easier to trust.",
          ),
        ],
      },
      {
        title: "What Made This Hard",
        blocks: [
          paragraphs(
            "This was not a simple invoicing UI problem. The complexity came from the fact that billing relied on multiple upstream inputs that were not always synchronized or equally reliable. Rate cards, vehicle types, route data, additional charges, and ePOD status all influenced whether a bill was actually correct.",
            "The hard part was designing a system that supported real-world exceptions without making the workflow so flexible that it became financially unsafe.",
          ),
        ],
      },
      {
        title: "Problem",
        blocks: [
          paragraphs("The earlier flow generated invoices before teams had a chance to validate the underlying freight logic. As a result:"),
          bullets([
            "Invoices became the place where problems were discovered",
            "Finance and operations were forced into reactive correction loops",
            "Disputes increased because the system had no trusted pre-check stage",
            "Users had to reverse-engineer why a number was wrong instead of reviewing it before the document existed",
          ]),
          paragraphs("From a product perspective, the system was encouraging users to make errors expensive."),
        ],
      },
      {
        title: "Users and Their Needs",
        blocks: [
          bullets([
            {
              title: "Operations teams",
              text: "Needed clarity on whether a journey was financially ready for billing and where mismatches existed",
            },
            {
              title: "Finance teams",
              text: "Needed a workflow that reduced downstream disputes and produced a more defensible invoice trail",
            },
            {
              title: "Transport partners",
              text: "Needed transparency into what was accepted, under review, and being challenged",
            },
          ]),
        ],
      },
      {
        title: "Approach",
        blocks: [
          paragraphs(
            "I started by mapping the current billing lifecycle end to end. Rather than focusing only on screens, I focused on where truth was established, where ambiguity entered the process, and where users were forced into reactive behavior.",
            "The design direction became clear: billing needed a reconciliation stage before invoice creation.",
          ),
          quote("An invoice should be the output of agreement, not the place where disagreement begins."),
          paragraphs(
            "That meant the product needed to separate these moments: operational completion, commercial validation, invoice generation, and dispute adjustment if exceptions still remained.",
          ),
        ],
      },
      {
        title: "Key Decisions",
        blocks: [
          subsections(
            {
              title: "1. Move validation before invoice generation",
              paragraphs: [
                "Instead of allowing invoice creation to happen first, I introduced a structured review layer where charges and billing conditions could be validated before formal billing documents were generated. This reduced the cost of mistakes, shifted the workflow from reactive to preventive, and gave users a clear stage for agreement.",
              ],
            },
            {
              title: "2. Review at the charge level, not only the invoice level",
              paragraphs: [
                "Users did not reason about billing as abstract invoice lines. They reasoned in terms of freight charges, accessorials, and specific financial components. The system needed to surface validation at the level users actually understood — aligning the product model with user mental models and making partial disagreements easier to handle.",
              ],
            },
            {
              title: "3. Support controlled reversals",
              paragraphs: [
                "Many enterprise systems become fragile because they assume upstream events are permanent. In reality, delivery confirmation and supporting documents can change, be corrected, or be challenged. Supporting controlled reversals preserved operational realism and prevented brittle logic.",
              ],
            },
            {
              title: "4. Preserve traceability",
              paragraphs: [
                "Any financial correction needed a clear trail. Even when the system supported exceptions, it had to do so without collapsing trust. This made decisions defensible, reduced ambiguity between teams, and created a stronger basis for accountability.",
              ],
            },
          ),
        ],
      },
      {
        title: "Solution",
        blocks: [
          paragraphs("I designed a pre-invoice reconciliation workflow that sat between operational completion and invoice generation. The solution included:"),
          bullets([
            "A reconciliation stage before invoice creation",
            "Visibility into mismatched charges and validation status",
            "Charge-level review and approval behavior",
            "Structured support for exceptions and financial adjustments",
            "A clearer decision path for when billing could proceed",
          ]),
          paragraphs("This changed the product from a dispute-triggering system into a validation-first system."),
        ],
      },
      {
        title: "Edge Cases",
        blocks: [
          paragraphs("The strongest systems are usually defined by how they handle exceptions, not happy paths. Important edge cases included:"),
          bullets([
            "ePOD approved and later reversed",
            "Transporter submission before all required billing inputs were finalized",
            "Partial mismatch affecting only one charge category",
            "Contracted freight differing from actual operational reality",
            "Situations where the invoice should be blocked without stopping the whole operational lifecycle",
          ]),
        ],
      },
      {
        title: "Product Gallery",
        blocks: [
          paragraphs(
            "Key screens from the freight invoicing and reconciliation system showing the billing workflow from consignor journey listing through charge-level validation and approval.",
          ),
          gallery(
            {
              src: "/assets/freight-invoicing/consignor-billing.png",
              title: "Consignor Journey Billing",
              description: "The transporter-facing journey listing with delivery, pending approval, approved, and disputed amounts — the starting point for billing submission.",
              cardClass: "md:col-span-2",
              imageClass: "h-64 sm:h-72 md:h-80",
            },
            {
              src: "/assets/freight-invoicing/consignor-pending-approval.png",
              title: "Pending Approval View",
              description: "The consignor billing view filtered to pending approvals, showing ePOD status, charges, transporter amounts, and variance at the journey level.",
              cardClass: "md:col-span-1",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/freight-invoicing/bill-details.png",
              title: "Bill Details — Ready to Submit",
              description: "Journey-level bill details showing freight cost breakdown, charge checks (route, distance, vehicle type, weight, ePOD), and pro-forma status.",
              cardClass: "md:col-span-1",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/freight-invoicing/bill-details-edit.png",
              title: "Bill Details — Charge Editing",
              description: "Charge-level editing view with contracted vs. actual charges, variance indicators, and inline save actions for granular billing adjustments.",
              cardClass: "md:col-span-1",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/freight-invoicing/bill-review.png",
              title: "Bill Review — Approval Flow",
              description: "The review stage showing contracted vs. transporter amounts with charge-level reject and approve actions for pre-invoice validation.",
              cardClass: "md:col-span-1",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/freight-invoicing/bill-review-actions.png",
              title: "Bill Review — Partial Approval",
              description: "Demonstrating partial approval state where some charges are approved and others rejected, with variance highlighting and undo capability.",
              cardClass: "md:col-span-2",
              imageClass: "h-60 sm:h-64 md:h-72",
            },
          ),
        ],
      },
      {
        title: "Outcome",
        blocks: [
          paragraphs(
            "The redesigned workflow improved the quality of billing decisions before invoice creation. Fewer preventable disputes entered formal billing, collaboration between operations and finance became clearer, the audit trail became more reliable, and user confidence in billing status and readiness improved.",
          ),
        ],
      },
      {
        title: "Learnings",
        blocks: [
          bullets([
            "Validation timing matters as much as validation logic",
            "Enterprise workflows fail when products encode the wrong moment of truth",
            "Real trust comes from balancing structure and flexibility",
            "Financial UX is not about making screens simple, but about making decisions safer and clearer",
          ]),
        ],
      },
    ],
  },
  aftercrop: {
    slug: "aftercrop",
    title: "Aftercrop",
    tagline: "Mobile-first warehouse operations software — A Konic Technologies Product",
    backHref: "/#work",
    meta: [
      { label: "Role", value: "Product Designer & Co-Founder" },
      { label: "Company", value: "Konic Technologies" },
      { label: "Timeline", value: "2021 - 2023" },
    ],
    media: mediaImage("/assets/app-case-studies/aftercrop.svg", "Aftercrop case study preview"),
    sections: [
      {
        title: "Overview",
        blocks: [
          paragraphs(
            "In India, medium-sized warehouses and cold storage are disorganised but vital for farmers and reducing food waste. Current tracking methods are outdated and complex. Our goal was to create user-friendly, mobile-first software to simplify warehouse operations.",
          ),
        ],
      },
      {
        title: "User Research",
        blocks: [
          subsections(
            {
              title: "Interviews",
              paragraphs: [
                "Through user interviews, we delved into the experiences and frustrations of warehouse stakeholders. A common thread emerged: existing solutions lacked emphasis on design and ease of use, especially on mobile devices.",
              ],
            },
            {
              title: "Ethnographic Studies",
              paragraphs: [
                "By conducting ethnographic studies, we dissected the cluttered interfaces of current warehouse management systems. The findings highlighted a gap: a delightful, user-friendly solution was missing, both on mobile phones and desktops.",
              ],
            },
            {
              title: "Competitive Analysis",
              paragraphs: [
                "Thoroughly examining existing products revealed a pattern of complex interfaces designed for desktop use. The market lacked a product that caters to both mobile and desktop users with equal proficiency.",
              ],
            },
          ),
        ],
      },
      {
        title: "Key Findings",
        blocks: [
          bullets(
            [
              {
                title: "Design & Usability",
                text: "Several products attempt to solve warehouse management, but almost all lack emphasis on design and ease of use. The software looks like it was designed for desktops by older generations — lots of functionality packed into clunky interfaces. None works well on a phone.",
              },
              {
                title: "Adaptability",
                text: "Every product tried to introduce new workflows that warehouses are not familiar with, causing too much disruption. We interviewed customers who built in-house solutions only to end up with staff unable to adapt because of interface complexity. There's a strong need for a solution that even unskilled staff can pick up quickly because it fits their existing workflow.",
              },
              {
                title: "Affordability",
                text: "Large warehouses use enterprise products like SAP because they can afford a team to set it up. But mid to small-sized businesses can't afford expensive customisable products and a team to configure them. There's scope for an off-the-shelf product that just works for 90% of use cases.",
              },
              {
                title: "Availability & Security",
                text: "Some products are only available as on-premise installations. Cloud-based solutions existed but were poorly implemented. Customers had strong concerns about data security, and downloading data offline for spreadsheet-based reporting was an important unmet need.",
              },
            ],
            true,
          ),
        ],
      },
      {
        title: "Target Audience",
        blocks: [
          paragraphs(
            "There are several groups of target audiences with varying literacy levels. Staff in some rural warehouses might have never used a computer. Some warehouse owners are power users. To cater to the lower denominator, we kept the app extremely simple — while also providing powerful features for advanced users.",
          ),
          bullets(
            [
              {
                title: "Owners / Power Users",
                text: "Comfortable with phones and computers. Need dashboard-like pages with summaries and reports across different time intervals. When owners aren't experts, they usually hire an accountant who passes along the summary.",
              },
              {
                title: "Managers",
                text: "Take care of day-to-day activities, usually carry a phone and are good at tracking with pen and paper. Shifting to digital can be disruptive unless the process is extremely easy and takes the same time as physical records. Some were very receptive; some showed resistance.",
              },
              {
                title: "Staff / Workers",
                text: "Own a phone but can't do more than input minimal information. Pages for them have to be very simple and extremely easy to use. Usually not disruptive if built with the required simplicity.",
              },
            ],
            true,
          ),
        ],
      },
      {
        title: "Defining the USP",
        blocks: [
          paragraphs(
            "After conducting several interviews with different target audiences, visiting warehouses and cold storages, and observing day-to-day operations, we arrived at three key selling points.",
          ),
          bullets([
            {
              title: "Design takes precedence",
              text: "We identified design and usability as the one thing that can make a mark — the biggest USP that none of the other products focuses on.",
            },
            {
              title: "Least disruption",
              text: "We kept the process similar to the current pen-and-paper workflow so users could be onboarded and get familiar as soon as possible.",
            },
            {
              title: "Portability",
              text: "Mobile interfaces are a must. Managers spend significant time on the app and are usually only comfortable using a phone. They move around the warehouse a lot — having a mobile interface to quickly review information has a huge impact.",
            },
          ]),
        ],
      },
      {
        title: "The Solution",
        blocks: [
          subsections(
            {
              title: "Focus 1: Easy-to-use Mobile-first Design",
              paragraphs: [
                "Tables are the most prominent way of displaying information — but terrible on mobile. We replaced all tables with cards and lists, carefully designing each card with just the right amount of information.",
                "We kept elements similar to a native mobile app so users who've never used websites don't find it disruptive. We used switches and selection inputs so users can skip typing wherever possible — taps and swipes instead of keyboard input.",
                "The app being as easy as it is meant no separate training was necessary. Most users felt comfortable within a day or two. Our developers ensured the site loads fast so users aren't waiting around looking at loading screens.",
              ],
            },
            {
              title: "Focus 2: Process Similar to Current Flow",
              paragraphs: [
                "The 'Creating an Incoming Shipment' page is the most important page in the application. After observing the unloading process and interviewing managers, we noticed the main pain point — managers have to keep track of many hand-written receipts and ledger entries. We simplified it into three sections. For a minimal submission, a manager could add an entire incoming shipment in a couple of minutes.",
                "For outgoing shipments, we visualised the process as an 'Add to Cart' experience from e-commerce. The manager can just pick stock from the list and add it to the truck. This avoids tedious forms and leverages powerful filtering on the stock page.",
              ],
            },
            {
              title: "Focus 3: Data Security",
              paragraphs: [
                "We introduced user roles with exact permissions — an owner could let a manager only create records while restricting edits or deletes. 'A warehouse manager should not have access to edit a record unless an admin approves it' was one of the most popular requirements.",
                "The vehicle logs page is the simplest page we made — just one input field to track the vehicle number. When a vehicle leaves, a 'vehicle left' button is all the security guard presses. Built for staff who may be uneducated but can repeat a simple guided process.",
              ],
            },
          ),
        ],
      },
      {
        title: "Launch & Iteration",
        blocks: [
          paragraphs(
            "We launched the MVP in around 3 months and kept our ears wide open for feedback. We proactively initiated conversations with customers and kept them in the loop.",
            "We released changes 2-3 times per week. Continuous customer conversations and feedback loops allowed us to fix usability issues quickly while understanding more about how the application was being used every day.",
          ),
        ],
      },
      {
        title: "The Future",
        blocks: [
          bullets([
            {
              title: "Customisation",
              text: "Several customers have specific terminology and inputs unique to their warehouses. Customising terminology and fields across the application for each customer was the next priority.",
            },
            {
              title: "Billing & Invoices",
              text: "Interviews revealed that several billing models need to be supported — per-day billing, lease model billing — all while being easy to use. This was one of the biggest planned features.",
            },
          ]),
        ],
      },
    ],
  },
  fitx: {
    slug: "fitx",
    title: "Fit X",
    tagline: "A fitness app designed for tracking goals, team collaboration and creating personalized plans",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Mobile App" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/fitx.png", "Fit X case study preview"),
    sections: [
      {
        title: "The Problem",
        blocks: [
          paragraphs(
            "People face challenges maintaining consistent physical activity. A lack of motivation often leads to incomplete fitness programs. Existing apps provide non-customizable, one-size-fits-all workout plans that fail to account for individual needs and preferences.",
          ),
        ],
      },
      {
        title: "The Goal",
        blocks: [
          paragraphs(
            "Create a mobile app that enables users to track their daily physical activity and promotes team collaboration. The app should provide customizable workout plans that adapt to individual fitness levels and goals.",
          ),
        ],
      },
      {
        title: "My Approach",
        blocks: [
          bullets([
            {
              title: "User Motivation",
              text: "Team collaboration features to keep users engaged and accountable",
            },
            {
              title: "Customizable Workouts",
              text: "A user-friendly interface for creating personalized workout plans",
            },
            {
              title: "Activity Tracking",
              text: "Real-time feedback and visualizations to monitor progress",
            },
            {
              title: "User Collaboration",
              text: "Challenges and group activities to foster a sense of community",
            },
          ]),
        ],
      },
      {
        title: "Design Process",
        blocks: [chips(["Empathize", "Define", "Ideate", "Prototype", "Test"])],
      },
      {
        title: "Research Insights — Affinity Mapping",
        blocks: [
          paragraphs(
            "User interviews and surveys helped us understand the problems users face. We used affinity mapping to structure the data and find patterns across categories:",
          ),
          bullets(
            [
              {
                title: "Current activity tracking",
                text: "Users tracked with apps like Cultfit, smart watches, or not at all. Key pain: no accuracy in tracking, lack of active feedback.",
              },
              {
                title: "Motivation",
                text: "Users wanted partners, fitness groups, daily reminders, goal tracking, and incremental plans. Self-improvement and productivity were top drivers.",
              },
              {
                title: "App expectations",
                text: "Simple, precise, informative. Key features: step tracking, heart rate, food intake, improvement graphs, daily planners. Easy to navigate with clean design.",
              },
              {
                title: "Past app frustrations",
                text: "Lack of active tracking, no plan makers, no group coordination. Too many ads and frequent irrelevant notifications.",
              },
              {
                title: "Payment willingness",
                text: "Most users willing to pay ₹200/month. Free for basic features, paid for advanced programs. Pay extra for better features.",
              },
              {
                title: "Social support",
                text: "Mixed — some valued community and competition, others were not interested. Grouped sessions and easy interaction were popular.",
              },
            ],
            true,
          ),
        ],
      },
      {
        title: "Persona — Ashok",
        blocks: [
          paragraphs(
            "Ashok is a 30-year-old professional with a busy schedule, making it challenging to consistently attend gym sessions. Despite his initial enthusiasm for fitness programs, he often lacks the motivation to complete them. He values community and accountability from collaborative fitness experiences.",
          ),
          subsections(
            {
              title: "Goals",
              bullets: [
                "Consistent physical activity — incorporate daily exercise into his routine",
                "Personalized fitness journey — customize workout plans based on preferences",
                "Community connection — support from a fitness community to enhance motivation",
              ],
            },
            {
              title: "Challenges",
              bullets: [
                "Motivation hurdles when working out alone",
                "Limited customization in existing fitness apps",
                "Misses the community feel from group fitness activities",
              ],
            },
          ),
        ],
      },
      {
        title: "User Stories",
        blocks: [
          bullets(
            [
              {
                title: "Track daily activity",
                text: "As a fitness enthusiast, I want to track my daily activity so I can monitor my progress and stay accountable. Log running, cycling, gym sessions. Set daily/weekly goals. See visual history and achievements.",
              },
              {
                title: "Create custom activities",
                text: "As a user, I want to create customized activities so I can tailor workouts to my personal preferences and fitness level. Select exercises, set reps, define intensity. Include indoor and outdoor exercises.",
              },
              {
                title: "Collaborate with friends",
                text: "As a social fitness enthusiast, I want to perform workouts collaboratively with friends so we can motivate each other. Create or join challenges. Sync activities in real-time. Share achievements on a social feed.",
              },
            ],
            true,
          ),
        ],
      },
      {
        title: "Competitive Analysis",
        blocks: [
          paragraphs(
            "Analyzed three leading fitness apps to understand the landscape:",
          ),
          bullets(
            [
              {
                title: "Cultfit",
                text: "Wide range of fitness options (group classes, at-home workouts, nutrition, wellness). Strong community. Affordable pricing. Holistic approach.",
              },
              {
                title: "Nike Running",
                text: "Simple, user-friendly interface. Variety of running programs for different levels. Gamified trophies and badges. Large active community.",
              },
              {
                title: "Adidas Running",
                text: "Detailed customizable dashboard with metrics. Smart coach that adapts to performance. Fun features with music, stories, podcasts. Global community.",
              },
            ],
            true,
          ),
        ],
      },
      {
        title: "How Might We",
        blocks: [
          bullets([
            "How might we design a feature that encourages users to actively track their physical activity throughout the day?",
            "How might we enable users to create personalized workout plans aligned with their goals?",
            "How might we design features that promote friendly competition and collaboration among users?",
          ]),
        ],
      },
      {
        title: "Solution",
        blocks: [
          paragraphs("Based on the HMW questions, the solution focuses on three core features:"),
          bullets(
            [
              {
                title: "Regular stats and progress tracking",
                text: "Showing workout stats, calories, weight, and tonnage lifted with clear visualizations and motivating feedback",
              },
              {
                title: "Build & customize workouts",
                text: "Create personalized workout plans — select exercises, set reps, define intensity for both indoor and outdoor activities",
              },
              {
                title: "Create teams with friends",
                text: "Form groups for team workouts, challenges, and accountability. Sync activities in real-time and share on a social feed.",
              },
            ],
            true,
          ),
        ],
      },
      {
        title: "Style Guide",
        blocks: [
          paragraphs(
            "Colors: #002A4B (primary), #6F7A82, #777D81, #F1F6FA, #D6D9DC, #E4E6E7. Typography: Gilroy — Semi bold 48px, 24px, 20px, 16px, 14px; Regular 14px; Medium 12px; Semi bold 12px, 10px.",
          ),
        ],
      },
      {
        title: "Key Screens",
        blocks: [
          bullets([
            "Splash & Onboarding — shows the app solves workout tracking and team creation",
            "Goal Setting — personalized fitness goal configuration",
            "Stats Screen (Individual) — activities, calories, weight, tonnage lifted",
            "Stats Screen (Teams) — team progress and shared goals",
            "Workouts Screen — individual and team workout views",
            "Create Workout — step-by-step workout builder",
            "Team Creation — 3-step flow for creating fitness teams",
            "Workout Recording — easy entry of set details during workout",
          ]),
        ],
      },
    ],
  },
  swiggy: {
    slug: "swiggy",
    title: "Swiggy Meal Subscriptions",
    tagline: "Designing a scheduling and subscription feature for food delivery",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Feature Design" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/swiggy.svg", "Swiggy meal subscriptions case study preview"),
    sections: [
      {
        title: "The Task",
        blocks: [
          paragraphs(
            "Regular Swiggy users don't have time when they actually want to order food. The challenge was to build a feature that allows users to schedule orders and create weekly or monthly meal subscriptions.",
          ),
        ],
      },
      {
        title: "Goal",
        blocks: [
          paragraphs(
            "Allow customers to save time and order food more frequently — aiming for 15-20 orders per month through automated scheduling and subscriptions.",
          ),
        ],
      },
      {
        title: "Audience",
        blocks: [
          paragraphs(
            "The primary audience is corporate employees, fitness enthusiasts, entrepreneurs, and anyone busy during the day who needs to save time on food ordering. Food is delivered to offices during lunch hours and to homes for dinner.",
          ),
        ],
      },
      {
        title: "Three User Flows",
        blocks: [
          subsections(
            {
              title: "Flow 1: From Box Page",
              chips: ["Box page", "Tooltip prompt", "Subscription page"],
            },
            {
              title: "Flow 2: From Past Orders",
              chips: ["Past orders", "Select order", "Convert to subscription"],
            },
            {
              title: "Flow 3: From Favorites",
              chips: ["Favorites", "Select favorite", "Convert to subscription"],
            },
          ),
        ],
      },
      {
        title: "Subscription Design — 3 Steps",
        blocks: [
          subsections(
            {
              title: "Step 1: Add Food Items",
              paragraphs: [
                "Same experience as normal ordering — users browse restaurants, select items, and add them to their subscription cart.",
              ],
            },
            {
              title: "Step 2: Name & Categorize",
              paragraphs: [
                "Name the subscription and choose the meal type (breakfast, lunch, dinner) for easy identification and management.",
              ],
            },
            {
              title: "Step 3: Schedule & Plan",
              paragraphs: [
                "Choose a plan (Weekly or Monthly), select specific days of the week, and set the auto-order time for each delivery.",
              ],
            },
          ),
        ],
      },
      {
        title: "Order Notifications",
        blocks: [
          paragraphs(
            "After adding a subscription, food is ordered automatically at the selected time. Notifications keep users updated at each stage:",
          ),
          chips([
            "15 min before — Upcoming order reminder (Cancel option)",
            "Order received — Agent will pick up",
            "Agent picked up — Delivery in 20 min",
            "Agent reached — Please pick your order (Call Agent)",
            "Delivered — Rate experience",
          ]),
        ],
      },
      {
        title: "Design Approach",
        blocks: [
          bullets([
            {
              title: "Only one CTA button",
              text: "Following Swiggy's existing pattern — no deviations when performing a task",
            },
            {
              title: "Mimicked existing ordering flow",
              text: "Adding food to a subscription feels identical to normal food ordering — reduced learning curve",
            },
            {
              title: "Split into 2 clear steps",
              text: "Step 1: Add food items to cart (familiar). Step 2: Create subscription with schedule and payment.",
            },
            {
              title: "Input optimization",
              text: "Minimized input fields and used tap gestures wherever possible. Day selection uses tappable S M T W F buttons instead of dropdowns.",
            },
          ]),
        ],
      },
      {
        title: "Constraints & Edge Cases",
        blocks: [
          bullets([
            "Food items can only be from one restaurant per subscription — Swiggy's system prohibits multi-restaurant orders",
            "No modifications allowed after a subscription period starts — avoids billing complications and user confusion",
            "Average delivery charge based on past orders is built into the subscription fee — Swiggy may incur losses with this approach",
            "System notifies users if a restaurant is closed on a scheduled day and cancels that order",
            "Users cannot add extra food items once a subscription period has begun — prevents billing calculation issues",
          ]),
        ],
      },
    ],
  },
  inflight: {
    slug: "inflight",
    title: "In-flight Food Ordering",
    tagline: "An app to help passengers order food inside a plane",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Mobile App" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/inflight.svg", "In-flight food ordering case study preview"),
    sections: [
      {
        title: "Problem Statement",
        blocks: [
          paragraphs(
            "Help flight passengers place in-flight food orders for immediate consumption through a mobile app — making the dining experience seamless at 35,000 feet.",
          ),
        ],
      },
      {
        title: "Why This Matters",
        blocks: [
          quote(
            "The current in-flight catering global market is valued at $8.5 billion. In 2017 alone, 1.14 million tonnes of food was wasted from in-flight catering — a staggering figure that highlights the need for smarter ordering systems.",
          ),
        ],
      },
      {
        title: "Understanding the Goal",
        blocks: [
          paragraphs(
            "An aeroplane carries people from various cultures, languages, and regions — each with different dietary restrictions and preferences. It is a significant challenge for cabin crew to cater to every passenger individually.",
            "A food ordering app reduces aisle congestion, avoids awkward conversations between crew and passengers, and helps airlines analyze eating patterns to optimize their catering operations.",
          ),
        ],
      },
      {
        title: "Defining the Audience",
        blocks: [
          bullets([
            {
              title: "Geography",
              text: "Global audience requiring internationalization and multi-language support",
            },
            {
              title: "Culture",
              text: "Different faiths and dietary needs (halal, kosher, vegetarian, vegan)",
            },
            {
              title: "Medical conditions",
              text: "Users with allergies and specific dietary restrictions",
            },
            {
              title: "Age",
              text: "Passengers ranging from 1 to 80 years old with varying tech comfort levels",
            },
          ]),
        ],
      },
      {
        title: "Context & Needs",
        blocks: [
          paragraphs(
            "Passengers are already onboard when they use the app. Currently, ordering food is a hassle — call the crew, wait for them to reach your seat, place the order, then anxiously wait for delivery.",
            "The app provides a quick, self-service ordering experience without requiring crew assistance, giving passengers control over their dining experience.",
          ),
        ],
      },
      {
        title: "Solution — User Story (Ravi)",
        blocks: [
          paragraphs("Ravi's 11-step user journey illustrates the complete experience:"),
          chips([
            "Download app",
            "Board flight",
            "Connect to Wi-Fi",
            "Open app",
            "Enter seat number",
            "Browse menu",
            "Set preferences",
            "Select items",
            "Place order",
            "Receive food",
            "Great dining experience",
          ]),
        ],
      },
      {
        title: "Deliverables",
        blocks: [
          bullets(["Task flows", "User flows", "Information architecture", "Hi-fidelity wireframes", "[Figma prototype](https://www.figma.com/proto/218341FDZu0xg8SkEkbVfr/In-flight-food-ordering-app?page-id=0%3A1&node-id=1-1980&viewport=780%2C737%2C0.16&scaling=scale-down&starting-point-node-id=1%3A1974)"]),
        ],
      },
    ],
  },
  todo: {
    slug: "todo",
    title: "To Do Reimagine",
    tagline: "Reimagining the to-do app for work-from-home employees",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "App Redesign" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/todo.png", "To Do Reimagine case study preview"),
    sections: [
      {
        title: "Problem",
        blocks: [
          paragraphs(
            "People forget tasks. Working from home blurs the boundaries between work and personal life. The question worth asking: do generic to-do lists actually work for the current era?",
          ),
          quote("Work-from-home has fundamentally changed how we manage time — but our task management tools haven't kept up."),
        ],
      },
      {
        title: "Target Users",
        blocks: [
          paragraphs(
            "Employees working from home — where personal and work life are always in conflict. These users juggle meetings, household chores, personal errands, and deep work, all from the same physical space.",
          ),
        ],
      },
      {
        title: "User Research — 8 Pain Points",
        blocks: [
          bullets(
            [
              "Fragmented accounts across multiple task apps",
              "Cross-platform sync issues between devices",
              "Anxiety triggers from overwhelming task counts",
              "Limited and uninformative widgets",
              "Tedious input with no voice assistant support",
              "Annoying recurring task management",
              "Poor calendar integration",
              "Hard rescheduling of missed or postponed tasks",
            ],
            true,
          ),
        ],
      },
      {
        title: "Redefined Problem",
        blocks: [
          paragraphs(
            "Work-from-home employees find it difficult to manage personal and work tasks in one place. This mismanagement causes frustration, anxiety, and ultimately reduces productivity across both domains.",
          ),
        ],
      },
      {
        title: "Reimagined Features",
        blocks: [
          bullets(
            [
              {
                title: "Unified view",
                text: "All tasks from work and personal life in one place, clearly separated but always accessible",
              },
              {
                title: "Voice & NLP",
                text: "Reduce time spent adding tasks through natural language processing and voice input",
              },
              {
                title: "Cross-device sync",
                text: "Seamless synchronization across all devices without account fragmentation",
              },
              {
                title: "\"Free time\" metric",
                text: "Show available free time instead of anxiety-inducing task counts",
              },
              {
                title: "Smart postponing",
                text: "Intelligently postpone low-priority recurring tasks based on workload",
              },
              {
                title: "Useful widgets",
                text: "\"What's next\" and \"free time for the day\" widgets that provide actionable at-a-glance information",
              },
              {
                title: "Family sharing",
                text: "Share your schedule so family knows when you're busy, reducing interruptions",
              },
            ],
            true,
          ),
        ],
      },
    ],
  },
  wewrk: {
    slug: "wewrk",
    title: "We Wrk",
    tagline: "Connecting people with artisans for home repairs",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Mobile App" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/wewrk.png", "We Wrk case study preview"),
    sections: [
      {
        title: "Problem",
        blocks: [
          paragraphs(
            "People are busy, and finding reliable artisans for home repairs is difficult. How do you find a good artisan? How much do they charge? How do you contact them?",
            "On the other side, artisans also struggle to find consistent work unless they are personally recommended. Both sides of the marketplace face friction.",
          ),
        ],
      },
      {
        title: "Solution",
        blocks: [
          paragraphs(
            "An app connecting people and artisans to get home repairs done efficiently. A dual-sided platform that serves both customers looking for reliable help and artisans looking for steady work.",
          ),
        ],
      },
      {
        title: "Style Guide",
        blocks: [
          paragraphs(
            "Colors: #0077FF (primary), #F7F7F7 (background), #001833 (text), #7E7F81 (secondary text), #D4D4D4 (borders). Font: Poppins — 32px, 24px, 16px, 14px, 12px.",
          ),
        ],
      },
      {
        title: "Customer Side",
        blocks: [
          subsections(
            {
              title: "Explore Screen",
              paragraphs: [
                "Find artisans by location and type of work. Browse profiles, view ratings, and chat directly with artisans before booking.",
              ],
            },
            {
              title: "Work Screens",
              paragraphs: [
                "Track ongoing, completed, and scheduled works in one organized view. Stay on top of all your home repair projects.",
              ],
            },
            {
              title: "Cancelling Work",
              paragraphs: [
                "Cancel a booking with inline feedback — helping improve the platform by understanding why cancellations happen.",
              ],
            },
            {
              title: "Profile & Notifications",
              paragraphs: [
                "Manage personal details and stay updated on booking confirmations, artisan arrivals, and work completions.",
              ],
            },
          ),
        ],
      },
      {
        title: "Artisan Side",
        blocks: [
          subsections(
            {
              title: "Sign Up",
              paragraphs: [
                "Simple onboarding with phone number, security card verification, and job snaps to showcase their work and build trust.",
              ],
            },
            {
              title: "Explore",
              paragraphs: [
                "Map-based work discovery with distance filter and chat. Artisans can browse available jobs in their area and connect with customers directly.",
              ],
            },
            {
              title: "My Jobs",
              paragraphs: [
                "Requested, ongoing, and completed jobs — all in one place. A clear overview of their work pipeline and history.",
              ],
            },
          ),
        ],
      },
    ],
  },
  fromfarm: {
    slug: "fromfarm",
    title: "From Farm",
    tagline: "An app revolutionizing fresh produce purchasing directly from farmers",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Mobile App" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/from-farm.png", "From Farm case study preview"),
    sections: [
      {
        title: "Overview",
        blocks: [
          paragraphs(
            "Designed 'From Farm,' an app that connects consumers directly with farmers for fresh produce. By eliminating middlemen, the platform ensures freshness, fair pricing for farmers, and transparency for buyers.",
          ),
        ],
      },
      {
        title: "Case Studies on Behance",
        blocks: [
          cards(
            {
              title: "UX Case Study",
              description: "Research, user flows, and interaction design on Behance",
              href: "https://www.behance.net/gallery/95744555/From-farm-UX",
            },
            {
              title: "UI Case Study",
              description: "Visual design and high-fidelity screens on Behance",
              href: "https://www.behance.net/gallery/95746631/From-farm-UI",
            },
          ),
        ],
      },
    ],
  },
  monastery: {
    slug: "monastery",
    title: "Monastery",
    tagline: "A minimalist finance management app for effortless expense tracking",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "Mobile App" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage("/assets/app-case-studies/monastery.png", "Monastery case study preview"),
    sections: [
      {
        title: "Overview",
        blocks: [
          paragraphs(
            "Designed 'Monastery,' a minimalist finance management app focused on making expense tracking and management effortless. The design prioritizes clean, minimal UI that reduces friction and helps users stay on top of their finances without cognitive overload.",
          ),
        ],
      },
      {
        title: "Case Study on Behance",
        blocks: [
          cards({
            title: "Monastery App — Full Case Study",
            description: "Complete design process and screens on Behance",
            href: "https://www.behance.net/gallery/96240671/Monastery-App",
          }),
        ],
      },
    ],
  },
};

export const standaloneCaseStudyMachineText: Record<string, string> = Object.fromEntries(
  Object.entries(standaloneCaseStudies).map(([slug, study]) => [slug, serializeStudy(study)]),
);
