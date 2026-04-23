"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RefundBanner from "@/components/RefundBanner";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { Product } from "@/lib/api";

const features = [
  { label: "Shop with Confidence", icon: "/icons/prod_1.svg" },
  { label: "Worldwide Delivery", icon: "/icons/prod_2.svg" },
  { label: "Safe Payment", icon: "/icons/prod_3.svg" },
  { label: "24/7 Support", icon: "/icons/prod_4.svg" },
];

// Fallback data when API is unavailable
const fallbackProducts = Array.from({ length: 5 }, (_, i) => ({
  id: String(i),
  _id: String(i),
  name: "Sample Product",
  price: 45000,
  compareAtPrice: 56250,
  discountPercentage: 20,
  averageRating: 4.8,
  totalReviews: 120,
  images: [],
  slug: "",
  color: ["bg-red-100", "bg-amber-100", "bg-emerald-100", "bg-sky-100", "bg-violet-100"][i],
  emoji: "📦",
}));

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-40 sm:h-48" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

function ProductSection({
  title,
  icon,
  titleColor = "text-dark",
  products,
  loading,
  fallback,
}: {
  title: string;
  icon?: string;
  titleColor?: string;
  products: Product[] | null;
  loading: boolean;
  fallback: typeof fallbackProducts;
}) {
  const items = products && products.length > 0 ? products : loading ? [] : fallback;

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold ${titleColor} flex items-center gap-2`}>
            {icon && <span>{icon}</span>}
            {title}
          </h2>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            View All
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 5 }, (_, i) => <ProductSkeleton key={i} />)
            : items.map((product) => (
                <ProductCard key={product.id || product._id} {...product} />
              ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const { data: newArrivals, loading: loadingNew } = useApi<Product[]>("/products/new-arrivals?limit=10");
  const { data: recommended, loading: loadingRec } = useApi<Product[]>("/products/recommended?limit=5");
  const { data: flashSales, loading: loadingFlash } = useApi<Product[]>("/products/flash-sales?limit=5");
  const { data: trending, loading: loadingTrend } = useApi<Product[]>("/products/trending?limit=5");
  const { data: digital, loading: loadingDigital } = useApi<Product[]>("/products?productType=digital&limit=5");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Purple hero with curve */}
        <section className="relative bg-white">
          <div
            className="absolute inset-x-0 top-0 bg-violet-600"
            style={{
              height: "320px",
              clipPath: "ellipse(85% 100% at 50% 0%)",
            }}
          />
          <div className="relative z-10 pt-12 pb-16">
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 px-4">
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
                <button className="bg-accent hover:bg-accent-dark text-dark font-semibold text-sm px-6 py-3 mr-1 rounded-full transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature badges */}
        <section className="pt-28 pb-10 px-4">
          <div className="max-w-4xl mx-auto rounded-2xl py-8 px-6" style={{ backgroundColor: "#ede1fd" }}>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14">
              {features.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-100 flex items-center justify-center shadow-sm p-4">
                    <img src={f.icon} alt={f.label} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <ProductSection title="New Arrivals" products={newArrivals} loading={loadingNew} fallback={fallbackProducts} />

        {/* Recommended for you */}
        <ProductSection
          title="Recommended for you"
          titleColor="text-primary"
          products={recommended}
          loading={loadingRec}
          fallback={fallbackProducts}
        />

        {/* Flash Sales */}
        <ProductSection title="Flash Sales" icon="🔥" products={flashSales} loading={loadingFlash} fallback={fallbackProducts} />

        {/* Digital Products Banner */}
        <section className="px-4 py-6">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-8 flex items-center justify-between overflow-hidden">
            <div>
              <p className="text-accent text-xs font-bold tracking-wider uppercase mb-1">
                Instant Delivery
              </p>
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                Digital Products
              </h3>
              <p className="text-white/70 text-sm mb-4">
                E-books, courses, software keys &amp; more.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-white text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-white/10 transition-colors"
              >
                Browse Digital <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden sm:flex text-7xl md:text-8xl opacity-80 text-white">
              &lt;/&gt;
            </div>
          </div>
        </section>

        {/* Digital Products Grid */}
        <ProductSection title="Digital Products" icon="📦" products={digital} loading={loadingDigital} fallback={fallbackProducts} />

        {/* Trending Now */}
        <ProductSection title="Trending Now" products={trending} loading={loadingTrend} fallback={fallbackProducts} />

        {/* Refund Banner */}
        <RefundBanner />
      </main>
      <Footer />
    </>
  );
}
