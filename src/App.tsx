import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import AboutPage from './AboutPage';
import LocationsPage from './LocationsPage';
import OrderPage from './OrderPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          }
        />
        <Route
          path="/menu"
          element={
            <PageWrapper>
              <MenuPage />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          }
        />
        <Route
          path="/locations"
          element={
            <PageWrapper>
              <LocationsPage />
            </PageWrapper>
          }
        />
        <Route
          path="/order"
          element={
            <PageWrapper>
              <OrderPage />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function routerBasename(): string | undefined {
  const raw = import.meta.env.BASE_URL;
  if (raw === '/') return undefined;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export default function App() {
  return (
    <Router basename={routerBasename()}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
