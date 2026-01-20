import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = isNonEmptyString(body.name)
      ? body.name.trim()
      : isNonEmptyString(body.fullName)
        ? body.fullName.trim()
        : null;

    const email = isNonEmptyString(body.email) ? body.email.trim() : null;

    const source = isNonEmptyString(body.source) ? body.source.trim() : "website";

    // message puede venir vacío en Quote (tu UI lo manda como undefined si está en blanco)
    const rawMessage = typeof body.message === "string" ? body.message.trim() : "";
    const message =
      rawMessage.length > 0
        ? rawMessage
        : source === "quote"
          ? "Quote request (no additional details provided)."
          : null;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // En Contact sí exigimos message
    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      message,
      source,
    });

    if (error) {
      console.error("Supabase insert error (lead):", error);
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
