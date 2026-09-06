import { ArrowDownRight, ArrowUpRight, Asterisk, Code } from 'lucide-react';

import { ProjectExperience } from '@/components/project-experience';
import { sitePath } from '@/lib/site-path';
import { projects } from './work/projects';

export default function Home() {
  return (
    <main className="gallery-home" id="top">
      <nav className="gallery-nav" aria-label="Primary navigation">
        <a href={sitePath('/')} className="gallery-brand" aria-label="Usamah Moin portfolio home">
          <span>UM</span>
          <strong>Usamah Moin</strong>
        </a>

        <div className="gallery-role">
          <span className="status-dot" /> Engineer / systems thinker / Chicago
        </div>

        <div className="gallery-nav-links">
          <a href="#work">Work <span>11</span></a>
          <a href="https://github.com/UsamahMoin">GitHub <ArrowUpRight /></a>
        </div>
      </nav>

      <header className="gallery-intro">
        <div>
          <span className="gallery-kicker"><Asterisk /> Engineering, interfaces &amp; ideas</span>
          <h1>An engineer<br /><em>with taste.</em></h1>
        </div>

        <div className="gallery-intro-copy">
          <p>
            I build, study, and explain digital systems—using interface design to make complex ideas legible, useful, and memorable.
          </p>
          <div>
            <span>Product thinking</span>
            <span>Technical prototypes</span>
            <span>Design critique</span>
          </div>
          <a href="#work">See the work <ArrowDownRight /></a>
        </div>
      </header>

      <section className="gallery-work" id="work" aria-labelledby="gallery-title">
        <header className="gallery-heading">
          <div>
            <span>Selected studies / 2024—26</span>
            <h2 id="gallery-title">Working points of view.</h2>
          </div>
          <p>
            Eleven live interface studies, each with its own visual language, interaction model, and design philosophy. Open any frame to explore the working prototype.
          </p>
        </header>

        <div className="gallery-grid">
          {projects.map((project) => (
            <article className="gallery-card" key={project.slug}>
              <div className="gallery-visual" style={{ backgroundColor: project.palette }}>
                <div className="gallery-preview" aria-hidden="true" inert>
                  <ProjectExperience slug={project.slug} />
                </div>
                <span className="gallery-number">{project.index}</span>
                <a
                  href={sitePath(`/work/${project.slug}`)}
                  className="gallery-hit-area"
                  aria-label={`Open ${project.name}: ${project.descriptor}`}
                >
                  <span className="sr-only">Open {project.name}</span>
                </a>
                <span className="gallery-open" aria-hidden="true">View <ArrowUpRight /></span>
              </div>

              <div className="gallery-card-meta">
                <a href={sitePath(`/work/${project.slug}`)}>
                  <span className="gallery-avatar">{project.name.slice(0, 1)}</span>
                  <span><strong>{project.name}</strong><small>{project.descriptor}</small></span>
                </a>
                <span>{project.category}<small>{project.year}</small></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-statement" aria-labelledby="statement-title">
        <span>Position / practice</span>
        <h2 id="statement-title">I work where engineering judgment meets interface taste.</h2>
        <div>
          <p>
            These studies show how I frame problems, establish a visual point of view, and turn ideas into working prototypes—useful ground for UI/UX consulting, product engineering, and teaching.
          </p>
          <a href="https://github.com/UsamahMoin"><Code /> Explore my engineering work <ArrowUpRight /></a>
        </div>
      </section>

      <footer className="gallery-footer">
        <strong>Usamah Moin</strong>
        <span>Engineer with taste · Chicago</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
