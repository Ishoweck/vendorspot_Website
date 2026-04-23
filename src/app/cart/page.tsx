"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RefundBanner from "@/components/RefundBanner";
import { useCart } from "@/lib/CartContext";
import { FiMinus, FiPlus, FiTag, FiLock } from "react-icons/fi";

export default function CartPage() {
  const router = useRouter();
  const { cart, itemCount, loading, removeFromCart, updateQuantity, clearCart, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setApplyingCoupon(true);
    const result = await applyCoupon(couponInput.trim().toUpperCase());
    setCouponMsg({ text: result.message, ok: result.success });
    setApplyingCoupon(false);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {cart.items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <p className="text-xl font-semibold text-dark mb-2">Your cart is empty</p>
              <p className="text-gray-500 text-sm mb-6">Browse our products and add something you like.</p>
              <Link href="/products" className="inline-flex items-center gap-2 bg-primary text-white rounded-xl px-6 py-3 text-sm font-medium hover:bg-primary-dark transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart items */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h1 className="text-2xl font-bold text-dark mb-6 underline underline-offset-4 decoration-2">
                  Your Cart
                </h1>

                <div className="divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 py-4">
                      {/* Product image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.product.images?.[0] ? (
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-dark truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Price: NGN{item.price.toLocaleString()}</p>
                        {item.variant && <p className="text-xs text-gray-400">{item.variant}</p>}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          disabled={loading}
                          className="text-primary text-xs mt-1 hover:underline disabled:opacity-50"
                        >
                          Remove Item
                        </button>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={loading}
                          className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                          <FiMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-2 text-sm font-medium text-dark min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          disabled={loading}
                          className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                          <FiPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom buttons */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href="/products"
                    className="flex items-center justify-center px-5 py-2.5 bg-dark text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    disabled={loading}
                    className="flex items-center justify-center px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-4">
                {/* Promo code */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-sm font-semibold text-dark mb-3 flex items-center gap-1.5">
                    <FiTag className="w-4 h-4" />
                    Apply Promo Code
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponMsg(null); }}
                      placeholder="Enter promo code"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={applyingCoupon || !couponInput.trim()}
                      className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                    >
                      {applyingCoupon ? "..." : "Apply"}
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-xs mt-2 ${couponMsg.ok ? "text-green-600" : "text-red-500"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Order summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h2 className="text-base font-bold text-dark mb-4">Order Summary</h2>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                      <span className="font-medium text-dark">₦{cart.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-dark">₦{cart.deliveryFee.toLocaleString()}</span>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount{cart.couponCode ? ` (${cart.couponCode})` : ""}</span>
                        <span className="font-medium">-₦{cart.discount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between font-bold text-dark text-base mt-4 pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span>₦{cart.total.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    <FiLock className="w-4 h-4" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <RefundBanner />
      <Footer />
    </>
  );
}
