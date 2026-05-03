"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import {
  MdOutlineCheckroom, MdOutlineShoppingBasket, MdFaceRetouchingNatural,
  MdOutlinePhoneAndroid, MdOutlineDiamond, MdOutlineCloudDownload,
  MdOutlineHealthAndSafety, MdOutlineSportsSoccer, MdOutlineHome,
  MdMenuBook, MdOutlineFastfood,
} from "react-icons/md";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import type { Category } from "@/lib/api";
import type { IconType } from "react-icons";

const fallbackCategories = [
  { name: "Fashion",          Icon: MdOutlineCheckroom,       bg: "bg-orange-500" },
  { name: "Groceries",        Icon: MdOutlineShoppingBasket,  bg: "bg-pink-600"   },
  { name: "Beauty",           Icon: MdFaceRetouchingNatural,  bg: "bg-emerald-500"},
  { name: "Gadgets",          Icon: MdOutlinePhoneAndroid,    bg: "bg-yellow-500" },
  { name: "Jewelry",          Icon: MdOutlineDiamond,         bg: "bg-purple-500" },
  { name: "Digital Products", Icon: MdOutlineCloudDownload,   bg: "bg-blue-500"   },
];

const categoryIconMap: Record<string, { Icon: IconType; bg: string }> = {
  fashion:           { Icon: MdOutlineCheckroom,      bg: "bg-orange-500" },
  groceries:         { Icon: MdOutlineShoppingBasket, bg: "bg-pink-600"   },
  beauty:            { Icon: MdFaceRetouchingNatural, bg: "bg-emerald-500"},
  gadgets:           { Icon: MdOutlinePhoneAndroid,   bg: "bg-yellow-500" },
  electronics:       { Icon: MdOutlinePhoneAndroid,   bg: "bg-yellow-500" },
  jewelry:           { Icon: MdOutlineDiamond,        bg: "bg-purple-500" },
  "digital products":{ Icon: MdOutlineCloudDownload,  bg: "bg-blue-500"   },
  digital:           { Icon: MdOutlineCloudDownload,  bg: "bg-blue-500"   },
  health:            { Icon: MdOutlineHealthAndSafety,bg: "bg-teal-500"   },
  sports:            { Icon: MdOutlineSportsSoccer,   bg: "bg-sky-500"    },
  home:              { Icon: MdOutlineHome,            bg: "bg-amber-500"  },
  books:             { Icon: MdMenuBook,               bg: "bg-indigo-500" },
  food:              { Icon: MdOutlineFastfood,        bg: "bg-rose-500"   },
};

function getCategoryIcon(name: string): { Icon: IconType; bg: string } {
  const key = name.toLowerCase();
  for (const [match, style] of Object.entries(categoryIconMap)) {
    if (key.includes(match)) return style;
  }
  return { Icon: MdOutlineShoppingBasket, bg: "bg-gray-500" };
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
            const style = getCategoryIcon(c.name);
            return { _id: c._id, name: c.name, slug: c.slug, image: c.image, Icon: style.Icon, bg: style.bg };
          })
      : fallbackCategories.map((c, i) => ({
          _id: String(i),
          name: c.name,
          slug: c.name.toLowerCase().replace(/\s+/g, "-"),
          image: "",
          Icon: c.Icon,
          bg: c.bg,
        }));

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: `max(660px, ${((865 / 1440) * 100).toFixed(2)}vw)` }}
    >
      {/* Inline SVG — renders immediately with no network request, guarantees red background from top on all devices */}
      <svg
        aria-hidden="true"
        className="absolute top-0 left-0 w-full pointer-events-none select-none"
        style={{ height: `max(660px, ${((865 / 1440) * 100).toFixed(2)}vw)` }}
        viewBox="0 0 1440 865"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H1440V754.238L1091.82 847.748C1088.28 848.698 1084.65 849.256 1081 849.413L718 865L355.076 849.416C351.37 849.257 347.694 848.686 344.114 847.714L0 754.238V0Z"
          fill="#D7004B"
        />
      </svg>

      {/* Content in normal flow */}
      <div className="relative z-10 pt-[160px] sm:pt-[180px] lg:pt-[200px]">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-10 px-4 leading-tight"
        >
          Find your favourite item
        </motion.h1>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mx-auto px-4 mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center bg-white rounded-[8px] shadow-xl overflow-hidden">
            <div className="pl-4 sm:pl-5 pr-2 text-gray-400">
              <FiSearch className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search products, brands, categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (window.location.href = `/products${search ? `?q=${encodeURIComponent(search)}` : ""}`)}
              className="flex-1 py-4 pr-1 text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
            />
            <Link
              href={`/products${search ? `?q=${encodeURIComponent(search)}` : ""}`}
              className="bg-accent hover:bg-accent-dark text-dark font-semibold text-sm px-5 sm:px-7 py-3.5 mr-1 rounded-[6px] transition-colors flex-shrink-0"
            >
              Search
            </Link>
          </div>
        </motion.div>

        {/* Category icons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex md:justify-center items-start gap-4 sm:gap-8 md:gap-12 px-6 overflow-x-auto scrollbar-hide md:overflow-visible pb-6 md:pb-0"
        >
          {loading
            ? fallbackCategories.map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 animate-pulse flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/30" />
                  <div className="w-12 h-2.5 bg-white/30 rounded" />
                </div>
              ))
            : categories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                  className="flex-shrink-0"
                >
                  <Link href={`/products?category=${cat.slug}`} className="flex flex-col items-center gap-3 group">
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                      {cat.image ? (
                        <div className="rounded-full p-1 bg-white/20">
                          <img src={cat.image} alt={cat.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${cat.bg} flex items-center justify-center shadow-lg`}>
                          <cat.Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                        </div>
                      )}
                    </motion.div>
                    <span className="text-xs sm:text-sm font-semibold text-white text-center max-w-[84px] leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
        </motion.div>

        {/* App download buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4 px-6 sm:px-4 pt-8 sm:pt-16 pb-8 sm:pb-16"
        >
          {[
            {
              label: "Google Play",
              sub: "Get it on",
              path: "M3.176 3.09a1.5 1.5 0 0 0-.176.713v16.394c0 .257.063.5.176.713L13.338 12 3.176 3.09zm1.054-.854L14.89 11.15l2.95-2.95L5.665 1.448a1.49 1.49 0 0 0-1.435-.212zM18.95 9.31l-3.06 3.06 3.06 3.06 2.56-1.37a1.5 1.5 0 0 0 0-2.72l-2.56-1.37-.56.34h.56zm-4.16 4.16L4.23 22.764a1.49 1.49 0 0 0 1.435-.212l12.175-6.752-3.05-2.33z",
            },
            {
              label: "App Store",
              sub: "Download on the",
              path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
            },
          ].map(({ label, sub, path }) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-dark text-white rounded-xl px-6 sm:px-8 py-3.5 hover:bg-gray-800 transition-colors shadow-md w-auto min-w-[150px] sm:min-w-[180px]"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0"><path d={path} /></svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/70 leading-none">{sub}</span>
                <span className="text-base font-bold leading-snug">{label}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
