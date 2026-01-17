/* =========================================================
   Projects Page – Monteverde Landscapes
   Goals:
   - Premium, editorial project grid
   - Coherent card styling with Services
   - Image-first scanning + high-conversion copy
   ========================================================= */

import Link from "next/link";

type ProjectCard = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
};

const PROJECTS: ProjectCard[] = [
  {
    title: "Modern Courtyard Renewal",
    subtitle: "Design + Build • Clean lines, year-round structure",
    description:
      "A crisp, low-maintenance courtyard that feels refined from day one—balanced planting, strong hardscape geometry, and lighting that elevates evenings.",
    highlights: [
      "Architectural planting plan",
      "Stone + gravel detailing",
      "Low-maintenance palette",
    ],
    imageSrc: "/images/projects/modern-courtyard.png",
    imageAlt: "Modern courtyard landscape design with clean lines and architectural planting",
  },
  {
    title: "Front Entry Transformation",
    subtitle: "Curb Appeal • Instant impact from the street",
    description:
      "A welcoming approach that frames the home with layered greenery, seasonal interest, and a clear arrival moment—designed to look great in every season.",
    highlights: [
      "Entry framing + symmetry",
      "Evergreen structure",
      "Seasonal color rotation",
    ],
    imageSrc: "/images/projects/front-entry.png",
    imageAlt: "Front entry landscaping with clean walkway and layered planting",
  },
  {
    title: "Outdoor Living Terrace",
    subtitle: "Entertaining • Comfortable, durable, polished",
    description:
      "A functional outdoor room built for gatherings—defined zones, comfortable circulation, and a planting edge that softens the architecture without feeling busy.",
    highlights: [
      "Terrace zoning",
      "Privacy screening",
      "Soft-edged planting borders",
    ],
    imageSrc: "/images/projects/outdoor-terrace.png",
    imageAlt: "Outdoor living terrace with seating areas and refined planting",
  },
  {
    title: "Backyard Garden Sanctuary",
    subtitle: "Planting + Stewardship • A calm, natural feel",
    description:
      "A layered garden designed to mature beautifully—textures, heights, and seasonal rhythm that make the space feel intentional, peaceful, and lived-in.",
    highlights: [
      "Layered planting design",
      "Soil + bed renovation",
      "Long-term growth plan",
    ],
    imageSrc: "/images/projects/garden-sanctuary.png",
    imageAlt: "Backyard garden sanctuary with layered planting and natural textures",
  },
  {
    title: "Evergreen Privacy Screen",
    subtitle: "Landscape Upgrade • Quiet, elegant separation",
    description:
      "A discreet privacy solution using structured evergreens and supportive understory planting—creating separation without looking like a fence.",
    highlights: [
      "Evergreen backbone",
      "Understory texture",
      "Wind + sightline control",
    ],
    imageSrc: "/images/projects/privacy-screen.png",
    imageAlt: "Evergreen privacy screen using structured planting for separation",
  },
  {
    title: "Maintenance Program: Premium Care",
    subtitle: "Ongoing Service • Consistent, professional upkeep",
    description:
      "Weekly and seasonal care that protects your investment—pruning, cleanup, fertilization timing, and proactive plant health checks for a refined look year-round.",
    highlights: [
      "Seasonal pruning schedule",
      "Detail-oriented cleanup",
      "Plant health monitoring",
    ],
    imageSrc: "/images/projects/maintenance-premium-care.png",
    imageAlt: "Premium garden maintenance with clean edges and healthy planting",
  },
  {
    title: "Resin Bound Driveway Refresh (Wallden)",
    subtitle: "Low Maintenance • Permeable grey resin-bound finish",
    description:
      "A practical, modern driveway upgrade using grey resin-bound surfacing with a red brick border for definition. Beige brick planters filled with white stone add a clean, decorative finish—ideal for homeowners who want a tidy look without constant upkeep.",
    highlights: [
      "Grey resin-bound (permeable drainage)",
      "Red brick edging for crisp lines",
      "White stone + pots: low maintenance",
    ],
    imageSrc: "/images/projects/resin-bound-wallden-manchester.png",
    imageAlt:
      "Wallden Manchester home with grey resin-bound driveway, red brick border, beige brick planters with white stone and pots",
  },
  {
    title: "Budget Slabs + Gravel Garden (Liverpool)",
    subtitle: "Budget-Friendly • Fast transformation with minimal work",
    description:
      "A simple, affordable garden refresh using yellow slabs set into clean white gravel. Long timber planters bring strong colour through mixed roses and vibrant spring blooms—perfect for a quick upgrade without a big spend.",
    highlights: [
      "Yellow slabs set in white gravel",
      "Timber planters for instant colour",
      "Low-cost, easy-care layout",
    ],
    imageSrc: "/images/projects/low-cost-slabs-gravel-liverpool.png",
    imageAlt:
      "Liverpool rectangular garden with yellow paving slabs set in white gravel and long timber planters with colorful flowers",
  },
  {
    title: "Curved Pathway Garden (Low Maintenance)",
    subtitle: "Quality Finish • Natural lawn with bright seasonal borders",
    description:
      "A natural-lawn garden made easy: a gently curved path with grey 45×54 slabs, super-white gravel, and red brick edging for structure. Dense spring planting adds colour and impact while keeping the overall maintenance simple and predictable.",
    highlights: [
      "45×54 grey slabs with a soft curve",
      "Super-white gravel for a clean look",
      "Red brick edging + spring colour borders",
    ],
    imageSrc: "/images/projects/natural-lawn-curved-path-spring.png",
    imageAlt:
      "Natural lawn garden with a gently curved path using grey slabs, super white gravel, red brick edging, and abundant spring flowers",
  },

];

export default function ProjectsPage() {
  return (
    <section>
      <div className="container" style={{ padding: "4rem 0" }}>
        {/* Page Heading */}
        <header style={{ maxWidth: 720, marginBottom: "3rem" }}>
          <h1>Projects</h1>
          <p style={{ marginTop: "1rem" }}>
            Explore a selection of premium transformations—designed with restraint,
            built with precision, and maintained for long-term beauty.
          </p>

          {/* Quick conversion line */}
          <p style={{ marginTop: "0.75rem" }}>
            Want a similar outcome on your property?{" "}
            <Link
              href="/quote"
              style={{ color: "var(--color-primary)", fontWeight: 700 }}
            >
              Request a quote
            </Link>
            .
          </p>
        </header>

        {/* Project Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
        >
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="service-card-button"
              style={{
                width: "100%",
                maxWidth: 920,
                marginInline: "auto",
              }}
            >
              {/* Project Image */}
              <img
                src={p.imageSrc}
                alt={p.imageAlt}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Card Header */}
              <div style={{ marginBottom: "1.25rem" }}>
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <p
                  style={{
                    marginTop: "0.35rem",
                    marginBottom: 0,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {p.subtitle}
                </p>
              </div>

              {/* Card Body */}
              <p style={{ marginTop: 0 }}>{p.description}</p>

              {/* Highlights */}
              <ul style={{ margin: "1.1rem 0 0", paddingLeft: "1.1rem" }}>
                {p.highlights.map((h) => (
                  <li key={h} style={{ marginTop: "0.35rem" }}>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Soft CTA */}
              <div style={{ marginTop: "1.5rem" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  Talk about a project like this →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
