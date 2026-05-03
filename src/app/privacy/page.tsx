"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    body: "This Privacy Policy provides information on how Vendorspot collects and processes your personal data when you visit our website. We are strictly committed to protecting the privacy of all visitors and customers. All information collected is used only as stated in this policy.",
  },
  {
    title: "2. Who We Are",
    body: "Vendorspot is Nigeria's safest platform for worry-free buying, selling, and finding trusted vendors. Customers can buy from reliable vendors located nearby, shop anything online, and enjoy fast delivery with flexible payment options. We partner with reliable logistics providers for easy shipment and delivery.",
  },
  {
    title: "3. Consent",
    body: "By using our website, you consent to this Privacy Policy and confirm you have the legal capacity to give such consent. If you do not agree, you may discontinue use and log out at any time.",
  },
  {
    title: "4. Data We Collect",
    items: [
      "Personal data means any information that can identify a person directly or indirectly.",
      "We collect: name, phone number, home address, store address, email address, profile picture, and banking details for payments.",
      "For verified sellers, we additionally require: NIN slip, guarantor's address and phone number.",
      "Information is requested when placing orders, buying, or registering an account.",
    ],
  },
  {
    title: "5. Cookies and Other Identifiers",
    body: "A cookie is a small piece of information stored by a web server on your browser. Cookies allow us to distinguish between users and provide an enhanced browsing experience. Please see our Cookie Notice for more information.",
  },
  {
    title: "6. How We Use Your Data",
    items: [
      "To provide the services you request and deliver a better experience.",
      "To tailor products and services to your preferences.",
      "For marketing communications (you may opt out at any time).",
      "To detect, prevent, and investigate identity theft and fraud.",
    ],
  },
  {
    title: "7. Sharing Your Personal Information",
    items: [
      "We may share information with corporate entities and affiliates to detect or prevent identity theft, fraud, or abuse.",
      "We may disclose information if required by law or in good faith belief that disclosure is necessary for legal process.",
      "We may share with law enforcement, third-party rights owners, vendors, customers, and suppliers who perform services on our behalf.",
    ],
  },
  {
    title: "8. Data Processing Principles",
    items: [
      "Personal data is collected and processed for legitimate, lawful purposes only.",
      "Data is stored only for as long as it is needed.",
      "We maintain security measures to protect your data against theft, cyberattacks, viral attacks, dissemination, manipulation, and physical damage.",
    ],
  },
  {
    title: "9. Your Privacy Rights & Account Deletion",
    body: "Your personal data must be accurate and kept current. Under the Nigeria Data Protection Regulation or applicable law, you may object to the processing of your data or request its deletion. To request deletion of your account and personal data, send an email to contact@vendorspot.ng with the subject line \"Delete my personal data\". We will act upon your request in accordance with applicable data protection laws. Please allow up to 30 days for the deletion to be completed.",
  },
  {
    title: "10. Data Security",
    body: "We maintain security measures to prevent accidental loss and unauthorised use, access, alteration, or disclosure of your data. Access is limited to employees, agents, contractors, and third parties with a legitimate business need. All parties process data only on our instructions and are subject to a duty of confidentiality.",
  },
  {
    title: "11. Advertisements",
    body: "We use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites (not including your name, address, email, or phone number) to provide relevant advertisements.",
  },
  {
    title: "12. Contact Us",
    body: "If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at support@vendorspotng.com or call (+234) 704 5882 161.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="w-full bg-primary py-16 sm:py-20 px-4" style={{ paddingTop: "calc(64px + 3rem)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Privacy Policy</h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
              Please read this Privacy Policy carefully as it will help you make informed decisions about sharing your personal information with us.
            </p>
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
