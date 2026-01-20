/* =========================================================
   Marketing Home – Monteverde Landscapes
   ========================================================= */

import Hero from "@/components/marketing/Hero";
import TrustBar from "@/components/marketing/TrustBar";
import ServicesGrid from "@/components/marketing/ServicesGrid";
import HowItWorks from "@/components/marketing/HowItWorks";
import ProjectHighlights from "@/components/marketing/ProjectHighlights";
import CTASection from "@/components/marketing/CTASection";

export default function MarketingHomePage() {
  return (
    <main>
      {/* Primary Hero (NO SE TOCA) */}
      <Hero />

      {/* =====================================================
         Premium Intro Section (NEW)
         ===================================================== */}
      <section
        style={{
          backgroundImage:
            "url('/images/hero/hero-garden-collage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Dark green overlay */}
        <div
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(47,93,58,0.35) 0%, rgba(47,93,58,0.15) 45%, rgba(247,245,240,0.05) 100%)",
            padding: "4.5rem 0",
          }}
        >

          <div className="container">
            <div
              style={{
                maxWidth: 960,
                display: "grid",
                gap: "2.5rem",
              }}
            >
              {/* Intro copy */}
              <div
                style={{
                  background: "rgba(47, 93, 58, 0.25)",
                  backdropFilter: "blur(2px)",
                  padding: "2.5rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#efe4cc",     // beige intenso
                    fontSize: "clamp(1.9rem, 3vw, 2.3rem)",
                    fontWeight: 700,      // bold real
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.015em",
                  }}
                >

                  Premium garden transformations, built to last
                </h2>

                <p
                  style={{
                    color: "#d8cfb8",
                    fontSize: "1.05rem",
                    fontWeight: 700,      // semi-bold elegante
                    lineHeight: 1.8,
                    marginBottom: "1.25rem",
                  }}
                >

                  At Monteverde Landscaping, we provide carefully planned
                  outdoor renovations across Wigan, Warrington, St Helens
                  and surrounding areas. Every project is approached with
                  precision, proper preparation, and a focus on long-term
                  performance.
                </p>

                <p
                  style={{
                    color: "#d8cfb8",
                    fontSize: "1.05rem",
                    fontWeight: 700,      // semi-bold elegante
                    lineHeight: 1.8,
                    marginBottom: "1.25rem",
                  }}
                >

                  Our process is straightforward and transparent. We believe
                  in honest advice, clear communication, and delivering
                  outdoor spaces that remain functional, attractive, and
                  durable for years to come.
                </p>
              </div>

              {/* Specialisms grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {[
                  {
                    title: "Full Garden Renovations",
                    text:
                      "Complete transformations for outdated or unfinished gardens, improving layout, usability, and finish.",
                  },
                  {
                    title: "Patios & Paved Areas",
                    text:
                      "Professionally installed patios using Indian sandstone, concrete slabs, or porcelain tiles.",
                  },
                  {
                    title: "Artificial Grass",
                    text:
                      "Low-maintenance artificial lawns installed with correct groundwork for drainage and stability.",
                  },
                  {
                    title: "Resin Bound Surfaces",
                    text:
                      "Modern resin-bound installations for patios, pathways, and clean contemporary finishes.",
                  },
                  {
                    title: "Brick Borders & Planters",
                    text:
                      "Structural brickwork features that add definition, strength, and longevity.",
                  },
                  {
                    title: "Turfing & Lawn Preparation",
                    text:
                      "Quality turf installations with proper ground preparation for a level, healthy lawn.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: "rgba(22, 64, 48, 0.85)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "1.6rem",
                    }}
                  >
                    <h3
                      style={{
                        color: "#f5f0e6",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "#e8e1d1",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing sections (NO CAMBIOS) */}
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <ProjectHighlights />
      <CTASection />
    </main>
  );
}
