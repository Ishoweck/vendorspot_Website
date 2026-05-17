"use client";

import { motion } from "framer-motion";
import { slideLeft, slideRight } from "@/lib/motion";
import { FiShield, FiCheckCircle, FiLock } from "react-icons/fi";

const phones = [
  { src: "/icons/phone-1.svg",  label: "Search & Discover",  icon: "search"   },
  { src: "/icons/phone-2.svg",  label: "View Product",       icon: "eye"      },
  { src: "/icons/phone-3.svg",  label: "Add to Cart",        icon: "cart"     },
  { src: "/icons/phone-4.svg",  label: "Checkout",           icon: "card"     },
  { src: "/icons/phone-5.png",  label: "Secure Payment",     icon: "lock"     },
  { src: "/icons/phone-6.png",  label: "Order Confirmed",    icon: "check"    },
  { src: "/icons/phone-7.png",  label: "Track Delivery",     icon: "truck"    },
  { src: "/icons/phone-8.png",  label: "Track Orders",       icon: "map-pin"  },
  { src: "/icons/phone-9.png",  label: "Order Details",      icon: "file"     },
  { src: "/icons/phone-10.png", label: "Confirm & Release",  icon: "release"  },
];

const trustPills = [
  { icon: <FiShield className="w-3.5 h-3.5 text-accent" />, label: "Escrow payments"  },
  { icon: <FiCheckCircle  className="w-3.5 h-3.5 text-accent" />, label: "Verified vendors" },
  { icon: <FiLock         className="w-3.5 h-3.5 text-accent" />, label: "Secure checkout"  },
];

const track = [...phones, ...phones];

export default function SafeBuyingSection() {
  return (
    <section className="bg-primary overflow-hidden py-14 sm:py-22 pb-0">
      {/* ── Text row ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-16 mb-14 sm:mb-18">

          {/* Left: headline + trust pills */}
          <div className="md:max-w-lg">
            <motion.span
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/45 mb-4"
            >
              Buyer Protection
            </motion.span>

            <motion.h2
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-white leading-[1.12] mb-7"
            >
              Simple ways to buy safely &amp;{" "}
              <span className="text-accent">have your money protected</span>
            </motion.h2>

            {/* Trust pills */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2.5"
            >
              {trustPills.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/80"
                >
                  {pill.icon}
                  {pill.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: description */}
          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/65 text-base sm:text-lg leading-relaxed md:max-w-xs md:pt-3 shrink-0"
          >
            Shop confidently with secure payments, verified vendors, and buyer
            protection. Your money stays safe until your order is delivered
            successfully.
          </motion.p>
        </div>
      </div>

      {/* ── Marquee — full bleed, flush to bottom ── */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-primary to-transparent" />

        <div
          className="flex gap-3 sm:gap-4 animate-marquee hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {track.map((phone, i) => {
            const step = (i % phones.length) + 1;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="shrink-0 w-[160px] sm:w-[190px] bg-white/[0.07] hover:bg-white/[0.13] border border-white/[0.13] hover:border-white/30 rounded-2xl pt-4 pb-3 px-3 flex flex-col items-center gap-2 cursor-default"
              >
                {/* Phone image with step badge overlaid */}
                <div
                  className="relative w-full"
                  style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.35))" }}
                >
                  <img
                    src={phone.src}
                    alt={phone.label}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="absolute top-0 left-0 w-6 h-6 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white">
                    {step}
                  </span>
                </div>

                {/* Label below image */}
                <span className="text-[11px] font-medium text-white/70 text-center leading-tight">
                  {phone.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}