import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import { getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/gallery/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Concrete Project Gallery',
  description: pageData?.metaDesc || 'View photos of concrete driveways, patios, stamped concrete, walkways and commercial flatwork completed by BigCreek Concrete Alpharetta. Call +16785786829.',
  alternates: {
    canonical: '/gallery/',
  },
  openGraph: {
    title: pageData?.seoTitle || 'Concrete Project Gallery',
    description: 'View photos of concrete driveways, patios, stamped concrete and commercial flatwork completed by BigCreek Concrete Alpharetta.',
    url: `${CANONICAL_DOMAIN}/gallery/`,
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Concrete Project Gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData?.seoTitle || 'Concrete Project Gallery',
    description: 'View photos of concrete driveways, patios, stamped concrete and commercial flatwork completed by BigCreek Concrete Alpharetta.',
    images: ['/images/hero.webp'],
  },
};

export default function GalleryPage() {
  const parsed = parsePageSections(pageData.html);

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery/' }
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

