'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { sitePath } from '@/lib/site-path';
import { meridianCast, meridianScreenings } from '@/lib/meridian-film';

export function MeridianPoster({ actor }: { actor?: string }) {
  const [city, setCity] = useState('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const person = meridianCast.find(person => person.slug === actor);
  const screening = meridianScreenings.find(screening => screening.city === city);
  return <div className="meridian-film">
    <div className={`meridian-film-sheet ${person ? 'is-cast-page' : ''}`}>
      <section className="meridian-film-art" aria-label={person ? `${person.first} ${person.last}, fictional cast profile` : 'Midnight on Meridian film poster'}>
        <div className="meridian-film-images" aria-hidden="true"><Image unoptimized src={sitePath(person ? `/images/meridian-${person.slug}.png` : '/images/meridian-poster.png')} width={1024} height={1536} alt="" priority/>{!person && <Image className="meridian-glow-frame" unoptimized src={sitePath('/images/meridian-glow.png')} width={1024} height={1536} alt="" priority/>}</div>
        <div className="meridian-film-shade" aria-hidden="true"/>
        <nav className="meridian-cast-nav" aria-label="Film cast">{[meridianCast[1], meridianCast[0], meridianCast[2]].map(member => <a key={member.slug} href={sitePath(`/work/meridian/cast/${member.slug}`)} aria-current={person?.slug === member.slug ? 'page' : undefined}><span>{member.first}</span><strong>{member.last}</strong></a>)}</nav>
        <div className="meridian-film-title"><span>A CITY OUT OF TIME. ONE LAST WAY HOME.</span><h2>MIDNIGHT<small>ON MERIDIAN</small></h2><p>A mystery in twelve missing minutes.</p></div>
        {person ? <article className="meridian-cast-story"><span>{person.credit}</span><h3>{person.first}<br/><em>{person.last}</em></h3><div className="meridian-cast-role">AS {person.role.toUpperCase()}</div><h4>{person.line}</h4><p>{person.description}</p><p className="meridian-performance">{person.note}</p><a href={sitePath('/work/meridian/experience')}><ArrowLeft/> Back to the film</a><small>Fictional cast profile · original film concept</small></article> : <div className="meridian-film-tagline"><p>The city forgot twelve minutes.<br/><em>Ada remembers.</em></p><a href="#meridian-screenings">Find a screening <ArrowDown/></a></div>}
      </section>
      <div className="meridian-film-billing"><p>MERIDIAN PICTURE HOUSE PRESENTS<br/><strong>MIRA ELLERY · JONAH REED · INES CALDER</strong><br/>IN <b>“MIDNIGHT ON MERIDIAN”</b><br/>AN ORIGINAL FILM CONCEPT BY <strong>USAMAH MOIN</strong></p><div><span>FICTIONAL FILM &amp; CAST · AI-ASSISTED ARTWORK</span></div></div>
      {!person && <section className="meridian-screenings" id="meridian-screenings" aria-labelledby="meridian-screening-title"><span className="meridian-film-eyebrow">THE CITY WAITS AFTER DARK</span><h3 id="meridian-screening-title">On a screen<br/><em>near you.</em></h3><p className="meridian-screening-note">Explore the imagined cinema run. These venues and screenings are fictional; no tickets are on sale.</p><div className="meridian-screening-form"><label htmlFor="meridian-city">Choose your city</label><select id="meridian-city" value={city} onChange={event => {setCity(event.target.value);setSelectedTime(null);}}><option value="" disabled>Choose a city</option>{meridianScreenings.map(item => <option key={item.city}>{item.city}</option>)}</select></div>{screening && <div className="meridian-venue" aria-live="polite"><div><span>{screening.district} / {screening.city}</span><h4>{screening.venue}</h4><p>{screening.format}</p></div><div className="meridian-showtimes" aria-label="Preview a screening time">{screening.times.map(time => <button key={time} onClick={() => setSelectedTime(time)} aria-pressed={selectedTime === time}>{time} <ArrowRight/></button>)}</div></div>}{screening && selectedTime && <div className="meridian-screening-selection" role="status"><strong>{screening.venue} · {selectedTime}</strong><p>Screening preview selected. This is a fictional program, so there is no booking or payment.</p></div>}</section>}
      <footer className="meridian-film-end"><a href={sitePath('/work/meridian')}>The making of the website <ArrowRight/></a><span>© 2026 MERIDIAN PICTURE HOUSE · A FICTIONAL PRODUCTION</span></footer>
    </div>
  </div>;
}
