"use client";

import Link from "next/link";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiStar, FiCheck } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/components/Toast";

interface ProductCardProps {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  compareAtPrice?: number;
  discount?: number;
  discountPercentage?: number;
  rating?: number;
  averageRating?: number;
  reviews?: number;
  totalReviews?: number;
  color?: string;
  emoji?: string;
  images?: string[];
  slug?: string;
  [key: string]: unknown;
}

export default function ProductCard(props: ProductCardProps) {
  const {
    id,
    _id,
    name,
    price,
    slug,
    images,
    emoji,
    color = "bg-gray-100",
  } = props;

  const oldPrice = props.oldPrice || props.compareAtPrice || 0;
  const discount = props.discount || props.discountPercentage || (oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);
  const rating = props.rating || props.averageRating || 0;
  const reviews = props.reviews || props.totalReviews || 0;
  const productImage = images && images.length > 0 ? images[0] : null;
  const productId = _id || id || "";
  const href = productId ? `/products/${productId}` : slug ? `/products/${slug}` : "#";

  const { addToCart } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(productId, { _id: productId, name, price, images: images || [], slug }, 1);
    setAdded(true);
    toast(`${name} added to cart`, "success");
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group block"
    >
      <div className={`relative ${productImage ? "bg-gray-50" : color} h-40 sm:h-48 flex items-center justify-center`}>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            -{discount}%
          </span>
        )}
        <button
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 z-10"
          onClick={(e) => e.preventDefault()}
        >
          <FiHeart className="w-3.5 h-3.5 text-gray-400" />
        </button>
        {productImage ? (
          <img
            src={productImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-5xl opacity-50">{emoji || "📦"}</span>
        )}
      </div>
      <div className="p-3">
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-1">
            <FiStar className="w-3 h-3 text-accent fill-accent" />
            <span className="text-xs text-gray-600">
              {rating.toFixed(1)} ({reviews})
            </span>
          </div>
        )}
        <p className="text-sm font-medium text-dark truncate mb-1">{name}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-dark">
              ₦{price.toLocaleString()}
            </span>
            {oldPrice > 0 && oldPrice > price && (
              <span className="text-[10px] text-gray-400 line-through ml-1">
                ₦{oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              added ? "bg-green-500" : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {added ? (
              <FiCheck className="w-3.5 h-3.5 text-white" />
            ) : (
              <FiShoppingCart className="w-3.5 h-3.5 text-white" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
