'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "How thick should a residential concrete driveway be poured?",
    answer: "Standard passenger vehicle driveways require a minimum of 4 inches of 4,000 PSI concrete over a compacted base. For heavier trucks, RV parking, or commercial deliveries, we recommend a 5 to 6-inch reinforced slab with steel rebar grids."
  },
  {
    question: "When can I drive my vehicles on my newly poured concrete?",
    answer: "Light foot traffic is typically safe after 24 to 48 hours. However, passenger vehicles must wait a minimum of 7 full days, and heavy equipment should stay off for 28 days until the concrete attains its full compressive design strength."
  },
  {
    question: "Why is proper subgrade and aggregate base compaction essential in Alpharetta?",
    answer: "North Fulton County is known for dense Piedmont red clay. Untreated red clay expands when wet and shrinks when dry. Placing an engineered, mechanically compacted Graded Aggregate Base (GAB) prevents settlement, voids, and premature cracking."
  },
  {
    question: "Do you install control joints and expansion material?",
    answer: "Yes, absolutely. We place expansion joints against existing structures and cut control joints at intervals no greater than 24 to 30 times the slab thickness within the critical curing window to relieve internal tensile stresses."
  },
  {
    question: "How do I care for and maintain stamped or decorative concrete?",
    answer: "We apply an acrylic commercial sealer upon completion to lock in colors and protect against UV rays and moisture penetration. Resealing every 2 to 3 years maintains the vibrant color and luster."
  }
];

export default function FaqAccordion({
  title = "Frequently Asked Questions",
  subtitle = "EXPERTISE & ANSWERS",
  faqs = defaultFaqs
}: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#0c0e12] border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
            {subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Clear answers regarding engineering standards, curing times, and concrete maintenance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-[#141822] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    <span className="font-bold text-white text-base sm:text-lg">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-brand-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-white/5 bg-[#10141d]/50 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA below FAQ */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-400 mb-4">
            Have questions about your upcoming concrete project?
          </p>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all shadow-lg shadow-brand-600/30 hover:scale-105"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Call Our Team: {COMPANY_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
