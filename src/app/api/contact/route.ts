import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (backendUrl) {
      // Forward to your backend API if one exists
      await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
    } else {
      // Fallback: log to console (replace with nodemailer/Resend/Mailgun when ready)
      console.log("[Contact Form]", { name, email, subject, message });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
