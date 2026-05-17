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
    { label: "Blog",               href: "/blog" },
  ],
  "Customer Care": [
    { label: "Help Center",       href: "/help" },
    { label: "How to buy",        href: "/how-to-buy" },
    { label: "Sell On Spot",      href: "/sell" },
    { label: "Returns & Refunds", href: "/refunds" },
  ],
  "Contact Us": [
    { label: "Lagos, Nigeria",           href: "#" },
    { label: "support@vendorspotng.com", href: "mailto:support@vendorspotng.com" },
    { label: "Te: +234 704 588 2161",    href: "tel:+2347045882161" },
  ],
};

const socials = [
  { name: "X (Formerly Twitter)", Icon: FaXTwitter,   href: "https://x.com/vendorsspot",                             color: "#ffffff" },
  { name: "Facebook",             Icon: FaFacebookF,  href: "https://www.facebook.com/onlinetradefair",              color: "#1877F2" },
  { name: "Tiktok",               Icon: FaTiktok,     href: "https://www.tiktok.com/@vendorsspot",                   color: "#ff0050" },
  { name: "Instagram",            Icon: FiInstagram,  href: "https://www.instagram.com/vendorsspot",                 color: "#E1306C" },
  { name: "Linkedin",             Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/vendorspot/",          color: "#0A66C2" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-dark text-white">

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-10 pb-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10 rounded-2xl px-6 sm:px-8 py-5 sm:py-6"
        >
          <h3 className="text-base sm:text-lg font-bold whitespace-nowrap shrink-0">
            Subscribe to our Newsletter
          </h3>
          <div className="flex items-center w-full sm:max-w-md gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Youremail@email.com"
              className="flex-1 bg-transparent border-b border-white/20 pb-1.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors min-w-0"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full bg-accent hover:bg-accent-dark flex items-center justify-center shrink-0 transition-colors shadow-sm"
            >
              <FiArrowRight className="w-4 h-4 text-dark" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Links grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10"
      >
        {/* Logo + tagline */}
        <motion.div variants={fadeUp} className="col-span-2 sm:col-span-1">
          <img
            src="/VLogo.svg"
            alt="Vendorspot"
            className="h-6 w-auto mb-4"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm text-white/40 leading-relaxed max-w-52">
            Nigeria&apos;s trusted marketplace for buyers and sellers.
          </p>
        </motion.div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <motion.div key={title} variants={fadeUp}>
            <h4 className="font-semibold text-sm mb-5 text-white">{title}</h4>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/45 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Socials + copyright */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-10 border-t border-white/10 pt-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.07)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 border border-white/15 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-white/70 hover:text-white hover:border-white/30 transition-colors duration-200"
            >
              <s.Icon className="w-4 h-4 shrink-0" style={{ color: s.color }} />
              <span className="text-xs sm:text-sm">{s.name}</span>
            </motion.a>
          ))}
        </div>
        <p className="text-center text-white/30 text-xs">
          © 2022-2026 Vendorspot (TheSpot) Ltd. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
