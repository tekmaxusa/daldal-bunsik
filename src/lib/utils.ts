import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `public/` file URL — includes Vite `base` (needed on GitHub Pages `/Repo-Name/`). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const p = path.replace(/^\//, '');
  return `${base}${p}`;
}
