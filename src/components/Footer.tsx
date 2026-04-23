import { FiArrowRight } from "react-icons/fi";

const footerLinks = {
  "About Us": ["Terms & Conditions", "Privacy Policy", "FAQs"],
  "Customer Care": ["Help Center", "How to Buy", "Sell On Spot", "Returns & Refunds"],
  "Contact Us": ["Lagos, Nigeria", "support@vendorspot.com", "Tel: +234 xxx xxx xxxx"],
};

const socials = [
  { name: "X (Formerly Twitter)", icon: "𝕏" },
  { name: "Facebook", icon: "f" },
  { name: "TikTok", icon: "♪" },
  { name: "Instagram", icon: "📷" },
  { name: "LinkedIn", icon: "in" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Newsletter */}
      <div className="max-w-5xl mx-auto px-4 py-10 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold whitespace-nowrap">
            Subscribe to our Newsletter
          </h3>
          <div className="flex items-center bg-gray-800 rounded-full w-full sm:w-auto sm:min-w-[350px] overflow-hidden">
            <input
              type="email"
              placeholder="Youremail@email.com"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-gray-500 outline-none"
            />
            <button className="p-2 mr-1 bg-accent rounded-full hover:bg-accent-dark transition-colors">
              <FiArrowRight className="w-5 h-5 text-dark" />
            </button>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <span className="text-lg font-bold border-2 border-white rounded-full px-4 py-1.5 inline-block mb-4">
            Vendorspot
          </span>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold text-sm mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-xs sm:text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="max-w-5xl mx-auto px-4 py-6 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href="#"
              className="flex items-center gap-2 border border-gray-600 rounded-full px-4 py-2 text-xs sm:text-sm text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
            >
              <span>{s.icon}</span>
              {s.name}
            </a>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs">
          © 2025 Vendorspot (Yekini) Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
