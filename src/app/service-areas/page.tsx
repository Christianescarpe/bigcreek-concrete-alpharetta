import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import { getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';
import LocationsGrid from '@/components/LocationsGrid';

const pageData = getPageBySlug('/service-areas/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Contractor Service Areas',
  description: pageData?.metaDesc || 'Concrete contractor serving Alpharetta, Sandy Springs, Roswell, Johns Creek, Brookhaven and surrounding North Atlanta communities. Call +16785786829.',
  alternates: {
    canonical: '/service-areas/',
  },
  openGraph: {
    title: pageData?.seoTitle || 'Concrete Contractor Service Areas',
    description: pageData?.metaDesc || 'Concrete contractor serving Alpharetta, Sandy Springs, Roswell, Johns Creek, Brookhaven and surrounding North Atlanta communities.',
    url: `${CANONICAL_DOMAIN}/service-areas/`,
    images: [{ url: '/images/about-hero.webp', width: 1200, height: 630, alt: 'Concrete Contractor Service Areas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData?.seoTitle || 'Concrete Contractor Service Areas',
    description: pageData?.metaDesc || 'Concrete contractor serving Alpharetta, Sandy Springs, Roswell, Johns Creek, Brookhaven and surrounding North Atlanta communities.',
    images: ['/images/about-hero.webp'],
  },
};

export default function ServiceAreasPage() {
  const parsed = parsePageSections(pageData.html);

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/service-areas/' }
  ]);

  const allFaqs = parsed.sections.flatMap(s => s.faqs || []);
  const faqSchema = allFaqs.length > 0 ? getFaqSchema(allFaqs) : null;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

