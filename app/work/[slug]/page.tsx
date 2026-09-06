import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Asterisk } from 'lucide-react';

import { ProjectExperience } from '@/components/project-experience';
import { sitePath } from '@/lib/site-path';
import { getProject, projects } from '../projects';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name} — Usamah Moin`, description: project.summary, openGraph: { title: `${project.name} — Usamah Moin`, description: project.summary, images: [] }, twitter: { title: `${project.name} — Usamah Moin`, description: project.summary, images: [] } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const current = projects.findIndex(item => item.slug === slug);
  const next = projects[(current + 1) % projects.length];
  return (
    <main className={`case-page case-${project.slug} ${project.dark ? 'case-dark' : ''}`} style={{ '--case-bg': project.palette, '--case-accent': project.accent } as React.CSSProperties}>
      <nav className="case-nav"><a href={sitePath('/work')}><ArrowLeft /> All projects</a><a href={sitePath('/')}>Usamah Moin <Asterisk /></a><a href={sitePath(`/work/${next.slug}`)}>Next: {next.name} <ArrowRight /></a></nav>
      <header className="case-hero">
        <div><span>{project.index} / 11</span><span>{project.category}</span><span>{project.year}</span></div>
        <h1>{project.name}<small>{project.descriptor}</small></h1>
        <div className="case-hero-bottom">
          <section className="case-theme-note"><span>VISUAL THEME</span><strong>{project.theme}</strong><div aria-label={`${project.name} color palette`}>{project.paletteColors.map((color) => <i key={color.value} style={{ background: color.value }} title={`${color.name}: ${color.value}`}><span className="sr-only">{color.name}: {color.value}</span></i>)}</div></section>
          <blockquote>“{project.philosophy}”</blockquote>
        </div>
      </header>
      <section className="experience-wrap"><div className="experience-label"><span>INTERACTIVE PROTOTYPE</span><span>Try the controls ↘</span></div><ProjectExperience slug={slug} /></section>
      <section className="case-story">
        <div><span>DESIGN RATIONALE</span><h2>{project.intentHeadline}</h2><p className="case-story-summary">{project.summary}</p></div>
        <div className="case-rationale">
          <article><h3>01 / COLOR STRATEGY</h3><p>{project.colorRationale}</p><div className="case-palette-detail">{project.paletteColors.map((color) => <span key={color.value}><i style={{ background: color.value }} />{color.name}<small>{color.value}</small></span>)}</div></article>
          <article><h3>02 / TYPE + STRUCTURE</h3><p>{project.systemRationale}</p></article>
          <article><h3>03 / BEHAVIOR</h3><p>{project.interactionRationale}</p></article>
          <div className="case-principles"><h3>WORKING PRINCIPLES</h3>{project.principles.map((principle) => <span key={principle}>{principle}</span>)}</div>
        </div>
      </section>
      <footer className="next-case"><span>NEXT PROJECT</span><a href={sitePath(`/work/${next.slug}`)}><strong>{next.name}</strong><small>{next.descriptor}</small><ArrowRight /></a></footer>
    </main>
  );
}
