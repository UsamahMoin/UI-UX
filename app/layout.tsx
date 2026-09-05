import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atelier-index-ui-ux.usamahmoin.chatgpt.site'),
  title: 'Atelier Index — UI/UX Portfolio',
  description: 'A collection of expressive digital products, interfaces, and design experiments.',
  openGraph: {
    title: 'Atelier Index — UI/UX Portfolio',
    description: 'Eleven expressive digital products, interfaces, and design experiments.',
    images: [{ url: '/og.png', width: 1733, height: 907, alt: 'Interfaces with a point of view — Atelier Index' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atelier Index — UI/UX Portfolio',
    description: 'Eleven expressive digital products, interfaces, and design experiments.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
