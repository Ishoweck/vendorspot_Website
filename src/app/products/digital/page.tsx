"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { FiZap, FiArrowLeft } from "react-icons/fi";
import { useApi } from "@/lib/useApi";
import type { Product } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

const digitalCategories = [
  { label: "E-Books",      emoji: "📚" },
  { label: "Courses",      emoji: "🎓" },
  { label: "Software Keys",emoji: "🔑" },
  { label: "Templates",    emoji: "🗂️" },
  { label: "Music & Audio",emoji: "🎵" },
  { label: "Design Assets",emoji: "🎨" },
];

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

export default function DigitalProductsPage() {
  const { data: products, loading } = useApi<Product[]>("/products?productType=digital&limit=20");

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16 px-6 text-center bg-dark">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(138,56,245,0.25) 0%, transparent 60%)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,214,0,0.07) 0%, transparent 70%)", transform: "translate(-30%, 40%)" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              <FiZap className="w-3.5 h-3.5" /> Instant Delivery
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Digital Products
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.15 }}
              className="text-white/50 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              E-books, courses, software keys, templates &amp; more — delivered to you instantly after purchase.
            </motion.p>
          </div>
        </section>

        {/* Category pills */}
        <section className="py-6 px-6 border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {digitalCategories.map(({ label, emoji }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-primary/8 border border-gray-100 hover:border-primary/20 text-dark hover:text-primary text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                >
                  <span>{emoji}</span>{label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products grid */}
        <section className="py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 px-1">
              <Link href="/products" className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-400 hover:text-dark transition-colors">
                <FiArrowLeft className="w-3.5 h-3.5" /> All products
              </Link>
              {!loading && products && (
                <span className="text-xs text-gray-400">{products.length} items</span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {Array.from({ length: 10 }, (_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : !products || products.length === 0 ? (
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="flex flex-col items-center justify-center py-28 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mb-4 text-3xl">
                  📦
                </div>
                <p className="text-base font-bold text-dark mb-1">No digital products yet</p>
                <p className="text-sm text-gray-400 mb-6 max-w-xs">Check back soon — vendors are listing digital products daily.</p>
                <Link href="/products" className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors">
                  Browse All Products
                </Link>
              </motion.div>
            ) : (
              <motion.div
                variants={stagger} initial="hidden" animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
              >
                {products.map((product) => (
                  <motion.div key={product.id || product._id} variants={fadeUp}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
