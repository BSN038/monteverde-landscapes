"use client";

// src/app/(marketing)/reviews/page.tsx

import { useEffect, useMemo, useState } from "react";
import type { ReviewCreateInput } from "@/types/review";
import Link from "next/link";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type FieldErrors = Partial<Record<keyof ReviewCreateInput, string>>;
type ApprovedReview = {
  id: string;
  fullName: string;
  rating: number;
  message: string;
  location?: string | null;
  projectType?: string | null;
  createdAt: string;
};

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
  const [approvedReviews, setApprovedReviews] = useState<ApprovedReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

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

    return e;
  }, [form.fullName, form.email, form.message]);

  useEffect(() => {
    let cancelled = false;

    async function loadApprovedReviews() {
      setReviewsLoading(true);
      setReviewsError(null);

      try {
        const res = await fetch("/api/review", { method: "GET" });
        const data = (await res.json()) as {
          ok?: boolean;
          reviews?: ApprovedReview[];
          error?: string;
        };

        if (!res.ok || !data.ok) {
          if (!cancelled) setReviewsError(data.error || "Failed to load reviews.");
          return;
        }

        if (!cancelled) setApprovedReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch {
        if (!cancelled) setReviewsError("Network error while loading reviews.");
      } finally {
        if (!cancelled) setReviewsLoading(false);
      }
    }

    void loadApprovedReviews();

    return () => {
      cancelled = true;
    };
  }, []);

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
      setForm({
        fullName: "",
        email: "",
        rating: 5,
        message: "",
        source: "website",
      });

      setTouched({});
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      {/* Header panel (matches Projects/Process/Services pattern) */}
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
          <h1 style={{ margin: 0, color: "#F1E7D3" }}>Reviews</h1>

          <p style={{ marginTop: "0.9rem", marginBottom: 0, color: "#F1E7D3", opacity: 0.92 }}>
            If you’ve worked with us, we’d really appreciate a short review. Every submission is
            checked before it appears publicly — it helps keep things genuine and helps other
            homeowners feel confident.
          </p>

          <p style={{ marginTop: "0.9rem", marginBottom: 0, color: "#F1E7D3", opacity: 0.92 }}>
            Looking for pricing or advice first?{" "}
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

      <section className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">Published reviews</h2>

        {reviewsLoading ? (
          <p className="mt-2 text-sm text-neutral-700">Loading reviews…</p>
        ) : reviewsError ? (
          <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {reviewsError}
          </div>
        ) : approvedReviews.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-700">No published reviews yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {approvedReviews.map((r) => (
              <li key={r.id} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-neutral-900">{r.fullName}</div>

                  <div className="flex items-center gap-1" aria-label={`Rating: ${r.rating} out of 5`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: "18px",
                          lineHeight: "1",
                          color: star <= r.rating ? "#FACC15" : "#D1D5DB",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {(r.location || r.projectType) && (
                  <div className="mt-1 text-xs text-neutral-600">
                    {[r.location, r.projectType].filter(Boolean).join(" • ")}
                  </div>
                )}

                <p className="mt-3 text-sm leading-6 text-neutral-800">{r.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        {submitState.status === "success" ? (
          <div className="rounded-3xl border border-emerald-700 bg-white p-10">
            <h2 className="text-base font-semibold text-emerald-950">Thank you for your review</h2>
            <p className="mt-1 text-sm text-emerald-900/80">
              Your review has been submitted and will be published after moderation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl border border-emerald-200/60 bg-white/70 p-4">
              <h2 className="text-lg font-semibold tracking-tight text-emerald-900">Quick note</h2>

              <p className="mt-1 text-sm text-neutral-700">
                We read every submission. Reviews are published after a quick check to prevent spam.
              </p>
            </div>

            {/* Key change: spacing + rows are now label-left / input-right on sm+ */}
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="space-y-6">
                <InputField
                  id="review-fullName"
                  label="Full name"
                  placeholder="e.g. Maria Gonzalez"
                  value={form.fullName}
                  onChange={(v) => update("fullName", v)}
                  onBlur={() => touch("fullName")}
                  error={touched.fullName ? errors.fullName : undefined}
                  required
                />

                <InputField
                  id="review-email"
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

              {/* Rating + Location row (two columns on sm+) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start">
                <div className="sm:pt-1">
                  <h2 className="text-lg font-semibold tracking-tight text-emerald-900">Rating</h2>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => update("rating", star as 1 | 2 | 3 | 4 | 5)}
                        className="leading-none transition hover:scale-110"
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

                  <div className="mt-2 text-xs text-neutral-700">Click to rate — 5 stars is excellent</div>
                </div>

                <div className="sm:pt-2">
                  <InputField
                    id="review-location"
                    label="Location (optional)"
                    placeholder="e.g. Didsbury, Manchester"
                    value={form.location || ""}
                    onChange={(v) => update("location", v)}
                    onBlur={() => touch("location")}
                  />
                </div>
              </div>

              <InputField
                id="review-projectType"
                label="Project type (optional)"
                placeholder="e.g. Patio, Turf, Planting"
                value={form.projectType || ""}
                onChange={(v) => update("projectType", v)}
                onBlur={() => touch("projectType")}
              />

              <TextAreaField
                id="review-message"
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
    <div
      className={[
        "grid gap-2",
        // label left / input right on sm+
        "grid-cols-[220px,1fr]",
        "items-center",
      ].join(" ")}
    >
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

function TextAreaField(props: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
}) {
  const { id, label, placeholder, value, onChange, onBlur, error, required } = props;

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
            "min-h-[260px] w-full resize-y rounded-3xl border bg-[#EAF3E1] px-5 py-4 text-sm text-neutral-900 outline-none transition",
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
