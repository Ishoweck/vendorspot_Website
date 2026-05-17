"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const faqs = [
  { question: "What is Vendorspot?",                              answer: "Vendorspot is a secure marketplace where people can buy and sell physical and digital products, manage their stores, and enjoy seamless delivery services." },
  { question: "How do I start selling on Vendorspot?",           answer: "Simply create an account, set up your store, list your products, and start receiving orders. It only takes a few minutes to get started." },
  { question: "How are deliveries handled?",                     answer: "We partner with reliable logistics providers to ensure your orders are delivered safely and on time across Nigeria." },
  { question: "Is it safe to buy on Vendorspot?",                answer: "Yes! We offer buyer protection, verified vendors, and secure payments. Your money stays safe until your order is delivered successfully." },
  { question: "Can I earn on Vendorspot without selling my own products?", answer: "Absolutely! You can resell products from other vendors and earn commissions on every successful sale." },
  { question: "How long does delivery take?",                    answer: "Delivery times vary depending on your location and the vendor. Most orders are delivered within 2–7 business days." },
  { question: "How do I track my order?",                        answer: "Once your order is confirmed, you'll receive a tracking link via email and in-app notifications so you can follow your delivery in real time." },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="pt-16 pb-24 sm:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-10 sm:mb-12"
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-0 border border-gray-200 rounded-3xl overflow-hidden shadow-sm"
        >
          {/* Left — question list */}
          <div className="w-1/2 overflow-y-auto max-h-105 divide-y divide-gray-100 scrollbar-thin">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-6 py-5 text-sm sm:text-base transition-all duration-200 ${
                  active === i
                    ? "bg-gray-50 font-semibold text-dark"
                    : "bg-white font-medium text-gray-600 hover:bg-gray-50 hover:text-dark"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-200 shrink-0" />

          {/* Right — answer panel */}
          <div className="w-1/2 bg-dark p-8 sm:p-10 flex flex-col justify-center min-h-70">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p className="text-sm font-bold text-white mb-3">Reply:</p>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  {faqs[active].answer}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
