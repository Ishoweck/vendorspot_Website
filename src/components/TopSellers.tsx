"use client";

import { motion } from "framer-motion";
import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";
import { stagger, fadeUp } from "@/lib/motion";
import Link from "next/link";

const colors = [
  "bg-red-400", "bg-orange-400", "bg-purple-400", "bg-pink-400",
  "bg-teal-400", "bg-blue-400", "bg-yellow-400",
];

export default function TopSellers() {
  const { data: vendors, loading } = useApi<VendorProfile[]>("/vendor/top");
  const sellers = (vendors || []).slice(0, 7);

  return (
    <section className="py-10 sm:py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl px-5 sm:px-10 py-6"
        >
          <h3 className="text-white text-lg sm:text-xl font-bold mb-5">Top Sellers ⭐</h3>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-2"
          >
            {loading
              ? Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 min-w-[56px] animate-pulse">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20" />
                    <div className="w-10 h-2 bg-white/20 rounded" />
                  </div>
                ))
              : sellers.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    variants={fadeUp}
                    className="flex flex-col items-center gap-1.5 min-w-[56px] flex-shrink-0"
                  >
                    <Link href={`/shops/${vendor.id}`}>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        {vendor.image ? (
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md object-cover"
                          />
                        ) : (
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${colors[i % colors.length]} border-2 border-white flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                            {vendor.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </motion.div>
                    </Link>
                    <span className="text-white/85 text-[10px] sm:text-xs text-center truncate w-14">
                      {vendor.name?.length > 10 ? vendor.name.slice(0, 9) + "…" : vendor.name}
                    </span>
                  </motion.div>
                ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
