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
  title: 'Usamah Moin — UI/UX Designer',
  description: 'The UI/UX portfolio of Usamah Moin: eleven polished product concepts spanning dashboards, culture, travel, finance, and collaboration.',
  openGraph: {
    title: 'Usamah Moin — UI/UX Designer',
    description: 'Eleven polished product concepts shaped with clarity, character, and human-centered interaction.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usamah Moin — UI/UX Designer',
    description: 'Eleven polished product concepts shaped with clarity, character, and human-centered interaction.',
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
