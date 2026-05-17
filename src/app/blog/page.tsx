"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiArrowRight, FiClock, FiUser } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const categories = ["All", "Tips & Guides", "Vendor Stories", "Updates", "Safety"];

const posts = [
  {
    slug: "how-escrow-protects-you",
    category: "Safety",
    title: "How Escrow Payments Protect Every Buyer on Vendorspot",
    excerpt: "Your money never goes directly to a vendor until you confirm your order is exactly what you paid for. Here's exactly how escrow works on our platform.",
    author: "Olayinka Olasunkanmi",
    date: "May 10, 2026",
    readTime: "4 min read",
    featured: true,
    color: "bg-violet-500",
  },
  {
    slug: "grow-your-shop",
    category: "Vendor Stories",
    title: "From Side Hustle to 500+ Orders: How Enis Perfumery Grew on Vendorspot",
    excerpt: "Seyifunmi started selling fragrances from her bedroom. Two years later, she's one of our top verified vendors. This is her story.",
    author: "Vendorspot Team",
    date: "May 3, 2026",
    readTime: "6 min read",
    featured: false,
    color: "bg-rose-400",
  },
  {
    slug: "tips-for-safe-buying",
    category: "Tips & Guides",
    title: "5 Things to Always Check Before You Buy from Any Online Store",
    excerpt: "Online shopping fraud is real. These five checks take less than two minutes and could save you from losing money to fake vendors.",
    author: "Vendorspot Team",
    date: "Apr 28, 2026",
    readTime: "3 min read",
    featured: false,
    color: "bg-amber-400",
  },
  {
    slug: "vendor-verification-explained",
    category: "Updates",
    title: "What Our Vendor Verification Process Actually Looks Like",
    excerpt: "We don't just tick a box. Every verified badge on Vendorspot represents a real business that has passed our multi-step review process.",
    author: "Olayinka Olasunkanmi",
    date: "Apr 18, 2026",
    readTime: "5 min read",
    featured: false,
    color: "bg-teal-500",
  },
  {
    slug: "sell-better-photos",
    category: "Tips & Guides",
    title: "Better Product Photos = More Sales. Here's How to Take Them With Your Phone",
    excerpt: "You don't need a DSLR or a studio. With the right setup and these simple tips, your product photos will stand out in any marketplace.",
    author: "Vendorspot Team",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    featured: false,
    color: "bg-blue-500",
  },
  {
    slug: "refund-policy-guide",
    category: "Safety",
    title: "Understanding the 100% Refund Guarantee — and When It Applies",
    excerpt: "Our refund guarantee isn't just marketing. Here's a plain-English breakdown of what it covers, how to claim it, and what to do if a vendor disputes.",
    author: "Vendorspot Team",
    date: "Apr 2, 2026",
    readTime: "4 min read",
    featured: false,
    color: "bg-emerald-500",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = posts.find((p) => p.featured)!;
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section
          className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 text-center"
          style={{ backgroundColor: "rgba(138, 56, 245, 0.10)" }}
        >
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 bg-[#8A38F5]/10 border border-[#8A38F5]/20 text-[#8A38F5] text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
          >
            Vendorspot Blog
          </motion.div>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-dark leading-tight mb-4"
          >
            Stories, Tips &amp;<br className="hidden sm:block" /> Insights
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.18 }}
            className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Everything you need to buy smarter, sell better, and understand how Vendorspot keeps commerce safe.
          </motion.p>
        </section>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 sm:pb-28">

          {/* Featured post */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-14 -mt-6"
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 md:grid-cols-2">
                <div className={`${featured.color} min-h-52 sm:min-h-72 flex items-center justify-center relative overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }}
                  />
                  <span className="text-white/30 text-8xl font-black select-none">VS</span>
                  <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                    Featured
                  </span>
                </div>
                <div className="bg-white p-8 sm:p-10 flex flex-col justify-center gap-4">
                  <span className="text-xs font-bold text-[#8A38F5] uppercase tracking-widest">{featured.category}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-dark leading-snug group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5"><FiUser className="w-3 h-3" />{featured.author}</span>
                      <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{featured.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-3 transition-all">
                      Read <FiArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-dark text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Posts grid — AnimatePresence keyed to activeCategory forces clean remount on tab switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className={`${post.color} h-36 flex items-center justify-center relative overflow-hidden`}>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }}
                      />
                      <span className="text-white/25 text-5xl font-black select-none">VS</span>
                    </div>
                    <div className="flex flex-col flex-1 p-5 bg-white gap-3">
                      <span className="text-[10px] font-bold text-[#8A38F5] uppercase tracking-widest">{post.category}</span>
                      <h3 className="text-sm sm:text-base font-bold text-dark leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 pt-1 border-t border-gray-100">
                        <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{post.readTime}</span>
                        <span className="ml-auto">{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center py-20 text-gray-400 text-sm">No posts in this category yet.</p>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}