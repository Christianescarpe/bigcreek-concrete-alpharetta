import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, PageAnchor } from '@/lib/data';

interface HtmlContentProps {
  html: string;
  anchors?: PageAnchor[];
}

export default function HtmlContent({ html, anchors }: HtmlContentProps) {
  return (
    <div className="py-16 bg-[#0c0e12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Render HTML content directly from the sheet */}
        <article 
          className="prose-dark leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Anchors verification box / quick links */}
        {anchors && anchors.length > 0 && (
          <div className="mt-12 p-6 rounded-2xl bg-[#141822] border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-3">
              Referenced Resources & Internal Links
            </h4>
            <div className="flex flex-wrap gap-2">
              {anchors.map((anc, idx) => (
                <a
                  key={idx}
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
        )}

        {/* Call CTA block */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-brand-950/60 to-[#141822] border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              Speak With BigCreek Concrete Alpharetta
            </h3>
            <p className="text-sm text-zinc-300">
              Direct consultation and free on-site estimates across Alpharetta, GA.
            </p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-base transition-all shadow-lg shadow-brand-600/40 hover:scale-105 flex-shrink-0"
          >
            <Phone className="w-5 h-5 fill-white" />
            <span>Call {COMPANY_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
