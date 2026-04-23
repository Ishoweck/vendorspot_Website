"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { FiCheck, FiX, FiAlertCircle, FiInfo } from "react-icons/fi";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  visible: boolean;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

const ICONS = {
  success: <FiCheck className="w-4 h-4" strokeWidth={2.5} />,
  error: <FiX className="w-4 h-4" strokeWidth={2.5} />,
  info: <FiInfo className="w-4 h-4" />,
  warning: <FiAlertCircle className="w-4 h-4" />,
};

const STYLES = {
  success: "bg-dark text-white border-green-500",
  error: "bg-dark text-white border-primary",
  info: "bg-dark text-white border-blue-400",
  warning: "bg-dark text-white border-yellow-400",
};

const ICON_BG = {
  success: "bg-green-500",
  error: "bg-primary",
  info: "bg-blue-400",
  warning: "bg-yellow-400",
};

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 shadow-lg min-w-[260px] max-w-[360px] transition-all duration-300 ease-out ${STYLES[item.type]} ${
        item.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white ${ICON_BG[item.type]}`}>
        {ICONS[item.type]}
      </span>
      <p className="flex-1 text-sm font-medium leading-snug">{item.message}</p>
      <button
        onClick={() => onDismiss(item.id)}
        className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 320);
  }, []);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type, visible: false }]);

    // Trigger enter animation on next tick
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: true } : t)));
      });
    });

    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container — bottom-right on desktop, bottom-center on mobile */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            <ToastItem item={item} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
