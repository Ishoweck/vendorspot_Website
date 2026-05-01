"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";

const faqs = [
  { question: "What is Vendorspot?", answer: "Vendorspot is a secure marketplace where people can buy and sell physical and digital products, manage their stores, and enjoy seamless delivery services." },
  { question: "How do I start selling on Vendorspot?", answer: "Simply create an account, set up your store, list your products, and start receiving orders. It only takes a few minutes to get started." },
  { question: "How are deliveries handled?", answer: "We partner with reliable logistics providers to ensure your orders are delivered safely and on time across Nigeria." },
  { question: "Is it safe to buy on Vendorspot?", answer: "Yes! We offer buyer protection, verified vendors, and secure payments. Your money stays safe until your order is delivered successfully." },
  { question: "Can I earn on Vendorspot without selling my own products?", answer: "Absolutely! You can resell products from other vendors and earn commissions on every successful sale." },
  { question: "How long does delivery take?", answer: "Delivery times vary depending on your location and the vendor. Most orders are delivered within 2–7 business days." },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="pt-[60px] pb-[100px] sm:pb-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-12"
        >
          Frequently asked questions
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className={`w-full flex items-center justify-between text-left px-6 py-5 text-sm sm:text-base font-medium transition-colors gap-4 ${
                  active === i ? "bg-dark text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: active === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0"
                >
                  <FiChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 py-5 text-sm sm:text-base text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
