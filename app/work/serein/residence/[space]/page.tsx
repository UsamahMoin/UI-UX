import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ImageGallery } from '@/components/image-gallery';
import { SiteFooter } from '@/components/site-footer';
import { BrandMark } from '@/components/brand-mark';
import { sitePath } from '@/lib/site-path';
import { getResidenceSpace, residenceSpaces } from '../content';

export function generateStaticParams() {
  return residenceSpaces.map(({ slug }) => ({ space: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ space: string }> }): Promise<Metadata> {
  const space = getResidenceSpace((await params).space);
  if (!space) return {};
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://atelier-index-ui-ux.usamahmoin.chatgpt.site';
  const image = new URL(sitePath(space.image), siteOrigin).toString();
  const description = `${space.invitation} ${space.introduction}`;
  return {
    title: `${space.name} | SEREIN`,
    description,
    openGraph: { title: `${space.name} | SEREIN`, description, images: [image] },
    twitter: { title: `${space.name} | SEREIN`, description, images: [image] },
  };
}

export default async function ResidenceSpacePage({ params }: { params: Promise<{ space: string }> }) {
  const { space: slug } = await params;
  const space = getResidenceSpace(slug);
  if (!space) notFound();
  const current = residenceSpaces.findIndex((item) => item.slug === slug);
  const next = residenceSpaces[(current + 1) % residenceSpaces.length];

  return (
    <main className={`residence-detail residence-detail-${space.slug}`}>
      <nav className="residence-detail-nav">
        <a href={sitePath(`/work/serein/residence#ritual-${slug}`)}><ArrowLeft /> The residence</a>
        <a className="residence-wordmark" href={sitePath('/work/serein/residence')}><BrandMark slug="serein"/>SEREIN</a>
        <span>{space.number} / 03</span>
      </nav>
      <header className="residence-detail-hero">
        <Image unoptimized width={1536} height={1024} src={sitePath(space.image)} alt={space.alt} />
        <div className="residence-detail-shade" />
        <div><span>RITUAL {space.number}</span><h1>{space.name}</h1><p>{space.invitation}</p></div>
      </header>
      <section className="residence-detail-story">
        <div><span>THE EXPERIENCE</span><h2>{space.shortName}.</h2></div>
        <div><p>{space.introduction}</p><blockquote>“{space.philosophy}”</blockquote></div>
      </section>
      <section className="residence-detail-facts" aria-label={`${space.name} details`}>
        {space.details.map((detail) => <div key={detail.label}><span>{detail.label}</span><strong>{detail.value}</strong></div>)}
      </section>
      <ImageGallery title="A closer look" images={[{src:`/images/serein-${slug}-detail.webp`,alt:space.galleryAlt,caption:space.galleryCaption},{src:space.secondImage,alt:space.secondAlt,caption:space.secondCaption}]}/>
      <section className="residence-detail-next"><span>{slug === 'table' ? 'YOUR NEXT RITUAL' : `NEXT RITUAL · ${next.number}`}</span><a href={sitePath(slug === 'table' ? '/work/serein/residence#booking' : `/work/serein/residence/${next.slug}`)}><strong>{slug === 'table' ? 'Plan your stay.' : `${next.shortName}.`}</strong><ArrowRight /></a></section><SiteFooter slug="serein"/>
    </main>
  );
}
