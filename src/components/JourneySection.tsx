"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";

const journeyCards = [
  {
    title: "Sell on the Spot",
    description: "Create your store in minutes, list products easily, and start receiving orders instantly. Vendorspot gives you the tools to sell faster, reach more buyers, and grow.",
    bgColor: "bg-purple-100",
    image: "/icons/vsp-build.svg",
  },
  {
    title: "Resell & earn",
    description: "Discover products, share them with your audience, and earn commissions on every successful sale. No inventory needed — just promote, sell, and earn consistently.",
    bgColor: "bg-orange-100",
    image: "/icons/vsp-resell.svg",
  },
  {
    title: "Build with us",
    description: "Be part of a fast-growing platform shaping the future of commerce. Learn, contribute, and grow your career while helping vendors and buyers succeed every day.",
    bgColor: "bg-blue-100",
    image: "/icons/vsp-sell.svg",
  },
];

export default function JourneySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-12"
      >
        Join us in this journey
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6"
      >
        {journeyCards.map((card) => (
          <motion.div
            key={card.title}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
            className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-shadow"
          >
            <div className={`${card.bgColor} h-44 sm:h-48 flex items-center justify-center p-6`}>
              <img src={card.image} alt={card.title} className="h-full w-auto object-contain" />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{card.description}</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-dark hover:text-primary transition-colors group">
                Join Now
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
