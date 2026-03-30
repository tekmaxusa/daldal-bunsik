/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ONLINE_ORDER_URL?: string;
  /** WhatsApp number with country code, digits only (e.g. 19725551234 for US +1 972-555-1234) */
  readonly VITE_ORDER_WHATSAPP?: string;
  /** Google Apps Script web‐app URL for order emails (deploy “Anyone”) — see google-apps-script-order.example.js */
  readonly VITE_GOOGLE_SCRIPT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
