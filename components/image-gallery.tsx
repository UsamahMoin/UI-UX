'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sitePath } from '@/lib/site-path';
export type GalleryImage = {src: string; alt: string; caption: string};
export function ImageGallery({images, title}: {images: GalleryImage[]; title: string}) {
  const [index,setIndex] = useState(0);
  const current = images[index];
  const move = (delta: number) => setIndex(i => (i + delta + images.length) % images.length);
  return <section className="image-gallery" aria-label={title} aria-roledescription="carousel">
    <div className="image-gallery-heading"><h2>{title}</h2><div><button onClick={()=>move(-1)} aria-label={`Previous image in ${title}`}><ArrowLeft/></button><span aria-live="polite">{index+1} / {images.length}</span><button onClick={()=>move(1)} aria-label={`Next image in ${title}`}><ArrowRight/></button></div></div>
    <figure><Image src={sitePath(current.src)} alt={current.alt} width={1536} height={1024} unoptimized/><figcaption>{current.caption}</figcaption></figure>
    <div className="image-gallery-dots">{images.map((img,i)=><button key={img.src} onClick={()=>setIndex(i)} aria-label={`View image ${i+1}: ${img.caption}`} aria-pressed={index===i}><span/></button>)}</div>
  </section>;
}
