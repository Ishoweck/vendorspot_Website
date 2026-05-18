"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { FiShield, FiCheckCircle, FiLock } from "react-icons/fi";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appStore";

const trust = [
  { icon: FiShield,       label: "Escrow payments"  },
  { icon: FiCheckCircle,  label: "Verified vendors"  },
  { icon: FiLock,         label: "Secure checkout"   },
];

const appButtons = [
  {
    label: "Google Play",
    sub: "Download on",
    href: PLAY_STORE_URL,
    path: "M3.176 3.09a1.5 1.5 0 0 0-.176.713v16.394c0 .257.063.5.176.713L13.338 12 3.176 3.09zm1.054-.854L14.89 11.15l2.95-2.95L5.665 1.448a1.49 1.49 0 0 0-1.435-.212zM18.95 9.31l-3.06 3.06 3.06 3.06 2.56-1.37a1.5 1.5 0 0 0 0-2.72l-2.56-1.37-.56.34h.56zm-4.16 4.16L4.23 22.764a1.49 1.49 0 0 0 1.435-.212l12.175-6.752-3.05-2.33z",
  },
  {
    label: "App Store",
    sub: "Download on the",
    href: APP_STORE_URL,
    path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
  },
];

export default function RefundBanner() {
  return (
    <section className="bg-dark relative overflow-hidden px-6 py-20 sm:py-28 text-center">

      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(138,56,245,0.12) 0%, transparent 65%)" }} />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80"
        style={{ background: "radial-gradient(circle, rgba(255,214,0,0.06) 0%, transparent 70%)", transform: "translate(-30%, 40%)" }} />
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72"
        style={{ background: "radial-gradient(circle, rgba(138,56,245,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Badge */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-semibold px-4 py-1.5 rounded-full">
            <FiShield className="w-3.5 h-3.5 text-accent" />
            Buyer Protection Guaranteed
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-2"
        >
          You want to buy anything?
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent leading-tight mb-5"
        >
          100% refund guaranteed.
        </motion.p>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-white/45 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10"
        >
          If you don&apos;t get exactly what you paid for, we refund you in full. No stress, no arguments.
        </motion.p>

        {/* Trust pills */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-medium text-white/70">
              <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* App download buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ delay: 0.22 }}
          className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3"
        >
          {appButtons.map(({ label, sub, href, path }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/30 text-white rounded-2xl px-6 py-3.5 transition-all duration-300 backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current shrink-0"><path d={path} /></svg>
              <div className="text-left">
                <p className="text-[10px] text-white/50 leading-none mb-0.5">{sub}</p>
                <p className="text-sm font-bold leading-none">{label}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
