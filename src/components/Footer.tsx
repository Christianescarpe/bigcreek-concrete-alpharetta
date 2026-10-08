import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, HardHat, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#080a0e] text-zinc-400 border-t border-white/10 relative overflow-hidden">
      
      {/* Map Section embedded in Footer as requested */}
      <div className="border-b border-white/10 bg-[#0e1117] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Or Call Our Alpharetta Headquarters</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                BigCreek Concrete Alpharetta
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Centrally located to serve residential and commercial concrete needs across Alpharetta, Fulton County, and North Atlanta.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-200 text-sm">
                    {COMPANY_INFO.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">
                    Monday - Saturday: 7:00 AM - 6:00 PM
                  </span>
                </div>
              </div>

              {/* Phone CTA button only - no contact form */}
              <div className="pt-4">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-base transition-all shadow-xl shadow-brand-600/30 hover:scale-105"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Call {COMPANY_INFO.phoneDisplay}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7">
              <div className="w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80 aspect-[16/10] sm:aspect-[16/9] relative bg-zinc-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.5181979521253!2d-84.2642666!3d34.0757881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59fae3a7359bb%3A0x8c0990d40cb2499!2sBigCreek%20Concrete%20Alpharetta!5e1!3m2!1sen!2sph!4v1791443068537!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="BigCreek Concrete Alpharetta Location Map"
                  className="w-full h-full grayscale-[20%] contrast-110"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-600/30">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white uppercase">
                BigCreek Concrete
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Premier local concrete contractor headquartered in Alpharetta, GA. Dedicated to high-strength engineering, precision formwork, and durable residential & commercial installations.
            </p>
            <div className="pt-2">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-brand-600/20 text-brand-400 border border-brand-500/30 hover:border-brand-500 text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4 fill-brand-400" />
                <span>Direct Phone: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Concrete Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/concrete-driveways/" className="hover:text-brand-400 transition-colors">Concrete Driveways</Link></li>
              <li><Link href="/concrete-driveway-replacement/" className="hover:text-brand-400 transition-colors">Driveway Replacement</Link></li>
              <li><Link href="/concrete-patios/" className="hover:text-brand-400 transition-colors">Concrete Patios</Link></li>
              <li><Link href="/stamped-concrete/" className="hover:text-brand-400 transition-colors">Stamped Concrete</Link></li>
              <li><Link href="/decorative-concrete/" className="hover:text-brand-400 transition-colors">Decorative Concrete</Link></li>
              <li><Link href="/concrete-slabs/" className="hover:text-brand-400 transition-colors">Concrete Slabs</Link></li>
              <li><Link href="/concrete-foundations/" className="hover:text-brand-400 transition-colors">Concrete Foundations</Link></li>
              <li><Link href="/commercial-concrete/" className="hover:text-brand-400 transition-colors">Commercial Concrete</Link></li>
              <li><Link href="/concrete-services/" className="text-brand-400 font-semibold hover:underline">View All 15 Services →</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Service Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/service-areas/alpharetta-ga/" className="hover:text-brand-400 transition-colors">Alpharetta, GA</Link></li>
              <li><Link href="/service-areas/sandy-springs-ga/" className="hover:text-brand-400 transition-colors">Sandy Springs, GA</Link></li>
              <li><Link href="/service-areas/roswell-ga/" className="hover:text-brand-400 transition-colors">Roswell, GA</Link></li>
              <li><Link href="/service-areas/johns-creek-ga/" className="hover:text-brand-400 transition-colors">Johns Creek, GA</Link></li>
              <li><Link href="/service-areas/peachtree-corners-ga/" className="hover:text-brand-400 transition-colors">Peachtree Corners, GA</Link></li>
              <li><Link href="/service-areas/brookhaven-ga/" className="hover:text-brand-400 transition-colors">Brookhaven, GA</Link></li>
              <li><Link href="/service-areas/chamblee-ga/" className="hover:text-brand-400 transition-colors">Chamblee, GA</Link></li>
              <li><Link href="/service-areas/doraville-ga/" className="hover:text-brand-400 transition-colors">Doraville, GA</Link></li>
              <li><Link href="/service-areas/norcross-ga/" className="hover:text-brand-400 transition-colors">Norcross, GA</Link></li>
              <li><Link href="/service-areas/" className="text-brand-400 font-semibold hover:underline">View All 9 Service Areas →</Link></li>
            </ul>
          </div>

          {/* Articles & Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Guides & Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog/concrete-driveway-cost/" className="hover:text-brand-400 transition-colors">Driveway Cost Guide</Link></li>
              <li><Link href="/blog/driveway-repair-vs-replacement/" className="hover:text-brand-400 transition-colors">Repair vs. Replacement</Link></li>
              <li><Link href="/blog/stamped-concrete-vs-pavers/" className="hover:text-brand-400 transition-colors">Stamped vs Pavers</Link></li>
              <li><Link href="/blog/concrete-patio-cost/" className="hover:text-brand-400 transition-colors">Patio Cost Guide</Link></li>
              <li><Link href="/blog/concrete-curing-time/" className="hover:text-brand-400 transition-colors">Concrete Curing Times</Link></li>
              <li><Link href="/blog/" className="text-brand-400 font-semibold hover:underline">All Blog Articles →</Link></li>
              <li className="pt-2"><Link href="/gallery/" className="hover:text-white transition-colors">Project Gallery</Link></li>
              <li><Link href="/about/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact/" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} BigCreek Concrete Alpharetta. All rights reserved. 3200 Webb Bridge Rd, Alpharetta, GA 30005.</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${COMPANY_INFO.phone}`} className="text-brand-400 hover:text-brand-300 font-bold">
              Call {COMPANY_INFO.phoneDisplay}
            </a>
            <span className="text-zinc-400">American Concrete Institute (ACI) Flatwork Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
