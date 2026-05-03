"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { fadeUp, slideLeft, slideRight, stagger } from "@/lib/motion";

const contactInfo = [
  {
    Icon: FiMapPin,
    label: "Our Location",
    value: "Lagos, Nigeria",
    bg: "bg-rose-50",
    iconColor: "text-primary",
  },
  {
    Icon: FiMail,
    label: "Email Us",
    value: "support@vendorspotng.com",
    href: "mailto:support@vendorspotng.com",
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    Icon: FiPhone,
    label: "Call Us",
    value: "(+234) 704 5882 161",
    href: "tel:+2347045882161",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="w-full bg-primary flex flex-col items-center justify-center py-20 sm:py-28 px-4" style={{ minHeight: "280px" }}>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center mb-4 pt-8"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="text-center text-sm sm:text-base text-white/80 max-w-md"
          >
            We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.
          </motion.p>
        </section>

        {/* Contact info cards */}
        <section className="py-10 sm:py-14 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {contactInfo.map(({ Icon, label, value, href, bg, iconColor }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className={`${bg} rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-3`}
                >
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm sm:text-base font-medium text-dark hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base font-medium text-dark">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form + side text */}
        <section className="pb-14 sm:pb-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
              {/* Left: description */}
              <motion.div
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="md:col-span-2 flex flex-col justify-center gap-5"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-dark leading-snug">
                  We&apos;d love to hear from you.
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Whether you have a question about your order, want to become a vendor, or just want to say hello — our team is ready.
                </p>
                <p className="text-gray-400 text-sm">
                  We typically respond within <span className="font-semibold text-dark">24–48 hours</span> on business days.
                </p>
              </motion.div>

              {/* Right: form */}
              <motion.div
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="md:col-span-3"
              >
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 sm:p-10 text-center"
                  >
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-lg font-bold text-dark mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">Thanks for reaching out. We&apos;ll get back to you shortly.</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 text-sm font-medium text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@email.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-primary transition-colors bg-white"
                      >
                        <option value="">Select a topic…</option>
                        <option value="order">Order Issue</option>
                        <option value="vendor">Become a Vendor</option>
                        <option value="payment">Payment / Refund</option>
                        <option value="report">Report a Problem</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help…"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-xl py-3.5 transition-colors"
                    >
                      <FiSend className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <div className="bg-white">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
