import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Asterisk } from 'lucide-react';

import { ProjectExperience } from '@/components/project-experience';
import { getProject, projects } from '../projects';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name} — Atelier Index`, description: project.summary, openGraph: { title: `${project.name} — Atelier Index`, description: project.summary, images: [] }, twitter: { title: `${project.name} — Atelier Index`, description: project.summary, images: [] } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const current = projects.findIndex(item => item.slug === slug);
  const next = projects[(current + 1) % projects.length];
  return (
    <main className={`case-page case-${project.slug} ${project.dark ? 'case-dark' : ''}`} style={{ '--case-bg': project.palette, '--case-accent': project.accent } as React.CSSProperties}>
      <nav className="case-nav"><Link href="/work"><ArrowLeft /> All projects</Link><Link href="/">Atelier Index <Asterisk /></Link><Link href={`/work/${next.slug}`}>Next: {next.name} <ArrowRight /></Link></nav>
      <header className="case-hero">
        <div><span>{project.index} / 11</span><span>{project.category}</span><span>{project.year}</span></div>
        <h1>{project.name}<small>{project.descriptor}</small></h1>
        <blockquote>“{project.philosophy}”</blockquote>
      </header>
      <section className="experience-wrap"><div className="experience-label"><span>INTERACTIVE PROTOTYPE</span><span>Try the controls ↘</span></div><ProjectExperience slug={slug} /></section>
      <section className="case-story"><div><span>THE INTENT</span><h2>A product world built around one clear belief.</h2></div><div><p>{project.summary}</p><p>The interface pairs a specific visual attitude with behavior that rewards curiosity. Every control is designed to explain itself through use, letting hierarchy, rhythm, and feedback do the heavy lifting.</p></div><aside><small>DESIGN IMPACT</small><strong>{project.outcome}</strong></aside></section>
      <footer className="next-case"><span>NEXT PROJECT</span><Link href={`/work/${next.slug}`}><strong>{next.name}</strong><small>{next.descriptor}</small><ArrowRight /></Link></footer>
    </main>
  );
}
