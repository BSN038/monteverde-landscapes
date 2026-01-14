/* =========================================================
   Services Content – Monteverde Landscapes
   Single source of truth for Services page copy.
   Notes:
   - Keep copy professional, reassuring, and specific.
   - Avoid fluff; communicate process, options, and standards.
   - This file is safe to expand later (pricing tiers, FAQs, etc.).
   ========================================================= */

export type ServiceItem = {
  id: "landscape-design" | "design-build" | "garden-maintenance";
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export const SERVICES_PAGE = {
  heading: "Services",
  intro:
    "We deliver structured landscaping services—from advice and design to full build delivery and ongoing care. Our focus is clarity: you understand the options, the materials, the timeline, and the plan before work begins.",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "landscape-design",
    title: "Landscape Design",
    subtitle: "Consultation • Options • Budget-led planning",
    description:
      "We begin by listening. We take time to understand what you want, how you use the space, and what level of maintenance fits your lifestyle. If you already have a clear vision, we refine it and prepare it for smooth execution. If you’re open to ideas, we propose practical options and layouts that match your priorities and budget—from cost-effective slab-and-gravel solutions to premium finishes like Indian stone or porcelain.",
    highlights: [
      "Client-first consultation (we listen before we propose)",
      "Material options aligned to budget and goals",
      "Clear recommendations for layout, levels, drainage, and planting",
    ],
  },
  {
    id: "design-build",
    title: "Design & Build",
    subtitle: "Measured quoting • Planned delivery • Quality guaranteed",
    description:
      "Once the direction is agreed, we manage the entire build professionally. We take site measurements, explain what the project includes, and walk you through the materials and process—so there are no surprises. After you approve the quote, we set a defined start date and a realistic completion schedule. We deliver every project based on a plan, following professional standards and legal requirements, and we install the exact quality level you have paid for—no substitutions, no shortcuts.",
    highlights: [
      "Accurate measurements and a clearly scoped quote",
      "Planned start date and completion target",
      "Professional delivery with standards and legal compliance",
      "Materials and finishes match the approved specification",
    ],
  },
  {
    id: "garden-maintenance",
    title: "Garden Maintenance",
    subtitle: "Ongoing care • Small upgrades • Low-maintenance improvements",
    description:
      "We provide reliable maintenance to keep your garden healthy, tidy, and consistent through the seasons. We also help clients upgrade existing spaces without a large budget—replacing fences, building timber or brick borders, refreshing planting, and introducing low-maintenance gravel-and-border solutions that make a meaningful visual difference. Ideal for busy homeowners who want a cleaner, better garden without constant upkeep.",
    highlights: [
      "Routine maintenance programs for year-round consistency",
      "Fence upgrades, borders (brick or timber), and planting refreshes",
      "Budget-friendly improvements with high visual impact",
    ],
  },
];
