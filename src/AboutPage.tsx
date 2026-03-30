import React from 'react';
import AboutSection from './components/AboutSection';

export default function AboutPage() {
  return (
    <main className="pt-32">
      <div className="bg-brand-red py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-fredoka font-bold text-white mb-6">OUR STORY</h1>
          <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">
            From a small stall in Seoul to your neighborhood. Learn about our journey and passion for Bunsik.
          </p>
        </div>
      </div>
      <AboutSection />
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-fredoka font-bold text-brand-dark mb-8">The "Daldal" Philosophy</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              At Daldal Bunsik, we believe that street food is more than just a quick bite—it's a cultural experience that brings people together. The word "Daldal" reflects the sweet moments shared over a steaming bowl of Tteokbokki.
            </p>
            <p>
              Our chefs are dedicated to preserving the traditional methods of Korean street food preparation while embracing the creativity of modern culinary trends. We source our ingredients locally whenever possible, ensuring that every bite is as fresh as it is flavorful.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
