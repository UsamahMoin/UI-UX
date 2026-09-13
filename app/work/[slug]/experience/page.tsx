import { ExperienceBreadcrumb } from '@/components/experience-breadcrumb';
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
  return <main className={`standalone-site site-${slug}`} id="site-top"><ExperienceBreadcrumb slug={slug} name={getProject(slug)!.name} /><h1 className="sr-only">{getProject(slug)!.name}</h1><ProjectExperience slug={slug}/><SiteFooter slug={slug}/></main>;
}
