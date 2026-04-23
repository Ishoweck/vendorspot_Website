"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const DELIVERY_FEE = 2500;
const LOCAL_KEY = "vendorspot_cart";

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug?: string;
}

export interface CartItem {
  _id: string;
  product: CartProduct;
  quantity: number;
  variant?: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
}

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  loading: boolean;
  addToCart: (productId: string, snapshot?: Partial<CartProduct>, quantity?: number, variant?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
}

const emptyCart: Cart = { items: [], subtotal: 0, deliveryFee: DELIVERY_FEE, discount: 0, total: DELIVERY_FEE };

const CartContext = createContext<CartContextValue>({
  cart: emptyCart,
  itemCount: 0,
  loading: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  applyCoupon: async () => ({ success: false, message: "" }),
});

function totals(items: CartItem[], discount = 0) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { subtotal, deliveryFee: DELIVERY_FEE, discount, total: subtotal + DELIVERY_FEE - discount };
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vendorspot_token");
}

function headers() {
  const token = getToken();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [loading, setLoading] = useState(false);

  const fetchBackend = useCallback(async () => {
    if (!getToken()) return;
    try {
      const res = await fetch(`${API_BASE}/cart`, { headers: headers() });
      const json = await res.json();
      if (json.success) {
        const c = json.data?.cart;
        const items: CartItem[] = c?.items || [];
        setCart({ items, couponCode: c?.couponCode, ...totals(items, c?.discount || 0) });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (getToken()) {
      fetchBackend();
    } else {
      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (raw) {
          const items: CartItem[] = JSON.parse(raw);
          setCart({ items, ...totals(items) });
        }
      } catch {}
    }
  }, [fetchBackend]);

  const addToCart = async (productId: string, snapshot?: Partial<CartProduct>, quantity = 1, variant?: string) => {
    setLoading(true);
    try {
      if (getToken()) {
        await fetch(`${API_BASE}/cart/add`, {
          method: "POST",
          headers: headers(),
          body: JSON.stringify({ productId, quantity, variant }),
        });
        await fetchBackend();
      } else {
        setCart((prev) => {
          const existing = prev.items.find((i) => i.product._id === productId && i.variant === variant);
          const newItems = existing
            ? prev.items.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i))
            : [
                ...prev.items,
                {
                  _id: `local_${Date.now()}`,
                  product: { _id: productId, name: snapshot?.name || "Product", price: snapshot?.price || 0, images: snapshot?.images || [], slug: snapshot?.slug },
                  quantity,
                  variant,
                  price: snapshot?.price || 0,
                },
              ];
          try { localStorage.setItem(LOCAL_KEY, JSON.stringify(newItems)); } catch {}
          return { ...prev, items: newItems, ...totals(newItems, prev.discount) };
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    try {
      if (getToken()) {
        await fetch(`${API_BASE}/cart/items/${itemId}`, { method: "DELETE", headers: headers() });
        await fetchBackend();
      } else {
        setCart((prev) => {
          const newItems = prev.items.filter((i) => i._id !== itemId);
          try { localStorage.setItem(LOCAL_KEY, JSON.stringify(newItems)); } catch {}
          return { ...prev, items: newItems, ...totals(newItems, prev.discount) };
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(itemId);
    setLoading(true);
    try {
      if (getToken()) {
        await fetch(`${API_BASE}/cart/items/${itemId}`, {
          method: "PUT",
          headers: headers(),
          body: JSON.stringify({ quantity }),
        });
        await fetchBackend();
      } else {
        setCart((prev) => {
          const newItems = prev.items.map((i) => (i._id === itemId ? { ...i, quantity } : i));
          try { localStorage.setItem(LOCAL_KEY, JSON.stringify(newItems)); } catch {}
          return { ...prev, items: newItems, ...totals(newItems, prev.discount) };
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      if (getToken()) await fetch(`${API_BASE}/cart`, { method: "DELETE", headers: headers() });
      try { localStorage.removeItem(LOCAL_KEY); } catch {}
      setCart(emptyCart);
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    if (!getToken()) return { success: false, message: "Please log in to apply coupons." };
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cart/coupon/apply`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ code }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchBackend();
        return { success: true, message: "Coupon applied!" };
      }
      return { success: false, message: json.message || "Invalid coupon code." };
    } catch {
      return { success: false, message: "Failed to apply coupon." };
    } finally {
      setLoading(false);
    }
  };

  const itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, itemCount, loading, addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
