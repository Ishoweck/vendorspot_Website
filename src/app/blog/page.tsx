"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiArrowRight, FiClock, FiUser } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const CATEGORIES = ["All", "Tips & Guides", "Vendor Stories", "Updates", "Safety"];

const CATEGORY_COLOR: Record<string, string> = {
  "Tips & Guides":  "bg-blue-500",
  "Vendor Stories": "bg-violet-500",
  "Updates":        "bg-pink-500",
  "Safety":         "bg-emerald-500",
};
function categoryColor(cat: string) { return CATEGORY_COLOR[cat] ?? "bg-gray-500"; }

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  coverImage?: string;
  featured: boolean;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
}

function PostCover({ post, className }: { post: BlogPost; className?: string }) {
  if (post.coverImage) {
    return <img src={post.coverImage} alt={post.title} className={`object-cover ${className ?? ""}`} />;
  }
  return (
    <div className={`${categoryColor(post.category)} flex items-center justify-center relative overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }} />
      <span className="text-white/25 text-5xl font-black select-none">VS</span>
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/blogs?limit=50`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setPosts(json.data?.blogs ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const filtered = posts
    .filter((p) => p !== featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-gray-50 min-h-screen pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {[1, 2, 3].map((i) => <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl" />)}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 text-center" style={{ backgroundColor: "rgba(138, 56, 245, 0.10)" }}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 bg-[#8A38F5]/10 border border-[#8A38F5]/20 text-[#8A38F5] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            Vendorspot Blog
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-dark leading-tight mb-4">
            Stories, Tips &amp;<br className="hidden sm:block" /> Insights
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.18 }} className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Everything you need to buy smarter, sell better, and understand how Vendorspot keeps commerce safe.
          </motion.p>
        </section>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 sm:pb-28">
          {/* Featured post */}
          {featured && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 -mt-6">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative min-h-40 sm:min-h-52 md:min-h-72">
                    <PostCover post={featured} className="absolute inset-0 w-full h-full" />
                    <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 z-10">
                      Featured
                    </span>
                  </div>
                  <div className="bg-white p-8 sm:p-10 flex flex-col justify-center gap-4">
                    <span className="text-xs font-bold text-[#8A38F5] uppercase tracking-widest">{featured.category}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-dark leading-snug group-hover:text-primary transition-colors">{featured.title}</h2>
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
          )}

          {/* Category filter */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? "bg-dark text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filtered.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.06 }} className="h-full">
                  <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-36">
                      <PostCover post={post} className="absolute inset-0 w-full h-full" />
                    </div>
                    <div className="flex flex-col flex-1 p-5 bg-white gap-3">
                      <span className="text-[10px] font-bold text-[#8A38F5] uppercase tracking-widest">{post.category}</span>
                      <h3 className="text-sm sm:text-base font-bold text-dark leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 pt-1 border-t border-gray-100">
                        <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{post.readTime}</span>
                        <span className="ml-auto">{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {!loading && filtered.length === 0 && (
            <p className="text-center py-20 text-gray-400 text-sm">No posts in this category yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
