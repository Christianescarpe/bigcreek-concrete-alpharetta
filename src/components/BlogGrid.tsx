import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { blogImages, getAllBlogs } from '@/lib/data';

export default function BlogGrid({ limit }: { limit?: number }) {
  const blogs = getAllBlogs();
  const displayed = limit ? blogs.slice(0, limit) : blogs;

  return (
    <section className="py-20 bg-[#0c0e12] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-400">
              ARTICLES & ADVICE • CONCRETE INSIGHTS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Expert Concrete Guides
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Practical guides on pricing factors, curing timelines, slab thicknesses, and crack prevention written by Georgia concrete specialists.
            </p>
          </div>

          {limit && (
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-colors self-start md:self-auto"
            >
              <span>View All 7 Articles</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((b, idx) => {
            const imgSrc = blogImages[b.slug] || '/images/hero.webp';
            return (
              <article 
                key={idx}
                className="bg-[#141822] rounded-2xl border border-white/10 hover:border-brand-500/50 overflow-hidden flex flex-col group transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-zinc-900">
                  <Image
                    src={imgSrc}
                    alt={b.pageTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141822] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-600/80 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                    Concrete Guide
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
                      <Link href={b.slug}>
                        {b.pageTitle}
                      </Link>
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {b.metaDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={b.slug}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 group-hover:text-brand-300 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Full Guide</span>
                    </Link>
                    <span className="text-[11px] text-zinc-400">Alpharetta, GA</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
