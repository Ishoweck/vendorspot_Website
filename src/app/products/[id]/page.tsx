"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  FiHeart, FiChevronLeft, FiChevronRight, FiShare2,
  FiMessageCircle, FiMapPin, FiShoppingCart, FiStar,
  FiLink, FiUserPlus, FiX, FiCopy, FiCheck, FiSend,
  FiChevronDown, FiChevronUp,
} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface ProductDetail {
  id: string; name: string; slug: string; description: string;
  shortDescription: string; price: number; originalPrice: number;
  discount: number; images: string[]; thumbnail: string; category: string;
  stock: number; inStock: boolean; rating: number; reviews: number;
  tags: string[]; keyFeatures: string[]; specifications: Record<string, string>;
  vendor: { id: string; name: string; image: string; verified: boolean; isPremium: boolean };
}
interface VendorDetail {
  id: string; businessName: string; businessDescription: string;
  businessLogo: string; businessBanner: string; averageRating: number;
  totalReviews: number; verificationStatus: string; location?: string;
}
interface Review {
  _id: string; user: { firstName: string; lastName: string; avatar?: string };
  rating: number; comment: string; verified: boolean; helpful: number; createdAt: string;
}
interface Question {
  _id: string; question: string; answer?: string;
  user: { firstName: string; lastName: string };
  createdAt: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? "text-accent fill-accent" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [vendor, setVendor] = useState<VendorDetail | null>(null);
  const [similar, setSimilar] = useState<ProductDetail[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  // Ask a question state
  const [showAskModal, setShowAskModal] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [askLoading, setAskLoading] = useState(false);
  const [askError, setAskError] = useState("");
  const [askSuccess, setAskSuccess] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  // Referral link state
  const [referralLoading, setReferralLoading] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [showReferralCard, setShowReferralCard] = useState(false);
  const [referralError, setReferralError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setLoading(true);
        const pRes = await fetch(`${API_BASE}/products/${id}`);
        const pJson = await pRes.json();
        const prod: ProductDetail = pJson.data;
        if (!prod) return;
        setProduct(prod);
        setActiveImage(0);
        const productId = prod.id;

        if (prod?.vendor?.id) {
          const vRes = await fetch(`${API_BASE}/vendor/public/${prod.vendor.id}`);
          const vJson = await vRes.json();
          setVendor(vJson.data?.vendor ?? null);
        }
        const [sRes, rRes, qRes] = await Promise.all([
          fetch(`${API_BASE}/products/${productId}/similar?limit=10`),
          fetch(`${API_BASE}/reviews/product/${productId}?limit=5`),
          fetch(`${API_BASE}/questions/product/${productId}?limit=20`),
        ]);
        const [sJson, rJson, qJson] = await Promise.all([sRes.json(), rRes.json(), qRes.json()]);
        setSimilar(sJson.data?.products ?? []);
        setReviews(rJson.data?.reviews ?? []);
        setQuestions(qJson.data?.questions ?? []);
      } catch {
        // silently handle
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleAskQuestion = async () => {
    const token = localStorage.getItem("vendorspot_token");
    if (!token) { setAskError("Please log in to ask a question."); return; }
    if (!questionText.trim()) { setAskError("Please enter your question."); return; }
    setAskLoading(true); setAskError("");
    try {
      const res = await fetch(`${API_BASE}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: product?.id, question: questionText.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) { setAskError(json.message || "Failed to submit question."); return; }
      setAskSuccess(true);
      setQuestionText("");
      setTimeout(() => { setShowAskModal(false); setAskSuccess(false); }, 1800);
    } catch {
      setAskError("Something went wrong. Please try again.");
    } finally {
      setAskLoading(false);
    }
  };

  const handleGenerateReferral = async () => {
    const token = localStorage.getItem("vendorspot_token");
    if (!token) {
      setReferralError("Please log in to generate a referral link.");
      setShowReferralCard(true);
      return;
    }
    setReferralLoading(true); setReferralError(""); setReferralLink("");
    try {
      const res = await fetch(`${API_BASE}/affiliate/generate-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: product?.id }),
      });
      const json = await res.json();

      // Not an affiliate yet — activate first, then retry
      if (res.status === 403) {
        const actRes = await fetch(`${API_BASE}/affiliate/activate`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const actJson = await actRes.json();
        if (!actRes.ok || !actJson.success) {
          setReferralError(actJson.message || "Could not activate affiliate account.");
          setShowReferralCard(true);
          return;
        }
        // Retry
        const retry = await fetch(`${API_BASE}/affiliate/generate-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ productId: product?.id }),
        });
        const retryJson = await retry.json();
        if (!retry.ok || !retryJson.success) {
          setReferralError(retryJson.message || "Failed to generate link.");
          setShowReferralCard(true);
          return;
        }
        setReferralLink(retryJson.data?.affiliateLink?.url || "");
        setShowReferralCard(true);
        return;
      }

      if (!res.ok || !json.success) {
        setReferralError(json.message || "Failed to generate referral link.");
        setShowReferralCard(true);
        return;
      }
      setReferralLink(json.data?.affiliateLink?.url || "");
      setShowReferralCard(true);
    } catch {
      setReferralError("Something went wrong. Please try again.");
      setShowReferralCard(true);
    } finally {
      setReferralLoading(false);
    }
  };

  const handleCopyReferral = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const images = product?.images?.length ? product.images : [];
  const canPrev = activeImage > 0;
  const canNext = activeImage < images.length - 1;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const visibleQuestions = showAllQuestions ? questions : questions.slice(0, 3);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl h-80" />
                <div className="bg-white rounded-2xl h-40" />
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl h-64" />
                <div className="bg-white rounded-2xl h-40" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center mt-16">
          <p className="text-gray-500">Product not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pt-16 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-primary transition-colors">{product.category || "Products"}</Link>
          <span>›</span>
          <span className="text-dark font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Product card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                  {/* Image gallery */}
                  <div>
                    <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square mb-3">
                      {images.length > 0 ? (
                        <img src={images[activeImage]} alt={product.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
                      )}
                    </div>
                    {images.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setActiveImage((i) => Math.max(0, i - 1))} disabled={!canPrev} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:border-primary transition-colors flex-shrink-0">
                          <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
                          {images.map((img, i) => (
                            <button key={i} onClick={() => setActiveImage(i)} className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${i === activeImage ? "border-primary" : "border-transparent"}`}>
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setActiveImage((i) => Math.min(images.length - 1, i + 1))} disabled={!canNext} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:border-primary transition-colors flex-shrink-0">
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h1 className="text-lg sm:text-xl font-bold text-dark leading-snug">{product.name}</h1>
                      <button onClick={() => setSaved((s) => !s)} className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary transition-colors">
                        <FiHeart className={`w-4 h-4 ${saved ? "fill-primary text-primary" : "text-gray-400"}`} />
                      </button>
                    </div>

                    <p className="text-xl font-bold text-dark mb-3">
                      Price: <span className="text-primary">NGN{product.price?.toLocaleString()}</span>
                    </p>

                    {product.category && (
                      <p className="text-sm text-gray-500 mb-1">Category: <span className="text-dark">{product.category}</span></p>
                    )}
                    <p className="text-sm text-gray-500 mb-4">
                      Quantity Left: <span className="text-dark font-medium">{product.stock ?? "N/A"}</span>
                    </p>

                    {product.rating > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>
                    )}

                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl mb-3 transition-colors">
                      Select variation
                    </button>

                    {/* Referral + Ask */}
                    <div className="grid grid-cols-2 gap-2 mb-4 relative">
                      <button
                        onClick={handleGenerateReferral}
                        disabled={referralLoading}
                        className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
                      >
                        <FiLink className="w-3.5 h-3.5" />
                        {referralLoading ? "Generating…" : "Referral Link"}
                      </button>
                      <button
                        onClick={() => { setShowAskModal(true); setAskError(""); setAskSuccess(false); }}
                        className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors"
                      >
                        <FiMessageCircle className="w-3.5 h-3.5" />
                        Ask a Question
                      </button>
                    </div>

                    {/* Referral result card */}
                    <AnimatePresence>
                      {showReferralCard && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className="mb-3 bg-gray-50 border border-gray-200 rounded-xl p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-dark">Your Referral Link</p>
                            <button onClick={() => setShowReferralCard(false)} className="text-gray-400 hover:text-gray-600">
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                          {referralError ? (
                            <p className="text-xs text-red-500">{referralError}</p>
                          ) : referralLink ? (
                            <div className="flex items-center gap-2">
                              <p className="text-[11px] text-gray-500 flex-1 truncate bg-white border border-gray-200 rounded-lg px-2 py-1.5">{referralLink}</p>
                              <button
                                onClick={handleCopyReferral}
                                className={`flex-shrink-0 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${copied ? "bg-green-100 text-green-600" : "bg-primary text-white hover:bg-primary-dark"}`}
                              >
                                {copied ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Share only (chat removed) */}
                    <div className="flex items-center justify-end border-t border-gray-100 pt-3 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Share</span>
                        <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">
                          <FaFacebook className="w-4 h-4 text-blue-600 hover:opacity-80" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                          <FaInstagram className="w-4 h-4 text-pink-500 hover:opacity-80" />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer">
                          <FaXTwitter className="w-4 h-4 text-dark hover:opacity-80" />
                        </a>
                        <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">
                          <FaWhatsapp className="w-4 h-4 text-green-500 hover:opacity-80" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-base font-bold text-dark mb-3">Product Details</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description || product.shortDescription || "No description available."}
                </p>
                {product.keyFeatures?.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {product.keyFeatures.map((f, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>{f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Questions & Answers */}
              {questions.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-dark flex items-center gap-2">
                      <FiMessageCircle className="w-4 h-4 text-primary" />
                      Questions &amp; Answers
                      <span className="text-sm font-normal text-gray-400">({questions.length})</span>
                    </h2>
                    <button
                      onClick={() => { setShowAskModal(true); setAskError(""); setAskSuccess(false); }}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      + Ask a Question
                    </button>
                  </div>
                  <div className="space-y-4">
                    {visibleQuestions.map((q) => (
                      <div key={q._id} className="border-b border-gray-50 pb-4 last:border-0">
                        <div className="flex items-start gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-primary">Q</span>
                          </div>
                          <div>
                            <p className="text-sm text-dark">{q.question}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {q.user?.firstName} {q.user?.lastName}
                            </p>
                          </div>
                        </div>
                        {q.answer && (
                          <div className="flex items-start gap-2 ml-8 mt-2 bg-gray-50 rounded-xl p-3">
                            <div className="w-5 h-5 rounded-full bg-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[9px] font-bold text-white">A</span>
                            </div>
                            <p className="text-xs text-gray-600">{q.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {questions.length > 3 && (
                    <button
                      onClick={() => setShowAllQuestions((v) => !v)}
                      className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      {showAllQuestions ? <><FiChevronUp className="w-3.5 h-3.5" /> Show less</> : <><FiChevronDown className="w-3.5 h-3.5" /> Show all {questions.length} questions</>}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-4">

              {/* Vendor Information */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-dark">Vendor Information</h3>
                </div>
                <div>
                  <div className="relative h-24">
                    {vendor?.businessBanner ? (
                      <img src={vendor.businessBanner} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-primary to-primary-dark" />
                    )}
                    <button className="absolute top-2 right-2 w-7 h-7 bg-dark/60 rounded-full flex items-center justify-center">
                      <FiUserPlus className="w-3.5 h-3.5 text-white" />
                    </button>
                    <div className="absolute -bottom-6 left-3 w-12 h-12 rounded-full bg-white border-2 border-white shadow overflow-hidden flex items-center justify-center">
                      {(vendor?.businessLogo || product.vendor?.image) ? (
                        <img src={vendor?.businessLogo || product.vendor.image} alt={vendor?.businessName || product.vendor?.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-gray-600">{(vendor?.businessName || product.vendor?.name)?.charAt(0) || "?"}</span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 pt-8 pb-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-sm font-bold text-dark">{vendor?.businessName || product.vendor?.name || "Vendor"}</p>
                      {(vendor?.verificationStatus === "verified" || product.vendor?.verified) && (
                        <span className="text-primary text-sm">✔</span>
                      )}
                    </div>
                    {vendor && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                        <FiMapPin className="w-3 h-3" />
                        <span>{(vendor as any).location || "Nigeria"}</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                      {vendor?.businessDescription || "Visit this shop for great products."}
                    </p>
                    {(vendor?.averageRating ?? 0) > 0 && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <StarRating rating={vendor?.averageRating ?? 0} />
                        <span className="text-xs text-gray-500">({vendor?.totalReviews ?? 0})</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiShare2 className="w-3.5 h-3.5" /> Share
                      </button>
                      <Link href={`/shops/${product.vendor?.id}`} className="flex-1 flex items-center justify-center gap-1.5 bg-dark rounded-lg py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
                        <FiShoppingCart className="w-3.5 h-3.5" /> Visit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h3 className="text-sm font-bold text-dark mb-4">Reviews</h3>
                {reviews.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No reviews yet.</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((r) => (
                      <div key={r._id} className="border-b border-gray-50 pb-3 last:border-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                            {r.user?.avatar ? <img src={r.user.avatar} alt="" className="w-full h-full object-cover" /> : r.user?.firstName?.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-dark">
                              {r.user?.firstName} {r.user?.lastName}
                              {r.verified && <span className="text-primary ml-1 text-[10px]">✔ Verified</span>}
                            </p>
                            <StarRating rating={r.rating} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similar.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-6">Similar Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {similar.map((p) => (
                  <ProductCard key={p.id} _id={p.id} name={p.name} price={p.price} compareAtPrice={p.originalPrice} discountPercentage={p.discount} averageRating={p.rating} totalReviews={p.reviews} images={p.images} slug={p.slug} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ── Ask a Question Modal ── */}
      <AnimatePresence>
        {showAskModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowAskModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-dark flex items-center gap-2">
                  <FiMessageCircle className="w-4 h-4 text-primary" /> Ask a Question
                </h3>
                <button onClick={() => setShowAskModal(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-400 mb-3">About: <span className="text-dark font-medium">{product.name}</span></p>

              {askSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                    <FiCheck className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="font-semibold text-dark">Question submitted!</p>
                  <p className="text-sm text-gray-400 mt-1">The vendor will respond shortly.</p>
                </motion.div>
              ) : (
                <>
                  {askError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-3 py-2 mb-3">{askError}</div>
                  )}
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question here…"
                    rows={4}
                    maxLength={1000}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">{questionText.length}/1000</span>
                    <button
                      onClick={handleAskQuestion}
                      disabled={askLoading || !questionText.trim()}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full px-5 py-2.5 text-sm transition-colors disabled:opacity-60"
                    >
                      <FiSend className="w-3.5 h-3.5" />
                      {askLoading ? "Sending…" : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
