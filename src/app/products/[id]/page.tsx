"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  FiHeart, FiChevronLeft, FiChevronRight, FiShare2,
  FiMessageCircle, FiMapPin, FiShoppingCart, FiStar,
  FiLink, FiUserPlus,
} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  thumbnail: string;
  category: string;
  stock: number;
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  keyFeatures: string[];
  specifications: Record<string, string>;
  vendor: {
    id: string;
    name: string;
    image: string;
    verified: boolean;
    isPremium: boolean;
  };
}

interface VendorDetail {
  id: string;
  businessName: string;
  businessDescription: string;
  businessLogo: string;
  businessBanner: string;
  averageRating: number;
  totalReviews: number;
  verificationStatus: string;
  location?: string;
}

interface Review {
  _id: string;
  user: { firstName: string; lastName: string; avatar?: string };
  rating: number;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? "text-accent fill-accent" : "text-gray-300"}`}
        />
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
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);

        // Product
        const pRes = await fetch(`${API_BASE}/products/${id}`);
        const pJson = await pRes.json();
        const prod: ProductDetail = pJson.data;

        if (!prod) return; // invalid/not-found — stop here, don't call reviews with a slug

        setProduct(prod);
        setActiveImage(0);

        // Use the real MongoDB _id from the fetched product for all subsequent calls
        const productId = prod.id;

        // Vendor public profile
        if (prod?.vendor?.id) {
          const vRes = await fetch(`${API_BASE}/vendor/public/${prod.vendor.id}`);
          const vJson = await vRes.json();
          setVendor(vJson.data?.vendor ?? null);
        }

        // Similar products
        const sRes = await fetch(`${API_BASE}/products/${productId}/similar?limit=10`);
        const sJson = await sRes.json();
        setSimilar(sJson.data?.products ?? []);

        // Reviews
        const rRes = await fetch(`${API_BASE}/reviews/product/${productId}?limit=5`);
        const rJson = await rRes.json();
        setReviews(rJson.data?.reviews ?? []);
      } catch {
        // silently handle
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const images = product?.images?.length ? product.images : [];
  const canPrev = activeImage > 0;
  const canNext = activeImage < images.length - 1;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
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
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Product not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-primary transition-colors">
            {product.category || "Products"}
          </Link>
          <span>›</span>
          <span className="text-dark font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Product card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Image gallery */}
                  <div>
                    <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square mb-3">
                      {images.length > 0 ? (
                        <img
                          src={images[activeImage]}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveImage((i) => Math.max(0, i - 1))}
                          disabled={!canPrev}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:border-primary transition-colors flex-shrink-0"
                        >
                          <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
                          {images.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveImage(i)}
                              className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                                i === activeImage ? "border-primary" : "border-transparent"
                              }`}
                            >
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveImage((i) => Math.min(images.length - 1, i + 1))}
                          disabled={!canNext}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:border-primary transition-colors flex-shrink-0"
                        >
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h1 className="text-lg sm:text-xl font-bold text-dark leading-snug">{product.name}</h1>
                      <button
                        onClick={() => setSaved((s) => !s)}
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary transition-colors"
                      >
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

                    {/* Rating */}
                    {product.rating > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>
                    )}

                    {/* Select variation */}
                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl mb-3 transition-colors">
                      Select variation
                    </button>

                    {/* Referral + Ask */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors">
                        <FiLink className="w-3.5 h-3.5" />
                        Generate Referral Link
                      </button>
                      <button className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors">
                        <FiMessageCircle className="w-3.5 h-3.5" />
                        Ask a Question
                      </button>
                    </div>

                    {/* Chat + Share */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                      <a href="#" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors">
                        <FiMessageCircle className="w-3.5 h-3.5" />
                        Need Help? <span className="font-semibold text-primary">Chat us</span>
                      </a>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">Share</span>
                        <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">
                          <FaFacebook className="w-4 h-4 text-blue-600 hover:opacity-80" />
                        </a>
                        <a href={`https://instagram.com`} target="_blank" rel="noreferrer">
                          <FaInstagram className="w-4 h-4 text-pink-500 hover:opacity-80" />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer">
                          <FaXTwitter className="w-4 h-4 text-dark hover:opacity-80" />
                        </a>
                        <a href={`https://wa.me/?text=${shareUrl}`} target="_blank" rel="noreferrer">
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
                        <span className="text-primary mt-0.5">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-4">

              {/* Vendor Information */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-dark">Vendor Information</h3>
                </div>

                {/* Vendor card */}
                <div>
                  {/* Banner */}
                  <div className="relative h-24">
                    {vendor?.businessBanner ? (
                      <img src={vendor.businessBanner} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-violet-400 to-purple-500" />
                    )}
                    <button className="absolute top-2 right-2 w-7 h-7 bg-dark/60 rounded-full flex items-center justify-center">
                      <FiUserPlus className="w-3.5 h-3.5 text-white" />
                    </button>
                    <div className="absolute -bottom-6 left-3 w-12 h-12 rounded-full bg-white border-2 border-white shadow overflow-hidden flex items-center justify-center">
                      {(vendor?.businessLogo || product.vendor?.image) ? (
                        <img
                          src={vendor?.businessLogo || product.vendor.image}
                          alt={vendor?.businessName || product.vendor?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-600">
                          {(vendor?.businessName || product.vendor?.name)?.charAt(0) || "?"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-4 pt-8 pb-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-sm font-bold text-dark">
                        {vendor?.businessName || product.vendor?.name || "Vendor"}
                      </p>
                      {(vendor?.verificationStatus === "verified" || product.vendor?.verified) && (
                        <span className="text-accent">✔</span>
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

                    {vendor?.averageRating > 0 && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <StarRating rating={vendor.averageRating} />
                        <span className="text-xs text-gray-500">({vendor.totalReviews})</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiShare2 className="w-3.5 h-3.5" />
                        Share
                      </button>
                      <Link
                        href={`/shops/${product.vendor?.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-dark rounded-lg py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
                      >
                        <FiShoppingCart className="w-3.5 h-3.5" />
                        Visit
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
                            {r.user?.avatar ? (
                              <img src={r.user.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              r.user?.firstName?.charAt(0) || "?"
                            )}
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
                  <ProductCard
                    key={p.id}
                    _id={p.id}
                    name={p.name}
                    price={p.price}
                    compareAtPrice={p.originalPrice}
                    discountPercentage={p.discount}
                    averageRating={p.rating}
                    totalReviews={p.reviews}
                    images={p.images}
                    slug={p.slug}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
