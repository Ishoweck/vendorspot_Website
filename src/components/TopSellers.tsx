"use client";

import { motion } from "framer-motion";
import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";
import { fadeUp } from "@/lib/motion";
import Link from "next/link";

const colors = [
  "bg-red-400", "bg-orange-400", "bg-purple-400", "bg-pink-400",
  "bg-teal-400", "bg-blue-400", "bg-yellow-400",
];

export default function TopSellers() {
  const { data: vendors, loading } = useApi<VendorProfile[]>("/vendor/top");
  const sellers = (vendors || []).slice(0, 7);

  return (
    <section className="py-[100px] sm:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl px-6 sm:px-10 py-8"
        >
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-8">Top Sellers ⭐</h3>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {loading
              ? Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20" />
                    <div className="w-12 h-2.5 bg-white/20 rounded" />
                  </div>
                ))
              : sellers.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    variants={fadeUp}
                    className="flex flex-col items-center gap-2"
                  >
                    <Link href={`/shops/${vendor.id}`}>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        {vendor.image ? (
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-md object-cover"
                          />
                        ) : (
                          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colors[i % colors.length]} border-2 border-white flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                            {vendor.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </motion.div>
                    </Link>
                    <span className="text-white/90 text-[10px] sm:text-xs text-center truncate w-full max-w-[64px]">
                      {vendor.name?.length > 10 ? vendor.name.slice(0, 9) + "…" : vendor.name}
                    </span>
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
