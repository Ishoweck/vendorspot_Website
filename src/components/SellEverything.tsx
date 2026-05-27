"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import {
  FiShoppingBag, FiMonitor, FiBook,
  FiCode, FiHeadphones, FiPlay,
} from "react-icons/fi";
import Link from "next/link";

const categories = [
  {
    icon: FiShoppingBag,
    title: "Physical Products",
    description: "Sell everyday products buyers need and get them delivered smoothly.",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    href: "/products",
  },
  {
    icon: FiMonitor,
    title: "Digital Products",
    description: "Upload once and sell unlimited digital products anytime, anywhere.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
    href: "/products/digital",
  },
  {
    icon: FiBook,
    title: "E-books",
    description: "Turn your knowledge into income by selling digital books online.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    href: "/products",
  },
  {
    icon: FiCode,
    title: "Software",
    description: "Sell software, tools, and licenses securely to customers everywhere.",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
    href: "/products",
  },
  {
    icon: FiHeadphones,
    title: "Audio Book",
    description: "Share stories and knowledge through audio customers can listen to anytime.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    href: "/products",
  },
  {
    icon: FiPlay,
    title: "Course",
    description: "Create online courses and earn by teaching valuable skills digitally.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    href: "/products",
  },
];

export default function SellEverything() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-10 sm:mb-14"
        >
          Sell everything on the spot
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm transition-shadow cursor-pointer"
              >
                <Link href={cat.href} className="flex flex-col gap-3 flex-1">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${cat.iconBg}`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${cat.iconColor}`} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-dark">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
