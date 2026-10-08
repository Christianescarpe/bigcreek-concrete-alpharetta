import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Layers, Award, CheckCircle } from 'lucide-react';

const capabilities = [
  {
    title: 'ACI FLATWORK STANDARDS',
    subtitle: 'ENGINEERED SPECIFICATIONS',
    description: 'Strict adherence to American Concrete Institute guidelines for slump control, joint spacing intervals, and curing membrane applications.',
    image: '/images/cap-safety.webp',
    icon: ShieldCheck
  },
  {
    title: 'RED CLAY SOIL MASTERY',
    subtitle: 'GEOLOGICAL INTEGRITY',
    description: 'Expert grading and mechanical compaction of Graded Aggregate Base (GAB) to withstand expansive Georgia red clay shrink-swell cycles.',
    image: '/images/cap-soil.webp',
    icon: Layers
  },
  {
    title: 'HIGH-STRENGTH CONCRETE',
    subtitle: '3,500 - 4,000+ PSI MIXES',
    description: 'Reinforced with rebar grids and fiber mesh tailored for heavy vehicle loads, weather extremes, and long-term crack resistance.',
    image: '/images/cap-quality.webp',
    icon: Award
  },
  {
    title: 'TURNKEY EXECUTION',
    subtitle: 'IN-HOUSE CRAFTSMANSHIP',
    description: 'Complete management from site excavation and laser leveling to artisanal stamping, broom finishes, and protective sealing.',
    image: '/images/cap-equipment.webp',
    icon: CheckCircle
  }
];

export default function CapabilitiesSection() {
  return (
    <section className="py-20 bg-[#0c0e12] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching top-right of STRUCTURA */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
            OUR VALUES • STRUCTURAL INTEGRITY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Core Capabilities
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Engineered to exceed standard residential building codes with proven craftsmanship designed specifically for North Fulton County terrain.
          </p>
        </div>

        {/* 4 Cards Grid matching template */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                className="bg-[#141822] rounded-2xl border border-white/10 hover:border-brand-500/50 overflow-hidden flex flex-col group transition-all duration-300 shadow-xl"
              >
                <div className="aspect-[16/11] relative overflow-hidden bg-zinc-900">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141822] via-[#141822]/30 to-transparent" />
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-brand-400 border border-white/10">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">
                      {cap.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-brand-300 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-300">
                    <span>BigCreek Quality</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
