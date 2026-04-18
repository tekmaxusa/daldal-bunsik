/** Set when ready: `VITE_ONLINE_ORDER_URL=https://…` — Order CTAs open in a new tab. Otherwise they stay inert. */
const raw = import.meta.env.VITE_ONLINE_ORDER_URL?.trim() ?? '';

export const ONLINE_ORDER_URL = raw;

export function hasExternalOrderUrl(): boolean {
  return /^https?:\/\//i.test(ONLINE_ORDER_URL);
}
