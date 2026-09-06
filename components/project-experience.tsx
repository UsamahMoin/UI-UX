'use client';

import { useState } from 'react';
import {
  ArrowRight, Bike, Bookmark,
  Check, ChevronRight, CircleDollarSign, Coffee, Compass,
  CreditCard, Download, Heart, Leaf, LocateFixed, MapPin, Menu, Minus, Moon,
  MousePointer2, Move, Pause, PenTool, Play, Plus, Search, ShoppingBag, Sun,
  Star, TrainFront, TrendingUp, Type, WandSparkles, ZoomIn,
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
      <section><span className="serein-number">N° 03 / KISO VALLEY</span><h2>Return to<br /><em>the quiet.</em></h2><p>A cedar refuge shaped by mist, mountain water, and the restorative luxury of having nowhere else to be.</p><div className="serein-actions"><button>Explore the residence <ArrowRight /></button></div></section>
      <div className="serein-landscape">
        <img className={`serein-scene ${!isNight ? 'active' : ''}`} src={sitePath('/images/serein-human.png')} alt={isNight ? '' : 'Traveler having tea in a cedar retreat on a misty morning'} aria-hidden={isNight} />
        <img className={`serein-scene serein-scene-dusk ${isNight ? 'active' : ''}`} src={sitePath('/images/serein-dusk.png')} alt={isNight ? 'Traveler having tea in a cedar retreat at blue-hour dusk' : ''} aria-hidden={!isNight} />
      </div>
      <div className="serein-coordinates" aria-label="Location: 35 degrees 51 minutes north, 137 degrees 41 minutes east"><small>Location</small><span>35°51′ N</span><span>137°41′ E</span></div>
      <footer><span>08 suites</span><span>Forest onsen</span><span>Seasonal table</span><span>Open Oct—May</span></footer>
    </div>
  );
}

function Form() {
  const [filter, setFilter] = useState('All matter');
  const items = [
    ['A chair that refuses to sit still', 'OBJECT / 1984', 'form-red'], ['Dancing with the building', 'FILM / 11:08', 'form-yellow'], ['The useful accident', 'CONVERSATION / 042', 'form-ink'], ['Soft architecture', 'ESSAY / 8 MIN', 'form-mint'], ['Studio visit: Mina Park', 'PLACE / SEOUL', 'form-lilac'],
  ];
  return (
    <div className="demo form-demo">
      <header><b>F—RM</b><button><Search /> Search the archive</button><Menu aria-hidden="true" /></header>
      <div className="form-title"><span>INDEPENDENT CULTURE / ISSUE 14</span><h2>Things worth<br />keeping.</h2><p>An expanding archive of people and objects that alter how we see the everyday.</p></div>
      <div className="form-filters">{['All matter','Objects','People','Ideas'].map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
      <div className="form-grid">{items.map(([title, meta, tone], i) => <article key={title} className={tone}>{i === 4 && <img className="form-human" src={sitePath('/images/form-human.png')} alt="Independent designer arranging work in a colorful studio" />}<span>{String(i+1).padStart(2,'0')}</span>{i !== 4 && <div className="form-shape" aria-hidden="true"/>}<small>{meta}</small><h3>{title}</h3><ArrowRight /></article>)}</div>
    </div>
  );
}

function Aura() {
  const [playing, setPlaying] = useState(false);
  const [tone, setTone] = useState('Still');
  return (
    <div className="demo aura-demo">
      <nav><b>aura°</b><span>Library&nbsp;&nbsp; Rituals&nbsp;&nbsp; About</span><button aria-label="Save listening session"><Bookmark /></button></nav>
      <main><small>GENERATIVE SESSION / 24 MIN</small><h2>Make space<br />for <em>{tone.toLowerCase()}.</em></h2><div className={`aura-orb ${playing ? 'playing' : ''}`}><span/><i/><b/></div>
        <div className="aura-player"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause session' : 'Play session'}>{playing ? <Pause /> : <Play />}</button><div><b>Blue Hour, Slowly</b><span><i style={{width: playing ? '46%' : '18%'}} /></span></div><time>{playing ? '08:42' : '00:00'}</time></div>
      </main>
      <footer><span>How should this moment feel?</span><div>{['Still','Open','Warm'].map(item => <button key={item} onClick={() => setTone(item)} className={tone === item ? 'active' : ''} aria-pressed={tone === item}>{item}</button>)}</div></footer>
    </div>
  );
}

function Vernacular() {
  const [size, setSize] = useState(86);
  const [text, setText] = useState('LOUDER THAN WORDS');
  return (
    <div className="demo vernacular-demo">
      <header><b>VNL®</b><span>TYPEFACES</span><span>LICENSES</span><span>STUDIO</span><button><ShoppingBag /> CART (0)</button></header>
      <div className="type-controls"><label>TYPE SOMETHING <input value={text} onChange={e => setText(e.target.value)} aria-label="Specimen text" /></label><label>SIZE <input type="range" min="42" max="150" value={size} onChange={e => setSize(Number(e.target.value))} aria-label="Specimen type size" /> <b>{size}px</b></label></div>
      <div className="type-stage" style={{fontSize: `clamp(42px, ${size/12}vw, ${size}px)`}}>{text || 'TYPE SOMETHING'}</div>
      <footer><div><span>VNL GROTESK</span><b>14 STYLES / VARIABLE</b></div><button>TRY THE FAMILY <ArrowRight /></button><span>ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ</span></footer>
    </div>
  );
}

function Field() {
  const [trail, setTrail] = useState(0);
  const routes = [{name:'Fern Canyon Loop', miles:'6.8 mi', time:'3h 20m'}, {name:'Juniper Ridge', miles:'4.2 mi', time:'2h 05m'}, {name:'Bear Lake Path', miles:'8.1 mi', time:'4h 10m'}];
  const route = routes[trail];
  return (
    <div className="demo field-demo">
      <aside><b>FIELD</b><button aria-label="Search trails"><Search /></button><nav aria-label="Trail tools"><button className="active" aria-label="Explore map" aria-current="page"><Compass /></button><button aria-label="Saved trails"><Bookmark /></button><button aria-label="Download offline map"><Download /></button></nav><div className="field-temp">58°<small>LIGHT RAIN</small></div></aside>
      <section className="field-map" aria-label="Stylized route map"><div className="contour c1"/><div className="contour c2"/><div className="contour c3"/><div className={`route-line route-${trail}`}><i/><i/><i/></div><span className="map-label one">OWL CREEK</span><span className="map-label two">NORTH RIDGE</span><button className="locate" aria-label="Center map on current location"><LocateFixed /></button></section>
      <section className="field-card"><small>ROUTE 0{trail+1} · MODERATE</small><h2>{route.name}</h2><p>A shaded climb through old-growth cedar with clear water at mile 2.4.</p><div><span><b>{route.miles}</b>DISTANCE</span><span><b>1,240 ft</b>ELEVATION</span><span><b>{route.time}</b>EST. TIME</span></div><button onClick={() => setTrail((trail+1)%routes.length)}>Next trail <ArrowRight /></button></section>
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
