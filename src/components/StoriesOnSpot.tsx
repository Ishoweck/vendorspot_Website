"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";
import { posts } from "@/lib/blogPosts";

const stories = posts.slice(0, 3);

export default function StoriesOnSpot() {
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
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-shadow h-full flex flex-col"
              >
                {/* Coloured header */}
                <div className={`${post.color} h-36 sm:h-40 flex items-end justify-between px-5 pb-4 relative overflow-hidden`}>
                  <span className="absolute top-4 right-4 text-6xl font-black text-white/10 select-none leading-none">VS</span>
                  <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/80 text-[11px]">
                    <FiClock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-dark mb-2 leading-snug line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-gray-400">{post.date}</span>
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
