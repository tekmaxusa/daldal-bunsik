import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Heart, ShoppingCart } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function Footer() {
  const { itemCount } = useOrder();
  return (
    <footer className="relative bg-brand-footer text-white pt-24 pb-12 px-6 overflow-hidden rounded-t-[60px] mt-20">
      {/* Background Large Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[25vw] font-fredoka font-bold text-white/[0.03] leading-none uppercase">
          DALDAL
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-fredoka font-bold tracking-tighter uppercase">
                DALDAL BUNSIK
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience the vibrant soul of Korean street food in the heart of Carrollton.
            </p>
          </div>

          <div className="md:col-span-2">
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><Link to="/menu" className="hover:text-white transition-colors">Kimbap</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Tteokbokki</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Ramyun</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col items-end justify-between gap-8">
            <p className="text-gray-400 text-sm text-right">
              © 2024 Daldal Bunsik. Seoul Soul in Carrollton.
            </p>
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Share2 size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Order Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          to="/order"
          className="bg-brand-red text-white font-fredoka font-bold px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(227,62,35,0.4)] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm"
        >
          <ShoppingCart size={20} />
          ORDER ONLINE NOW
          {itemCount > 0 ? (
            <span className="min-w-[24px] h-6 px-2 rounded-full bg-white text-brand-red text-xs font-fredoka font-bold flex items-center justify-center">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </footer>
  );
}
