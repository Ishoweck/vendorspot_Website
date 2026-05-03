"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Sign Up or Log In",
    items: [
      "Visit the Vendorspot website.",
      "Click Sign Up if you are a new user, or Log In if you already have an account.",
      "Provide your email and password, then verify your account via email confirmation.",
    ],
  },
  {
    number: "02",
    title: "Browse and Search for Products",
    items: [
      "Use the search bar to find specific products or browse through categories.",
      "Click on a product to view its detailed description, pricing, and seller information.",
      "Check customer reviews and ratings to help with your purchasing decision.",
    ],
  },
  {
    number: "03",
    title: "Add to Cart",
    items: [
      "Once you find the product you want, click Add to Cart.",
      "Continue shopping or proceed to checkout when you are ready.",
    ],
  },
  {
    number: "04",
    title: "Review Your Cart & Proceed to Checkout",
    items: [
      "Click the Cart icon at the top right corner of the page.",
      "Verify product details, quantities, and total cost.",
      "Apply any discount codes if available.",
      "Click Checkout and enter or confirm your delivery address.",
    ],
  },
  {
    number: "05",
    title: "Make Payment",
    items: [
      "Select your preferred payment method.",
      "Choose from available options: credit/debit card, bank transfer, or mobile payments.",
      "Follow the prompts to complete your payment securely.",
      "You will receive an order confirmation via email once payment is successful.",
    ],
  },
  {
    number: "06",
    title: "Order Processing & Shipping",
    items: [
      "The seller will process and ship your order within the specified timeframe.",
      "You will receive tracking details to monitor the progress of your shipment.",
      "Contact the platform if you need any updates on your shipment.",
    ],
  },
  {
    number: "07",
    title: "Receive and Confirm Delivery",
    items: [
      "When your order arrives, inspect the product for accuracy and quality.",
      "Confirm delivery on the platform to release payment to the seller.",
      "If there is any issue with the item, raise a complaint before confirming.",
    ],
  },
  {
    number: "08",
    title: "Leave a Review",
    items: [
      "Rate the product and seller based on your experience.",
      "Write a review to help other buyers make informed decisions.",
      "Contact support if you need any further assistance.",
    ],
  },
];

export default function HowToBuyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="w-full bg-primary py-16 sm:py-20 px-4" style={{ paddingTop: "calc(64px + 3rem)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">How to Buy</h1>
            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
              Follow these simple steps to purchase products securely and efficiently on Vendorspot.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary/20 leading-none flex-shrink-0">{step.number}</span>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-dark mb-3">{step.title}</h2>
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="bg-primary rounded-2xl p-6 sm:p-8 text-center mt-8">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">Ready to start shopping?</h3>
              <p className="text-white/80 text-sm mb-5">Join thousands of buyers already shopping safely on Vendorspot.</p>
              <a href="/products" className="inline-block bg-accent hover:bg-accent-dark text-dark font-semibold text-sm px-8 py-3 rounded-xl transition-colors">
                Browse Products
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
