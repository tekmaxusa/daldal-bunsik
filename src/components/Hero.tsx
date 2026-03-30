import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicUrl } from '../lib/utils';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-cream">
      {/* Background Decorative Elements */}
      <div className="absolute top-40 right-[-5%] w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-[-5%] w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-red/10 mb-8">
            <Star className="text-brand-red fill-brand-red w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase">Authentic Korean Soul Food</span>
          </div>
          
          <h1 className="text-[12vw] lg:text-[8vw] font-fredoka font-bold leading-[0.85] text-brand-red mb-8 uppercase">
            KOREAN <br />
            <span className="text-brand-dark">STREET</span> <br />
            <span className="italic">VIBES</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg mb-12 leading-relaxed font-medium">
            Experience the heart of Seoul's street food scene. From chewy Tteokbokki to crispy Fried Chicken, we bring the authentic soul of Korea to your neighborhood.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            <Link
              to="/menu"
              className="bg-brand-red text-white font-fredoka font-bold text-lg px-10 py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(227,62,35,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
            >
              EXPLORE MENU <ArrowRight size={20} />
            </Link>
            <Link
              to="/order"
              className="bg-brand-dark text-white font-fredoka font-bold text-lg px-10 py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
            >
              ORDER NOW
            </Link>
            <Link
              to="/locations"
              className="bg-white border-2 border-brand-dark text-brand-dark font-fredoka font-bold text-lg px-10 py-5 rounded-full flex items-center justify-center gap-3 hover:bg-brand-dark hover:text-white transition-all uppercase tracking-widest"
            >
              FIND US
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl border-[16px] border-white transform rotate-2">
            <img
              src={publicUrl('images/chicken-rice-plate.png')}
              alt="Korean chicken rice plate with rice, salad, celery, and dipping sauces"
              className="w-full h-auto object-cover"
              width={1000}
              height={1200}
            />
          </div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 z-20 bg-brand-yellow text-brand-dark p-8 rounded-full font-fredoka font-bold shadow-2xl border-8 border-white text-center transform -rotate-12"
          >
            <span className="block text-4xl leading-none">100%</span>
            <span className="text-xs tracking-widest">SOUL FOOD</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            className="absolute -bottom-12 -left-12 z-20 bg-white p-6 rounded-[32px] shadow-2xl border border-gray-100 flex items-center gap-5"
          >
            <div className="bg-red-50 p-4 rounded-2xl">
              <Utensils className="text-brand-red" size={28} />
            </div>
            <div>
              <p className="text-[10px] text-brand-red font-bold uppercase tracking-[0.3em] mb-1">Fresh Daily</p>
              <p className="font-fredoka font-bold text-brand-dark text-lg leading-tight">Handmade <br /> Rice Cakes</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
