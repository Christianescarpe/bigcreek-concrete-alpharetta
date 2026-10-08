import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

const locations = [
  { name: 'Alpharetta, GA', slug: '/service-areas/alpharetta-ga/', note: 'Headquarters & Primary Service Hub' },
  { name: 'Sandy Springs, GA', slug: '/service-areas/sandy-springs-ga/', note: 'Residential & Commercial Flatwork' },
  { name: 'Roswell, GA', slug: '/service-areas/roswell-ga/', note: 'Historic & Modern Concrete Restorations' },
  { name: 'Johns Creek, GA', slug: '/service-areas/johns-creek-ga/', note: 'Subdivision Driveways & Stamped Patios' },
  { name: 'Peachtree Corners, GA', slug: '/service-areas/peachtree-corners-ga/', note: 'Residential & Business Park Concrete' },
  { name: 'Brookhaven, GA', slug: '/service-areas/brookhaven-ga/', note: 'Custom Patios, Driveways & Retaining Walls' },
  { name: 'Chamblee, GA', slug: '/service-areas/chamblee-ga/', note: 'Turnkey Residential & Commercial Work' },
  { name: 'Doraville, GA', slug: '/service-areas/doraville-ga/', note: 'High-Strength Slabs, Sump & Foundations' },
  { name: 'Norcross, GA', slug: '/service-areas/norcross-ga/', note: 'Commercial Pads & Driveway Replacement' },
];

export default function LocationsGrid() {
  return (
    <section className="py-20 bg-[#0e1118] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
            LOCAL PRESENCE • NORTH ATLANTA METRO
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Service Areas
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            BigCreek Concrete Alpharetta proudly serves homeowners, builders, and commercial enterprises across North Fulton, Gwinnett, and DeKalb counties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, idx) => (
            <div 
              key={idx}
              className="bg-[#141822] rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-brand-500/50 hover:bg-[#181e2b] transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Georgia
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                  <Link href={loc.slug}>
                    {loc.name}
                  </Link>
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {loc.note}. Fully equipped crews for driveways, patios, retaining walls, and commercial flatwork.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={loc.slug}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 group-hover:text-brand-300 transition-colors"
                >
                  <span>Explore City Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="p-2 rounded-full bg-white/5 hover:bg-brand-600 text-zinc-300 hover:text-white transition-colors"
                  aria-label={`Call for ${loc.name}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
