import React from 'react';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import LocationsSection from './components/LocationsSection';
import { MENU_ITEMS } from './constants';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="bg-white py-12 overflow-hidden border-y border-brand-red/5">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-4xl font-fredoka font-bold text-gray-100 uppercase">
          <span>Tteokbokki • Gimbap • Fried Chicken • Mandu • Kimchi • Tteokbokki • Gimbap • Fried Chicken • Mandu • Kimchi • Tteokbokki • Gimbap • Fried Chicken • Mandu • Kimchi</span>
        </div>
      </div>
      
      <MenuSection 
        title="FEATURED SOUL FOOD"
        description="A taste of our most beloved dishes. Hand-crafted with tradition and served with a modern twist."
        items={MENU_ITEMS.filter((i) => i.menuSection === 'korean-soul-food').slice(0, 2)}
      />

      <AboutSection />
      <LocationsSection />
    </main>
  );
}
