'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';

import { formStories } from '@/app/work/form/archive/content';
import { sitePath } from '@/lib/site-path';

const categories = ['All', 'Objects', 'People', 'Ideas'];

export function FormArchive() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    return formStories.filter((story) => (category === 'All' || story.category === category) && (!search || `${story.title} ${story.dek} ${story.format}`.toLowerCase().includes(search)));
  }, [category, query]);

  return (
    <main className="form-site">
      <nav className="form-site-nav">
        <a className="form-site-wordmark" href={sitePath('/work/form/archive')}>F—RM</a>
        <span>INDEPENDENT CULTURE · ISSUE 14</span>
        <a href={sitePath('/work/form')}><ArrowLeft /> Portfolio view</a>
      </nav>
      <header className="form-site-hero">
        <div><span>AN EXPANDING ARCHIVE OF</span><h1>Things worth<br /><em>keeping.</em></h1></div>
        <p>People, objects, and ideas that alter how we see the everyday. Edited with curiosity, held without hierarchy.</p>
      </header>
      <section className="form-browser" aria-label="Browse the FORM archive">
        <div className="form-search-field"><Search aria-hidden="true" /><label className="sr-only" htmlFor="form-search">Search the archive</label><input id="form-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people, objects, ideas…" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X /></button>}</div>
        <div className="form-site-filters" aria-label="Filter the archive">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'active' : ''} aria-pressed={category === item}>{item}</button>)}</div>
        <p className="form-result-count" aria-live="polite">{String(results.length).padStart(2, '0')} pieces in view</p>
      </section>
      {results.length ? (
        <section className="form-archive-grid">
          {results.map((story, index) => <article className={`form-archive-item form-archive-item-${index + 1}`} key={story.slug} style={{ '--form-story-color': story.color } as React.CSSProperties}><a href={sitePath(`/work/form/archive/${story.slug}`)}><figure><img src={sitePath(story.image)} alt={story.alt} /><span>{story.number}</span></figure><div><span>{story.format} · {story.readTime}</span><h2>{story.title}</h2><p>{story.dek}</p><span className="form-read-link">Open story <ArrowRight /></span></div></a></article>)}
        </section>
      ) : (
        <section className="form-empty"><span>NOTHING FILED HERE—YET.</span><h2>Try a broader word<br />or clear the filter.</h2><button onClick={() => { setQuery(''); setCategory('All'); }}>Reset the archive</button></section>
      )}
      <section className="form-manifesto"><span>FORM / NOTE 01</span><blockquote>“An archive should not tell you what matters. It should make you want to look again.”</blockquote><p>FORM is a fictional editorial concept created by Usamah Moin to demonstrate information architecture, visual direction, interaction design, accessibility, and responsive front-end craft.</p></section>
      <footer className="form-site-footer"><span>F—RM · ISSUE 14</span><a href={sitePath('/work')}>All portfolio projects <ArrowRight /></a></footer>
    </main>
  );
}
