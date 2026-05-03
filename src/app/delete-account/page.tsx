"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiAlertTriangle, FiMail, FiCheck } from "react-icons/fi";

export default function DeleteAccountPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="w-full bg-dark py-16 sm:py-20 px-4" style={{ paddingTop: "calc(64px + 3rem)" }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">Delete Your Account</h1>
            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
              This action is permanent. Once your account is deleted, all your data will be removed and cannot be recovered.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-xl mx-auto space-y-6">

            {/* What gets deleted */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-dark mb-4">What will be deleted</h2>
              <ul className="space-y-2">
                {[
                  "Your account profile and personal information",
                  "Your order history and transaction records",
                  "Saved addresses and payment preferences",
                  "Any earned wallet balance or affiliate commissions",
                  "Your reviews, ratings, and questions",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to request */}
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-7 text-center"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-dark mb-1">Request Received</h3>
                <p className="text-sm text-gray-500">We will review and process your deletion request within 30 days, in accordance with applicable data protection laws.</p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
                <h2 className="text-base font-bold text-dark mb-2">How to request account deletion</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  To delete your account and personal data, send an email to{" "}
                  <a href="mailto:support@vendorspotng.com" className="text-primary font-medium hover:underline">
                    support@vendorspotng.com
                  </a>{" "}
                  with the subject line{" "}
                  <span className="font-semibold text-dark">&ldquo;Delete my personal data&rdquo;</span>.
                  We will process your request in accordance with applicable data protection laws within 30 days.
                </p>

                <a
                  href="mailto:support@vendorspotng.com?subject=Delete%20my%20personal%20data"
                  onClick={() => setSent(true)}
                  className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-3.5 rounded-xl transition-colors"
                >
                  <FiMail className="w-4 h-4" />
                  Send Deletion Request
                </a>

                <p className="text-xs text-gray-400 text-center mt-4">
                  This will open your email app with a pre-filled deletion request.
                </p>
              </div>
            )}

            <div className="text-center">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Read our Privacy Policy →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
