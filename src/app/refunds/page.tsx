"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const eligibleReturns = [
  "If the size is correct but the item doesn't fit as expected, you may only return clothing and shoes.",
  "If an item stops working after usage, you can return it — except for boxed items such as computers, mobile phones, and other gadgets, as well as clothing and consumable products.",
  "If you receive a broken or defective item, or the packaging was damaged, you can return it.",
  "If the received item was used or expired, you can return it.",
  "If you received the wrong item, you can return it. The return is authorised after validation, and once the item is returned to the vendor, the item cost and shipping will be refunded.",
];

const nonEligible = [
  "Underwear, nightwear, beach & swimwear, facial skincare, fragrances, hair care, handbags, food items, and other consumable products are non-returnable.",
  "Health products, hygiene products, and some personalised products are not eligible for returns unless the item is wrong, damaged, or fake/inauthentic.",
  "Special items specifically customised for you are not eligible for a refund.",
  "Items that were delivered in healthy condition but were damaged after delivery are not accepted for return.",
  "Books, software CDs, jewellery, bedsheets, lingerie, and socks are not eligible for returns.",
];

const steps = [
  {
    number: "01",
    title: "Report the Issue",
    body: "Immediately click on \"Incomplete Order\" on the product listing on our website. Send your order information along with evidence (photos or video) to contact@vendorspot.ng.",
  },
  {
    number: "02",
    title: "Return After Authorisation",
    body: "Once your claim is validated, we will provide information on the most suitable means of returning the item to the vendor.",
  },
  {
    number: "03",
    title: "Get Resolution",
    body: "Upon confirmation of receipt of the item by the seller, Vendorspot will assist by contacting the vendor to ensure a resolution — either a replacement or a refund.",
  },
];

export default function RefundsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="w-full bg-primary py-16 sm:py-20 px-4" style={{ paddingTop: "calc(64px + 3rem)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Returns &amp; Refunds</h1>
            <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
              We allow customers to return all eligible items within 3 days after delivery, in their original condition and packaging, with all accessories included.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-8">

            {/* Eligible Returns */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-dark mb-4">Eligible Returns</h2>
              <ul className="space-y-3">
                {eligibleReturns.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Return */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-dark mb-4">How to Initiate a Return</h2>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                    <span className="text-3xl font-extrabold text-primary/20 leading-none flex-shrink-0">{step.number}</span>
                    <div>
                      <h3 className="font-bold text-dark text-sm sm:text-base mb-1">{step.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Not Eligible */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-dark mb-4">Items Not Eligible for Returns</h2>
              <ul className="space-y-3">
                {nonEligible.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Packaging & Refunds */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100 space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-dark mb-2">Packaging Returns</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  All items eligible for return must be properly packed the way they were delivered, including the original packaging, tags, and labels. Returned items are your responsibility until they reach the vendor.
                </p>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-dark mb-2">Refunds</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Once the returned items are confirmed by the vendor, we process a refund for the cost of the item. For incorrect, defective, or damaged items, you will also be refunded the full cost of delivery. If the return is not due to our error or the seller's error (e.g., you changed your mind or the size doesn't fit), delivery fees will not be refunded.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-2">Need Help with a Return?</h3>
              <p className="text-white/80 text-sm mb-4">Our support team is ready to assist you.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href="mailto:support@vendorspotng.com" className="bg-white text-primary font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  Email Support
                </a>
                <a href="tel:+2347045882161" className="border border-white text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                  (+234) 704 5882 161
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
