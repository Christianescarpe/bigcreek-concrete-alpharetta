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

export function generateMetadata({ params }: CityPageProps): Metadata {
  const slug = `/service-areas/${params.city}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/service-areas/${params.city}`);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDesc,
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

  return (
    <div className="min-h-screen">
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
