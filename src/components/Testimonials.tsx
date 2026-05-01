"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    text: "I've used so many e-commerce platforms, but Vendorspot is very safe! They're truly interested in their users' growth and are constantly protecting customers and promoting trusted vendors. They put every measure to ensure both buyers and sellers are very safe.",
    name: "Seyifunmi Alonge",
    role: "Enis Perfumery",
  },
  {
    text: "Vendorspot has transformed how I sell online. The platform is easy to use and the support team is always ready to help. My sales have grown significantly since I joined.",
    name: "Adebayo Johnson",
    role: "Tech Gadgets Store",
  },
  {
    text: "As a buyer, I feel very safe shopping on Vendorspot. The buyer protection is top-notch and the verified vendors give me confidence in every purchase.",
    name: "Chioma Okafor",
    role: "Regular Shopper",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 sm:py-[120px] bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-14"
        >
          What People Are Saying
        </motion.h2>

        {/* Arrows + card */}
        <div className="relative px-10 sm:px-16 md:px-20">
          {/* Prev */}
          <button
            onClick={() => go(current - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 border-2 border-white/40 rounded-full flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
            aria-label="Previous review"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white rounded-2xl px-5 sm:px-10 md:px-12 py-5 sm:py-10 md:py-12 shadow-sm max-w-2xl mx-auto"
              >
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-8">
                  {testimonials[current].text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-primary font-bold text-base flex-shrink-0">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base text-dark">{testimonials[current].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            onClick={() => go(current + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-gray-100 transition-colors shadow-md"
            aria-label="Next review"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-6 h-3" : "bg-white/40 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
