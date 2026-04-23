"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    text: "I've used so many e-commerce platforms, but Vendorspot is very safe! They're truly interested in their users growth and are constantly protecting the customers and promoting trusted vendors. They put every measure to ensure both buyers and seller are very safe.",
    name: "Soyifunmi Aloaye",
    role: "Etia Perfumery",
  },
  {
    text: "Vendorspot has transformed how I sell online. The platform is easy to use and the support team is always ready to help. My sales have grown significantly since I joined.",
    name: "Adebayo Johnson",
    role: "Tech Gadgets Store",
  },
  {
    text: "As a buyer, I feel very safe shopping on Vendorspot. The buyer protection is top-notch and the verified vendors give me confidence in every purchase.",
    name: "Chioma Okafor",
    role: "Regular Shopper",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 px-4 bg-purple-50">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-10">
        What People are saying
      </h2>

      <div className="max-w-2xl mx-auto relative">
        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 z-10"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 z-10"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>

        {/* Testimonial card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mx-8">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            {testimonials[current].text}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-sm">
              {testimonials[current].name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm text-dark">
                {testimonials[current].name}
              </p>
              <p className="text-xs text-gray-500">
                {testimonials[current].role}
              </p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? "bg-purple-600" : "bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
