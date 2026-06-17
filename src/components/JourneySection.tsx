"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiShield } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { fadeUp } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const btn =
  "inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:opacity-90 transition-all shadow-sm";

export default function JourneySection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("vendorspot_token"));
  }, []);

  if (isLoggedIn) return null;

  return (
    <section className="pt-16 sm:pt-24 md:pt-28 pb-4 sm:pb-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-8 sm:mb-12"
        >
          Join us in this journey
        </motion.h2>

        {/* Cards layout */}
        <div className="flex flex-col gap-3">

          {/* ── Row 1 ── */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Card 1 — Sell on the Spot (pink, wider) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
              className="relative bg-[#fcedf2] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100
                         min-h-[200px] sm:min-h-[260px] w-full sm:w-[56%]"
            >
              {/* flex-col + justify-between pushes button to bottom always */}
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between min-h-[200px] sm:min-h-[260px]">
                <div className="max-w-[55%]">
                  <h3 className="text-base sm:text-xl font-bold text-dark mb-2">Sell on the Spot</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Create your store in minutes, list products easily, and start receiving orders instantly.
                  </p>
                </div>
                {/* mt-auto forces button to bottom on mobile when content is short */}
                <Link href="/signup" className="mt-auto pt-5 w-fit">
                  <span className={`${btn} bg-primary`}>
                    Get Started <FiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
              {/*
                Image: absolute, right side, cropped/zoomed effect via overflow-hidden on card.
                - On mobile: smaller width so it peeks from the right (zoomed, not full)
                - On desktop: larger, sits top-right
              */}
              <div className="absolute top-0 right-0 h-full w-[42%] sm:w-auto sm:top-6 sm:right-4 md:right-6 pointer-events-none">
                <div className="relative h-full sm:h-auto sm:w-36 md:w-56">
                  <Image
                    src="/homepage-icons/join-us1.png"
                    alt="Sell on the Spot"
                    width={224}
                    height={300}
                    className="absolute top-0 right-0 h-full w-auto sm:h-auto sm:w-full object-cover sm:object-contain drop-shadow-xl scale-110 sm:scale-100 origin-top-right"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Build with us (purple, narrower) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
              className="relative bg-[#e5d0fd8b] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100
                         min-h-[200px] sm:min-h-[260px] flex-1"
            >
              <div className="relative z-10 p-6 sm:p-8 pr-24 sm:pr-32 h-full flex flex-col justify-between min-h-[200px] sm:min-h-[260px]">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-dark mb-2">Build with us</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Be part of a fast-growing platform shaping the future of commerce. Learn, contribute,
                    and grow while helping people succeed every day.
                  </p>
                </div>
                <Link href="/signup" className="mt-auto pt-5 w-fit">
                  <span className={`${btn} bg-[#8a38f5]`}>
                    Get Started <FiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
              <div className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none">
                <HiOutlineUserGroup className="w-20 h-20 sm:w-28 sm:h-28 text-[#8a38f5]" />
              </div>
            </motion.div>

          </div>

          {/* ── Row 2 ── */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Card 3 — Shop Safely (purple, narrower) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
              className="relative bg-[#e5d0fd8b] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100
                         min-h-[200px] sm:min-h-[260px] flex-1"
            >
              <div className="relative z-10 p-6 sm:p-8 pr-24 sm:pr-32 h-full flex flex-col justify-between min-h-[200px] sm:min-h-[260px]">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-dark mb-2">Shop Safely</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Secure payments, trusted vendors, and reliable delivery built for safer online shopping.
                    Confidence in every click.
                  </p>
                </div>
                <Link href="/signup" className="mt-auto pt-5 w-fit">
                  <span className={`${btn} bg-[#8a38f5]`}>
                    Get Started <FiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
              <div className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none">
                <FiShield className="w-20 h-20 sm:w-28 sm:h-28 text-[#8a38f5]" strokeWidth={1} />
              </div>
            </motion.div>

            {/* Card 4 — Resell & earn (pink, wider) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.21 }}
              whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" }}
              className="relative bg-[#fcedf2] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100
                         min-h-[200px] sm:min-h-[260px] w-full sm:w-[56%]"
            >
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between min-h-[200px] sm:min-h-[260px]">
                <div className="max-w-[55%]">
                  <h3 className="text-base sm:text-xl font-bold text-dark mb-2">Resell &amp; earn</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Discover products, share them with your audience, and earn commissions on every
                    successful sale.
                  </p>
                </div>
                <Link href="/signup" className="mt-auto pt-5 w-fit">
                  <span className={`${btn} bg-primary`}>
                    Get Started <FiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
              <div className="absolute top-0 right-0 h-full w-[42%] sm:w-auto sm:top-6 sm:right-4 md:right-6 pointer-events-none">
                <div className="relative h-full sm:h-auto sm:w-36 md:w-56">
                  <Image
                    src="/homepage-icons/join-us2.png"
                    alt="Resell and earn"
                    width={224}
                    height={300}
                    className="absolute top-0 right-0 h-full w-auto sm:h-auto sm:w-full object-cover sm:object-contain drop-shadow-xl scale-110 sm:scale-100 origin-top-right"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}