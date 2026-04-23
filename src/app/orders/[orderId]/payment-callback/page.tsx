"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { FiLoader, FiCheck, FiAlertCircle } from "react-icons/fi";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vendorspot_token");
}

export default function PaymentCallbackPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const reference = (params.orderId as string) || searchParams.get("reference") || searchParams.get("trxref") || "";

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("Confirming your payment...");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setMessage("Invalid payment reference. Please contact support.");
      return;
    }

    const confirm = async () => {
      const token = getToken();
      if (!token) {
        setStatus("failed");
        setMessage("Session expired. Please log in and check your orders.");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/orders/confirm-payment/${reference}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ provider: "paystack" }),
        });

        const json = await res.json();

        if (json.success) {
          await clearCart();
          // Prefer orderNumber (payment reference) — getOrder supports both _id and orderNumber
          const id = json.data?.order?.orderNumber || json.data?.order?._id || reference;
          setOrderId(id);
          setStatus("success");
          setMessage("Payment confirmed! Your order has been placed.");
          setTimeout(() => {
            router.push(`/orders/${id}?confirmed=true`);
          }, 2500);
        } else {
          setStatus("failed");
          setMessage(json.message || "Could not confirm your payment. Please contact support.");
        }
      } catch {
        setStatus("failed");
        setMessage("Something went wrong while confirming your payment. Please check your orders or contact support.");
      }
    };

    confirm();
  }, [reference]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <FiLoader className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h1 className="text-xl font-bold text-dark mb-2">Processing Payment</h1>
              <p className="text-sm text-gray-500">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <FiCheck className="w-8 h-8 text-green-500" strokeWidth={3} />
              </div>
              <h1 className="text-xl font-bold text-dark mb-2">Payment Successful!</h1>
              <p className="text-sm text-gray-500 mb-6">{message}</p>
              <p className="text-xs text-gray-400">Redirecting you to your order...</p>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <FiAlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-xl font-bold text-dark mb-2">Payment Issue</h1>
              <p className="text-sm text-gray-500 mb-6">{message}</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => router.push(`/orders/${reference}`)}
                  className="w-full bg-primary text-white text-sm font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors"
                >
                  View My Order
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full border border-gray-200 text-sm text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
