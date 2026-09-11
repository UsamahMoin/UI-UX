'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import {
  ArrowRight, Bookmark,
  Check, ChevronRight, CircleDollarSign,
  CreditCard, Download, Headphones, Heart, Info, MapPin, Menu, Minus, Moon,
  MousePointer2, Move, Pause, PenTool, Plus, Search, ShoppingBag, Sun,
  Sparkles, TrendingUp, Type, WandSparkles, X, ZoomIn,
} from 'lucide-react';

import { NovaDashboard } from '@/components/nova-dashboard';
import { sitePath } from '@/lib/site-path';

export function ProjectExperience({ slug }: { slug: string }) {
  switch (slug) {
    case 'nova': return <Nova />;
    case 'serein': return <Serein />;
    case 'form': return <Form />;
    case 'aura': return <Aura />;
    case 'vernacular': return <Vernacular />;
    case 'field': return <Field />;
    case 'atelier': return <Atelier />;
    case 'signal': return <Signal />;
    case 'civic': return <Civic />;
    case 'lumen': return <Lumen />;
    case 'pantry': return <Pantry />;
    default: return null;
  }
}

function Nova() {
  return <NovaDashboard />;
}

function Serein() {
  const [season, setSeason] = useState<'day' | 'night'>('day');
  const isNight = season === 'night';
  return (
    <div className={`demo serein-demo ${season}`}>
      <nav><b>SEREIN</b><span>Field notes&nbsp;&nbsp; Residences&nbsp;&nbsp; Our way</span><button className="serein-season-toggle" onClick={() => setSeason(isNight ? 'day' : 'night')} aria-pressed={isNight} aria-label={`Switch to ${isNight ? 'dawn' : 'dusk'} scene`}><i>{isNight ? <Sun /> : <Moon />}</i><span><small>Switch to</small>{isNight ? 'Dawn' : 'Dusk'}</span></button></nav>
      <section><span className="serein-number">N° 03 / KISO VALLEY</span><h2>Return to<br /><em>the quiet.</em></h2><p>A cedar refuge shaped by mist, mountain water, and the restorative luxury of having nowhere else to be.</p><div className="serein-actions"><a href={sitePath('/work/serein/residence')}>Explore the residence <ArrowRight /></a></div></section>
      <div className="serein-landscape">
        <img className={`serein-scene ${!isNight ? 'active' : ''}`} src={sitePath('/images/serein-human.png')} alt={isNight ? '' : 'Traveler having tea in a cedar retreat on a misty morning'} aria-hidden={isNight} />
        <img className={`serein-scene serein-scene-dusk ${isNight ? 'active' : ''}`} src={sitePath('/images/serein-dusk-v2.png')} alt={isNight ? 'Traveler having tea in a cedar retreat at blue-hour dusk' : ''} aria-hidden={!isNight} />
      </div>
      <div className="serein-coordinates" aria-label="Location: 35 degrees 51 minutes north, 137 degrees 41 minutes east"><small>Location</small><span>35°51′ N</span><span>137°41′ E</span></div>
      <footer><span>08 suites</span><span>Forest onsen</span><span>Seasonal table</span><span>Open Oct to May</span></footer>
    </div>
  );
}

function Form() {
  const [filter, setFilter] = useState('All matter');
  const items = [
    { title: 'A chair that refuses to sit still', meta: 'OBJECT / 1984', tone: 'form-red', slug: 'kinetic-chair', group: 'Objects', image: '/images/form-kinetic-chair.png', alt: 'Kinetic postmodern chair displayed in a raw gallery workshop' },
    { title: 'Dancing with the building', meta: 'FILM / 11:08', tone: 'form-yellow', slug: 'dancing-building', group: 'Ideas', image: '/images/form-dancing-building.png', alt: 'Contemporary dancer moving through severe concrete architecture' },
    { title: 'The useful accident', meta: 'CONVERSATION / 042', tone: 'form-ink', slug: 'useful-accident', group: 'People', image: '/images/form-useful-accident.png', alt: 'Two designers in conversation across a material-covered studio table' },
    { title: 'Soft architecture', meta: 'ESSAY / 8 MIN', tone: 'form-mint', slug: 'soft-architecture', group: 'Ideas', image: '/images/form-soft-architecture.png', alt: 'Translucent textile partitions shaping light around a small human silhouette' },
    { title: 'Studio visit: Mina Park', meta: 'PLACE / SEOUL', tone: 'form-lilac', slug: 'mina-park', group: 'People', image: '/images/form-human.png', alt: 'Independent designer arranging work in a colorful studio' },
  ];
  const visibleItems = filter === 'All matter' ? items : items.filter((item) => item.group === filter);
  return (
    <div className="demo form-demo">
      <header><b>FORM</b><a className="form-search-link" href={sitePath('/work/form/archive')}><Search /> Search the archive</a><a className="form-menu-link" href={sitePath('/work/form/archive')} aria-label="Open FORM archive"><Menu aria-hidden="true" /></a></header>
      <div className="form-title"><span>INDEPENDENT CULTURE / ISSUE 14</span><h2>Things worth<br />keeping.</h2><p>An expanding archive of people and objects that alter how we see the everyday.</p></div>
      <div className="form-filters">{['All matter','Objects','People','Ideas'].map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
      <div className="form-grid">{visibleItems.map((item) => { const i = items.findIndex((entry) => entry.slug === item.slug); return <article key={item.slug} className={`${item.tone} form-card-${item.slug}`}><a className="form-card-hit" href={sitePath(`/work/form/archive/${item.slug}`)} aria-label={`Read ${item.title}`} /><img className="form-card-image" src={sitePath(item.image)} alt={item.alt} /><span>{String(i+1).padStart(2,'0')}</span><small>{item.meta}</small><h3>{item.title}</h3><ArrowRight /></article>; })}</div>
    </div>
  );
}

function Aura() {
  const trackerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const didDragPlayhead = useRef(false);
  const suppressPlayheadClick = useRef(false);
  const [trackerWidth, setTrackerWidth] = useState(560);
  const [dragging, setDragging] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tone, setTone] = useState('Still');
  const [elapsed, setElapsed] = useState(0);
  const totalSeconds = 24 * 60;
  const session = {
    Still: { title: 'Blue Hour, Slowly', cue: 'A steady field for settling in' },
    Open: { title: 'Air Between Cedars', cue: 'A spacious field for clear attention' },
    Warm: { title: 'Amber Room, Softly', cue: 'A warmer field for gentle focus' },
  }[tone] ?? { title: 'Blue Hour, Slowly', cue: 'A steady field for settling in' };

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        if (current >= totalSeconds - 0.1) {
          window.clearInterval(timer);
          setPlaying(false);
          return totalSeconds;
        }
        return Math.min(totalSeconds, current + 0.1);
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, totalSeconds]);

  useEffect(() => {
    const tracker = trackerRef.current;
    if (!tracker) return;
    const measure = () => setTrackerWidth(Math.max(180, tracker.getBoundingClientRect().width));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(tracker);
    return () => observer.disconnect();
  }, []);

  const elapsedWholeSeconds = Math.min(totalSeconds, Math.floor(elapsed));
  const remainingWholeSeconds = totalSeconds - elapsedWholeSeconds;
  const minutes = Math.floor(elapsedWholeSeconds / 60).toString().padStart(2, '0');
  const seconds = (elapsedWholeSeconds % 60).toString().padStart(2, '0');
  const remainingMinutes = Math.floor(remainingWholeSeconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (remainingWholeSeconds % 60).toString().padStart(2, '0');
  const progress = elapsed / totalSeconds;
  const restingWaveRadius = Math.max(24, Math.min(32, trackerWidth * 0.09));
  const playingWaveRadius = restingWaveRadius * 1.2;
  const waveRadius = playingWaveRadius;
  const archRadius = playingWaveRadius;
  const trackBaseline = 52;
  const playheadX = waveRadius + progress * (trackerWidth - waveRadius * 2);
  const waveRise = restingWaveRadius * (playing ? 0.77 : 0.84);
  const waveStart = playheadX - archRadius;
  const waveEnd = playheadX + archRadius;
  const waveTop = trackBaseline - waveRise;
  const joinControl = archRadius * 0.62;
  const wavePath = `M 0 ${trackBaseline} H ${waveStart} C ${waveStart + joinControl} ${trackBaseline} ${playheadX - joinControl} ${waveTop} ${playheadX} ${waveTop} C ${playheadX + joinControl} ${waveTop} ${waveEnd - joinControl} ${trackBaseline} ${waveEnd} ${trackBaseline} H ${trackerWidth}`;
  const seekFromPointer = (clientX: number) => {
    const tracker = trackerRef.current;
    if (!tracker) return;
    const bounds = tracker.getBoundingClientRect();
    const usableWidth = Math.max(1, bounds.width - waveRadius * 2);
    const nextProgress = Math.max(0, Math.min(1, (clientX - bounds.left - waveRadius) / usableWidth));
    setElapsed(nextProgress * totalSeconds);
  };
  const beginPlayheadDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    setDragging(true);
    dragStartX.current = event.clientX;
    didDragPlayhead.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const movePlayhead = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragStartX.current === null) return;
    if (Math.abs(event.clientX - dragStartX.current) > 3) didDragPlayhead.current = true;
    if (didDragPlayhead.current) seekFromPointer(event.clientX);
  };
  const endPlayheadDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragStartX.current === null) return;
    if (didDragPlayhead.current) {
      seekFromPointer(event.clientX);
      suppressPlayheadClick.current = true;
    }
    dragStartX.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <div className={`demo aura-demo tone-${tone.toLowerCase()} ${playing ? 'is-playing' : ''}`}>
      <nav className="aura-demo-top"><a href={sitePath('/work/aura')} aria-label="AURA home"><b>aura°</b></a><span className="aura-demo-status"><i aria-hidden="true" /> LISTENING SYSTEM · ONLINE</span><button onClick={() => setSaved(!saved)} aria-label={saved ? 'Remove listening session from saved' : 'Save listening session'} aria-pressed={saved}><Bookmark fill={saved ? 'currentColor' : 'none'} /></button></nav>
      <aside className="aura-demo-rail" aria-label="Explore AURA"><a href={sitePath('/work/aura/library')} aria-label="Library"><Headphones /><span>Library</span></a><a href={sitePath('/work/aura/rituals')} aria-label="Rituals"><Sparkles /><span>Rituals</span></a><a href={sitePath('/work/aura/about')} aria-label="About"><Info /><span>About</span></a></aside>
      <main>
        <div className={`aura-lightscape ${playing ? 'playing' : ''}`} aria-hidden="true"><span className="aura-wash"/><span className="aura-veil aura-veil-one"/><span className="aura-veil aura-veil-two"/></div>
        <section className="aura-demo-copy"><small>GENERATIVE SESSION / 24 MIN</small><h2>Make space<br />for <em>{tone.toLowerCase()}.</em></h2>
          <div className="aura-breath-cue" aria-live="polite"><span>{playing ? 'Let the room move slowly around you' : session.cue}</span><small>{playing ? 'Slow light · one unhurried cycle every 11 seconds' : 'The room stays still until you begin'}</small></div>
          <div className="aura-player"><div className="aura-player-info"><b>{session.title}</b><div className={`aura-wave-tracker ${dragging ? 'is-dragging' : ''}`} ref={trackerRef}><svg viewBox={`0 0 ${trackerWidth} 64`} preserveAspectRatio="none" aria-hidden="true"><path className="track" d={wavePath}/></svg><input style={{left: `${waveRadius}px`, right: `${waveRadius}px`, width: 'auto'}} type="range" min="0" max={totalSeconds} step="0.1" value={elapsed} onPointerDown={() => setDragging(true)} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)} onChange={(event) => setElapsed(Number(event.target.value))} aria-label={`Seek ${session.title}`} /><button type="button" className={`aura-playhead-button ${playing ? 'playing' : ''}`} style={{left: `${playheadX}px`}} onPointerDown={beginPlayheadDrag} onPointerMove={movePlayhead} onPointerUp={endPlayheadDrag} onPointerCancel={() => { dragStartX.current = null; setDragging(false); }} onClick={() => { if (suppressPlayheadClick.current) { suppressPlayheadClick.current = false; return; } setPlaying(!playing); }} aria-label={playing ? 'Pause session or drag to seek' : 'Play session or drag to seek'} aria-pressed={playing}>{playing ? <Pause aria-hidden="true" /> : <span className="sr-only">Play</span>}</button></div><div className="aura-player-times"><time>{minutes}:{seconds}</time><span>AURA SPATIAL</span><time>-{remainingMinutes}:{remainingSeconds}</time></div></div></div>
        </section>
        <aside className="aura-demo-context" aria-live="polite"><div><span>ENVIRONMENT</span><strong>{playing ? 'Playing' : 'Ready'}</strong></div><div className={`aura-demo-wave ${playing ? 'active' : ''}`} aria-hidden="true">{[4,8,5,11,7,13,9,5,10,6,8,4].map((height, index) => <i key={index} style={{height: `${height * 2}px`}} />)}</div><small>{tone} · {session.title}</small><a href={sitePath('/work/aura/library')}>Open library <ArrowRight /></a></aside>
      </main>
      <footer><span>Choose your environment</span><div>{['Still','Open','Warm'].map(item => <button key={item} onClick={() => { setTone(item); setPlaying(false); setElapsed(0); }} className={tone === item ? 'active' : ''} aria-pressed={tone === item}>{item}</button>)}</div></footer>
    </div>
  );
}

function Vernacular() {
  const packs = [
    { count: 20, price: 12 },
    { count: 50, price: 25 },
    { count: 100, price: 42 },
  ];
  const [pack, setPack] = useState(packs[1]);
  const [quantity, setQuantity] = useState(1);
  const [bagQuantity, setBagQuantity] = useState(0);
  const [added, setAdded] = useState(false);
  const addToBag = () => {
    setBagQuantity((current) => current + quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };
  return (
    <div className="demo vernacular-demo" id="vernacular-top">
      <header className="vnl-nav">
        <a className="vnl-logo" href="#vernacular-top" aria-label="Vernacular Paper home">VNL<span>/</span>PAPER</a>
        <nav aria-label="Vernacular product navigation"><a href="#product">Product</a><a href="#material">Material</a><a href="#system">System</a></nav>
        <a className="vnl-bag" href="#buy" aria-label={`${bagQuantity} pack${bagQuantity === 1 ? '' : 's'} in bag`}><ShoppingBag aria-hidden="true" /> Bag <span>{String(bagQuantity).padStart(2, '0')}</span></a>
      </header>

      <main>
        <section className="vnl-hero" id="product">
          <img src={sitePath('/images/vernacular-plates-hero.jpg')} alt="Stacked molded-fiber paper plates staged on cobalt and yellow blocks" />
          <div className="vnl-hero-copy">
            <span className="vnl-kicker">OBJECT 001 / MOLDED FIBER</span>
            <h2>Hold more.<br /><em>Waste less.</em></h2>
            <p>A deliberately over-designed paper plate: deep rim, rigid ribs, honest material. Made for the meal, not the landfill aesthetic.</p>
            <a href="#buy">Build your stack <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="vnl-hero-note"><b>10″</b><span>Dinner plate<br />Natural fiber</span></div>
          <span className="vnl-prototype">DESIGN CONCEPT / 2026</span>
        </section>

        <div className="vnl-marquee" aria-label="Product principles"><div><span>NO SAD PLATES</span><i>●</i><span>PLANT FIBER</span><i>●</i><span>BUILT TO HOLD</span><i>●</i><span>NO SAD PLATES</span><i>●</i><span>PLANT FIBER</span></div></div>

        <section className="vnl-material" id="material">
          <div className="vnl-material-image"><img src={sitePath('/images/vernacular-plates-detail.jpg')} alt="Macro view of thick molded-fiber plate rims and pressed reinforcement ribs" /><span>MACRO / 4×</span></div>
          <div className="vnl-material-copy"><span>WHY THIS FORM</span><h3>Fiber has a<br />point of view.</h3><p>The rough edge stays visible. The ribs do the structural work. The warm-white surface avoids pretending to be porcelain. Every choice lets the material explain itself.</p><div className="vnl-spec-grid"><div><b>01</b><span>Pressed radial ribs</span></div><div><b>02</b><span>Deep spill-aware rim</span></div><div><b>03</b><span>Uncoated tactile finish</span></div><div><b>04</b><span>Stack-first geometry</span></div></div></div>
        </section>

        <section className="vnl-system" id="system">
          <div className="vnl-system-title"><span>THE SYSTEM / ONE MATERIAL</span><h3>Pick a plate.<br />Keep the language.</h3></div>
          <div className="vnl-size-card vnl-size-small"><span>01</span><div className="vnl-css-plate" aria-hidden="true" /><h4>SIDE / 7″</h4><p>Snacks, cake, optimistic portions.</p></div>
          <div className="vnl-size-card vnl-size-main"><span>02</span><div className="vnl-css-plate" aria-hidden="true" /><h4>DINNER / 10″</h4><p>The everyday workhorse with a deeper rim.</p></div>
          <div className="vnl-size-card vnl-size-bowl"><span>03</span><div className="vnl-css-plate" aria-hidden="true" /><h4>BOWL / 16 OZ</h4><p>For things that refuse to stay still.</p></div>
        </section>

        <section className="vnl-buy" id="buy">
          <div><span>PLATE 02 / DINNER</span><h3>Build your stack.</h3><p>Concept configuration for a future product system. Pricing is illustrative and not a live offer.</p></div>
          <div className="vnl-buy-controls">
            <fieldset><legend>Pack size</legend><div>{packs.map((item) => <button type="button" key={item.count} className={pack.count === item.count ? 'active' : ''} onClick={() => setPack(item)} aria-pressed={pack.count === item.count}>{item.count}</button>)}</div></fieldset>
            <div className="vnl-quantity"><span>Quantity</span><div><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus aria-hidden="true" /></button><output aria-live="polite">{String(quantity).padStart(2, '0')}</output><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus aria-hidden="true" /></button></div></div>
            <button className={`vnl-add ${added ? 'added' : ''}`} type="button" onClick={addToBag}>{added ? <><Check aria-hidden="true" /> Added to bag</> : <>Add concept · ${pack.price * quantity} <ArrowRight aria-hidden="true" /></>}</button>
          </div>
        </section>
      </main>

      <footer className="vnl-footer"><a className="vnl-logo" href="#vernacular-top">VNL<span>/</span>PAPER</a><p>Vernacular is a speculative product-design study by Usamah Moin, combining engineering discipline with visual taste.</p><a href={sitePath('/')}>Back to index <ArrowRight aria-hidden="true" /></a></footer>
    </div>
  );
}

function Field() {
  const [trail, setTrail] = useState(0);
  const [layer, setLayer] = useState<'Terrain' | 'Water' | 'Shelter'>('Terrain');
  const [saved, setSaved] = useState(false);
  const [offline, setOffline] = useState(false);
  const routes = [
    { code: 'R-01', name: 'Fern Canyon Loop', miles: '6.8 MI', time: '3H 20M', gain: '1,240 FT', grade: 'MODERATE', color: '#ff5b38', path: 'M 86 548 C 152 505 184 454 246 447 C 316 438 330 361 397 346 C 468 330 464 260 536 246 C 621 229 655 164 731 191 C 808 218 835 148 914 112', points: [[86,548],[397,346],[731,191],[914,112]], note: 'Old-growth cedar, a narrow creek crossing, and a quiet final ridge.' },
    { code: 'R-02', name: 'Juniper Ridge', miles: '4.2 MI', time: '2H 05M', gain: '860 FT', grade: 'STEADY', color: '#214fd1', path: 'M 104 144 C 183 158 208 213 276 229 C 348 246 351 319 429 333 C 517 349 551 416 633 408 C 724 400 765 475 886 536', points: [[104,144],[276,229],[633,408],[886,536]], note: 'Exposed stone, dry juniper, and long western views at the turn.' },
    { code: 'R-03', name: 'Bear Lake Path', miles: '8.1 MI', time: '4H 10M', gain: '1,680 FT', grade: 'CHALLENGING', color: '#e04482', path: 'M 84 498 C 143 423 213 490 272 406 C 331 323 389 378 452 292 C 518 202 592 268 654 180 C 720 87 806 172 916 82', points: [[84,498],[272,406],[654,180],[916,82]], note: 'A longer ascent through spruce shade to an open alpine basin.' },
  ];
  const route = routes[trail];
  const layerLegend = { Terrain: 'Contour / 40 ft', Water: 'Creek + spring', Shelter: 'Camp access' }[layer];
  return (
    <div className={`demo field-demo field-${layer.toLowerCase()}`}>
      <header className="field-topbar"><a href={sitePath('/')} aria-label="Back to portfolio index">FIELD<span>/06</span></a><div><i aria-hidden="true" /> Olympic Peninsula · 47.8021° N</div><span>58° / LIGHT RAIN</span></header>
      <main className="field-explorer">
        <section className="field-map-stage" aria-label={`${route.name} topographic route preview`}>
          <div className="field-map-heading"><span>ROUTE READER / {layer.toUpperCase()}</span><strong>{route.code}</strong></div>
          <div className="field-layer-switch" aria-label="Map layer">{(['Terrain','Water','Shelter'] as const).map((item) => <button type="button" key={item} className={layer === item ? 'active' : ''} onClick={() => setLayer(item)} aria-pressed={layer === item}>{item}</button>)}</div>
          <div className="field-topography" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
          <svg className="field-route-canvas" viewBox="0 0 1000 650" role="img" aria-label={`${route.name}, ${route.miles}, ${route.gain} elevation gain`}>
            {layer === 'Terrain' && <g className="field-context-terrain"><path d="M 16 540 C 170 418 257 497 389 362 S 635 282 760 154 S 913 73 1002 18"/><path d="M -12 604 C 156 485 281 570 446 408 S 708 334 854 187 S 956 122 1022 78"/><path d="M 42 456 C 181 346 252 421 352 299 S 551 224 670 117 S 833 53 942 -12"/></g>}
            {layer === 'Water' && <g className="field-context-water"><path className="field-river" d="M -30 426 C 124 344 159 395 281 303 C 412 204 500 305 633 215 C 758 131 819 190 1030 38"/><path d="M 244 -20 C 226 94 300 128 276 229 C 253 326 303 391 246 447 C 196 497 224 574 175 686"/><path d="M 694 -18 C 674 86 719 118 731 191 C 745 279 691 340 723 435 C 751 520 710 579 742 674"/><g transform="translate(281 303)"><circle r="18"/><circle r="6"/><text x="28" y="5">SPRING 01</text></g><g transform="translate(633 215)"><circle r="18"/><circle r="6"/><text x="28" y="5">WATER 02</text></g></g>}
            {layer === 'Shelter' && <g className="field-context-shelter"><path d="M 154 606 L 246 447 L 397 346 L 548 522"/><path d="M 397 346 L 633 408 L 820 314"/><g className="field-shelter-node" transform="translate(154 606)"><circle r="22"/><rect x="-7" y="-7" width="14" height="14"/><text x="31" y="5">CAMP A</text></g><g className="field-shelter-node" transform="translate(548 522)"><circle r="22"/><rect x="-7" y="-7" width="14" height="14"/><text x="31" y="5">RAIN SHELTER</text></g><g className="field-shelter-node" transform="translate(820 314)"><circle r="22"/><rect x="-7" y="-7" width="14" height="14"/><text x="31" y="5">RIDGE HUT</text></g></g>}
            <path key={`${trail}-${layer}`} className="field-live-route" d={route.path} style={{stroke: route.color}} />
            {route.points.map(([cx, cy], index) => <g className="field-waypoint" key={`${trail}-${index}`} transform={`translate(${cx} ${cy})`}><circle r={index === 0 || index === route.points.length - 1 ? 13 : 9} style={{fill: route.color}}/><circle r="4"/><text x="17" y="4">{index === 0 ? 'START' : index === route.points.length - 1 ? 'SUMMIT' : `0${index + 1}`}</text></g>)}
          </svg>
          <div className="field-map-label field-map-label-a">OWL CREEK</div><div className="field-map-label field-map-label-b">NORTH RIDGE</div><div className="field-map-label field-map-label-c">BEAR BASIN</div>
          <div className="field-map-legend"><span><i style={{background: route.color}} />Active route</span><span><i />{layerLegend}</span></div>
        </section>

        <aside className="field-route-panel">
          <div className="field-panel-heading"><span>CHOOSE A LINE</span><small>Three routes / one weather window</small></div>
          <div className="field-route-list">{routes.map((item, index) => <button type="button" key={item.code} className={trail === index ? 'active' : ''} onClick={() => setTrail(index)} aria-pressed={trail === index}><span>{item.code}</span><strong>{item.name}</strong><small>{item.miles} · {item.grade}</small><i style={{background: item.color}} /></button>)}</div>
          <article className="field-route-detail" aria-live="polite"><span>{route.grade} / SELECTED</span><h2>{route.name}</h2><p>{route.note}</p><div><span><b>{route.miles}</b>Distance</span><span><b>{route.gain}</b>Gain</span><span><b>{route.time}</b>Time</span></div></article>
          <div className="field-actions"><button type="button" className={saved ? 'active' : ''} onClick={() => setSaved(!saved)} aria-pressed={saved}><Bookmark fill={saved ? 'currentColor' : 'none'} />{saved ? 'Route saved' : 'Save route'}</button><button type="button" className={offline ? 'active' : ''} onClick={() => setOffline(!offline)} aria-pressed={offline}><Download />{offline ? 'Available offline' : 'Make offline'}</button></div>
        </aside>
      </main>
      <footer className="field-footer"><span>Map concept / not for navigation</span><div><i style={{background: route.color}} /><b>{route.name}</b> is ready to read.</div><button type="button" onClick={() => setTrail((trail + 1) % routes.length)}>Next route <ArrowRight /></button></footer>
    </div>
  );
}

function Atelier() {
  const looks = [
    {
      id: 'line-coat', number: '01', name: 'Line Coat', note: 'A boundary that moves.', word: 'BOUND', gesture: 'Boundary', cut: 'Long, asymmetric, protective',
      image: '/images/atelier-line-coat.jpg', alt: 'Model wearing a long architectural black wool coat with an asymmetric collar',
      price: 1280, material: 'Double-face wool / horn closure', tone: '#24211f', text: '#f3eee5',
      notes: ['Shoulder sets the perimeter', 'Closure interrupts symmetry', 'Hem releases the stride'],
    },
    {
      id: 'orbit-jacket', number: '02', name: 'Orbit Jacket', note: 'Volume without noise.', word: 'ORBIT', gesture: 'Volume', cut: 'Cropped, curved, suspended',
      image: '/images/atelier-orbit-jacket.jpg', alt: 'Model wearing an ivory sculptural jacket with curved sleeves and a charcoal column skirt',
      price: 860, material: 'Brushed wool / cotton structure', tone: '#d9d2c7', text: '#171513',
      notes: ['Sleeve holds negative space', 'Curve softens the shoulder', 'Short hem lengthens the line'],
    },
    {
      id: 'bias-drape', number: '03', name: 'Bias Drape', note: 'Movement writes the silhouette.', word: 'FLOW', gesture: 'Flow', cut: 'Bias cut, released at the hip',
      image: '/images/atelier-bias-drape.jpg', alt: 'Model wearing an oxblood draped satin top with wide black trousers',
      price: 640, material: 'Washed satin / wool trouser', tone: '#52201f', text: '#f5eee5',
      notes: ['Bias redirects gravity', 'Fold records movement', 'Trouser steadies the gesture'],
    },
  ];
  const [lookIndex, setLookIndex] = useState(0);
  const [lens, setLens] = useState<'editorial' | 'design'>('editorial');
  const [size, setSize] = useState('02');
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<Record<string, { quantity: number; size: string }>>({});
  const selected = looks[lookIndex];
  const bagItems = looks.filter((look) => (bag[look.id]?.quantity ?? 0) > 0);
  const bagCount = Object.values(bag).reduce((total, item) => total + item.quantity, 0);
  const subtotal = bagItems.reduce((total, look) => total + look.price * bag[look.id].quantity, 0);
  const addSelected = () => {
    setBag((current) => ({ ...current, [selected.id]: { quantity: (current[selected.id]?.quantity ?? 0) + 1, size } }));
    setBagOpen(true);
  };
  const updateBag = (id: string, amount: number) => {
    setBag((current) => {
      const item = current[id];
      if (!item) return current;
      const quantity = Math.max(0, item.quantity + amount);
      const next = { ...current };
      if (quantity === 0) delete next[id];
      else next[id] = { ...item, quantity };
      return next;
    });
  };
  return (
    <div className="demo atelier-demo" id="atelier-top">
      <header className="atelier-casebar">
        <button className="atelier-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle ATELIER navigation" aria-expanded={menuOpen}><Menu aria-hidden="true" /></button>
        <a className="atelier-wordmark" href="#atelier-top"><span>ATELIER / 07</span><small>INTERACTION + ART DIRECTION</small></a>
        <nav className={menuOpen ? 'open' : ''} aria-label="ATELIER study sections"><a href="#atelier-stage" onClick={() => setMenuOpen(false)}>Prototype</a><a href="#atelier-decisions" onClick={() => setMenuOpen(false)}>Decisions</a><a href="#atelier-philosophy" onClick={() => setMenuOpen(false)}>Philosophy</a></nav>
        <div className="atelier-nav-actions"><span>CASE STUDY / 2026</span><button type="button" onClick={() => setBagOpen(true)} aria-label={`Open fitting bag, ${bagCount} items`}><ShoppingBag aria-hidden="true" /><i>{bagCount}</i></button></div>
      </header>

      <main>
        <section className={`atelier-stage lens-${lens}`} id="atelier-stage" style={{ '--atelier-tone': selected.tone, '--atelier-look-text': selected.text } as React.CSSProperties}>
          <div className="atelier-stage-grid" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="atelier-stage-intro"><span>PORTFOLIO PROTOTYPE / 01</span><p>A fashion interface that begins with a spatial gesture, not a product category.</p></div>
          <div className="atelier-lens" role="group" aria-label="Choose presentation lens"><span>VIEW THROUGH</span><button type="button" className={lens === 'editorial' ? 'active' : ''} onClick={() => setLens('editorial')} aria-pressed={lens === 'editorial'}>Editorial</button><button type="button" className={lens === 'design' ? 'active' : ''} onClick={() => setLens('design')} aria-pressed={lens === 'design'}>Design notes</button></div>
          <div className="atelier-stage-word" aria-hidden="true">{selected.word}</div>
          <figure key={`${selected.id}-${lens}`}><Image src={sitePath(selected.image)} alt={selected.alt} width={1024} height={1536} priority unoptimized sizes="(max-width: 700px) 72vw, 44vw" /><figcaption>FORM {selected.number} / {selected.gesture.toUpperCase()}</figcaption>{lens === 'design' && <div className="atelier-annotations" aria-label="Design annotations">{selected.notes.map((note, index) => <span key={note} className={`note-${index + 1}`}><i />0{index + 1} / {note}</span>)}</div>}</figure>
          <div className="atelier-stage-copy" aria-live="polite"><span>ACTIVE GESTURE / {selected.number}</span><h2>{selected.name}</h2><blockquote>“{selected.note}”</blockquote><dl><div><dt>Cut</dt><dd>{selected.cut}</dd></div><div><dt>Material</dt><dd>{selected.material}</dd></div><div><dt>Prototype</dt><dd>${selected.price.toLocaleString()}</dd></div></dl></div>
          <div className="atelier-look-score" role="group" aria-label="Choose a garment gesture">{looks.map((look, index) => <button type="button" key={look.id} className={lookIndex === index ? 'active' : ''} onClick={() => { setLookIndex(index); setSize('02'); }} aria-pressed={lookIndex === index}><span>{look.number}</span><i /><strong>{look.gesture}</strong><small>{look.word}</small></button>)}</div>
          <div className="atelier-stage-actions"><fieldset><legend>PROTOTYPE SIZE</legend>{['00','01','02','03','04'].map((item) => <button type="button" key={item} className={size === item ? 'active' : ''} onClick={() => setSize(item)} aria-pressed={size === item}>{item}</button>)}</fieldset><button className="atelier-add" type="button" onClick={addSelected}>Add form {selected.number}, size {size} <ArrowRight aria-hidden="true" /></button><button className="atelier-save" type="button" onClick={() => setSaved(!saved)} aria-pressed={saved}><Heart fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />{saved ? 'Saved as reference' : 'Save the reference'}</button></div>
          <small className="atelier-stage-disclaimer">FICTIONAL COMMERCE FLOW / NO PAYMENT CONNECTED</small>
        </section>

        <section className="atelier-thesis">
          <span>THE THESIS / 07</span><h3>What if fashion commerce sold a <em>way of seeing</em> before it sold an object?</h3><p>The interface turns three garments into three spatial verbs. Switching looks changes type, color, annotations, and product logic as one system.</p>
        </section>

        <section className="atelier-decisions" id="atelier-decisions"><header><span>02 / DESIGN DECISIONS</span><h3>The portfolio<br />lens stays on.</h3><p>Visitors can experience the concept and inspect the thinking without leaving the prototype.</p></header><div><article><b>01</b><span>PROBLEM</span><h4>Product grids flatten point of view.</h4><p>A conventional category page would make the silhouettes feel interchangeable.</p></article><article><b>02</b><span>DESIGN MOVE</span><h4>Make gesture the navigation model.</h4><p>Boundary, volume, and flow become both the collection story and the interaction structure.</p></article><article><b>03</b><span>PROOF IN USE</span><h4>One state changes the whole composition.</h4><p>Image, field color, typography, annotations, details, and bag selection remain synchronized.</p></article></div>
        </section>

        <section className="atelier-sequence" id="atelier-collection"><header><span>03 / INTERACTION SCORE</span><h3>One collection.<br />Three tempos.</h3></header><div>{looks.map((look, index) => <button type="button" key={look.id} className={lookIndex === index ? 'active' : ''} onClick={() => { setLookIndex(index); setSize('02'); }} aria-pressed={lookIndex === index}><Image src={sitePath(look.image)} alt="" width={1024} height={1536} loading="lazy" unoptimized sizes="(max-width: 700px) 100vw, 32vw" /><span>{look.number}</span><strong>{look.word}</strong><small>{look.note}</small><i>SELECT GESTURE <ArrowRight aria-hidden="true" /></i></button>)}</div>
        </section>

        <section className="atelier-philosophy" id="atelier-philosophy"><span>04 / PHILOSOPHY</span><div><h3>Not fashion<br />as novelty.<br /><em>Dress as practice.</em></h3><p>A useful wardrobe is not a stream of replacements. It is a small language learned through repetition. Proportion gives confidence. Material creates memory. Wear makes the object more specific to its person.</p></div><ol><li><b>01</b><strong>Form follows movement.</strong><p>A silhouette is finished by the body, never by the hanger.</p></li><li><b>02</b><strong>Restraint creates recognition.</strong><p>One decisive line is remembered longer than ten decorative ideas.</p></li><li><b>03</b><strong>Attachment precedes longevity.</strong><p>We keep what becomes part of how we understand ourselves.</p></li></ol></section>

        <section className="atelier-construction"><div><span>05 / CONSTRUCTION NOTES</span><h3>The inside<br />must deserve<br />the outside.</h3></div><div className="atelier-construction-notes"><details open><summary>01 / PROPORTION <Plus aria-hidden="true" /></summary><p>The shoulder establishes the room around the body. The hem answers only after movement begins.</p></details><details><summary>02 / MATERIAL <Plus aria-hidden="true" /></summary><p>Material descriptions are sample specifications for this fictional collection. No environmental performance claim is implied.</p></details><details><summary>03 / REPAIR <Plus aria-hidden="true" /></summary><p>Seams, closures, and panels remain legible so care can be understood as part of ownership, not an afterthought.</p></details></div></section>

        <section className="atelier-journal" id="atelier-journal"><span>06 / FIELD NOTES</span><div className="atelier-journal-grid"><figure><Image src={sitePath('/images/atelier-orbit-jacket.jpg')} alt="Detail study of the ivory Orbit Jacket silhouette" width={1024} height={1536} loading="lazy" unoptimized sizes="(max-width: 700px) 100vw, 44vw" /></figure><article><small>NOTE 07 / VOLUME</small><h3>The space<br />between cloth<br />and skin.</h3><p>Fashion becomes interesting when it stops decorating the body and starts negotiating with it. The Orbit Jacket holds a quiet perimeter, giving posture a shape without forcing performance.</p><a href="#atelier-collection">Return to the collection <ArrowRight aria-hidden="true" /></a></article></div></section>
      </main>

      <footer className="atelier-footer"><a href="#atelier-top">ATELIER / STUDY 07</a><span>ENGINEERING JUDGMENT / FASHION POINT OF VIEW</span><a href={sitePath('/')}>Portfolio index <ArrowRight aria-hidden="true" /></a></footer>

      {bagOpen && <><button className="atelier-bag-scrim" type="button" onClick={() => setBagOpen(false)} aria-label="Close fitting bag" /><aside className="atelier-bag" aria-label="Fitting bag" aria-live="polite"><header><div><span>FITTING BAG</span><b>{bagCount} {bagCount === 1 ? 'LOOK' : 'LOOKS'}</b></div><button type="button" onClick={() => setBagOpen(false)} aria-label="Close fitting bag"><X aria-hidden="true" /></button></header>{bagItems.length ? <><div className="atelier-bag-list">{bagItems.map((look) => <article key={look.id}><Image src={sitePath(look.image)} alt="" width={1024} height={1536} loading="lazy" unoptimized sizes="88px" /><div><b>{look.name}</b><span>Prototype size {bag[look.id].size}</span><small>${look.price.toLocaleString()}</small><div><button type="button" onClick={() => updateBag(look.id, -1)} aria-label={`Remove one ${look.name}`}><Minus aria-hidden="true" /></button><output aria-label={`${bag[look.id].quantity} in fitting bag`}>{bag[look.id].quantity}</output><button type="button" onClick={() => updateBag(look.id, 1)} aria-label={`Add one ${look.name}`}><Plus aria-hidden="true" /></button></div></div></article>)}</div><div className="atelier-bag-total"><span>PROTOTYPE SUBTOTAL</span><b>${subtotal.toLocaleString()}</b></div><button className="atelier-bag-action" type="button" onClick={() => setBagOpen(false)}>Return to the study <ArrowRight aria-hidden="true" /></button><p>This bag stays in the current browser view. No checkout is connected.</p></> : <div className="atelier-bag-empty"><ShoppingBag aria-hidden="true" /><h3>The fitting room is open.</h3><p>Select a look and size to begin.</p><button type="button" onClick={() => setBagOpen(false)}>View the collection</button></div>}</aside></>}
    </div>
  );
}

function Signal() {
  const [period, setPeriod] = useState('Month');
  return (
    <div className="demo signal-demo">
      <nav><b>signal</b><span>Overview</span><span>Activity</span><span>Plan</span><button><CreditCard /> Cards</button></nav>
      <main><header><div><small>YOUR BALANCE</small><h2>$24,680<span>.42</span></h2><em><TrendingUp /> +$1,842 this month</em></div><div className="signal-tabs">{['Week','Month','Year'].map(item => <button key={item} className={period === item ? 'active' : ''} onClick={() => setPeriod(item)} aria-pressed={period === item}>{item}</button>)}</div></header>
        <div className="signal-chart"><svg viewBox="0 0 800 210" preserveAspectRatio="none" aria-label={`${period} balance trend`}><path d="M0 188 C90 174 105 88 190 122 S312 168 365 96 S470 54 525 83 S652 130 800 18"/><path className="fill" d="M0 188 C90 174 105 88 190 122 S312 168 365 96 S470 54 525 83 S652 130 800 18 L800 210 L0 210Z"/></svg><i style={{left: period === 'Week' ? '28%' : period === 'Month' ? '64%' : '88%'}}><span>{period}<b>+$612</b></span></i></div>
        <section className="signal-bottom"><article><div><small>SAFE TO SPEND</small><CircleDollarSign /></div><strong>$3,240</strong><p>After bills, goals, and your usual buffer.</p></article><article><div><small>SEPTEMBER GOAL</small><span>72%</span></div><strong>Lake house weekend</strong><div className="goal-bar"><i /></div><p>$1,440 of $2,000</p></article><article><div><small>UP NEXT</small><span>SEP 12</span></div><strong>Studio rent</strong><p>$1,850 scheduled</p><button>View plan <ChevronRight /></button></article></section>
      </main>
    </div>
  );
}

function Civic() {
  const [requestFilter, setRequestFilter] = useState<'All' | 'In progress' | 'Resolved'>('All');
  const [issueType, setIssueType] = useState('Streetlight');
  const [submitted, setSubmitted] = useState(false);
  const [priority, setPriority] = useState('Safe crossings');
  const requests = [
    { id: 'CHI-4821', category: 'Streetlight', title: 'Lamp out beside Palmer Square', place: '2200 N Kedzie Ave', status: 'In progress', age: '2 days', color: '#ff4f38' },
    { id: 'CHI-4774', category: 'Sidewalk', title: 'Broken curb at accessible crossing', place: 'Milwaukee + California', status: 'In progress', age: '4 days', color: '#1747d1' },
    { id: 'CHI-4688', category: 'Tree', title: 'Storm branch blocking the path', place: 'Humboldt Blvd + Wabansia', status: 'Resolved', age: 'Closed today', color: '#15875c' },
    { id: 'CHI-4590', category: 'Water', title: 'Hydrant leak near school entrance', place: 'Armitage + Richmond', status: 'Resolved', age: 'Closed Sep 8', color: '#8f4bd8' },
  ];
  const visibleRequests = requestFilter === 'All' ? requests : requests.filter((item) => item.status === requestFilter);
  return (
    <div className="demo civic-demo" id="civic-top">
      <header className="civic-nav"><a href="#civic-top" className="civic-brand">CIVIC<span>/COMMONS</span></a><nav aria-label="Civic Commons navigation"><a href="#services">Services</a><a href="#requests">Requests</a><a href="#priorities">Priorities</a></nav><a className="civic-report-link" href="#report">Report an issue <ArrowRight /></a></header>

      <main>
        <section className="civic-hero">
          <div className="civic-hero-copy"><span>CHICAGO / PUBLIC-SERVICE PROTOTYPE</span><h2>The city is<br />a shared <em>interface.</em></h2><p>See what is working, report what is not, and understand what happens next without learning how government is organized first.</p><a href="#report">Start a request <ArrowRight /></a></div>
          <div className="civic-bulletin"><div><span>RIGHT NOW</span><i>Wed / 10 Sep</i></div><strong>3</strong><h3>services need attention</h3><ul><li><b>Blue Line</b><span>Minor delays</span></li><li><b>Ward 32 pickup</b><span>1 day late</span></li><li><b>Cooling centers</b><span>Open until 7 PM</span></li></ul><small>Illustrative service data</small></div>
          <div className="civic-street-grid" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><span>●</span><b>+</b></div>
        </section>

        <section className="civic-services" id="services"><header><span>01 / SERVICE HEALTH</span><h3>Know before<br />you need it.</h3><p>Plain-language status across the systems that shape an ordinary day.</p></header><div className="civic-service-grid"><article><span>TRANSIT</span><b>● GOOD</b><strong>96%</strong><p>Scheduled service currently operating.</p></article><article><span>STREETS</span><b>▲ WATCH</b><strong>14</strong><p>Active maintenance zones in this sample.</p></article><article><span>WATER</span><b>● GOOD</b><strong>02</strong><p>Localized advisories in the prototype.</p></article><article><span>PUBLIC SPACE</span><b>● GOOD</b><strong>318</strong><p>Parks shown as open in sample data.</p></article></div></section>

        <section className="civic-requests" id="requests"><div className="civic-section-heading"><span>02 / OPEN REQUESTS</span><h3>Visible work.<br />Clear ownership.</h3><div>{(['All','In progress','Resolved'] as const).map((item) => <button type="button" key={item} className={requestFilter === item ? 'active' : ''} onClick={() => setRequestFilter(item)} aria-pressed={requestFilter === item}>{item}</button>)}</div></div><div className="civic-request-list">{visibleRequests.map((item) => <article key={item.id}><i style={{background: item.color}} /><span>{item.id}<small>{item.category}</small></span><h4>{item.title}<small><MapPin />{item.place}</small></h4><b>{item.status}</b><time>{item.age}</time></article>)}</div><p className="civic-data-note">Sample requests created for this interaction prototype. No real resident or city records are shown.</p></section>

        <section className="civic-report" id="report"><div className="civic-report-intro"><span>03 / MAKE A REQUEST</span><h3>One form.<br />No department maze.</h3><p>Describe the public-space problem. The interface handles the category; you keep the confirmation number.</p><div><b>1</b>Choose the issue <i /> <b>2</b>Add the place <i /> <b>3</b>Track the work</div></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><fieldset><legend>What needs attention?</legend><div>{['Streetlight','Sidewalk','Tree','Water'].map((item) => <button type="button" key={item} className={issueType === item ? 'active' : ''} onClick={() => setIssueType(item)} aria-pressed={issueType === item}>{item}</button>)}</div></fieldset><label>Location<input required defaultValue="Palmer Square, Chicago" /></label><label>What did you notice?<textarea required defaultValue="The light beside the northeast path has been out for two nights." /></label><button className="civic-submit" type="submit">Create prototype request <ArrowRight /></button><small>Prototype only. This form does not transmit personal information or contact the city.</small>{submitted && <output className="civic-confirmation"><Check /> Request drafted locally <b>CHI-DEMO</b><button type="button" onClick={() => setSubmitted(false)}>Dismiss</button></output>}</form></section>

        <section className="civic-priorities" id="priorities"><header><span>04 / NEIGHBORHOOD PRIORITIES</span><h3>What should<br />move first?</h3><p>This local-only simulator demonstrates transparent participation without pretending to cast a real vote.</p></header><div>{['Safe crossings','More tree canopy','Late-night transit'].map((item, index) => <button type="button" key={item} className={priority === item ? 'active' : ''} onClick={() => setPriority(item)} aria-pressed={priority === item}><span>0{index + 1}</span><strong>{item}</strong><i>{priority === item ? 'Your priority' : 'Select'}</i><ArrowRight /></button>)}</div></section>

        <section className="civic-principle"><span>DESIGN PRINCIPLE</span><blockquote>“A public interface should explain the institution through the next useful action.”</blockquote><p>I used high contrast, plain language, visible status, and reversible local interactions so the concept demonstrates trust instead of relying on civic-looking colors.</p></section>
      </main>

      <footer className="civic-footer"><a className="civic-brand" href="#civic-top">CIVIC<span>/COMMONS</span></a><p>Concept and interface design by Usamah Moin.<br />Sample data only.</p><a href={sitePath('/')}>Back to index <ArrowRight /></a></footer>
    </div>
  );
}

function Lumen() {
  const [tool, setTool] = useState('move');
  const [zoom, setZoom] = useState(82);
  const toolButtons = [{name:'move',icon:<Move key="m"/>},{name:'pen',icon:<PenTool key="p"/>},{name:'type',icon:<Type key="t"/>},{name:'spark',icon:<WandSparkles key="s"/>}];
  return (
    <div className="demo lumen-demo">
      <header><b>lumen</b><div><span className="lumen-live"><i/> Workshop 04</span><span className="faces">AM<span>+4</span></span><button>Share</button></div></header>
      <aside>{toolButtons.map(({name,icon}) => <button key={name} className={tool === name ? 'active' : ''} onClick={() => setTool(name)} aria-label={`${name} tool`} aria-pressed={tool === name}>{icon}</button>)}</aside>
      <main className={`lumen-canvas tool-${tool}`}><div className="sticky coral"><small>FRAMING</small><p>What if the dashboard felt more like a conversation?</p><span>AM</span></div><div className="sticky lime"><small>PRINCIPLE 02</small><p>Show the next best action, not every possible action.</p><span>SK</span></div><div className="lumen-photo"><img src={sitePath('/images/lumen-human.png')} alt="Creative team collaborating around a studio wall" /><span>NEW MENTAL MODEL</span></div><div className="lumen-ring"><span>clarity</span><span>trust</span><span>momentum</span></div><div className="lumen-link"/><div className="cursor-label"><MousePointer2/> Mia</div></main>
      <footer><button onClick={() => setZoom(Math.max(40, zoom-10))} aria-label="Zoom out"><Minus /></button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(140, zoom+10))} aria-label="Zoom in"><Plus /></button><button><ZoomIn/> Fit</button></footer>
    </div>
  );
}

function Pantry() {
  const products = [
    { id: 'tomato', name: 'Peak tomato supper', label: 'FARM FAVORITE', description: 'Tomato toast, burrata, basil oil, and a sharp little salad.', detail: '20 min · serves 2', price: 28, moods: ['Bright', 'Quick'], image: '/images/pantry-tomato-sketch.jpg', alt: 'Marker and ink sketch of tomato and burrata toast on an illustrated recipe sheet', tone: 'tomato' },
    { id: 'greens', name: 'Green everything bowl', label: 'JUST HARVESTED', description: 'Little gems, market herbs, grains, tahini, and crisp seeds.', detail: '15 min · serves 2', price: 24, moods: ['Bright', 'Quick'], image: '/images/pantry-greens-sketch.jpg', alt: 'Marker and ink sketch of a green grain bowl with herbs and lemon', tone: 'greens' },
    { id: 'beans', name: 'Beans on toast, deluxe', label: 'SLOW EVENING', description: 'Butter beans, sourdough, lemon, greens, and smoky chile oil.', detail: '30 min · serves 2', price: 22, moods: ['Comfort'], image: '/images/pantry-beans-sketch.jpg', alt: 'Marker and ink sketch of creamy butter beans on sourdough toast', tone: 'beans' },
    { id: 'galette', name: 'Plum edge galette', label: 'BAKER\'S NOTE', description: 'Late plums, flaky pastry, almond cream, and lemon sugar.', detail: '45 min · serves 4', price: 26, moods: ['Sweet', 'Comfort'], image: '/images/pantry-galette-sketch.jpg', alt: 'Marker and ink sketch of a rustic plum galette with pastry notes', tone: 'galette' },
  ];
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [bag, setBag] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [orderReady, setOrderReady] = useState(false);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.moods.includes(category);
    const searchable = `${product.name} ${product.description} ${product.label} ${product.moods.join(' ')}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  });
  const bagItems = products.filter((product) => bag[product.id]);
  const bagCount = Object.values(bag).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = bagItems.reduce((sum, product) => sum + product.price * bag[product.id], 0);
  const updateBag = (id: string, change: number) => {
    setOrderReady(false);
    setBag((current) => {
      const quantity = Math.max(0, (current[id] ?? 0) + change);
      const next = { ...current };
      if (quantity === 0) delete next[id]; else next[id] = quantity;
      return next;
    });
  };
  const findDinner = () => document.getElementById('pantry-market')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="demo pantry-demo" id="pantry-top">
      <header className="pantry-nav">
        <a className="pantry-wordmark" href="#pantry-top" aria-label="Pantry home"><span>PANTRY</span><i>sketch market</i></a>
        <nav aria-label="Pantry sections"><a href="#pantry-market">Tonight</a><a href="#pantry-season">The harvest</a><a href="#pantry-method">How it works</a></nav>
        <button className="pantry-bag-button" type="button" onClick={() => setBagOpen(true)} aria-expanded={bagOpen}><ShoppingBag aria-hidden="true" /> Bag <span>{bagCount}</span></button>
      </header>

      <main>
        <section className="pantry-sketch-hero">
          <div className="pantry-hero-copy">
            <span className="pantry-kicker">SEPTEMBER 11 · FIELD SHEET 04</span>
            <h2>Dinner starts<br />with a <em>scribble.</em></h2>
            <p>Small-batch meal kits drawn from what the market has right now. Pick a feeling, not an aisle.</p>
            <form className="pantry-search" onSubmit={(event) => { event.preventDefault(); findDinner(); }}>
              <Search aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try bright, beans, quick..." aria-label="Search meals and moods" />
              <button type="submit">Find dinner <ArrowRight aria-hidden="true" /></button>
            </form>
            <div className="pantry-hero-notes"><span>CHICAGO / 09.11</span><span>4 RECIPES / 12 INGREDIENTS</span></div>
          </div>
          <figure className="pantry-hero-art">
            <Image src={sitePath('/images/pantry-sketch-hero.jpg')} alt="Marker and ink sketch of a market basket filled with tomatoes, bread, greens, beans, and plums" width={1600} height={1066} priority unoptimized sizes="(max-width: 820px) 100vw, 58vw" />
            <figcaption><span>MARKET HAUL Nº 04</span><b>Drawn from this week&apos;s harvest</b></figcaption>
            <i aria-hidden="true">NEW<br />THIS<br />WEEK</i>
          </figure>
        </section>

        <section className="pantry-market" id="pantry-market">
          <div className="pantry-section-heading"><span>01 / PICK A FEELING</span><h3>Tonight&apos;s<br /><em>sketchbook.</em></h3><p>Four complete dinner ideas, drawn before they are boxed. Each serves real ingredients with the commitment visible up front.</p></div>
          <div className="pantry-filter-row">
            <div className="pantry-cats" aria-label="Filter meals by mood">{['All', 'Bright', 'Comfort', 'Quick', 'Sweet'].map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
            <output aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? 'idea' : 'ideas'} on the table</output>
          </div>
          {visibleProducts.length > 0 ? <div className="food-grid">{visibleProducts.map((product, index) => <article className={`food-card ${product.tone}`} key={product.id}>
            <div className="food-card-art"><Image src={sitePath(product.image)} alt={product.alt} width={1120} height={1400} loading="lazy" unoptimized sizes="(max-width: 600px) 100vw, (max-width: 820px) 50vw, 28vw" /><span aria-hidden="true">0{index + 1}</span></div>
            <div className="food-card-copy"><span>{product.label}</span><h4>{product.name}</h4><p>{product.description}</p><div><small>{product.detail}</small><strong>${product.price}</strong></div><button type="button" onClick={() => { updateBag(product.id, 1); setBagOpen(true); }}><Plus aria-hidden="true" /> Add the sketch</button></div>
          </article>)}</div> : <div className="pantry-empty"><span>NO MATCH ON THIS PAGE</span><h4>Try a looser scribble.</h4><p>Search for bright, beans, quick, sweet, or clear the filters and look again.</p><button type="button" onClick={() => { setCategory('All'); setQuery(''); }}>Show every recipe</button></div>}
        </section>

        <section className="pantry-season" id="pantry-season">
          <div className="pantry-season-art"><Image src={sitePath('/images/pantry-tomato-sketch.jpg')} alt="Close view of the tomato supper illustration and ingredient notes" width={1120} height={1400} loading="lazy" unoptimized sizes="(max-width: 820px) 100vw, 54vw" /><span>PEAK / NOW</span></div>
          <div className="pantry-season-copy"><span>02 / WHY IT LOOKS THIS WAY</span><h3>A market<br />you can <em>feel.</em></h3><p>The loose black line keeps the food human. Marker color makes each ingredient easy to spot. Warm paper replaces polished grocery photography with the feeling of a cook&apos;s notebook: immediate, imperfect, and inviting.</p><dl><div><dt>RED</dt><dd>Ripeness and appetite</dd></div><div><dt>GREEN</dt><dd>Freshness without generic wellness</dd></div><div><dt>YELLOW</dt><dd>Warmth, energy, and quick decisions</dd></div><div><dt>INK</dt><dd>Structure that holds the mess together</dd></div></dl></div>
        </section>

        <section className="pantry-method" id="pantry-method">
          <header><span>03 / FROM PAGE TO PLATE</span><h3>Three marks.<br />Dinner handled.</h3></header>
          <div><article><b>01</b><h4>Follow the appetite</h4><p>Search by mood or scan the color-coded recipe sheets.</p></article><article><b>02</b><h4>Build your bag</h4><p>Add a complete kit, adjust quantities, and see the cost immediately.</p></article><article><b>03</b><h4>Cook the drawing</h4><p>Every kit arrives as measured ingredients plus the illustrated field sheet.</p></article></div>
        </section>
      </main>

      <footer className="pantry-footer"><a href="#pantry-top">PANTRY / SKETCH MARKET</a><span>Concept, interface, and art direction by Usamah Moin</span><a href={sitePath('/')}>Portfolio index <ArrowRight aria-hidden="true" /></a></footer>

      {bagOpen && <><button className="pantry-bag-scrim" type="button" onClick={() => setBagOpen(false)} aria-label="Close market bag" /><aside className="pantry-bag-drawer" aria-label="Market bag" aria-live="polite"><header><div><span>YOUR MARKET BAG</span><b>{bagCount} {bagCount === 1 ? 'kit' : 'kits'}</b></div><button type="button" onClick={() => setBagOpen(false)} aria-label="Close bag"><X aria-hidden="true" /></button></header>{bagItems.length > 0 ? <><div className="pantry-bag-list">{bagItems.map((product) => <article key={product.id}><Image src={sitePath(product.image)} alt="" width={1120} height={1400} loading="lazy" unoptimized sizes="94px" /><div><b>{product.name}</b><span>${product.price} each</span><div><button type="button" onClick={() => updateBag(product.id, -1)} aria-label={`Remove one ${product.name}`}><Minus aria-hidden="true" /></button><output aria-label={`${bag[product.id]} in bag`}>{bag[product.id]}</output><button type="button" onClick={() => updateBag(product.id, 1)} aria-label={`Add one ${product.name}`}><Plus aria-hidden="true" /></button></div></div></article>)}</div><div className="pantry-bag-total"><span>Prototype subtotal</span><b>${subtotal}</b></div><button className="pantry-prepare" type="button" onClick={() => setOrderReady(true)}>{orderReady ? <><Check aria-hidden="true" /> Demo order prepared</> : <>Prepare demo order <ArrowRight aria-hidden="true" /></>}</button>{orderReady && <p className="pantry-order-note">Saved in this browser view only. No payment or delivery request was sent.</p>}</> : <div className="pantry-bag-empty"><ShoppingBag aria-hidden="true" /><h4>The page is still clean.</h4><p>Add a recipe sketch and it will appear here.</p><button type="button" onClick={() => setBagOpen(false)}>Keep looking</button></div>}</aside></>}
    </div>
  );
}
