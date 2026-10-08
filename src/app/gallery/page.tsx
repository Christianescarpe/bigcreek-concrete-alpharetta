import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/gallery/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Project Gallery | BigCreek Concrete Alpharetta',
  description: pageData?.metaDesc || 'View photos of concrete driveways, patios, stamped concrete, walkways and commercial flatwork completed by BigCreek Concrete Alpharetta. Call +16785786829.',
};

export default function GalleryPage() {
  const parsed = parsePageSections(pageData.html);

  return (
    <div className="min-h-screen">
      <HeroSection 
        h1={parsed.h1}
        heroBody={parsed.heroBody}
        badge="Completed Work Portfolio • Alpharetta, GA"
        imageSrc="/images/hero.webp"
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={pageData.anchors} 
      />
    </div>
  );
}
