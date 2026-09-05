import {
  ArrowDownRight,
  ArrowUpRight,
  Circle,
  Command,
  Layers3,
  MousePointer2,
  Sparkles,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { projects } from './work/projects';

const featured = [
  {
    number: '01',
    title: 'NOVA / Intelligence Console',
    description: 'A calm command center for fast-moving product teams.',
    tags: ['Dashboard', 'Data systems'],
    href: '/work/nova',
    className: 'project-lime',
  },
  {
    number: '02',
    title: 'Serein / Digital Retreat',
    description: 'A slower, tactile booking experience for restorative travel.',
    tags: ['Hospitality', 'Editorial'],
    href: '/work/serein',
    className: 'project-coral',
  },
  {
    number: '03',
    title: 'Form / Culture Archive',
    description: 'An expressive, searchable home for independent culture.',
    tags: ['Culture', 'Discovery'],
    href: '/work/form',
    className: 'project-blue',
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="/" className="brand-mark" aria-label="Atelier Index home">
          <span>AI</span>
          <span className="brand-copy">Atelier<br />Index</span>
        </a>
        <div className="nav-center" aria-hidden="true">
          <span className="status-dot" /> Independent product designer · Chicago
        </div>
        <div className="nav-actions">
          <a href="#index" className="nav-link">Index <span>11</span></a>
          <a href="mailto:hello@example.com" className="nav-link">Let’s talk <ArrowUpRight /></a>
        </div>
      </nav>

      <section className="hero-grid">
        <div className="hero-kicker">
          <Sparkles size={14} /> Selected work · 2024—26
        </div>
        <h1>
          Interfaces with<br />
          <span className="hero-serif">a point of view.</span>
        </h1>
        <div className="hero-side-note">
          <MousePointer2 size={18} />
          <p>I shape complex digital products into clear, characterful experiences people remember.</p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring"><span /></div>
          <div className="orbit-label">STRATEGY · SYSTEMS · INTERACTION ·</div>
          <div className="orbit-core"><Command /></div>
        </div>
        <div className="hero-bottom">
          <a href="#index" className="scroll-cue"><ArrowDownRight /> Explore the index</a>
          <span>Available for select collaborations<br />from November 2026</span>
        </div>
      </section>

      <section id="index" className="work-index">
        <div className="section-heading">
          <div><span className="eyebrow">The work index</span><h2>Selected experiments<br />&amp; digital products</h2></div>
          <p>Eleven focused worlds. Each project begins with a different design philosophy, visual grammar, and human problem.</p>
        </div>

        <div className="project-grid">
          {featured.map((project) => (
            <a href={project.href} key={project.title} className={cn('project-card', project.className)}>
              <div className="project-topline"><span>{project.number}</span><ArrowUpRight /></div>
              <div className="project-visual" aria-hidden="true">
                <div className="visual-window">
                  <div className="window-bar"><i /><i /><i /></div>
                  <div className="window-body"><Layers3 /><span /></div>
                </div>
                <Circle className="visual-circle" />
              </div>
              <div className="project-meta">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="project-mini-index">
          {projects.slice(3).map((project) => (
            <a href={`/work/${project.slug}`} key={project.slug} className="mini-project-link">
              <span>{project.index}</span>
              <strong>{project.name}</strong>
              <small>{project.descriptor}</small>
              <ArrowUpRight />
            </a>
          ))}
        </div>

        <a href="/work" className={cn(buttonVariants({ variant: 'outline' }), 'view-all')}>
          View all eleven projects <ArrowUpRight />
        </a>
      </section>
    </main>
  );
}
