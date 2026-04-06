import React from 'react';
import AboutSection from './components/AboutSection';

export default function AboutPage() {
  return (
    <main className="pt-24 sm:pt-28 md:pt-32 w-full max-w-[100vw] overflow-x-hidden">
      <div className="bg-brand-red py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-fredoka font-bold text-white mb-4 sm:mb-6">
            OUR STORY
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-medium max-w-2xl mx-auto px-1">
            From family recipes to your neighborhood. Learn about our journey and passion for Bunsik.
          </p>
        </div>
      </div>
      <AboutSection />
      <section className="py-16 sm:py-24 bg-white px-2 sm:px-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-fredoka font-bold text-brand-dark mb-6 sm:mb-8">
            The &quot;Daldal&quot; Philosophy
          </h2>
          <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed text-left sm:text-center">
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
