import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Asterisk,
  Code,
  SlidersHorizontal,
} from 'lucide-react';

import { ProjectThumbnail } from '@/components/project-thumbnail';
import { BrandMark } from '@/components/brand-mark';
import { sitePath } from '@/lib/site-path';
import { projects } from './work/projects';

export default function Home() {
  return (
    <main className="gallery-home" id="top">
      <nav className="gallery-nav" aria-label="Primary navigation">
        <a
          href={sitePath('/')}
          className="gallery-brand"
          aria-label="Usamah Moin portfolio home"
        >
          <span>UM</span>
          <strong>Usamah Moin</strong>
        </a>

        <div className="gallery-role">
          <span className="status-dot" /> Engineer / systems thinker
        </div>

        <div className="gallery-nav-links">
          <a href="#work">
            Work <span>{projects.length + 1}</span>
          </a>
          <a href={sitePath('/design-lab')}>Design Lab</a>
          <a href="https://github.com/UsamahMoin">
            GitHub <ArrowUpRight />
          </a>
        </div>
      </nav>

      <header className="gallery-intro">
        <div>
          <span className="gallery-kicker">
            <Asterisk /> Engineering, interfaces &amp; ideas
          </span>
          <h1>
            Ideas, built
            <br />
            <em>to be used.</em>
          </h1>
        </div>

        <div className="gallery-intro-copy">
          <p>
            I build, study, and explain digital systems, using interface design
            to make complex ideas legible, useful, and memorable.
          </p>
          <div>
            <span>Product thinking</span>
            <span>Technical prototypes</span>
            <span>Design critique</span>
          </div>
          <a href="#work">
            See the work <ArrowDownRight />
          </a>
        </div>
      </header>

      <section
        className="gallery-work"
        id="work"
        aria-labelledby="gallery-title"
      >
        <header className="gallery-heading">
          <div>
            <span>Selected studies / 2024 to 2026</span>
            <h2 id="gallery-title">Working points of view.</h2>
          </div>
          <p>
            Twelve live interface studies and an interactive design lab. Explore
            how purpose shapes visual language, interaction, and the way a
            website feels.
          </p>
        </header>

        <div className="gallery-grid">
          <article className="gallery-card gallery-lab-card">
            <div className="gallery-visual">
              <div className="gallery-preview" aria-hidden="true">
                <div className="cover-design-lab">
                  <span className="lab-cover-kicker">
                    AN INTERACTIVE DESIGN LAB
                  </span>
                  <h3>
                    Form <em>&amp;</em> Feel
                  </h3>
                  <p>Same words. Different worlds.</p>
                  <div className="lab-cover-studies">
                    <div>
                      <b>Belong.</b>
                      <span
                        style={{
                          backgroundImage: `url("${sitePath('/images/design-foundations/campus.png')}")`,
                        }}
                      />
                    </div>
                    <div>
                      <b>Build.</b>
                      <span
                        style={{
                          backgroundImage: `url("${sitePath('/images/design-foundations/technology.png')}")`,
                        }}
                      />
                    </div>
                    <div>
                      <b>Stand out.</b>
                      <span
                        style={{
                          backgroundImage: `url("${sitePath('/images/design-foundations/streetwear.png')}")`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="lab-cover-footer">
                    SIX DIRECTIONS / ONE SHARED MESSAGE
                  </span>
                </div>
              </div>
              <a
                href={sitePath('/design-lab')}
                className="gallery-hit-area"
                aria-label="Open Form & Feel: interactive design lab"
              >
                <span className="sr-only">Open Form &amp; Feel</span>
              </a>
              <span className="gallery-open" aria-hidden="true">
                Explore <ArrowRight />
              </span>
            </div>
            <div className="gallery-card-meta">
              <a href={sitePath('/design-lab')}>
                <span className="gallery-avatar">
                  <SlidersHorizontal aria-hidden="true" />
                </span>
                <span>
                  <strong>FORM &amp; FEEL</strong>
                  <small>Interactive Design Lab</small>
                </span>
              </a>
              <span>
                Learning / Design<small>2026</small>
              </span>
            </div>
          </article>
          {projects.map((project) => (
            <article className="gallery-card" key={project.slug}>
              <div
                className="gallery-visual"
                style={{ backgroundColor: project.palette }}
              >
                <div className="gallery-preview" aria-hidden="true" inert>
                  <ProjectThumbnail slug={project.slug} name={project.name} />
                </div>
                <span className="gallery-number">{project.index}</span>
                <a
                  href={sitePath(`/work/${project.slug}`)}
                  className="gallery-hit-area"
                  aria-label={`Open ${project.name}: ${project.descriptor}`}
                >
                  <span className="sr-only">Open {project.name}</span>
                </a>
                <span className="gallery-open" aria-hidden="true">
                  View <ArrowUpRight />
                </span>
              </div>

              <div className="gallery-card-meta">
                <a href={sitePath(`/work/${project.slug}`)}>
                  <span className="gallery-avatar">
                    <BrandMark slug={project.slug} />
                  </span>
                  <span>
                    <strong>{project.name}</strong>
                    <small>{project.descriptor}</small>
                  </span>
                </a>
                <span>
                  {project.category}
                  <small>{project.year}</small>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-statement" aria-labelledby="statement-title">
        <span>Position / practice</span>
        <h2 id="statement-title">
          I turn product questions into working interfaces.
        </h2>
        <div>
          <p>
            These studies show how I frame problems, establish a visual point of
            view, and turn ideas into working prototypes. They create useful
            ground for UI/UX consulting, product engineering, and teaching.
          </p>
          <a href="https://github.com/UsamahMoin">
            <Code /> Explore my engineering work <ArrowUpRight />
          </a>
        </div>
      </section>

      <footer className="gallery-footer">
        <strong>Usamah Moin</strong>
        <span>Product engineering</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
