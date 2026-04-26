"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiMenu, FiX, FiChevronDown, FiPackage, FiBookOpen, FiMail, FiLogOut, FiUser, FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";

const moreLinks = [
  { label: "My Orders",      href: "/orders",  icon: FiPackage },
  { label: "Blog & Stories", href: "/thespot", icon: FiBookOpen },
  { label: "Contact Us",     href: "/contact", icon: FiMail },
];

interface StoredUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const raw = localStorage.getItem("vendorspot_user");
    const token = localStorage.getItem("vendorspot_token");
    if (raw && token) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vendorspot_token");
    localStorage.removeItem("vendorspot_user");
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  };

  const openUserMenu  = () => { if (userMenuTimer.current) clearTimeout(userMenuTimer.current); setUserMenuOpen(true); };
  const closeUserMenu = () => { userMenuTimer.current = setTimeout(() => setUserMenuOpen(false), 120); };

  const openMore  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMoreOpen(true); };
  const closeMore = () => { closeTimer.current = setTimeout(() => setMoreOpen(false), 120); };

  const navLinkClass = (href: string) =>
    `px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
      pathname === href
        ? "bg-white text-primary font-semibold"
        : "text-white/90 hover:text-white hover:bg-white/15"
    }`;

  return (
    <nav className="w-full bg-primary sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <FiShoppingBag className="w-4 h-4 text-dark" />
          </div>
          <span className="text-white font-bold text-lg leading-none">Vendorspot</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 border border-white/20 bg-white/10 rounded-full px-2 py-1">
          <Link href="/thespot" className={navLinkClass("/thespot")}>TheSpot</Link>
          <Link href="/shops"   className={navLinkClass("/shops")}>Shops</Link>
          <Link href="/products" className={navLinkClass("/products")}>Products</Link>

          {/* More dropdown */}
          <div className="relative" onMouseEnter={openMore} onMouseLeave={closeMore}>
            <button
              className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-colors"
              onClick={() => setMoreOpen((v) => !v)}
            >
              More
              <span className="text-accent text-xs ml-0.5">&#9679;</span>
              <FiChevronDown className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden py-1.5 z-50"
                onMouseEnter={openMore}
                onMouseLeave={closeMore}
              >
                {moreLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative hidden md:block" onMouseEnter={openUserMenu} onMouseLeave={closeUserMenu}>
              <button
                className="flex items-center gap-2 border border-white/30 text-white rounded-full px-3 py-1.5 text-sm font-medium hover:bg-white/10 transition-colors"
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center">
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </span>
                )}
                <span className="max-w-[100px] truncate">{user.firstName || user.email}</span>
                <FiChevronDown className={`w-3 h-3 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden py-1.5 z-50"
                  onMouseEnter={openUserMenu}
                  onMouseLeave={closeUserMenu}
                >
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-dark truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link href="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                    <FiPackage className="w-4 h-4 text-gray-400" /> My Orders
                  </Link>
                  <Link href="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                    <FiUser className="w-4 h-4 text-gray-400" /> My Account
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <FiLogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-2 border border-white/30 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
              <FiUser className="w-4 h-4" />
              Log In
            </Link>
          )}

          <Link href="/cart" className="relative p-2 bg-accent rounded-full hover:bg-accent-dark transition-colors">
            <FiShoppingCart className="w-5 h-5 text-dark" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary px-4 py-4 space-y-1">
          {[
            { label: "TheSpot",  href: "/thespot" },
            { label: "Shops",    href: "/shops" },
            { label: "Products", href: "/products" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                pathname === link.href ? "bg-white text-primary" : "text-white/90 hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-white/10 pt-2 mt-2 space-y-1">
            {moreLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-4 h-4 text-white/60" />
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-2 mt-2">
            {user ? (
              <>
                <div className="px-4 py-2 text-xs text-white/60">
                  Signed in as <span className="font-semibold text-white">{user.firstName || user.email}</span>
                </div>
                <Link href="/account" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 rounded-xl" onClick={() => setMobileOpen(false)}>
                  <FiUser className="w-4 h-4 text-white/60" /> My Account
                </Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-300 hover:bg-white/10 rounded-xl">
                  <FiLogOut className="w-4 h-4" /> Log Out
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-4 py-2.5 text-sm font-medium text-accent" onClick={() => setMobileOpen(false)}>
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
