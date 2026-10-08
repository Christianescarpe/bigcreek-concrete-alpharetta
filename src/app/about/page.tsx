import React from 'react';
import { Metadata } from 'next';
import { getPageBySlug, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

const pageData = getPageBySlug('/about/')!;

export const metadata: Metadata = {
  title: pageData?.seoTitle || 'About BigCreek Concrete Alpharetta | Alpharetta, GA Concrete Contractor',
  description: pageData?.metaDesc || 'Learn about BigCreek Concrete Alpharetta, an Alpharetta, GA concrete contractor focused on quality prep, honest advice and durable residential and commercial work.',
};

export default function AboutPage() {
  const parsed = parsePageSections(pageData.html);

  return (
    <div className="min-h-screen">
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
