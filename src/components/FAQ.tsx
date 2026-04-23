"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Vendorspot?",
    answer:
      "Vendorspot is a secure marketplace where people can buy and sell physical and digital products, manage their stores, and enjoy seamless delivery services.",
  },
  {
    question: "How do I start selling on Vendorspot?",
    answer:
      "Simply create an account, set up your store, list your products, and start receiving orders. It only takes a few minutes to get started.",
  },
  {
    question: "How are deliveries handled?",
    answer:
      "We partner with reliable logistics providers to ensure your orders are delivered safely and on time across Nigeria.",
  },
  {
    question: "Is it safe to buy on Vendorspot?",
    answer:
      "Yes! We offer buyer protection, verified vendors, and secure payments. Your money stays safe until your order is delivered successfully.",
  },
  {
    question: "Can I earn on Vendorspot without selling my own products?",
    answer:
      "Absolutely! You can resell products from other vendors and earn commissions on every successful sale.",
  },
  {
    question: "How long does delivery takes?",
    answer:
      "Delivery times vary depending on your location and the vendor. Most orders are delivered within 2-7 business days.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-10 max-w-5xl mx-auto">
        Frequently asked questions
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Questions list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-5 py-4 rounded-xl border text-sm sm:text-base transition-colors ${
                i === active
                  ? "border-gray-400 bg-gray-50 font-semibold text-dark"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {faq.question}
            </button>
          ))}
        </div>

        {/* Answer panel */}
        <div className="bg-dark text-white rounded-2xl p-6 sm:p-8 h-fit">
          <p className="text-sm font-semibold mb-3">Reply:</p>
          <p className="text-sm sm:text-base leading-relaxed text-gray-300">
            {faqs[active].answer}
          </p>
        </div>
      </div>
    </section>
  );
}
