import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import MenuSection from './components/MenuSection';
import { MENU_ITEMS, MENU_SECTION_ORDER } from './constants';
import { publicUrl } from './lib/utils';

/** Fixed nav (~88px) + sticky category bar — must match scroll-padding-top in index.css */
const MENU_ANCHOR_OFFSET_PX = 176;

const sectionNav = MENU_SECTION_ORDER.map((s) => ({ id: s.key, label: s.title }));

function scrollToMenuAnchor(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - MENU_ANCHOR_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

export default function MenuPage() {
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
    <main className="pt-24 sm:pt-28 md:pt-32 bg-brand-cream w-full max-w-[100vw]">
      {/* Hero Section */}
      <section
        id="menu-top"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 scroll-mt-44"
      >
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-fredoka font-bold text-brand-red/80 uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4"
          >
            Full menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[clamp(2rem,10vw,4.25rem)] lg:text-[clamp(2.75rem,7vw,5rem)] font-fredoka font-bold text-brand-red leading-[0.9] uppercase"
          >
            THE FULL <br /> SOUL MENU
          </motion.h1>
        </div>
        <div className="lg:w-1/2 flex justify-center w-full max-w-sm lg:max-w-none mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-[min(100%,20rem)] sm:max-w-md aspect-square rounded-full overflow-hidden border-[6px] sm:border-[10px] lg:border-[12px] border-white shadow-2xl"
          >
            <img
              src={publicUrl('images/donkatsu.png')}
              alt="Daldal Bunsik soul menu — Korean classics"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Sticks below fixed Navbar — needs ancestors without overflow-x-hidden (use clip on body). */}
      <div className="sticky top-[4.5rem] sm:top-24 md:top-[5.5rem] z-[45] w-full bg-brand-cream/95 backdrop-blur-md border-b-2 border-brand-red/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Mobile: 2×2 grid so all categories show without horizontal scroll */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 py-2.5 md:hidden">
            {sectionNav.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu#${cat.id}`}
                onClick={(e) => {
                  if (location.pathname !== '/menu') return;
                  e.preventDefault();
                  scrollToMenuAnchor(cat.id, 'smooth');
                  window.history.replaceState(null, '', `/menu#${cat.id}`);
                }}
                className="font-fredoka font-bold text-brand-red hover:opacity-70 transition-opacity text-sm leading-snug tracking-wide uppercase text-center px-2 py-3 rounded-xl bg-white/60 border border-brand-red/10"
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex md:flex-nowrap md:items-center md:gap-x-8 md:py-5">
            {sectionNav.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu#${cat.id}`}
                onClick={(e) => {
                  if (location.pathname !== '/menu') return;
                  e.preventDefault();
                  scrollToMenuAnchor(cat.id, 'smooth');
                  window.history.replaceState(null, '', `/menu#${cat.id}`);
                }}
                className="shrink-0 font-fredoka font-bold text-brand-red hover:opacity-70 transition-opacity text-2xl tracking-wide uppercase whitespace-nowrap py-1"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4 sm:space-y-12 md:space-y-16 lg:space-y-20 pb-16 sm:pb-24 md:pb-28">
        {MENU_SECTION_ORDER.map((meta, index) => (
          <React.Fragment key={meta.key}>
            <div id={meta.key} className="scroll-mt-44">
              <MenuSection
                variant="menu"
                title={meta.title}
                description={meta.description}
                items={MENU_ITEMS.filter((item) => item.menuSection === meta.key)}
                reverse={index % 2 !== 0}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
