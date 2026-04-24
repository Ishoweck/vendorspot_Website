"use client";

import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight, stagger } from "@/lib/motion";

const phones = [
  { src: "/icons/phone-1.svg", alt: "App screenshot 1" },
  { src: "/icons/phone-2.svg", alt: "App screenshot 2" },
  { src: "/icons/phone-3.svg", alt: "App screenshot 3" },
  { src: "/icons/phone-4.svg", alt: "App screenshot 4" },
];

export default function SafeBuyingSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 bottom-0 bg-primary"
        style={{ clipPath: "ellipse(85% 50% at 50% 50%)" }}
      />

      <div className="relative z-10 py-16 sm:py-20 px-4">
        {/* Text */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-5 mb-10 sm:mb-14 px-2">
          <motion.h2
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-md leading-tight"
          >
            Simple ways to buy safely &amp; have your money protected
          </motion.h2>
          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/85 text-sm sm:text-base max-w-sm leading-relaxed md:text-right"
          >
            Shop confidently with secure payments, verified vendors, and buyer protection.
            Your money stays safe until your order is delivered successfully.
          </motion.p>
        </div>

        {/* Phone mockups */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-5xl mx-auto flex justify-center items-end gap-2 sm:gap-4 md:gap-6 px-4"
        >
          {phones.map((phone, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.07 }}
              className={`relative drop-shadow-2xl ${
                i === 1 || i === 2
                  ? "w-32 sm:w-40 md:w-48 z-10"
                  : "w-24 sm:w-32 md:w-40 hidden sm:block"
              }`}
            >
              <img src={phone.src} alt={phone.alt} className="w-full h-auto" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
