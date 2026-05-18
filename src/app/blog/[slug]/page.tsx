"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiArrowLeft, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { getPost, posts } from "@/lib/blogPosts";
import { fadeUp } from "@/lib/motion";

function renderBody(line: string, i: number) {
  if (line.startsWith("**") && line.endsWith("**")) {
    return (
      <h3 key={i} className="text-base sm:text-lg font-bold text-dark mt-8 mb-3">
        {line.slice(2, -2)}
      </h3>
    );
  }
  if (line.includes("\n")) {
    return (
      <div key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
        {line.split("\n").map((sub, j) => <p key={j}>{sub}</p>)}
      </div>
    );
  }
  return (
    <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
      {line}
    </p>
  );
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className={`${post.color} pt-24 sm:pt-32 pb-14 sm:pb-20 px-6 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 60%)" }} />
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
                <span>{post.date}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 sm:py-16 px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm mb-12"
            >
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed border-l-4 border-primary pl-4 mb-8 italic">
                {post.excerpt}
              </p>
              {post.body.map((line, i) => renderBody(line, i))}
            </motion.div>

            {/* Related posts */}
            {related.length > 0 && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-lg font-bold text-dark mb-5">More from {post.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <div className={`${r.color} h-28 flex items-center justify-center`}>
                        <span className="text-white/20 text-4xl font-black select-none">VS</span>
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
