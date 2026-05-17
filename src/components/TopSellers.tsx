"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

const colors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-teal-400",
  "bg-blue-400",
  "bg-yellow-400",
];

const rankStyles = [
  { bg: "bg-yellow-400", text: "text-yellow-900" },
  { bg: "bg-gray-300",   text: "text-gray-800"   },
  { bg: "bg-orange-400", text: "text-orange-900"  },
];

export default function TopSellers() {
  const { data: vendors, loading, error } = useApi<VendorProfile[]>("/vendor/top");
  const sellers = (vendors || []).slice(0, 7);

  return (
    <section className="py-8 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-sm border-2 border-[#65656554]"
        >
          {/* Heading strip */}
          <div
            className="flex items-center gap-2.5 px-8 sm:px-10 py-5"
            style={{ background: "#5b6bf4" }}
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Top Sellers
            </h2>
            <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
              <FiCheckCircle className="w-3.5 h-3.5 text-dark" />
            </span>
          </div>

          {/* Vendors — white body */}
          <div className="bg-white px-8 sm:px-12 py-8 sm:py-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-wrap justify-center items-end gap-6 sm:gap-8"
            >
              {loading
                ? Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200" />
                      <div className="w-14 h-2.5 bg-gray-200 rounded-full" />
                    </div>
                  ))
                : error
                ? <p className="text-sm text-red-400 py-4">{error}</p>
                : sellers.length === 0
                ? <p className="text-sm text-gray-400 py-4">No top sellers available yet.</p>
                : sellers.map((vendor, i) => {
                    const isTop3 = i < 3;
                    const rank = rankStyles[i];

                    return (
                      <Fragment key={vendor.id}>
                        <motion.div
                          variants={fadeUp}
                          className="flex flex-col items-center gap-2.5"
                        >
                          <Link href={`/shops/${vendor.id}`}>
                            <motion.div
                              whileHover={{ scale: 1.1, y: -6 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{
                                type: "spring",
                                stiffness: 320,
                                damping: 22,
                              }}
                              className="relative"
                            >
                              {/* Rank badge — top 3 only */}
                              {isTop3 && (
                                <span
                                  className={`
                                    absolute -top-1.5 -left-1.5 z-10
                                    w-5 h-5 rounded-full
                                    ${rank.bg} ${rank.text}
                                    flex items-center justify-center
                                    text-[9px] font-bold
                                    border-2 border-white shadow-sm
                                  `}
                                >
                                  {i + 1}
                                </span>
                              )}

                              {vendor.image ? (
                                <Image
                                  src={vendor.image}
                                  alt={vendor.name}
                                  width={isTop3 ? 88 : 72}
                                  height={isTop3 ? 88 : 72}
                                  className={`
                                    rounded-full object-cover
                                    ring-[3px] ring-primary shadow-lg
                                    transition-shadow duration-200
                                    hover:shadow-[0_8px_24px_rgba(91,107,244,0.30)]
                                    ${isTop3
                                      ? "w-20 h-20 sm:w-[88px] sm:h-[88px]"
                                      : "w-16 h-16 sm:w-[72px] sm:h-[72px]"}
                                  `}
                                />
                              ) : (
                                <div
                                  className={`
                                    rounded-full ring-[3px] ring-primary shadow-lg
                                    flex items-center justify-center
                                    text-white font-bold
                                    transition-shadow duration-200
                                    hover:shadow-[0_8px_24px_rgba(91,107,244,0.30)]
                                    ${colors[i % colors.length]}
                                    ${isTop3
                                      ? "w-20 h-20 sm:w-[88px] sm:h-[88px] text-2xl"
                                      : "w-16 h-16 sm:w-[72px] sm:h-[72px] text-xl"}
                                  `}
                                >
                                  {vendor.name?.charAt(0) || "?"}
                                </div>
                              )}

                              {/* Verified badge */}
                              <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                                <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-dark" />
                              </span>
                            </motion.div>
                          </Link>

                          <span
                            className={`
                              text-xs sm:text-sm font-medium text-center truncate
                              ${isTop3 ? "text-gray-800 w-20 sm:w-[88px]" : "text-gray-600 w-16 sm:w-[72px]"}
                            `}
                          >
                            {vendor.name}
                          </span>
                        </motion.div>

                        {/* Divider after rank 3 */}
                        {i === 2 && (
                          <div className="hidden sm:block w-px h-16 bg-gray-200 self-center mx-1" />
                        )}
                      </Fragment>
                    );
                  })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}