/* =========================================================
   Services – Monteverde Landscaping
   Premium marketing layout, consistent with Projects/Process
   ========================================================= */

import Link from "next/link";

type Service = {
  title: string;
  description: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    title: "Garden Transformations",
    description:
      "Full renovations for outdated or unfinished gardens—improving layout, flow, and usability with a clean, durable finish.",
    bullets: ["Layout improvements", "Clear staging + tidy site", "Built for long-term use"],
  },
  {
    title: "Patios & Paved Areas",
    description:
      "Professionally installed patios using Indian sandstone, porcelain paving, or concrete slabs—planned properly and finished neatly.",
    bullets: ["Indian sandstone", "Porcelain paving", "Concrete slabs"],
  },
  {
    title: "Ground Preparation & Finishing",
    description:
      "Proper preparation that makes everything last: excavation, levels, drainage, and a solid base before any final surface goes down.",
    bullets: ["Excavation + levels", "Drainage planning", "Solid foundations"],
  },
  {
    title: "Resin-Bound Surfaces",
    description:
      "Modern resin-bound installations for driveways, pathways, and patios—clean lines, low maintenance, and a refined look.",
    bullets: ["Smooth finish", "Low maintenance", "Contemporary appearance"],
  },
  {
    title: "Gravel Systems & Borders",
    description:
      "Decorative gravel and structured edging to define spaces, reduce maintenance, and keep the garden looking tidy.",
    bullets: ["Brick edging", "Defined planting zones", "Clean, practical finish"],
  },
  {
    title: "Turf & Artificial Grass",
    description:
      "Natural turf and artificial grass installed with the correct groundwork so it stays level, drains well, and looks consistent.",
    bullets: ["Proper base build-up", "Neat edges", "Durable, even finish"],
  },
];

export default function ServicesPage() {
  return (
    <section>
      <div className="container" style={{ padding: "4rem 0" }}>
        {/* Elastic green header panel (same pattern as Projects/Process) */}
        <header style={{ width: "100%", marginBottom: "2.25rem" }}>
          <div
            style={{
              background: "var(--color-primary)",
              borderRadius: "18px",
              padding: "1.9rem 2rem",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
              width: "100%",
            }}
          >
            <h1 style={{ margin: 0, color: "#F1E7D3" }}>Services</h1>

            <p
              style={{
                marginTop: "0.95rem",
                marginBottom: 0,
                color: "#F1E7D3",
                opacity: 0.92,
                fontWeight: 600,
                maxWidth: 980,
              }}
            >
              Monteverde Landscaping is a locally based team specialising in garden transformations,
              patios, ground preparation, and finishing works—delivering outdoor spaces that feel
              clean, practical, and built to last.
            </p>

            <p style={{ marginTop: "1rem", color: "#F1E7D3", opacity: 0.92, maxWidth: 980 }}>
              We work with Indian sandstone, porcelain paving, concrete slabs, resin-bound surfaces,
              gravel systems, turf, and artificial grass. Every job is planned properly—so the
              result looks right on day one and stays strong through the seasons.
            </p>

            <p style={{ marginTop: "1rem", color: "#F1E7D3", opacity: 0.92, maxWidth: 980 }}>
              We keep standards high by taking on a limited number of projects at a time. That
              means clearer communication, an organised site, and consistent workmanship from
              preparation through to finish.
            </p>

            <p style={{ marginTop: "1rem", color: "#F1E7D3", opacity: 0.92, marginBottom: 0 }}>
              <strong>Areas we cover:</strong> Wigan, Warrington, St Helens & surrounding areas.{" "}
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

        {/* Coverage map (static image) */}
        <section style={{ marginBottom: "2.5rem" }}>
          {/* Coverage section: forced 50/50 layout (map left + green box right) */}
          <section style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                alignItems: "stretch",
              }}
            >
              {/* Left: Map (50%) */}
              <div style={{ height: "100%" }}>
                <img
                  src="/images/projects/coverage-map.png"
                  alt="Service coverage area: Wigan, Warrington, St Helens and surrounding areas"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "320px",
                    objectFit: "cover",
                    borderRadius: "18px",
                    display: "block",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                  }}
                />
              </div>

              {/* Right: Green services box (50%) */}
              <aside
                style={{
                  background: "var(--color-primary)",
                  borderRadius: "18px",
                  padding: "1.6rem 1.6rem",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
                  color: "#F1E7D3",
                  minHeight: "320px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: "#F1E7D3" }}>What we build</h3>

                  <p style={{ marginTop: "0.75rem", marginBottom: 0, opacity: 0.92 }}>
                    The core services we deliver across residential projects—planned properly and finished cleanly.
                  </p>

                  <ul style={{ margin: "1.1rem 0 0", paddingLeft: "1.1rem" }}>
                    <li style={{ marginTop: "0.35rem" }}>Resin-bound surfaces</li>
                    <li style={{ marginTop: "0.35rem" }}>Porcelain & concrete slab patios</li>
                    <li style={{ marginTop: "0.35rem" }}>Indian sandstone patios</li>
                    <li style={{ marginTop: "0.35rem" }}>Fencing & privacy screening</li>
                    <li style={{ marginTop: "0.35rem" }}>Artificial grass installation</li>
                    <li style={{ marginTop: "0.35rem" }}>Natural turf (new lawns)</li>
                    <li style={{ marginTop: "0.35rem" }}>Raised brick planters (planter beds)</li>
                    <li style={{ marginTop: "0.35rem" }}>Ground preparation & drainage</li>
                    <li style={{ marginTop: "0.35rem" }}>Gravel systems & edging</li>
                    <li style={{ marginTop: "0.35rem" }}>Pathways & steps</li>
                  </ul>
                </div>

                <div style={{ marginTop: "1.25rem" }}>
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
                </div>
              </aside>
            </div>

            {/* Mobile fallback (inline, no styled-jsx): stack on small screens */}
            <div
              style={{
                height: 0,
                overflow: "hidden",
              }}
              aria-hidden="true"
            />
          </section>

          <p
            style={{
              marginTop: "0.85rem",
              marginBottom: 0,
              color: "var(--color-text-secondary)",
              maxWidth: 920,
            }}
          >
            Coverage is focused around Wigan, Warrington, and St Helens. If you’re nearby, send your
            postcode and we’ll confirm availability.
          </p>
        </section>

        {/* Services grid (keeps the “green boxes” style via service-card-button) */}
        <div className="services-grid" style={{ rowGap: "1.5rem" }}>
          {SERVICES.map((s) => (
            <article key={s.title} className="service-card-button">
              <h3 style={{ margin: 0 }}>{s.title}</h3>
              <p style={{ marginTop: "0.85rem", marginBottom: 0 }}>{s.description}</p>

              <ul style={{ margin: "1.1rem 0 0", paddingLeft: "1.1rem" }}>
                {s.bullets.map((b) => (
                  <li key={b} style={{ marginTop: "0.35rem" }}>
                    {b}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "1.25rem" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  Ask a question →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <section style={{ marginTop: "3.25rem" }}>
          <article className="service-card-button">
            <h3 style={{ margin: 0 }}>Want pricing for your project?</h3>
            <p style={{ marginTop: "0.85rem", marginBottom: 0, maxWidth: 760 }}>
              Share a few details and we’ll come back with a clear next step. Quotes are simple,
              straightforward, and based on the real scope of work.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginTop: "1.25rem",
              }}
            >
              <Link
                href="/quote"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "14px",
                  background: "var(--color-primary)",
                  padding: "0.85rem 1.1rem",
                  color: "#F1E7D3",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Request a quote
              </Link>

              <Link
                href="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "14px",
                  border: "1px solid rgba(22,64,48,0.25)",
                  padding: "0.85rem 1.1rem",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  textDecoration: "none",
                  background: "white",
                }}
              >
                View projects
              </Link>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
