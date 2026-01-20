import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Accept a few common key variants so we don't break existing forms
    const fullName = isNonEmptyString(body.fullName)
      ? body.fullName.trim()
      : isNonEmptyString(body.name)
        ? body.name.trim()
        : isNonEmptyString(body.full_name)
          ? body.full_name.trim()
          : null;

    const email = isNonEmptyString(body.email) ? body.email.trim() : null;

    const phone = isNonEmptyString(body.phone)
      ? body.phone.trim()
      : isNonEmptyString(body.phoneNumber)
        ? body.phoneNumber.trim()
        : isNonEmptyString(body.telephone)
          ? body.telephone.trim()
          : null;

    const postcode = isNonEmptyString(body.postcode)
      ? body.postcode.trim()
      : isNonEmptyString(body.postalCode)
        ? body.postalCode.trim()
        : null;

    const projectType = isNonEmptyString(body.projectType)
      ? body.projectType.trim()
      : isNonEmptyString(body.service)
        ? body.service.trim()
        : null;

    const message = isNonEmptyString(body.message)
      ? body.message.trim()
      : isNonEmptyString(body.details)
        ? body.details.trim()
        : isNonEmptyString(body.notes)
          ? body.notes.trim()
          : null;

    const source = isNonEmptyString(body.source) ? body.source.trim() : "website";

    // Minimal required fields (keeps it reliable)
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    /**
     * Insert ONLY safe/common columns to avoid schema mismatches.
     * (If your quotes table has extra columns, we keep them optional.)
     */
    const { error } = await supabase.from("quotes").insert({
      fullName,
      email,
      phone,
      postcode,
      projectType,
      message,
      source,
    });

    if (error) {
      console.error("Supabase insert error (quote):", error);
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Quote API error:", e);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
