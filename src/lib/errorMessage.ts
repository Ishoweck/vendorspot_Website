const TECHNICAL = [
  /unexpected token/i,
  /is not valid json/i,
  /json/i,
  /failed to fetch/i,
  /network.*error/i,
  /networkerror/i,
  /fetch failed/i,
  /econnrefused/i,
  /etimedout/i,
  /aborterror/i,
  /api error:\s*\d+/i,
  /^error:\s/i,
];

/**
 * Returns a user-friendly error message.
 * Technical strings (JSON parse errors, network errors, status codes) are replaced
 * with the provided fallback so users never see raw exception text.
 */
export function friendlyError(
  err: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  const msg =
    err instanceof Error
      ? err.message
      : typeof err === "string"
      ? err
      : "";

  if (!msg.trim()) return fallback;
  if (TECHNICAL.some((p) => p.test(msg))) return fallback;
  return msg;
}
