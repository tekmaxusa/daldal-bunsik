import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useOrder } from '../context/OrderContext';

const navLinks = [
  { name: 'Menu', path: '/menu' },
  { name: 'Locations', path: '/locations' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { itemCount } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6',
        scrolled ? 'bg-brand-cream/95 backdrop-blur-md py-4' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-fredoka font-bold tracking-tighter text-brand-red uppercase">
            DALDAL BUNSIK
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'font-nunito font-bold text-sm transition-all relative py-1',
                  location.pathname === link.path 
                    ? 'text-brand-red' 
                    : 'text-gray-600 hover:text-brand-red'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                  />
                )}
              </Link>
            ))}
          </div>
          <Link
            to="/order"
            className={cn(
              'relative bg-brand-red text-white font-fredoka font-bold px-8 py-3 rounded-full shadow-[0_4px_20px_rgba(227,62,35,0.3)] hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2',
              location.pathname === '/order' && 'ring-2 ring-brand-dark ring-offset-2 ring-offset-brand-cream'
            )}
          >
            ORDER NOW
            {itemCount > 0 ? (
              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-white text-brand-red text-xs font-fredoka font-bold flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-red p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-cream shadow-2xl md:hidden overflow-hidden border-t border-brand-red/10"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'font-fredoka text-2xl font-bold uppercase',
                    location.pathname === link.path ? 'text-brand-red' : 'text-brand-dark'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/order"
                className="bg-brand-red text-white font-fredoka font-bold text-center py-4 rounded-full shadow-lg flex items-center justify-center gap-2"
              >
                ORDER NOW
                {itemCount > 0 ? (
                  <span className="min-w-[24px] h-6 px-2 rounded-full bg-white text-brand-red text-sm font-fredoka font-bold flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                ) : null}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
