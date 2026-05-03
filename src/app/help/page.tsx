"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "How safe is the platform?",
    a: "It is very safe. All vendors on the platform are verified and trusted. We take our time to do a background check on every vendor that registers.",
  },
  {
    q: "What is Vendorspot?",
    a: "Vendorspot is Nigeria's No.1 safest platform to buy, sell, and find trusted vendors across Nigeria or close to you. We take our time to do a background check on all vendors that register on the platform.",
  },
  {
    q: "How does Vendorspot protect buyers?",
    a: "The platform ensures all registered vendors are reliable and legitimate. The system gives buyers the power to instruct the platform to release payment to vendors only after successful delivery. If a vendor delivers a wrong item, the buyer can request a refund.",
  },
  {
    q: "What happens if I receive a product different from what was advertised?",
    a: "Contact our helpline immediately or send us a message via the website. We will follow up to ensure the product is returned to the vendor for a replacement or refund once the vendor confirms receipt.",
  },
  {
    q: "How do I make money as a buyer on Vendorspot?",
    a: "You can make money using your reseller account to recommend products to your friends via generated product links, and earn a commission on all orders made through your link. You can withdraw your earnings or use them to purchase on the website.",
  },
  {
    q: "Are there any fees for buyers?",
    a: "No. It is completely free for buyers and anyone who wants to resell products to earn commissions.",
  },
  {
    q: "Can I leave reviews for vendors?",
    a: "Yes. You can leave a review on a vendor's product or store after purchasing from them.",
  },
  {
    q: "How do I request to return an item?",
    a: "Send an email to contact@vendorspotng.com or call (+234) 704 5882 161 for help. Please include your order details and evidence (photos/video) of the issue.",
  },
  {
    q: "Can I return an item outside the return period?",
    a: "No. Returns must be requested within 3 days of delivery. Items outside this window are not eligible for return.",
  },
  {
    q: "How do I return an item?",
    a: "After your claim is validated with supporting evidence (video or photo of the delivered item), a return will be authorised and you will receive instructions for returning the item to the vendor's address.",
  },
  {
    q: "Can my warranty be voided?",
    a: "Yes. A warranty is voided once an item within the warranty period is opened or referred to a technician not affiliated with the manufacturer, or against the vendor's consent.",
  },
  {
    q: "I initiated a return but have not received a response in over 48 hours. What do I do?",
    a: "Please contact our support team directly at support@vendorspotng.com or call (+234) 704 5882 161.",
  },
  {
    q: "Do I have to return a free gift when I return a product?",
    a: "Yes. Any free gift included with the order must also be returned.",
  },
  {
    q: "How do I track my return status?",
    a: "We will keep you updated by email, SMS, or call about the status of your return. You can also track your return using the return tracking number on your account.",
  },
  {
    q: "Once my return is confirmed, how long will it take to receive a refund?",
    a: "Once the return is confirmed by the vendor, a payment will be initiated into your wallet on the website promptly.",
  },
  {
    q: "Can I contact customer support if I have any issues?",
    a: "Absolutely. Our customer support team is always available to assist you. Reach us at support@vendorspotng.com or (+234) 704 5882 161.",
  },
];

export default function HelpPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="w-full bg-primary py-16 sm:py-20 px-4" style={{ paddingTop: "calc(64px + 3rem)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Help Center</h1>
            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
              Find answers to common questions. Still need help? We're always here for you.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className={`w-full flex items-center justify-between text-left px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-medium transition-colors gap-4 ${
                    active === i ? "bg-dark text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{faq.q}</span>
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
                      <p className="px-5 sm:px-6 py-4 text-sm sm:text-base text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Still need help */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-primary rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2">Still need help?</h3>
              <p className="text-white/80 text-sm mb-5">Our support team is available to assist you anytime.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href="mailto:support@vendorspotng.com" className="bg-white text-primary font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  Email Us
                </a>
                <a href="tel:+2347045882161" className="border border-white text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                  Call (+234) 704 5882 161
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
