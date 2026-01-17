// src/app/(marketing)/process/page.tsx
// Follows the same layout + card patterns as ServicesPage: container + services-grid + service-card-button.
// (See src/app/(marketing)/services/page.tsx for the styling conventions.)

import Link from "next/link";

type InfoCard = {
  title: string;
  subtitle: string;
  body: string;
};

type Step = {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

const PROCESS_PAGE = {
  heading: "Our Process",
  slogan: "Premium landscaping, delivered with clarity and care.",
  intro:
    "We keep projects simple and professional: clear scope, consistent communication, and clean execution. Here’s exactly how we work—from the first message to the final walkthrough—so you always know what’s next.",
};

const TRUST_CARDS: InfoCard[] = [
  {
    title: "Professional communication",
    subtitle: "Fast, clear, reliable.",
    body:
      "You’ll have a single point of contact, quick replies, and straightforward updates so nothing gets missed or delayed.",
  },
  {
    title: "Realistic timelines",
    subtitle: "Built around the real world.",
    body:
      "We plan around materials, weather, site access, and scheduling—so expectations stay accurate and your project stays on track.",
  },
  {
    title: "Quality-first execution",
    subtitle: "Details that last.",
    body:
      "From prep to finishing touches, we focus on workmanship, cleanliness, and long-term performance—not quick fixes.",
  },
];

const STEPS: Step[] = [
  {
    step: "01",
    title: "Discovery & goals",
    subtitle: "We learn what you want and why it matters.",
    description:
      "We start with a quick conversation to understand your goals, the look you’re going for, any constraints, and what success looks like for you.",
    bullets: [
      "Short call or message-based intake",
      "Define priorities, style, and must-haves",
      "Confirm service area + timeline expectations",
    ],
  },
  {
    step: "02",
    title: "Site visit & assessment",
    subtitle: "We evaluate the space like builders.",
    description:
      "We review the property in real conditions—grading, drainage, access, sunlight, existing features, and anything that could affect the build.",
    bullets: [
      "Measurements and on-site notes",
      "Identify risks + opportunities early",
      "Confirm logistics (access, staging, utilities)",
    ],
  },
  {
    step: "03",
    title: "Plan & selections",
    subtitle: "A clear direction before any work begins.",
    description:
      "We align on layout, materials, and finishes. If options exist, we’ll present the best-fit choices for your goals and budget.",
    bullets: [
      "Layout direction + key decisions",
      "Materials + finish options",
      "Timeline outline and milestone approach",
    ],
  },
  {
    step: "04",
    title: "Proposal & approval",
    subtitle: "Transparent scope, pricing, and next steps.",
    description:
      "You receive a straightforward proposal with scope, pricing, and assumptions. We review it together, answer questions, and finalize details.",
    bullets: [
      "Clear scope and expectations",
      "Confirm schedule window",
      "Lock in selections and approvals",
    ],
  },
  {
    step: "05",
    title: "Build & execution",
    subtitle: "Clean jobsite, consistent progress.",
    description:
      "Our team executes the plan with professional site standards. We keep the work area tidy and share updates as we move through the build.",
    bullets: [
      "Prep, install, and finishing work",
      "Clean staging + respectful property care",
      "Progress updates and coordination",
    ],
  },
  {
    step: "06",
    title: "Final walkthrough & care",
    subtitle: "We refine details and set you up for success.",
    description:
      "We do a final walkthrough, complete any punch-list items, and share care guidance so your landscape stays strong and beautiful.",
    bullets: [
      "Final inspection + refinements",
      "Care and maintenance guidance",
      "Ongoing support for future phases",
    ],
  },
];

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <p
        style={{
          marginTop: "1rem",
          marginBottom: 0,
          color: "var(--color-text-secondary)",
          fontWeight: 600,
        }}
      >
        {subtitle}
      </p>
    </header>
  );
}

export default function ProcessPage() {
  return (
    <section>
      <div className="container" style={{ padding: "4rem 0" }}>
        {/* Page Heading (match Services structure) */}
        <SectionHeading title={PROCESS_PAGE.heading} subtitle={PROCESS_PAGE.slogan} />
        <p style={{ marginTop: "-1.25rem", maxWidth: 760 }}>{PROCESS_PAGE.intro}</p>

        {/* Top trust cards (same “green boxes” pattern as Services cards) */}
        <div className="services-grid" style={{ marginTop: "2rem", rowGap: "1.5rem" }}>
          {TRUST_CARDS.map((c) => (
            <article key={c.title} className="service-card-button">
              <h3 style={{ margin: 0 }}>{c.title}</h3>
              <p
                style={{
                  marginTop: "0.5rem",
                  marginBottom: 0,
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                }}
              >
                {c.subtitle}
              </p>
              <p style={{ marginTop: "0.85rem", marginBottom: 0 }}>{c.body}</p>
            </article>
          ))}
        </div>

        {/* Process steps */}
        <header style={{ maxWidth: 760, marginTop: "3.25rem", marginBottom: "1.25rem" }}>
          <h2 style={{ margin: 0 }}>How it works</h2>
          <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>
            A premium result comes from a consistent workflow. These steps keep everything clear,
            efficient, and predictable.
          </p>
        </header>

        <div className="services-grid" style={{ rowGap: "1.5rem" }}>
          {STEPS.map((s) => (
            <article key={s.step} className="service-card-button">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginBottom: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.85rem",
                  }}
                >
                  STEP {s.step}
                </span>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
              </div>

              <p
                style={{
                  marginTop: "0.5rem",
                  marginBottom: 0,
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                }}
              >
                {s.subtitle}
              </p>

              <p style={{ marginTop: "0.85rem", marginBottom: 0 }}>{s.description}</p>

              <ul style={{ margin: "1.1rem 0 0", paddingLeft: "1.1rem" }}>
                {s.bullets.map((b) => (
                  <li key={b} style={{ marginTop: "0.35rem" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* CTA (kept consistent with card styling) */}
        <section style={{ marginTop: "3.25rem" }}>
          <article className="service-card-button">
            <h3 style={{ margin: 0 }}>Ready to get started?</h3>
            <p style={{ marginTop: "0.85rem", marginBottom: 0, maxWidth: 760 }}>
              Share a few details and we’ll follow up with next steps. If you’re ready for a quote,
              the form is quick and straightforward.
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
                className="inline-flex items-center justify-center rounded-xl bg-green-950 px-5 py-3 text-sm font-medium text-white"
              >
                Request a quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-green-300 bg-white px-5 py-3 text-sm font-medium text-green-950"
              >
                Ask a question
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl border border-green-300 bg-white px-5 py-3 text-sm font-medium text-green-950"
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
