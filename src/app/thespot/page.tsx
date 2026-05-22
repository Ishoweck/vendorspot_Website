"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import {
  FiArrowRight, FiChevronLeft, FiChevronRight,
  FiStar, FiShield, FiUsers, FiClipboard,
  FiInstagram, FiLinkedin,
  FiZap, FiEye, FiHeart, FiTrendingUp, FiUser,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { fadeUp, slideLeft, slideRight } from "@/lib/motion";

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

   {
    name: "Olayinka",
    role: "All Roles",
    image: "/team/yinka.PNG",
    twitter: "https://x.com/ishow_leck",
    instagram: "https://www.instagram.com/ishowleck",
    linkedin: "https://www.linkedin.com/in/olasunkanmi-olayinka-habeeb",
  },
   {
    name: "David",
    role: "Lead Engineer",
    image: "/team/david.jpeg",
    twitter: "https://x.com/sttreak_",
    instagram: "",
    linkedin: "",
  },
    {
    name: "Ahmed",
    role: "Engineer",
    image: "/team/ahmed5.jpeg",
    twitter: "https://x.com/9ja_UntitledDev",
    instagram: "https://www.instagram.com/_untitleddev?igsh=cHdxeW9tbXgxcmdt",
    linkedin: "https://www.linkedin.com/in/ahmed940",
  },

   {
    name: "Itunu",
    role: "Human Resources",
    image: "/team/itunu.jpeg",
    twitter: "",
    instagram: "",
    linkedin: "https://www.linkedin.com/in/akinlabiitunu/",
  },
  {
    name: "Praise",
    role: "Operations",
    image: "/team/praise.jpeg",
    twitter: "https://x.com/praisegraceva",
    instagram: "https://www.instagram.com/_starpraise_?igsh=MW91d216ZnVmNWtoaA%3D%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/praise-ajao-229639380?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
 
  
  {
    name: "Moyosore",
    role: "Operations",
    image: "/team/mo5.jpeg",
    twitter: "https://x.com/Moyolistic_moyo",
    instagram: "https://www.instagram.com/mo_dedamola?utm_source=qr&igsh=cWVybmRtaTFpbXYy",
    linkedin: "https://www.linkedin.com/in/moyosore-adetunji-ab70a427b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },

 
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

        {/* Hero — purple, heading only */}
        <section
          className="pt-28 sm:pt-32 pb-20 sm:pb-44 px-6 sm:px-8 lg:px-10 text-center"
          style={{ backgroundColor: "rgba(138, 56, 245, 0.12)" }}
        >
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark leading-tight"
          >
            Building a Secure and Trusted<br className="hidden sm:block" /> Platform for everyone.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="mt-5 text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            We built the safest way to buy and sell online in Nigeria — escrow payments, verified vendors, real accountability.
          </motion.p>
        </section>

        {/* Founder card — floats across the purple/white boundary */}
        <section className="pb-10 sm:pb-24 px-6 sm:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto -mt-14 sm:-mt-32">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl border border-purple-200 overflow-hidden shadow-xl bg-white"
            >
              <div className="bg-primary py-5 px-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/20" />
                <div className="flex items-center gap-2.5 shrink-0">
                  <FiUser className="w-4 h-4 text-white/70" />
                  <h2 className="text-white font-bold text-base sm:text-lg tracking-wide">Founder&apos;s Story</h2>
                </div>
                <div className="flex-1 h-px bg-white/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 items-start">
                <motion.div
                  variants={slideLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-3 space-y-4 text-sm text-gray-600 leading-relaxed p-7 sm:p-10"
                >
                  <p>We didn&apos;t start Vendorspot as a business idea, it started out of frustration.</p>
                  <p>I was tired of the stress of physical markets, so I turned to online shopping. But instead of convenience, I kept running into disappointment, from fake products, no return policies, or worse, sellers disappearing after payment.</p>
                  <p>Then came the moment that changed everything.</p>
                  <p>My younger brother was graduating, and I promised him a gift. Two days before the ceremony, I paid an Instagram vendor for a pair of sneakers. On the morning of the big day, after being told the rider was on the way, I was blocked.</p>
                  <p>That feeling, helplessness, embarrassment, and disappointment, stayed with me.</p>
                  <p>In January 2021, I decided to do something about it. I started building a community of trusted vendors, people who wanted to sell honestly and grow. We educated them, promoted their businesses, and protected buyers by connecting them only with verified sellers who upheld our standards.</p>
                  <p>As the community grew, trust followed. In 2022, we introduced a verification system that gave vendors credibility and helped over 500 businesses sell with confidence. We also stepped in to resolve disputes, ensuring fairness and accountability on both sides.</p>
                  <p>Beyond trust, we supported real growth, helping vendors access grants, funding, and business registration opportunities that changed lives.</p>
                  <p>But we knew community alone wasn&apos;t enough. In 2023, we took it further and built Vendorspot into a full marketplace, a platform designed to eliminate fear from online transactions. With escrow payments, verified vendors, and integrated tools, we created a system where sellers can grow without stress, and buyers can shop with complete confidence.</p>
                  <p className="font-semibold text-dark">Vendorspot is more than a platform.<br />It&apos;s a response to a broken system, and a commitment to fixing it.</p>
                </motion.div>
                <motion.div
                  variants={slideRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-2 flex flex-col items-center justify-center py-6 px-6 sm:px-10"
                >
                  <div className="w-full max-w-70">
                    <div className="w-full h-96 sm:h-105 rounded-2xl overflow-hidden">
                      <img src="/team/yinka.PNG" alt="Olayinka Olasunkanmi" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-bold text-dark text-sm sm:text-base">Olayinka Olasunkanmi</p>
                      <p className="text-gray-400 text-sm mt-0.5">CEO / Founder</p>
                  
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values marquee */}

        <section className="py-10 sm:py-12 mb-12 sm:mb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mb-12">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark text-center pb-7"
            >
              Core Values
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <div className="animate-marquee gap-4" style={{ width: "max-content" }}>
              {[...coreValues, ...coreValues].map(({ title, bg, description, Icon }, i) => (
                <div
                  key={`${title}-${i}`}
                  className={`${bg} rounded-2xl p-5 sm:p-6 flex flex-col justify-between shrink-0 w-52 sm:w-60 mx-2 h-56 sm:h-64`}
                >
                  <div>
                    <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{title}</span>
                    <p className="text-white text-xs leading-relaxed line-clamp-5">{description}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div>
                      <Icon className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our People */}
        <section className="py-14 sm:py-28 bg-primary">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl font-bold text-white mb-14"
            >
              Our People
            </motion.h2>
            <motion.div
              className="relative flex items-center max-w-3xl mx-auto cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) go(currentMember + 1);
                else if (info.offset.x > 50) go(currentMember - 1);
              }}
            >
              <button
                onClick={() => go(currentMember - 1)}
                className="hidden sm:flex shrink-0 w-11 h-11 border-2 border-white/50 hover:border-white rounded-full items-center justify-center text-white transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 sm:mx-4 overflow-hidden">
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
                      <div className="relative w-full sm:w-1/2 bg-gray-100 h-80 sm:h-96 overflow-hidden shrink-0 flex items-center justify-center">
                        {teamMembers[currentMember].image ? (
                          <Image src={teamMembers[currentMember].image} alt={teamMembers[currentMember].name} fill className="object-cover object-top" />
                        ) : (
                          <FiUser className="w-14 h-14 sm:w-20 sm:h-20 text-gray-300" />
                        )}
                      </div>
                      <div className="w-full sm:w-1/2 p-5 sm:p-10 flex flex-col justify-center gap-3 sm:gap-4">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <hr className="border-gray-100" />
                        <div>
                          <h3 className="text-base sm:text-xl font-bold text-dark">{teamMembers[currentMember].name || "—"}</h3>
                          <p className="text-gray-400 text-sm mt-1">{teamMembers[currentMember].role}</p>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex items-center gap-3 text-gray-300">
                          {teamMembers[currentMember].twitter ? (
                            <a href={teamMembers[currentMember].twitter} target="_blank" rel="noopener noreferrer"><FaXTwitter className="w-4 h-4 hover:text-dark transition-colors" /></a>
                          ) : <FaXTwitter className="w-4 h-4 opacity-30" />}
                          {teamMembers[currentMember].instagram ? (
                            <a href={teamMembers[currentMember].instagram} target="_blank" rel="noopener noreferrer"><FiInstagram className="w-4 h-4 hover:text-dark transition-colors" /></a>
                          ) : <FiInstagram className="w-4 h-4 opacity-30" />}
                          {teamMembers[currentMember].linkedin ? (
                            <a href={teamMembers[currentMember].linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin className="w-4 h-4 hover:text-dark transition-colors" /></a>
                          ) : <FiLinkedin className="w-4 h-4 opacity-30" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={() => go(currentMember + 1)}
                className="hidden sm:flex shrink-0 w-11 h-11 bg-white rounded-full items-center justify-center text-primary hover:bg-gray-100 transition-colors shadow-md"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Dots + swipe hint */}
            <div className="flex flex-col items-center gap-3 mt-6">
              <div className="flex items-center gap-2">
                {teamMembers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`rounded-full transition-all duration-300 ${i === currentMember ? "bg-white w-6 h-2.5" : "bg-white/30 w-2.5 h-2.5 hover:bg-white/60"}`}
                  />
                ))}
              </div>
              <p className="sm:hidden flex items-center gap-1.5 text-white/50 text-xs font-medium select-none">
                <FiChevronLeft className="w-3.5 h-3.5" />
                Swipe to explore
                <FiChevronRight className="w-3.5 h-3.5" />
              </p>
            </div>

          </div>
        </section>

        {/* Join banner */}
        <section className="py-10 sm:py-20 bg-white px-6 sm:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl px-8 sm:px-12 md:px-16 py-14 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 overflow-hidden"
              style={{ backgroundColor: "#8A38F5" }}
            >
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", transform: "translate(30%,-35%)" }} />
              <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)", transform: "translate(-50%, 40%)" }} />

              <div className="relative z-10">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">We&apos;re hiring</p>
                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                  Join us.<br />
                  <span className="text-white/70">Build with us.</span>
                </h3>
              </div>

              <Link
                href="/careers"
                className="relative z-10 flex items-center gap-3 bg-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-white/90 transition-all shrink-0 shadow-lg"
                style={{ color: "#8A38F5" }}
              >
                Apply for a role
                <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#8A38F5" }}>
                  <FiArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="bg-white px-0">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
