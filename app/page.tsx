import {
  ArrowDownRight,
  ArrowUpRight,
  Circle,
  Layers3,
  MousePointer2,
  Sparkles,
} from 'lucide-react';

import { HeroArtifacts } from '@/components/hero-artifacts';
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
        <a href="/" className="brand-mark" aria-label="Usamah Moin portfolio home">
          <span>UM</span>
          <span className="brand-copy">Usamah<br />Moin</span>
        </a>
        <div className="nav-center" aria-hidden="true">
          <span className="status-dot" /> Product &amp; UI/UX designer · Chicago
        </div>
        <div className="nav-actions">
          <a href="#index" className="nav-link">Index <span>11</span></a>
          <a href="https://github.com/UsamahMoin" className="nav-link">GitHub <ArrowUpRight /></a>
        </div>
      </nav>

      <HeroArtifacts>
        <div className="hero-kicker">
          <Sparkles size={14} /> Usamah Moin · Selected work
        </div>
        <h1>
          I design digital products<br />
          <span className="hero-serif">people understand.</span>
        </h1>
        <div className="hero-side-note">
          <MousePointer2 size={18} />
          <p>I’m Usamah Moin, a UI/UX designer turning complex ideas into polished, human-centered digital experiences.</p>
        </div>
        <div className="hero-bottom">
          <a href="#index" className="scroll-cue"><ArrowDownRight /> Explore my work</a>
          <span>Open to UI/UX and product design<br />opportunities</span>
        </div>
      </HeroArtifacts>

      <section id="index" className="work-index">
        <div className="section-heading">
          <div><span className="eyebrow">My portfolio</span><h2>Selected product thinking<br />&amp; interface design</h2></div>
          <p>I created eleven distinct product concepts to show how I think across research, visual systems, interaction, and responsive design.</p>
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

        <section className="human-design-strip" aria-labelledby="human-design-title">
          <div className="human-strip-copy">
            <span className="eyebrow">How I design</span>
            <h2 id="human-design-title">I design for people, not personas.</h2>
            <p>My process starts with the lived moment: attention, hesitation, collaboration, and delight—then turns those insights into clear interfaces.</p>
          </div>
          <div className="human-collage">
            <figure className="human-frame frame-serein"><img src="/images/serein-human.png" alt="Traveler in a calm cedar retreat" loading="lazy" /><figcaption>Pause / Serein</figcaption></figure>
            <figure className="human-frame frame-form"><img src="/images/form-human.png" alt="Designer working in an independent studio" loading="lazy" /><figcaption>Make / Form</figcaption></figure>
            <figure className="human-frame frame-lumen"><img src="/images/lumen-human.png" alt="Creative team collaborating in a studio" loading="lazy" /><figcaption>Together / Lumen</figcaption></figure>
          </div>
        </section>

        <a href="/work" className={cn(buttonVariants({ variant: 'outline' }), 'view-all')}>
          View all eleven projects <ArrowUpRight />
        </a>
      </section>
    </main>
  );
}
