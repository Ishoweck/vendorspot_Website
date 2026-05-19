import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, subject, message } = await req.json();

    // Forward to backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (backendUrl) {
      await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      }).catch(() => {});
    }

    // Send email via Resend
    await resend.emails.send({
      from: "Vendorspot Contact <onboarding@resend.dev>",
      to: "support@vendorspotng.com",
      replyTo: email,
      subject: `[Contact Form] ${subject || "New message"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#d7004b">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;width:100px">Name</td><td style="padding:8px">${name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject || "—"}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-left:4px solid #d7004b;border-radius:4px">
            <p style="margin:0;white-space:pre-wrap">${message}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:24px">Sent via vendorspotng.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
