"use client";

import { useApi } from "@/lib/useApi";
import type { VendorProfile } from "@/lib/api";

const colors = [
  "bg-red-400", "bg-orange-400", "bg-purple-400", "bg-pink-400",
  "bg-teal-400", "bg-blue-400", "bg-yellow-400",
];

export default function TopSellers() {
  const { data: vendors, loading } = useApi<VendorProfile[]>("/vendor/top");

  const sellers = (vendors || []).slice(0, 7);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl px-6 py-6 sm:px-10">
          <h3 className="text-white text-lg sm:text-xl font-bold mb-5">
            Top Sellers ⭐
          </h3>

          <div className="flex justify-between items-start gap-2 overflow-x-auto pb-2">
            {loading
              ? Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 min-w-[60px] animate-pulse">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20" />
                    <div className="w-10 h-2 bg-white/20 rounded" />
                  </div>
                ))
              : sellers.map((vendor, i) => (
                  <div key={vendor.id} className="flex flex-col items-center gap-1.5 min-w-[60px]">
                    {vendor.image ? (
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md object-cover"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${colors[i % colors.length]} border-2 border-white flex items-center justify-center text-white text-lg font-bold shadow-md`}
                      >
                        {vendor.name?.charAt(0) || "?"}
                      </div>
                    )}
                    <span className="text-white/90 text-[10px] sm:text-xs text-center truncate w-16">
                      {vendor.name?.length > 12 ? vendor.name.slice(0, 10) + "..." : vendor.name}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
