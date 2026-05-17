"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FiSearch, FiMapPin, FiShare2, FiShoppingCart,
  FiUserPlus, FiX, FiCheck, FiShoppingBag, FiStar, FiArrowRight,
} from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";

/* ─── palette ─── */
const COVER_GRADIENTS = [
  "from-rose-400 to-orange-300",
  "from-violet-500 to-fuchsia-400",
  "from-sky-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-amber-400 to-yellow-300",
  "from-pink-500 to-rose-400",
  "from-indigo-500 to-blue-400",
  "from-orange-500 to-amber-400",
  "from-teal-500 to-emerald-400",
  "from-fuchsia-500 to-pink-400",
];

const AVATAR_BG = [
  "bg-rose-500","bg-violet-600","bg-sky-500","bg-emerald-500",
  "bg-amber-500","bg-pink-600","bg-indigo-500","bg-orange-500",
];

/* seller bubble arc */
const ARC_Y = [0, 20, 36, 46, 52, 52, 46, 36, 20, 0];

/* ─── skeleton ─── */
function ShopSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 animate-pulse flex flex-col" style={{ minHeight: 300 }}>
      <div className="h-32 bg-gray-100 flex-shrink-0" />
      <div className="px-4 pt-10 pb-5 flex flex-col gap-3 flex-1">
        <div className="h-4 bg-gray-100 rounded-full w-3/5" />
        <div className="h-3 bg-gray-100 rounded-full w-2/5" />
        <div className="h-3 bg-gray-100 rounded-full w-full mt-1" />
        <div className="h-3 bg-gray-100 rounded-full w-4/5" />
        <div className="flex gap-2 mt-auto pt-3">
          <div className="h-9 bg-gray-100 rounded-2xl flex-1" />
          <div className="h-9 bg-gray-100 rounded-2xl flex-1" />
        </div>
      </div>
    </div>
  );
}

/* ─── shop card ─── */
function ShopCard({ shop, index }: { shop: VendorProfile; index: number }) {
  const grad = COVER_GRADIENTS[index % COVER_GRADIENTS.length];
  const avatarBg = AVATAR_BG[index % AVATAR_BG.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.055, ease: "easeOut" }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300 flex flex-col"
      style={{ minHeight: 300 }}
    >
      {/* cover */}
      <div className="relative h-32 flex-shrink-0 overflow-hidden">
        {shop.coverImage ? (
          <img src={shop.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`bg-gradient-to-br ${grad} w-full h-full group-hover:scale-105 transition-transform duration-500`}>
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 70%)" }} />
          </div>
        )}
        {/* follow btn */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-colors border border-white/30">
          <FiUserPlus className="w-3.5 h-3.5 text-white" />
        </button>
        {/* avatar */}
        <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-2xl bg-white shadow-lg ring-2 ring-white overflow-hidden flex items-center justify-center">
          {shop.image ? (
            <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full ${avatarBg} flex items-center justify-center`}>
              <span className="text-base font-black text-white">{shop.name?.charAt(0) || "?"}</span>
            </div>
          )}
        </div>
      </div>

      {/* body */}
      <div className="px-4 pt-9 pb-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-sm font-bold text-gray-900 truncate leading-tight">{shop.name}</p>
          {shop.verified && (
            <span className="flex-shrink-0 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <FiCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          <FiMapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{shop.location || "Lagos, Nigeria"}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {shop.description || "Visit this shop to explore their products and collections."}
        </p>
        {/* actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-2xl py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <FiShare2 className="w-3.5 h-3.5" /> Share
          </button>
          <Link
            href={`/shops/${shop.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-700 rounded-2xl py-2.5 text-xs font-semibold text-white transition-all"
          >
            <FiShoppingCart className="w-3.5 h-3.5" /> Shop
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── page ─── */
export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQ(search.trim()), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search]);

  const endpoint = debouncedQ ? `/vendor/top?q=${encodeURIComponent(debouncedQ)}` : "/vendor/top";
  const { data: vendors, loading } = useApi<VendorProfile[]>(endpoint);

  const clearSearch = () => { setSearch(""); setDebouncedQ(""); };
  const isSearching = debouncedQ.length > 0;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F7F6F3]">

        {/* ── Hero ── */}
        <section className="relative bg-[#FFD600] overflow-hidden" style={{ minHeight: "clamp(380px, 42vw, 560px)" }}>
          {/* decorative blobs */}
          <div className="absolute top-8 right-16 w-56 h-56 rounded-full bg-yellow-400/50 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-8 w-40 h-40 rounded-full bg-amber-300/40 blur-2xl pointer-events-none" />
          {/* dot grid */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10 flex flex-col items-center justify-center h-full pt-32 sm:pt-36 pb-14 sm:pb-20 px-4 text-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-black/10 text-gray-800 px-3.5 py-1.5 rounded-full tracking-wide uppercase">
                <FiStar className="w-3 h-3" /> Verified Vendors
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.95] tracking-tight">
                Discover<br />Amazing Shops
              </h1>
              <p className="text-gray-700/75 text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                Thousands of verified vendors. Safe escrow. Guaranteed delivery.
              </p>
            </motion.div>

            {/* search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl mx-auto px-4"
            >
              <div className="flex items-center bg-white rounded-full shadow-2xl shadow-black/15 p-1.5 gap-2">
                <div className="flex items-center gap-2 flex-1 pl-4 sm:pl-5 min-w-0">
                  <FiSearch className="w-5 h-5 text-gray-900 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search shops, categories, vendors…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent min-w-0"
                  />
                  {search && (
                    <button onClick={clearSearch} className="p-1 text-gray-400 hover:text-gray-700 transition-colors shrink-0">
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold text-sm px-6 sm:px-8 py-3 rounded-full transition-all duration-300 shrink-0 shadow-sm">
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Top Sellers arc ── */}
        <AnimatePresence>
  {!isSearching && (
    <motion.section
      initial={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden border-b border-gray-100"
      style={{ background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-10 pb-6">

        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">Top Sellers</h2>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
              This week
            </span>
          </div>
          <a
            href="#all-shops"
            className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            See all <FiArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* arc row */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap gap-5 sm:gap-8 px-2 pb-10 min-w-max mx-auto"
            style={{ alignItems: "flex-start" }}
          >
            {loading
              ? Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 shrink-0 animate-pulse"
                    style={{ marginTop: `${ARC_Y[i] ?? 0}px` }}
                  >
                    <div className="w-[72px] h-[72px] rounded-2xl bg-gray-100" />
                    <div className="w-10 h-2 bg-gray-100 rounded-full" />
                  </div>
                ))
              : (vendors || []).slice(0, 10).map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.055 }}
                    style={{ marginTop: `${ARC_Y[i] ?? 0}px` }}
                    className="flex flex-col items-center gap-3 shrink-0"
                  >
                    <Link href={`/shops/${vendor.id}`} className="group flex flex-col items-center gap-3">

                      {/* avatar */}
                      <motion.div
                        className="relative"
                        whileHover={{ y: -6, scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                      >
                        {/* glow for #1 */}
                        {i === 0 && (
                          <div className="absolute inset-0 rounded-2xl bg-amber-300/30 blur-md scale-110 -z-10" />
                        )}

                        <div
                          className={`
                            w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-2xl overflow-hidden
                            border-2 border-white
                            shadow-[0_2px_12px_rgba(0,0,0,0.10)]
                            group-hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]
                            ring-1 ring-gray-200/80 group-hover:ring-gray-300
                            transition-all duration-300
                            ${AVATAR_BG[i % AVATAR_BG.length]}
                            flex items-center justify-center
                          `}
                        >
                          {vendor.image ? (
                            <img
                              src={vendor.image}
                              alt={vendor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xl font-black text-white select-none">
                              {vendor.name?.charAt(0) || "?"}
                            </span>
                          )}
                        </div>

                        {/* crown for #1 */}
                        {i === 0 && (
                          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-base leading-none select-none">
                            👑
                          </span>
                        )}

                        {/* verified badge */}
                        {vendor.verified && (
                          <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                            <FiCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </span>
                        )}
                      </motion.div>

                      {/* name */}
                      <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-900 text-center max-w-[76px] truncate leading-tight transition-colors duration-200">
                        {vendor.name?.length > 12 ? vendor.name.slice(0, 11) + "…" : vendor.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>

      </div>
    </motion.section>
  )}
</AnimatePresence>

        {/* ── All Shops grid ── */}
        <section id="all-shops" className="py-8 sm:py-10 px-4">
          <div className="max-w-6xl mx-auto">
            {/* header row */}
            <div className="flex items-center justify-between mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
              >
                {isSearching ? (
                  <span>
                    Results for <span className="text-yellow-500">&ldquo;{debouncedQ}&rdquo;</span>
                    {!loading && vendors && (
                      <span className="text-base font-normal text-gray-400 ml-2">({vendors.length})</span>
                    )}
                  </span>
                ) : (
                  <span className=" mb-3">
                    All Shops
                    {(vendors || []).length > 0 && !loading && (
                      <span className="text-base font-normal text-gray-400 ml-2">({vendors?.length})</span>
                    )}
                  </span>
                )}
              </motion.h2>
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-xl transition-all"
                >
                  <FiX className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>

            {/* grid with AnimatePresence keyed to search query */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
                >
                  {Array.from({ length: 8 }, (_, i) => <ShopSkeleton key={i} />)}
                </motion.div>
              ) : !vendors || vendors.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-28 text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mb-4">
                    <FiShoppingBag className="w-7 h-7 text-gray-400" />
                  </div>
                  <p className="text-base font-bold text-gray-800 mb-1">
                    {isSearching ? "No shops found" : "No shops yet"}
                  </p>
                  <p className="text-sm text-gray-400 mb-6 max-w-xs">
                    {isSearching ? `Nothing matched "${debouncedQ}". Try something different.` : "Check back soon — vendors are joining daily."}
                  </p>
                  {isSearching && (
                    <button
                      onClick={clearSearch}
                      className="bg-gray-900 text-white text-sm font-bold px-6 py-2.5 rounded-2xl hover:bg-gray-700 transition-colors"
                    >
                      Browse All Shops
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`grid-${debouncedQ}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
                >
                  {vendors.map((shop, i) => <ShopCard key={shop.id} shop={shop} index={i} />)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}