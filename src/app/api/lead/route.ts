// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import type { LeadCreateInput } from "@/types/lead";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  // Basic validation (intentionally lightweight)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// NOTE: Supabase persistence will be wired in a later gate.
// For now, we validate + accept the lead and return a standard JSON response.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadCreateInput>;

    if (!isNonEmptyString(body.fullName)) {
      return NextResponse.json(
        { ok: false, error: "fullName is required" },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(body.email)) {
      return NextResponse.json(
        { ok: false, error: "email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { ok: false, error: "email is invalid" },
        { status: 400 }
      );
    }

    // Build a normalized payload (trim strings, set defaults).
    const lead: LeadCreateInput = {
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: isNonEmptyString(body.phone) ? body.phone.trim() : undefined,
      address: isNonEmptyString(body.address) ? body.address.trim() : undefined,
      message: isNonEmptyString(body.message) ? body.message.trim() : undefined,
      service: isNonEmptyString(body.service) ? body.service.trim() : undefined,
      budget: isNonEmptyString(body.budget) ? body.budget.trim() : undefined,
      timeline: isNonEmptyString(body.timeline) ? body.timeline.trim() : undefined,
      source: body.source ?? "unknown",
      pagePath: isNonEmptyString(body.pagePath) ? body.pagePath.trim() : undefined,
      utm: body.utm,
    };

    // TODO (Gate 9+): persist lead in Supabase (DB) and return created id
    // For now we only acknowledge receipt.
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
