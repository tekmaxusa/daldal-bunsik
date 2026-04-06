import type { MenuItem, MenuSectionKey } from './types';
import { publicUrl } from './lib/utils';

const JAJANG = publicUrl('images/jajangmyeon.png');
const JJAMPONG_IMG = publicUrl('images/jjamppong.png');
const TANGSUYUK_IMG = publicUrl('images/tangsuyuk.png');
const DONKATSU_IMG = publicUrl('images/donkatsu.png');
const TTEOK_MANDU_IMG = publicUrl('images/tteok-mandu-guk.png');
const MANDU_GUK_IMG = publicUrl('images/mandu-guk.png');
const MORI_SOBA_IMG = publicUrl('images/mori-soba.png');
const MUL_NAENGMYEON_IMG = publicUrl('images/mul-naengmyeon.png');
const JJOLMYEON_IMG = publicUrl('images/jjolmyeon.png');
const CHICKEN_RICE_IMG = publicUrl('images/chicken-rice-plate.png');
const SALMON_HWE_IMG = publicUrl('images/salmon-hwe-deopbap.png');

export type MenuSectionMeta = {
  key: MenuSectionKey;
  title: string;
  description: string;
};

export const MENU_SECTION_ORDER: MenuSectionMeta[] = [
  {
    key: 'korean-soul-food',
    title: 'KOREAN SOUL FOOD',
    description:
      'Classic comforts that define the heart of Korean casual dining. Bold, spicy, and satisfying.',
  },
  {
    key: 'homestyle-soups',
    title: 'HOMESTYLE SOUPS',
    description: 'Deeply nourishing broths that evoke memories of home-cooked meals in Seoul.',
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
    description: 'Limited runs and signature plates from our kitchen — order them while they last.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // —— KOREAN SOUL FOOD ——
  {
    id: 'jajangmyeon',
    name: 'JAJANGMYEON',
    koreanName: '자장면',
    description:
      'Rich, savory black bean sauce over chewy wheat noodles, stir-fried with pork and crisp onions.',
    price: '$12.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: JAJANG,
  },
  {
    id: 'jjamppong',
    name: 'JJAMPPONG',
    koreanName: '짬뽕',
    description:
      'Fire-kissed spicy seafood noodle soup packed with mussels, squid, shrimp, and aromatic vegetables.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: JJAMPONG_IMG,
    spicyLevel: 2,
  },
  {
    id: 'tangsuyuk',
    name: 'TANGSUYUK',
    koreanName: '탕수육',
    description:
      'Crispy deep-fried pork bites coated in a vibrant sweet and sour glaze with pineapple and peppers.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: TANGSUYUK_IMG,
  },
  {
    id: 'donkatsu',
    name: 'DONKATSU',
    koreanName: '돈까스',
    description:
      'Panko-breaded fried pork cutlet served with a thick savory reduction sauce and shredded cabbage.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: DONKATSU_IMG,
  },

  // —— HOMESTYLE SOUPS ——
  {
    id: 'tteok-mandu-guk',
    name: 'TTEOK MANDU GUK',
    koreanName: '떡만두국',
    description:
      'Rice cake and dumpling soup in a clean, savory beef broth garnished with egg ribbons and nori.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'homestyle-soups',
    image: TTEOK_MANDU_IMG,
  },
  {
    id: 'mandu-guk',
    name: 'MANDU GUK',
    koreanName: '만두국',
    description: 'Plump, handmade dumplings floating in a rich beef bone broth with seasonal vegetables.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'homestyle-soups',
    image: MANDU_GUK_IMG,
  },

  // —— NOODLES & SPECIALTY ——
  {
    id: 'mori-soba',
    name: 'MORI SOBA',
    koreanName: '모리소바',
    description:
      'Chilled buckwheat noodles served with a refreshing soy-based dipping sauce, radish, and wasabi.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'noodles-specialty',
    image: MORI_SOBA_IMG,
  },
  {
    id: 'mul-naengmyeon',
    name: 'MUL NAENGMYEON',
    koreanName: '물냉면',
    description: 'Cold buckwheat noodles in a tangy, icy beef broth topped with sliced pear and cucumber.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'noodles-specialty',
    image: MUL_NAENGMYEON_IMG,
  },
  {
    id: 'jjolmyeon',
    name: 'JJOLMYEON',
    koreanName: '쫄면',
    description: 'Extra chewy noodles with a load of fresh vegetables and a punchy, sharp spicy-sweet sauce.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'noodles-specialty',
    image: JJOLMYEON_IMG,
    spicyLevel: 2,
  },

  // —— CHEF'S SPECIALS ——
  {
    id: 'chicken-rice-plate',
    name: 'CHICKEN RICE PLATE',
    koreanName: '치킨 덮밥',
    description:
      'Marinated and chargrilled Korean-style chicken over a bed of fluffy white rice, served with seasonal side dishes and a light soup.',
    price: '$17.99',
    category: 'Main',
    menuSection: 'chefs-specials',
    image: CHICKEN_RICE_IMG,
    limitedAvailability: true,
    orderSpecial: true,
  },
  {
    id: 'salmon-hwe-deopbap',
    name: 'SALMON HWE-DEOPBAP',
    koreanName: '연어 회덮밥',
    description:
      'Premium sashimi-grade salmon over mixed greens and rice, ready to be mixed with our house-special spicy vinegared pepper sauce.',
    price: '$18.99',
    category: 'Main',
    menuSection: 'chefs-specials',
    image: SALMON_HWE_IMG,
    signatureDish: true,
    orderSpecial: true,
  },
];
