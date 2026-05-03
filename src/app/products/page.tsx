"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import RefundBanner from "@/components/RefundBanner";
import { FiSearch, FiArrowRight, FiX } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { Product } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

const fallbackProducts = Array.from({ length: 5 }, (_, i) => ({
  id: String(i), _id: String(i),
  name: "Sample Product", price: 45000, compareAtPrice: 56250, discountPercentage: 20,
  averageRating: 4.8, totalReviews: 120, images: [], slug: "",
  color: ["bg-red-100","bg-amber-100","bg-emerald-100","bg-sky-100","bg-violet-100"][i],
  emoji: "📦",
}));

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-36 sm:h-44" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

function ProductSection({
  title, icon, titleColor = "text-dark", products, loading, fallback, horizontal = false,
}: {
  title: string; icon?: string; titleColor?: string;
  products: Product[] | null; loading: boolean; fallback: typeof fallbackProducts;
  horizontal?: boolean;
}) {
  const items = products && products.length > 0 ? products : loading ? [] : fallback;

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8 px-4">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${titleColor} flex items-center gap-2`}
          >
            {icon && <span>{icon}</span>}
            {title}
          </motion.h2>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
            View All <FiArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

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
            variants={stagger}
            initial="hidden"
            whileInView="visible"
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

  useEffect(() => {
    setSearch(urlQuery);
  }, [urlQuery]);

  const handleSearch = () => {
    const q = search.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  };

  const clearSearch = () => {
    setSearch("");
    router.push("/products");
  };

  const searchEndpoint = urlQuery
    ? `/products/search?q=${encodeURIComponent(urlQuery)}&limit=20`
    : null;

  const { data: searchResults, loading: searchLoading } = useApi<Product[]>(searchEndpoint);
  const { data: newArrivals,  loading: loadingNew    } = useApi<Product[]>(urlQuery ? null : "/products/new-arrivals?limit=10");
  const { data: recommended,  loading: loadingRec    } = useApi<Product[]>(urlQuery ? null : "/products/recommended?limit=5");
  const { data: flashSales,   loading: loadingFlash  } = useApi<Product[]>(urlQuery ? null : "/products/flash-sales?limit=5");
  const { data: trending,     loading: loadingTrend  } = useApi<Product[]>(urlQuery ? null : "/products/trending?limit=5");
  const { data: digital,      loading: loadingDigital} = useApi<Product[]>(urlQuery ? null : "/products?productType=digital&limit=5");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative flex flex-col"
          style={{
            backgroundImage: "url('/prod_rec.svg')",
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
              className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 sm:mb-10 px-4 leading-tight"
            >
              Find your favourite item
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
                  placeholder="Search products, brands, categories…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 py-4 pr-1 text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
                />
                {search && (
                  <button onClick={clearSearch} className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                    <FiX className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="bg-accent hover:bg-accent-dark text-dark font-semibold text-sm px-5 sm:px-7 py-3.5 mr-1 rounded-[6px] transition-colors flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {urlQuery ? (
            /* ── Search Results ── */
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <section className="py-8 sm:py-10 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark">
                        Results for &ldquo;{urlQuery}&rdquo;
                      </h2>
                      {!searchLoading && searchResults && (
                        <p className="text-sm text-gray-400 mt-1">{searchResults.length} product{searchResults.length !== 1 ? "s" : ""} found</p>
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-24 text-center"
                    >
                      <div className="text-5xl mb-4">🔍</div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">No products found</p>
                      <p className="text-sm text-gray-400 mb-6">Try a different keyword or browse categories below</p>
                      <button
                        onClick={clearSearch}
                        className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
                      >
                        Browse All Products
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      animate="visible"
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
            /* ── Normal browse view ── */
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductSection title="New Arrivals" products={newArrivals} loading={loadingNew} fallback={fallbackProducts} />
              <ProductSection title="Recommended for you" titleColor="text-primary" products={recommended} loading={loadingRec} fallback={fallbackProducts} horizontal />
              <ProductSection title="Flash Sales" icon="🔥" products={flashSales} loading={loadingFlash} fallback={fallbackProducts} />

              {/* Digital banner */}
              <section className="px-4 py-5 sm:py-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-7xl mx-auto bg-primary rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
                >
                  <div>
                    <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">Instant Delivery</p>
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">Digital Products</h3>
                    <p className="text-white/70 text-sm mb-5">E-books, courses, software keys &amp; more.</p>
                    <a href="#" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-dark text-sm font-bold rounded-lg px-5 py-2.5 transition-colors">
                      Browse Digital <FiArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="hidden sm:flex items-center justify-center bg-white/10 rounded-2xl w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <span className="text-3xl md:text-4xl text-white font-mono font-bold select-none">&lt;/&gt;</span>
                  </div>
                </motion.div>
              </section>

              <ProductSection title="Digital Products" icon="📦" products={digital} loading={loadingDigital} fallback={fallbackProducts} />
              <ProductSection title="Trending Now" products={trending} loading={loadingTrend} fallback={fallbackProducts} />

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
