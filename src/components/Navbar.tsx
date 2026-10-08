'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, X, ChevronDown, HardHat } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [locationsDropdown, setLocationsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase group-hover:text-brand-400 transition-colors">
                BigCreek Concrete
              </span>
              <span className="text-[11px] tracking-widest text-zinc-400 uppercase -mt-1 font-semibold">
                Alpharetta, GA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link 
              href="/" 
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link 
                href="/concrete-services/"
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-1"
              >
                Services
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </Link>
              {servicesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-[#141822] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                  <Link href="/concrete-services/" className="block px-4 py-2 text-xs font-bold text-brand-400 uppercase tracking-wider hover:bg-white/5">
                    All Concrete Services →
                  </Link>
                  <div className="h-px bg-white/10 my-1"></div>
                  <Link href="/concrete-driveways/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Concrete Driveways
                  </Link>
                  <Link href="/concrete-driveway-replacement/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Driveway Replacement
                  </Link>
                  <Link href="/concrete-patios/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Concrete Patios
                  </Link>
                  <Link href="/stamped-concrete/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Stamped Concrete
                  </Link>
                  <Link href="/decorative-concrete/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Decorative Concrete
                  </Link>
                  <Link href="/concrete-slabs/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Concrete Slabs
                  </Link>
                  <Link href="/concrete-foundations/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Concrete Foundations
                  </Link>
                  <Link href="/commercial-concrete/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Commercial Concrete
                  </Link>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setLocationsDropdown(true)}
              onMouseLeave={() => setLocationsDropdown(false)}
            >
              <Link 
                href="/service-areas/"
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-1"
              >
                Service Areas
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </Link>
              {locationsDropdown && (
                <div className="absolute top-full left-0 w-64 bg-[#141822] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                  <Link href="/service-areas/" className="block px-4 py-2 text-xs font-bold text-brand-400 uppercase tracking-wider hover:bg-white/5">
                    All Service Areas →
                  </Link>
                  <div className="h-px bg-white/10 my-1"></div>
                  <Link href="/service-areas/alpharetta-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Alpharetta, GA (HQ)
                  </Link>
                  <Link href="/service-areas/sandy-springs-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Sandy Springs, GA
                  </Link>
                  <Link href="/service-areas/roswell-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Roswell, GA
                  </Link>
                  <Link href="/service-areas/johns-creek-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Johns Creek, GA
                  </Link>
                  <Link href="/service-areas/peachtree-corners-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Peachtree Corners, GA
                  </Link>
                  <Link href="/service-areas/brookhaven-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Brookhaven, GA
                  </Link>
                  <Link href="/service-areas/chamblee-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Chamblee, GA
                  </Link>
                  <Link href="/service-areas/doraville-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Doraville, GA
                  </Link>
                  <Link href="/service-areas/norcross-ga/" className="block px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/5">
                    Norcross, GA
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/gallery/" 
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Gallery
            </Link>

            <Link 
              href="/blog/" 
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Blog
            </Link>

            <Link 
              href="/about/" 
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              About
            </Link>

            <Link 
              href="/contact/" 
              className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Phone Button CTA only - per prompt specification */}
          <div className="hidden sm:flex items-center">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white animate-pulse" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="p-2 rounded-full bg-brand-600 text-white hover:bg-brand-500"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5 fill-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10141d] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Home
          </Link>
          <Link 
            href="/concrete-services/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Concrete Services
          </Link>
          <Link 
            href="/service-areas/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Service Areas
          </Link>
          <Link 
            href="/gallery/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Project Gallery
          </Link>
          <Link 
            href="/blog/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Blog Articles
          </Link>
          <Link 
            href="/about/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            About Us
          </Link>
          <Link 
            href="/contact/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-200 hover:bg-white/5"
          >
            Contact
          </Link>
          <div className="pt-3 border-t border-white/10">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-bold text-center shadow-lg shadow-brand-600/30"
            >
              <Phone className="w-5 h-5 fill-white" />
              Call Now: {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
