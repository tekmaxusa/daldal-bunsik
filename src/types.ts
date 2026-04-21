export type MenuSectionKey =
  | 'korean-bbq'
  | 'kbbq-ramyun'
  | 'bibimbap'
  | 'soft-tofu-soup'
  | 'fried-rice'
  | 'sides'
  | 'korean-soul-food'
  | 'kimbap'
  | 'korean-noodles'
  | 'specials';

export interface MenuItem {
  id: string;
  /** Large uppercase title on the card (e.g. JAJANGMYEON) */
  name: string;
  koreanName: string;
  description: string;
  price: string;
  category: 'Main' | 'Sides' | 'Drinks' | 'Desserts';
  menuSection: MenuSectionKey;
  image: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  signatureDish?: boolean;
  orderSpecial?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  /** Single-line summary (e.g. for compact cards) */
  hours: string;
  mapUrl: string;
  /** Optional split lines for hours display */
  hoursWeekdays?: string;
  hoursSunday?: string;
  /** Mobile: days on first line, times on second (avoids one long wrapped line) */
  hoursWeekdaysMobileLines?: readonly [string, string];
}
