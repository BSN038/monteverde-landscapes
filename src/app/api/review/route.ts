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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReviewCreateInput;

    const {
      fullName,
      email,
      rating,
      message,
      location,
      projectType,
    } = body;

    if (
      !isNonEmptyString(fullName) ||
      !isNonEmptyString(email) ||
      !isValidEmail(email) ||
      !isValidRating(rating) ||
      !isNonEmptyString(message)
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("reviews").insert({
      full_name: fullName,
      email,
      rating,
      message,
      location: location ?? null,
      project_type: projectType ?? null,
      approved: false,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Failed to save review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }

  const reviews = (data ?? []).map((r) => ({
    id: r.id,
    fullName: r.full_name,
    rating: r.rating,
    message: r.message,
    location: r.location,
    projectType: r.project_type,
    createdAt: r.created_at,
  }));

  return NextResponse.json({ ok: true, reviews }, { status: 200 });
}
