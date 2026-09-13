import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ImageGallery } from '@/components/image-gallery';
import { SiteFooter } from '@/components/site-footer';
import { BrandMark } from '@/components/brand-mark';
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
    title: `${story.title} | FORM`, description: story.dek,
    openGraph: { title: `${story.title} | FORM`, description: story.dek, images: [image] },
    twitter: { title: `${story.title} | FORM`, description: story.dek, images: [image] },
  };
}

export default async function FormStoryPage({ params }: { params: Promise<{ story: string }> }) {
  const { story: slug } = await params;
  const story = getFormStory(slug);
  if (!story) notFound();
  const current = formStories.findIndex((item) => item.slug === slug);
  const next = formStories[(current + 1) % formStories.length];

  const details: Record<string, {file:string;alt:string;other:string;otherAlt:string}> = {
    "kinetic-chair":{file:"chair",alt:"Steel joint and angled vermilion seat in a workshop",other:"form-accident-detail.webp",otherAlt:"Offcuts and material experiments at the studio table"},
    "dancing-building":{file:"building",alt:"Spiral staircase and curved concrete walls",other:"form-soft-detail.webp",otherAlt:"Linen partitions moving light through a room"},
    "mina-park":{file:"studio",alt:"Hands shaping a clay vessel at a studio workbench",other:"form-accident-detail.webp",otherAlt:"Materials arranged for an experimental sculpture"},
    "soft-architecture":{file:"soft",alt:"Sunlight through linen curtains beside an oak stool",other:"form-building-detail.webp",otherAlt:"A curved staircase framed by concrete walls"},
    "useful-accident":{file:"accident",alt:"Wood, metal, and glass offcuts forming an experimental object",other:"form-studio-detail.webp",otherAlt:"A maker shaping clay among sketches and samples"},
  };
  const detail=details[slug];
  return (
    <main className={`form-story ${slug === 'useful-accident' ? 'form-story-dark' : ''}`} style={{ '--form-story-color': story.color } as React.CSSProperties}>
      <nav className="form-story-nav"><a href={sitePath('/work/form/archive')}><ArrowLeft /> Archive</a><a className="form-site-wordmark" href={sitePath('/work/form/archive')}><BrandMark slug="form"/>FORM</a><span>ISSUE 14 · {story.number} / 05</span></nav>
      <header className="form-story-header"><div><span>{story.format} / {story.year}</span><h1>{story.title}</h1><p>{story.dek}</p></div><figure><Image unoptimized width={1536} height={1024} src={sitePath(story.image)} alt={story.alt} /><figcaption>{story.credit}</figcaption></figure></header>
      <section className="form-story-intro"><span>{story.category.toUpperCase()} · {story.readTime.toUpperCase()}</span><p>{story.introduction}</p></section>
      <section className="form-story-body"><div>{story.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><blockquote>“{story.pullquote}”</blockquote></section>
      <ImageGallery title="From the study" images={[{src:`/images/form-${detail.file}-detail.webp`,alt:detail.alt,caption:detail.alt},{src:`/images/${detail.other}`,alt:detail.otherAlt,caption:detail.otherAlt}]}/>
      <footer className="form-story-next"><span>NEXT / {next.number}</span><a href={sitePath(`/work/form/archive/${next.slug}`)}><strong>{next.title}</strong><ArrowRight /></a></footer><SiteFooter slug="form"/>
    </main>
  );
}
