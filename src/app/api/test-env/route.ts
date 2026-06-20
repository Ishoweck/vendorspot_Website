import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  return NextResponse.json({
    hasKey: !!key,
    length: key?.length ?? 0,
    prefix: key?.slice(0, 5) ?? "none",
  });
}
