import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sitePath } from '@/lib/site-path';
import { ProjectExperience } from '@/components/project-experience';
import { SiteFooter } from '@/components/site-footer';
import { getProject, projects } from '../../projects';

export function generateStaticParams() { return projects.filter(p => p.slug !== 'serein' && p.slug !== 'aura').map(({slug}) => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const project = getProject((await params).slug);
  return {title: project?.name ?? 'Website', description: project?.summary};
}
export default async function ExperiencePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (!getProject(slug) || slug === 'serein') notFound();
  return <main className={`standalone-site site-${slug}`} id="site-top"><nav className="experience-breadcrumb" aria-label="Breadcrumb"><a href={sitePath('/')}>Portfolio</a><span aria-hidden="true">/</span><a href={sitePath(`/work/${slug}`)}>{getProject(slug)!.name}</a><span aria-hidden="true">/</span><span aria-current="page">Website</span></nav><h1 className="sr-only">{getProject(slug)!.name}</h1><ProjectExperience slug={slug}/><SiteFooter slug={slug}/></main>;
}
