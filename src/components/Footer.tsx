import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-brand-footer text-white pt-10 sm:pt-20 md:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 overflow-hidden rounded-t-[40px] sm:rounded-t-[60px] mt-0 w-full max-w-[100vw]">
      {/* Background Large Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[25vw] font-fredoka font-bold text-white/[0.03] leading-none uppercase">
          DALDAL
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 sm:gap-12 mb-16 sm:mb-20">
          <div className="md:col-span-4 space-y-4 sm:space-y-6 sm:col-span-2 md:col-span-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl sm:text-4xl font-fredoka font-bold tracking-tighter uppercase">
                DALDAL BUNSIK
              </span>
            </Link>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xs">
              Korean comfort food in the heart of Carrollton.
            </p>
          </div>

          <div className="md:col-span-2 sm:col-span-1">
            <ul className="space-y-3 text-gray-400 text-base sm:text-lg font-medium">
              <li><Link to="/menu" className="hover:text-white transition-colors">Kimbap</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Tteokbokki</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Ramyun</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 sm:col-span-1">
            <ul className="space-y-3 text-gray-400 text-base sm:text-lg font-medium">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col items-start sm:items-end justify-center gap-4 sm:col-span-2 md:col-span-4">
            <p className="text-gray-400 text-base sm:text-lg text-left sm:text-right max-w-full">
              © 2026 Daldal Bunsik. Korean Soul Food in Carrollton.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
