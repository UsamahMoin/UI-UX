'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, Headphones, Home, Info, Pause, Play, Search, Sparkles } from 'lucide-react';

import { sitePath } from '@/lib/site-path';

type AuraSection = 'library' | 'rituals' | 'about';

const sessions = [
  { title: 'Blue Hour, Slowly', tone: 'Still', duration: '24 min', note: 'Low piano, distant rain, and a room settling after dusk.', color: 'violet' },
  { title: 'Air Between Cedars', tone: 'Open', duration: '32 min', note: 'Breath-like drones with leaves moving beyond an open window.', color: 'teal' },
  { title: 'Amber Room, Softly', tone: 'Warm', duration: '18 min', note: 'Quiet strings and tape-softened light for an unhurried evening.', color: 'amber' },
  { title: 'Cloud Study No. 4', tone: 'Still', duration: '41 min', note: 'A nearly motionless field with soft harmonic weather.', color: 'cloud' },
  { title: 'A Door Left Open', tone: 'Open', duration: '27 min', note: 'Wide intervals, morning air, and a little useful emptiness.', color: 'blue' },
  { title: 'Lamp After Midnight', tone: 'Warm', duration: '36 min', note: 'Muted guitar, low room tone, and the grain of late-night focus.', color: 'rose' },
];

const rituals = [
  { name: 'Morning arrival', time: '7 min', description: 'Begin without urgency.', steps: ['Open the room to natural light.', 'Choose one intention for the next hour.', 'Listen until your breathing finds its own pace.'] },
  { name: 'Deep-work threshold', time: '12 min', description: 'Make a clean edge around attention.', steps: ['Put the unfinished tasks out of sight.', 'Name the single question you are working on.', 'Begin before the first sound fully disappears.'] },
  { name: 'Evening release', time: '9 min', description: 'Let the day become complete.', steps: ['Lower the light nearest to you.', 'Write down what can wait until tomorrow.', 'Stay for one quiet minute after the session ends.'] },
];

export function AuraSite({ section }: { section: AuraSection }) {
  const destinations = [
    { label: 'Listening room', href: '/work/aura', icon: Home },
    { label: 'Library', href: '/work/aura/library', icon: Headphones, section: 'library' },
    { label: 'Rituals', href: '/work/aura/rituals', icon: Sparkles, section: 'rituals' },
    { label: 'About', href: '/work/aura/about', icon: Info, section: 'about' },
  ] as const;

  return (
    <main className={`aura-site aura-site-${section}`}>
      <nav className="aura-site-nav">
        <a className="aura-site-mark" href={sitePath('/work/aura')}>aura°</a>
        <div className="aura-site-status"><span>LISTENING SYSTEM</span><i aria-hidden="true" /> <span>ONLINE</span></div>
        <a className="aura-site-back" href={sitePath('/work/aura')}><ArrowLeft /> Listening room</a>
      </nav>
      <aside className="aura-os-rail" aria-label="AURA navigation">
        {destinations.map((destination) => {
          const Icon = destination.icon;
          const isActive = 'section' in destination && destination.section === section;
          return <a key={destination.label} className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined} href={sitePath(destination.href)} aria-label={destination.label}><Icon /><span>{destination.label}</span></a>;
        })}
      </aside>
      <div className="aura-os-content">
        {section === 'library' && <AuraLibrary />}
        {section === 'rituals' && <AuraRituals />}
        {section === 'about' && <AuraAbout />}
        <footer className="aura-site-footer"><span>AURA · A CONCEPT BY USAMAH MOIN</span><a href={sitePath('/')}>All portfolio projects <ArrowRight /></a></footer>
      </div>
    </main>
  );
}

function AuraLibrary() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState<string | null>(null);
  const [selected, setSelected] = useState(sessions[0].title);
  const [saved, setSaved] = useState<string[]>([]);
  const visible = sessions.filter((session) => {
    const matchesTone = filter === 'All' || session.tone === filter;
    const terms = `${session.title} ${session.tone} ${session.note}`.toLowerCase();
    return matchesTone && terms.includes(query.toLowerCase().trim());
  });
  const active = sessions.find((session) => session.title === selected) ?? sessions[0];
  const toggleSaved = (title: string) => setSaved((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  const togglePlaying = (title: string) => {
    setSelected(title);
    setPlaying((current) => current === title ? null : title);
  };

  return <>
    <section className={`aura-os-stage ${active.color}`} aria-labelledby="aura-library-title">
      <div className="aura-os-scene" aria-hidden="true"><i /><b /><span /></div>
      <div className="aura-os-stage-copy">
        <span>CURATED LISTENING / {active.tone.toUpperCase()} / {active.duration}</span>
        <h1 id="aura-library-title">{active.title}</h1>
        <p>{active.note}</p>
        <div className="aura-os-stage-actions">
          <button className="primary" onClick={() => togglePlaying(active.title)}>{playing === active.title ? <Pause /> : <Play />}{playing === active.title ? 'Pause session' : 'Begin session'}</button>
          <button onClick={() => toggleSaved(active.title)} aria-pressed={saved.includes(active.title)}><Bookmark fill={saved.includes(active.title) ? 'currentColor' : 'none'} />{saved.includes(active.title) ? 'Saved' : 'Save'}</button>
        </div>
      </div>
      <aside className="aura-now-card" aria-live="polite">
        <div><span>ENVIRONMENT</span><strong>{playing === active.title ? 'Playing' : 'Ready'}</strong></div>
        <div className={`aura-waveform ${playing === active.title ? 'active' : ''}`} aria-hidden="true">{[3, 7, 5, 10, 6, 12, 8, 5, 9, 4, 7, 3].map((height, index) => <i key={index} style={{ height: `${height * 2}px` }} />)}</div>
        <small>{active.tone} · {active.duration}</small>
      </aside>
    </section>
    <section className="aura-library-heading"><div><span>LISTENING LIBRARY / 06 SESSIONS</span><h2>Choose the room you need.</h2></div><p>Browse by feeling rather than genre. The controls stay close, then recede when listening begins.</p></section>
    <section className="aura-library-tools">
      <label><Search aria-hidden="true" /><span className="sr-only">Search listening sessions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sessions" /></label>
      <div aria-label="Filter by feeling">{['All', 'Still', 'Open', 'Warm'].map((item) => <button key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    </section>
    <section className="aura-session-grid" aria-label="Listening sessions">
      {visible.length ? visible.map((session, index) => <article key={session.title} className={`aura-session-card ${session.color} ${selected === session.title ? 'selected' : ''}`}>
        <button className="aura-session-art" onClick={() => setSelected(session.title)} aria-label={`Preview ${session.title}`}><i aria-hidden="true" /><b aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span><small>Preview</small></button>
        <div className="aura-session-copy"><span>{session.tone.toUpperCase()} · {session.duration}</span><h3>{session.title}</h3><p>{session.note}</p><div><button className="aura-session-play" onClick={() => togglePlaying(session.title)} aria-label={`${playing === session.title ? 'Pause' : 'Play'} ${session.title}`}>{playing === session.title ? <Pause /> : <Play />}{playing === session.title ? 'Playing' : 'Listen'}</button><button className="aura-session-save" onClick={() => toggleSaved(session.title)} aria-label={`${saved.includes(session.title) ? 'Remove' : 'Save'} ${session.title}`} aria-pressed={saved.includes(session.title)}><Bookmark fill={saved.includes(session.title) ? 'currentColor' : 'none'} /></button></div></div>
      </article>) : <p className="aura-empty-state">No sessions match that search. Try another feeling or title.</p>}
    </section>
  </>;
}

function AuraRituals() {
  const [selected, setSelected] = useState(0);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const ritual = rituals[selected];
  const choose = (index: number) => { setSelected(index); setStarted(false); setStep(0); };

  return <>
    <header className="aura-site-hero ritual-hero"><span>THREE WAYS TO ARRIVE</span><h1>Small rituals,<br />practiced slowly.</h1><p>A ritual is simply a reliable transition. Choose the threshold you need and let the interface become quiet.</p></header>
    <section className="aura-ritual-layout">
      <div className="aura-ritual-list">{rituals.map((item, index) => <button key={item.name} className={selected === index ? 'active' : ''} onClick={() => choose(index)} aria-pressed={selected === index}><span>0{index + 1} / {item.time}</span><strong>{item.name}</strong><small>{item.description}</small><ArrowRight /></button>)}</div>
      <div className={`aura-ritual-player ${started ? 'started' : ''}`}><span>NOW PRACTICING / {ritual.time}</span><h2>{ritual.name}</h2><div className="aura-ritual-pulse" aria-hidden="true"><i/><b>{started ? 'stay' : 'ready'}</b></div><ol>{ritual.steps.map((item, index) => <li className={step === index ? 'active' : step > index ? 'complete' : ''} key={item}><span>{step > index ? <Check /> : index + 1}</span>{item}</li>)}</ol><div className="aura-ritual-actions"><button onClick={() => setStarted(!started)}>{started ? <Pause /> : <Play />}{started ? 'Pause ritual' : 'Begin ritual'}</button><button disabled={!started} onClick={() => setStep((current) => (current + 1) % ritual.steps.length)}>Next step <ArrowRight /></button></div></div>
    </section>
  </>;
}

function AuraAbout() {
  return <>
    <header className="aura-site-hero about-hero"><span>ABOUT THE LISTENING ROOM</span><h1>Technology can<br />leave room for silence.</h1><p>AURA explores what an audio product becomes when emotional intention, rather than catalog size, organizes the experience.</p></header>
    <section className="aura-about-intro"><span>THE IDEA / 2025</span><p>AURA is a fictional product concept designed and built by <strong>Usamah Moin</strong>, an engineer with taste working across systems, interfaces, and human behavior.</p></section>
    <section className="aura-about-grid"><article><span>01</span><h2>Emotion before genre</h2><p>Still, Open, and Warm are human descriptions of need. They help people begin with the state they want rather than the taxonomy of a music catalog.</p></article><article><span>02</span><h2>Motion stays peripheral</h2><p>The lightscape moves slowly, begins only after direct action, and never carries essential information. It supports atmosphere without competing with listening.</p></article><article><span>03</span><h2>Quiet is accessible</h2><p>High-contrast controls, visible focus states, large touch targets, clear playback labels, and reduced-motion support are part of the product’s calm, not additions after it.</p></article></section>
    <section className="aura-about-note"><span>DESIGN INTENT</span><blockquote>“The best listening interface knows when to disappear.”</blockquote><a href={sitePath('/work/aura/library')}>Enter the library <ArrowRight /></a></section>
  </>;
}
