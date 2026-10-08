import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import { getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/about/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'About BigCreek Concrete Alpharetta',
  description: pageData?.metaDesc || 'Learn about BigCreek Concrete Alpharetta, an Alpharetta, GA concrete contractor focused on quality prep, honest advice and durable residential and commercial work.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: pageData?.seoTitle || 'About BigCreek Concrete Alpharetta',
    description: pageData?.metaDesc || 'Learn about BigCreek Concrete Alpharetta, an Alpharetta, GA concrete contractor.',
    url: `${CANONICAL_DOMAIN}/about/`,
    images: [{ url: '/images/about-hero.webp', width: 1200, height: 630, alt: 'About BigCreek Concrete Alpharetta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData?.seoTitle || 'About BigCreek Concrete Alpharetta',
    description: pageData?.metaDesc || 'Learn about BigCreek Concrete Alpharetta, an Alpharetta, GA concrete contractor.',
    images: ['/images/about-hero.webp'],
  },
};

export default function AboutPage() {
  const parsed = parsePageSections(pageData.html);

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about/' }
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
        badge="About BigCreek Concrete • Alpharetta, GA"
        imageSrc="/images/about-hero.webp"
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={pageData.anchors} 
      />
    </div>
  );
}

