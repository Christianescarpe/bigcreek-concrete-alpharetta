import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';
import { getLocalBusinessSchema, getWebSiteSchema, CANONICAL_DOMAIN } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_DOMAIN),
  title: {
    default: 'Concrete Contractor Alpharetta GA',
    template: '%s'
  },
  description: 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs. Call +16785786829 for a free estimate.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_DOMAIN,
    siteName: 'BigCreek Concrete Alpharetta',
    title: 'Concrete Contractor Alpharetta GA',
    description: 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs. Call +16785786829 for a free estimate.',
    images: [
      {
        url: '/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'BigCreek Concrete Alpharetta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concrete Contractor Alpharetta GA',
    description: 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs. Call +16785786829 for a free estimate.',
    images: ['/images/hero.webp'],
  },
  verification: {
    google: 'So48Rskoo0ouM8R9UIquT_NgnTnWATfhMe_oOF_hBA0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJson = JSON.stringify(getLocalBusinessSchema());
  const webSiteJson = JSON.stringify(getWebSiteSchema());

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: localBusinessJson }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webSiteJson }}
        />
      </head>
      <body className="min-h-screen bg-[#0c0e12] text-zinc-100 flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}

