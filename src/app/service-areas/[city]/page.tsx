import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getAllLocations, parsePageSections, getSectionImage } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

interface CityPageProps {
  params: {
    city: string;
  };
}

export function generateStaticParams() {
  const locations = getAllLocations();
  return locations
    .map(loc => {
      const parts = loc.slug.replace(/^\/service-areas\//, '').replace(/\/$/, '');
      return { city: parts };
    })
    .filter(p => p.city.length > 0);
}

import LocationsGrid from '@/components/LocationsGrid';
import { getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';

export function generateMetadata({ params }: CityPageProps): Metadata {
  const slug = `/service-areas/${params.city}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/service-areas/${params.city}`);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDesc,
    alternates: {
      canonical: slug,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDesc,
      url: `${CANONICAL_DOMAIN}${slug}`,
      images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: page.pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle,
      description: page.metaDesc,
      images: ['/images/hero.webp'],
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const slug = `/service-areas/${params.city}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/service-areas/${params.city}`);

  if (!page) {
    notFound();
  }

  const parsed = parsePageSections(page.html);
  const cleanTitle = page.pageTitle.replace(/^Concrete Contractor in /i, '');

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/service-areas/' },
    { name: cleanTitle, url: slug }
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
        imageSrc="/images/hero.webp"
        badge={`${cleanTitle} • Local Concrete Contractor`}
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={page.anchors} 
      />

      {/* Grid of all service areas */}
      <LocationsGrid />
    </div>
  );
}

