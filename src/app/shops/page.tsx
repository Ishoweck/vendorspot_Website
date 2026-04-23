"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiSearch, FiMapPin, FiShare2, FiShoppingCart, FiUserPlus } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";

const shopColors = [
  "bg-red-200", "bg-blue-200", "bg-green-200", "bg-amber-200", "bg-violet-200",
  "bg-pink-200", "bg-teal-200", "bg-orange-200", "bg-indigo-200", "bg-rose-200",
];

const sellerColors = [
  "bg-red-400", "bg-orange-400", "bg-purple-400", "bg-pink-400",
  "bg-teal-400", "bg-blue-400", "bg-yellow-400",
];

function ShopSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse h-[310px] flex flex-col">
      <div className="bg-gray-200 h-32 flex-shrink-0" />
      <div className="p-4 pt-10 flex flex-col flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
        <div className="h-3 bg-gray-200 rounded w-full mb-1 flex-1" />
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-[310px]">
      {/* Banner */}
      <div className="relative h-32 flex-shrink-0">
        {shop.coverImage ? (
          <img src={shop.coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className={`${shopColors[index % shopColors.length]} w-full h-full`} />
        )}
        <button className="absolute top-3 right-3 w-8 h-8 bg-dark/80 hover:bg-dark rounded-full flex items-center justify-center transition-colors">
          <FiUserPlus className="w-4 h-4 text-white" />
        </button>
        <div className="absolute -bottom-7 left-4 w-14 h-14 rounded-full bg-white border-2 border-white shadow-md overflow-hidden flex items-center justify-center flex-shrink-0">
          {shop.image ? (
            <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-gray-600">{shop.name?.charAt(0) || "?"}</span>
          )}
        </div>
      </div>

      {/* Content — fills remaining height, buttons pinned to bottom */}
      <div className="px-4 pt-10 pb-4 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-1.5 mb-1">
          <p className="text-sm font-bold text-dark truncate">{shop.name}</p>
          {shop.verified && <span className="text-accent text-base leading-none flex-shrink-0">✔</span>}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <FiMapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{shop.location || "Lagos, Nigeria"}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1 min-h-[3rem]">
          {shop.description || "Visit this shop to explore their products."}
        </p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FiShare2 className="w-3.5 h-3.5" />
            Share
          </button>
          <Link
            href={`/shops/${shop.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-dark rounded-lg py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
          >
            <FiShoppingCart className="w-3.5 h-3.5" />
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const { data: vendors, loading } = useApi<VendorProfile[]>("/vendor/top");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Yellow/Accent hero with curve */}
        <section className="relative bg-white">
          <div
            className="absolute inset-x-0 top-0 bg-accent"
            style={{
              height: "280px",
              clipPath: "ellipse(85% 100% at 50% 0%)",
            }}
          />
          <div className="relative z-10 pt-10 pb-14">
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-8 px-4">
              What do you want to buy?
            </h1>
            <div className="max-w-xl mx-auto px-4">
              <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                <div className="pl-5 pr-3 text-gray-400">
                  <FiSearch className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search for products, brand, categories or vendors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 py-3.5 pr-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
                <button className="bg-dark hover:bg-gray-800 text-white font-semibold text-sm px-6 py-3 mr-1 rounded-full transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Top Sellers */}
        <section className="pt-16 pb-10 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6 flex items-center gap-2">
              Top Sellers <span className="text-green-500">✅</span>
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {loading
                ? Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[72px] animate-pulse">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200" />
                      <div className="w-14 h-3 bg-gray-200 rounded" />
                    </div>
                  ))
                : (vendors || []).slice(0, 10).map((vendor, i) => (
                    <Link
                      key={vendor.id}
                      href={`/shops/${vendor.id}`}
                      className="flex flex-col items-center gap-2 min-w-[72px]"
                    >
                      {vendor.image ? (
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-md object-cover"
                        />
                      ) : (
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${sellerColors[i % sellerColors.length]} border-2 border-white shadow-md flex items-center justify-center text-white text-xl font-bold`}
                        >
                          {vendor.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <span className="text-xs text-gray-600 text-center truncate w-16">
                        {vendor.name?.length > 12 ? vendor.name.slice(0, 10) + "..." : vendor.name}
                      </span>
                    </Link>
                  ))}
            </div>
          </div>
        </section>

        {/* All Shops */}
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-8">
              All Shops
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {loading
                ? Array.from({ length: 8 }, (_, i) => <ShopSkeleton key={i} />)
                : (vendors || []).map((shop, i) => (
                    <ShopCard key={shop.id} shop={shop} index={i} />
                  ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
