import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/contact/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Contact BigCreek Concrete Alpharetta | Free Concrete Estimates',
  description: pageData?.metaDesc || 'Contact BigCreek Concrete Alpharetta at +16785786829 or visit 3200 Webb Bridge Rd, Alpharetta, GA 30005 for a free residential or commercial concrete estimate.',
};

export default function ContactPage() {
  const parsed = parsePageSections(pageData.html);

  return (
    <div className="min-h-screen">
      <HeroSection 
        h1={parsed.h1}
        heroBody={parsed.heroBody}
        badge="Direct Phone Communication • Free Consultation"
        imageSrc="/images/about-hero.webp"
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={pageData.anchors} 
      />
    </div>
  );
}
