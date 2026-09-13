import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { sitePath } from '@/lib/site-path';
import { experiencePath } from '@/lib/experience-path';
import { getProject } from '@/app/work/projects';

export function SiteFooter({slug}: {slug: string}) {
  const p = getProject(slug);
  if (!p) return null;
  return <footer className={`site-footer footer-${slug}`}>
    <a className="site-footer-brand" href={sitePath(experiencePath(slug))}><BrandMark slug={slug}/><strong>{p.name}</strong></a>
    <span>{p.descriptor}<small>Independent concept · Demo content</small></span>
    <nav aria-label={`${p.name} footer`}><a href={sitePath(experiencePath(slug))}>Home</a><a href={sitePath(`/work/${slug}`)}>About this project <ArrowUpRight/></a><a href={sitePath(`/work/${slug}#download`)}>Get the source <ArrowUpRight/></a></nav>
  </footer>;
}
