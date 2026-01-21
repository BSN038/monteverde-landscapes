"use client";

// src/app/(marketing)/contact/page.tsx

import { useMemo, useState } from "react";
import Link from "next/link";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type FieldErrors = Partial<Record<keyof ContactForm, string>>;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ContactPage() {
  // Form state (simple + reliable)
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  // Track touch to avoid showing errors before user interacts
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  function update<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function touch<K extends keyof ContactForm>(key: K) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  const errors: FieldErrors = useMemo(() => {
    const e: FieldErrors = {};

    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email address.";
    else if (!isValidEmail(form.email)) e.email = "Email looks incorrect. Please check it.";
    if (!form.message.trim()) e.message = "Please write a short message.";

    return e;
  }, [form.name, form.email, form.message]);

  const canSubmit = Object.keys(errors).length === 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Reveal validation for required fields
    setTouched((prev) => ({ ...prev, name: true, email: true, message: true }));

    if (!canSubmit) {
      setSubmitState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setSubmitState({ status: "submitting" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      source: "website",
    };

    try {
      // 1) Persist to Supabase via your API
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }

      // 2) Notify via Formspree (non-blocking)
      const endpoint =
        process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT ?? "https://formspree.io/f/xjggenpo";

      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...payload,
            page: "/contact",
          }),
        }).catch(() => {
          // Ignore Formspree failures — Supabase is already saved
        });
      }

      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-10" style={{ width: "100%" }}>
        <div
          style={{
            background: "var(--color-primary)",
            borderRadius: "18px",
            padding: "1.9rem 2rem",
            boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
            width: "100%",
          }}
        >
          <h1 style={{ margin: 0, color: "#F1E7D3" }}>Contact</h1>

          <p style={{ marginTop: "0.9rem", marginBottom: 0, color: "#F1E7D3", opacity: 0.92 }}>
            Tell us what you’re planning and we’ll get back to you. If you already have measurements
            or photos, mention it—details help us respond faster.
          </p>

          <p style={{ marginTop: "0.9rem", marginBottom: 0, color: "#F1E7D3", opacity: 0.92 }}>
            Prefer a structured price estimate?{" "}
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

      <section className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-md">
        {submitState.status === "success" ? (
          <div className="rounded-3xl border border-emerald-700 bg-white p-10">
            <h2 className="text-base font-semibold text-emerald-950">Thanks — message received</h2>
            <p className="mt-1 text-sm text-emerald-900/80">
              We’ll review your message and get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Small premium note block (consistent with Reviews) */}
            <div className="rounded-2xl border border-emerald-200/60 bg-white/70 p-4">
              <h2 className="text-lg font-semibold tracking-tight text-emerald-900">Quick note</h2>
              <p className="mt-1 text-sm text-neutral-700">
                The more detail you share, the faster we can help. We only use your email to reply.
              </p>
            </div>

            <div className="space-y-6">
              <InputField
                id="contact-name"
                label="Name"
                placeholder="e.g. Maria Gonzalez"
                value={form.name}
                onChange={(v) => update("name", v)}
                onBlur={() => touch("name")}
                error={touched.name ? errors.name : undefined}
                required
              />

              <InputField
                id="contact-email"
                label="Email"
                placeholder="e.g. maria@email.com"
                value={form.email}
                onChange={(v) => update("email", v)}
                onBlur={() => touch("email")}
                error={touched.email ? errors.email : undefined}
                required
                inputMode="email"
              />

              <TextAreaField
                id="contact-message"
                label="Message"
                placeholder="Tell us about your project — location, timeline, and what you’d like to build…"
                value={form.message}
                onChange={(v) => update("message", v)}
                onBlur={() => touch("message")}
                error={touched.message ? errors.message : undefined}
                required
                // Premium feel: make the message area the hero
                minHeightClass="min-h-[260px]"
              />
            </div>

            {submitState.status === "error" && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {submitState.message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={!canSubmit || submitState.status === "submitting"}
                className="pill-button w-full sm:w-auto"
              >
                {submitState.status === "submitting" ? "Sending..." : "Send message"}
              </button>

              <p className="mt-3 text-xs text-neutral-700">
                By submitting, you agree we can contact you about your enquiry.
              </p>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}

/**
 * Reusable input field, styled to match Reviews exactly.
 * Layout is label-left / input-right (sm+), stacked on mobile.
 */
function InputField(props: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const { id, label, placeholder, value, onChange, onBlur, error, required, inputMode } = props;

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-[220px,1fr] sm:items-center">
      <div className="text-sm font-medium text-neutral-900 sm:pt-1">
        <label htmlFor={id} className="inline-flex items-center gap-2">
          <span>{label}</span>
          {required ? <span className="text-xs text-neutral-600">(required)</span> : null}
        </label>
      </div>

      <div>
        <input
          id={id}
          className={[
            "w-full rounded-full border bg-[#EAF3E1] px-5 py-3 text-sm text-neutral-900 outline-none transition",
            "placeholder:text-neutral-500",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-neutral-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100",
          ].join(" ")}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          inputMode={inputMode}
        />

        {error ? <div className="mt-2 text-xs text-red-700">{error}</div> : null}
      </div>
    </div>
  );
}

/**
 * Reusable textarea field, styled to match Reviews.
 * Supports a configurable min-height so Contact can feel premium.
 */
function TextAreaField(props: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  minHeightClass?: string;
}) {
  const { id, label, placeholder, value, onChange, onBlur, error, required, minHeightClass } = props;

  return (
    <div className="grid gap-2 sm:grid-cols-[220px,1fr] sm:items-start">
      <div className="text-sm font-medium text-neutral-900 sm:pt-3">
        <label htmlFor={id} className="inline-flex items-center gap-2">
          <span>{label}</span>
          {required ? <span className="text-xs text-neutral-600">(required)</span> : null}
        </label>
      </div>

      <div>
        <textarea
          id={id}
          className={[
            minHeightClass || "min-h-[150px]",
            "w-full resize-y rounded-3xl border bg-[#EAF3E1] px-5 py-4 text-base leading-6 text-neutral-900 outline-none transition shadow-sm",
            "placeholder:text-neutral-400",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-neutral-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100",
          ].join(" ")}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />

        {error ? <div className="mt-2 text-xs text-red-700">{error}</div> : null}
      </div>
    </div>
  );
}
