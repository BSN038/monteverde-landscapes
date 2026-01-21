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
    title: "Indian Sandstone Patio (Garswood)",
    subtitle: "33sqm • Curved layout • Durable, natural finish",
    description:
      "A 33sqm Indian sandstone patio installed with smooth curves and careful groundwork to create a practical, durable outdoor space. The natural stone finish enhances the garden’s character while providing a clean, long-lasting seating area in Garswood.",
    highlights: [
      "Full groundwork preparation",
      "Curved edges for a softer layout",
      "Natural stone for long-term durability",
    ],
    imageSrc: "/images/projects/project-01-indian-sandstone-01.png",
    imageAlt:
      "Indian sandstone patio with curved layout and clean, durable finish in Garswood",
  },
  {
    title: "Brick Borders + Decorative Gravel (Wigan)",
    subtitle: "Low maintenance • Clean structure • Better drainage",
    description:
      "Brick borders installed to define planting areas, finished with decorative gravel for a clean, low-maintenance garden layout. This project improves structure, drainage, and overall appearance while keeping the space practical and easy to maintain in Wigan.",
    highlights: [
      "Brick edging to define planting zones",
      "Decorative gravel for a tidy finish",
      "Improved structure + drainage",
    ],
    imageSrc: "/images/projects/project-02-brick-borders-gravel-01.png",
    imageAlt:
      "Garden with brick borders defining planting areas and decorative gravel for a low maintenance finish in Wigan",
  },
  {
    title: "Resin Bound Driveway (Wigan)",
    subtitle: "Permeable finish • Clean lines • Low maintenance",
    description:
      "A durable resin bound driveway installed with proper base preparation for a smooth, permeable, and low-maintenance finish. Brick edging provides clean definition while enhancing the overall appearance of the property in Wigan.",
    highlights: [
      "Resin bound (permeable drainage)",
      "Proper base preparation for longevity",
      "Brick edging for crisp definition",
    ],
    imageSrc: "/images/projects/project-03-resin-bound-driveway-01.png",
    imageAlt:
      "Resin bound driveway with brick edging, smooth permeable finish and clean definition in Wigan",
  },
  {
    title: "Artificial Lawn Installation (Wigan)",
    subtitle: "28sqm • Clean edging • Practical, tidy finish",
    description:
      "A 28sqm artificial lawn installed with proper groundwork to ensure a level, durable, and low-maintenance finish. Finished with clean edging and decorative gravel borders, creating a tidy and practical garden space in Wigan.",
    highlights: [
      "Proper groundwork for a level base",
      "Neat edging for a crisp outline",
      "Decorative gravel borders for a clean look",
    ],
    imageSrc: "/images/projects/project-04-artificial-lawn-01.png",
    imageAlt:
      "Artificial lawn installation with clean edging and decorative gravel borders for a tidy low maintenance garden in Wigan",
  },
  {
    title: "Grey Slab Patio (Warrington)",
    subtitle: "Porcelain look • Modern finish • Low maintenance",
    description:
      "A clean, modern porcelain patio installed with full groundwork preparation to ensure a level, durable, and low-maintenance finish. This 9sqm project adds a practical seating area while giving the garden a sharp, contemporary look in Warrington.",
    highlights: [
      "Full groundwork preparation",
      "Modern grey slab finish",
      "Practical seating area with minimal upkeep",
    ],
    imageSrc: "/images/projects/project-05-grey-slabs-patio-01.png",
    imageAlt:
      "Modern grey slab patio with clean lines and low maintenance finish in Warrington",
  },
  {
    title: "Resin Bound Patio (Wigan)",
    subtitle: "Low-maintenance finish • Clean look • Practical outdoor space",
    description:
      "This residential project in Wigan involved a full outdoor upgrade, featuring a resin bound patio installed with proper ground preparation to create a clean, durable, and low-maintenance seating area. Additional works included fence painting, wall rendering for a smooth modern finish, and the installation of a new shed for practical storage.",
    highlights: [
      "Resin bound surface with full ground preparation",
      "Painted and refreshed fencing",
      "Rendered wall with clean, modern finish",
      "New shed installation for added storage",
    ],
    imageSrc: "/images/projects/Resind-Patio-Wigan.png",
    imageAlt:
      "Resin bound patio in Wigan with clean layout, painted fences, rendered wall and newly installed garden shed",
  },
];

export default function ProjectsPage() {
  return (
    <section>
      <div className="container" style={{ padding: "4rem 0" }}>
        {/* Page Heading (now inside dark-green rounded panel) */}
        <header style={{ width: "100%", marginBottom: "3rem" }}>
          <div
            style={{
              background: "var(--color-primary)",
              borderRadius: "18px",
              padding: "1.9rem 2rem",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
              width: "100%",
            }}
          >

            <h1 style={{ margin: 0, color: "#F1E7D3" }}>Projects</h1>

            <p style={{ marginTop: "0.9rem", color: "#F1E7D3", opacity: 0.92 }}>
              Below are a few real transformations we’ve completed across the North West.
              Each one is planned properly, built on solid groundwork, and finished cleanly—
              so the space looks right now and stays strong season after season.
            </p>

            <p style={{ marginTop: "0.85rem", marginBottom: 0, color: "#F1E7D3" }}>
              Want a similar outcome on your property?{" "}
              <Link
                href="/quote"
                style={{
                  color: "#F1E7D3",
                  fontWeight: 800,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Request a quote
              </Link>
              .
            </p>
          </div>
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
