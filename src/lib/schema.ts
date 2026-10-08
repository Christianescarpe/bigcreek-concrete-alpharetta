import { FaqItem } from './data';

export const CANONICAL_DOMAIN = 'https://www.concretecontractoralpharetta.site';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    '@id': `${CANONICAL_DOMAIN}/#business`,
    name: 'BigCreek Concrete Alpharetta',
    alternateName: 'BigCreek Concrete',
    url: `${CANONICAL_DOMAIN}/`,
    logo: `${CANONICAL_DOMAIN}/images/hero.webp`,
    image: `${CANONICAL_DOMAIN}/images/hero.webp`,
    telephone: '+16785786829',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3200 Webb Bridge Rd',
      addressLocality: 'Alpharetta',
      addressRegion: 'GA',
      postalCode: '30005',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0757881,
      longitude: -84.2642666
    },
    hasMap: 'https://maps.google.com/?q=BigCreek+Concrete+Alpharetta+3200+Webb+Bridge+Rd+Alpharetta+GA+30005',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '07:00',
        closes: '18:00'
      }
    ],
    areaServed: [
      { '@type': 'City', name: 'Alpharetta', sameAs: 'https://en.wikipedia.org/wiki/Alpharetta,_Georgia' },
      { '@type': 'City', name: 'Sandy Springs' },
      { '@type': 'City', name: 'Roswell' },
      { '@type': 'City', name: 'Johns Creek' },
      { '@type': 'City', name: 'Peachtree Corners' },
      { '@type': 'City', name: 'Brookhaven' },
      { '@type': 'City', name: 'Chamblee' },
      { '@type': 'City', name: 'Doraville' },
      { '@type': 'City', name: 'Norcross' }
    ]
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_DOMAIN}/#website`,
    url: `${CANONICAL_DOMAIN}/`,
    name: 'BigCreek Concrete Alpharetta',
    description: 'Premier concrete contractor in Alpharetta, GA for residential and commercial flatwork, driveways, patios, stamped concrete, and repairs.',
    publisher: {
      '@id': `${CANONICAL_DOMAIN}/#business`
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${CANONICAL_DOMAIN}${item.url}`
    }))
  };
}

export function getServiceSchema(name: string, description: string, url: string, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@id': `${CANONICAL_DOMAIN}/#business`
    },
    serviceType: 'Concrete Contracting',
    areaServed: {
      '@type': 'City',
      name: 'Alpharetta, GA'
    },
    url: `${CANONICAL_DOMAIN}${url}`,
    image: image ? `${CANONICAL_DOMAIN}${image}` : `${CANONICAL_DOMAIN}/images/hero.webp`
  };
}

export function getArticleSchema(title: string, description: string, url: string, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image ? `${CANONICAL_DOMAIN}${image}` : `${CANONICAL_DOMAIN}/images/hero.webp`,
    author: {
      '@type': 'Organization',
      name: 'BigCreek Concrete Alpharetta',
      url: `${CANONICAL_DOMAIN}/`
    },
    publisher: {
      '@id': `${CANONICAL_DOMAIN}/#business`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${CANONICAL_DOMAIN}${url}`
    }
  };
}

export function getFaqSchema(faqs: FaqItem[]) {

  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/<[^>]+>/g, '').trim()
      }
    }))
  };
}
