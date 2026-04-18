/**
 * POST order to Google Apps Script web app (same pattern as changehair-beauty).
 * Reference: https://github.com/tekmaxusa/changehair-beauty (URLSearchParams + mode: 'no-cors')
 */

const GOOGLE_SCRIPT_URL = (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined)?.trim() ?? '';

export function getGoogleOrderScriptUrl(): string {
  return GOOGLE_SCRIPT_URL;
}

export function isOrderEmailConfigured(): boolean {
  return GOOGLE_SCRIPT_URL.length > 0;
}

export type OrderEmailPayload = {
  name: string;
  email: string;
  phone: string;
  fulfillment: string;
  address: string;
  scheduleDate: string;
  scheduleTime: string;
  subtotal: string;
  notes: string;
  orderDetails: string;
};

/** Throws if URL missing. Uses no-cors like reference project (opaque response). */
export async function submitOrderEmail(payload: OrderEmailPayload): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('Email ordering is not configured.');
  }

  const body = new URLSearchParams({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    fulfillment: payload.fulfillment,
    address: payload.address,
    date: payload.scheduleDate,
    time: payload.scheduleTime,
    subtotal: payload.subtotal,
    notes: payload.notes,
    orderDetails: payload.orderDetails,
  }).toString();

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
}
