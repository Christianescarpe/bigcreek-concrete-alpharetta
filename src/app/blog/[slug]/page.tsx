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

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const slug = `/blog/${params.slug}/`;
  const page = getPageBySlug(slug) || getPageBySlug(`/blog/${params.slug}`);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDesc,
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

  return (
    <div className="min-h-screen">
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
