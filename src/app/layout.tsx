import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileCallBar from '@/components/MobileCallBar';

export const metadata: Metadata = {
  title: 'Concrete Contractor Alpharetta GA | BigCreek Concrete Alpharetta',
  description: 'BigCreek Concrete Alpharetta is an Alpharetta, GA concrete contractor for driveways, patios, stamped concrete and repairs. Call +16785786829 for a free estimate.',
  metadataBase: new URL('https://bigcreekconcretealpharetta.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
