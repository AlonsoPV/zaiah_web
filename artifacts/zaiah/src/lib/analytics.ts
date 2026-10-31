declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const META_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  if (GA_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
  }

  if (META_ID) {
    const n = function (...args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      (n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] }).callMethod
        ? (n as unknown as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
        : (n as unknown as { queue: unknown[] }).queue.push(args);
    } as unknown as ((...args: unknown[]) => void) & { queue: unknown[]; loaded: boolean; version: string };
    n.queue = [];
    n.loaded = true;
    n.version = "2.0";
    window.fbq = n;
    window._fbq = n;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    window.fbq("init", META_ID);
  }
}

export function trackPageView(path: string) {
  if (GA_ID && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: `${window.location.origin}${path}`,
      page_title: document.title,
    });
  }
  if (META_ID && window.fbq) {
    window.fbq("track", "PageView");
  }
}

export function trackWhatsAppClick(source: string) {
  if (GA_ID && window.gtag) {
    window.gtag("event", "whatsapp_click", { source });
  }
  if (META_ID && window.fbq) {
    window.fbq("trackCustom", "WhatsAppClick", { source });
  }
}

export function trackContactSubmit() {
  if (GA_ID && window.gtag) {
    window.gtag("event", "generate_lead", { method: "contact_form" });
  }
  if (META_ID && window.fbq) {
    window.fbq("track", "Lead");
  }
}
