import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LOCATIONS } from '../constants';
import StoreMapEmbed from './StoreMapEmbed';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function LocationsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-fredoka font-bold text-brand-dark mb-6">
              VISIT <span className="text-brand-yellow">US</span>
            </h2>
            <p className="text-xl text-gray-500">
              Find us on Frankford Rd. in Carrollton—soulful Korean bunsik, made fresh for the neighborhood.
            </p>
          </div>
          <Link
            to="/locations"
            className="bg-brand-dark text-white font-fredoka font-bold px-10 py-4 rounded-full hover:bg-brand-red transition-colors flex items-center gap-2"
          >
            LOCATION &amp; HOURS <ExternalLink size={20} />
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
              className="group bg-brand-cream p-10 rounded-[40px] border border-gray-100 hover:border-brand-yellow transition-all duration-500"
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-yellow transition-colors">
                <MapPin className="text-brand-dark" size={32} />
              </div>
              
              <h3 className="text-3xl font-fredoka font-bold text-brand-dark mb-6">{loc.name}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-brand-red"><MapPin size={20} /></div>
                  <p className="text-lg text-gray-600">{loc.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-brand-red"><Phone size={20} /></div>
                  <p className="text-lg text-gray-600">{loc.phone}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-brand-red mt-1"><Clock size={20} /></div>
                  <div className="text-lg text-gray-600 space-y-1">
                    {loc.hoursWeekdays ? (
                      <>
                        <p>{loc.hoursWeekdays}</p>
                        {loc.hoursSunday && <p>{loc.hoursSunday}</p>}
                      </>
                    ) : (
                      <p>{loc.hours}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200 flex items-center justify-between">
                <a 
                  href={loc.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-dark font-fredoka font-bold text-lg flex items-center gap-2 hover:text-brand-red transition-colors"
                >
                  GET DIRECTIONS <ExternalLink size={18} />
                </a>
                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                  Open Now
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps */}
        <div className="mt-16 rounded-[40px] overflow-hidden border-8 border-white shadow-xl bg-gray-100">
          <StoreMapEmbed minHeightClass="min-h-[400px] h-[420px] md:h-[480px]" />
        </div>
      </div>
    </section>
  );
}
