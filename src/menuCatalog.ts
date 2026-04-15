import type { MenuItem, MenuSectionKey } from './types';
import { publicUrl } from './lib/utils';

const CHICKEN_RICE = publicUrl('images/chicken-rice-plate.png');
const JAJANG = publicUrl('images/jajangmyeon.png');
const JJAMPONG_IMG = publicUrl('images/jjamppong.png');
const TANGSUYUK_IMG = publicUrl('images/tangsuyuk.png');
const DONKATSU_IMG = publicUrl('images/donkatsu.png');
const TTEOK_MANDU_IMG = publicUrl('images/tteok-mandu-guk.png');
const MANDU_GUK_IMG = publicUrl('images/mandu-guk.png');
const MORI_SOBA_IMG = publicUrl('images/mori-soba.png');
const MUL_NAENGMYEON_IMG = publicUrl('images/mul-naengmyeon.png');
const JJOLMYEON_IMG = publicUrl('images/jjolmyeon.png');
const SALMON_HWE_IMG = publicUrl('images/salmon-hwe-deopbap.png');

export type MenuSectionMeta = {
  key: MenuSectionKey;
  title: string;
  /** Compact label for sticky category nav (full `title` still used on section headers). */
  navLabel?: string;
  description: string;
};

export const MENU_SECTION_ORDER: MenuSectionMeta[] = [
  {
    key: 'korean-bbq',
    title: 'KOREAN BBQ',
    navLabel: 'KOREAN BBQ',
    description: 'Marinated meats grilled to order — sizzling, savory, and full of Korean barbecue flavor.',
  },
  {
    key: 'kbbq-ramyun',
    title: 'K-BBQ TOPPED RAMYUN',
    navLabel: 'K-BBQ RAMYUN',
    description: 'Korean ramyun bowls finished with K-BBQ toppings — hearty noodles with bold protein.',
  },
  {
    key: 'bibimbap',
    title: 'BIBIMBAP',
    navLabel: 'BIBIMBAP',
    description: 'Rice bowls with fresh vegetables, egg, and gochujang — mix it all together for the full experience.',
  },
  {
    key: 'soft-tofu-soup',
    title: 'SOFT TOFU SOUP (순두부)',
    navLabel: 'SOFT TOFU',
    description: 'Silky sundubu in a bubbling, spicy-savory broth — comforting and deeply satisfying.',
  },
  {
    key: 'fried-rice',
    title: 'FRIED RICE',
    navLabel: 'FRIED RICE',
    description: 'Wok-fired rice with classic Korean flavors.',
  },
  {
    key: 'sides',
    title: 'SIDES',
    navLabel: 'SIDES',
    description: 'Crispy bites to share or add to your meal.',
  },
  {
    key: 'korean-soul-food',
    title: 'KOREAN SOUL FOOD',
    navLabel: 'SOUL FOOD',
    description: 'Classic comforts that define the heart of Korean casual dining — bold, spicy, and satisfying.',
  },
  {
    key: 'kimbap',
    title: 'KIMBAP 김밥',
    navLabel: 'KIMBAP',
    description: 'Korean seaweed rice rolls — portable, colorful, and packed with fillings.',
  },
  {
    key: 'korean-noodles',
    title: 'KOREAN NOODLES',
    navLabel: 'NOODLES',
    description: 'Chewy noodles and icy cold bowls — from spicy-mixed to clean broth classics.',
  },
  {
    key: 'specials',
    title: 'SPECIALS',
    navLabel: 'SPECIALS',
    description: 'Signature plates and limited favorites from our kitchen.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // —— KOREAN BBQ ——
  {
    id: 'bulgogi-bbq',
    name: 'BULGOGI — MARINATED BEEF BBQ',
    koreanName: '불고기',
    description: 'Sizzling marinated beef with vegetables.',
    price: '$20.99',
    category: 'Main',
    menuSection: 'korean-bbq',
    image: CHICKEN_RICE,
  },
  {
    id: 'jeyuk-bokkeum',
    name: 'JEYUK BOKKEUM — SPICY PORK BBQ',
    koreanName: '제육볶음',
    description: 'Spicy stir-fried pork with bold flavor.',
    price: '$18.99',
    category: 'Main',
    menuSection: 'korean-bbq',
    image: JJAMPONG_IMG,
    spicyLevel: 2,
  },
  {
    id: 'la-galbi',
    name: 'LA GALBI — KOREAN SHORT RIBS',
    koreanName: 'LA 갈비',
    description: 'Grilled marinated beef short ribs.',
    price: '$30.99',
    category: 'Main',
    menuSection: 'korean-bbq',
    image: TANGSUYUK_IMG,
  },

  // —— K-BBQ TOPPED RAMYUN ——
  {
    id: 'bulgogi-ramyun',
    name: 'BULGOGI RAMYUN',
    koreanName: '불고기 라면',
    description: 'Korean ramyun topped with marinated beef.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'kbbq-ramyun',
    image: JJAMPONG_IMG,
  },
  {
    id: 'spicy-pork-ramyun',
    name: 'SPICY PORK RAMYUN',
    koreanName: '제육 라면',
    description: 'Ramyun with spicy stir-fried pork.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'kbbq-ramyun',
    image: JJAMPONG_IMG,
    spicyLevel: 2,
  },
  {
    id: 'chicken-ramyun',
    name: 'CHICKEN RAMYUN',
    koreanName: '치킨 라면',
    description: 'Ramyun topped with fried chicken.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'kbbq-ramyun',
    image: CHICKEN_RICE,
  },
  {
    id: 'ramyun-classic',
    name: 'RAMYUN — KOREAN RAMEN',
    koreanName: '라면',
    description: 'Classic Korean instant noodle soup.',
    price: '$10.99',
    category: 'Main',
    menuSection: 'kbbq-ramyun',
    image: MORI_SOBA_IMG,
  },

  // —— BIBIMBAP ——
  {
    id: 'bulgogi-bibimbap',
    name: 'BULGOGI BIBIMBAP',
    koreanName: '불고기 비빔밥',
    description:
      'Sweet soy-marinated beef over rice with vegetables, egg, and chili paste, mixed for a rich Korean classic.',
    price: '$17.99',
    category: 'Main',
    menuSection: 'bibimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'spicy-pork-bibimbap',
    name: 'SPICY PORK BIBIMBAP',
    koreanName: '제육 비빔밥',
    description:
      'Spicy stir-fried pork over rice with fresh vegetables, egg, and chili paste for a bold Korean favorite.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'bibimbap',
    image: JJAMPONG_IMG,
    spicyLevel: 2,
  },
  {
    id: 'chicken-bibimbap',
    name: 'CHICKEN BIBIMBAP',
    koreanName: '치킨 비빔밥',
    description:
      'Savory grilled chicken over rice with fresh vegetables, egg, and chili paste, mixed for a comforting Korean classic.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'bibimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'tofu-bibimbap',
    name: 'TOFU BIBIMBAP (FRIED TOFU)',
    koreanName: '두부 비빔밥',
    description:
      'Crispy fried tofu over rice with fresh vegetables, egg, and chili paste for a flavorful vegetarian option.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'bibimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'vegetable-bibimbap',
    name: 'VEGETABLE BIBIMBAP',
    koreanName: '야채 비빔밥',
    description:
      'Assorted fresh vegetables over rice with egg and chili paste, mixed for a light and wholesome Korean classic.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'bibimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'add-stone-bowl',
    name: 'ADD STONE BOWL',
    koreanName: '돌솥 추가',
    description: 'Upgrade to a hot stone bowl for a sizzling bibimbap with crispy rice and enhanced flavor.',
    price: '$1.00',
    category: 'Sides',
    menuSection: 'bibimbap',
    image: CHICKEN_RICE,
  },

  // —— SOFT TOFU SOUP ——
  {
    id: 'beef-sundubu',
    name: 'BEEF SOFT TOFU SOUP',
    koreanName: '소고기 순두부',
    description: 'Silky soft tofu soup with tender beef, vegetables, and a rich, spicy broth.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'soft-tofu-soup',
    image: MANDU_GUK_IMG,
    spicyLevel: 1,
  },
  {
    id: 'pork-sundubu',
    name: 'PORK SOFT TOFU SOUP',
    koreanName: '돼지고기 순두부',
    description: 'Silky soft tofu soup with savory pork, vegetables, and a rich, spicy broth.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'soft-tofu-soup',
    image: MANDU_GUK_IMG,
    spicyLevel: 1,
  },
  {
    id: 'seafood-sundubu',
    name: 'SEAFOOD SOFT TOFU SOUP (SHRIMP & MUSSEL)',
    koreanName: '해물 순두부',
    description:
      'Silky soft tofu soup with shrimp, mussels, and vegetables in a rich, spicy seafood broth.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'soft-tofu-soup',
    image: JJAMPONG_IMG,
    spicyLevel: 1,
  },
  {
    id: 'chicken-sundubu',
    name: 'CHICKEN SOFT TOFU SOUP',
    koreanName: '치킨 순두부',
    description: 'Silky soft tofu soup with tender chicken, vegetables, and a rich, spicy broth.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'soft-tofu-soup',
    image: CHICKEN_RICE,
    spicyLevel: 1,
  },
  {
    id: 'sundubu-classic',
    name: 'SUNDUBU — SOFT TOFU SOUP',
    koreanName: '순두부',
    description:
      'Classic silky soft tofu soup with vegetables in a rich, savory broth, comforting and full of flavor.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'soft-tofu-soup',
    image: MANDU_GUK_IMG,
    spicyLevel: 1,
  },

  // —— FRIED RICE ——
  {
    id: 'kimchi-fried-rice',
    name: 'KIMCHI FRIED RICE',
    koreanName: '김치볶음밥',
    description: 'Stir-fried rice with kimchi, vegetables, and egg, packed with bold, tangy Korean flavor.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'fried-rice',
    image: JJAMPONG_IMG,
    spicyLevel: 1,
  },

  // —— SIDES ——
  {
    id: 'fried-dumplings',
    name: 'FRIED DUMPLINGS (6 PC)',
    koreanName: '군만두',
    description: 'Crispy dumplings with pork and vegetables.',
    price: '$5.99',
    category: 'Sides',
    menuSection: 'sides',
    image: TTEOK_MANDU_IMG,
  },

  // —— KOREAN SOUL FOOD ——
  {
    id: 'jajangmyeon',
    name: 'JAJANGMYEON',
    koreanName: '짜장면',
    description:
      'Jajangmyeon — rich black bean noodles stir-fried with pork and onion. A Korean comfort classic, made fresh daily.',
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
      'Jjamppong — fiery red broth loaded with fresh seafood and chewy noodles. Can be made extra spicy.',
    price: '$14.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: JJAMPONG_IMG,
    spicyLevel: 2,
  },
  {
    id: 'tteokbokki',
    name: 'TTEOKBOKKI',
    koreanName: '떡볶이',
    description: 'Tteokbokki — chewy rice cakes in bold gochujang sauce. Ask for extra spicy!',
    price: '$12.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: JJAMPONG_IMG,
    spicyLevel: 2,
  },
  {
    id: 'gim-mari',
    name: 'GIM-MARI',
    koreanName: '김말이',
    description: 'Fried seaweed rolls (4 pcs) — deep-fried glass noodles wrapped in seaweed.',
    price: '$6.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: DONKATSU_IMG,
  },
  {
    id: 'tangsuyuk',
    name: 'TANGSUYUK',
    koreanName: '탕수육',
    description:
      'Tangsuyuk — crispy battered pork served with a glossy sweet and sour dipping sauce.',
    price: '$15.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: TANGSUYUK_IMG,
  },
  {
    id: 'donkatsu',
    name: 'DONKATSU',
    koreanName: '돈가스',
    description:
      'Donkatsu — golden-fried breaded pork cutlet served with our signature house sauce.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'korean-soul-food',
    image: DONKATSU_IMG,
  },

  // —— KIMBAP ——
  {
    id: 'bulgogi-kimbap',
    name: 'BULGOGI KIMBAP',
    koreanName: '불고기 김밥',
    description:
      'Kimbap (Korean seaweed rice roll) filled with marinated beef, radish, cucumber, egg, carrot, and lettuce.',
    price: '$7.99',
    category: 'Main',
    menuSection: 'kimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'tuna-mayo-kimbap',
    name: 'TUNA MAYO KIMBAP',
    koreanName: '참치마요 김밥',
    description:
      'Kimbap (Korean seaweed rice roll) filled with tuna mixed with mayonnaise, radish, cucumber, egg, carrot, and lettuce.',
    price: '$7.99',
    category: 'Main',
    menuSection: 'kimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'shrimp-tempura-kimbap',
    name: 'SHRIMP TEMPURA KIMBAP',
    koreanName: '새우튀김 김밥',
    description:
      'Kimbap (Korean seaweed rice roll) filled with crispy shrimp tempura, radish, cucumber, egg, carrot, and lettuce.',
    price: '$7.99',
    category: 'Main',
    menuSection: 'kimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'cheese-kimbap',
    name: 'CHEESE KIMBAP',
    koreanName: '치즈 김밥',
    description:
      'Kimbap (Korean seaweed rice roll) with melted cheese filling, radish, cucumber, egg, carrot, and lettuce.',
    price: '$7.99',
    category: 'Main',
    menuSection: 'kimbap',
    image: CHICKEN_RICE,
  },
  {
    id: 'vegetable-kimbap',
    name: 'VEGETABLE KIMBAP',
    koreanName: '야채 김밥',
    description:
      'Kimbap (Korean seaweed rice roll) filled with radish, cucumber, egg, carrot, and lettuce.',
    price: '$7.99',
    category: 'Main',
    menuSection: 'kimbap',
    image: CHICKEN_RICE,
  },

  // —— KOREAN NOODLES ——
  {
    id: 'jjolmyeon',
    name: 'JJOLMYEON',
    koreanName: '쫄면',
    description:
      'Jjolmyeon — extra-chewy noodles tossed in spicy sauce with crisp fresh vegetables. A Korean bunsik classic.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'korean-noodles',
    image: JJOLMYEON_IMG,
    spicyLevel: 2,
  },
  {
    id: 'bibim-naengmyeon',
    name: 'BIBIM NAENGMYEON',
    koreanName: '비빔 냉면',
    description:
      'Bibim naengmyeon — cold buckwheat noodles tossed in a spicy, tangy gochujang sauce. Bold and refreshing.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'korean-noodles',
    image: JJOLMYEON_IMG,
    spicyLevel: 2,
  },
  {
    id: 'mul-naengmyeon',
    name: 'MUL NAENGMYEON',
    koreanName: '물 냉면',
    description:
      'Mul naengmyeon — thin buckwheat noodles in an icy, clean broth. A classic Korean summer noodle dish.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'korean-noodles',
    image: MUL_NAENGMYEON_IMG,
  },

  // —— SPECIALS ——
  {
    id: 'chi-bap',
    name: 'CHI-BAP — KOREAN FRIED CHICKEN & RICE',
    koreanName: '치밥',
    description:
      'Traditional Korean fried chicken over steamed rice with bold house sauce. Crispy, satisfying, and made fresh every day.',
    price: '$17.99',
    category: 'Main',
    menuSection: 'specials',
    image: CHICKEN_RICE,
    limitedAvailability: true,
    orderSpecial: true,
  },
  {
    id: 'salmon-hwe-deopbap',
    name: 'SALMON SASHIMI RICE BOWL',
    koreanName: '연어 회덮밥',
    description:
      'Yeoneo hoe-deopbap — fresh salmon sashimi over seasoned rice with gochujang. Mix together for a bold, fresh flavor.',
    price: '$18.99',
    category: 'Main',
    menuSection: 'specials',
    image: SALMON_HWE_IMG,
    signatureDish: true,
    orderSpecial: true,
  },
  {
    id: 'gamja-sujebi',
    name: 'POTATO DOUGH SOUP',
    koreanName: '감자 수제비',
    description:
      'Gamja sujebi — hand-pulled dough and tender potato in a hearty, savory broth. Pure Korean comfort food.',
    price: '$13.99',
    category: 'Main',
    menuSection: 'specials',
    image: TTEOK_MANDU_IMG,
  },
];
