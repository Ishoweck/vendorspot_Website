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

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-700"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-base sm:text-lg font-bold whitespace-nowrap">Subscribe to our Newsletter</h3>
          <div className="flex items-center bg-gray-800 rounded-full w-full sm:w-auto sm:min-w-[340px] overflow-hidden">
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
              className="p-2 mr-1 bg-accent rounded-full hover:bg-accent-dark transition-colors"
            >
              <FiArrowRight className="w-5 h-5 text-dark" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Links grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8"
      >
        <motion.div variants={fadeUp} className="col-span-2 sm:col-span-1">
          <span className="text-base sm:text-lg font-bold border-2 border-white/60 rounded-full px-4 py-1.5 inline-block mb-4">
            Vendorspot
          </span>
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
