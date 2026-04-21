import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, publicUrl } from '../lib/utils';

const logoSrc = publicUrl('images/daldal-bunsik-logo.png');

const navLinks = [
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Location', path: '/locations' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4 sm:py-6 max-w-[100vw] border-b',
        scrolled ? 'bg-brand-cream py-4 border-brand-red/20' : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center min-w-0 pr-2 shrink-0" aria-label="Daldal Bunsik — home">
          <img
            src={logoSrc}
            alt=""
            width={1536}
            height={600}
            className="h-11 w-auto sm:h-12 md:h-14 lg:h-[3.75rem] max-w-[min(72vw,13rem)] sm:max-w-[min(72vw,16rem)] md:max-w-[18rem] object-contain object-center"
            decoding="async"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path === '/locations' ? '/locations#visit-us' : link.path}
              className={cn(
                'font-nunito font-bold text-lg transition-all relative py-1',
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-red p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={36} /> : <Menu size={36} />}
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
            <div className="flex flex-col p-6 sm:p-8 gap-4 sm:gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path === '/locations' ? '/locations#visit-us' : link.path}
                  className={cn(
                    'font-fredoka text-xl sm:text-2xl font-bold uppercase',
                    location.pathname === link.path ? 'text-brand-red' : 'text-brand-dark'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
