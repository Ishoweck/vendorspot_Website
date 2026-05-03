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
    <section className="my-6 sm:my-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl px-4 sm:px-6 py-3 sm:py-4 w-full max-w-xl"
          style={{ background: "#8744ff" }}
        >
          <h3 className="text-white text-sm font-bold mb-3">Top Sellers ⭐</h3>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {loading
              ? Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 animate-pulse">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20" />
                    <div className="w-10 h-2 bg-white/20 rounded" />
                  </div>
                ))
              : sellers.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    variants={fadeUp}
                    className="flex flex-col items-center gap-1"
                  >
                    <Link href={`/shops/${vendor.id}`}>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        {vendor.image ? (
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/60 shadow object-cover"
                          />
                        ) : (
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${colors[i % colors.length]} border border-white/60 flex items-center justify-center text-white text-sm font-bold shadow`}>
                            {vendor.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </motion.div>
                    </Link>
                    <span className="text-white/80 text-[9px] text-center truncate w-full max-w-[56px]">
                      {vendor.name?.length > 8 ? vendor.name.slice(0, 7) + "…" : vendor.name}
                    </span>
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
