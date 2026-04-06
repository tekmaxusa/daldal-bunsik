import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `public/` file URL — uses Vite `BASE_URL` (GitHub Pages project site = `/Repo-Name/`). */
/** `tel:` href for tap-to-call; placeholder numbers use +19720000000 until real digits are configured. */
export function phoneToTelHref(displayPhone: string): string {
  const trimmed = displayPhone.trim();
  if (!trimmed) return 'tel:';
  if (/XXX/i.test(trimmed)) return 'tel:+19720000000';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  return digits ? `tel:+${digits}` : 'tel:+19720000000';
}

export function publicUrl(path: string): string {
  const p = path.replace(/^\//, '');
  let base = import.meta.env.BASE_URL || '/';

  if (
    !import.meta.env.DEV &&
    base === '/' &&
    typeof window !== 'undefined' &&
    window.location.hostname.endsWith('github.io')
  ) {
    const seg = window.location.pathname.split('/').filter(Boolean)[0];
    if (seg) base = `/${seg}/`;
  }

  if (base !== '/' && !base.endsWith('/')) base += '/';
  return `${base}${p}`;
}
