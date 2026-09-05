import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { projects } from './projects';

export default function WorkIndex() {
  return (
    <main className="all-work-page">
      <nav className="work-nav">
        <Link href="/"><ArrowLeft /> Atelier Index</Link>
        <span>All work / 2024—26</span>
      </nav>
      <header className="work-list-header">
        <span className="eyebrow">The complete index</span>
        <h1>Eleven ways to<br /><em>make it clear.</em></h1>
        <p>Every project is a working design thought: a different philosophy, visual language, and interaction model.</p>
      </header>
      <section className="work-list" aria-label="Project index">
        {projects.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="work-list-row" style={{ '--row-color': project.palette } as React.CSSProperties}>
            <span>{project.index}</span>
            <div><strong>{project.name}</strong><small>{project.descriptor}</small></div>
            <span>{project.category}</span>
            <span>{project.year}</span>
            <ArrowUpRight />
          </Link>
        ))}
      </section>
    </main>
  );
}
