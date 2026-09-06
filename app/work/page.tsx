import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { projects } from './projects';

export default function WorkIndex() {
  return (
    <main className="all-work-page">
      <nav className="work-nav">
        <a href="/"><ArrowLeft /> Usamah Moin</a>
        <span>UI/UX portfolio / 2024—26</span>
      </nav>
      <header className="work-list-header">
        <span className="eyebrow">Usamah Moin / Selected work</span>
        <h1>Eleven projects.<br /><em>One point of view.</em></h1>
        <p>This portfolio explores dashboards, culture, travel, finance, collaboration, and more. Each project shows how I adapt research, visual language, and interaction to a different human problem.</p>
      </header>
      <section className="work-list" aria-label="Project index">
        {projects.map((project) => (
          <a key={project.slug} href={`/work/${project.slug}`} className="work-list-row" style={{ '--row-color': project.palette } as React.CSSProperties}>
            <span>{project.index}</span>
            <div><strong>{project.name}</strong><small>{project.descriptor}</small></div>
            <span>{project.category}</span>
            <span>{project.year}</span>
            <ArrowUpRight />
          </a>
        ))}
      </section>
    </main>
  );
}
