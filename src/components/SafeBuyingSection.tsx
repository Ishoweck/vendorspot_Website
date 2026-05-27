"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { slideLeft, slideRight } from "@/lib/motion";
import { FiShield, FiCheckCircle, FiLock } from "react-icons/fi";
import Image from "next/image";

const phones = [
  { src: "/icons/phone-1.svg",  label: "Search & Discover" },
  { src: "/icons/phone-2.svg",  label: "View Product"      },
  { src: "/icons/phone-3.svg",  label: "Add to Cart"       },
  { src: "/icons/phone-4.svg",  label: "Checkout"          },
  { src: "/icons/phone-5.png",  label: "Secure Payment"    },
  { src: "/icons/phone-6.png",  label: "Order Confirmed"   },
  { src: "/icons/phone-7.png",  label: "Track Delivery"    },
  { src: "/icons/phone-8.png",  label: "Track Orders"      },
  { src: "/icons/phone-9.png",  label: "Order Details"     },
  { src: "/icons/phone-10.png", label: "Confirm & Release" },
];

const trustPills = [
  { icon: <FiShield      className="w-3.5 h-3.5 text-accent" />, label: "Escrow payments"  },
  { icon: <FiCheckCircle className="w-3.5 h-3.5 text-accent" />, label: "Verified vendors" },
  { icon: <FiLock        className="w-3.5 h-3.5 text-accent" />, label: "Secure checkout"  },
];

export default function SafeBuyingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragLeft, setDragLeft] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const x = useMotionValue(0);
  const pausedRef = useRef(false);
  const posRef = useRef(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current && trackRef.current) {
        const gap = window.innerWidth >= 640 ? 20 : 16;
        setDragLeft(-(Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth + gap)));
        setIsDesktop(window.innerWidth >= 1024);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isDesktop || dragLeft >= 0) return;
    posRef.current = 0;
    x.set(0);

    let rafId: number;
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current -= 1.2;
        if (posRef.current <= dragLeft) posRef.current = 0;
        x.set(posRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isDesktop, dragLeft, x]);

  return (
    <section className="bg-primary overflow-hidden py-14 sm:py-22 pb-10">
      {/* ── Text row ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 sm:gap-8 md:gap-16 mb-10 sm:mb-14">

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
              className="text-2xl sm:text-4xl md:text-[3.25rem] font-extrabold text-white leading-[1.12] mb-7"
            >
              Simple ways to buy safely &amp;{" "}
              <span className="text-accent">have your money protected</span>
            </motion.h2>

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

      {/* ── Draggable phone track ── */}
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-linear-to-r from-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-linear-to-l from-primary to-transparent" />

        <motion.div
          ref={trackRef}
          drag={isDesktop ? false : "x"}
          dragConstraints={{ right: 0, left: dragLeft }}
          dragElastic={0.04}
          dragTransition={{ bounceStiffness: 280, bounceDamping: 28 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          className={`flex gap-4 sm:gap-5 px-8 sm:px-12 pb-2 select-none ${isDesktop ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
          style={{ width: "max-content", x }}
        >
          {phones.map((phone, i) => (
            <div
              key={i}
              className="shrink-0 w-52 sm:w-60 bg-white/7 border border-white/13 rounded-2xl pt-5 pb-4 px-4 flex flex-col items-center gap-3"
            >
              <div
                className="relative w-full"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
              >
                <Image
                  src={phone.src}
                  alt={phone.label}
                  width={240}
                  height={480}
                  className="w-full h-auto object-contain pointer-events-none"
                  draggable={false}
                />
                <span className="absolute top-0 left-0 w-7 h-7 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white/80 text-center leading-tight">
                {phone.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
