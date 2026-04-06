import type { MenuItem, Location } from './types';
import { MENU_ITEMS, MENU_SECTION_ORDER } from './menuCatalog';

export { MENU_ITEMS, MENU_SECTION_ORDER };

/** Home featured row — highlights from the printed menu */
export const FEATURED_HOME_MENU_IDS = ['jajangmyeon', 'jjamppong', 'chicken-rice-plate'] as const;

export function menuItemsByIds(ids: readonly string[]): MenuItem[] {
  return ids.map((id) => MENU_ITEMS.find((i) => i.id === id)).filter((x): x is MenuItem => x != null);
}

export const STORE_MAP_LABEL = 'Frankford Rd · Carrollton';

const STORE_ADDRESS_QUERY = '1111 W Frankford Rd Ste 102, Carrollton, TX 75007';

/** Fallback when no verified listing URL is configured — generic address pin */
const MAPS_FALLBACK_OPEN_URL =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(STORE_ADDRESS_QUERY);

/**
 * Link for “Open in Google Maps” / GET DIRECTIONS — should open the **business listing**, not only an address search.
 * Set `VITE_GOOGLE_MAPS_PLACE_URL` (Share link from Maps) or `VITE_GOOGLE_MAPS_PLACE_ID` in `.env`.
 */
export function storeGoogleMapsPlaceUrl(): string {
  const full = import.meta.env.VITE_GOOGLE_MAPS_PLACE_URL?.trim();
  if (full && /^https?:\/\//i.test(full)) return full;
  const placeId = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID?.trim();
  if (placeId && /^[A-Za-z0-9_-]+$/.test(placeId)) {
    return (
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Daldal Bunsik') +
      '&query_place_id=' +
      encodeURIComponent(placeId)
    );
  }
  return MAPS_FALLBACK_OPEN_URL;
}

/** Google Maps iframe — use embed src from your verified listing when possible */
export function storeGoogleMapsEmbedSrc(): string {
  const embed = import.meta.env.VITE_GOOGLE_MAPS_EMBED_SRC?.trim();
  if (embed && /^https?:\/\//i.test(embed)) return embed;
  return `https://maps.google.com/maps?q=${encodeURIComponent(STORE_ADDRESS_QUERY)}&z=17&hl=en&output=embed`;
}

export const STORE_GOOGLE_MAPS_PLACE_URL = storeGoogleMapsPlaceUrl();
export const STORE_MAP_EMBED_URL = storeGoogleMapsEmbedSrc();

/** Carrollton flagship — used on Locations page and home teaser */
export const LOCATIONS: Location[] = [
  {
    id: 'carrollton',
    name: 'Daldal Bunsik — Carrollton',
    address: '1111 W Frankford Rd Ste 102, Carrollton, TX 75007',
    phone: '(972) XXX-XXXX',
    hours: 'MON, TUE, THU–SAT: 11:00 AM – 9:00 PM CST · WED & SUN: CLOSED',
    hoursWeekdays: 'MON, TUE, THU–SAT: 11:00 AM – 9:00 PM CST',
    hoursSunday: 'WED & SUN: CLOSED',
    mapUrl: STORE_GOOGLE_MAPS_PLACE_URL,
  },
];

export const STORE_SOCIAL = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
} as const;
