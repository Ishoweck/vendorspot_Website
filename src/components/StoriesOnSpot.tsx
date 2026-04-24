"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";

const stories = [
  {
    title: "How to Start Selling Online in Nigeria Without Stress",
    description: "A simple guide to setting up your store, getting your first customers, and growing your business step by step on Vendorspot.",
    bgColor: "bg-orange-100",
    image: "/icons/story-1.svg",
  },
  {
    title: "5 Proven Ways to Increase Your Sales Online",
    description: "Practical strategies you can apply immediately to get more buyers, boost visibility, and turn visitors into paying customers.",
    bgColor: "bg-blue-100",
    image: "/icons/story-2.svg",
  },
  {
    title: "Why Smart Buyers Choose Secure Marketplaces",
    description: "Discover how secure platforms protect your money, reduce risks, and make online shopping safer and more reliable for everyone.",
    bgColor: "bg-green-100",
    image: "/icons/story-3.svg",
  },
];

export default function StoriesOnSpot() {
  return (
    <section className="py-14 sm:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark"
          >
            Stories on Spot 🌍
          </motion.h2>
          <Link href="/thespot" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
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
          {stories.map((story) => (
            <motion.div
              key={story.title}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
              className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-shadow"
            >
              <div className={`${story.bgColor} h-40 sm:h-44 flex items-center justify-center p-4`}>
                <img src={story.image} alt={story.title} className="h-full w-auto object-contain" />
              </div>
              <div className="p-5">
                <h3 className="text-sm sm:text-base font-bold text-dark mb-2 leading-snug">{story.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{story.description}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group">
                  Read More
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
