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
  title: 'Tasmoda — Luxury Curtains, Hand-Knotted Rugs & Normandy Bedding',
  description:
    'Artisanal Belgian linen curtains, tactile bouclé pillow covers, Moroccan Berber rugs, and stone-washed French linen bedsheets. Express delivery with Razorpay.',
  keywords: [
    'luxury linen curtains',
    'blackout drapes',
    'bouclé cushion covers',
    'berber rugs',
    'french bedsheets',
    'home decor',
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
