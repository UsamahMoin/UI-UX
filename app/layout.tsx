import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://atelier-index-ui-ux.usamahmoin.chatgpt.site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'Usamah Moin — Engineer with Taste',
  description: 'The interface portfolio of Usamah Moin: an engineer exploring product thinking, technical prototypes, visual systems, and design critique.',
  openGraph: {
    title: 'Usamah Moin — Engineer with Taste',
    description: 'Eleven working interface studies where engineering judgment meets a strong visual point of view.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usamah Moin — Engineer with Taste',
    description: 'Eleven working interface studies where engineering judgment meets a strong visual point of view.',
    images: [],
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
