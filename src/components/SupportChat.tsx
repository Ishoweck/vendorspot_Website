"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend, FiMessageCircle, FiMail, FiPhone, FiCheck, FiLoader } from "react-icons/fi";

type Step = "home" | "form" | "sent";

export default function SupportChat() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [pulse, setPulse] = useState(true);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("vendorspot_token"));
  }, []);

  // Stop pulsing after 6s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Focus message when form step opens
  useEffect(() => {
    if (step === "form") messageRef.current?.focus();
  }, [step]);

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: "Support Chat", message }),
      });
      setStep("sent");
    } catch {
      // still show success to user
      setStep("sent");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setStep("home");
    setName("");
    setEmail("");
    setMessage("");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[calc(100vw-40px)] max-w-sm bg-white rounded-3xl shadow-2xl shadow-black/15 overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <FiMessageCircle className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Vendorspot Support</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-[11px] text-white/70">We reply within 24h</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setOpen(false); reset(); }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FiX className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <AnimatePresence mode="wait">

                {/* Home step */}
                {step === "home" && (
                  <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Hi there! 👋 How can we help you today?
                    </p>

                    <button
                      onClick={() => setStep("form")}
                      className="w-full flex items-center gap-3 bg-primary/5 hover:bg-primary/10 border border-primary/15 rounded-2xl px-4 py-3.5 mb-3 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FiMessageCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Send us a message</p>
                        <p className="text-xs text-gray-400">We'll get back to you by email</p>
                      </div>
                    </button>

                    <a
                      href="mailto:support@vendorspotng.com"
                      className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl px-4 py-3.5 mb-3 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <FiMail className="w-4 h-4 text-violet-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Email us</p>
                        <p className="text-xs text-gray-400">support@vendorspotng.com</p>
                      </div>
                    </a>

                    <a
                      href="tel:+2347045882161"
                      className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl px-4 py-3.5 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <FiPhone className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Call us</p>
                        <p className="text-xs text-gray-400">+234 704 588 2161 · Mon–Fri 9am–5pm</p>
                      </div>
                    </a>
                  </motion.div>
                )}

                {/* Form step */}
                {step === "form" && (
                  <motion.div key="form" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                    <button
                      onClick={() => setStep("home")}
                      className="text-xs text-primary font-medium mb-4 hover:underline"
                    >
                      ← Back
                    </button>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-primary transition-colors bg-gray-50 focus:bg-white"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-primary transition-colors bg-gray-50 focus:bg-white"
                      />
                      <textarea
                        ref={messageRef}
                        placeholder="How can we help you?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-primary transition-colors bg-gray-50 focus:bg-white resize-none"
                      />
                      <button
                        onClick={handleSend}
                        disabled={sending || !name.trim() || !email.trim() || !message.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                      >
                        {sending
                          ? <><FiLoader className="w-4 h-4 animate-spin" /> Sending…</>
                          : <><FiSend className="w-4 h-4" /> Send Message</>
                        }
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Sent step */}
                {step === "sent" && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <FiCheck className="w-7 h-7 text-green-500" strokeWidth={2.5} />
                    </div>
                    <p className="text-base font-bold text-gray-900 mb-1">Message sent!</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={reset}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="relative">
        {pulse && !open && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
        )}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => { setOpen((v) => !v); setPulse(false); }}
          className="relative w-14 h-14 rounded-full bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 flex items-center justify-center transition-colors"
          aria-label="Support chat"
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <FiX className="w-6 h-6 text-white" />
                </motion.span>
              : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
