"use client";

import { Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { usePagedApi } from "@/lib/useApi";
import { fadeUp, stagger } from "@/lib/motion";
import type { Product } from "@/lib/api";

const PAGE_SIZE = 16;

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

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {visible.map((p, i) => {
        const prev = visible[i - 1];
        return (
          <span key={p} className="flex items-center gap-1.5">
            {prev && p - prev > 1 && <span className="text-gray-400 text-sm px-1">…</span>}
            <button
              onClick={() => onChange(p)}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${
                p === page
                  ? "bg-primary text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function NewArrivalsContent() {
  const [page, setPage] = useState(1);
  const { data: products, total, totalPages, loading } = usePagedApi<Product>(
    `/products/new-arrivals?limit=${PAGE_SIZE}&page=${page}`
  );

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-gray-50 pt-20 sm:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 pt-4">
            <Link href="/products" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
              <FiArrowLeft className="w-4 h-4 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-dark">New Arrivals ✨</h1>
              {!loading && total > 0 && (
                <p className="text-sm text-gray-400 mt-0.5">{total} products · Page {page} of {totalPages}</p>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {loading
                ? Array.from({ length: PAGE_SIZE }, (_, i) => <ProductSkeleton key={i} />)
                : products?.map((product) => (
                    <motion.div key={product.id || product._id} variants={fadeUp}>
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
            </motion.div>
          </AnimatePresence>

          {!loading && (!products || products.length === 0) && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-bold text-dark mb-2">No new arrivals yet</p>
              <p className="text-sm text-gray-400 mb-6">Check back soon for the latest products.</p>
              <Link href="/products" className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors">
                Browse All Products
              </Link>
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function NewArrivalsPage() {
  return <Suspense><NewArrivalsContent /></Suspense>;
}
