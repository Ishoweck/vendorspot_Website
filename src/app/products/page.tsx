"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RefundBanner from "@/components/RefundBanner";
import { FiSearch, FiArrowRight, FiX, FiZap, FiTrendingUp, FiSmartphone, FiShoppingBag, FiMonitor, FiHome } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { Product } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

const quickCategories = [
  { label: "Electronics",  Icon: FiMonitor },
  { label: "Fashion",      Icon: FiShoppingBag },
  { label: "Phones",       Icon: FiSmartphone },
  { label: "Home",         Icon: FiHome },
  { label: "Flash Sales",  Icon: FiZap },
  { label: "Trending",     Icon: FiTrendingUp },
];

const fallbackProducts = Array.from({ length: 5 }, (_, i) => ({
  id: String(i), _id: String(i),
  name: "Sample Product", price: 45000, compareAtPrice: 56250, discountPercentage: 20,
  averageRating: 4.8, totalReviews: 120, images: [], slug: "",
  color: ["bg-red-100","bg-amber-100","bg-emerald-100","bg-sky-100","bg-violet-100"][i],
}));

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-100 h-40 sm:h-48" />
      <div className="p-3 space-y-2">
        <div className="h-2 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}

function SectionHeader({ title, icon, titleColor = "text-dark", badge }: {
  title: string; icon?: string; titleColor?: string; badge?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8 px-4">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="flex items-center gap-2.5"
      >
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className={`text-xl sm:text-2xl font-bold ${titleColor}`}>{title}</h2>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </motion.div>
      <a href="#" className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-primary transition-colors group">
        View All <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}

function ProductSection({
  title, icon, titleColor = "text-dark", badge,
  products, loading, fallback, horizontal = false,
}: {
  title: string; icon?: string; titleColor?: string; badge?: string;
  products: Product[] | null; loading: boolean; fallback: typeof fallbackProducts;
  horizontal?: boolean;
}) {
  const items = products && products.length > 0 ? products : loading ? [] : fallback;

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title={title} icon={icon} titleColor={titleColor} badge={badge} />
        {horizontal ? (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {loading
              ? Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex-shrink-0 w-40 sm:w-44"><ProductSkeleton /></div>
                ))
              : items.map((product) => (
                  <div key={product.id || product._id} className="flex-shrink-0 w-40 sm:w-44">
                    <ProductCard {...product} />
                  </div>
                ))}
          </div>
        ) : (
          <motion.div
            key={loading ? "loading" : "loaded"}
            variants={stagger} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 px-4"
          >
            {loading
              ? Array.from({ length: 5 }, (_, i) => <ProductSkeleton key={i} />)
              : items.map((product) => (
                  <motion.div key={product.id || product._id} variants={fadeUp}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(urlQuery);
  const [focused, setFocused] = useState(false);

  useEffect(() => { setSearch(urlQuery); }, [urlQuery]);

  const handleSearch = () => {
    const q = search.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  const clearSearch = () => {
    setSearch("");
    router.push("/products");
  };

  const searchEndpoint  = urlQuery ? `/products/search?q=${encodeURIComponent(urlQuery)}&limit=20` : null;
  const { data: searchResults, loading: searchLoading } = useApi<Product[]>(searchEndpoint);
  const { data: newArrivals,   loading: loadingNew     } = useApi<Product[]>(urlQuery ? null : "/products/new-arrivals?limit=10");
  const { data: recommended,   loading: loadingRec     } = useApi<Product[]>(urlQuery ? null : "/products/recommended?limit=5");
  const { data: flashSales,    loading: loadingFlash   } = useApi<Product[]>(urlQuery ? null : "/products/flash-sales?limit=5");
  const { data: trending,      loading: loadingTrend   } = useApi<Product[]>(urlQuery ? null : "/products/trending?limit=5");
  const { data: digital,       loading: loadingDigital } = useApi<Product[]>(urlQuery ? null : "/products?productType=digital&limit=5");

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 text-center"
          style={{ backgroundColor: "#8A38F5" }}>
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", transform: "translate(35%,-35%)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              Thousands of verified products
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8"
            >
              Find your<br className="hidden sm:block" /> favourite item
            </motion.h1>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={`flex items-center bg-white rounded-full shadow-2xl p-1.5 gap-2 transition-all duration-300 ${focused ? "ring-4 ring-white/30" : ""}`}>
                <div className="flex items-center gap-2 flex-1 pl-4 sm:pl-5 min-w-0">
                  <FiSearch className="w-5 h-5 text-primary shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products, brands, categories…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent min-w-0"
                  />
                  {search && (
                    <button onClick={clearSearch} className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 sm:px-8 py-3 rounded-full transition-all duration-300 shrink-0 shadow-sm"
                >
                  Search
                </button>
              </div>
            </motion.div>

            {/* Quick category pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mt-6"
            >
              {quickCategories.map(({ label, Icon }) => (
                <button
                  key={label}
                  onClick={() => { setSearch(label); router.push(`/products?q=${encodeURIComponent(label)}`); }}
                  className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200"
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {urlQuery ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
            >
              <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-dark">
                        Results for &ldquo;{urlQuery}&rdquo;
                      </h2>
                      {!searchLoading && searchResults && (
                        <p className="text-sm text-gray-400 mt-1">
                          {searchResults.length} product{searchResults.length !== 1 ? "s" : ""} found
                        </p>
                      )}
                    </div>
                    <button
                      onClick={clearSearch}
                      className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                    >
                      <FiX className="w-4 h-4" /> Clear
                    </button>
                  </div>

                  {searchLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                      {Array.from({ length: 10 }, (_, i) => <ProductSkeleton key={i} />)}
                    </div>
                  ) : !searchResults || searchResults.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-24 text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                        <FiSearch className="w-7 h-7 text-gray-300" />
                      </div>
                      <p className="text-lg font-bold text-dark mb-2">No products found</p>
                      <p className="text-sm text-gray-400 mb-6 max-w-xs">Try a different keyword or browse popular categories below</p>
                      <button
                        onClick={clearSearch}
                        className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
                      >
                        Browse All Products
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={stagger} initial="hidden" animate="visible"
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                    >
                      {searchResults.map((product) => (
                        <motion.div key={product.id || product._id} variants={fadeUp}>
                          <ProductCard {...product} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            >
              <ProductSection title="New Arrivals" icon="✨" products={newArrivals} loading={loadingNew} fallback={fallbackProducts} />
              <ProductSection title="Recommended for You" titleColor="text-primary" badge="Personalised" products={recommended} loading={loadingRec} fallback={fallbackProducts} horizontal />
              <ProductSection title="Flash Sales" icon="⚡" badge="Limited Time" products={flashSales} loading={loadingFlash} fallback={fallbackProducts} />

              {/* Digital banner */}
              <section className="px-4 py-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-dark px-8 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(138,56,245,0.25) 0%, transparent 60%)" }} />
                  <div className="relative z-10">
                    <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">Instant Delivery</span>
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 leading-tight">
                      Digital Products
                    </h3>
                    <p className="text-white/50 text-sm mb-6">E-books, courses, software keys &amp; more — delivered instantly.</p>
                    <a href="#" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-dark text-sm font-bold rounded-xl px-5 py-2.5 transition-colors">
                      Browse Digital <FiArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="relative z-10 hidden sm:flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-24 h-24 shrink-0">
                    <span className="text-4xl text-white/80 font-mono font-bold select-none">&lt;/&gt;</span>
                  </div>
                </motion.div>
              </section>

              <ProductSection title="Digital Products" products={digital} loading={loadingDigital} fallback={fallbackProducts} />
              <ProductSection title="Trending Now" icon="🔥" products={trending} loading={loadingTrend} fallback={fallbackProducts} />

              <RefundBanner />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
