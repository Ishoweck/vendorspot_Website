import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE}/vendor/${id}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const shop = data?.data ?? data;
    const image = shop?.image ?? shop?.coverImage ?? "";

    return {
      title: `${shop?.name ?? "Shop"} — Vendorspot`,
      description: shop?.description ?? `Shop from ${shop?.name} on Vendorspot. Verified vendor. Secure escrow payments. 100% refund guarantee.`,
      openGraph: {
        title: `${shop?.name ?? "Shop"} — Vendorspot`,
        description: `Verified vendor on Vendorspot · Secure escrow payments · 100% refund guarantee.`,
        images: image ? [{ url: image, width: 1200, height: 630 }] : [],
        type: "website",
        siteName: "Vendorspot",
      },
      twitter: {
        card: "summary_large_image",
        title: `${shop?.name ?? "Shop"} — Vendorspot`,
        description: `Verified shop on Vendorspot. Shop safely with escrow.`,
        images: image ? [image] : [],
      },
    };
  } catch {
    return { title: "Shop — Vendorspot" };
  }
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
