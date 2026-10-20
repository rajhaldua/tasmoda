import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Tasmoda — Sculptural Luxury Home Decor & Objects',
  description:
    'Curated architectural home decor, sculptural ceramics, Italian travertine furniture, and minimalist artisanal accents.',
  keywords: [
    'luxury home decor',
    'travertine coffee table',
    'sculptural lighting',
    'minimalist interior design',
    'artisanal furniture',
    'Tasmoda',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1C1917] font-sans antialiased selection:bg-[#9E7D56] selection:text-white">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
