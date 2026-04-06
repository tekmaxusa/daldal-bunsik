import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  title: string;
  description: string;
  items: MenuItem[];
  reverse?: boolean;
  /** Menu page uses 2; home featured uses 3 across on large screens */
  desktopGridCols?: 2 | 3;
  /** When set, shows a centered “View more” link below the grid */
  viewMoreTo?: string;
  /** Full menu page: tighter mobile stacking, larger category titles */
  variant?: 'default' | 'menu';
}

export default function MenuSection({
  title,
  description,
  items,
  reverse = false,
  desktopGridCols = 2,
  viewMoreTo,
  variant = 'default',
}: MenuSectionProps) {
  const gridLg =
    desktopGridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  const isMenu = variant === 'menu';

  return (
    <section
      className={
        isMenu
          ? 'py-5 sm:py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full'
          : 'py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 w-full'
      }
    >
      <div
        className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${isMenu ? 'gap-5 md:gap-10 lg:gap-16' : 'gap-10 lg:gap-16'} items-start`}
      >
        {/* Section Header */}
        <div
          className={`lg:w-1/3 w-full ${isMenu ? 'space-y-3 sm:space-y-5 pt-1 sm:pt-4 lg:pt-10' : 'space-y-4 sm:space-y-6 pt-4 lg:pt-10'}`}
        >
          <h2
            className={
              isMenu
                ? 'text-[clamp(1.85rem,6.5vw,3rem)] sm:text-5xl md:text-6xl lg:text-7xl font-fredoka font-bold text-brand-red leading-[0.95] break-words'
                : 'text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-brand-red leading-[0.95] break-words'
            }
          >
            {title}
          </h2>
          <p
            className={
              isMenu
                ? 'text-gray-600 text-lg sm:text-xl md:text-2xl leading-relaxed font-nunito'
                : 'text-gray-600 text-base sm:text-lg leading-relaxed font-nunito'
            }
          >
            {description}
          </p>
        </div>

        {/* Items Grid + optional CTA */}
        <div className={`lg:w-2/3 w-full min-w-0 flex flex-col ${isMenu ? 'gap-5 sm:gap-8 md:gap-10' : 'gap-8 sm:gap-10'}`}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${isMenu ? 'gap-4 sm:gap-6 md:gap-8' : 'gap-6 sm:gap-8'} ${gridLg}`}
          >
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl sm:rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col"
            >
              <div className="h-52 sm:h-60 md:h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 sm:p-8 flex-grow flex flex-col min-w-0">
                <div className="space-y-2 mb-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.limitedAvailability && (
                      <span className="text-[10px] font-fredoka font-bold uppercase tracking-wider text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                        Limited availability
                      </span>
                    )}
                    {item.signatureDish && (
                      <span className="text-[10px] font-fredoka font-bold uppercase tracking-wider text-white bg-brand-dark px-2 py-0.5 rounded-full">
                        Signature dish
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-fredoka font-bold text-brand-dark uppercase tracking-tight break-words">
                    {item.name}
                  </h3>
                  <p className="text-brand-red font-bold text-base sm:text-lg leading-snug break-words hyphens-none">
                    {item.price}
                  </p>
                </div>
                <div className="korean-text text-brand-red font-bold text-base sm:text-lg mb-4">
                  {item.koreanName}
                </div>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
          </div>

          {viewMoreTo ? (
            <div className="flex justify-center lg:justify-start">
              <Link
                to={viewMoreTo}
                className="inline-flex items-center gap-2 font-fredoka font-bold text-brand-red uppercase tracking-widest text-sm hover:opacity-80 transition-opacity"
              >
                View more
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
