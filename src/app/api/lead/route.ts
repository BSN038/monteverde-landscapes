import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL =
  process.env.NOTIFY_EMAIL || "info@monteverdelandscapers.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Monteverde <no-reply@monteverdelandscapers.com>";

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

    // 1) Guardar en DB
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

    // 2) Enviar email (no bloquea si falla)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [NOTIFY_EMAIL],
          replyTo: email,
          subject: `New contact message — ${name}`,
          html: `
            <h2>New contact form submission</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Source:</b> ${source}</p>
            <p><b>Message:</b></p>
            <pre>${message}</pre>
          `,
        });
      } catch (e) {
        console.error("Resend send error (lead):", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
