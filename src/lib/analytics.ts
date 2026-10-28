declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends a GA4 event; silently does nothing when GA isn't loaded (no ID, blocked, dev).
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

// Classifies a link into a contact event name, or null when it isn't a contact link.
export function contactEventFor(href: string): string | null {
  if (href.startsWith("tel:")) return "contact_phone";
  if (href.startsWith("mailto:")) return "contact_email";
  if (/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//.test(href)) return "contact_telegram";
  return null;
}
