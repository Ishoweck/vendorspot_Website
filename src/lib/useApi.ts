"use client";

import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Extracts the main array/object from the API response's `data` field.
 * The backend wraps responses like: { success, data: { products: [...], total, page } }
 * This finds the first array value inside `data` and returns it.
 */
function extractData(responseData: unknown): unknown {
  if (Array.isArray(responseData)) return responseData;
  if (responseData && typeof responseData === "object") {
    const obj = responseData as Record<string, unknown>;
    // Find the first array property (e.g. products, categories, vendors)
    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) return value;
    }
  }
  return responseData;
}

export function useApi<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(endpoint !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (endpoint === null) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}${endpoint}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(extractData(json.data) as T);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
}
