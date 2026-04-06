import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { phoneToTelHref } from '../lib/utils';
import { LOCATIONS } from '../constants';

const storePhone = LOCATIONS[0]?.phone ?? '(972) XXX-XXXX';

type FaqItem = {
  question: string;
  showVisitCta?: boolean;
  answer: React.ReactNode;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What are your hours?',
    answer: (
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-nunito">
        We&apos;re open Mon, Tue, Thu, Fri &amp; Sat — 11:00 AM to 9:00 PM CST. Closed Wednesday and
        Sunday.
      </p>
    ),
  },
  {
    question: 'Where is Daldal Bunsik located?',
    answer: (
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-nunito">
        1111 W Frankford Rd Ste 102, Carrollton, TX 75007 — near the Frankford &amp; Josey
        intersection. Free parking available.{' '}
        <Link to="/locations#visit-us" className="text-brand-red font-semibold ml-1">
          Get Directions →
        </Link>
      </p>
    ),
  },
  {
    question: 'What kind of food do you serve?',
    answer: (
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-nunito">
        Korean comfort food and street eats — tteokbokki, jajangmyeon, handmade sujebi soups, kimbap,
        chi-bap, cold noodles, donkatsu, and more. Everything under $20.{' '}
        <Link to="/menu" className="text-brand-red font-semibold ml-1">
          See Full Menu →
        </Link>
      </p>
    ),
  },
  {
    question: 'How much does it cost?',
    answer: (
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-nunito">
        Kimbap starts at $6.99. Most dishes are $12.99–$14.99. Our premium specials (chi-bap, salmon
        bowl) are $17.99–$18.99. All under $20.
      </p>
    ),
  },
  {
    question: 'Can I order online or for pickup?',
    showVisitCta: true,
    answer: (
      <>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-nunito">
          Online ordering is coming soon! For now, visit us in-store or call ahead at{' '}
          <a href={phoneToTelHref(storePhone)} className="text-brand-red font-semibold">
            {storePhone}
          </a>
          .
        </p>
        <div className="flex justify-end mt-5">
          <Link
            to="/locations#visit-us"
            className="inline-flex items-center gap-2 rounded-full bg-brand-red text-white font-fredoka font-bold text-sm uppercase tracking-widest px-5 py-3 shadow-[0_8px_24px_rgba(227,62,35,0.35)] hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <MapPin className="w-4 h-4 text-red-200 shrink-0" strokeWidth={2.5} aria-hidden />
            Visit us
          </Link>
        </div>
      </>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pt-10 pb-3 sm:pb-16 sm:pt-16 px-4 sm:px-6 bg-white w-full max-w-[100vw]">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-center mb-8 sm:mb-12 uppercase text-brand-dark tracking-tight px-2 sm:px-0">
        Good to Know
      </h2>

      <div className="max-w-2xl mx-auto w-full min-w-0 flex flex-col gap-3 sm:gap-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100/80 overflow-hidden"
            >
              <button
                type="button"
                id={`faq-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left px-4 py-4 sm:px-6 sm:py-5 font-fredoka font-bold text-brand-dark text-base sm:text-lg leading-snug hover:bg-gray-50/80 transition-colors"
              >
                <span className="min-w-0 pr-2">{item.question}</span>
                <span className="shrink-0 text-brand-red" aria-hidden>
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                  )}
                </span>
              </button>
              {isOpen ? (
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-gray-100"
                >
                  <div className="pt-4">{item.answer}</div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
