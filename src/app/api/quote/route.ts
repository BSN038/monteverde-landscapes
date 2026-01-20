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

    // Ajusta estos nombres si tu QuoteWizard manda campos distintos
    const fullName = isNonEmptyString(body.fullName) ? body.fullName.trim() : null;
    const email = isNonEmptyString(body.email) ? body.email.trim() : null;
    const phone = isNonEmptyString(body.phone) ? body.phone.trim() : null;
    const message = isNonEmptyString(body.message) ? body.message.trim() : null;
    const source = isNonEmptyString(body.source) ? body.source.trim() : "website";

    if (!fullName || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1) Guardar en DB
    const { error } = await supabase.from("quotes").insert({
      full_name: fullName,
      email,
      phone,
      message,
      source,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error (quote):", error);
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
          subject: `New quote request — ${fullName}`,
          html: `
            <h2>New quote request</h2>
            <p><b>Name:</b> ${fullName}</p>
            <p><b>Email:</b> ${email}</p>
            ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
            ${message ? `<p><b>Message:</b></p><pre>${message}</pre>` : ""}
            <p><b>Source:</b> ${source}</p>
          `,
        });
      } catch (e) {
        console.error("Resend send error (quote):", e);
      }
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
