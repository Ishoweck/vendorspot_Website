"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiSearch, FiMapPin, FiShare2, FiShoppingCart, FiUserPlus, FiX } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";
import { fadeUp } from "@/lib/motion";

const shopColors = [
  "bg-red-200","bg-blue-200","bg-green-200","bg-amber-200","bg-violet-200",
  "bg-pink-200","bg-teal-200","bg-orange-200","bg-indigo-200","bg-rose-200",
];

const sellerColors = [
  "bg-red-400","bg-orange-400","bg-purple-400","bg-pink-400",
  "bg-teal-400","bg-blue-400","bg-yellow-400",
];

function ShopSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col" style={{ minHeight: 300 }}>
      <div className="bg-gray-200 h-28 flex-shrink-0" />
      <div className="p-4 pt-10 flex flex-col flex-1 gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full flex-1" />
        <div className="flex gap-2 mt-3">
          <div className="h-8 bg-gray-200 rounded-lg flex-1" />
          <div className="h-8 bg-gray-200 rounded-lg flex-1" />
        </div>
      </div>
    </div>
  );
}

function ShopCard({ shop, index }: { shop: VendorProfile; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm transition-shadow flex flex-col"
      style={{ minHeight: 295 }}
    >
      <div className="relative h-28 flex-shrink-0">
        {shop.coverImage ? (
          <img src={shop.coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className={`${shopColors[index % shopColors.length]} w-full h-full`} />
        )}
        <button className="absolute top-2.5 right-2.5 w-8 h-8 bg-dark/70 hover:bg-dark rounded-full flex items-center justify-center transition-colors">
          <FiUserPlus className="w-3.5 h-3.5 text-white" />
        </button>
        <div className="absolute -bottom-6 left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
          {shop.image ? (
            <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg sm:text-xl font-bold text-gray-600">{shop.name?.charAt(0) || "?"}</span>
          )}
        </div>
      </div>

      <div className="px-4 pt-9 pb-4 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-sm font-bold text-dark truncate">{shop.name}</p>
          {shop.verified && <span className="text-accent text-sm leading-none flex-shrink-0">✔</span>}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
          <FiMapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{shop.location || "Lagos, Nigeria"}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {shop.description || "Visit this shop to explore their products."}
        </p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FiShare2 className="w-3.5 h-3.5" /> Share
          </button>
          <Link
            href={`/shops/${shop.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-dark rounded-xl py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
          >
            <FiShoppingCart className="w-3.5 h-3.5" /> Visit
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQ(search.trim());
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const endpoint = debouncedQ
    ? `/vendor/top?q=${encodeURIComponent(debouncedQ)}`
    : "/vendor/top";

  const { data: vendors, loading } = useApi<VendorProfile[]>(endpoint);

  const clearSearch = () => {
    setSearch("");
    setDebouncedQ("");
  };

  const isSearching = debouncedQ.length > 0;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative flex flex-col"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="1440" height="481" viewBox="0 0 1440 481" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 -384H1440V370.238L1091.82 463.748C1088.28 464.698 1084.65 465.256 1081 465.413L718 481L355.076 465.416C351.37 465.257 347.694 464.686 344.114 463.714L0 370.238V-384Z" fill="#ffc300"/></svg>')}")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            minHeight: `max(340px, ${((481 / 1440) * 100).toFixed(2)}vw)`,
          }}
        >
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-16 pb-8 sm:pb-12 lg:pb-16">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-8 sm:mb-10 px-4 leading-tight"
            >
              Discover Amazing Shops
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-xl mx-auto px-4"
            >
              <div className="flex items-center bg-white rounded-[8px] shadow-xl overflow-hidden">
                <div className="pl-4 sm:pl-5 pr-2 text-gray-400"><FiSearch className="w-5 h-5" /></div>
                <input
                  type="text"
                  placeholder="Search shops, vendors…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 py-4 pr-1 text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
                />
                {search && (
                  <button onClick={clearSearch} className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                    <FiX className="w-4 h-4" />
                  </button>
                )}
                <button className="bg-dark hover:bg-gray-800 text-white font-semibold text-sm px-5 sm:px-7 py-3.5 mr-1 rounded-[6px] transition-colors flex-shrink-0">
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Top Sellers row — hidden while searching */}
        <AnimatePresence>
          {!isSearching && (
            <motion.section
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-8 sm:pt-10 pb-10 px-4 overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-xl sm:text-2xl font-bold text-dark mb-6 flex items-center gap-2"
                >
                  Top Sellers <span>⭐</span>
                </motion.h2>
                <div className="flex gap-5 sm:gap-8 overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center flex-wrap sm:flex-nowrap">
                  {loading
                    ? Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[64px] animate-pulse">
                          <div className="w-14 h-14 rounded-full bg-gray-200" />
                          <div className="w-12 h-2.5 bg-gray-200 rounded" />
                        </div>
                      ))
                    : (vendors || []).slice(0, 10).map((vendor, i) => (
                        <motion.div
                          key={vendor.id}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: i * 0.05 }}
                          className="flex flex-col items-center gap-2 min-w-[64px] flex-shrink-0"
                        >
                          <Link href={`/shops/${vendor.id}`}>
                            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                              {vendor.image ? (
                                <img src={vendor.image} alt={vendor.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-md object-cover" />
                              ) : (
                                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${sellerColors[i % sellerColors.length]} border-2 border-white shadow-md flex items-center justify-center text-white text-lg font-bold`}>
                                  {vendor.name?.charAt(0) || "?"}
                                </div>
                              )}
                            </motion.div>
                          </Link>
                          <span className="text-[10px] sm:text-xs text-gray-600 text-center truncate w-14">
                            {vendor.name?.length > 10 ? vendor.name.slice(0, 9) + "…" : vendor.name}
                          </span>
                        </motion.div>
                      ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* All Shops / Search Results */}
        <section className="py-6 sm:py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-dark"
              >
                {isSearching ? (
                  <>Results for &ldquo;{debouncedQ}&rdquo; {!loading && vendors && <span className="text-base font-normal text-gray-400 ml-1">({vendors.length})</span>}</>
                ) : (
                  <>All Shops {(vendors || []).length > 0 && !loading && <span className="text-base font-normal text-gray-400 ml-1">({vendors?.length})</span>}</>
                )}
              </motion.h2>
              {isSearching && (
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  <FiX className="w-4 h-4" /> Clear
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
                >
                  {Array.from({ length: 8 }, (_, i) => <ShopSkeleton key={i} />)}
                </motion.div>
              ) : !vendors || vendors.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="text-5xl mb-4">🏪</div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    {isSearching ? "No shops found" : "No shops available"}
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    {isSearching ? `No results for "${debouncedQ}". Try a different search.` : "Check back soon!"}
                  </p>
                  {isSearching && (
                    <button
                      onClick={clearSearch}
                      className="bg-dark text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Browse All Shops
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`grid-${debouncedQ}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
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
