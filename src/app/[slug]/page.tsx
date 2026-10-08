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

import { getServiceSchema, getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const slug = `/${params.slug}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/${params.slug}`);
  if (!page) return {};
  const imgSrc = serviceImages[page.slug] || '/images/hero.webp';
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
      images: [{ url: imgSrc, width: 1200, height: 630, alt: page.pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle,
      description: page.metaDesc,
      images: [imgSrc],
    },
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

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Concrete Services', url: '/concrete-services/' },
    { name: page.pageTitle, url: slug }
  ]);

  const serviceSchema = getServiceSchema(page.pageTitle, page.metaDesc, slug, imgSrc);

  const allFaqs = parsed.sections.flatMap(s => s.faqs || []);
  const faqSchema = allFaqs.length > 0 ? getFaqSchema(allFaqs) : null;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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

