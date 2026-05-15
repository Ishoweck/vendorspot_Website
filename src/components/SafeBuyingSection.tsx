"use client";

import { motion } from "framer-motion";
import { slideLeft, slideRight } from "@/lib/motion";

const phones = [
  { src: "/icons/phone-1.svg", alt: "App screenshot 1" },
  { src: "/icons/phone-2.svg", alt: "App screenshot 2" },
  { src: "/icons/phone-3.svg", alt: "App screenshot 3" },
  { src: "/icons/phone-4.svg", alt: "App screenshot 4" },
];

export default function SafeBuyingSection() {
  // Locks the aspect ratio to the original design canvas (948×1440) while clamping to a minimum
  const h = `max(800px, ${((948 / 1440) * 100).toFixed(2)}vw)`;
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-[120px] bg-primary"
      style={{ minHeight: h }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5 sm:gap-6 mb-6 sm:mb-14 md:mb-18">
          <motion.h2
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white md:whitespace-nowrap leading-none"
          >
            Shop with confidence
          </motion.h2>
          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/80 text-base sm:text-lg max-w-sm leading-relaxed"
          >
            Your payment is secured and only released when your order is successfully delivered.
          </motion.p>
        </div>

        {/* Phone mockups */}
        <div className="flex justify-center items-end gap-3 sm:gap-5 md:gap-8">
          {phones.map((phone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
              // Center two phones are larger and always visible; outer two are smaller and hidden on mobile
              className={`relative ${
                i === 1 || i === 2
                  ? "w-36 sm:w-44 md:w-56 z-10"
                  : "w-28 sm:w-36 md:w-44 hidden sm:block opacity-80"
              }`}
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))" }}
            >
              <img src={phone.src} alt={phone.alt} className="w-full h-auto" style={{ imageRendering: "auto" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
