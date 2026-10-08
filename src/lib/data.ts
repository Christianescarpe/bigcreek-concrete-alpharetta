import pagesData from '../../data/pages.json';

export interface PageAnchor {
  type: 'internal' | 'external';
  text: string;
  url: string;
}

export interface PageData {
  id: number;
  pageTitle: string;
  seoTitle: string;
  metaDesc: string;
  slug: string;
  category: 'home' | 'service' | 'location' | 'blog' | 'general';
  html: string;
  anchors: PageAnchor[];
}

export const allPages: PageData[] = pagesData as PageData[];

export function getPageBySlug(slug: string): PageData | undefined {
  const normalized = slug.startsWith('/') ? slug : `/${slug}`;
  const withTrailing = normalized.endsWith('/') ? normalized : `${normalized}/`;
  const withoutTrailing = normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;

  return allPages.find(p => p.slug === normalized || p.slug === withTrailing || p.slug === withoutTrailing);
}

export function getAllServices(): PageData[] {
  return allPages.filter(p => 
    p.category === 'service' || 
    (p.slug.includes('concrete') && p.slug !== '/concrete-services/' && !p.slug.startsWith('/blog/'))
  );
}

export function getAllLocations(): PageData[] {
  return allPages.filter(p => p.category === 'location');
}

export function getAllBlogs(): PageData[] {
  return allPages.filter(p => p.category === 'blog');
}

export const COMPANY_INFO = {
  name: 'BigCreek Concrete Alpharetta',
  phone: '+16785786829',
  phoneDisplay: '(678) 578-6829',
  address: '3200 Webb Bridge Rd, Alpharetta, GA 30005, United States',
  mapIframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.5181979521253!2d-84.2642666!3d34.0757881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f59fae3a7359bb%3A0x8c0990d40cb2499!2sBigCreek%20Concrete%20Alpharetta!5e1!3m2!1sen!2sph!4v1791443068537!5m2!1sen!2sph'
};

export const serviceImages: Record<string, string> = {
  '/concrete-services/': '/images/services-hero.webp',
  '/concrete-driveways/': '/images/driveway.webp',
  '/concrete-driveway-replacement/': '/images/driveway-replacement.webp',
  '/concrete-patios/': '/images/patio.webp',
  '/stamped-concrete/': '/images/stamped-concrete.webp',
  '/decorative-concrete/': '/images/decorative-concrete.webp',
  '/concrete-walkways/': '/images/walkway.webp',
  '/concrete-steps/': '/images/steps.webp',
  '/concrete-slabs/': '/images/slabs.webp',
  '/concrete-foundations/': '/images/foundations.webp',
  '/concrete-retaining-walls/': '/images/retaining-walls.webp',
  '/concrete-pool-decks/': '/images/pool-decks.webp',
  '/concrete-repair/': '/images/concrete-repair.webp',
  '/concrete-resurfacing/': '/images/resurfacing.webp',
  '/commercial-concrete/': '/images/commercial.webp'
};

export const blogImages: Record<string, string> = {
  '/blog/concrete-driveway-cost/': '/images/blog-cost.webp',
  '/blog/driveway-repair-vs-replacement/': '/images/blog-replace-repair.webp',
  '/blog/stamped-concrete-vs-pavers/': '/images/blog-stamped-pavers.webp',
  '/blog/concrete-patio-cost/': '/images/blog-patio-cost.webp',
  '/blog/concrete-curing-time/': '/images/blog-cure.webp',
  '/blog/concrete-slab-thickness/': '/images/blog-thickness.webp',
  '/blog/prevent-concrete-cracks/': '/images/blog-cracks.webp'
};


export function getSectionImage(h2: string, index: number): string {
  const lower = h2.toLowerCase();
  if (lower.includes('driveway replacement') || lower.includes('replacement')) return '/images/driveway-replacement.webp';
  if (lower.includes('driveway')) return '/images/driveway.webp';
  if (lower.includes('patio') || lower.includes('backyard') || lower.includes('outdoor')) return '/images/patio.webp';
  if (lower.includes('stamped')) return '/images/stamped-concrete.webp';
  if (lower.includes('decorative') || lower.includes('colored')) return '/images/decorative-concrete.webp';
  if (lower.includes('walkway') || lower.includes('sidewalk') || lower.includes('step')) return '/images/walkway.webp';
  if (lower.includes('slab')) return '/images/slabs.webp';
  if (lower.includes('foundation') || lower.includes('footing')) return '/images/foundations.webp';
  if (lower.includes('retaining') || lower.includes('wall')) return '/images/retaining-walls.webp';
  if (lower.includes('pool')) return '/images/pool-decks.webp';
  if (lower.includes('repair') || lower.includes('crack') || lower.includes('restoration')) return '/images/concrete-repair.webp';
  if (lower.includes('resurfacing') || lower.includes('overlay')) return '/images/resurfacing.webp';
  if (lower.includes('commercial') || lower.includes('business')) return '/images/commercial.webp';
  if (lower.includes('standard') || lower.includes('aci') || lower.includes('quality') || lower.includes('values')) return '/images/cap-quality.webp';
  if (lower.includes('soil') || lower.includes('clay') || lower.includes('earth') || lower.includes('prep')) return '/images/cap-soil.webp';
  if (lower.includes('process') || lower.includes('consultation')) return '/images/process-consultation.webp';
  if (lower.includes('curing') || lower.includes('cure')) return '/images/process-cure.webp';
  if (lower.includes('community') || lower.includes('roots') || lower.includes('alpharetta') || lower.includes('area')) return '/images/about-hero.webp';
  
  const pool = [
    '/images/gallery-1.webp',
    '/images/gallery-2.webp',
    '/images/gallery-3.webp',
    '/images/gallery-4.webp',
    '/images/gallery-5.webp',
    '/images/gallery-6.webp',
    '/images/gallery-7.webp',
    '/images/gallery-8.webp',
    '/images/gallery-9.webp',
    '/images/gallery-10.webp',
    '/images/gallery-11.webp',
    '/images/gallery-12.webp'
  ];
  return pool[index % pool.length];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageSection {
  h2: string;
  body: string;
  image: string;
  layout: 'two-column-image-left' | 'two-column-image-right' | 'full-bg-image' | 'faq';
  faqs?: FaqItem[];
}

export interface ParsedPage {
  h1: string;
  heroBody: string;
  sections: PageSection[];
}

export function parsePageSections(html: string): ParsedPage {
  // Extract H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].trim() : '';

  // Get content after H1 up to first H2
  const afterH1 = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
  const firstH2Index = afterH1.search(/<h2[^>]*>/i);
  
  let heroBody = '';
  let rest = afterH1;
  if (firstH2Index !== -1) {
    heroBody = afterH1.substring(0, firstH2Index).trim();
    rest = afterH1.substring(firstH2Index).trim();
  } else {
    heroBody = afterH1;
    rest = '';
  }

  // Parse H2 sections
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const h2Matches: { h2: string; index: number; length: number }[] = [];
  let match;
  while ((match = h2Regex.exec(rest)) !== null) {
    h2Matches.push({
      h2: match[1].trim(),
      index: match.index,
      length: match[0].length
    });
  }

  const sections: PageSection[] = [];
  const layoutPattern: ('two-column-image-left' | 'full-bg-image' | 'two-column-image-right')[] = [
    'two-column-image-left',
    'full-bg-image',
    'two-column-image-right',
    'two-column-image-left',
    'full-bg-image',
    'two-column-image-right'
  ];

  for (let i = 0; i < h2Matches.length; i++) {
    const cur = h2Matches[i];
    const next = h2Matches[i + 1];
    const startIndex = cur.index + cur.length;
    const endIndex = next ? next.index : rest.length;
    const body = rest.substring(startIndex, endIndex).trim();

    const image = getSectionImage(cur.h2, i);

    // Check if this is an FAQ section with <h3> questions
    const hasH3 = /<h3[^>]*>/i.test(body);
    const isFaq = cur.h2.toLowerCase().includes('frequently asked questions') || cur.h2.toLowerCase().includes('faq');

    if (isFaq && hasH3) {
      // Extract FAQ items
      const faqs: FaqItem[] = [];
      const faqRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi;
      let fMatch;
      while ((fMatch = faqRegex.exec(body)) !== null) {
        faqs.push({
          question: fMatch[1].replace(/<[^>]+>/g, '').trim(),
          answer: fMatch[2].trim()
        });
      }

      sections.push({
        h2: cur.h2,
        body: body,
        image: image,
        layout: 'faq',
        faqs: faqs.length > 0 ? faqs : undefined
      });
    } else {
      const layout = layoutPattern[i % layoutPattern.length];
      sections.push({
        h2: cur.h2,
        body: body,
        image: image,
        layout: layout
      });
    }
  }

  return { h1, heroBody, sections };
}
