import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { hasExternalOrderUrl, ONLINE_ORDER_URL } from '../lib/siteConfig';

const SHOW_AFTER_PX = 120;

const orderBtnClass =
  'w-full font-fredoka font-bold uppercase tracking-widest rounded-full py-3.5 text-sm text-center active:scale-[0.98] transition-transform bg-brand-red text-white hover:opacity-95 border border-brand-red';

const backBtnClass =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white border border-white/25 hover:opacity-95 active:scale-[0.98] transition-transform';

export default function MobileScrollActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[60] md:hidden pointer-events-none px-4 pb-4 pt-2 bg-transparent">
        <div className="mx-auto max-w-lg flex flex-col gap-2 pointer-events-auto">
          <div className="flex justify-end pr-0.5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={backBtnClass}
              aria-label="Back to top"
            >
              <ChevronUp className="h-5 w-5" strokeWidth={2.75} aria-hidden />
            </button>
          </div>
          {hasExternalOrderUrl() ? (
            <a
              href={ONLINE_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={orderBtnClass}
            >
              Order now
            </a>
          ) : (
            <Link to="/menu" className={orderBtnClass}>
              Order now
            </Link>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`${backBtnClass} fixed bottom-8 right-8 z-[60] hidden sm:flex`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" strokeWidth={2.75} aria-hidden />
      </button>
    </>
  );
}
