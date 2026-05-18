import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { role, name, email, portfolio, message } = await req.json();

    // Forward application to your backend or email service
    // Replace NEXT_PUBLIC_API_URL with your backend base URL if you have one,
    // or configure SMTP via nodemailer using env vars SMTP_HOST / SMTP_USER / SMTP_PASS
    const body = `
New job application received on Vendorspot

Role: ${role}
Name: ${name}
Email: ${email}
Portfolio / CV: ${portfolio || "Not provided"}

Message:
${message}
    `.trim();

    // Simple mailto fallback — sends to support inbox via your backend if available
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (backendUrl) {
      await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Job Application: ${role} — ${name}`,
          email: "support@vendorspotng.com",
          replyTo: email,
          message: body,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
