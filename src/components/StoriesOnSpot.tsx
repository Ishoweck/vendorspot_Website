"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";

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
  category: string;
  author: string;
  readTime?: string;
  coverImage?: string;
  featured?: boolean;
  createdAt: string;
}

export default function StoriesOnSpot() {
  const [stories, setStories] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/blogs?limit=10`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          const all: BlogPost[] = json.data?.blogs ?? [];
          const featured = all.find((p) => p.featured);
          const rest = all.filter((p) => p !== featured);
          const top = featured ? [featured, ...rest] : rest;
          setStories(top.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  if (stories.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 sm:mb-12 md:mb-14">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark"
          >
            Stories on Spot
          </motion.h2>
          <Link href="/blog" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors whitespace-nowrap">
            View All
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {stories.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-shadow h-full flex flex-col"
              >
                {/* Cover */}
                <div className="h-36 sm:h-40 relative overflow-hidden">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`${categoryColor(post.category)} w-full h-full flex items-end justify-between px-5 pb-4 relative`}>
                      <span className="absolute top-4 right-4 text-6xl font-black text-white/10 select-none leading-none">VS</span>
                      <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="flex items-center gap-1 text-white/80 text-[11px]">
                          <FiClock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-dark mb-2 leading-snug line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group">
                      Read More
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
