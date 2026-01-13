/* =========================================================
   Hero – Monteverde Landscapes
   Projects-first positioning (premium design + build).
   ========================================================= */

import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(180deg, rgba(47,93,58,0.06) 0%, rgba(247,245,240,0) 70%)",
      }}
    >
      <div className="container" style={{ padding: "4.5rem 0 3.5rem" }}>
        <p
          style={{
            margin: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.65rem",
            borderRadius: "999px",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text-secondary)",
            fontSize: "0.9rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "var(--color-primary-muted)",
              display: "inline-block",
            }}
          />
          Premium outdoor design & build
        </p>

        <h1
          style={{
            marginTop: "1.25rem",
            marginBottom: "0.9rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontSize: "clamp(2.1rem, 4.2vw, 3.3rem)",
            maxWidth: 980,
          }}
        >
          Transform your outdoor space with{" "}
          <span style={{ color: "var(--color-primary)" }}>
            craftsmanship that lasts
          </span>
          .
        </h1>

        <p
          style={{
            marginTop: 0,
            maxWidth: 760,
            color: "var(--color-text-secondary)",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
          }}
        >
          From concept to completion—designed landscapes, patios, and garden
          builds finished with premium materials and meticulous detailing.
          Clear timelines, clean work, and a finish you’ll be proud of.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.9rem",
            marginTop: "1.75rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85rem 1.15rem",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              boxShadow: "var(--shadow-md)",
              transition: "var(--transition-base)",
              fontWeight: 600,
            }}
          >
            View Projects
          </Link>

          <Link
            href="/quote"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.85rem 1.15rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text-primary)",
              boxShadow: "var(--shadow-sm)",
              transition: "var(--transition-base)",
              fontWeight: 600,
            }}
          >
            Request a Quote
          </Link>

          <span style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Typical reply within 24 hours
          </span>
        </div>

        <div
          style={{
            marginTop: "2.25rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            color: "var(--color-text-secondary)",
            fontSize: "0.95rem",
          }}
        >
          <span>Design • Build • Finishing</span>
          <span>Premium materials</span>
          <span>Clean, respectful worksite</span>
        </div>
      </div>
    </section>
  );
}
