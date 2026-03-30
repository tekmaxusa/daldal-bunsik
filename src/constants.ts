import { MenuItem, Location, MenuSectionKey } from './types';

export const MENU_SECTION_ORDER: {
  key: MenuSectionKey;
  title: string;
  description: string;
}[] = [
  {
    key: 'korean-soul-food',
    title: 'KOREAN SOUL FOOD',
    description:
      'Classic comforts that define the heart of Korean casual dining. Bold, spicy, and satisfying.',
  },
  {
    key: 'homestyle-soups',
    title: 'HOMESTYLE SOUPS',
    description:
      'Deeply nourishing broths that evoke memories of home-cooked meals in Seoul.',
  },
  {
    key: 'noodles-specialty',
    title: 'NOODLES & SPECIALTY',
    description:
      'Hand-crafted noodles and specialty dishes that showcase the diversity of Korean cuisine.',
  },
  {
    key: 'chefs-specials',
    title: "CHEF'S SPECIALS",
    description:
      'Limited runs and signature plates from our kitchen — order them while they last.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'jajangmyeon',
    displayTitle: 'Jajangmyeon',
    name: 'JAJANGMYEON',
    koreanName: '자장면',
    description:
      'Rich, savory black bean sauce over chewy wheat noodles, stir-fried with pork and crisp onions.',
    price: '$12.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: '/images/jajangmyeon.png',
    spicyLevel: 0,
  },
  {
    id: 'jjamppong',
    displayTitle: 'Jjamppong',
    name: 'JJAMPPONG',
    koreanName: '짬뽕',
    description:
      'Fire-kissed spicy seafood noodle soup packed with mussels, squid, shrimp, and aromatic vegetables.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: '/images/jjamppong.png',
    spicyLevel: 3,
  },
  {
    id: 'tangsuyuk',
    displayTitle: 'TangsuYuk',
    name: 'TANGSUYUK',
    koreanName: '탕수육',
    description:
      'Crispy deep-fried pork bites coated in a vibrant sweet and sour glaze with pineapple and peppers.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: '/images/tangsuyuk.png',
    spicyLevel: 0,
  },
  {
    id: 'donkatsu',
    displayTitle: 'Donkatsu',
    name: 'DONKATSU',
    koreanName: '돈까스',
    description:
      'Panko-breaded fried pork cutlet served with a thick savory reduction sauce and shredded cabbage.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: '/images/donkatsu.png',
    spicyLevel: 0,
  },
  {
    id: 'tteok-mandu-guk',
    displayTitle: 'Tteok Mandu Guk',
    name: 'TTEOK MANDU GUK',
    koreanName: '떡만두국',
    description:
      'Rice cake and dumpling soup in a clean, savory beef broth garnished with egg ribbons and nori.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'homestyle-soups',
    image: '/images/tteok-mandu-guk.png',
    spicyLevel: 0,
  },
  {
    id: 'mandu-guk',
    displayTitle: 'Mandu Guk',
    name: 'MANDU GUK',
    koreanName: '만두국',
    description:
      'Plump, handmade dumplings floating in a rich beef bone broth with seasonal vegetables.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'homestyle-soups',
    image: '/images/mandu-guk.png',
    spicyLevel: 0,
  },
  {
    id: 'mori-soba',
    displayTitle: 'Mori Soba',
    name: 'MORI SOBA',
    koreanName: '모리소바',
    description:
      'Chilled buckwheat noodles served with a refreshing soy-based dipping sauce, radish, and wasabi.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'noodles-specialty',
    image: '/images/mori-soba.png',
    spicyLevel: 0,
  },
  {
    id: 'mul-naengmyeon',
    displayTitle: 'Mul Naengmyeon',
    name: 'MUL NAENGMYEON',
    koreanName: '물냉면',
    description:
      'Cold buckwheat noodles in a tangy, icy beef broth topped with sliced pear and cucumber.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'noodles-specialty',
    image: '/images/mul-naengmyeon.png',
    spicyLevel: 0,
  },
  {
    id: 'jjolmyeon',
    displayTitle: 'Jjolmyeon',
    name: 'JJOLMYEON',
    koreanName: '쫄면',
    description:
      'Extra chewy noodles with a load of fresh vegetables and a punchy, sharp spicy-sweet sauce.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'noodles-specialty',
    image: '/images/jjolmyeon.png',
    spicyLevel: 2,
  },
  {
    id: 'chicken-rice-plate',
    displayTitle: 'Chicken Rice Plate',
    name: 'CHICKEN RICE PLATE',
    koreanName: '치킨 덮밥',
    description:
      'Marinated and chargrilled Korean-style chicken over a bed of fluffy white rice, served with seasonal side dishes and a light soup.',
    price: '$17.99',
    category: 'Main',
    menuSection: 'chefs-specials',
    image: '/images/chicken-rice-plate.png',
    spicyLevel: 1,
    limitedAvailability: true,
    orderSpecial: true,
  },
  {
    id: 'salmon-hwe-deopbap',
    displayTitle: 'Salmon Hwe-Deopbap',
    name: 'SALMON HWE-DEOPBAP',
    koreanName: '연어 회덮밥',
    description:
      'Premium sashimi-grade salmon over mixed greens and rice, ready to be mixed with our house-special spicy vinegared pepper sauce.',
    price: '$18.99',
    category: 'Main',
    menuSection: 'chefs-specials',
    image: '/images/salmon-deopbap-feature.png',
    spicyLevel: 2,
    signatureDish: true,
    orderSpecial: true,
  },
];

/** Carrollton flagship — used on Locations page and home teaser */
export const LOCATIONS: Location[] = [
  {
    id: 'carrollton',
    name: 'Daldal Bunsik — Carrollton',
    address: '1111 W Frankford Rd Ste 102, Carrollton, TX 75007',
    phone: '(972) XXX-XXXX',
    hours: 'MON - SAT: 11:00 AM - 9:00 PM · SUNDAY: CLOSED',
    hoursWeekdays: 'MON - SAT: 11:00 AM - 9:00 PM',
    hoursSunday: 'SUNDAY: CLOSED',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=1111+W+Frankford+Rd+Ste+102+Carrollton+TX+75007',
  },
];

export const STORE_SOCIAL = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
} as const;

export const STORE_MAP_LABEL = 'Frankford Rd · Carrollton';

/** Google Maps search embed (no API key). Replace with “Embed a map” iframe from Google Maps if needed. */
export const STORE_MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  '1111 W Frankford Rd Ste 102, Carrollton, TX 75007'
)}&z=17&hl=en&output=embed`;
