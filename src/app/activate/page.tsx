"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function ActivateContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Activation link is missing or invalid.");
      return;
    }

    const activate = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/activate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setStatus("success");
          setMessage(json.message || "Your account has been activated.");
        } else {
          setStatus("error");
          setMessage(json.message || "Activation failed. The link may have expired.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    activate();
  }, [token]);

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <div className="relative flex-shrink-0" style={{ height: "max(170px, 28.06vw)" }}>
        <img src="/auth_rec1.svg" alt="" className="absolute inset-0 w-full h-full object-fill block" aria-hidden="true" />
        <div className="absolute top-5 left-5 z-10">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/VLogo.svg" alt="Vendorspot" className="h-7 w-auto" />
          </Link>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark leading-tight">Account Activation</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md text-center"
        >
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 text-sm">Activating your account…</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark mb-2">Account Activated!</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{message}</p>
              </div>
              <Link
                href="/login"
                className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-full text-sm hover:bg-primary-dark transition-colors"
              >
                Log in to your account
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark mb-2">Activation Failed</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{message}</p>
              </div>
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="inline-block w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:bg-primary-dark transition-colors"
                >
                  Back to Login
                </Link>
                <p className="text-xs text-gray-400">
                  Need help?{" "}
                  <a href="mailto:support@vendorspot.com" className="text-primary hover:underline">
                    Contact support
                  </a>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex-shrink-0">
        <img src="/auth_rec2.svg" alt="" className="w-full block" />
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ActivateContent />
    </Suspense>
  );
}
