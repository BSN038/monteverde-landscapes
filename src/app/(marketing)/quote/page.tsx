"use client";

// src/app/(marketing)/quote/page.tsx

import { useMemo, useState } from "react";
import type { LeadCreateInput } from "@/types/lead";

type StepId = 1 | 2 | 3;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const SERVICES = [
  "Landscape Design",
  "Planting",
  "Hardscaping",
  "Maintenance",
  "Other",
] as const;

const BUDGETS = ["< £1,000", "£1,000–£3,000", "£3,000–£7,500", "£7,500+", "Not sure"] as const;

const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Not sure"] as const;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function QuotePage() {
  const [step, setStep] = useState<StepId>(1);

  const [form, setForm] = useState<LeadCreateInput>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    source: "quote",
    pagePath: "/quote",
  });

  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return form.fullName.trim().length > 0 && isValidEmail(form.email);
    }
    if (step === 2) {
      // Optional step: allow next even if not selected, but keep it “MVP professional”
      return true;
    }
    return true;
  }, [step, form.fullName, form.email]);

  function update<K extends keyof LeadCreateInput>(key: K, value: LeadCreateInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() {
    if (!canGoNext) return;
    setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : 3));
  }

  function goBack() {
    setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : 1));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Minimal validation for MVP
    if (form.fullName.trim().length === 0) {
      setSubmitState({ status: "error", message: "Full name is required." });
      return;
    }
    if (!isValidEmail(form.email)) {
      setSubmitState({ status: "error", message: "Please enter a valid email." });
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim() || undefined,
          address: form.address?.trim() || undefined,
          service: form.service?.trim() || undefined,
          budget: form.budget?.trim() || undefined,
          timeline: form.timeline?.trim() || undefined,
          message: form.message?.trim() || undefined,
        } satisfies LeadCreateInput),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Get a Quote</h1>
          <p className="text-sm text-neutral-600">
            Tell us a bit about your project. We’ll follow up with next steps.
          </p>
        </header>

        {submitState.status === "success" ? (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
            <SuccessPanel />
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-2 text-sm">
              <StepPill active={step === 1} label="Contact" />
              <div className="h-px flex-1 bg-neutral-200" />
              <StepPill active={step === 2} label="Project" />
              <div className="h-px flex-1 bg-neutral-200" />
              <StepPill active={step === 3} label="Confirm" />
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              {step === 1 && (
                <section className="space-y-5">
                  <Field label="Full name" required>
                    <input
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </Field>

                  <Field label="Email" required>
                    <input
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@email.com"
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Phone">
                      <input
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                        value={form.phone || ""}
                        onChange={(e) => update("phone", e.target.value)}
                        autoComplete="tel"
                        placeholder="Optional"
                      />
                    </Field>

                    <Field label="Address / Area">
                      <input
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                        value={form.address || ""}
                        onChange={(e) => update("address", e.target.value)}
                        autoComplete="street-address"
                        placeholder="Optional"
                      />
                    </Field>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section className="space-y-5">
                  <Field label="Service">
                    <select
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                      value={form.service || ""}
                      onChange={(e) => update("service", e.target.value)}
                    >
                      <option value="">Select a service (optional)</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Budget">
                      <select
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                        value={form.budget || ""}
                        onChange={(e) => update("budget", e.target.value)}
                      >
                        <option value="">Budget (optional)</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Timeline">
                      <select
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                        value={form.timeline || ""}
                        onChange={(e) => update("timeline", e.target.value)}
                      >
                        <option value="">Timeline (optional)</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Project details">
                    <textarea
                      className="min-h-[140px] w-full resize-y rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-500"
                      value={form.message || ""}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us what you’re looking to do (optional)"
                    />
                  </Field>
                </section>
              )}

              {step === 3 && (
                <section className="space-y-5">
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <SummaryRow label="Name" value={form.fullName || "—"} />
                      <SummaryRow label="Email" value={form.email || "—"} />
                      <SummaryRow label="Phone" value={form.phone || "—"} />
                      <SummaryRow label="Address / Area" value={form.address || "—"} />
                      <SummaryRow label="Service" value={form.service || "—"} />
                      <SummaryRow label="Budget" value={form.budget || "—"} />
                      <SummaryRow label="Timeline" value={form.timeline || "—"} />
                    </div>

                    <div className="mt-3">
                      <div className="text-xs font-medium text-neutral-600">Details</div>
                      <div className="mt-1 whitespace-pre-wrap text-neutral-800">
                        {form.message?.trim() ? form.message : "—"}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600">
                    By submitting, you agree we can contact you about your request.
                  </p>
                </section>
              )}

              {submitState.status === "error" && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitState.message}
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1 || submitState.status === "submitting"}
                  className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm disabled:opacity-50"
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext || submitState.status === "submitting"}
                    className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitState.status === "submitting"}
                    className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm text-white disabled:opacity-50"
                  >
                    {submitState.status === "submitting" ? "Submitting..." : "Submit request"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}

      </div>

    </main>
  );
}

function StepPill({ active, label }: { active: boolean; label: string }) {
  return (
    <div
      className={[
        "rounded-full px-3 py-1 text-xs font-medium",
        active ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600",
      ].join(" ")}
    >
      {label}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span>{label}</span>
        {required ? <span className="text-xs text-neutral-500">(required)</span> : null}
      </div>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-xs font-medium text-neutral-600">{label}</div>
      <div className="text-right text-sm text-neutral-900">{value}</div>
    </div>
  );
}

function SuccessPanel() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-green-200 bg-green-50 p-6 text-center">
      <h2 className="text-base font-semibold text-green-900">Request received</h2>
      <p className="mt-1 text-sm text-green-800">
        Thanks — we’ll get back to you shortly.
      </p>
    </div>
  );
}
