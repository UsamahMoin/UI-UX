import { sitePath } from '@/lib/site-path';

export function ExperienceBreadcrumb({ slug, name, current, websitePath }: { slug: string; name: string; current?: string; websitePath?: string }) {
  return <nav className="experience-breadcrumb" aria-label="Breadcrumb">
    <a href={sitePath('/')}>Portfolio</a><span aria-hidden="true">/</span>
    <a href={sitePath(`/work/${slug}`)}>{name}</a><span aria-hidden="true">/</span>
    {current && websitePath ? <><a href={sitePath(websitePath)}>Website</a><span aria-hidden="true">/</span><span aria-current="page">{current}</span></> : <span aria-current="page">Website</span>}
  </nav>;
}
