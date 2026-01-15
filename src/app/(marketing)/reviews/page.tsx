"use client";

// src/app/(marketing)/reviews/page.tsx

import { useMemo, useState } from "react";
import type { ReviewCreateInput } from "@/types/review";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type FieldErrors = Partial<Record<keyof ReviewCreateInput, string>>;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ReviewsPage() {
  const [form, setForm] = useState<ReviewCreateInput>({
    fullName: "",
    email: "",
    rating: 5,
    message: "",
    source: "website",
  });

  const [touched, setTouched] = useState<Partial<Record<keyof ReviewCreateInput, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  function update<K extends keyof ReviewCreateInput>(key: K, value: ReviewCreateInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function touch<K extends keyof ReviewCreateInput>(key: K) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  const errors: FieldErrors = useMemo(() => {
    const e: FieldErrors = {};

    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!form.email.trim()) e.email = "Please enter your email address.";
    else if (!isValidEmail(form.email)) e.email = "Email looks incorrect. Please check it.";
    if (!form.message.trim()) e.message = "Please write a short review.";

    // rating is always set via select
    return e;
  }, [form.fullName, form.email, form.message]);

  const canSubmit = Object.keys(errors).length === 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mark required fields as touched to reveal validation
    setTouched((prev) => ({
      ...prev,
      fullName: true,
      email: true,
      message: true,
    }));

    if (!canSubmit) {
      setSubmitState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        } satisfies ReviewCreateInput),
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
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Reviews</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-700">
          Our website is new and we don’t have published reviews yet. If you’ve worked with us,
          we’d love to hear your feedback — it helps other homeowners feel confident.
        </p>
      </header>

      <section className="rounded-3xl border border-neutral-200 bg-[#F7F2E9] p-6 shadow-sm sm:p-8">
        {submitState.status === "success" ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-base font-semibold text-emerald-950">Thank you for your review</h2>
            <p className="mt-1 text-sm text-emerald-900/80">
              Your review has been submitted and will be published after moderation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl border border-emerald-200/60 bg-white/70 p-4 text-sm text-neutral-800">
              <div className="font-medium text-neutral-900">Quick note</div>
              <div className="mt-1 text-neutral-700">
                We read every submission. Reviews are published after a quick check to prevent spam.
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField
                  label="Full name"
                  placeholder="e.g. Maria Gonzalez"
                  value={form.fullName}
                  onChange={(v) => update("fullName", v)}
                  onBlur={() => touch("fullName")}
                  error={touched.fullName ? errors.fullName : undefined}
                  required
                />

                <InputField
                  label="Email"
                  placeholder="e.g. maria@email.com"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  onBlur={() => touch("email")}
                  error={touched.email ? errors.email : undefined}
                  required
                  inputMode="email"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <h2 className="rating-title">Rating</h2>

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => update("rating", star as 1 | 2 | 3 | 4 | 5)}
                          className="text-[52px] leading-none transition hover:scale-110"
                          aria-label={`${star} star`}
                        >
                          <span
                            style={{
                              fontSize: "32px",
                              lineHeight: "1",
                              color: star <= form.rating ? "#FACC15" : "#D1D5DB",
                            }}
                          >
                            ★
                          </span>

                        </button>
                      ))}
                    </div>

                    <div className="mt-2 text-xs text-neutral-700">
                      Click to rate — 5 stars is excellent
                    </div>
                  </div>


                <InputField
                  label="Location (optional)"
                  placeholder="e.g. Didsbury, Manchester"
                  value={form.location || ""}
                  onChange={(v) => update("location", v)}
                  onBlur={() => touch("location")}
                />
              </div>

              <InputField
                label="Project type (optional)"
                placeholder="e.g. Patio, Turf, Planting"
                value={form.projectType || ""}
                onChange={(v) => update("projectType", v)}
                onBlur={() => touch("projectType")}
              />

              <TextAreaField
                label="Your review"
                placeholder="Tell us about your experience — what you loved, what we built, how the process felt…"
                value={form.message}
                onChange={(v) => update("message", v)}
                onBlur={() => touch("message")}
                error={touched.message ? errors.message : undefined}
                required
              />

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
                    {submitState.status === "submitting" ? "Submitting..." : "Submit review"}
                  </button>

                <p className="mt-3 text-xs text-neutral-700">
                  By submitting, you agree we can contact you if we need to verify details.
                </p>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

function InputField(props: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const { label, placeholder, value, onChange, onBlur, error, required, inputMode } = props;

  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-900">
        <span>{label}</span>
        {required ? <span className="text-xs text-neutral-600">(required)</span> : null}
      </div>

      <input
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
    </label>
  );
}

function SelectField<T extends string | number>(props: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
}) {
  const { label, value, onChange, options, hint } = props;

  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-neutral-900">{label}</div>

      <select
        className="w-full rounded-3xl border-0 bg-[#E6F0D8] px-6 py-4 text-base text-neutral-900 shadow-inner outline-none transition placeholder:text-neutral-500 focus:bg-[#EDF6E3] focus:ring-4 focus:ring-emerald-200"
        value={value as any}
        onChange={(e) => onChange((typeof value === "number" ? Number(e.target.value) : e.target.value) as T)}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={o.value as any}>
            {o.label}
          </option>
        ))}
      </select>

      {hint ? <div className="mt-2 text-xs text-neutral-700">{hint}</div> : null}
    </label>
  );
}

function TextAreaField(props: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
}) {
  const { label, placeholder, value, onChange, onBlur, error, required } = props;

  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-900">
        <span>{label}</span>
        {required ? <span className="text-xs text-neutral-600">(required)</span> : null}
      </div>

      <textarea
        className={[
          "min-h-[150px] w-full resize-y rounded-3xl border bg-[#EAF3E1] px-5 py-4 text-sm text-neutral-900 outline-none transition",
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
    </label>
  );
}
