import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Star, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicUrl, phoneToTelHref } from '../lib/utils';
import { LOCATIONS } from '../constants';

const heroImageSrc = publicUrl('images/chicken-rice-plate.png');
const storePhone = LOCATIONS[0]?.phone ?? '(972) 213-0186';

const heroBodyCopy =
  'K-BBQ, bibimbap, sundubu, jajangmyeon, jjamppong, kimbap, and cold noodles. Fast, fresh Korean soul food in Carrollton, TX.';

export default function Hero() {
  return (
    <>
      {/* Mobile: full-viewport card — layout per spec (image, badge, headline, copy, 2 CTAs) */}
      <section
        className="relative z-10 lg:hidden flex flex-col pt-28 pb-8 px-3 sm:px-4 box-border bg-brand-cream w-full max-w-[100vw] overflow-x-hidden"
        aria-label="Welcome"
      >
        <div className="flex flex-col rounded-[28px] border-2 border-white/90 bg-transparent overflow-hidden shadow-none">
          <div className="relative shrink-0 h-[min(38vh,220px)] min-h-[180px] rounded-t-[24px] overflow-hidden">
            <img
              src={heroImageSrc}
              alt="Korean chicken rice plate with rice, salad, celery, and dipping sauces"
              className="absolute inset-0 h-full w-full object-cover"
              width={1000}
              height={1200}
            />
            <div className="absolute inset-0 border-b border-white/40 pointer-events-none" />
            <div className="absolute top-3 right-3 z-10 bg-brand-yellow text-brand-dark rounded-full font-fredoka font-bold shadow-lg border-4 border-white text-center w-[4.75rem] h-[4.75rem] flex flex-col items-center justify-center -rotate-6">
              <span className="block text-xl leading-none">100%</span>
              <span className="text-[0.5rem] tracking-widest leading-tight mt-0.5 px-1">SOUL FOOD</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-5 pt-4 pb-8">
            <div>
              <h1 className="text-[48px] font-fredoka font-bold leading-[1.05] text-brand-red uppercase tracking-tight">
                KOREAN <br />
                <span className="text-brand-dark">SOUL</span> FOOD
              </h1>
              <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed font-medium font-nunito">
                {heroBodyCopy}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-3 sm:mt-4">
              <Link
                to="/menu"
                className="bg-brand-red text-white font-fredoka font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(227,62,35,0.35)] active:scale-[0.98] transition-transform uppercase tracking-widest"
              >
                Explore Menu <ArrowRight size={20} strokeWidth={2.5} />
              </Link>
              <a
                href={phoneToTelHref(storePhone)}
                className="bg-white text-black border-2 border-black font-fredoka font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-transform uppercase tracking-widest"
              >
                <Phone size={20} strokeWidth={2.5} className="text-black" />
                CALL US
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop */}
      <section className="relative min-h-screen hidden lg:flex items-center pt-28 pb-12 overflow-x-hidden overflow-y-visible bg-brand-cream w-full max-w-[100vw]">
        <div className="absolute top-40 right-[-5%] w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[-5%] w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center relative z-10 w-full min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-red/10 mb-6 sm:mb-7">
              <Star className="text-brand-red fill-brand-red w-4 h-4" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase">
                Authentic Korean Soul Food
              </span>
            </div>

            <h1 className="text-[48px] font-fredoka font-bold leading-[1.05] text-brand-red mb-6 sm:mb-8 uppercase">
              KOREAN <br />
              <span className="text-brand-dark">SOUL</span> FOOD
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-xl mb-8 sm:mb-12 leading-relaxed font-medium font-nunito">
              {heroBodyCopy}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <Link
                to="/menu"
                className="bg-brand-red text-white font-fredoka font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(227,62,35,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
              >
                EXPLORE MENU <ArrowRight size={20} />
              </Link>
              <a
                href={phoneToTelHref(storePhone)}
                className="bg-white text-black border-2 border-black font-fredoka font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
              >
                <Phone size={20} strokeWidth={2.5} className="text-black" />
                CALL US
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative min-w-0 max-w-full"
          >
            <div className="relative z-10 rounded-[32px] xl:rounded-[60px] overflow-hidden shadow-2xl border-[8px] lg:border-[12px] xl:border-[16px] border-white transform rotate-2">
              <img
                src={heroImageSrc}
                alt="Korean chicken rice plate with rice, salad, celery, and dipping sauces"
                className="w-full h-auto object-cover"
                width={1000}
                height={1200}
              />
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden xl:flex absolute -top-10 -right-10 z-20 bg-brand-yellow text-brand-dark p-8 rounded-full font-fredoka font-bold shadow-2xl border-8 border-white text-center transform -rotate-12"
            >
              <span className="block text-4xl leading-none">100%</span>
              <span className="text-xs tracking-widest">SOUL FOOD</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
              className="hidden xl:flex absolute -bottom-12 -left-12 z-20 bg-white p-6 rounded-[32px] shadow-2xl border border-gray-100 items-center gap-5"
            >
              <div className="bg-red-50 p-4 rounded-2xl">
                <Utensils className="text-brand-red" size={28} />
              </div>
              <div>
                <p className="text-[10px] text-brand-red font-bold uppercase tracking-[0.3em] mb-1">
                  Fresh Daily
                </p>
                <p className="font-fredoka font-bold text-brand-dark text-lg leading-tight">
                  Handmade <br /> Rice Cakes
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
