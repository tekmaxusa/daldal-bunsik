import React from 'react';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import LocationsSection from './components/LocationsSection';
import FaqSection from './components/FaqSection';
import { FEATURED_HOME_MENU_IDS, menuItemsByIds } from './constants';

const MARQUEE_DISHES = [
  'Bulgogi BBQ',
  'LA Galbi',
  'Bibimbap',
  'Sundubu',
  'Jajangmyeon',
  'Jjamppong',
  'Tteokbokki',
  'Kimbap',
  'Chi-bap',
  'Mul Naengmyeon',
] as const;

const marqueeLine = MARQUEE_DISHES.map((d) => d.toUpperCase()).join(' • ');

export default function HomePage() {
  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden">
      <Hero />
      <p className="sr-only">
        Daldal Bunsik (달달분식) is a casual Korean snack bar at 1111 W Frankford Rd Ste 102,
        Carrollton, TX 75007.         달달분식 serves K-BBQ, bibimbap, sundubu, tteokbokki, jajangmyeon, kimbap, chi-bap, and
        Korean comfort meals. Open Mon, Tue, Thu–Sun 11 AM–8:30 PM. Closed Wednesdays.
      </p>
      <div className="bg-brand-cream py-8 sm:py-12 overflow-hidden border-y border-brand-red/10" aria-hidden>
        <div className="flex w-max animate-marquee">
          <span className="shrink-0 pr-10 sm:pr-16 text-2xl sm:text-3xl md:text-4xl font-fredoka font-bold text-gray-800 uppercase tracking-wide whitespace-nowrap select-none">
            {marqueeLine}
          </span>
          <span className="shrink-0 pr-10 sm:pr-16 text-2xl sm:text-3xl md:text-4xl font-fredoka font-bold text-gray-800 uppercase tracking-wide whitespace-nowrap select-none">
            {marqueeLine}
          </span>
        </div>
      </div>
      
      <MenuSection
        title="FEATURED DISHES"
        description="A taste of our most beloved dishes. Hand-crafted with tradition and served with a modern twist."
        items={menuItemsByIds(FEATURED_HOME_MENU_IDS)}
        desktopGridCols={3}
        viewMoreTo="/menu"
      />

      <AboutSection />
      <LocationsSection />
      <FaqSection />
    </main>
  );
}
