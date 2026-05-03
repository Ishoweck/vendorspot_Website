"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    body: "Vendorspot operates an e-commerce website dedicated to protecting people and businesses from scams. These terms apply to buyers and sellers on the web-store and govern website use. By using the website, you accept these terms in full. If you disagree with any part, you are advised not to use the website.",
  },
  {
    title: "2. Registration and Account",
    body: "You must be 18 or older to register. You will provide an email address or user ID and a password. Keep your password confidential. You are responsible for all activity carried out under your account. Your account may be suspended or cancelled at Vendorspot's discretion; refunds will be issued where products have not been received and terms have not been breached. You may cancel your account by contacting Vendorspot.",
  },
  {
    title: "3. Terms and Conditions of Sale",
    items: [
      "The website provides a platform for buyers and sellers. The contract comes into force upon the buyer's confirmation of purchase.",
      "The seller receives payment after the customer confirms delivery in good condition.",
      "The price is as stated in the product listing and must include all applicable taxes.",
      "The vendor agrees that the platform deducts its stated commission on each product sold.",
      "Delivery charges, insurance, and ancillary costs are payable only if clearly stated.",
      "Products must be of satisfactory quality, fit for purpose, and as described.",
      "The seller warrants they hold good title and sole legal ownership of the products.",
      "For digital products, the seller warrants they have the right to supply them.",
    ],
  },
  {
    title: "4. Returns and Refunds",
    body: "Returns are managed per the returns page policy. Refunds are offered for the product price and shipping fees as stated on the refunds page. Returned products are accepted by vendors and refunds are issued by Vendorspot on the vendor's behalf. Changes to the returns policy take effect on their publication date for future purchases.",
  },
  {
    title: "5. Payments",
    body: "Payments must follow the Payments Information and Guidelines on the website. The stated commission is deducted from all vendor sales at the time of payment.",
  },
  {
    title: "6. Reseller Commission",
    body: "Commissions are earned and managed per Vendorspot's reseller Terms and Conditions. Vendorspot reserves the right to cancel or withdraw commissions for any reason, including suspected fraud.",
  },
  {
    title: "7. Rules About Your Content",
    items: [
      "Your content includes all submitted materials (text, graphics, images, audio, video, scripts, software) and all marketplace communications (reviews, feedback, comments).",
      "Content must be accurate, complete, and truthful.",
      "Content must be appropriate, civil, tasteful, and accord with accepted standards.",
      "Content must not be illegal, unlawful, or infringe on any legal rights.",
      "You must not link the website to other websites without permission.",
      "You must not interfere with transactions by contacting users outside the marketplace or warning them away.",
      "Vendorspot reserves the right to remove any content at its discretion.",
    ],
  },
  {
    title: "8. Rights to Use Your Content",
    body: "By submitting content, you grant Vendorspot an irrevocable, non-exclusive, royalty-free licence to use, reproduce, and distribute your content on the website and through marketing channels. You waive all moral rights in your content. Vendorspot may delete, unpublish, or edit content if rules are breached or a breach is suspected.",
  },
  {
    title: "9. Acceptable Use of the Website",
    items: [
      "You may view pages in a web browser, download pages for caching, and use marketplace services via a web browser.",
      "Use is permitted for personal and business purposes related to buying or selling only.",
      "You may not edit or modify any material on the website unless expressly permitted.",
      "You may not republish material unless you own or control the relevant rights.",
      "You must not use the site in an unethical, unlawful, illegal, fraudulent, or harmful way.",
      "You must not hack, tamper with, probe, scan, or test the vulnerability of the website without permission.",
      "You must not conduct systematic data collection without express written consent.",
    ],
  },
  {
    title: "10. Copyright and Trademarks",
    body: "All copyright and intellectual property rights in the website and its material are reserved by Vendorspot and its licensors.",
  },
  {
    title: "11. Data Privacy",
    body: "Buyers agree to the processing of their personal data in accordance with Vendorspot's privacy terms. Vendors are directly responsible to buyers for any misuse of personal data; Vendorspot bears no liability for such misuse.",
  },
  {
    title: "12. Due Diligence",
    body: "Vendorspot operates an anti-fraud, anti-money laundering platform. It reserves the right to perform due diligence checks on all users. Users agree to provide information, documentation, and access to business premises as required.",
  },
  {
    title: "13. Our Role",
    body: "Vendorspot operates a secured platform for vendors to sell and users to buy. The relevant seller remains exclusively liable for the products they sell. For issues with an order, the buyer should seek resolution from the seller following the dispute resolution policy. Vendorspot reserves the right to discontinue or alter services without notice. Where a service is discontinued (outside force majeure), at least 15 days' notice will be provided.",
  },
  {
    title: "14. Indemnification",
    body: "You agree to indemnify Vendorspot against all losses, damages, costs, liabilities, and expenses (including legal costs) arising from your use of the website or any breach of these terms.",
  },
  {
    title: "15. Breaches of Terms",
    body: "If you breach or are suspected of breaching these terms, Vendorspot may temporarily suspend your access, permanently prohibit access, block your IP addresses, suspend or delete your account, and/or commence legal proceedings against you.",
  },
  {
    title: "16. Entire Agreement",
    body: "These terms (and seller terms for vendors) constitute the entire agreement between you and Vendorspot and supersede all previous agreements.",
  },
  {
    title: "17. Variation",
    body: "Vendorspot may revise these terms, seller terms, codes, policies, and guidelines from time to time. Revised terms apply from the date of publication on the website.",
  },
  {
    title: "18. Law and Jurisdiction",
    body: "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
  },
  {
    title: "19. Contact Us",
    body: "For any queries relating to these terms, please contact us at support@vendorspotng.com or call (+234) 704 5882 161.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="w-full bg-primary py-16 sm:py-20 px-4" style={{ paddingTop: "calc(64px + 3rem)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Terms &amp; Conditions</h1>
            <p className="text-white/80 text-sm sm:text-base">General Terms and Conditions of Use of the Marketplace for Buyers and Sellers</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-sm text-gray-500">Last updated: 2025</p>

            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-base sm:text-lg font-bold text-dark mb-3">{s.title}</h2>
                {s.body && <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{s.body}</p>}
                {s.items && (
                  <ul className="space-y-2">
                    {s.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
