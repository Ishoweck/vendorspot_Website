"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appStore";

const appButtons = [
  {
    label: "Google Play",
    href: PLAY_STORE_URL,
    path: "M3.176 3.09a1.5 1.5 0 0 0-.176.713v16.394c0 .257.063.5.176.713L13.338 12 3.176 3.09zm1.054-.854L14.89 11.15l2.95-2.95L5.665 1.448a1.49 1.49 0 0 0-1.435-.212zM18.95 9.31l-3.06 3.06 3.06 3.06 2.56-1.37a1.5 1.5 0 0 0 0-2.72l-2.56-1.37-.56.34h.56zm-4.16 4.16L4.23 22.764a1.49 1.49 0 0 0 1.435-.212l12.175-6.752-3.05-2.33z",
  },
  {
    label: "App Store",
    href: APP_STORE_URL,
    path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
  },
];

export default function RefundBanner() {
  return (
    /* Large white top area so the oval arch sits high — text then has plenty of dark room below it */
    <section className="relative bg-white overflow-hidden pt-24 sm:pt-32">
      <div
        className="absolute inset-x-0 bottom-0 bg-dark"
        style={{ height: "80%", clipPath: "ellipse(85% 100% at 50% 100%)" }}
      />

      <div className="relative z-10 text-center px-6 pb-16 sm:pb-20 pt-10 sm:pt-14">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1"
        >
          You want to buy anything?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          transition={{ delay: 0.08 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-3"
        >
          100% refund guaranteed
        </motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          transition={{ delay: 0.14 }}
          className="text-gray-400 text-sm sm:text-base mb-8"
        >
          If you don&apos;t get what you paid for
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          {appButtons.map(({ label, href, path }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-white text-dark rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm w-48 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d={path} /></svg>
              {label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
