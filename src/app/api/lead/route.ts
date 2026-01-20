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

    const name = isNonEmptyString(body.name)
      ? body.name.trim()
      : isNonEmptyString(body.fullName)
        ? body.fullName.trim()
        : null;

    const email = isNonEmptyString(body.email) ? body.email.trim() : null;
    const message = isNonEmptyString(body.message) ? body.message.trim() : null;
    const source = isNonEmptyString(body.source) ? body.source.trim() : "website";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Guardar en DB (Supabase)
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

    // Éxito
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
