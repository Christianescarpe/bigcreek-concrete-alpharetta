import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import { getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/concrete-services/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Services in Alpharetta, GA',
  description: pageData?.metaDesc || 'Explore concrete services from BigCreek Concrete Alpharetta. Driveways, patios, stamped concrete, slabs and repairs. Call +16785786829 for an estimate.',
  alternates: {
    canonical: '/concrete-services/',
  },
  openGraph: {
    title: pageData?.seoTitle || 'Concrete Services in Alpharetta, GA',
    description: pageData?.metaDesc || 'Explore concrete services from BigCreek Concrete Alpharetta.',
    url: `${CANONICAL_DOMAIN}/concrete-services/`,
    images: [{ url: '/images/services-hero.webp', width: 1200, height: 630, alt: 'Concrete Services in Alpharetta GA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData?.seoTitle || 'Concrete Services in Alpharetta, GA',
    description: pageData?.metaDesc || 'Explore concrete services from BigCreek Concrete Alpharetta.',
    images: ['/images/services-hero.webp'],
  },
};

export default function ConcreteServicesPage() {
  const parsed = parsePageSections(pageData.html);

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete-services/' }
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

