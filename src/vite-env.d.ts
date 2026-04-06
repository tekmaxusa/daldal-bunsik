/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ONLINE_ORDER_URL?: string;
  /** WhatsApp number with country code, digits only (e.g. 19725551234 for US +1 972-555-1234) */
  readonly VITE_ORDER_WHATSAPP?: string;
  /** Google Apps Script web‐app URL for order emails (deploy “Anyone”) — see google-apps-script-order.example.js */
  readonly VITE_GOOGLE_SCRIPT_URL?: string;
  /**
   * Full “Share” URL from your Google Business Profile / Google Maps listing (opens the business page, not a bare pin).
   * Example: https://maps.app.goo.gl/xxxx or https://www.google.com/maps?cid=...
   */
  readonly VITE_GOOGLE_MAPS_PLACE_URL?: string;
  /** If you only have a Place ID (ChIJ…), used when VITE_GOOGLE_MAPS_PLACE_URL is unset */
  readonly VITE_GOOGLE_MAPS_PLACE_ID?: string;
  /**
   * iframe src from Google Maps → your listing → Share → Embed a map (long embed URL with pb=…).
   * When set, the site map widget shows the same listing as “Open in Google Maps”.
   */
  readonly VITE_GOOGLE_MAPS_EMBED_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
