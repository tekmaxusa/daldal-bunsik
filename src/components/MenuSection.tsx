import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';

interface MenuSectionProps {
  title: string;
  description: string;
  items: MenuItem[];
  reverse?: boolean;
}

export default function MenuSection({ title, description, items, reverse = false }: MenuSectionProps) {
  const { addItem } = useOrder();
  const navigate = useNavigate();

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-start`}>
        {/* Section Header */}
        <div className="lg:w-1/3 space-y-6 pt-10">
          <h2 className="text-6xl font-fredoka font-bold text-brand-red leading-none">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Items Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.displayTitle && (
                        <span className="text-sm font-semibold text-brand-dark tracking-wide">
                          {item.displayTitle}
                        </span>
                      )}
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
                    <h3 className="text-xl font-fredoka font-bold text-brand-dark uppercase tracking-tight">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-brand-red font-bold text-lg shrink-0">
                    {item.price}
                  </span>
                </div>
                <div className="korean-text text-brand-red font-bold text-sm mb-4">
                  {item.koreanName}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {item.orderSpecial ? (
                    <button
                      type="button"
                      onClick={() => {
                        addItem(item);
                        navigate('/order');
                      }}
                      className="w-full py-3 rounded-2xl border-2 border-brand-red font-fredoka font-bold text-brand-red text-sm uppercase tracking-widest hover:bg-brand-red hover:text-white transition-colors"
                    >
                      Order special
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => addItem(item)}
                    className={`w-full py-3 rounded-2xl font-fredoka font-bold text-sm uppercase tracking-widest transition-colors ${
                      item.orderSpecial
                        ? 'border-2 border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white'
                        : 'bg-brand-red text-white hover:opacity-95 shadow-md'
                    }`}
                  >
                    Add to order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
