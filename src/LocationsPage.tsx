import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock } from 'lucide-react';
import StoreMapEmbed from './components/StoreMapEmbed';
import { LOCATIONS, STORE_SOCIAL, STORE_MAP_LABEL } from './constants';
import { publicUrl } from './lib/utils';

const store = LOCATIONS[0];

function MapCard() {
  return (
    <div className="rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col bg-white">
      <StoreMapEmbed minHeightClass="min-h-[320px] h-[320px] md:min-h-[360px] md:h-[360px]" />
      <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100">
        <p className="text-sm font-nunito font-semibold text-brand-dark/70">{STORE_MAP_LABEL}</p>
        <a
          href={store.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-fredoka font-bold text-sm text-brand-red uppercase tracking-wider hover:opacity-80 transition-opacity shrink-0"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="pt-28 md:pt-32 bg-brand-cream min-h-screen">
      {/* Hero */}
      <section className="px-6 pb-16 md:pb-24 pt-8">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex mb-6"
          >
            <span className="bg-brand-red text-white font-fredoka font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-md">
              Soul food near Frankford Rd.
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-fredoka font-bold text-brand-red normal-case tracking-tight leading-[1.05] mb-2"
          >
            Daldal Bunsik
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-brand-dark normal-case tracking-tight mb-3"
          >
            Carrollton
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="korean-text text-2xl md:text-3xl text-brand-dark/80 mb-8"
          >
            (달달분식)
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-dark/75 font-nunito leading-relaxed max-w-2xl mx-auto md:mx-0"
          >
            Step into authentic Korean snack bar vibes—warm bowls, sizzling plates, and the kind of
            comfort food you crave after a long day. We&apos;re your neighborhood spot for soulful
            Korean eats.
          </motion.p>
        </div>
      </section>

      {/* 2×2 cards */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Visit us */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[20px] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-100/80 flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-8">
              <MapPin className="text-brand-red w-7 h-7" strokeWidth={2.2} />
            </div>
            <h2 className="text-2xl font-fredoka font-bold text-brand-dark normal-case mb-6">
              Visit us
            </h2>
            <p className="text-brand-dark/80 font-nunito text-lg leading-relaxed flex-grow">
              {store.address}
            </p>
            <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-3">
              <Phone className="text-brand-red w-5 h-5 shrink-0" />
              {store.phone.includes('XXX') ? (
                <span className="font-nunito font-semibold text-brand-dark">{store.phone}</span>
              ) : (
                <a
                  href={`tel:${store.phone.replace(/[^\d+]/g, '')}`}
                  className="font-nunito font-semibold text-brand-dark hover:text-brand-red transition-colors"
                >
                  {store.phone}
                </a>
              )}
            </div>
          </motion.article>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <MapCard />
          </motion.div>

          {/* Hours */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="bg-brand-footer text-white rounded-[20px] p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
              <Clock className="text-white w-7 h-7" strokeWidth={2.2} />
            </div>
            <h2 className="text-2xl font-fredoka font-bold normal-case mb-8">Hours</h2>
            <div className="space-y-4 font-nunito text-lg text-white/90">
              <p className="font-semibold">{store.hoursWeekdays ?? store.hours}</p>
              {store.hoursSunday && (
                <p className="text-white/75 font-semibold tracking-wide">{store.hoursSunday}</p>
              )}
            </div>
          </motion.article>

          {/* Social */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-brand-red text-white rounded-[20px] p-8 md:p-10 shadow-[0_12px_40px_rgba(227,62,35,0.35)] flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-fredoka font-bold italic normal-case mb-8 leading-tight">
              Follow our food journey
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={STORE_SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-white text-brand-red font-fredoka font-bold text-sm uppercase tracking-wider hover:bg-brand-cream transition-colors"
              >
                Instagram
              </a>
              <a
                href={STORE_SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full border-2 border-white text-white font-fredoka font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Facebook
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-20 md:pb-28 bg-white/60 border-y border-brand-red/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-square max-w-lg mx-auto lg:mx-0"
          >
            <img
              src={publicUrl('images/tangsuyuk.png')}
              alt="Tangsuyuk sweet and sour crispy pork at Daldal Bunsik"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-5 right-5 bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-fredoka font-bold text-brand-red text-sm">Since 2024</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-brand-dark normal-case leading-tight">
              From Seoul with{' '}
              <span className="text-brand-red">Heart.</span>
            </h2>
            <div className="space-y-4 text-brand-dark/80 font-nunito text-lg leading-relaxed">
              <p>
                <span className="korean-text">분식</span> isn&apos;t just fast food—it&apos;s the
                rhythm of everyday Korea. At Daldal Bunsik, we honor that tradition with recipes
                passed down and flavors that feel like home, whether you grew up on{' '}
                <span className="text-brand-red font-semibold border-b-2 border-brand-red/40">
                  Bunsik
                </span>{' '}
                or you&apos;re trying it for the first time.
              </p>
              <p>
                Every plate is made with intention: broths simmered low and slow, noodles with the
                right chew, and sides that complete the meal the way mom would serve it.
              </p>
              <p>
                Carrollton is where we landed—and we&apos;re proud to share a little piece of Seoul
                with neighbors who love good food and good company.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 pb-28 md:pb-36">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-brand-dark normal-case mb-3">
              Get in Touch
            </h2>
            <p className="text-brand-dark/65 font-nunito text-lg">
              Questions, catering, or just want to say hi—we&apos;d love to hear from you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="loc-name" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                  Name
                </label>
                <input
                  id="loc-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="loc-email" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                  Email
                </label>
                <input
                  id="loc-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/40"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="loc-message" className="block font-fredoka font-bold text-xs uppercase tracking-widest text-brand-dark/50 mb-2">
                Message
              </label>
              <textarea
                id="loc-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 font-nunito text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/40 resize-y min-h-[140px]"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-red text-white font-fredoka font-bold text-lg uppercase tracking-wider shadow-[0_8px_28px_rgba(227,62,35,0.35)] hover:opacity-95 active:scale-[0.99] transition-all"
            >
              Send Message
            </button>
            {sent && (
              <p className="text-center mt-4 text-brand-red font-nunito font-semibold text-sm">
                Thanks! We&apos;ll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
