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
        <blockquote>“{project.philosophy}”</blockquote>
      </header>
      <section className="experience-wrap"><div className="experience-label"><span>INTERACTIVE PROTOTYPE</span><span>Try the controls ↘</span></div><ProjectExperience slug={slug} /></section>
      <section className="case-story"><div><span>MY DESIGN INTENT</span><h2>Turning one clear belief into a complete product world.</h2></div><div><p>{project.summary}</p><p>For this concept, I paired a distinctive visual attitude with behavior that rewards curiosity. I designed every control to explain itself through use, letting hierarchy, rhythm, and feedback do the heavy lifting.</p></div></section>
      <footer className="next-case"><span>NEXT PROJECT</span><a href={sitePath(`/work/${next.slug}`)}><strong>{next.name}</strong><small>{next.descriptor}</small><ArrowRight /></a></footer>
    </main>
  );
}
