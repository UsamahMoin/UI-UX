import Image from 'next/image';
import { BrandMark } from './brand-mark';
import { sitePath } from '@/lib/site-path';

// Purpose-built, inert covers: no ledger storage, effects, dialogs, or full apps.
export function ProjectThumbnail({ slug, name }: { slug: string; name: string }) {
  return <div className={`project-cover cover-${slug}`}>
    <div className="cover-brand"><BrandMark slug={slug}/><b>{name}</b></div>
    {slug === 'nova' && <div className="cover-console"><span>THE DAILY PICTURE</span><h3>Clarity at a glance.</h3><div className="cover-metrics"><b>$469K<small>Pipeline</small></b><b>66.3%<small>Activation</small></b><b>03<small>To review</small></b></div><div className="cover-bars">{[58,44,70,48,62,85,56,73,65,91,74,82].map((n,i)=><i key={i} style={{height:`${n}%`}} />)}</div></div>}
    {slug === 'serein' && <><Image unoptimized width={1200} height={900} src={sitePath('/images/serein-human.webp')} alt="" loading="lazy"/><div className="cover-editorial"><span>KISO VALLEY / A CEDAR REFUGE</span><h3>Return to<br/><em>the quiet.</em></h3></div></>}
    {slug === 'form' && <><h3>Things worth<br/>keeping.</h3><div className="cover-stories">{['form-kinetic-chair.webp','form-dancing-building.webp','form-human.webp'].map(src=><Image unoptimized width={1200} height={900} key={src} src={sitePath(`/images/${src}`)} alt="" loading="lazy"/>)}</div></>}
    {slug === 'aura' && <><div className="cover-orbit"/><h3>Make space<br/>for <em>still.</em></h3><span className="cover-caption">BLUE HOUR, SLOWLY</span><div className="cover-wave"/></>}
    {slug === 'vernacular' && <><Image unoptimized width={1200} height={900} src={sitePath('/images/vernacular-plates-hero.jpg')} alt="" loading="lazy"/><h3>Hold more.<br/><em>Waste less.</em></h3></>}
    {slug === 'field' && <><div className="cover-contours"><i/><i/><i/><i/></div><svg className="cover-route" viewBox="0 0 400 220" fill="none"><path d="M20 190C65 185 65 137 112 140S158 70 210 84 266 34 300 51 344 40 376 16" stroke="currentColor" strokeWidth="4"/><circle cx="376" cy="16" r="6" fill="currentColor"/></svg><div className="cover-trail"><span>R–01 / MODERATE</span><h3>Fern Canyon<br/>Loop</h3><p>6.8 mi · 1,240 ft gain</p></div></>}
    {slug === 'atelier' && <><span className="cover-bound">BOUND</span><Image unoptimized width={1200} height={900} src={sitePath('/images/atelier-line-coat.jpg')} alt="" loading="lazy"/><div className="cover-caption">FORM 01 / A BOUNDARY THAT MOVES</div></>}
    {slug === 'signal' && <div className="cover-ledger"><span>TOTAL BALANCE</span><h3>$26,358.08</h3><p>↑ Up $2,158.08 this month</p><svg viewBox="0 0 400 160" fill="none"><path d="M0 130H110L140 128H230L256 20 279 65 310 68 350 74H400" stroke="currentColor" strokeWidth="3"/><path d="M0 155H400" stroke="currentColor" opacity=".2"/></svg><div>Money, clearly.</div></div>}
    {slug === 'civic' && <><div className="cover-civic-grid"/><h3>The city is<br/>a shared<br/><em>interface.</em></h3><span className="cover-caption">VISIBLE WORK. CLEAR OWNERSHIP.</span></>}
    {slug === 'lumen' && <><h3>One table.<br/><em>Shared direction.</em></h3><div className="cover-cards">{['Now','Next','Later'].map((s,i)=><div key={s}><b>{s}</b><i>{['One clear promise.','A useful next step.','Room for later.'][i]}</i></div>)}</div></>}
    {slug === 'pantry' && <><Image unoptimized width={1200} height={900} src={sitePath('/images/pantry-sketch-hero.jpg')} alt="" loading="lazy"/><h3>Dinner starts<br/>with a <em>scribble.</em></h3></>}
  </div>;
}
