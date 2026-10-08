import React from 'react';
import Image from 'next/image';
import { Phone, ArrowRight, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface HeroSectionProps {
  h1: string;
  heroBody: string;
  imageSrc?: string;
  badge?: string;
}

export default function HeroSection({
  h1,
  heroBody,
  imageSrc = '/images/hero.webp',
  badge = "BigCreek Concrete Alpharetta",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0c0e12] py-16 sm:py-24 border-b border-white/10">
      
      {/* Background image on hero section with 50 percent opacity as requested */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={h1}
          fill
          sizes="100vw"
          className="object-cover opacity-50 filter contrast-110 brightness-75"
          priority
        />
        {/* Gradient overlays to maintain sleek dark aesthetic and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12]/95 via-[#0c0e12]/85 to-[#0c0e12]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e12]/50 via-transparent to-[#0c0e12]" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: H1 and Intro from the sheet */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>{badge}</span>
            </div>

            {/* H1 strictly from the sheet */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.15] drop-shadow-md">
              {h1}
            </h1>

            {/* Intro paragraph directly from the sheet */}
            {heroBody && (
              <div 
                className="prose-dark text-base sm:text-lg text-zinc-200 leading-relaxed max-w-2xl drop-shadow-sm"
                dangerouslySetInnerHTML={{ __html: heroBody }}
              />
            )}

            {/* Phone Button CTA only - per prompt specification */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-base sm:text-lg transition-all shadow-xl shadow-brand-600/40 hover:shadow-brand-600/60 hover:scale-105 active:scale-95 text-center"
              >
                <Phone className="w-5 h-5 fill-white animate-bounce" />
                <span>Call {COMPANY_INFO.phoneDisplay}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 px-2 justify-center sm:justify-start backdrop-blur-sm bg-black/30 py-2 rounded-full border border-white/10">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card matching STRUCTURA */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-amber-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#141822]/90 backdrop-blur-md shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={imageSrc}
                    alt={h1}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-70" />
                </div>
                
                <div className="p-6 space-y-2 relative">
                  <div className="flex items-center justify-between text-xs text-brand-400 font-bold uppercase tracking-wider">
                    <span>Structural Concrete & Architectural Flatwork</span>
                    <span>Alpharetta, GA</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-zinc-300">American Concrete Institute (ACI) Standards</span>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
                    >
                      <span>Call Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
