"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { FiArrowRight, FiHome, FiShoppingBag, FiHelpCircle } from "react-icons/fi";

const suggestions = [
  { label: "Go Home",     href: "/home",     icon: FiHome        },
  { label: "Shop Now",    href: "/products", icon: FiShoppingBag },
  { label: "Help Center", href: "/help",     icon: FiHelpCircle  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Simple top bar */}
      <header className="px-6 py-5 flex items-center">
        <Link href="/home" className="bg-white rounded-full px-4 py-2 border border-gray-100 shadow-sm inline-block">
          <Image src="/VLogo.svg" alt="Vendorspot" width={110} height={18} className="h-4 w-auto" style={{ width: "auto" }} />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          variants={stagger} initial="hidden" animate="visible"
          className="text-center max-w-md"
        >
          {/* Big 404 */}
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-[120px] sm:text-[160px] font-extrabold leading-none text-gray-100 select-none">
              404
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative -mt-8 sm:-mt-12 mb-6">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">🔍</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-3">
              Page not found
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            {suggestions.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-dark hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={fadeUp}>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-md shadow-primary/20"
            >
              Back to Vendorspot <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Vendorspot. All rights reserved.
      </footer>
    </div>
  );
}
