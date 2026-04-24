"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RefundBanner from "@/components/RefundBanner";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/components/Toast";
import { FiMapPin, FiTag, FiTruck, FiChevronRight, FiCheck, FiPlus, FiCreditCard, FiLoader } from "react-icons/fi";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Address {
  _id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
}

interface DeliveryRate {
  type: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  courier: string;
  logo?: string;
  vendorBreakdown?: { vendorId: string; vendorName: string; price: number; courier: string }[];
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vendorspot_token");
}
function authHeaders() {
  const token = getToken();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, itemCount, clearCart } = useCart();
  const { toast } = useToast();

  // Guest mode state
  const [isAuthed, setIsAuthed] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    setIsAuthed(!!getToken());
  }, []);

  const handleGuestContinue = async () => {
    if (!guestEmail.trim() || !guestEmail.includes("@")) {
      toast("Please enter a valid email address.", "warning");
      return;
    }
    setGuestLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/guest-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: guestEmail.trim() }),
      });
      const json = await res.json();
      if (json.success) {
        const token = json.data?.accessToken || json.data?.token;
        if (token) {
          localStorage.setItem("vendorspot_token", token);
          if (json.data?.user) localStorage.setItem("vendorspot_user", JSON.stringify(json.data.user));
          setIsAuthed(true);
          toast("Welcome! You can set your password later via email.", "success");
          // reload addresses now that we have a token
          loadAddresses();
        }
      } else {
        // Email already exists — redirect to login
        toast(json.message || "Email already registered. Please log in.", "info");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      toast("Could not continue as guest. Try again.", "error");
    } finally {
      setGuestLoading(false);
    }
  };

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({ fullName: "", phone: "", street: "", city: "", state: "", label: "Home" });
  const [savingAddress, setSavingAddress] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // Shipping rate state
  const [rates, setRates] = useState<DeliveryRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<DeliveryRate | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [ratesLoaded, setRatesLoaded] = useState(false);

  // Payment & order state
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "paystack">("paystack");
  const [placingOrder, setPlacingOrder] = useState(false);

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);
  const shippingCost = selectedRate?.price ?? 0;
  const grandTotal = cart.subtotal + shippingCost - cart.discount;

  const loadAddresses = () => {
    if (!getToken()) { setLoadingAddresses(false); return; }
    setLoadingAddresses(true);
    fetch(`${API_BASE}/addresses`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          const list: Address[] = json.data?.addresses || [];
          setAddresses(list);
          const def = list.find((a) => a.isDefault) || list[0];
          if (def) setSelectedAddressId(def._id);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingAddresses(false));
  };

  // Load saved addresses on mount (if already authed)
  useEffect(() => { loadAddresses(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveAddress = async () => {
    if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.fullName || !addressForm.phone) {
      toast("Please fill all address fields.", "warning");
      return;
    }
    setSavingAddress(true);
    try {
      const res = await fetch(`${API_BASE}/addresses`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ...addressForm, country: "Nigeria", isDefault: addresses.length === 0 }),
      });
      const json = await res.json();
      if (json.success) {
        const newAddr: Address = json.data.address;
        setAddresses((prev) => [...prev, newAddr]);
        setSelectedAddressId(newAddr._id);
        setShowAddressForm(false);
        setAddressForm({ fullName: "", phone: "", street: "", city: "", state: "", label: "Home" });
        setRates([]);
        setSelectedRate(null);
        setRatesLoaded(false);
        toast("Address saved!", "success");
      } else {
        toast(json.message || "Failed to save address.", "error");
      }
    } catch {
      toast("Could not save address.", "error");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleCalculateRates = async () => {
    if (!selectedAddress) {
      toast("Please select or add a delivery address first.", "warning");
      return;
    }
    setLoadingRates(true);
    setRates([]);
    setSelectedRate(null);
    setRatesLoaded(false);
    try {
      const params = new URLSearchParams({
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        fullName: selectedAddress.fullName,
        phone: selectedAddress.phone,
      });
      const res = await fetch(`${API_BASE}/orders/delivery-rates?${params}`, { headers: authHeaders() });
      const json = await res.json();
      if (json.success) {
        const list: DeliveryRate[] = json.data?.rates || [];
        setRates(list);
        setRatesLoaded(true);
        if (list.length === 0) toast("No shipping options available for this address.", "warning");
      } else {
        toast(json.message || "Could not fetch shipping rates.", "error");
      }
    } catch {
      toast("Failed to fetch shipping rates. Check your connection.", "error");
    } finally {
      setLoadingRates(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) { toast("Please select a delivery address.", "warning"); return; }
    if (!selectedRate) { toast("Please select a shipping option.", "warning"); return; }
    if (cart.items.length === 0) { toast("Your cart is empty.", "warning"); return; }

    setPlacingOrder(true);
    try {
      const body = {
        shippingAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          country: selectedAddress.country || "Nigeria",
        },
        paymentMethod,
        deliveryType: selectedRate.type,
        selectedDeliveryPrice: selectedRate.price,
        selectedCourier: selectedRate.courier,
        vendorBreakdown: selectedRate.vendorBreakdown || [],
      };

      if (paymentMethod === "paystack") {
        const res = await fetch(`${API_BASE}/orders/initialize-payment`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.success) {
          const authUrl = json.data?.payment?.authorization_url;
          if (authUrl) {
            window.location.href = authUrl;
          } else {
            toast("Could not redirect to payment. Try again.", "error");
          }
        } else {
          toast(json.message || "Payment initialization failed.", "error");
        }
      } else {
        // Wallet payment
        const res = await fetch(`${API_BASE}/orders`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.success) {
          await clearCart();
          const orderId = json.data?.order?._id || "new";
          router.push(`/orders/${orderId}?confirmed=true`);
        } else {
          toast(json.message || "Failed to place order.", "error");
        }
      }
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {!isAuthed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h1 className="text-xl font-bold text-dark mb-1">Checkout</h1>
                <p className="text-sm text-gray-500 mb-6">Enter your email to continue as a guest — no password needed.</p>

                <div className="space-y-3">
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGuestContinue()}
                    placeholder="youremail@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    autoFocus
                  />
                  <button
                    onClick={handleGuestContinue}
                    disabled={guestLoading}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 rounded-xl hover:bg-primary-dark disabled:opacity-60 transition-colors"
                  >
                    {guestLoading ? <><FiLoader className="w-4 h-4 animate-spin" /> Please wait...</> : "Continue as Guest"}
                  </button>
                </div>

                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 text-dark text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Log In to your account <FiChevronRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-gray-400 text-center mt-4">
                  By continuing, we&apos;ll email you a link to set your password and access your order history.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ── Left column ── */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h1 className="text-2xl font-bold text-dark mb-6">Checkout</h1>

                  {/* ── Delivery Address ── */}
                  <section className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-dark flex items-center gap-2">
                        <FiMapPin className="w-4 h-4" /> Customer Address
                      </p>
                      <button
                        onClick={() => { setShowAddressForm((v) => !v); setRates([]); setSelectedRate(null); setRatesLoaded(false); }}
                        className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                      >
                        <FiPlus className="w-3.5 h-3.5" /> Add new
                      </button>
                    </div>

                    {loadingAddresses ? (
                      <div className="space-y-2">
                        {[1, 2].map((i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
                      </div>
                    ) : (
                      <>
                        {addresses.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {addresses.map((addr) => (
                              <button
                                key={addr._id}
                                onClick={() => { setSelectedAddressId(addr._id); setRates([]); setSelectedRate(null); setRatesLoaded(false); }}
                                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                                  selectedAddressId === addr._id
                                    ? "border-primary bg-pink-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs font-bold text-dark">{addr.label} — {addr.fullName}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{addr.street}, {addr.city}, {addr.state}</p>
                                    <p className="text-xs text-gray-400">{addr.phone}</p>
                                  </div>
                                  {selectedAddressId === addr._id && (
                                    <span className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                      <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Add address form */}
                        {(showAddressForm || addresses.length === 0) && (
                          <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
                            <p className="text-xs font-semibold text-dark">New Shipment Address</p>
                            <div className="grid grid-cols-2 gap-2">
                              <input value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} placeholder="Full name" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-white" />
                              <input value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} placeholder="Phone number" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-white" />
                              <input value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} placeholder="Street address" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-white" />
                              <input value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} placeholder="City" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-white" />
                              <input value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} placeholder="State" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-white" />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button onClick={handleSaveAddress} disabled={savingAddress} className="flex-1 bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:bg-primary-dark disabled:opacity-60 transition-colors">
                                {savingAddress ? "Saving..." : "Save Address"}
                              </button>
                              {addresses.length > 0 && (
                                <button onClick={() => setShowAddressForm(false)} className="px-4 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </section>

                  {/* ── Shipping Rates ── */}
                  <section className="mb-6">
                    <p className="text-sm font-bold text-dark flex items-center gap-2 mb-4">
                      <FiTruck className="w-4 h-4" /> Shipping Options
                    </p>

                    <button
                      onClick={handleCalculateRates}
                      disabled={loadingRates || !selectedAddress}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark disabled:opacity-60 transition-colors mb-4"
                    >
                      {loadingRates ? (
                        <>
                          <FiLoader className="w-4 h-4 animate-spin" /> Fetching rates...
                        </>
                      ) : (
                        "Calculate Shipping Rates"
                      )}
                    </button>

                    {ratesLoaded && rates.length > 0 && (
                      <div className="space-y-2">
                        {rates.map((rate, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedRate(rate)}
                            className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                              selectedRate?.courier === rate.courier && selectedRate?.name === rate.name
                                ? "border-primary bg-pink-50"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                {rate.logo ? (
                                  <img src={rate.logo} alt={rate.courier} className="w-8 h-8 object-contain rounded flex-shrink-0" />
                                ) : (
                                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                    <FiTruck className="w-4 h-4 text-gray-400" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-dark truncate">{rate.name}</p>
                                  <p className="text-xs text-gray-500">{rate.estimatedDays} {rate.estimatedDays === "1" ? "day" : "days"}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-sm font-bold text-dark">₦{rate.price.toLocaleString()}</span>
                                {selectedRate?.courier === rate.courier && selectedRate?.name === rate.name && (
                                  <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                    <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {ratesLoaded && rates.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No shipping options available for this address.</p>
                    )}
                  </section>

                  {/* ── Payment Method ── */}
                  <section>
                    <p className="text-sm font-bold text-dark flex items-center gap-2 mb-3">
                      <FiCreditCard className="w-4 h-4" /> Payment Method
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {(["paystack", "wallet"] as const).map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                            paymentMethod === method
                              ? "border-primary bg-pink-50 text-primary"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {method === "paystack" ? "💳 Pay with Card (Paystack)" : "👛 Pay with Wallet"}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                <Link href="/cart" className="text-sm text-primary hover:underline font-medium block">
                  &larr; Continue Shopping
                </Link>
              </div>

              {/* ── Right sidebar ── */}
              <div className="flex flex-col gap-4">
                {/* Promo code */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <p className="text-sm font-semibold text-dark mb-2 flex items-center gap-1.5">
                    <FiTag className="w-4 h-4" /> Apply Promo Code
                  </p>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter promo code" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors" />
                    <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                      Apply
                    </button>
                  </div>
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
                      <span className={`font-medium ${selectedRate ? "text-dark" : "text-gray-400"}`}>
                        {selectedRate ? `₦${selectedRate.price.toLocaleString()}` : "—"}
                      </span>
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
                    <span>₦{(selectedRate ? grandTotal : cart.subtotal - cart.discount).toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placingOrder || cart.items.length === 0 || !selectedRate || !selectedAddress}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3 rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-colors"
                  >
                    {placingOrder ? (
                      <><FiLoader className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                  {!selectedRate && cart.items.length > 0 && (
                    <p className="text-xs text-gray-400 text-center mt-2">Select a shipping option to continue</p>
                  )}
                </div>

                {/* Items preview */}
                {cart.items.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs font-bold text-dark mb-3">Items ({itemCount})</p>
                    <div className="space-y-2">
                      {cart.items.map((item) => (
                        <div key={item._id} className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {item.product.images?.[0] ? (
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-base">📦</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-dark truncate">{item.product.name}</p>
                            <p className="text-xs text-gray-400">x{item.quantity}</p>
                          </div>
                          <span className="text-xs font-semibold text-dark">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
