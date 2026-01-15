// src/app/api/review/route.ts
import { NextResponse } from "next/server";
import type { ReviewCreateInput } from "@/types/review";
import { createClient } from "@supabase/supabase-js";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidRating(value: unknown): value is 1 | 2 | 3 | 4 | 5 {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

// NOTE: Persistence + moderation workflow will be wired in later (DB/dashboard).
// For now we accept submissions and keep them "pending" conceptually.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ReviewCreateInput>;

    if (!isNonEmptyString(body.fullName)) {
      return NextResponse.json(
        { ok: false, error: "fullName is required" },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(body.email)) {
      return NextResponse.json({ ok: false, error: "email is required" }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ ok: false, error: "email is invalid" }, { status: 400 });
    }

    if (!isValidRating(body.rating)) {
      return NextResponse.json({ ok: false, error: "rating must be 1-5" }, { status: 400 });
    }

    if (!isNonEmptyString(body.message)) {
      return NextResponse.json(
        { ok: false, error: "message is required" },
        { status: 400 }
      );
    }

    const review: ReviewCreateInput = {
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      rating: body.rating,
      message: body.message.trim(),
      location: isNonEmptyString(body.location) ? body.location.trim() : undefined,
      projectType: isNonEmptyString(body.projectType) ? body.projectType.trim() : undefined,
      source: "website",
    };

    // Gate 8: Persist review as "pending" in Supabase for moderation.
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { ok: false, error: "Supabase env vars missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { error } = await supabase.from("reviews").insert({
      full_name: review.fullName,
      email: review.email,
      rating: review.rating,
      message: review.message,
      location: review.location ?? null,
      project_type: review.projectType ?? null,
      source: review.source,
      status: "pending",
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to save review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }
}
