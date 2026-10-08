import React from 'react';
import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function MobileCallBar() {
  return (
    <aside aria-label="Quick contact" className="sm:hidden fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-base shadow-2xl shadow-brand-700/60 flex items-center justify-center gap-3 border border-brand-400/30 active:scale-95 transition-transform"
      >
        <Phone className="w-5 h-5 fill-white animate-pulse" />
        <span>Call BigCreek Concrete: {COMPANY_INFO.phoneDisplay}</span>
      </a>
    </aside>
  );
}
