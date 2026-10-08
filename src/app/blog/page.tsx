import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import BlogGrid from '@/components/BlogGrid';

export const metadata: Metadata = {
  title: 'Concrete Guides & Knowledge Base',
  description: 'Expert guides, driveway cost breakdowns, stamped concrete comparisons, curing timelines and crack prevention tips from BigCreek Concrete Alpharetta.',
};

export default function BlogHubPage() {
  return (
    <div className="min-h-screen">
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
