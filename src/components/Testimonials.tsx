"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { fadeUp } from "@/lib/motion";

const testimonials = [
  {
    text: "Setting up my store on Vendorspot was easier than I expected. I uploaded my products, shared my store link, and started getting inquiries almost immediately. Their customer support also guided me when I got confused.",
    name: "Aisha Bello",
    role: "Vendor",
    stars: 5,
    color: "bg-violet-100 text-violet-600",
  },
  {
    text: "As a customer, what I like most is the confidence that my payment is protected. I ordered sneakers and got regular updates till delivery. It felt safer than buying directly from Instagram.",
    name: "Daniel Okeke",
    role: "Buyer",
    stars: 5,
    color: "bg-amber-100 text-amber-600",
  },
  {
    text: "The payout process was smooth and transparent. I was worried at first because many platforms delay vendor payments, but Vendorspot handled mine professionally.",
    name: "Mariam Yusuf",
    role: "Vendor",
    stars: 4,
    color: "bg-rose-100 text-rose-600",
  },
  {
    text: "I run a small fashion business and Vendorspot reduced the stress of managing customers manually on WhatsApp. Everything feels more organized now.",
    name: "Tolu Adeyemi",
    role: "Fashion Vendor",
    stars: 5,
    color: "bg-pink-100 text-pink-600",
  },
  {
    text: "One thing I appreciate is their dispute resolution. I had an issue with an order, and the support team responded quickly and handled it fairly for both sides.",
    name: "Grace Nwankwo",
    role: "Buyer",
    stars: 5,
    color: "bg-green-100 text-green-600",
  },
  {
    text: "The platform interface is clean and easy to understand. Uploading products, editing prices, and checking orders has been straightforward for me.",
    name: "Emeka Samuel",
    role: "Vendor",
    stars: 4,
    color: "bg-blue-100 text-blue-600",
  },
  {
    text: "I love that I can focus on selling without worrying too much about delivery coordination. The logistics process feels more structured than what I was used to before.",
    name: "Favour James",
    role: "Vendor",
    stars: 5,
    color: "bg-orange-100 text-orange-600",
  },
  {
    text: "The support team followed up with me personally after I created my store. That level of attention made me feel like Vendorspot genuinely wants vendors to succeed.",
    name: "Khadijat Lawal",
    role: "Vendor",
    stars: 4,
    color: "bg-teal-100 text-teal-600",
  },
  {
    text: "As a buyer, I like seeing proper product descriptions and store details before paying. It makes shopping feel more trustworthy.",
    name: "Victor Eze",
    role: "Buyer",
    stars: 5,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    text: "I mistakenly uploaded my products wrongly at first, but the Vendorspot team explained what to fix instead of just rejecting everything. That was very helpful.",
    name: "Esther Oladipo",
    role: "Vendor",
    stars: 5,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    text: "The flash sales feature helped me push discounted products faster. I actually got more engagement after using it.",
    name: "Ridwan Akinola",
    role: "Vendor",
    stars: 4,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    text: "I've sold through Instagram for years, but Vendorspot gives my business a more professional appearance. Customers now take my brand more seriously.",
    name: "Jennifer Peters",
    role: "Fashion Vendor",
    stars: 5,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    text: "The refund process for my customer was handled professionally. Communication was clear and the situation didn't escalate unnecessarily.",
    name: "Ifeanyi Obi",
    role: "Vendor",
    stars: 4,
    color: "bg-red-100 text-red-600",
  },
  {
    text: "What stood out to me was the ease of creating a store. I'm not very tech-savvy, but I was able to set up my products with little stress.",
    name: "Halimat Sodiq",
    role: "Vendor",
    stars: 5,
    color: "bg-purple-100 text-purple-600",
  },
  {
    text: "Vendorspot feels like a platform built with small business owners in mind. From customer support to product management and delivery updates, the experience has been encouraging so far.",
    name: "Samuel Adekunle",
    role: "Small Business Owner",
    stars: 5,
    color: "bg-lime-100 text-lime-600",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-14 sm:py-20 md:py-32 bg-[#8A38F5] relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)", transform: "translate(-40%, -40%)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", transform: "translate(35%, 35%)" }} />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What People Are Saying
          </h2>
        </motion.div>

        {/* Card + arrows */}
        <motion.div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) go(current + 1);
            else if (info.offset.x > 50) go(current - 1);
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -60, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl px-6 py-7 sm:px-16 sm:py-10 md:px-20 md:py-12 shadow-2xl flex flex-col min-h-72 sm:min-h-80 md:min-h-72"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className={`w-4 h-4 ${i < t.stars ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shrink-0 ${t.color}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm sm:text-base">{t.name}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t.role}</p>
                  </div>
                </div>
                <span className="text-gray-200 text-sm font-medium hidden sm:block">
                  {current + 1} / {testimonials.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows — hidden on mobile, overlaid on desktop */}
          <button
            onClick={() => go(current - 1)}
            className="flex absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 border-2 border-white/30 hover:border-white rounded-full items-center justify-center text-white hover:bg-white/10 transition-all duration-200 z-10"
            aria-label="Previous"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(current + 1)}
            className="flex absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full items-center justify-center text-[#8A38F5] hover:bg-white/90 transition-all duration-200 shadow-lg z-10"
            aria-label="Next"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "bg-white w-7 h-3" : "bg-white/30 w-3 h-3 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
