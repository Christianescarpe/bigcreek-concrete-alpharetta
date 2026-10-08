'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, ArrowRight, ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PageSection, COMPANY_INFO, PageAnchor } from '@/lib/data';

interface PageSectionsRendererProps {
  sections: PageSection[];
  anchors?: PageAnchor[];
}

export default function PageSectionsRenderer({ sections, anchors }: PageSectionsRendererProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-0">
      {sections.map((sec, idx) => {
        // Layout 1: 1 column with full-width background image
        if (sec.layout === 'full-bg-image') {
          return (
            <section 
              key={idx}
              className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden bg-zinc-950"
            >
              {/* Full-width image background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={sec.image}
                  alt={sec.h2}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-20 filter contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12] via-[#0c0e12]/92 to-[#0c0e12]" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0c0e12]/70 to-[#0c0e12]" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>BigCreek Quality Standards</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
                  {sec.h2}
                </h2>

                <div 
                  className="prose-dark text-base sm:text-lg text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sec.body }}
                />

                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-brand-600/30 hover:scale-105"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>Call {COMPANY_INFO.phoneDisplay}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </section>
          );
        }

        // Layout 2: FAQ interactive accordion
        if (sec.layout === 'faq') {
          return (
            <section 
              key={idx}
              className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#0e1118]"
            >
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                    Expertise & Answers
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                    {sec.h2}
                  </h2>
                </div>

                {sec.faqs && sec.faqs.length > 0 ? (
                  <div className="space-y-4">
                    {sec.faqs.map((faq, fIdx) => {
                      const isOpen = openFaqIdx === fIdx;
                      return (
                        <div 
                          key={fIdx}
                          className="rounded-2xl bg-[#141822] border border-white/10 overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => toggleFaq(fIdx)}
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
                            <div 
                              className="px-6 pb-6 pt-2 text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-white/5 bg-[#10141d]/50 animate-fade-in prose-dark"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div 
                    className="prose-dark"
                    dangerouslySetInnerHTML={{ __html: sec.body }}
                  />
                )}

                <div className="pt-4 text-center">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all shadow-lg shadow-brand-600/30 hover:scale-105"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>Have More Questions? Call {COMPANY_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </section>
          );
        }

        // Layout 3: 2 Columns (Image Left, Text Right)
        if (sec.layout === 'two-column-image-left') {
          return (
            <section 
              key={idx}
              className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#0c0e12]"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Column 1: Image */}
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#141822] shadow-2xl group">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={sec.image}
                          alt={sec.h2}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 via-transparent to-transparent" />
                      </div>
                      <div className="p-4 border-t border-white/10 bg-[#121620] flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-300">BigCreek Concrete Alpharetta</span>
                        <span className="text-brand-400 font-bold">Engineered Quality</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: H2 and Paragraph */}
                  <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span>Turnkey Solutions</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
                      {sec.h2}
                    </h2>

                    <div 
                      className="prose-dark leading-relaxed text-zinc-300"
                      dangerouslySetInnerHTML={{ __html: sec.body }}
                    />

                    <div className="pt-2">
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all shadow-lg shadow-brand-600/30 hover:scale-105"
                      >
                        <Phone className="w-4 h-4 fill-white" />
                        <span>Call For Estimate: {COMPANY_INFO.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        }

        // Layout 4: 2 Columns (Text Left, Image Right)
        return (
          <section 
            key={idx}
            className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#0e1118]"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Column 1: H2 and Paragraph */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span>Artisanal Craftsmanship</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
                    {sec.h2}
                  </h2>

                  <div 
                    className="prose-dark leading-relaxed text-zinc-300"
                    dangerouslySetInnerHTML={{ __html: sec.body }}
                  />

                  <div className="pt-2">
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm transition-all shadow-lg shadow-brand-600/30 hover:scale-105"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>Call {COMPANY_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>

                {/* Column 2: Image */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#141822] shadow-2xl group">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={sec.image}
                        alt={sec.h2}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 border-t border-white/10 bg-[#121620] flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-300">BigCreek Concrete Alpharetta</span>
                      <span className="text-brand-400 font-bold">Precision Execution</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* Anchors verification / reference box */}
      {anchors && anchors.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0c10] border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-3">
              Referenced Resources & Internal Links
            </h3>
            <div className="flex flex-wrap gap-2">
              {anchors.map((anc, aIdx) => (
                <a
                  key={aIdx}
                  href={anc.url}
                  target={anc.type === 'external' ? '_blank' : undefined}
                  rel={anc.type === 'external' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-500/20 text-xs font-medium text-zinc-300 hover:text-brand-300 border border-white/10 transition-colors"
                >
                  <span>{anc.text}</span>
                  <ArrowRight className="w-3 h-3 text-brand-500" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
