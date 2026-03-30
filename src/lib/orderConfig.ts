/**
 * Configure real ordering via .env (see .env.example).
 * Priority: WhatsApp message → optional external storefront URL.
 */

const onlineOrderUrl = (import.meta.env.VITE_ONLINE_ORDER_URL as string | undefined)?.trim();
const whatsappDigits = (import.meta.env.VITE_ORDER_WHATSAPP as string | undefined)?.replace(/\D/g, '') ?? '';

export function getOnlineOrderUrl(): string | undefined {
  return onlineOrderUrl || undefined;
}

export function hasWhatsAppOrdering(): boolean {
  return whatsappDigits.length >= 10;
}

export function buildWhatsAppOrderLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappDigits}?text=${encoded}`;
}

export function parseMenuPrice(price: string): number {
  const n = Number.parseFloat(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function formatUsd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
