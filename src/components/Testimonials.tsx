"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    text: "I've used so many e-commerce platforms, but Vendorspot is very safe! They're truly interested in their users' growth and are constantly protecting customers and promoting trusted vendors. They put every measure to ensure both buyers and sellers are very safe.",
    name: "Seyifunmi Alonge",
    role: "Enis Perfumery",
    color: "bg-violet-100 text-violet-600",
  },
  {
    text: "Vendorspot has transformed how I sell online. The platform is easy to use and the support team is always ready to help. My sales have grown significantly since I joined.",
    name: "Adebayo Johnson",
    role: "Tech Gadgets Store",
    color: "bg-amber-100 text-amber-600",
  },
  {
    text: "As a buyer, I feel very safe shopping on Vendorspot. The buyer protection is top-notch and the verified vendors give me confidence in every purchase.",
    name: "Chioma Okafor",
    role: "Regular Shopper",
    color: "bg-rose-100 text-rose-600",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="py-20 sm:py-32 bg-[#8A38F5] relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)", transform: "translate(-40%, -40%)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", transform: "translate(35%, 35%)" }} />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What People Are Saying
          </h2>
        </motion.div>

        {/* Card + arrows */}
        <div className="relative flex items-center gap-4">
          <button
            onClick={() => go(current - 1)}
            className="shrink-0 w-11 h-11 border-2 border-white/30 hover:border-white rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Previous"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -60, scale: 0.88 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-13 h-13 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${t.color}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-dark">{t.name}</p>
                      <p className="text-gray-400 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-gray-200 text-sm font-medium hidden sm:block">
                    {current + 1} / {testimonials.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(current + 1)}
            className="shrink-0 w-11 h-11 bg-white rounded-full flex items-center justify-center text-[#8A38F5] hover:bg-white/90 transition-all duration-200 shadow-lg"
            aria-label="Next"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "bg-white w-7 h-3" : "bg-white/30 w-3 h-3 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
