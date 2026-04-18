import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileScrollActions from './components/MobileScrollActions';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import AboutPage from './AboutPage';
import LocationsPage from './LocationsPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="contents"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/order" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/** Project Pages only — custom domains are served from `/`, so no basename. */
function githubPagesProjectBasename(): string | undefined {
  const repo = import.meta.env.VITE_GITHUB_PAGES_REPO?.trim();
  if (!repo || typeof window === 'undefined') return undefined;

  const { hostname, pathname } = window.location;
  if (!hostname.endsWith('.github.io')) return undefined;

  const prefix = `/${repo}`;
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    return prefix;
  }
  return undefined;
}

function routerBasename(): string | undefined {
  const ghBasename = githubPagesProjectBasename();
  if (ghBasename) return ghBasename;

  const raw = import.meta.env.BASE_URL;
  if (raw === '/' || raw === './') return undefined;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export default function App() {
  return (
    <Router basename={routerBasename()}>
      <div className="min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-clip">
        <Navbar />
        <div className="w-full min-w-0 min-h-0 pb-16 max-md:pb-[5.5rem] md:pb-10">
          <AnimatedRoutes />
        </div>
        <Footer />
        <MobileScrollActions />
      </div>
    </Router>
  );
}
