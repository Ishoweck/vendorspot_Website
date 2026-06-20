import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassador Program — Vendorspot",
  description:
    "Join the Vendorspot Ambassador Program and earn real commissions representing Africa's most trusted marketplace. Student and State programs available. Free to join, no earning cap.",
  openGraph: {
    title: "Vendorspot Ambassador Program — Earn While You Represent",
    description:
      "Whether you're a student on campus or a community leader in your state — join Vendorspot's Ambassador Program, refer vendors and buyers, and earn commissions with no cap and zero upfront cost. Applications take less than 2 minutes.",
    url: "https://vendorspotng.com/ambassador-program",
    siteName: "Vendorspot",
    type: "website",
    images: [
      {
        url: "https://vendorspotng.com/og-ambassador.png",
        width: 1200,
        height: 630,
        alt: "Vendorspot Ambassador Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendorspot Ambassador Program — Earn While You Represent",
    description:
      "Join Vendorspot's Ambassador Program. Earn commissions on every referral, get official recognition, and represent Africa's most trusted marketplace. Free to join.",
    images: ["https://vendorspotng.com/og-ambassador.png"],
  },
};

export default function AmbassadorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
