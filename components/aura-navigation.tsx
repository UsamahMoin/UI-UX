import { Headphones, Home, Info, Sparkles } from 'lucide-react';
import { sitePath } from '@/lib/site-path';

export function AuraNavigation({ section }: { section: 'experience' | 'library' | 'rituals' | 'about' }) {
  const destinations = [
    { section: 'experience', label: 'Listening room', icon: Home },
    { section: 'library', label: 'Library', icon: Headphones },
    { section: 'rituals', label: 'Rituals', icon: Sparkles },
    { section: 'about', label: 'About', icon: Info },
  ] as const;
  return <aside className="aura-os-rail" aria-label="AURA navigation">
    {destinations.map(({ section: target, label, icon: Icon }) => <a key={target} className={section === target ? 'active' : ''} aria-current={section === target ? 'page' : undefined} href={sitePath(`/work/aura/${target}`)} aria-label={label}><Icon /><span>{label}</span></a>)}
  </aside>;
}
