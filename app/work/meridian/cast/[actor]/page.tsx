import { notFound } from 'next/navigation';
import { MeridianPoster } from '@/components/meridian-poster';
import { ExperienceBreadcrumb } from '@/components/experience-breadcrumb';
import { SiteFooter } from '@/components/site-footer';
import { meridianCast } from '@/lib/meridian-film';
export function generateStaticParams() { return meridianCast.map(({slug}) => ({actor:slug})); }
export async function generateMetadata({params}:{params:Promise<{actor:string}>}) {
  const {actor}=await params;
  const person=meridianCast.find(p=>p.slug===actor);
  return {title:person ? `${person.first} ${person.last} | Midnight on Meridian` : 'Cast',description:person?.line};
}
export default async function CastPage({params}:{params:Promise<{actor:string}>}) {
  const {actor}=await params;
  const person=meridianCast.find(p=>p.slug===actor);
  if(!person) notFound();
  return <main className="standalone-site site-meridian"><ExperienceBreadcrumb slug="meridian" name="MERIDIAN" current={`${person.first} ${person.last}`} websitePath="/work/meridian/experience"/><h1 className="sr-only">{person.first} {person.last}</h1><MeridianPoster actor={actor}/><SiteFooter slug="meridian"/></main>;
}
