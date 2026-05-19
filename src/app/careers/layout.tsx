import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer Roles | Vendorspot",
  description:
    "Join a small, driven team on a mission to make online trade safe and trustworthy across Africa. Volunteer roles available.",
  openGraph: {
    title: "Volunteer Roles | Vendorspot",
    description:
      "Join a small, driven team on a mission to make online trade safe and trustworthy across Africa. Volunteer roles available.",
    url: "https://vendorspotng.com/careers",
    siteName: "Vendorspot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer Roles | Vendorspot",
    description:
      "Join a small, driven team on a mission to make online trade safe and trustworthy across Africa.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
