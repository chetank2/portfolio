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
  showCaption?: boolean;
  callouts?: Array<{
    // Left, top, width, and height as percentages of the source image.
    area: [number, number, number, number];
    block: string;
    detail: string;
  }>;
}

export interface StandaloneFigureImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  figureClass?: string;
  imageClass?: string;
}

export interface StandaloneSpotlightImage {
  src: string;
  alt: string;
  className?: string;
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

export interface StandaloneSpotlightItem {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image: StandaloneSpotlightImage;
  imagePosition?: "left" | "right";
}

export type FlowSketch =
  | "trucks"
  | "pro-forma"
  | "invoice"
  | "prepare"
  | "approve"
  | "inspect"
  | "settle"
  | "delivery"
  | "checklist"
  | "barrier"
  | "repair";

export interface StandaloneFlowDiagram {
  title: string;
  paths: Array<{
    label?: string;
    steps: Array<{ title: string; sketch: FlowSketch; label?: string; detail?: string }>;
  }>;
  note?: string;
}

export interface StandaloneBillingScenario {
  label: string;
  steps: string[];
  description: string;
}

export type StandaloneContentBlock =
  | { type: "paragraphs"; paragraphs: string[] }
  | { type: "quote"; text: string }
  | { type: "bullets"; items: Array<string | StandaloneListItem>; ordered?: boolean }
  | { type: "chips"; rows: string[][] }
  | { type: "flow"; diagram: StandaloneFlowDiagram }
  | { type: "billing-demo"; scenarios: StandaloneBillingScenario[] }
  | { type: "subsections"; items: StandaloneSubsection[] }
  | { type: "cards"; items: StandaloneCardLink[] }
  | { type: "figure"; image: StandaloneFigureImage }
  | { type: "gallery"; images: StandaloneGalleryImage[]; paired?: boolean }
  | { type: "spotlights"; items: StandaloneSpotlightItem[] };

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

const figure = (image: StandaloneFigureImage): StandaloneContentBlock => ({
  type: "figure",
  image,
});

const gallery = (...images: StandaloneGalleryImage[]): StandaloneContentBlock => ({
  type: "gallery",
  images,
});

const spotlights = (...items: StandaloneSpotlightItem[]): StandaloneContentBlock => ({
  type: "spotlights",
  items,
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
    case "flow":
      return [
        `### ${block.diagram.title}`,
        "",
        ...block.diagram.paths.flatMap((path) => [
          ...(path.label ? [path.label, ""] : []),
          ...path.steps.map((step, index) =>
            `${index + 1}. ${step.label ? `${step.label} — ` : ""}${step.title}${step.detail ? `. ${step.detail}` : ""}`,
          ),
          "",
        ]),
        ...(block.diagram.note ? [block.diagram.note, ""] : []),
      ];
    case "billing-demo":
      return [
        "### Assemble a billing flow",
        "",
        ...block.scenarios.flatMap((scenario) => [
          `- ${scenario.label}: ${scenario.steps.join(" → ")}`,
          `  ${scenario.description}`,
        ]),
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
    case "figure":
      return [
        ...(block.image.title ? [`### ${block.image.title}`, ""] : []),
        ...(block.image.description ? [block.image.description, ""] : []),
      ];
    case "gallery":
      return [
        ...block.images.flatMap((image) => [
          `- ${image.title}: ${image.description}`,
          ...(image.callouts ?? []).map((callout, index) =>
            `  ${index + 1}. ${callout.block} — ${callout.detail}`,
          ),
        ]),
        "",
      ];
    case "spotlights":
      return block.items.flatMap((item) => [
        `### ${item.title}`,
        "",
        ...(item.eyebrow ? [`- ${item.eyebrow}`, ""] : []),
        ...item.paragraphs.flatMap((paragraph) => [paragraph, ""]),
      ]);
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
              imageClass: "h-64 sm:h-72 md:h-80",
            },
            {
              src: "/assets/my-journeys/map-view.png",
              title: "Map View",
              description: "A spatial layer from the in-transit experience for understanding route context and operational status visually.",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/my-journeys/in-transit-alt.png",
              title: "Journey Details",
              description: "The actual journey details page, combining map context, timeline signals, and operational status in one view.",
              imageClass: "h-56 sm:h-60 md:h-72",
            },
            {
              src: "/assets/my-journeys/loads.png",
              title: "Loads",
              description: "The loads surface for scanning active movements, spotting exceptions, and switching into the right operational context.",
              imageClass: "h-60 sm:h-64 md:h-72",
            },
            {
              src: "/assets/my-journeys/in-transit-summary.png",
              title: "Journey Summary",
              description: "A condensed status layer for reading progress, key state changes, and closure-related signals at a glance.",
              imageClass: "h-52 sm:h-56 md:h-64",
            },
            {
              src: "/assets/my-journeys/loads-alt.png",
              title: "Loads Alternate State",
              description: "Another loads state demonstrating the same hierarchy and actionability at operational scale.",
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
    tagline: "Configurable billing cycles and reconciliation for freight",
    backHref: "/#work",
    protected: true,
    meta: [
      { label: "Role", value: "Senior Product Designer" },
      { label: "Company", value: "Freight Tiger" },
      { label: "Timeline", value: "2025–26" },
    ],
    sections: [
      {
        title: "Overview",
        blocks: [
          paragraphs(
            "At Freight Tiger, I designed the workflow that turns completed transport journeys into invoices. Transporters needed to bill for the work they had done. Consignors, the companies paying for that transport, needed to verify what was delivered, how the freight was calculated, and whether extra charges were justified.",
            "Clients differed in what they billed together, what evidence they needed, and when they reconciled differences. I designed a workflow that could support those policies while keeping each amount traceable to the trip that produced it.",
          ),
        ],
      },
      {
        title: "Problem Statements",
        blocks: [
          subsections(
            {
              title: "Business · Keep the invoice traceable to the work",
              paragraphs: [
                "One invoice can cover several vehicles, each with multiple journeys and charges. When an amount is questioned, both companies need to trace it back to the trip, contracted rate, and delivery evidence. If that connection is lost in the cycle total, a single disputed charge can hold up approval of the entire invoice.",
              ],
            },
            {
              title: "Users · Give each reviewer a clear decision",
              paragraphs: [
                "Transporter and consignor executives need to find missing evidence, verify amounts, and flag exceptions. Their managers need to see the results of those checks and decide whether to approve or return the bill. At each handoff, the next person needs to know who owns the issue, which charge is affected, and what still needs to happen.",
              ],
            },
            {
              title: "Variable billing · Support different client rules",
              paragraphs: [
                "One client may bundle a month of trips into one pro-forma and reconcile before issuing an invoice. Another may process invoices in batches of 100 and reconcile after issuance. The product needs to support those differences in grouping, readiness checks, and timing while keeping each adjustment tied to the right charge and document.",
              ],
            },
          ),
        ],
      },
      {
        title: "How Freight Billing Works",
        blocks: [
          bullets([
            {
              title: "Complete the journey and confirm delivery",
              text: "The transporter finishes the trip and submits electronic proof of delivery (ePOD). Operations checks that the trip is complete and that the delivery proof has been received and accepted where the client requires it.",
            },
            {
              title: "Work out what the trip cost",
              text: "The contract sets the base freight using inputs such as route, distance, vehicle type, or weight. The transporter adds charges that arose on the trip, such as detention for waiting to load or unload, and provides supporting evidence. Those charges can differ from what the consignor expects to pay.",
            },
            {
              title: "Group the work into a billing cycle",
              text: "A time-based cycle can run monthly or every 15 days. A count-based rule can collect the first 100 invoices into a batch. In a consolidated setup, a month of eligible freight can become one pro-forma and then one invoice. That pro-forma can cover several vehicles, each with several journeys and their own charges.",
            },
            {
              title: "Issue the invoice and track payment",
              text: "The transporter raises the invoice from the pro-forma when the client uses one. The consignor records partial or full settlement, and both parties can see what has been paid and what remains due. Reconciliation can happen before or after issuance, depending on the client.",
            },
          ], true),
          {
            type: "flow",
            diagram: {
              title: "How one monthly invoice comes together",
              paths: [{
                steps: [
                  { label: "Trip-level charges", title: "Journeys across vehicles", sketch: "trucks", detail: "Vehicle A · 3 journeys\nVehicle B · 2 journeys" },
                  { label: "Cycle rollup", title: "Monthly pro-forma", sketch: "pro-forma", detail: "Five eligible journeys in one reviewable total" },
                  { label: "Issued document", title: "One freight invoice", sketch: "invoice", detail: "Each amount links back to its journey and charge" },
                ],
              }],
            },
          },
        ],
      },
      {
        title: "Who Checks and Who Approves",
        blocks: [
          paragraphs(
            "The transporter bills for the freight service, and the consignor verifies what it owes. Both sides have an executive who checks the bill or invoice and a manager who approves it. I mapped both handoffs so each person could see what had been checked, what still needed a decision, and whose action would move the bill forward.",
          ),
          {
            type: "flow",
            diagram: {
              title: "The invoice review handoff",
              paths: [{
                steps: [
                  { label: "Transporter executive", title: "Prepare and check", sketch: "prepare", detail: "Verify trips, ePOD, rates, and add-ons." },
                  { label: "Transporter manager", title: "Approve for submission", sketch: "approve", detail: "Review exceptions and authorize sending." },
                  { label: "Consignor executive", title: "Verify the invoice", sketch: "inspect", detail: "Compare charges against the contract and delivery evidence." },
                  { label: "Consignor manager", title: "Approve the invoice", sketch: "settle", detail: "Review the checks and approve it for settlement." },
                ],
              }],
              note: "If a manager needs a correction, the bill goes back to review with the reason and affected charges in context.",
            },
          },
        ],
      },
      {
        title: "How Billing Can Vary by Industry",
        blocks: [
          paragraphs("These examples illustrate possible client configurations. The freight contract and operating process determine which checks and billing rules apply."),
          subsections(
            {
              title: "Cement · One invoice for a monthly cycle",
              paragraphs: [
                "A cement plant can send multiple truckloads to depots and dealers. If freight is priced by delivered tonne and route, the consignor can check the delivered weight and flag detention separately. The client could consolidate eligible trips into a monthly pro-forma, reconcile the exceptions there, and issue one invoice for the cycle.",
              ],
            },
            {
              title: "Quick commerce · Billing in high-volume batches",
              paragraphs: [
                "A transporter can run repeated replenishment trips from a hub to dark stores. A client could check completed trips against store receipts, process issued invoices in batches of 100, and reconcile exceptions such as a missing stop or an extra trip against the affected invoice.",
              ],
            },
            {
              title: "Vehicle spare parts · Separate routine and urgent charges",
              paragraphs: [
                "A parts distributor can send routine stock and urgent replacement parts to the same dealer network. A 15-day cycle could group both kinds of trips while keeping expedited surcharges on separate charge lines. If a dealer receipt is missing or a surcharge is questioned, the teams can trace it to the trip and review it on the pro-forma.",
              ],
            },
            {
              title: "Steel · Adjustments after invoice issuance",
              paragraphs: [
                "A steel mill can dispatch coils on heavy vehicles and use the recorded weight and vehicle type to check freight. A client could issue the invoice after trip completion and accepted ePOD, then reconcile a later weighment discrepancy or detention claim. An agreed difference would be recorded against the issued invoice through a credit or debit note.",
              ],
            },
            {
              title: "Liquor distribution · Reconcile on the pro-forma",
              paragraphs: [
                "A liquor distributor can require approved ePODs before trips enter a scheduled pro-forma. The commercial team returns mismatched evidence to the transporter with remarks. Both sides review freight and trip charges on the pro-forma, and disputed trips can return for review under a new reference.",
                "Once the charges are agreed, the transporter submits a signed freight invoice. The workflow checks the accounting entries in SAP, processes payment through NewGen, and returns the payment status to Freight Tiger.",
              ],
            },
          ),
        ],
      },
      {
        title: "What Workflow Mapping Revealed",
        blocks: [
          paragraphs(
            "I mapped the handoffs between transporters and consignors from delivery checks through billing and payment. At each step, I tracked what the next person needed to see and what could send the work back.",
            "A trip could be marked delivered and still be unbillable. Delivery proof might be awaiting approval, or the actual distance could differ from the distance used to calculate freight. The maps also showed that the same charge disagreement could surface at different points. One setup checked charges before a trip entered a pro-forma. In another, both parties reviewed trip charges on a scheduled pro-forma. A rejection could return a specific charge for correction, with the reason carrying into the next review.",
          ),
        ],
      },
      {
        title: "How I Turned Different Workflows Into One Product",
        blocks: [
          paragraphs(
            "I broke the workflow into reusable blocks, like LEGO pieces. Each block had a job and a clear point at which work could move forward. A client could change the billing cycle, require a delivery check, or place reconciliation at a different point while keeping the same journey, charge, and document records.",
          ),
          figure({
            src: "/assets/freight-invoicing/workflow-building-blocks.jpg",
            alt: "Seven LEGO-style bricks representing trip checks and ePOD, billing cycles, pro-forma, reconciliation, invoice generation, credit and debit notes, and dispute management.",
            title: "Freight billing building blocks",
            description: "The same seven blocks can be combined according to a client's billing and reconciliation rules.",
            imageClass: "case-study-ink-art",
          }),
          {
            type: "billing-demo",
            scenarios: [
              {
                label: "Cement · Monthly billing",
                steps: ["Trip checks and ePOD", "Monthly cycle", "Pro-forma", "Reconcile", "Raise invoice"],
                description: "Group eligible trips into a monthly pro-forma. Reconcile weight or detention differences there, then raise one invoice with the agreed charges.",
              },
              {
                label: "Quick commerce · Batches of 100",
                steps: ["Trip checks and ePOD", "Raise invoice", "Batch 100 invoices", "Reconcile", "Credit or debit note"],
                description: "Check replenishment trips against store receipts and group issued invoices for review. Record an agreed change against the affected invoice through a credit or debit note.",
              },
              {
                label: "Steel · Disputed charge",
                steps: ["Trip checks and ePOD", "Raise invoice", "Reconcile", "Dispute management"],
                description: "If the parties still disagree on a weight or detention charge after invoicing, send that charge, its reason, and the delivery evidence to dispute review.",
              },
            ],
          },
          bullets([
            { title: "Trip completion and ePOD", text: "Confirm that the trip ended, then track whether delivery proof was received, accepted, or rejected." },
            { title: "Billing cycle", text: "Group eligible journeys or invoices according to the client's time or count rule, with links back to vehicles and charges." },
            { title: "Pro-forma", text: "Roll up the proposed charges so both parties can see what would be billed and drill into individual journeys." },
            { title: "Reconciliation", text: "Compare contracted and submitted amounts, show the variance, and record a decision on each charge." },
            { title: "Invoice generation", text: "Issue the invoice from the eligible charges and retain the links to the underlying journeys and pro-forma where used." },
            { title: "Credit and debit notes", text: "Record agreed decreases or increases against an issued invoice and preserve the original invoice." },
            { title: "Dispute management", text: "Route unresolved differences for follow-up with the charge, reason, and supporting evidence attached." },
          ]),
          {
            type: "flow",
            diagram: {
              title: "When a completed trip becomes billable",
              paths: [
                {
                  label: "When the required checks pass",
                  steps: [
                    { title: "Trip completed", sketch: "delivery", detail: "Delivery is recorded." },
                    { title: "Billing checks pass", sketch: "checklist", detail: "ePOD is received and accepted, required freight inputs are present, and configured approvals are complete." },
                    { title: "Ready for billing", sketch: "invoice", detail: "Add to a pro-forma or generate an invoice, depending on the client setup." },
                  ],
                },
                {
                  label: "When a required check fails",
                  steps: [
                    { title: "Hold the journey", sketch: "barrier", detail: "Show the blocker, such as a rejected ePOD or a missing rate." },
                    { title: "Fix and recheck", sketch: "repair", detail: "The responsible team supplies the evidence or corrects the input." },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        title: "Key Design Trade-offs",
        blocks: [
          subsections(
            {
              title: "When to reconcile",
              paragraphs: [
                "Reviewing before invoice issuance lets both parties settle differences while the bill is still a draft. Some clients need to issue the invoice first. I supported both sequences, using a credit or debit note to document an agreed change against the issued invoice.",
              ],
            },
            {
              title: "What to approve",
              paragraphs: [
                "A single approval for the bill is quick when all amounts agree. When only an add-on is disputed, the reviewer needs a way to accept base freight and challenge that line separately. I kept those decisions on individual charges and showed their status when the bill went back for review.",
              ],
            },
            {
              title: "What to block",
              paragraphs: [
                "I blocked submission when a required check failed and showed the specific reason. Keeping the charge breakdown and other checks visible let the transporter continue reviewing the bill while the responsible party corrected the missing value or delivery proof.",
              ],
            },
          ),
        ],
      },
      {
        title: "Example Flow for One Client",
        blocks: [
          paragraphs(
            "This Figma walkthrough follows one client setup. Shakthi Logistics prepares journey bills, MDC Labs reviews the charges, and approved journeys can roll into a pro-forma. The frames use sample amounts to show different billing states.",
          ),
          subsections(
            {
              title: "Journey checks and charge preparation",
              paragraphs: [
                "I gave delivery proof and billing readiness separate places in the queue. A trip can be delivered and still need an accepted ePOD or a missing freight value before submission. On the bill, Details identifies the journey, Checks shows what passed, and Pro-forma Details shows whether the journey has been grouped for billing. The transporter can fix a charge in the breakdown while those checks stay in view.",
              ],
            },
          ),
          gallery(
            {
              src: "/assets/freight-invoicing/consignor-billing.png",
              title: "1. Find journeys ready for billing",
              description: "Separate ePOD and billing status columns show what is ready to submit and what still needs attention.",
              showCaption: true,
              callouts: [
                { area: [49, 45.5, 14, 30], block: "Trip checks and ePOD", detail: "The ePOD column shows whether delivery proof was accepted, rejected, or still needs review." },
                { area: [82.5, 45.5, 10.5, 30], block: "Billing readiness", detail: "The status column shows whether the trip can be submitted and gives the reason when it cannot." },
              ],
            },
            {
              src: "/assets/freight-invoicing/bill-details.png",
              title: "2. Check what blocks submission",
              description: "Route, distance, vehicle type, and weight match. Pending ePOD keeps the Submit Journey action disabled, and Pro-forma Details shows that no pro-forma has been created.",
              showCaption: true,
              callouts: [
                { area: [34, 19, 32, 29], block: "Trip checks and ePOD", detail: "The Checks panel keeps the matched freight inputs and pending delivery proof in one view." },
                { area: [67, 19, 32, 29], block: "Pro-forma", detail: "This panel shows whether the journey belongs to a billing group." },
                { area: [89, 94.5, 10, 4.5], block: "Submission gate", detail: "The disabled Submit Journey button reflects the pending ePOD." },
              ],
            },
            {
              src: "/assets/freight-invoicing/bill-details-edit.png",
              title: "3. Edit individual charges",
              description: "The transporter updates an add-on charge and can compare the entered amount with the contracted rate.",
              showCaption: true,
              callouts: [
                { area: [41, 83.4, 22, 5.2], block: "Charge preparation", detail: "The transporter can edit a single add-on in its row." },
                { area: [77, 79.5, 10.5, 13], block: "Reconciliation", detail: "The variance and row-level save action stay next to the edited charge." },
              ],
            },
          ),
          subsections(
            {
              title: "Reconcile charges at the point of review",
              paragraphs: [
                "The consignor starts in a queue that shows which side needs to act, then opens the bill to compare contracted and submitted amounts. I separated base freight from add-ons and put the variance and approval action on the same row. The reviewer can accept one charge and question another. A rejection records the reason and moves the bill to Dispute in this setup. The audit trail keeps the original amount, the reason, and subsequent changes available to the next reviewer.",
              ],
            },
          ),
          gallery(
            {
              src: "/assets/freight-invoicing/consignor-pending-approval.png",
              title: "4. Find bills awaiting review",
              description: "MDC Labs can see journey-level variances and filter by which party needs to act.",
              showCaption: true,
              callouts: [
                { area: [7.4, 34.8, 29, 4.3], block: "Review handoff", detail: "The queue filters show which party needs to act next." },
                { area: [88.6, 45.5, 5.5, 30], block: "Reconciliation", detail: "The variance column helps the consignor find journeys that need closer review." },
              ],
            },
            {
              src: "/assets/freight-invoicing/reject-charge-dialog.png",
              title: "5. Reject a charge and move the bill to Dispute",
              description: "The consignor records why a charge was rejected before sending the journey bill to Dispute for further review.",
              showCaption: true,
              callouts: [
                { area: [31.9, 49.7, 36.2, 16.6], block: "Rejection reason", detail: "The reviewer records why the charge is being rejected, so the other party can address the issue." },
                { area: [54.7, 68.6, 13.3, 4.2], block: "Reject & Move to Dispute", detail: "Confirming the action moves the journey bill to Dispute for further review." },
              ],
            },
            {
              src: "/assets/freight-invoicing/bill-review-actions.png",
              title: "6. Review a bill with mixed charge decisions",
              description: "Approved charges remain visible while two add-ons with variances still need a decision. The reviewer can undo a charge approval before submitting the bill.",
              showCaption: true,
              callouts: [
                { area: [67, 51.5, 32, 7], block: "Reconciliation", detail: "The variance card summarizes the amount in question for the journey." },
                { area: [77.5, 74.2, 21.4, 16], block: "Charge decisions", detail: "Approved rows and unresolved add-ons stay visible together so the reviewer can pick up where they left off." },
              ],
            },
          ),
          subsections(
            {
              title: "Carry the journey detail into each billing document",
              paragraphs: [
                "The pro-forma changes the level of detail from one trip to a billing group. I put the approved total above the journey list so the transporter can check the rollup and still open a contributing bill. The invoice draft keeps those journeys in a table, with invoice details, discounts, taxes, and totals in their own sections. Once the invoice is issued, settlement adds the paid and due amounts alongside the invoice details, with the original journeys still visible below.",
              ],
            },
          ),
          gallery(
            {
              src: "/assets/freight-invoicing/pro-forma-journeys.png",
              title: "7. Open the pro-forma and review its journeys",
              description: "The summary shows the approved value. The rows below retain journey and vehicle references, ePOD, base freight, and add-ons.",
              showCaption: true,
              callouts: [
                { area: [1, 17.7, 98, 10], block: "Billing cycle and pro-forma", detail: "The summary rolls the journey count and approved value up to the pro-forma." },
                { area: [1, 34, 98, 23.5], block: "Journey traceability", detail: "The table keeps each contributing journey and its freight breakdown available beneath the summary." },
              ],
            },
            {
              src: "/assets/freight-invoicing/invoice-draft.png",
              title: "8. Build the invoice from the pro-forma",
              description: "The draft keeps the underlying journeys and vehicle numbers visible. Separate sections show where the transporter enters invoice details, adds discounts or taxes, and reviews the total before raising the invoice.",
              showCaption: true,
              callouts: [
                { area: [67, 9, 32, 14], block: "Invoice generation", detail: "The Invoice Details panel holds document-level fields for the draft." },
                { area: [1, 31.5, 98, 15], block: "Pro-forma to invoice", detail: "The journey table carries forward the source trips, vehicle numbers, and charges." },
                { area: [1, 47, 98, 34], block: "Draft invoice totals", detail: "Discounts, taxes, and deductions are shown separately from the journey charges before the invoice is raised." },
              ],
            },
            {
              src: "/assets/freight-invoicing/invoice-settlement.png",
              title: "9. Track settlement against the issued invoice",
              description: "A partially settled invoice shows the amount paid, the balance due, and the next settlement action. The invoice parties and journey table remain in view.",
              showCaption: true,
              callouts: [
                { area: [1, 19.7, 98, 7.5], block: "Settlement action", detail: "The banner surfaces the remaining balance and the next action." },
                { area: [67, 48.5, 32, 12.5], block: "Settlement details", detail: "Paid and due amounts sit inside the issued invoice details." },
                { area: [1, 77.2, 98, 17], block: "Journey traceability", detail: "The journeys that make up the invoice remain available during settlement." },
              ],
            },
          ),
        ],
      },
      {
        title: "How I Designed the Review Experience",
        blocks: [
          paragraphs(
            "I separated delivery status, billing readiness, and approval. An executive could see why a completed journey was still blocked and fix the underlying input. A manager needed the bill total, the exceptions, and the evidence behind each decision before approving it. The pending-approval queue shows which side needs to act, and the bill detail shows what that action is about.",
          ),
          subsections(
            {
              title: "Why tables and summaries",
              paragraphs: [
                "I used tables for decisions that depend on exact amounts. Aligning the contracted rate, submitted amount, and variance lets a reviewer compare them at a glance and approve or reject that charge from the same row. It also makes it possible to scan several journeys for exceptions before opening one.",
                "Summary cards answer a different question. The approved total and journey count show what has rolled into a pro-forma. The settlement summary puts the amount paid next to what is still due. In both views, the underlying rows remain available when a reviewer needs to explain the total.",
              ],
            },
            {
              title: "Charge row variants",
              paragraphs: [
                "The same row can represent a load charge or a journey charge, and either party can add one. The action cell changes with the state. It can show who needs to respond, offer Approve and Reject, or retain an approval with an Undo action where allowed. Provisional and missing amounts also have their own states.",
              ],
            },
          ),
          gallery(
            {
              src: "/assets/freight-invoicing/component-charge-pending.png",
              title: "Waiting on the consignor",
              description: "The table names the party that needs to respond and shows when its amount is still missing.",
              showCaption: true,
            },
            {
              src: "/assets/freight-invoicing/component-charge-mixed.png",
              title: "Different decisions on the same bill",
              description: "Approved base freight, add-ons available for review, and a charge waiting on the transporter share the same table.",
              showCaption: true,
            },
          ),
          subsections(
            {
              title: "Pro-forma card states",
              paragraphs: [
                "The card gives the pro-forma a consistent place on the bill. Before grouping, it explains that no pro-forma exists. Once open, it shows the reference and cycle. Closing the pro-forma adds the closed date in the same panel.",
              ],
            },
          ),
          {
            type: "gallery",
            paired: true,
            images: [
              {
                src: "/assets/freight-invoicing/component-pro-forma-open.png",
                title: "Open",
                description: "Name, created date, and billing cycle.",
                showCaption: true,
              },
              {
                src: "/assets/freight-invoicing/component-pro-forma-closed.png",
                title: "Closed",
                description: "The same fields, plus the closed date.",
                showCaption: true,
              },
            ],
          },
        ],
      },
      {
        title: "What I’d Take Forward",
        blocks: [
          paragraphs(
            "The design needed to make ownership as clear as status. A charge marked Pending Approval still leaves work for someone. Showing which party needs to respond, the evidence they should check, and what they can do next gives that status a purpose.",
            "The LEGO-like structure works because each block passes the same trip and charge records to the next step. One client can reconcile charges on a pro-forma before raising the invoice. Another can raise the invoice first and record an agreed adjustment through a credit or debit note. In both cases, a reviewer can follow the amount back to the original charge and delivery evidence.",
          ),
          subsections(
            {
              title: "Proposed success metrics",
              paragraphs: [
                "In a pilot, I’d compare these measures against each client’s baseline and group the results by whether reconciliation happens before or after invoice issuance.",
              ],
              bullets: [
                "Median time from trip completion to invoice issuance.",
                "Share of submitted bills returned for missing information.",
                "Median time from dispute creation to resolution.",
                "Share of review tasks where a reviewer can trace the amount to the original charge without asking the other team.",
              ],
            },
          ),
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
    media: mediaImage("/assets/aftercrop/hero.avif", "Aftercrop warehouse operations across desktop and mobile", "w-full h-auto object-cover"),
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
          paragraphs(
            "We started with three focus areas for the initial prototype: mobile-first usability, keeping the process as close as possible to how warehouses already work, and building enough control into the system so owners could trust the data.",
          ),
          spotlights(
            {
              eyebrow: "Focus 1: Easy to use mobile-first design",
              title: "Tables vs Lists and Cards",
              imagePosition: "left",
              image: {
                src: "/assets/aftercrop/incoming-shipments.webp",
                alt: "Aftercrop incoming shipments mobile screen",
                className: "h-[30rem] sm:h-[34rem] object-contain",
              },
              paragraphs: [
                "Tables are the most prominent way of displaying information, but they are terrible interfaces for small screens like mobile phones. We replaced report-style tables with cards and lists, carefully choosing just the right amount of information for each view.",
                "We kept some of the interaction language similar to native mobile apps so users who had never used web software before would not find it disruptive. The goal was a continuous flow of information from the first list to the most detailed record.",
              ],
            },
            {
              eyebrow: "As little typing as possible",
              title: "Selection inputs over keyboard-heavy forms",
              imagePosition: "right",
              image: {
                src: "/assets/aftercrop/new-shipment.webp",
                alt: "Aftercrop new shipment mobile form",
                className: "h-[30rem] sm:h-[34rem] object-contain",
              },
              paragraphs: [
                "We used intuitive UI elements like switches and selection inputs so users could skip typing whenever possible. Taps, swipes, and right-place actions mattered more than forcing long form filling on a phone.",
                "Because the app was easy to use, there was no separate training phase needed for adaptation. Most users felt comfortable within a day or two, and the product was fast enough that they were not waiting around on loading screens.",
              ],
            },
            {
              eyebrow: "Focus 2: Process as similar as possible to the current flow",
              title: "Simplifying the most used screen",
              imagePosition: "left",
              image: {
                src: "/assets/aftercrop/shipment-details.webp",
                alt: "Aftercrop shipment details mobile screen",
                className: "h-[30rem] sm:h-[34rem] object-contain",
              },
              paragraphs: [
                "The incoming shipment flow was the most important page in the application. After repeatedly observing unloading operations and interviewing managers, we saw the same pain point: too many handwritten receipts and ledger entries to track while stock was being received.",
                "We reduced the flow into three clear sections and optimized for one metric: the time it takes a manager to complete the form. For a minimal submission, a manager could add an entire incoming shipment in a couple of minutes.",
              ],
            },
            {
              eyebrow: "A familiar add-to-cart like experience",
              title: "Stock turned into a picking workflow",
              imagePosition: "right",
              image: {
                src: "/assets/aftercrop/stock.webp",
                alt: "Aftercrop stock mobile screen",
                className: "h-[30rem] sm:h-[34rem] object-contain",
              },
              paragraphs: [
                "The next most important workflow was outgoing shipment creation. Managers needed to select the right stock locations, update balances, and move items into a truck without spending time in tedious forms.",
                "We visualized the outgoing flow as something closer to an add-to-cart experience from e-commerce. A manager could pick stock directly from the list and add it to the truck, leaning on powerful filtering instead of filling repeated forms.",
              ],
            },
            {
              eyebrow: "Focus 3: Data security",
              title: "User roles and permissions",
              imagePosition: "left",
              image: {
                src: "/assets/aftercrop/users.webp",
                alt: "Aftercrop users and roles screen",
                className: "h-[30rem] sm:h-[34rem] object-contain",
              },
              paragraphs: [
                "One of the most common customer requirements was simple: a warehouse manager should not be able to edit a record unless an admin approves it. Owners needed control without turning the product into an enterprise setup project.",
                "We introduced role-based access so each user reflected a real warehouse responsibility. Owners could allow creation while restricting edits or deletes, which made the system safer without making it harder to use.",
              ],
            },
            {
              eyebrow: "Even the security guard can use it",
              title: "Vehicle logs with minimal input",
              imagePosition: "right",
              image: {
                src: "/assets/aftercrop/vehicle-logs.webp",
                alt: "Aftercrop vehicle logs screen",
                className: "h-[30rem] sm:h-[34rem] object-contain",
              },
              paragraphs: [
                "A full audit of vehicles entering and leaving the warehouse becomes critical during emergencies, but the people working at the gate are often not comfortable with complex software.",
                "The vehicle logs page became one of the simplest screens we built. It focused on one primary field, the vehicle number, and a single clear action: mark when the vehicle left. That kept the workflow usable for the people who actually needed to perform it.",
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
          gallery(
            {
              src: "/assets/swiggy/swiggy-home-feed-box-callout.png",
              title: "Box Entry Point",
              description: "The subscription entry starts inside the existing home feed, using a box callout to push users toward meal planning without forcing them into a separate unfamiliar flow.",
              imageClass: "h-[32rem] sm:h-[36rem] md:h-[40rem] object-contain",
            },
            {
              src: "/assets/swiggy/swiggy-home-feed.png",
              title: "Home Feed Integration",
              description: "The feature lives inside the normal Swiggy browsing experience so users can discover meal subscriptions while ordering from restaurants they already know.",
              imageClass: "h-[32rem] sm:h-[36rem] md:h-[40rem] object-contain",
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
          gallery(
            {
              src: "/assets/swiggy/swiggy-menu-subscription.png",
              title: "Subscription Menu Flow",
              description: "Food selection feels like regular ordering: browse a restaurant, add items, and move toward a subscription plan without learning a brand-new interaction model.",
              imageClass: "h-[32rem] sm:h-[36rem] md:h-[40rem] object-contain",
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
    title: "To Do Reimagine App",
    tagline: "Reimagining task management for employees working from home",
    backHref: "/#apps",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Type", value: "App Redesign" },
      { label: "Timeline", value: "Case Study" },
    ],
    media: mediaImage(
      "/assets/todo/todo-daily-overview.avif",
      "To Do Reimagine daily overview screen",
      "mx-auto w-auto max-w-full max-h-[34rem] sm:max-h-[40rem] object-contain",
    ),
    sections: [
      {
        title: "Introduction - Problem",
        blocks: [
          paragraphs(
            "In this 21st century, everyone is so busy that they often forget small household tasks like calling a friend, getting milk, or following up on a personal errand. At the same time, many people also miss important work meetings or commitments.",
            "Working in corporate offices needs your undivided attention during working hours, and missing any event can lead to a loss of your colleague's time and company revenue.",
            "Life is all about balancing work life and personal life. If you focus too much on one, you miss out on the other and ruin that balance.",
            "People use generic to-do lists and reminders to manage day-to-day tasks, but the question I wanted to explore was whether those generic tools actually work for the current era of people working from home.",
          ),
          quote("Do generic to-do lists work for the current era of people working from home?"),
        ],
      },
      {
        title: "Target Users",
        blocks: [
          paragraphs(
            "I chose employees working from home as the primary users for this concept.",
          ),
        ],
      },
      {
        title: "Why These Users?",
        blocks: [
          paragraphs(
            "Even though office timings are usually clear, personal life and work life constantly conflict for employees working from home. Even when they are expected to work a 9-to-6 schedule, they still need to attend to household chores and personal tasks in between meetings and work.",
            "For these users, easy management of day-to-day work tasks and personal tasks in one system becomes especially important.",
          ),
        ],
      },
      {
        title: "Understanding User Behaviour",
        blocks: [
          paragraphs(
            "I talked with five users about their experience of working from home and managing their day-to-day personal tasks and work tasks. That research surfaced a set of recurring pain points around fragmentation, anxiety, and friction in everyday task management.",
          ),
          spotlights(
            {
              title: "Research patterns from 5 user conversations",
              paragraphs: [
                "The interviews made one thing clear: users were not struggling because they lacked a task list. They were struggling because their tasks lived across separate contexts, their current tools created more friction than clarity, and rescheduling everyday work was heavier than it should be.",
              ],
              image: {
                src: "/assets/todo/todo-research-board.avif",
                alt: "Sticky-note synthesis board from To Do user research",
                className: "w-full rounded-2xl border border-border/60",
              },
              imagePosition: "right",
            },
          ),
          bullets(
            [
              "Work tasks and personal tasks would be in different accounts or linked to different email accounts. Both tasks can't be seen in one account or a single app, and finding conflicting tasks is hard.",
              "Some to-do apps don't work cross-platform or don't sync to multiple devices.",
              "Many apps in the market show the number of tasks left. That number can create anxiety when tasks start piling up.",
              "Existing to-do apps provide simple read-only widgets. Users need to open the app to do anything else.",
              "In many current apps, adding new tasks is tedious and requires a lot of input. Most apps also do not integrate voice assistants like Siri, Google Assistant, and Alexa.",
              "Recurring low-priority personal tasks like getting a haircut every 25 days remain annoyingly visible and are hard to postpone.",
              "Existing to-do apps do not make it easy to integrate tasks from tools and calendars like Google Calendar and Microsoft Outlook.",
              "Rescheduling missed tasks is usually hard because users need to re-enter too much information.",
            ],
            true,
          ),
        ],
      },
      {
        title: "Redefined Problem Statement",
        blocks: [
          paragraphs(
            "A work-from-home employee finds it difficult to manage day-to-day personal tasks and work tasks together. Sometimes urgent personal work is forgotten during office meetings, and other times work-related tasks are missed because of personal distractions.",
            "This mismanagement creates frustration for the employee and weakens the balance between work life and personal life.",
          ),
        ],
      },
      {
        title: "Building Re-imagined To Do App",
        blocks: [
          paragraphs(
            "To make the app simple, easy to use, and able to stay out of the way, I focused on a few features that directly reduce friction for employees working from home.",
          ),
          bullets(
            [
              {
                title: "Unified view of work and personal tasks",
                text: "Show all tasks from the work account and personal account in one place, with a clear distinction between work and personal tasks so users can plan their day better.",
              },
              {
                title: "Voice assistants and natural language processing",
                text: "Reduce the time required to add a new task and make task capture possible through assistants like Siri, Google Assistant, and Alexa.",
              },
              {
                title: "Cross-device support and sync",
                text: "Support employees who move between computers, laptops, and mobile devices by keeping the experience available and synchronized across all devices.",
              },
              {
                title: "\"Free time\" instead of task count",
                text: "Show the free time in a day as a more meaningful summary instead of a stressful number of incomplete tasks.",
              },
              {
                title: "Smart postponing",
                text: "Allow low-priority recurring tasks to be postponed intelligently based on the user's schedule.",
              },
              {
                title: "Useful widgets",
                text: "Create simpler, more useful widgets for things like what's next and free time for the day.",
              },
              {
                title: "Family sharing",
                text: "Share tasks or availability with family members so they know when not to disturb users during office meetings.",
              },
            ],
            true,
          ),
          spotlights(
            {
              eyebrow: "Feature 1",
              title: "A single daily view with work and personal context together",
              paragraphs: [
                "The home screen brings tasks from both work and personal life into one place, helping users understand what the day looks like at a glance. The separation between work time, personal time, and available free time helps users reason about the day instead of just counting unfinished tasks.",
              ],
              image: {
                src: "/assets/todo/todo-daily-overview.avif",
                alt: "To Do daily overview screen",
                className: "mx-auto max-w-[19rem]",
              },
              imagePosition: "right",
            },
            {
              eyebrow: "Feature 2",
              title: "Task capture through voice instead of manual input",
              paragraphs: [
                "Adding a task should not feel heavier than the task itself. By using voice assistants and natural language, the app reduces the time it takes to capture something quickly while the user is moving between calls, errands, and household interruptions.",
              ],
              image: {
                src: "/assets/todo/todo-voice-assistant-black.png",
                alt: "Voice assistant task capture concept",
                className: "mx-auto max-w-[20rem] rounded-2xl",
              },
              imagePosition: "left",
            },
            {
              eyebrow: "Feature 3",
              title: "Cross-device reminders for a work-from-home routine",
              paragraphs: [
                "Employees working from home use computers, laptops, and mobile devices throughout the day. Designing an app that supports and syncs across all of those surfaces makes reminders more reliable and more useful in real life.",
              ],
              image: {
                src: "/assets/todo/todo-cross-device-sync.svg",
                alt: "Cross-device sync concept for To Do",
                className: "w-full rounded-2xl border border-border/60",
              },
              imagePosition: "right",
            },
            {
              eyebrow: "Feature 4",
              title: "Task creation and sharing that stays lightweight",
              paragraphs: [
                "Recurring tasks, sharing with family, setting priorities, and adding sub-tasks all need to be possible without turning task creation into a long form. The flow keeps those controls available while still feeling simple enough for everyday use.",
              ],
              image: {
                src: "/assets/todo/todo-task-creation-black.png",
                alt: "Task creation and sharing flow for To Do",
                className: "w-full rounded-2xl",
              },
              imagePosition: "left",
            },
          ),
        ],
      },
      {
        title: "Information Architecture",
        blocks: [
          paragraphs(
            "The information architecture was organized around a simple homepage with three main directions: adding and managing tasks, completing tasks, and managing profile-level settings like family members and sync sources.",
          ),
          figure({
            src: "/assets/todo/todo-information-architecture.svg",
            alt: "Information architecture diagram for To Do Reimagine App",
            title: "Information Architecture",
            description:
              "A simplified flow from homepage to task creation, profile settings, calendar sync, priorities, sharing, and completion.",
            figureClass: "overflow-hidden rounded-2xl border border-border bg-black",
            imageClass: "block w-full h-auto object-contain bg-black p-3 sm:p-4 md:p-6",
          }),
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
