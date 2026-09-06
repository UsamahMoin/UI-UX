import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { sitePath } from '@/lib/site-path';
import { formStories, getFormStory } from '../content';

export function generateStaticParams() {
  return formStories.map(({ slug }) => ({ story: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ story: string }> }): Promise<Metadata> {
  const story = getFormStory((await params).story);
  if (!story) return {};
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://atelier-index-ui-ux.usamahmoin.chatgpt.site';
  const image = new URL(sitePath(story.image), siteOrigin).toString();
  return {
    title: `${story.title} — FORM`, description: story.dek,
    openGraph: { title: `${story.title} — FORM`, description: story.dek, images: [image] },
    twitter: { title: `${story.title} — FORM`, description: story.dek, images: [image] },
  };
}

export default async function FormStoryPage({ params }: { params: Promise<{ story: string }> }) {
  const { story: slug } = await params;
  const story = getFormStory(slug);
  if (!story) notFound();
  const current = formStories.findIndex((item) => item.slug === slug);
  const next = formStories[(current + 1) % formStories.length];

  return (
    <main className="form-story" style={{ '--form-story-color': story.color } as React.CSSProperties}>
      <nav className="form-story-nav"><a href={sitePath('/work/form/archive')}><ArrowLeft /> Archive</a><a className="form-site-wordmark" href={sitePath('/work/form/archive')}>F—RM</a><span>ISSUE 14 · {story.number} / 05</span></nav>
      <header className="form-story-header"><div><span>{story.format} / {story.year}</span><h1>{story.title}</h1><p>{story.dek}</p></div><figure><img src={sitePath(story.image)} alt={story.alt} /><figcaption>{story.credit}</figcaption></figure></header>
      <section className="form-story-intro"><span>{story.category.toUpperCase()} · {story.readTime.toUpperCase()}</span><p>{story.introduction}</p></section>
      <section className="form-story-body"><div>{story.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><blockquote>“{story.pullquote}”</blockquote></section>
      <section className="form-story-image"><img src={sitePath(story.image)} alt="" aria-hidden="true" /><span>{story.number} / FORM ARCHIVE</span></section>
      <footer className="form-story-next"><span>NEXT / {next.number}</span><a href={sitePath(`/work/form/archive/${next.slug}`)}><strong>{next.title}</strong><ArrowRight /></a></footer>
    </main>
  );
}
