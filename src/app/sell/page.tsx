"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiUsers, FiShield, FiTrendingUp, FiHeadphones, FiDollarSign, FiZap, FiStar } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";
import Link from "next/link";

const benefits = [
  {
    Icon: FiStar,
    title: "Customer Trust",
    body: "We prioritise trust by providing verified vendors and reliable service, so shoppers can buy from you with complete peace of mind.",
    bg: "bg-blue-500",
  },
  {
    Icon: FiTrendingUp,
    title: "Business Promotion",
    body: "Reach more customers with our dedicated marketing support. We promote your business so you don't have to.",
    bg: "bg-emerald-500",
  },
  {
    Icon: FiShield,
    title: "Secure Payments",
    body: "Enjoy a fast, safe, and reliable payment system with no risk of fake transfers. Your earnings are protected.",
    bg: "bg-primary",
  },
  {
    Icon: FiZap,
    title: "Cut Delivery Charges",
    body: "Help your customers save more on every order. We offer reduced delivery charges so you can deliver faster and cheaper.",
    bg: "bg-orange-500",
  },
  {
    Icon: FiDollarSign,
    title: "Earn More",
    body: "With Vendorspot's affiliate features, you can earn more by referring shoppers and promoting products.",
    bg: "bg-purple-500",
  },
  {
    Icon: FiHeadphones,
    title: "24/7 Customer Support",
    body: "At Vendorspot, we've got your back. Enjoy 24/7 customer support to help you sell and grow with ease, anytime.",
    bg: "bg-teal-500",
  },
  {
    Icon: FiUsers,
    title: "Low Commissions",
    body: "Keep more of your earnings. We take a low commission rate on every sale so you can maximise your profit.",
    bg: "bg-indigo-500",
  },
];

export default function SellPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="w-full bg-primary flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28" style={{ paddingTop: "calc(64px + 4rem)" }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
          >
            Sell on TheSpot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-white/85 text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
          >
            Get on theSpot! Join thousands of trusted vendors already selling successfully. Sign up now and start growing your business today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <Link
              href="/signup"
              className="inline-block bg-accent hover:bg-accent-dark text-dark font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Sign Up Now — It&apos;s Free
            </Link>
          </motion.div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark text-center mb-10 sm:mb-14"
            >
              Why sell on TheSpot?
            </motion.h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {benefits.map(({ Icon, title, body, bg }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-dark text-base mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4">Ready to grow your business?</h2>
            <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
              Join thousands of verified vendors on Nigeria's safest marketplace. Registration is free and takes less than 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/signup" className="bg-primary text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-colors">
                Create Vendor Account
              </Link>
              <a href="mailto:support@vendorspotng.com" className="border border-gray-300 text-dark font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
