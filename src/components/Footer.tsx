"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaXTwitter, FaFacebookF, FaTiktok, FaLinkedinIn } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { useState } from "react";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  "About Us": [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy",     href: "/privacy" },
    { label: "FAQs",               href: "/#faq" },
  ],
  "Customer Care": [
    { label: "Help Center",       href: "/help" },
    { label: "How to Buy",        href: "/how-to-buy" },
    { label: "Sell On Spot",      href: "/sell" },
    { label: "Returns & Refunds", href: "/refunds" },
  ],
  "Contact Us": [
    { label: "Lagos, Nigeria",         href: "#" },
    { label: "support@vendorspot.com", href: "mailto:support@vendorspot.com" },
    { label: "Tel: +234 xxx xxx xxxx", href: "tel:+234000000000" },
  ],
};

const socials = [
  { name: "X (Twitter)", Icon: FaXTwitter,    href: "#" },
  { name: "Facebook",    Icon: FaFacebookF,   href: "#" },
  { name: "TikTok",      Icon: FaTiktok,      href: "#" },
  { name: "Instagram",   Icon: FiInstagram,   href: "#" },
  { name: "LinkedIn",    Icon: FaLinkedinIn,  href: "#" },
];

const appButtons = [
  {
    label: "Google Play",
    sub: "Get it on",
    path: "M3.176 3.09a1.5 1.5 0 0 0-.176.713v16.394c0 .257.063.5.176.713L13.338 12 3.176 3.09zm1.054-.854L14.89 11.15l2.95-2.95L5.665 1.448a1.49 1.49 0 0 0-1.435-.212zM18.95 9.31l-3.06 3.06 3.06 3.06 2.56-1.37a1.5 1.5 0 0 0 0-2.72l-2.56-1.37-.56.34h.56zm-4.16 4.16L4.23 22.764a1.49 1.49 0 0 0 1.435-.212l12.175-6.752-3.05-2.33z",
  },
  {
    label: "App Store",
    sub: "Download on the",
    path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter + App buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-700"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <h3 className="text-xl sm:text-2xl font-bold whitespace-nowrap flex-shrink-0">Subscribe to our Newsletter</h3>
            <div className="flex items-center bg-gray-800 rounded-[8px] w-full overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-gray-500 outline-none min-w-0"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 mr-1 bg-accent rounded-[6px] hover:bg-accent-dark transition-colors"
              >
                <FiArrowRight className="w-5 h-5 text-dark" />
              </motion.button>
            </div>
          </div>

          {/* App download buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {appButtons.map(({ label, sub, path }) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl px-6 py-2.5 transition-colors border border-gray-600 flex-1 sm:flex-none"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0"><path d={path} /></svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/60 leading-none">{sub}</span>
                  <span className="text-sm font-bold leading-snug">{label}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Links grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8"
      >
        <motion.div variants={fadeUp} className="col-span-2 sm:col-span-1">
          <img src="/VLogo.svg" alt="Vendorspot" className="h-6 w-auto mb-4 brightness-0 invert" />
          <p className="text-sm text-gray-400 leading-relaxed mt-2 max-w-[220px]">
            Nigeria&apos;s trusted marketplace for buyers and sellers.
          </p>
        </motion.div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <motion.div key={title} variants={fadeUp}>
            <h4 className="font-semibold text-sm mb-5">{title}</h4>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Socials + copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="flex items-center gap-2 border border-gray-600 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
            >
              <s.Icon className="w-4 h-4" />
              <span className="text-xs sm:text-sm hidden sm:inline">{s.name}</span>
            </motion.a>
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs">© 2025 Vendorspot (Yekini) Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
