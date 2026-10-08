import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import { getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/contact/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'Contact BigCreek Concrete Alpharetta',
  description: pageData?.metaDesc || 'Contact BigCreek Concrete Alpharetta at +16785786829 or visit 3200 Webb Bridge Rd, Alpharetta, GA 30005 for a free residential or commercial concrete estimate.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: pageData?.seoTitle || 'Contact BigCreek Concrete Alpharetta',
    description: 'Contact BigCreek Concrete Alpharetta at +16785786829 for a free estimate.',
    url: `${CANONICAL_DOMAIN}/contact/`,
    images: [{ url: '/images/about-hero.webp', width: 1200, height: 630, alt: 'Contact BigCreek Concrete Alpharetta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData?.seoTitle || 'Contact BigCreek Concrete Alpharetta',
    description: 'Contact BigCreek Concrete Alpharetta at +16785786829 for a free estimate.',
    images: ['/images/about-hero.webp'],
  },
};

export default function ContactPage() {
  const parsed = parsePageSections(pageData.html);

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact/' }
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

