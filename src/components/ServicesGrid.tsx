import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO, serviceImages } from '@/lib/data';

interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  image?: string;
}

interface ServicesGridProps {
  title?: string;
  subtitle?: string;
  services?: ServiceItem[];
}

const defaultServices: ServiceItem[] = [
  {
    title: 'Concrete Driveways',
    slug: '/concrete-driveways/',
    description: 'Custom engineered residential concrete driveways built with reinforced 4,000 PSI mixes and compacted aggregate bases to resist cracking.',
    image: '/images/driveway.webp'
  },
  {
    title: 'Driveway Replacement',
    slug: '/concrete-driveway-replacement/',
    description: 'Full tear-out, soil subgrade correction, laser-guided grading, and brand new concrete driveway installation for sunken or cracked surfaces.',
    image: '/images/driveway-replacement.webp'
  },
  {
    title: 'Concrete Patios',
    slug: '/concrete-patios/',
    description: 'Bespoke backyard living spaces, outdoor dining areas, and patio expansions customized to harmonize with your landscape.',
    image: '/images/patio.webp'
  },
  {
    title: 'Stamped Concrete',
    slug: '/stamped-concrete/',
    description: 'Artisanal decorative patterns replicating natural slate, cobblestone, flagstone, and wood plank textures with UV-stable integral color.',
    image: '/images/stamped-concrete.webp'
  },
  {
    title: 'Decorative Concrete',
    slug: '/decorative-concrete/',
    description: 'Architectural enhancements including salt finishes, broom borders, acid staining, and colored hardeners for distinct curb appeal.',
    image: '/images/decorative-concrete.webp'
  },
  {
    title: 'Concrete Walkways',
    slug: '/concrete-walkways/',
    description: 'Safe, durable, and inviting front walkways, garden paths, and commercial sidewalks built with smooth transitions and ADA compliance.',
    image: '/images/walkway.webp'
  },
  {
    title: 'Concrete Steps',
    slug: '/concrete-steps/',
    description: 'Monolithic poured steps and stoops featuring code-compliant riser heights, uniform tread depths, and non-slip broom textures.',
    image: '/images/steps.webp'
  },
  {
    title: 'Concrete Slabs',
    slug: '/concrete-slabs/',
    description: 'Precision engineered slabs for detached garages, storage sheds, workshops, trash enclosures, and heavy equipment pads.',
    image: '/images/slabs.webp'
  },
  {
    title: 'Concrete Foundations',
    slug: '/concrete-foundations/',
    description: 'Continuous spread footings, stem walls, and monolithic slab foundations designed to carry maximum residential structural loads.',
    image: '/images/foundations.webp'
  },
  {
    title: 'Concrete Retaining Walls',
    slug: '/concrete-retaining-walls/',
    description: 'Heavy-duty poured concrete retaining structures designed to stabilize Georgia red clay slopes and prevent hillside erosion.',
    image: '/images/retaining-walls.webp'
  },
  {
    title: 'Concrete Pool Decks',
    slug: '/concrete-pool-decks/',
    description: 'Slip-resistant, cool-temperature pool surrounds engineered to handle continuous moisture and pool chemicals.',
    image: '/images/pool-decks.webp'
  },
  {
    title: 'Commercial Concrete',
    slug: '/commercial-concrete/',
    description: 'Heavy duty commercial flatwork, loading docks, dumpster pads, retail walkways, and warehouse slabs built to rigid engineering specs.',
    image: '/images/commercial.webp'
  }
];

export default function ServicesGrid({
  title = "Concrete Services & Solutions",
  subtitle = "WHAT WE DO • BUILDING EXCELLENCE",
  services = defaultServices
}: ServicesGridProps) {
  return (
    <section className="py-20 bg-[#0c0e12] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching STRUCTURA */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
            {subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every project is engineered with high-strength concrete mixes, laser grade leveling, and meticulous finishing designed for Georgia soil conditions.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const imgSrc = svc.image || serviceImages[svc.slug] || '/images/hero.webp';
            return (
              <div 
                key={idx}
                className="group rounded-2xl bg-[#141822] border border-white/10 hover:border-brand-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-brand-900/20 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-zinc-900">
                  <Image
                    src={imgSrc}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141822] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-brand-400 uppercase tracking-wider border border-white/10">
                    Concrete Service
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                      <Link href={svc.slug}>
                        {svc.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                  </div>

                  {/* Actions: Link to service details & phone button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={svc.slug}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                    </Link>

                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-600/20 hover:bg-brand-600 text-brand-400 hover:text-white border border-brand-500/30 text-xs font-semibold transition-all"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Now</span>
                    </a>
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
