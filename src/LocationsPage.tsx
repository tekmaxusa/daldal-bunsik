import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import StoreMapEmbed from './components/StoreMapEmbed';
import { LOCATIONS, STORE_SOCIAL, STORE_MAP_LABEL } from './constants';
import { phoneToTelHref } from './lib/utils';
import StoreOpenStatus from './components/StoreOpenStatus';

const store = LOCATIONS[0];

function MapCard() {
  return (
    <div className="rounded-[20px] overflow-hidden border border-gray-100 flex flex-col bg-white">
      <StoreMapEmbed minHeightClass="min-h-[260px] h-[260px] sm:min-h-[320px] sm:h-[320px] md:min-h-[360px] md:h-[360px]" />
      <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100">
        <p className="text-sm font-nunito font-semibold text-brand-dark/70">{STORE_MAP_LABEL}</p>
        <a
          href={store.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-fredoka font-bold text-sm text-brand-red uppercase tracking-wider hover:opacity-80 transition-opacity shrink-0"
        >
          Open in Google Maps
          <ExternalLink className="w-4 h-4" strokeWidth={2.2} aria-hidden />
        </a>
      </div>
    </div>
  );
}

function scrollToVisitUsAnchor() {
  const el = document.getElementById('visit-us');
  if (!el) return;
  const navReserve = 96;
  const top = el.getBoundingClientRect().top + window.scrollY - navReserve;
  window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
}

export default function LocationsPage() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname !== '/locations') return;
    if (location.hash.replace(/^#/, '') !== 'visit-us') return;
    const run = () => scrollToVisitUsAnchor();
    run();
    requestAnimationFrame(run);
    const t = window.setTimeout(run, 150);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 bg-brand-cream w-full max-w-[100vw] overflow-x-hidden pb-8 sm:pb-12">
      <section className="px-4 sm:px-6 pb-8 sm:pb-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-brand-red normal-case tracking-tight leading-[1.05] mb-2"
          >
            Daldal Bunsik
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl font-fredoka font-bold text-brand-dark normal-case mb-2"
          >
            Carrollton
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="korean-text text-xl md:text-2xl text-brand-dark/80 mb-4"
          >
            (달달분식)
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base md:text-lg text-brand-dark/75 font-nunito leading-relaxed max-w-2xl mx-auto md:mx-0"
          >
            Visit us for Korean soul food on Frankford Rd. Call ahead or open the map for directions.
          </motion.p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          <motion.article
            id="visit-us"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-28 bg-white rounded-[20px] p-6 md:p-8 border border-gray-100 flex flex-col"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6">
              <MapPin className="text-brand-red w-6 h-6" strokeWidth={2.2} />
            </div>
            <h2 className="text-xl font-fredoka font-bold text-brand-dark normal-case mb-4">Visit us</h2>
            <p className="text-brand-dark/80 font-nunito text-base sm:text-lg leading-relaxed flex-grow break-words">
              {store.address}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-brand-red w-5 h-5 shrink-0" />
                <a
                  href={phoneToTelHref(store.phone)}
                  className="font-nunito font-semibold text-brand-dark hover:text-brand-red transition-colors"
                >
                  {store.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-nunito">
                <a
                  href={STORE_SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red font-semibold hover:underline"
                >
                  Instagram
                </a>
                <a
                  href={STORE_SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red font-semibold hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <MapCard />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="md:col-span-2 bg-brand-footer text-white rounded-[20px] p-6 md:p-8 border border-brand-footer flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
          >
            <div className="flex gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="text-white w-6 h-6" strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="text-xl font-fredoka font-bold normal-case mb-3">Hours</h2>
                <div className="space-y-2 font-nunito text-base text-white/90">
                  {store.hoursWeekdaysMobileLines ? (
                    <div className="md:hidden space-y-1 font-semibold">
                      <p>{store.hoursWeekdaysMobileLines[0]}</p>
                      <p className="text-white/85">{store.hoursWeekdaysMobileLines[1]}</p>
                    </div>
                  ) : null}
                  <p
                    className={`font-semibold ${store.hoursWeekdaysMobileLines ? 'hidden md:block' : ''}`}
                  >
                    {store.hoursWeekdays ?? store.hours}
                  </p>
                  {store.hoursSunday && (
                    <p className="text-white/75 font-semibold tracking-wide">{store.hoursSunday}</p>
                  )}
                </div>
              </div>
            </div>
            <StoreOpenStatus variant="light" className="mt-0 self-start sm:self-center" />
          </motion.article>
        </div>
      </section>
    </main>
  );
}
