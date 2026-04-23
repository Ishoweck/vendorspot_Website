"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import RefundBanner from "@/components/RefundBanner";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiShield,
  FiUsers,
  FiClipboard,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiZap,
  FiEye,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";

const coreValues = [
  {
    title: "Trust",
    bg: "bg-blue-500",
    description:
      "Trust is not assumed, it is engineered. Every system, feature, and policy is built to protect users, reduce fraud, and ensure accountability across transactions.",
    Icon: FiStar,
  },
  {
    title: "Protection",
    bg: "bg-orange-500",
    description:
      "The customer is never left exposed. From secure payments to structured refunds and dispute resolution, we prioritize buyer safety at every stage.",
    Icon: FiShield,
  },
  {
    title: "Empowerment",
    bg: "bg-purple-600",
    description:
      "We enable serious business owners to grow sustainably. Through tools, visibility, and structured systems, we help vendors build credibility, not just make sales.",
    Icon: FiUsers,
  },
  {
    title: "Accountability",
    bg: "bg-amber-500",
    description:
      "Vendors are responsible for what they list and deliver. We enforce clear standards to ensure customers receive exactly what they pay for, no ambiguity, no excuses.",
    Icon: FiClipboard,
  },
  {
    title: "Innovation",
    bg: "bg-cyan-500",
    description:
      "We continuously build smarter tools, features, and experiences that make commerce easier, faster, and more reliable for every person on the platform.",
    Icon: FiZap,
  },
  {
    title: "Transparency",
    bg: "bg-teal-600",
    description:
      "No hidden fees, no vague policies. Every process — from payments to dispute resolution — is clear, open, and designed to build genuine confidence.",
    Icon: FiEye,
  },
  {
    title: "Community",
    bg: "bg-rose-500",
    description:
      "Vendorspot is more than a marketplace. It is a network of people who believe in honest trade, mutual growth, and building something bigger together.",
    Icon: FiHeart,
  },
  {
    title: "Growth",
    bg: "bg-emerald-600",
    description:
      "Every feature we ship is designed to help vendors grow sustainably — from discovery tools to funding access to business registration support.",
    Icon: FiTrendingUp,
  },
];

const teamMembers = [
  { name: "Olayinka", role: "All works" },
  { name: "Team Member", role: "Engineering" },
  { name: "Team Member", role: "Design" },
];

export default function TheSpotPage() {
  const [currentMember, setCurrentMember] = useState(0);

  const prevMember = () =>
    setCurrentMember((c) => (c === 0 ? teamMembers.length - 1 : c - 1));
  const nextMember = () =>
    setCurrentMember((c) => (c === teamMembers.length - 1 ? 0 : c + 1));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero + Founder's Story */}
        <section className="relative px-4 pb-16">
          {/* Purple backdrop — fixed height so it stops at image bottom level */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              backgroundColor: "#e8d7fd",
              height: "700px",
              borderRadius: "0 0 50% 50% / 0 0 70px 70px",
            }}
          />

          <div className="relative z-10">
          <h1 className="pt-14 text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark leading-tight mx-auto italic text-center mb-10">
            Building a Secure and Trusted<br />Platform for everyone.
          </h1>

          {/* Founder's Story Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-purple-200 overflow-hidden shadow-sm">
            <div className="bg-primary text-white text-center font-bold text-lg sm:text-xl py-4 px-6">
              Founder&apos;s Story
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  In 2022, we introduced a verification system that gave vendors credibility and helped over 500
                  businesses sell with confidence. We also stepped in to resolve disputes, ensuring fairness and
                  accountability on both sides.
                </p>
                <p>
                  Beyond trust, we supported real growth, helping vendors access grants, funding, and business
                  registration opportunities that changed lives.
                </p>
                <p>But we knew community alone wasn&apos;t enough.</p>
                <p>
                  In 2023, we took it further and built Vendorspot into a full marketplace, a platform designed to
                  eliminate fear from online transactions. With escrow payments, verified vendors, and integrated tools,
                  we created a system where sellers can grow without stress, and buyers can shop with complete
                  confidence.
                </p>
                <p className="font-bold text-dark">
                  Vendorspot is more than a platform.
                  <br />
                  It&apos;s a response to a broken system, and a commitment to fixing it.
                </p>
              </div>

              <div className="md:col-span-2 flex flex-col items-center justify-start">
                <div className="w-full max-w-[240px] sm:max-w-[260px]">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src="/yinka.svg"
                      alt="Olayinka Olasunkanmi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-bold text-dark">Olayinka Olasunkanmi</h3>
                    <p className="text-gray-500 text-sm">CEO / Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>{/* end relative z-10 */}
        </section>

        {/* Core Values — auto-scrolling marquee */}
        <section className="py-16 bg-white overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-8 text-center px-4">
            Core Values
          </h2>
          <div className="overflow-hidden">
            <div className="animate-marquee gap-4" style={{ width: "max-content" }}>
              {[...coreValues, ...coreValues].map(({ title, bg, description, Icon }, i) => (
                <div
                  key={`${title}-${i}`}
                  className={`${bg} rounded-2xl p-5 flex flex-col justify-between flex-shrink-0 w-[210px] mx-2`}
                >
                  <div>
                    <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                      {title}
                    </span>
                    <p className="text-white text-xs leading-relaxed">{description}</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Icon className="w-8 h-8 text-white/80" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our People */}
        <section className="py-16 px-4 bg-primary">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10">
            Our People
          </h2>

          <div className="max-w-md mx-auto relative">
            <button
              onClick={prevMember}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 sm:-translate-x-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-10 transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMember}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 sm:translate-x-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-10 transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="flex">
                {/* Photo */}
                <div className="w-1/2 bg-gray-200 flex items-center justify-center text-5xl min-h-[220px]">
                  👤
                </div>
                {/* Info */}
                <div className="w-1/2 p-6 flex flex-col justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <hr className="border-gray-200" />
                  <div>
                    <h3 className="text-lg font-bold text-dark">{teamMembers[currentMember].name}</h3>
                    <p className="text-gray-500 text-sm">{teamMembers[currentMember].role}</p>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex items-center gap-3 text-gray-400">
                    <FiTwitter className="w-4 h-4 hover:text-dark cursor-pointer transition-colors" />
                    <FiInstagram className="w-4 h-4 hover:text-dark cursor-pointer transition-colors" />
                    <FiLinkedin className="w-4 h-4 hover:text-dark cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join us banner */}
        <section className="px-4 py-10 bg-white">
          <div className="max-w-5xl mx-auto bg-purple-700 rounded-2xl px-8 py-6 flex items-center justify-between">
            <h3 className="text-white text-3xl sm:text-4xl font-bold">
              Join us.
            </h3>
            <a
              href="#"
              className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Apply for a role here
              <span className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <FiArrowRight className="w-4 h-4 text-dark" />
              </span>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <div className="bg-white">
          <FAQ />
        </div>

        {/* Refund Banner */}
        <RefundBanner />
      </main>
      <Footer />
    </>
  );
}
