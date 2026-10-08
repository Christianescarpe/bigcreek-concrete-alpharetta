import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import BlogGrid from '@/components/BlogGrid';
import { getBreadcrumbSchema, CANONICAL_DOMAIN } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Concrete Guides & Knowledge Base',
  description: 'Expert guides, driveway cost breakdowns, stamped concrete comparisons, curing timelines and crack prevention tips from BigCreek Concrete Alpharetta.',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    title: 'Concrete Guides & Knowledge Base',
    description: 'Expert guides, driveway cost breakdowns, stamped concrete comparisons, curing timelines and crack prevention tips from BigCreek Concrete Alpharetta.',
    url: `${CANONICAL_DOMAIN}/blog/`,
    images: [{ url: '/images/services-hero.webp', width: 1200, height: 630, alt: 'Concrete Guides & Knowledge Base' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Guides & Knowledge Base',
    description: 'Expert guides, driveway cost breakdowns, stamped concrete comparisons, curing timelines and crack prevention tips from BigCreek Concrete Alpharetta.',
    images: ['/images/services-hero.webp'],
  },
};

export default function BlogHubPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog/' }
  ]);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <HeroSection 
        h1="Concrete Knowledge Base & Guides"
        heroBody="<p>Explore our collection of practical guides on concrete driveway costs, stamped concrete vs pavers, curing timelines, slab thicknesses, and crack prevention in Alpharetta, GA.</p>"
        badge="Concrete Articles & Technical Advice"
        imageSrc="/images/services-hero.webp"
      />

      <BlogGrid />
    </div>
  );
}

