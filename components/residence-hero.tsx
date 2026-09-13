'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { sitePath } from '@/lib/site-path';
export function ResidenceHero(){
 const [dusk,setDusk]=useState(false);
 return <header className={`residence-hero ${dusk?'at-dusk':''}`}>
  <Image src={sitePath(dusk?'/images/serein-dusk-v2.webp':'/images/serein-human.webp')} alt={dusk?'Cedar retreat looking over the valley at blue hour':'A guest taking tea in a cedar retreat above the misty valley'} width={1536} height={1024} priority unoptimized/>
  <div className="residence-hero-shade"/>
  <button className="residence-scene-toggle" onClick={()=>setDusk(!dusk)} aria-pressed={dusk}>{dusk?<Sun/>:<Moon/>}{dusk?'Dawn':'Dusk'}</button>
  <div className="residence-hero-copy"><span>KISO VALLEY / EIGHT PRIVATE SUITES</span><h1>Return to<br/><em>the quiet.</em></h1><p>Mountain water. Cedar warmth. Time of your own.</p><div className="residence-hero-links"><a href="#spaces">Explore the residence <ArrowRight/></a><a href="#booking">Plan your stay <ArrowRight/></a></div></div>
 </header>;
}
