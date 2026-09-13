import ExperiencePage from '@/app/work/[slug]/experience/page';
export const metadata = { title: 'AURA — Listening room', description: 'Slow light and space for attention.' };
export default function AuraExperiencePage() { return <ExperiencePage params={Promise.resolve({slug:'aura'})}/>; }
