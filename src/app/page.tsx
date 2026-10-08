import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import { getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';
import LocationsGrid from '@/components/LocationsGrid';

const pageData = getPageBySlug('/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Contractor Alpharetta GA',
  description: pageData?.metaDesc || 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs. Call +16785786829 for a free estimate.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: pageData?.seoTitle || 'Concrete Contractor Alpharetta GA',
    description: pageData?.metaDesc || 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs.',
    url: `${CANONICAL_DOMAIN}/`,
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'BigCreek Concrete Alpharetta' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData?.seoTitle || 'Concrete Contractor Alpharetta GA',
    description: pageData?.metaDesc || 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs.',
    images: ['/images/hero.webp']
  }
};

export default function HomePage() {
  const parsed = parsePageSections(pageData.html);

  // Extract FAQs for FAQPage schema if available
  const allFaqs = parsed.sections.flatMap(s => s.faqs || []);
  const faqSchema = allFaqs.length > 0 ? getFaqSchema(allFaqs) : null;

  return (
    <div className="min-h-screen">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

