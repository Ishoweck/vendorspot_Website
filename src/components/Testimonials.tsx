"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    text: "I've used so many e-commerce platforms, but Vendorspot is very safe! They're truly interested in their users' growth and are constantly protecting customers and promoting trusted vendors. They put every measure to ensure both buyers and sellers are very safe.",
    name: "Soyifunmi Aloaye",
    role: "Etia Perfumery",
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
    <section className="py-[100px] sm:py-[120px] bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-purple-700 mb-14"
        >
          What People Are Saying
        </motion.h2>

        <div className="relative flex items-center">
          {/* Prev arrow — aligns to left margin, distinct styling */}
          <button
            onClick={() => go(current - 1)}
            className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 border-2 border-purple-300 rounded-full flex items-center justify-center text-purple-500 hover:border-purple-500 hover:text-purple-700 transition-colors bg-white"
            aria-label="Previous review"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Review card */}
          <div className="flex-1 mx-4 sm:mx-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white rounded-2xl px-8 sm:px-12 py-10 sm:py-12 shadow-sm"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-base flex-shrink-0">
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

          {/* Next arrow — aligns to right margin, filled/accent styling */}
          <button
            onClick={() => go(current + 1)}
            className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors shadow-md"
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
                i === current ? "bg-purple-600 w-6 h-3" : "bg-purple-300 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
