// ─── App store config (from vspotApp/app.json) ──────────────────────────────
// Android package:  com.vendorspot.app
// iOS bundle ID:    com.vendorspotng.vendorspot
// URL scheme:       vendorspot://   (registered in app.json "scheme")
// Universal Links:  applinks:vendorspot.com  (iOS associated domains)
//
// TODO: replace APP_STORE_URL numeric ID once the app is published on App Store
export const APP_STORE_URL    = "https://apps.apple.com/app/vendorspot/id000000000"; // replace numeric id after App Store submission
export const PLAY_STORE_URL   = "https://play.google.com/store/apps/details?id=com.vendorspot.app";
export const ANDROID_PACKAGE  = "com.vendorspot.app";
export const IOS_BUNDLE_ID    = "com.vendorspotng.vendorspot";

// Universal Link (opens app on iOS if installed, falls back to website which can redirect to store)
export const IOS_UNIVERSAL_LINK = "https://vendorspot.com/vendor-signup";
// Custom scheme deep link (works on both platforms; Android Intent URL used for Android for reliable fallback)
export const APP_DEEP_LINK    = "vendorspot://vendor-signup";
// ────────────────────────────────────────────────────────────────────────────

export type OS = "ios" | "android" | "desktop";

export function detectOS(): OS {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

/**
 * On mobile: tries to open the installed app via deep link.
 * If the app is not installed, the browser stays on the page and we
 * redirect to the appropriate store after a short timeout.
 * On desktop: opens the store URL directly in a new tab.
 */
export function openAppOrStore(os: OS = detectOS()) {
  if (os === "ios") {
    // Universal Link: iOS opens the app if installed (via associated domain applinks:vendorspot.com),
    // otherwise the website can handle the redirect to the App Store.
    // Falls back to App Store URL after 1.4s in case Universal Links aren't set up yet.
    window.location.href = IOS_UNIVERSAL_LINK;
    const t = setTimeout(() => {
      window.location.href = APP_STORE_URL;
    }, 1400);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimeout(t);
    }, { once: true });

  } else if (os === "android") {
    // Android Intent URL: opens app if installed (package com.vendorspot.app),
    // automatically falls back to Play Store if not installed.
    const fallback = encodeURIComponent(PLAY_STORE_URL);
    window.location.href =
      `intent://vendor-signup#Intent;scheme=vendorspot;package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;

  } else {
    // Desktop — open Play Store in a new tab
    window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
  }
}

export function storeUrlForOS(os: OS): string {
  if (os === "ios") return APP_STORE_URL;
  return PLAY_STORE_URL;
}
