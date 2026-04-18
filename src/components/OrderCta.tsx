import type { ReactNode } from 'react';
import { hasExternalOrderUrl, ONLINE_ORDER_URL } from '../lib/siteConfig';

type Props = {
  className?: string;
  children: ReactNode;
};

/** Order / cart style CTA: external URL when configured, otherwise a non-navigating button. */
export default function OrderCta({ className, children }: Props) {
  if (hasExternalOrderUrl()) {
    return (
      <a
        href={ONLINE_ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}
