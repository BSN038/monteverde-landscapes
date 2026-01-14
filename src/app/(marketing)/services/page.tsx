/* =========================================================
   Services Page – Monteverde Landscapes
   Notes:
   - Pulls copy from src/content/services.ts (single source of truth)
   - Keeps the existing grid + card styling intact
   - Server Component safe (no event handlers)
   ========================================================= */

import { SERVICES, SERVICES_PAGE } from "@/content/services";

export default function ServicesPage() {
  return (
    <section>
      <div className="container" style={{ padding: "4rem 0" }}>
        {/* Page Heading */}
        <header style={{ maxWidth: 680, marginBottom: "3rem" }}>
          <h1>{SERVICES_PAGE.heading}</h1>
          <p style={{ marginTop: "1rem" }}>{SERVICES_PAGE.intro}</p>
        </header>

        {/* Services Grid */}
        <div className="services-grid" style={{ rowGap: "1.5rem" }}>
          {SERVICES.map((service) => (
            <article key={service.id} className="service-card-button">
              <h3 style={{ margin: 0 }}>{service.title}</h3>

              {/* Subtitle (kept lightweight for fast scanning) */}
              <p
                style={{
                  marginTop: "0.5rem",
                  marginBottom: 0,
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                }}
              >
                {service.subtitle}
              </p>

              {/* Main description */}
              <p style={{ marginTop: "0.85rem", marginBottom: 0 }}>
                {service.description}
              </p>

              {/* Highlights (reinforces trust + clarity) */}
              <ul style={{ margin: "1.1rem 0 0", paddingLeft: "1.1rem" }}>
                {service.highlights.map((h) => (
                  <li key={h} style={{ marginTop: "0.35rem" }}>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
