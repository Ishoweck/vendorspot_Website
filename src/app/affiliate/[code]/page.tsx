"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AffiliateLandingPage() {
  const { code } = useParams<{ code: string }>();
  const [attempted, setAttempted] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    if (!code) return;
    sessionStorage.setItem("affiliateCode", code);
    fetch(`${API_BASE}/affiliate/track/${code}`).catch(() => {});

    // Try to hand off to the native app; if the scheme isn't handled the browser stays on this page
    const deepLink = `vendorspot://affiliate/${code}`;
    window.location.href = deepLink;

    // After 1.5s with no navigation we assume the app isn't installed; show the store buttons
    const timer = setTimeout(() => {
      setAttempted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [code]);

  const openInStore = () => {
    window.location.href = /android/i.test(navigator.userAgent)
      ? "https://play.google.com/store/apps/details?id=com.vendorspot.app"
      : "https://apps.apple.com/app/vendorspot/id000000000";
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
          <img src="/VLogo.svg" alt="Vendorspot" className="w-16 h-16 mx-auto mb-4 rounded-2xl" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You&apos;ve been invited!</h1>
          <p className="text-gray-500 mb-6">
            Someone shared a Vendorspot link with you. Shop thousands of products and earn rewards.
          </p>

          {/* Affiliate code display */}
          <div className="bg-pink-50 border border-pink-200 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-gray-500 mb-1">Referral Code</p>
            <p className="text-lg font-bold text-[#CC3366] tracking-widest">{code}</p>
          </div>

          <button
            onClick={openInStore}
            className="w-full bg-[#CC3366] text-white font-bold py-4 rounded-2xl mb-3 text-base"
          >
            Download the App
          </button>

          <Link
            href={`/products?ref=${code}`}
            className="block w-full border-2 border-[#CC3366] text-[#CC3366] font-bold py-4 rounded-2xl text-base"
          >
            Continue on Website
          </Link>

          <p className="text-xs text-gray-400 mt-6">
            The referral code will be automatically applied at checkout.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
