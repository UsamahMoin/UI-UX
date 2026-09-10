'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  ArrowRight, Bike, Bookmark,
  Check, ChevronRight, CircleDollarSign, Coffee,
  CreditCard, Download, Headphones, Heart, Info, Leaf, MapPin, Menu, Minus, Moon,
  MousePointer2, Move, Pause, PenTool, Play, Plus, Search, ShoppingBag, Sun,
  Sparkles, Star, TrainFront, TrendingUp, Type, WandSparkles, ZoomIn,
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
      <footer><span>08 suites</span><span>Forest onsen</span><span>Seasonal table</span><span>Open Oct—May</span></footer>
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
      <header><b>F—RM</b><a className="form-search-link" href={sitePath('/work/form/archive')}><Search /> Search the archive</a><a className="form-menu-link" href={sitePath('/work/form/archive')} aria-label="Open FORM archive"><Menu aria-hidden="true" /></a></header>
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
            <p>A deliberately over-designed paper plate: deep rim, rigid ribs, honest material. Made for the meal—not the landfill aesthetic.</p>
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
          <div><span>PLATE 02 / DINNER</span><h3>Build your stack.</h3><p>Concept configuration for a future product system. Pricing is illustrative—not a live offer.</p></div>
          <div className="vnl-buy-controls">
            <fieldset><legend>Pack size</legend><div>{packs.map((item) => <button type="button" key={item.count} className={pack.count === item.count ? 'active' : ''} onClick={() => setPack(item)} aria-pressed={pack.count === item.count}>{item.count}</button>)}</div></fieldset>
            <div className="vnl-quantity"><span>Quantity</span><div><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus aria-hidden="true" /></button><output aria-live="polite">{String(quantity).padStart(2, '0')}</output><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus aria-hidden="true" /></button></div></div>
            <button className={`vnl-add ${added ? 'added' : ''}`} type="button" onClick={addToBag}>{added ? <><Check aria-hidden="true" /> Added to bag</> : <>Add concept — ${pack.price * quantity} <ArrowRight aria-hidden="true" /></>}</button>
          </div>
        </section>
      </main>

      <footer className="vnl-footer"><a className="vnl-logo" href="#vernacular-top">VNL<span>/</span>PAPER</a><p>Vernacular is a speculative product-design study by Usamah Moin—engineering discipline with visual taste.</p><a href={sitePath('/work')}>Back to index <ArrowRight aria-hidden="true" /></a></footer>
    </div>
  );
}

function Field() {
  const [trail, setTrail] = useState(0);
  const [layer, setLayer] = useState<'Terrain' | 'Water' | 'Shelter'>('Terrain');
  const [saved, setSaved] = useState(false);
  const [offline, setOffline] = useState(false);
  const routes = [
    { code: 'R—01', name: 'Fern Canyon Loop', miles: '6.8 MI', time: '3H 20M', gain: '1,240 FT', grade: 'MODERATE', color: '#ff5b38', path: 'M 86 548 C 152 505 184 454 246 447 C 316 438 330 361 397 346 C 468 330 464 260 536 246 C 621 229 655 164 731 191 C 808 218 835 148 914 112', points: [[86,548],[397,346],[731,191],[914,112]], note: 'Old-growth cedar, a narrow creek crossing, and a quiet final ridge.' },
    { code: 'R—02', name: 'Juniper Ridge', miles: '4.2 MI', time: '2H 05M', gain: '860 FT', grade: 'STEADY', color: '#214fd1', path: 'M 104 144 C 183 158 208 213 276 229 C 348 246 351 319 429 333 C 517 349 551 416 633 408 C 724 400 765 475 886 536', points: [[104,144],[276,229],[633,408],[886,536]], note: 'Exposed stone, dry juniper, and long western views at the turn.' },
    { code: 'R—03', name: 'Bear Lake Path', miles: '8.1 MI', time: '4H 10M', gain: '1,680 FT', grade: 'CHALLENGING', color: '#e04482', path: 'M 84 498 C 143 423 213 490 272 406 C 331 323 389 378 452 292 C 518 202 592 268 654 180 C 720 87 806 172 916 82', points: [[84,498],[272,406],[654,180],[916,82]], note: 'A longer ascent through spruce shade to an open alpine basin.' },
  ];
  const route = routes[trail];
  const layerLegend = { Terrain: 'Contour / 40 ft', Water: 'Creek + spring', Shelter: 'Camp access' }[layer];
  return (
    <div className={`demo field-demo field-${layer.toLowerCase()}`}>
      <header className="field-topbar"><a href={sitePath('/work')} aria-label="Back to portfolio index">FIELD<span>/06</span></a><div><i aria-hidden="true" /> Olympic Peninsula · 47.8021° N</div><span>58° / LIGHT RAIN</span></header>
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
  const [color, setColor] = useState('Ochre');
  const [saved, setSaved] = useState(false);
  return (
    <div className="demo atelier-demo">
      <nav><Menu aria-hidden="true" /><b>ATELIER<br/>OBJECTS</b><span>Edition 05&nbsp;&nbsp;&nbsp; Journal&nbsp;&nbsp;&nbsp; About</span><div><button onClick={() => setSaved(!saved)} aria-label="Save object" aria-pressed={saved}><Heart fill={saved ? 'currentColor' : 'none'} /></button><button aria-label="Shopping bag, 0 items"><ShoppingBag /><i>0</i></button></div></nav>
      <main><div className={`object-stage ${color.toLowerCase()}`}><span className="edition-stamp">05 / 100</span><div className="object-chair" aria-hidden="true"><i/><b/><em/></div><span className="material">SOLID ASH / HAND OILED</span></div><section><small>NUMBERED EDITION / 2025</small><h2>Fold Chair<br/>No. 05</h2><p>A study in balance and restraint. Three planes meet without visible hardware, allowing the grain to draw the final line.</p><div className="object-price"><b>$1,480</b><span>Made to order · 6 weeks</span></div><div className="swatches"><span>FINISH</span>{['Ochre','Ink','Natural'].map(item => <button key={item} className={`${item.toLowerCase()} ${color === item ? 'active' : ''}`} onClick={() => setColor(item)} aria-label={`${item} finish`} aria-pressed={color === item}/>)}</div><button className="acquire">Acquire this edition <ArrowRight /></button></section></main>
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
  const [mode, setMode] = useState('Train');
  return (
    <div className="demo civic-demo">
      <header><b>CIVIC<span>GO</span></b><nav>Plan&nbsp;&nbsp;&nbsp; Service alerts&nbsp;&nbsp;&nbsp; Accessibility</nav><button>EN · <strong>中文</strong></button></header>
      <main><section><small>CHICAGO, 8:42 AM</small><h2>Move through<br/>your city.</h2><div className="journey"><label><i>A</i><input defaultValue="Logan Square" aria-label="Starting point"/></label><label><i>B</i><input defaultValue="Art Institute of Chicago" aria-label="Destination"/></label><button aria-label="Plan route"><ArrowRight /></button></div><div className="mode-tabs">{['Train','Bike','Walk'].map(item => <button key={item} onClick={() => setMode(item)} className={mode === item ? 'active' : ''} aria-pressed={mode === item}>{item === 'Train' ? <TrainFront/> : item === 'Bike' ? <Bike/> : <MousePointer2/>}{item}</button>)}</div></section><aside><div className="civic-route"><span>56</span><i/><b>18</b><i/><span>4</span></div><div><small>FASTEST ROUTE · {mode.toUpperCase()}</small><h3>{mode === 'Train' ? '32' : mode === 'Bike' ? '27' : '68'} min</h3><p>Blue Line to Monroe, then a 7-minute walk.</p><div className="arrival"><span><TrainFront/> Forest Park</span><b>3 min</b></div><div className="arrival"><span><MapPin/> Monroe</span><b>22 min</b></div></div></aside></main>
      <footer><span><Check /> Elevators working</span><span><Check /> Low-floor access</span><span><Check /> Live arrival data</span></footer>
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
  const [category, setCategory] = useState('Tonight');
  const [count, setCount] = useState(0);
  return (
    <div className="demo pantry-demo">
      <header><b>PANTRY!</b><nav>Market&nbsp;&nbsp;&nbsp; Makers&nbsp;&nbsp;&nbsp; How it works</nav><button><ShoppingBag /> Bag · {count}</button></header>
      <section className="pantry-hero"><span>SEPTEMBER / PEAK SEASON</span><h2>What are we<br/><em>hungry for?</em></h2><div className="pantry-search"><Search/><input placeholder="A cozy dinner, something bright…" aria-label="Search food moods"/><button>Find dinner <ArrowRight/></button></div></section>
      <div className="pantry-cats">{['Tonight','Bright','Comfort','Quick'].map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
      <div className="food-grid"><article className="food-card tomato"><span><Star/> FARM FAVORITE</span><div className="food-visual">🍅</div><h3>Peak tomato supper</h3><p>Heirloom tomatoes, burrata, basil, torn bread.</p><button onClick={() => setCount(count+1)}><Plus/> $28 · Serves 2</button></article><article className="food-card greens"><span><Leaf/> JUST HARVESTED</span><div className="food-visual">🥬</div><h3>Green everything bowl</h3><p>Little gems, herbs, grains, tahini, crisp seeds.</p><button onClick={() => setCount(count+1)}><Plus/> $24 · Serves 2</button></article><article className="food-card beans"><span><Coffee/> SLOW EVENING</span><div className="food-visual">🫘</div><h3>Beans on toast, deluxe</h3><p>Butter beans, sourdough, lemon, chile oil.</p><button onClick={() => setCount(count+1)}><Plus/> $22 · Serves 2</button></article></div>
    </div>
  );
}
