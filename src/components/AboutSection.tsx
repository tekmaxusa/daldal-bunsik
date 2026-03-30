import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Utensils } from 'lucide-react';
import { publicUrl } from '../lib/utils';

export default function AboutSection() {
  return (
    <section className="py-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-6xl md:text-7xl font-fredoka font-bold text-brand-red mb-10 leading-none uppercase">
                OUR <br /> <span className="text-brand-dark italic">SOULFUL</span> <br /> STORY
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                "Daldal" means sweet and bubbly in Korean. We started with a simple mission: to bring the vibrant, bustling energy of Seoul's night markets to the heart of Carrollton.
              </p>
              <p className="text-lg text-gray-500 mb-12 leading-relaxed">
                Every recipe we serve has been passed down through generations, refined with modern techniques but always keeping the soul of traditional Korean Bunsik alive.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-8 bg-white rounded-[32px] shadow-xl shadow-brand-red/5 border border-brand-red/5">
                  <div className="bg-red-50 p-4 rounded-2xl mb-4">
                    <Heart className="text-brand-red" size={28} />
                  </div>
                  <h4 className="font-fredoka font-bold text-brand-dark uppercase text-sm tracking-widest">Made with Love</h4>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-white rounded-[32px] shadow-xl shadow-brand-red/5 border border-brand-red/5">
                  <div className="bg-yellow-50 p-4 rounded-2xl mb-4">
                    <Users className="text-brand-yellow" size={28} />
                  </div>
                  <h4 className="font-fredoka font-bold text-brand-dark uppercase text-sm tracking-widest">Community First</h4>
                </div>
                <div className="flex flex-col items-center text-center p-8 bg-white rounded-[32px] shadow-xl shadow-brand-red/5 border border-brand-red/5">
                  <div className="bg-blue-50 p-4 rounded-2xl mb-4">
                    <Utensils className="text-blue-600" size={28} />
                  </div>
                  <h4 className="font-fredoka font-bold text-brand-dark uppercase text-sm tracking-widest">Fresh Daily</h4>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6 pt-16">
                <img
                  src={publicUrl('images/jajangmyeon.png')}
                  alt="Jajangmyeon black bean noodles with fried dumpling and fresh vegetables"
                  className="rounded-[40px] w-full h-[400px] object-cover shadow-2xl border-8 border-white"
                />
                <img
                  src={publicUrl('images/jjamppong.png')}
                  alt="Jjamppong spicy seafood noodle soup in a stainless steel bowl"
                  className="rounded-[40px] w-full h-64 object-cover shadow-2xl border-8 border-white"
                />
              </div>
              <div className="space-y-6">
                <img
                  src={publicUrl('images/mul-naengmyeon.png')}
                  alt="Mul naengmyeon cold buckwheat noodles in chilled broth"
                  className="rounded-[40px] w-full h-64 object-cover shadow-2xl border-8 border-white"
                />
                <img
                  src={publicUrl('images/kimbap.png')}
                  alt="Fresh vegetable kimbap rolls on a plate"
                  className="rounded-[40px] w-full h-[400px] object-cover shadow-2xl border-8 border-white"
                />
              </div>
            </motion.div>
            
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-red/5 rounded-full -z-10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
