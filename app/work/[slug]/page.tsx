import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Asterisk } from 'lucide-react';

import { ProjectThumbnail } from '@/components/project-thumbnail';
import { experiencePath } from '@/lib/experience-path';
import { BrandMark } from '@/components/brand-mark';
import { identities } from '@/lib/project-identities';
import { sitePath } from '@/lib/site-path';
import { getProject, projects } from '../projects';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.name} | Usamah Moin`, description: project.summary, openGraph: { title: `${project.name} | Usamah Moin`, description: project.summary, images: [] }, twitter: { title: `${project.name} | Usamah Moin`, description: project.summary, images: [] } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const current = projects.findIndex(item => item.slug === slug);
  const next = projects[(current + 1) % projects.length];
  return (
    <main className={`case-page case-${project.slug} ${project.dark ? 'case-dark' : ''}`} style={{ '--case-bg': project.palette, '--case-accent': project.accent } as React.CSSProperties}>
      <nav className="case-nav"><a href={sitePath('/')}><ArrowLeft /> All projects</a><a href={sitePath('/')}>Usamah Moin <Asterisk /></a><a href={sitePath(`/work/${next.slug}`)}>Next: {next.name} <ArrowRight /></a></nav>
      <header className="case-hero">
        <div><span>{project.index} / 11</span><span>{project.category}</span><span>{project.year}</span></div>
        {slug === 'signal' ? <>
          <div className="signal-case-intro">
            <div className="signal-case-title"><h1><BrandMark slug="signal" />SIGNAL<small>Money, clearly.</small></h1><p>A personal ledger that separates your balance from what’s available after bills, savings goals, and a buffer.</p></div>
            <section className="signal-case-ledger" aria-label="Illustrative balance breakdown">
              <span>THE QUESTION BEHIND THE INTERFACE</span><h2>What’s available<br />after commitments?</h2>
              <dl><div><dt>In your accounts</dt><dd>$2,400</dd></div><div><dt>Reserved for plans</dt><dd>−$1,600</dd></div><div><dt>Available after reserves</dt><dd>$800</dd></div></dl>
              <div className="signal-case-allocation" aria-hidden="true"><i /><b /></div><p>Illustrative amounts · every reserve stays visible.</p>
            </section>
          </div>
          <section className="signal-case-language" aria-label="SIGNAL visual identity">
            <div><i style={{background:'#121110'}} aria-hidden="true"/><span><strong>A steady foundation</strong><small>Warm charcoal keeps the figures in focus.</small></span></div>
            <div><i style={{background:'#f5f1e8'}} aria-hidden="true"/><span><strong>A clear reading order</strong><small>Paper-toned text makes the ledger easy to scan.</small></span></div>
            <div><i style={{background:'#7bd49c'}} aria-hidden="true"/><span><strong>Meaning before color</strong><small>Trend colors always appear with a written change.</small></span></div>
          </section>
        </> : <>
        <h1><BrandMark slug={slug} />{project.name}<small>{project.descriptor}</small></h1>
        <div className="case-hero-bottom">
          <section className="case-theme-note"><span>VISUAL THEME</span><strong>{project.theme}</strong><div aria-label={`${project.name} color palette`}>{project.paletteColors.map((color) => <i key={color.value} style={{ background: color.value }} title={`${color.name}: ${color.value}`}><span className="sr-only">{color.name}: {color.value}</span></i>)}</div></section>
          {slug !== 'nova' && <blockquote>“{project.philosophy}”</blockquote>}
        </div>
        </>}
      </header>
      <section className="experience-wrap case-entry"><div className="experience-label"><span>EXPLORE THE WEBSITE</span><span>A separate, full-page experience</span></div><a className="experience-portal" href={sitePath(experiencePath(slug))}><div className="experience-art" aria-hidden="true" inert><ProjectThumbnail slug={slug} name={project.name}/></div><span className="experience-enter">Open {project.name}<ArrowRight /></span></a></section>
      <section className="case-story">
        <div><span>DESIGN RATIONALE</span><h2>{project.intentHeadline}</h2><p className="case-story-summary">{project.summary}</p></div>
        <div className="case-rationale">
          <article className="case-identity"><h3>IDENTITY / {identities[slug].name}</h3><div className="identity-signature"><BrandMark slug={slug}/><strong>{project.name}</strong></div><p>{identities[slug].idea}</p><p><b>Voice.</b> {identities[slug].voice}</p><p><b>Visual signature.</b> {identities[slug].signature}</p></article>
          <article><h3>01 / COLOR STRATEGY</h3><p>{project.colorRationale}</p><div className="case-palette-detail">{project.paletteColors.map((color) => <span key={color.value}><i style={{ background: color.value }} />{color.name}<small>{color.value}</small></span>)}</div></article>
          <article><h3>02 / TYPE + STRUCTURE</h3><p>{project.systemRationale}</p></article>
          <article><h3>03 / BEHAVIOR</h3><p>{project.interactionRationale}</p></article>
          <article><h3>04 / ACCESSIBILITY</h3><p>The implementation targets WCAG 2.2 AA: readable contrast, visible keyboard focus, labeled controls, reduced-motion support, and layouts that reflow on a 320-pixel viewport. Selection uses more than color. Chart values and changing states have text alternatives. These are implementation choices and verified checks, not a claim of complete conformance.</p></article><div className="case-principles"><h3>WORKING PRINCIPLES</h3>{project.principles.map((principle) => <span key={principle}>{principle}</span>)}</div>
        </div>
      </section>
      <section className="case-download" id="download"><div><span>MAKE IT YOUR OWN</span><h2>Build on {project.name}.</h2><p>Editable React and TypeScript source, styles, images, and setup instructions. Runs locally with Node.js. Demo interactions remain local; payments and external services are not connected.</p></div><a href={sitePath(`/downloads/${slug}-source.zip`)} download>Download {project.name} source <ArrowRight /></a></section><footer className="next-case"><span>NEXT PROJECT</span><a href={sitePath(`/work/${next.slug}`)}><strong>{next.name}</strong><small>{next.descriptor}</small><ArrowRight /></a></footer>
    </main>
  );
}
