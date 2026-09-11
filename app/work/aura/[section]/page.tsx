import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AuraSite } from '@/components/aura-site';

const sections = ['library', 'rituals', 'about'] as const;
type AuraSection = (typeof sections)[number];

const metadataBySection: Record<AuraSection, { title: string; description: string }> = {
  library: { title: 'Listening Library | AURA', description: 'Generative listening sessions organized by emotional tone.' },
  rituals: { title: 'Listening Rituals | AURA', description: 'Small guided rituals for arriving, focusing, and releasing the day.' },
  about: { title: 'About | AURA', description: 'The design thinking and accessibility principles behind AURA.' },
};

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const section = (await params).section as AuraSection;
  const page = metadataBySection[section];
  return page ? { title: page.title, description: page.description, openGraph: { ...page, images: [] }, twitter: { ...page, images: [] } } : {};
}

export default async function AuraSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const section = (await params).section as AuraSection;
  if (!sections.includes(section)) notFound();
  return <AuraSite section={section} />;
}
