import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { role, name, email, portfolio, message } = await req.json();

    await resend.emails.send({
      from: "Vendorspot Careers <support@vendorspotng.com>",
      to: "support@vendorspotng.com",
      replyTo: email,
      subject: `[Job Application] ${role} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#d7004b">New Job Application</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;width:120px">Role</td><td style="padding:8px">${role}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Portfolio / CV</td><td style="padding:8px">${portfolio ? `<a href="${portfolio}">${portfolio}</a>` : "Not provided"}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-left:4px solid #d7004b;border-radius:4px">
            <p style="margin:0;font-weight:bold;margin-bottom:8px">Why they want this role:</p>
            <p style="margin:0;white-space:pre-wrap">${message}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:24px">Sent via vendorspotng.com careers page</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Careers]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
