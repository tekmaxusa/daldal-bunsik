import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LOCATIONS } from '../constants';
import StoreMapEmbed from './StoreMapEmbed';
import StoreOpenStatus from './StoreOpenStatus';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { phoneToTelHref } from '../lib/utils';

export default function LocationsSection() {
  return (
    <section className="py-10 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-brand-dark mb-4 sm:mb-6">
              VISIT <span className="text-brand-yellow">US</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-500">
              On Frankford Rd. in Carrollton — Korean comfort food made fresh daily.
            </p>
          </div>
          <Link
            to="/locations#visit-us"
            className="bg-brand-dark text-white font-fredoka font-bold px-6 sm:px-10 py-3.5 sm:py-4 rounded-full hover:bg-brand-red transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base w-full md:w-auto shrink-0"
          >
            LOCATION &amp; HOURS <ExternalLink size={20} className="shrink-0" />
          </Link>
        </div>

        <div
          className={`grid gap-8 ${
            LOCATIONS.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'
          }`}
        >
          {LOCATIONS.map((loc, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              key={loc.id}
              className="group bg-brand-cream p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[40px] border border-gray-100 hover:border-brand-yellow transition-all duration-500"
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-yellow transition-colors">
                <MapPin className="text-brand-dark" size={32} />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-brand-dark mb-4 sm:mb-6 break-words">
                {loc.name}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brand-red"><MapPin size={20} /></div>
                  <p className="text-base sm:text-lg text-gray-600 break-words">{loc.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-brand-red">
                    <Phone size={20} />
                  </div>
                  <a
                    href={phoneToTelHref(loc.phone)}
                    className="text-lg text-gray-600 hover:text-brand-red transition-colors"
                  >
                    {loc.phone}
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-brand-red mt-1"><Clock size={20} /></div>
                  <div className="text-lg text-gray-600 space-y-1">
                    {loc.hoursWeekdays ? (
                      <>
                        {loc.hoursWeekdaysMobileLines ? (
                          <div className="md:hidden space-y-0.5">
                            <p>{loc.hoursWeekdaysMobileLines[0]}</p>
                            <p>{loc.hoursWeekdaysMobileLines[1]}</p>
                          </div>
                        ) : null}
                        <p className={loc.hoursWeekdaysMobileLines ? 'hidden md:block' : undefined}>
                          {loc.hoursWeekdays}
                        </p>
                        {loc.hoursSunday && <p>{loc.hoursSunday}</p>}
                      </>
                    ) : (
                      <p>{loc.hours}</p>
                    )}
                    <StoreOpenStatus />
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200 flex items-center justify-start">
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-dark font-fredoka font-bold text-lg flex items-center gap-2 hover:text-brand-red transition-colors"
                >
                  GET DIRECTIONS <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps */}
        <div className="mt-12 sm:mt-16 rounded-3xl sm:rounded-[40px] overflow-hidden border-4 sm:border-8 border-white shadow-xl bg-gray-100">
          <StoreMapEmbed minHeightClass="min-h-[400px] h-[420px] md:h-[480px]" />
        </div>
      </div>
    </section>
  );
}
