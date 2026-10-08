import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';
import LocationsGrid from '@/components/LocationsGrid';

const pageData = getPageBySlug('/service-areas/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Contractor Service Areas | BigCreek Concrete Alpharetta',
  description: pageData?.metaDesc || 'Concrete contractor serving Alpharetta, Sandy Springs, Roswell, Johns Creek, Brookhaven and surrounding North Atlanta communities. Call +16785786829.',
};

export default function ServiceAreasPage() {
  const parsed = parsePageSections(pageData.html);

  return (
    <div className="min-h-screen">
      <HeroSection 
        h1={parsed.h1}
        heroBody={parsed.heroBody}
        imageSrc="/images/about-hero.webp"
        badge="Service Areas • North Fulton & Greater Atlanta"
      />

      {/* Grid of all 9 dedicated location pages */}
      <LocationsGrid />

      {/* Detailed sections from the sheet */}
      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={pageData.anchors} 
      />
    </div>
  );
}
