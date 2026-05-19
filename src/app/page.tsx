"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// ── Skeleton primitives ─────────────────────────────────────────────────
function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-gray-100 ${className ?? ""}`} />;
}

function SectionSkeleton({ bg = "bg-white", children }: { bg?: string; children: React.ReactNode }) {
  return <section className={`${bg} py-16 sm:py-24 px-6 sm:px-8 lg:px-10`}>{children}</section>;
}

// ── Lazy-loaded sections ────────────────────────────────────────────────
const JourneySection = dynamic(() => import("@/components/JourneySection"), {
  loading: () => (
    <SectionSkeleton>
      <div className="max-w-7xl mx-auto space-y-6">
        <Pulse className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Pulse className="h-40" />
          <Pulse className="h-40" />
          <Pulse className="h-40" />
        </div>
      </div>
    </SectionSkeleton>
  ),
});

const SafeBuyingSection = dynamic(() => import("@/components/SafeBuyingSection"), {
  loading: () => (
    <SectionSkeleton bg="bg-primary">
      <div className="max-w-7xl mx-auto space-y-6">
        <Pulse className="h-8 w-64 bg-white/20" />
        <Pulse className="h-12 w-full max-w-lg bg-white/20" />
        <div className="flex gap-4 mt-8 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Pulse key={i} className="h-48 w-40 shrink-0 bg-white/10" />
          ))}
        </div>
      </div>
    </SectionSkeleton>
  ),
});

const TopSellers = dynamic(() => import("@/components/TopSellers"), {
  loading: () => (
    <SectionSkeleton>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border-2 border-gray-100 overflow-hidden">
          <Pulse className="h-16 rounded-none" />
          <div className="bg-white px-8 py-8 flex flex-wrap justify-center gap-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Pulse className="w-16 h-16 rounded-full" />
                <Pulse className="h-2.5 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionSkeleton>
  ),
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <SectionSkeleton bg="bg-[#8A38F5]">
      <div className="max-w-4xl mx-auto space-y-8">
        <Pulse className="h-10 w-64 mx-auto bg-white/20" />
        <Pulse className="h-56 sm:h-64 bg-white/20" />
      </div>
    </SectionSkeleton>
  ),
});

const StoriesOnSpot = dynamic(() => import("@/components/StoriesOnSpot"), {
  loading: () => (
    <SectionSkeleton>
      <div className="max-w-7xl mx-auto space-y-8">
        <Pulse className="h-9 w-52" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Pulse className="h-64" />
          <Pulse className="h-64" />
          <Pulse className="h-64" />
        </div>
      </div>
    </SectionSkeleton>
  ),
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => (
    <SectionSkeleton>
      <div className="max-w-3xl mx-auto space-y-3">
        <Pulse className="h-9 w-40 mx-auto mb-8" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Pulse key={i} className="h-14" />
        ))}
      </div>
    </SectionSkeleton>
  ),
});

// ── Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("vendorspot_token"));
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <JourneySection />
        {isLoggedIn && <StoriesOnSpot />}
        <SafeBuyingSection />
        <TopSellers />
        <Testimonials />
        {!isLoggedIn && <StoriesOnSpot />}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
