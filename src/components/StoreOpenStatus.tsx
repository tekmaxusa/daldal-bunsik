import React from 'react';
import { isCarrolltonStoreOpen } from '../lib/storeHours';

/** Reflects Carrollton hours in Central Time — avoids a static “Open now” when closed. */
export default function StoreOpenStatus({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const open = isCarrolltonStoreOpen();
  const tone =
    variant === 'light'
      ? open
        ? 'bg-white/15 text-emerald-200'
        : 'bg-white/10 text-white/75'
      : open
        ? 'bg-emerald-500/15 text-emerald-800'
        : 'bg-gray-500/10 text-gray-600';

  return (
    <p
      className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-nunito font-bold uppercase tracking-wide ${tone} ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      {open ? 'Open now' : 'Closed now'}
    </p>
  );
}
