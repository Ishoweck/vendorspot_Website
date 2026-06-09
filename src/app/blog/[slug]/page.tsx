"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiArrowLeft, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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
  content: string;
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

// Renders content stored as plain text:
// - paragraphs separated by blank lines
// - lines starting and ending with ** are headings
function renderContent(content: string) {
  const blocks = content.split(/\n\n+/).filter(Boolean);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return (
        <h3 key={i} className="text-base sm:text-lg font-bold text-dark mt-8 mb-3">
          {trimmed.slice(2, -2)}
        </h3>
      );
    }
    if (trimmed.includes("\n")) {
      return (
        <div key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
          {trimmed.split("\n").map((line, j) => <p key={j}>{line}</p>)}
        </div>
      );
    }
    return (
      <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null | "not-found">(null);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/blogs/${slug}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setPost(json.data.blog);
          setRelated(json.data.related ?? []);
        } else {
          setPost("not-found");
        }
      })
      .catch(() => setPost("not-found"));
  }, [slug]);

  if (post === "not-found") notFound();

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-gray-50 min-h-screen pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded-xl" />
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded-xl" />
            <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-xl" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const color = categoryColor(post.category);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero — use cover image if available, otherwise colour gradient */}
        <section className={`${post.coverImage ? "bg-dark" : color} pt-24 sm:pt-32 pb-14 sm:pb-20 px-6 relative overflow-hidden`}>
          {post.coverImage ? (
            <>
              <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
            </>
          ) : (
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 60%)" }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold mb-6 transition-colors">
                <FiArrowLeft className="w-3.5 h-3.5" /> Back to Blog
              </Link>
              <span className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-3">{post.category}</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs">
                <span className="flex items-center gap-1.5"><FiUser className="w-3.5 h-3.5" />{post.author}</span>
                <span className="flex items-center gap-1.5"><FiClock className="w-3.5 h-3.5" />{post.readTime}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 sm:py-16 px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm mb-12">
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed border-l-4 border-primary pl-4 mb-8 italic">
                {post.excerpt}
              </p>
              {renderContent(post.content)}
            </motion.div>

            {/* Related */}
            {related.length > 0 && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-lg font-bold text-dark mb-5">More from {post.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className={`relative h-28 ${r.coverImage ? "" : categoryColor(r.category)}`}>
                        {r.coverImage
                          ? <img src={r.coverImage} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><span className="text-white/20 text-4xl font-black select-none">VS</span></div>}
                      </div>
                      <div className="p-4 bg-white flex-1 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{r.category}</span>
                        <h3 className="text-sm font-bold text-dark leading-snug group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                        <span className="flex items-center gap-1 text-xs font-semibold text-primary mt-auto">
                          Read <FiArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="mt-10 text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 border border-gray-200 text-dark text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                <FiArrowLeft className="w-4 h-4" /> All posts
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
