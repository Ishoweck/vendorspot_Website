"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import type { Category } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

const fallbackCategories = [
  { name: "Fashion",          icon: "👗", bg: "bg-orange-50", border: "border-orange-200" },
  { name: "Groceries",        icon: "🛒", bg: "bg-pink-50",   border: "border-pink-200"   },
  { name: "Beauty",           icon: "💄", bg: "bg-green-50",  border: "border-green-200"  },
  { name: "Gadgets",          icon: "📱", bg: "bg-yellow-50", border: "border-yellow-200" },
  { name: "Jewelry",          icon: "💎", bg: "bg-red-50",    border: "border-red-200"    },
  { name: "Digital Products", icon: "📦", bg: "bg-purple-50", border: "border-purple-200" },
];

const categoryStyles: Record<string, { bg: string; border: string; emoji: string }> = {
  fashion:           { bg: "bg-orange-50",  border: "border-orange-200",  emoji: "👗" },
  groceries:         { bg: "bg-pink-50",    border: "border-pink-200",    emoji: "🛒" },
  beauty:            { bg: "bg-green-50",   border: "border-green-200",   emoji: "💄" },
  gadgets:           { bg: "bg-yellow-50",  border: "border-yellow-200",  emoji: "📱" },
  electronics:       { bg: "bg-yellow-50",  border: "border-yellow-200",  emoji: "📱" },
  jewelry:           { bg: "bg-red-50",     border: "border-red-200",     emoji: "💎" },
  "digital products":{ bg: "bg-purple-50",  border: "border-purple-200",  emoji: "📦" },
  digital:           { bg: "bg-purple-50",  border: "border-purple-200",  emoji: "📦" },
  health:            { bg: "bg-emerald-50", border: "border-emerald-200", emoji: "💊" },
  sports:            { bg: "bg-blue-50",    border: "border-blue-200",    emoji: "⚽" },
  home:              { bg: "bg-amber-50",   border: "border-amber-200",   emoji: "🏠" },
  books:             { bg: "bg-indigo-50",  border: "border-indigo-200",  emoji: "📚" },
  food:              { bg: "bg-rose-50",    border: "border-rose-200",    emoji: "🍔" },
};

function getCategoryStyle(name: string) {
  const key = name.toLowerCase();
  for (const [match, style] of Object.entries(categoryStyles)) {
    if (key.includes(match)) return style;
  }
  return { bg: "bg-gray-50", border: "border-gray-200", emoji: "📁" };
}

function computeCurveOffsets(count: number): number[] {
  if (count <= 1) return [0];
  const mid = (count - 1) / 2;
  const maxOffset = 40;
  return Array.from({ length: count }, (_, i) => {
    const normalized = Math.abs(i - mid) / mid;
    return Math.round(maxOffset * (1 - normalized));
  });
}

export default function Hero() {
  const [search, setSearch] = useState("");
  const { data: apiCategories, loading } = useApi<Category[]>("/categories");

  const categories =
    apiCategories && apiCategories.length > 0
      ? apiCategories
          .filter((c) => c.isActive)
          .slice(0, 6)
          .map((c) => {
            const style = getCategoryStyle(c.name);
            return { _id: c._id, name: c.name, slug: c.slug, image: c.image, icon: c.icon || style.emoji, bg: style.bg, border: style.border };
          })
      : fallbackCategories.map((c, i) => ({
          _id: String(i),
          name: c.name,
          slug: c.name.toLowerCase().replace(/\s+/g, "-"),
          image: "",
          icon: c.icon,
          bg: c.bg,
          border: c.border,
        }));

  const curveOffsets = computeCurveOffsets(categories.length);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Pink background */}
      <div
        className="absolute inset-x-0 top-0 bg-primary"
        style={{ height: "480px", clipPath: "ellipse(85% 100% at 50% 0%)" }}
      />

      <div className="relative z-10 pt-10 sm:pt-14">
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 px-4 leading-tight"
        >
          What do you want to buy?
        </motion.h1>

        {/* Search bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto px-4 mb-10 sm:mb-14"
        >
          <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden">
            <div className="pl-4 sm:pl-5 pr-2 text-gray-400">
              <FiSearch className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search products, brands, categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (window.location.href = `/products${search ? `?q=${encodeURIComponent(search)}` : ""}`)}
              className="flex-1 py-3.5 pr-1 text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
            />
            <Link
              href={`/products${search ? `?q=${encodeURIComponent(search)}` : ""}`}
              className="bg-accent hover:bg-accent-dark text-dark font-semibold text-sm px-4 sm:px-6 py-3 mr-1 rounded-full transition-colors flex-shrink-0"
            >
              Search
            </Link>
          </div>
        </motion.div>

        {/* Category icons — horizontal scroll on mobile, arc on desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex md:justify-center items-start gap-4 sm:gap-6 md:gap-10 px-6 overflow-x-auto scrollbar-hide md:overflow-visible pb-4 md:pb-0"
        >
          {loading
            ? fallbackCategories.map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 animate-pulse flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/30" />
                  <div className="w-10 h-2.5 bg-white/30 rounded" />
                </div>
              ))
            : categories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  variants={fadeUp}
                  className="flex-shrink-0"
                  style={{ marginTop: `${curveOffsets[i]}px` }}
                >
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full p-1 bg-white shadow-md"
                    >
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover" />
                      ) : (
                        <div className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full ${cat.bg} border ${cat.border} flex items-center justify-center text-xl sm:text-2xl md:text-3xl`}>
                          {cat.icon}
                        </div>
                      )}
                    </motion.div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700 text-center max-w-[68px] leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
        </motion.div>

        {/* App download buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 px-4 pt-8 pb-10"
        >
          {[
            {
              label: "Google Play",
              path: "M3.176 3.09a1.5 1.5 0 0 0-.176.713v16.394c0 .257.063.5.176.713L13.338 12 3.176 3.09zm1.054-.854L14.89 11.15l2.95-2.95L5.665 1.448a1.49 1.49 0 0 0-1.435-.212zM18.95 9.31l-3.06 3.06 3.06 3.06 2.56-1.37a1.5 1.5 0 0 0 0-2.72l-2.56-1.37-.56.34h.56zm-4.16 4.16L4.23 22.764a1.49 1.49 0 0 0 1.435-.212l12.175-6.752-3.05-2.33z",
            },
            {
              label: "App Store",
              path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
            },
          ].map(({ label, path }) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-dark text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d={path} /></svg>
              {label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
