'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, Check, Moon, Radio, RotateCcw, Sun } from 'lucide-react';
import { sitePath } from '@/lib/site-path';

const clues = [
  { id: 'clock', number: '01', name: 'The stopped clock', x: 23, y: 25, label: 'STATION RECORD / 00:00', title: 'Twelve minutes missing.', body: 'Every clock on Meridian Street stopped at midnight. The station log says the last tram departed at 12:12. Both entries are in the same handwriting.', fragment: 'The city did not lose its time. Someone took it.', frequency: 94.6 },
  { id: 'antenna', number: '02', name: 'The rooftop signal', x: 89, y: 25, label: 'INTERCEPT / ROOFTOP No. 9', title: 'A voice from tomorrow.', body: 'Radio operator Ada Vale receives a weather report dated one day ahead. Between the forecast and the static, her own voice tells her not to board the tram.', fragment: 'If you hear yourself, do not answer.', frequency: 101.3 },
  { id: 'tram', number: '03', name: 'The last tram', x: 50, y: 75, label: 'LOST PROPERTY / CAR 07', title: 'A ticket with no return.', body: 'The tram is empty except for twelve punched tickets. Each bears the name of a street that disappeared from the city map. Ada finds a thirteenth ticket in her coat.', fragment: 'Last stop: the place you meant to leave behind.', frequency: 106.7 },
] as const;

export function MeridianPoster() {
  const clueRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [frequency, setFrequency] = useState(98);
  const [dawn, setDawn] = useState(false);
  const [ending, setEnding] = useState(false);
  const station = clues.find(clue => Math.abs(clue.frequency - frequency) < 0.25);
  const active = selected === null ? null : clues[selected];
  const inspect = (index: number, reveal = false) => { setSelected(index); setFound(previous => previous.includes(clues[index].id) ? previous : [...previous, clues[index].id]); if (reveal && window.matchMedia('(max-width:850px)').matches) requestAnimationFrame(() => { clueRef.current?.focus({preventScroll:true}); clueRef.current?.scrollIntoView({block:'center',behavior:'auto'}); }); };
  const reset = () => { setSelected(null); setFound([]); setFrequency(98); setDawn(false); setEnding(false); };

  return <div className={`meridian-site ${dawn ? 'meridian-dawn' : ''}`}>
    <header className="meridian-masthead"><a href="#meridian-poster">Meridian Picture House</a><span>A FICTIONAL FILM / AN INTERACTIVE POSTER</span><button onClick={() => setDawn(!dawn)} aria-pressed={dawn}>{dawn ? <Moon /> : <Sun />}{dawn ? 'Midnight ink' : 'First-light ink'}</button></header>
    <div className="meridian-layout">
      <section className="meridian-print" id="meridian-poster" aria-label="Midnight on Meridian illustrated poster">
        <Image unoptimized src={sitePath('/images/meridian-poster.png')} width={1024} height={1536} alt="A coral tram winds through a teal and plum city beneath an amber moon. A station clock and a rooftop antenna overlook the street." priority />
        <div className="meridian-poster-type"><span>A CITY OUT OF TIME. ONE LAST WAY HOME.</span><h2>MIDNIGHT<small>ON MERIDIAN</small></h2></div>
        {clues.map((clue,index) => <button key={clue.id} className={`meridian-hotspot meridian-hotspot-${clue.id} ${found.includes(clue.id) ? 'is-found' : ''}`} style={{left:`${clue.x}%`,top:`${clue.y}%`}} onClick={() => inspect(index, true)} aria-label={`Inspect ${clue.name}`} aria-pressed={selected === index} aria-controls="meridian-clue"><span>{found.includes(clue.id) ? <Check /> : clue.number}</span><b>{clue.name}</b></button>)}
        <div className="meridian-print-footer"><span>AN ORIGINAL STORY WORLD</span><strong>THE LAST TRAM NEVER LEFT.</strong><span>ILLUSTRATED EDITION · 2026</span></div>
      </section>
      <aside className="meridian-companion" aria-label="Explore the film">
        <div className="meridian-introduction"><span className="meridian-eyebrow">MYSTERY / FANTASY / MIDNIGHT MATINÉE</span><h3>The city forgot<br/>twelve minutes.<br/><em>Ada remembers.</em></h3><p>When a radio operator hears tomorrow’s news in her own voice, she follows a phantom tram through the streets the city tried to erase.</p><a href="#meridian-evidence">Step inside the poster <ArrowDown /></a></div>
        <section className="meridian-evidence" id="meridian-evidence" aria-labelledby="meridian-evidence-title"><header><h3 id="meridian-evidence-title">Follow the evidence</h3><span aria-live="polite">{found.length} / 3 found</span></header><div className="meridian-clue-list">{clues.map((clue,index) => <button key={clue.id} onClick={() => inspect(index)} aria-pressed={selected === index} aria-controls="meridian-clue"><span>{clue.number}</span>{clue.name}{found.includes(clue.id) ? <Check aria-label="Found"/> : <ArrowRight />}</button>)}</div>
          <div className="meridian-clue" id="meridian-clue" ref={clueRef} tabIndex={-1} aria-live="polite" aria-atomic="true"><span className="meridian-eyebrow">{active?.label ?? 'YOUR INVESTIGATION STARTS HERE'}</span><h4>{active?.title ?? 'Look a little closer.'}</h4><p>{active?.body ?? 'Three details in the illustration hold the story. Choose a numbered marker on the poster, or use the list above.'}</p>{active && <button className="meridian-tune-link" onClick={() => setFrequency(active.frequency)}>Tune to {active.frequency.toFixed(1)} FM <Radio /></button>}</div>
        </section>
        <section className="meridian-radio" aria-labelledby="meridian-radio-title"><header><h3 id="meridian-radio-title"><Radio /> The night frequency</h3><span>TEXT TRANSMISSIONS</span></header><div className="meridian-radio-readout"><output htmlFor="meridian-frequency">{frequency.toFixed(1)}<small>FM</small></output><span>{station ? 'SIGNAL FOUND' : 'SEARCHING THE DIAL'}</span></div><label htmlFor="meridian-frequency">Tune the receiver</label><input id="meridian-frequency" type="range" min="88" max="108" step="0.1" value={frequency} onChange={event => setFrequency(Number(event.target.value))} aria-valuetext={`${frequency.toFixed(1)} FM${station ? ', signal found' : ', no signal'}`} /><div className="meridian-dial-labels"><span>88.0</span><span>98.0</span><span>108.0</span></div><p className="meridian-transmission" aria-live="polite">{station ? `“${station.fragment}”` : 'Only static. Inspect a clue for a frequency, or keep turning the dial.'}</p></section>
        <section className="meridian-dispatch"><span className="meridian-eyebrow">THE FINAL DISPATCH</span><p>{found.length < 3 ? 'Find all three clues to open the last page of Ada’s notebook.' : 'All three pieces are in place. The last page is yours to open.'}</p><button disabled={found.length < 3} aria-expanded={ending} aria-controls="meridian-ending" onClick={() => setEnding(!ending)}>{ending ? 'Close the last page' : 'Read the last page'} <ArrowRight /></button>{ending && <div id="meridian-ending"><h4>Some places remember you.</h4><p>Ada steps aboard. The missing streets are still there: the bakery before it burned, her childhood home before the sea wall, the room where her mother kept the radio on. The tram does not travel through time. It carries the things a city cannot bear to forget.</p><p>At 12:12, Ada sends one message back: <em>Leave a light on. I know the way now.</em></p></div>}</section>
        <button className="meridian-reset" onClick={reset}><RotateCcw /> Start the investigation again</button>
      </aside>
    </div>
    <footer className="meridian-colophon"><div><span>AN IMAGINARY FILM. A REAL INTERACTIVE POSTER.</span><p>Story, art direction &amp; website by Usamah Moin.<br/>Original AI-assisted illustration. No film release or screening is advertised.</p></div><a href={sitePath('/work/meridian')}>Inside the design <ArrowRight /></a></footer>
  </div>;
}
