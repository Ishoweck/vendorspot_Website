"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import RefundBanner from "@/components/RefundBanner";
import {
  FiArrowRight, FiChevronLeft, FiChevronRight,
  FiStar, FiShield, FiUsers, FiClipboard,
  FiTwitter, FiInstagram, FiLinkedin,
  FiZap, FiEye, FiHeart, FiTrendingUp,
} from "react-icons/fi";
import { fadeUp, slideLeft, slideRight, stagger } from "@/lib/motion";

const coreValues = [
  { title: "Trust",          bg: "bg-blue-500",    description: "Trust is not assumed, it is engineered. Every system, feature, and policy is built to protect users, reduce fraud, and ensure accountability across transactions.", Icon: FiStar },
  { title: "Protection",     bg: "bg-orange-500",  description: "The customer is never left exposed. From secure payments to structured refunds and dispute resolution, we prioritize buyer safety at every stage.", Icon: FiShield },
  { title: "Empowerment",    bg: "bg-purple-600",  description: "We enable serious business owners to grow sustainably. Through tools, visibility, and structured systems, we help vendors build credibility, not just make sales.", Icon: FiUsers },
  { title: "Accountability", bg: "bg-amber-500",   description: "Vendors are responsible for what they list and deliver. We enforce clear standards to ensure customers receive exactly what they pay for.", Icon: FiClipboard },
  { title: "Innovation",     bg: "bg-cyan-500",    description: "We continuously build smarter tools, features, and experiences that make commerce easier, faster, and more reliable for every person on the platform.", Icon: FiZap },
  { title: "Transparency",   bg: "bg-teal-600",    description: "No hidden fees, no vague policies. Every process — from payments to dispute resolution — is clear, open, and designed to build genuine confidence.", Icon: FiEye },
  { title: "Community",      bg: "bg-rose-500",    description: "Vendorspot is more than a marketplace. It is a network of people who believe in honest trade, mutual growth, and building something bigger together.", Icon: FiHeart },
  { title: "Growth",         bg: "bg-emerald-600", description: "Every feature we ship is designed to help vendors grow sustainably — from discovery tools to funding access to business registration support.", Icon: FiTrendingUp },
];

const teamMembers = [
  { name: "Olayinka", role: "All works" },
  { name: "Team Member", role: "Engineering" },
  { name: "Team Member", role: "Design" },
];

export default function TheSpotPage() {
  const [currentMember, setCurrentMember] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > currentMember ? 1 : -1);
    setCurrentMember((next + teamMembers.length) % teamMembers.length);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero — SVG background, heading only */}
        <section
          className="relative"
          style={{
            backgroundImage: "url('/spot_rec.svg')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            minHeight: `max(240px, ${((865 / 1440) * 100).toFixed(2)}vw)`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="pt-20 sm:pt-24 lg:pt-28 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-dark leading-tight text-center mb-6 sm:mb-10 lg:mb-12"
            >
              Building a Secure and Trusted<br className="hidden sm:block" /> Platform for everyone.
            </motion.h1>
          </div>
        </section>

        {/* Founder card — pulled up so SVG shaped bottom lands ~halfway through the card */}
        <div className="relative -mt-[60px] sm:-mt-[20vw] lg:-mt-[30vw] pb-[60px] sm:pb-[100px] lg:pb-[120px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-purple-200 overflow-hidden shadow-sm"
            >
              <div className="bg-primary text-white text-center font-bold text-base sm:text-lg py-4 px-6">
                Founder&apos;s Story
              </div>
              <div className="p-5 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
                <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-3 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p>Vendorspot did not begin as a business idea. It began as a response to a problem I experienced repeatedly.</p>
                  <p>Like many people, I grew tired of the stress that comes with physical markets and turned to online shopping for convenience. Instead, I encountered a different set of challenges. Fake products, no return policies, and in some cases, sellers disappearing after payment.</p>
                  <p>The experience became more personal when I ordered a pair of sneakers for my younger brother&apos;s graduation. I paid an Instagram vendor two days before the event. On the morning of the ceremony, after being assured the rider was on the way, I was blocked.</p>
                  <p>The disappointment, embarrassment, and sense of helplessness stayed with me. It was clear that this was not an isolated issue but a systemic one.</p>
                  <p>In 2021, I set out to address it by building a community of trusted vendors. These were individuals committed to selling honestly and growing their businesses the right way. We focused on verification, visibility, and accountability, ensuring that buyers were connected only with vendors who met defined standards.</p>
                  <p>As the community expanded, trust grew with it. By 2022, we had supported over 500 vendors, introduced a structured verification system, and actively resolved disputes to maintain fairness and credibility across the network.</p>
                  <p>However, it became evident that community alone was not enough. Trust needed infrastructure.</p>
                  <p>In 2023, we evolved Vendorspot into a full marketplace. We introduced escrow payments, strengthened vendor verification, and built tools designed to support sustainable growth. The goal was simple: to remove uncertainty from online transactions and create a system that works for both buyers and sellers.</p>
                  <p className="font-bold text-dark">Today, Vendorspot represents more than a platform. It is a deliberate effort to fix a broken experience and to build a safer, more reliable environment for commerce.</p>
                </motion.div>
                <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 flex flex-col items-center justify-start">
                  <div className="w-full max-w-[200px] sm:max-w-[260px] mx-auto">
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
                      <img src="/yinka.svg" alt="Olayinka Olasunkanmi" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-base sm:text-lg font-bold text-dark">Olayinka Olasunkanmi</h3>
                      <p className="text-gray-500 text-sm">CEO / Founder</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Core Values marquee */}
        <section className="py-[100px] sm:py-[120px] bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark text-center"
            >
              Core Values
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <div className="animate-marquee gap-4" style={{ width: "max-content" }}>
              {[...coreValues, ...coreValues].map(({ title, bg, description, Icon }, i) => (
                <div key={`${title}-${i}`} className={`${bg} rounded-2xl p-5 sm:p-6 flex flex-col justify-between flex-shrink-0 w-[180px] sm:w-[220px] md:w-[240px] mx-2 h-[220px] sm:h-[240px]`}>
                  <div>
                    <span className="inline-block bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">{title}</span>
                    <p className="text-white text-xs leading-relaxed line-clamp-5">{description}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Icon className="w-7 h-7 text-white/70" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our People */}
        <section className="py-[100px] sm:py-[120px] bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl font-bold text-white mb-14"
            >
              Our People
            </motion.h2>

            <div className="relative flex items-center max-w-3xl mx-auto">
              {/* Prev — outlined */}
              <button
                onClick={() => go(currentMember - 1)}
                className="flex-shrink-0 w-11 h-11 border-2 border-white/50 hover:border-white rounded-full flex items-center justify-center text-white transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex-1 mx-4 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={currentMember}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -40 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/2 bg-gray-100 flex items-center justify-center text-4xl sm:text-5xl min-h-[160px] sm:min-h-[360px] md:min-h-[420px]">👤</div>
                      <div className="w-full sm:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col justify-center gap-4">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <hr className="border-gray-200" />
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-dark">{teamMembers[currentMember].name}</h3>
                          <p className="text-gray-500 text-sm mt-1">{teamMembers[currentMember].role}</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex items-center gap-3 text-gray-400">
                          <FiTwitter className="w-4 h-4 hover:text-dark cursor-pointer transition-colors" />
                          <FiInstagram className="w-4 h-4 hover:text-dark cursor-pointer transition-colors" />
                          <FiLinkedin className="w-4 h-4 hover:text-dark cursor-pointer transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next — filled */}
              <button
                onClick={() => go(currentMember + 1)}
                className="flex-shrink-0 w-11 h-11 bg-white rounded-full flex items-center justify-center text-primary hover:bg-gray-100 transition-colors shadow-md"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Join banner */}
        <section className="pt-[100px] sm:pt-[120px] pb-[20px] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-2xl px-5 sm:px-8 md:px-12 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6"
            >
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Join us.</h3>
              <a href="#" className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base md:text-lg font-semibold hover:opacity-80 transition-opacity flex-shrink-0">
                Apply for a role here
                <span className="w-9 h-9 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <FiArrowRight className="w-4 h-4 text-dark" />
                </span>
              </a>
            </motion.div>
          </div>
        </section>

        <div className="bg-white"><FAQ /></div>
        <RefundBanner />
      </main>
      <Footer />
    </>
  );
}
