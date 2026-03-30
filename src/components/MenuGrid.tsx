import React from 'react';
import { motion } from 'motion/react';
import { MENU_ITEMS } from '../constants';
import { Flame } from 'lucide-react';
import { cn } from '../lib/utils';
import { useOrder } from '../context/OrderContext';

export default function MenuGrid() {
  const { addItem } = useOrder();
  const categories = ['All', 'Main', 'Sides', 'Drinks', 'Desserts'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-fredoka font-bold text-brand-dark mb-4">
            OUR <span className="text-brand-red">MENU</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From spicy classics to modern twists, explore our curated selection of Korea's most beloved street foods.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full font-fredoka font-bold transition-all",
                activeCategory === cat 
                  ? "bg-brand-dark text-white shadow-lg scale-105" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.id}
              className="group bg-brand-cream rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {item.spicyLevel && item.spicyLevel > 0 && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex gap-1 items-center shadow-sm">
                    {[...Array(item.spicyLevel)].map((_, i) => (
                      <Flame key={i} size={16} className="text-brand-red fill-brand-red" />
                    ))}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-brand-yellow text-brand-dark font-fredoka font-bold px-4 py-1 rounded-full shadow-md">
                  {item.price}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-fredoka font-bold text-brand-dark">{item.name}</h3>
                  <span className="korean-text text-brand-red font-bold text-lg">{item.koreanName}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => addItem(item)}
                  className="w-full py-3 border-2 border-brand-dark rounded-2xl font-fredoka font-bold hover:bg-brand-dark hover:text-white transition-colors"
                >
                  ADD TO ORDER
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
