"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { fadeUp, stagger } from "@/lib/motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function AnimateError({ msg, type = "error" }: { msg: string; type?: "error" | "success" }) {
  if (!msg) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className={`text-sm rounded-xl px-4 py-3 ${
        type === "success"
          ? "bg-green-50 border border-green-100 text-green-700"
          : "bg-red-50 border border-red-100 text-red-600"
      }`}
    >
      {msg}
    </motion.div>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (i: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = char;
    setDigits(next);
    if (char && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
    if (next.every((d) => d) && char) handleVerify(next.join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((c, idx) => { next[idx] = c; });
    setDigits(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
    if (pasted.length === OTP_LENGTH) handleVerify(pasted);
  };

  const handleVerify = async (otp: string) => {
    setError(""); setSuccess("");
    if (!email) { setError("Email not found. Please sign up again."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) { setError(json.message || "Invalid or expired code."); return; }
      setSuccess("Email verified! Redirecting…");
      setTimeout(() => router.push("/login"), 1400);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;
    setResending(true); setError(""); setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) { setError(json.message || "Failed to resend code."); return; }
      setSuccess("A new code was sent to your email.");
      setCooldown(RESEND_COOLDOWN);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch {
      setError("Failed to resend. Try again.");
    } finally {
      setResending(false);
    }
  };

  const otp = digits.join("");

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">

      {/* Header */}
      <div className="relative bg-primary flex-shrink-0" style={{ minHeight: 220 }}>
        <div className="absolute top-5 left-5 z-10">
          <Link href="/" className="text-sm font-bold border-2 border-white text-white rounded-full px-4 py-1.5 hover:bg-white/10 transition-colors">
            Vendorspot
          </Link>
        </div>
        <Link href="/signup" className="absolute top-5 right-5 z-10 text-white text-sm font-medium hover:opacity-80 transition-opacity">
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-end h-full px-6 pb-10 pt-16 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3">
            <FiMail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Check your inbox</h1>
          <p className="text-white/70 text-sm mt-2 max-w-xs">
            We sent a 6-digit code to{" "}
            <span className="text-white font-medium">{email || "your email"}</span>
          </p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
      </div>

      {/* Body */}
      <motion.div
        variants={stagger} initial="hidden" animate="visible"
        className="flex-1 bg-white px-5 sm:px-6 pt-6 pb-10 max-w-md w-full mx-auto"
      >
        <AnimateError msg={error} />
        <AnimateError msg={success} type="success" />

        {/* OTP boxes */}
        <motion.div variants={fadeUp} className="flex justify-center gap-2 sm:gap-3 mt-4 mb-6">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className={`w-11 h-14 sm:w-13 sm:h-16 text-center text-xl font-bold rounded-xl border-2 bg-gray-50 outline-none transition-all ${
                d
                  ? "border-primary text-primary bg-primary/5"
                  : "border-gray-200 text-dark focus:border-primary focus:bg-white"
              }`}
            />
          ))}
        </motion.div>

        <motion.button
          variants={fadeUp}
          type="button"
          disabled={loading || otp.length < OTP_LENGTH}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleVerify(otp)}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full text-sm transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying…" : "Verify Email"}
        </motion.button>

        <motion.div variants={fadeUp} className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive a code?{" "}
            {cooldown > 0 ? (
              <span className="text-gray-400">Resend in {cooldown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-primary font-semibold hover:underline disabled:opacity-60"
              >
                {resending ? "Sending…" : "Resend code"}
              </button>
            )}
          </p>
        </motion.div>

        <motion.p variants={fadeUp} className="text-center text-sm text-gray-500 mt-4">
          Wrong email?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">Go back</Link>
        </motion.p>
      </motion.div>

      <div className="flex-shrink-0">
        <svg viewBox="0 0 375 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 80 C 90 0, 285 0, 375 80 L375 80 L0 80 Z" fill="#1a1a1a"/>
        </svg>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
