import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/concrete-services/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Services in Alpharetta, GA',
  description: pageData?.metaDesc || 'Explore concrete services from BigCreek Concrete Alpharetta. Driveways, patios, stamped concrete, slabs and repairs. Call +16785786829 for an estimate.',
};

export default function ConcreteServicesPage() {
  const parsed = parsePageSections(pageData.html);

  return (
    <div className="min-h-screen">
      <HeroSection 
        h1={parsed.h1}
        heroBody={parsed.heroBody}
        imageSrc="/images/services-hero.webp"
        badge="Concrete Services • Alpharetta, GA"
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={pageData.anchors} 
      />
    </div>
  );
}
