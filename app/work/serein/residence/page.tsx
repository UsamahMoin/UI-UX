import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ResidenceHero } from '@/components/residence-hero';
import { ResidenceBooking } from '@/components/residence-booking';
import { SiteFooter } from '@/components/site-footer';
import { BrandMark } from '@/components/brand-mark';
import { sitePath } from '@/lib/site-path';
import { residenceSpaces } from './content';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://atelier-index-ui-ux.usamahmoin.chatgpt.site';
const heroImage = new URL(sitePath('/images/serein-human.webp'), siteOrigin).toString();

export const metadata: Metadata = {
  title: 'The Residence | SEREIN',
  description: 'Explore a quiet cedar retreat in the Kiso Valley through its suites, forest onsen, and seasonal table.',
  openGraph: { title: 'The Residence | SEREIN', description: 'A quiet cedar retreat in the Kiso Valley.', images: [heroImage] },
  twitter: { title: 'The Residence | SEREIN', description: 'A quiet cedar retreat in the Kiso Valley.', images: [heroImage] },
};

export default function ResidencePage() {
  return (
    <main className="residence-page">
      <nav className="residence-nav">
        <a href={sitePath('/work/serein')}><ArrowLeft /> Case study</a>
        <a className="residence-wordmark" href={sitePath('/work/serein/residence')}><BrandMark slug="serein"/>SEREIN</a>
        <a href="#booking">Plan your stay <ArrowRight/></a>
      </nav>
      <ResidenceHero/>
      <section className="residence-intro" id="spaces">
        <span>THREE RITUALS</span>
        <h2>Sleep deeply.<br />Soak slowly.<br />Eat what is here.</h2>
        <p>The residence is organized around the gestures that make a day feel complete. Each space removes a little noise and returns attention to weather, material, and time.</p>
      </section>
      <section className="residence-spaces" aria-label="Explore the residence spaces">
        {residenceSpaces.map((space) => (
          <article className="residence-space-card" id={`ritual-${space.slug}`} key={space.slug}>
            <a href={sitePath(`/work/serein/residence/${space.slug}`)} aria-label={`Explore ${space.name}`}>
              <figure><Image unoptimized width={1536} height={1024} src={sitePath(space.image)} alt={space.alt} /></figure>
              <div><span>{space.number} / 03</span><h2>{space.shortName}.</h2><p>{space.invitation}</p><span className="residence-card-link">Enter the space <ArrowRight /></span></div>
            </a>
          </article>
        ))}
      </section>
      <section className="residence-way" id="our-way">
        <span>OUR WAY</span>
        <blockquote>“Luxury is not more to look at. It is less to look past.”</blockquote>
        <div><p>Follow the valley from morning tea to the evening table. Between them: warm mineral water, cedar-lined rooms, and a path that leads into the trees.</p><a href="#booking">Find a few quiet days <ArrowRight /></a></div>
      </section>
      <ResidenceBooking/><SiteFooter slug="serein"/>
    </main>
  );
}
