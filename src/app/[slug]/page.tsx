import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, allPages, serviceImages, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return allPages
    .filter(p => 
      p.slug !== '/' &&
      p.slug !== '/concrete-services/' &&
      p.slug !== '/service-areas/' &&
      p.slug !== '/about/' &&
      p.slug !== '/contact/' &&
      p.slug !== '/gallery/' &&
      !p.slug.startsWith('/service-areas/') &&
      !p.slug.startsWith('/blog/')
    )
    .map(p => ({
      slug: p.slug.replace(/^\//, '').replace(/\/$/, '')
    }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const slug = `/${params.slug}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/${params.slug}`);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDesc,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const slug = `/${params.slug}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/${params.slug}`);

  if (!page) {
    notFound();
  }

  const parsed = parsePageSections(page.html);
  const imgSrc = serviceImages[page.slug] || '/images/hero.webp';

  return (
    <div className="min-h-screen">
      <HeroSection 
        h1={parsed.h1}
        heroBody={parsed.heroBody}
        badge="Specialized Concrete Solution • Alpharetta, GA"
        imageSrc={imgSrc}
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={page.anchors} 
      />
    </div>
  );
}
