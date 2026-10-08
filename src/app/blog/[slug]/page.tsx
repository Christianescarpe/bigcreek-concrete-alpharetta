import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getAllBlogs, blogImages, parsePageSections } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import PageSectionsRenderer from '@/components/PageSectionsRenderer';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map(b => {
    const slugPart = b.slug.replace(/^\/blog\//, '').replace(/\/$/, '');
    return { slug: slugPart };
  });
}

import { getArticleSchema, getBreadcrumbSchema, getFaqSchema, CANONICAL_DOMAIN } from '@/lib/schema';

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const slug = `/blog/${params.slug}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/blog/${params.slug}`);
  if (!page) return {};
  const imgSrc = blogImages[page.slug] || '/images/hero.webp';
  return {
    title: page.seoTitle,
    description: page.metaDesc,
    alternates: {
      canonical: slug,
    },
    openGraph: {
      type: 'article',
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = `/blog/${params.slug}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/blog/${params.slug}`);

  if (!page) {
    notFound();
  }

  const parsed = parsePageSections(page.html);
  const imgSrc = blogImages[page.slug] || '/images/hero.webp';

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog/' },
    { name: page.pageTitle, url: slug }
  ]);

  const articleSchema = getArticleSchema(page.pageTitle, page.metaDesc, slug, imgSrc);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
        badge="Concrete Guide & Practical Advice"
        imageSrc={imgSrc}
      />

      <PageSectionsRenderer 
        sections={parsed.sections} 
        anchors={page.anchors} 
      />
    </div>
  );
}

