import React from 'react';
import { STORE_MAP_EMBED_URL } from '../constants';

type StoreMapEmbedProps = {
  className?: string;
  /** Minimum height for the map frame (Tailwind classes or CSS length) */
  minHeightClass?: string;
};

/**
 * Google Maps iframe for the Carrollton store address.
 */
export default function StoreMapEmbed({ className = '', minHeightClass = 'min-h-[280px]' }: StoreMapEmbedProps) {
  return (
    <iframe
      title="Daldal Bunsik — 1111 W Frankford Rd Ste 102, Carrollton, TX"
      src={STORE_MAP_EMBED_URL}
      className={`block w-full border-0 ${minHeightClass} ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
