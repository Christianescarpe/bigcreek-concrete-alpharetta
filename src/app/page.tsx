import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';
import LocationsGrid from '@/components/LocationsGrid';

const pageData = getPageBySlug('/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Contractor Alpharetta GA | BigCreek Concrete Alpharetta',
  description: pageData?.metaDesc || 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs. Call +16785786829 for a free estimate.',
};

export default function HomePage() {
  const parsed = parsePageSections(pageData.html);

  return (
    <div className="min-h-screen">
      <HeroSection 
        h1={parsed.h1}
        heroBody={parsed.heroBody}
        imageSrc="/images/hero.webp"
        badge="BigCreek Concrete Alpharetta • Alpharetta, GA"
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={pageData.anchors} 
      />

      {/* Explore All Local Service Areas */}
      <LocationsGrid />
    </div>
  );
}
