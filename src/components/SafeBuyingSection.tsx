"use client";

import { motion } from "framer-motion";
import { slideLeft, slideRight, stagger, fadeUp } from "@/lib/motion";

const phones = [
  { src: "/icons/phone-1.svg", alt: "App screenshot 1" },
  { src: "/icons/phone-2.svg", alt: "App screenshot 2" },
  { src: "/icons/phone-3.svg", alt: "App screenshot 3" },
  { src: "/icons/phone-4.svg", alt: "App screenshot 4" },
];

export default function SafeBuyingSection() {
  return (
    <section className="relative bg-primary overflow-hidden py-[100px] sm:py-[120px]">
      {/* Decorative circle */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-14 sm:mb-18">
          <motion.h2
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white max-w-md leading-tight"
          >
            Simple ways to buy safely &amp; have your money protected
          </motion.h2>
          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/80 text-base sm:text-lg max-w-sm leading-relaxed md:text-right self-start md:self-end"
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
          className="flex justify-center items-end gap-3 sm:gap-5 md:gap-8"
        >
          {phones.map((phone, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ delay: i * 0.07 }}
              className={`relative drop-shadow-2xl ${
                i === 1 || i === 2
                  ? "w-36 sm:w-44 md:w-56 z-10"
                  : "w-28 sm:w-36 md:w-44 hidden sm:block opacity-80"
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
