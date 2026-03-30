import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import MenuSection from './components/MenuSection';
import { MENU_ITEMS, MENU_SECTION_ORDER } from './constants';
import { useOrder } from './context/OrderContext';

/** Fixed nav (~88px) + sticky category bar — must match scroll-padding-top in index.css */
const MENU_ANCHOR_OFFSET_PX = 176;

const sectionNav = [
  { id: 'menu-top', label: 'KOREAN BBQ' },
  ...MENU_SECTION_ORDER.map((s) => ({ id: s.key, label: s.title })),
];

function scrollToMenuAnchor(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - MENU_ANCHOR_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export default function MenuPage() {
  const { itemCount } = useOrder();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname !== '/menu') return;
    const id = location.hash.replace(/^#/, '');
    if (!id) return;
    const run = () => scrollToMenuAnchor(id, 'auto');
    run();
    requestAnimationFrame(run);
  }, [location.pathname, location.hash]);

  return (
    <main className="pt-32 bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <section
        id="menu-top"
        className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 scroll-mt-44"
      >
        <div className="lg:w-1/2">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-fredoka font-bold text-brand-red/80 uppercase tracking-[0.2em] text-sm mb-4"
          >
            Korean BBQ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10vw] lg:text-[8vw] font-fredoka font-bold text-brand-red leading-[0.85] uppercase"
          >
            THE FULL <br /> SOUL MENU
          </motion.h1>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md aspect-square rounded-full overflow-hidden border-[12px] border-white shadow-2xl"
          >
            <img
              src="/images/donkatsu.png"
              alt="Daldal Bunsik soul menu — Korean classics"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-nav */}
      <div className="sticky top-[88px] z-40 bg-brand-cream/80 backdrop-blur-md py-6 border-y border-brand-red/5">
        <div         className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {sectionNav.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'menu-top' ? '/menu' : `/menu#${cat.id}`}
              onClick={(e) => {
                if (location.pathname !== '/menu') return;
                e.preventDefault();
                scrollToMenuAnchor(cat.id, 'smooth');
                const path = cat.id === 'menu-top' ? '/menu' : `/menu#${cat.id}`;
                window.history.replaceState(null, '', path);
              }}
              className="font-fredoka font-bold text-brand-red hover:opacity-70 transition-opacity text-sm tracking-wider uppercase"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            to="/order"
            className="font-fredoka font-bold text-sm tracking-wider uppercase bg-brand-dark text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </Link>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-20 pb-32">
        {MENU_SECTION_ORDER.map((meta, index) => (
          <React.Fragment key={meta.key}>
            <div id={meta.key} className="scroll-mt-44">
              <MenuSection
                title={meta.title}
                description={meta.description}
                items={MENU_ITEMS.filter((item) => item.menuSection === meta.key)}
                reverse={index % 2 !== 0}
              />
            </div>

            {meta.key === 'korean-soul-food' && (
              <section
                aria-label="Korean dumplings"
                className="max-w-7xl mx-auto px-6 -mt-8 mb-4"
              >
                <div className="rounded-[40px] bg-brand-dark text-white px-10 py-12 text-center shadow-xl border border-white/10">
                  <p className="font-fredoka font-bold text-3xl md:text-4xl uppercase tracking-tight mb-2">
                    Korean Dumplings
                  </p>
                  <p className="text-white/70 text-sm uppercase tracking-[0.35em] font-semibold">
                    Crafted with soul in Carrollton
                  </p>
                </div>
              </section>
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
