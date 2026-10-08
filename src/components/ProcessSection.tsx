import React from 'react';
import Image from 'next/image';
import { Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

const steps = [
  {
    num: '01',
    title: 'Comprehensive On-Site Consultation',
    description: 'We inspect your site, evaluate existing grade elevations, assess water drainage paths and native Piedmont clay conditions, and listen to your design vision.',
    image: '/images/process-consultation.webp'
  },
  {
    num: '02',
    title: 'Clear Engineering Specifications',
    description: 'We detail slab thickness (4" to 6"+), rebar size (#3 or #4 steel grid), concrete mix PSI (3,500 to 4,000+ PSI), base gravel compaction depth, and control joint cut layouts.',
    image: '/images/process-specs.webp'
  },
  {
    num: '03',
    title: 'Meticulous Site Preparation',
    description: 'We excavate down to virgin subgrade, remove organic roots, install and mechanically compact Graded Aggregate Base (GAB), and stake laser-aligned formwork.',
    image: '/images/process-prep.webp'
  },
  {
    num: '04',
    title: 'Skilled Pouring and Finishing',
    description: 'Certified ready-mix trucks deliver optimal slump concrete. Our lead finishers place, screed, float, and edge the concrete, applying your selected broom, swirl, or stamped finish.',
    image: '/images/process-pour.webp'
  },
  {
    num: '05',
    title: 'Controlled Curing and Cleanup',
    description: 'We apply professional curing membrane compounds, saw-cut expansion control joints within the critical curing window, clean up the job site thoroughly, and conduct a joint inspection.',
    image: '/images/process-cure.webp'
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-[#0e1118] relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
            OUR PROCESS • PROJECT LIFECYCLE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            How We Build Lasting Foundations
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From initial elevation laser checks to controlled curing cuts, our 5-stage engineering lifecycle guarantees long-term durability on North Georgia clay soils.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((st, idx) => (
            <div 
              key={idx}
              className="bg-[#141822] rounded-2xl border border-white/10 p-6 flex flex-col justify-between group hover:border-brand-500/50 transition-all duration-300 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-brand-500/80 group-hover:text-brand-400 transition-colors">
                    {st.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                  <Image
                    src={st.image}
                    alt={st.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Phase {st.num}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 bg-[#181d28] rounded-2xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">
              Ready to schedule your on-site concrete consultation?
            </h4>
            <p className="text-sm text-zinc-400">
              Speak directly with an experienced project estimator at BigCreek Concrete Alpharetta.
            </p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-base transition-all shadow-xl shadow-brand-600/30 hover:scale-105 flex-shrink-0"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Call {COMPANY_INFO.phoneDisplay}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
