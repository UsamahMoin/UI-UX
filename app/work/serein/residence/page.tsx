import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { sitePath } from '@/lib/site-path';
import { residenceSpaces } from './content';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://atelier-index-ui-ux.usamahmoin.chatgpt.site';
const heroImage = new URL(sitePath('/images/serein-human.png'), siteOrigin).toString();

export const metadata: Metadata = {
  title: 'The Residence — SEREIN',
  description: 'Explore a quiet cedar retreat in the Kiso Valley through its suites, forest onsen, and seasonal table.',
  openGraph: { title: 'The Residence — SEREIN', description: 'A quiet cedar retreat in the Kiso Valley.', images: [heroImage] },
  twitter: { title: 'The Residence — SEREIN', description: 'A quiet cedar retreat in the Kiso Valley.', images: [heroImage] },
};

export default function ResidencePage() {
  return (
    <main className="residence-page">
      <nav className="residence-nav">
        <a href={sitePath('/work/serein')}><ArrowLeft /> SEREIN</a>
        <a className="residence-wordmark" href={sitePath('/work/serein/residence')}>SEREIN</a>
        <span>KISO VALLEY · 35°51′ N</span>
      </nav>
      <header className="residence-hero">
        <img src={sitePath('/images/serein-human.png')} alt="Traveler having tea in a cedar retreat overlooking the Kiso Valley" />
        <div className="residence-hero-shade" />
        <div className="residence-hero-copy">
          <span>THE RESIDENCE · N° 03</span>
          <h1>A quieter<br /><em>way to stay.</em></h1>
          <p>Eight cedar suites gathered around mountain water, forest steam, and a table that follows the season.</p>
          <a href="#spaces">Discover the spaces <ArrowRight /></a>
        </div>
      </header>
      <section className="residence-intro" id="spaces">
        <span>THREE RITUALS</span>
        <h2>Sleep deeply.<br />Soak slowly.<br />Eat what is here.</h2>
        <p>The residence is organized around the gestures that make a day feel complete. Each space removes a little noise and returns attention to weather, material, and time.</p>
      </section>
      <section className="residence-spaces" aria-label="Explore the residence spaces">
        {residenceSpaces.map((space) => (
          <article className="residence-space-card" key={space.slug}>
            <a href={sitePath(`/work/serein/residence/${space.slug}`)} aria-label={`Explore ${space.name}`}>
              <figure><img src={sitePath(space.image)} alt={space.alt} /></figure>
              <div><span>{space.number} / 03</span><h2>{space.shortName}.</h2><p>{space.invitation}</p><span className="residence-card-link">Enter the space <ArrowRight /></span></div>
            </a>
          </article>
        ))}
      </section>
      <section className="residence-way" id="our-way">
        <span>OUR WAY</span>
        <blockquote>“Luxury is not more to look at. It is less to look past.”</blockquote>
        <div><p>SEREIN is a fictional hospitality study about making digital experiences feel unhurried. The concept uses readable hierarchy, tactile imagery, and quiet transitions to express a point of view—not fictional performance claims.</p><a href={sitePath('/work/serein')}>Return to the interactive concept <ArrowRight /></a></div>
      </section>
      <footer className="residence-footer"><span>SEREIN · KISO VALLEY</span><span>ENGINEERED WITH TASTE BY USAMAH MOIN</span><a href={sitePath('/work')}>View all work <ArrowRight /></a></footer>
    </main>
  );
}
