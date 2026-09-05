export type Project = {
  slug: string;
  index: string;
  name: string;
  descriptor: string;
  category: string;
  year: string;
  philosophy: string;
  summary: string;
  outcome: string;
  palette: string;
  accent: string;
  dark: boolean;
};

export const projects: Project[] = [
  {
    slug: 'nova', index: '01', name: 'NOVA', descriptor: 'Intelligence Console', category: 'Product / Data', year: '2026',
    philosophy: 'Complexity should feel composed, never concealed.',
    summary: 'A decision cockpit that turns noisy operations data into a calm daily rhythm for product leaders.',
    outcome: '31% faster weekly reviews', palette: '#d9ff43', accent: '#141412', dark: false,
  },
  {
    slug: 'serein', index: '02', name: 'SEREIN', descriptor: 'Digital Retreat', category: 'Hospitality / Editorial', year: '2026',
    philosophy: 'Digital hospitality should lower your pulse.',
    summary: 'A tactile, unhurried booking world for remote stays shaped around weather, ritual, and quiet.',
    outcome: '2.4× longer exploration', palette: '#ff8d77', accent: '#4a180f', dark: false,
  },
  {
    slug: 'form', index: '03', name: 'FORM', descriptor: 'Culture Archive', category: 'Culture / Discovery', year: '2025',
    philosophy: 'Archives live when discovery feels accidental.',
    summary: 'An expressive cultural index that invites visitors to wander across artists, objects, and conversations.',
    outcome: '68% deeper sessions', palette: '#8fb4ff', accent: '#081f52', dark: false,
  },
  {
    slug: 'aura', index: '04', name: 'AURA', descriptor: 'Listening Room', category: 'Wellness / Audio', year: '2025',
    philosophy: 'Sound interfaces should leave room for silence.',
    summary: 'A generative listening tool for focus rituals, built around emotional tone instead of genre.',
    outcome: '84% ritual completion', palette: '#c8b7ff', accent: '#25194d', dark: true,
  },
  {
    slug: 'vernacular', index: '05', name: 'VERNACULAR', descriptor: 'Type Laboratory', category: 'Tools / Typography', year: '2025',
    philosophy: 'A typeface is a voice before it is a system.',
    summary: 'A browser-based specimen and trial tool that makes type exploration playful, physical, and immediate.',
    outcome: '47% more font trials', palette: '#ffed4a', accent: '#111111', dark: false,
  },
  {
    slug: 'field', index: '06', name: 'FIELD', descriptor: 'Trail Companion', category: 'Outdoor / Mobile', year: '2025',
    philosophy: 'Wayfinding should support attention, not steal it.',
    summary: 'An offline-first trail companion that gives hikers confidence without turning nature into a dashboard.',
    outcome: '22% fewer wrong turns', palette: '#9bd18b', accent: '#17351b', dark: false,
  },
  {
    slug: 'atelier', index: '07', name: 'ATELIER', descriptor: 'Object Edition', category: 'Commerce / Fashion', year: '2024',
    philosophy: 'Commerce can feel like collecting, not consuming.',
    summary: 'A restrained store for limited objects where material, origin, and process carry the persuasion.',
    outcome: '18% higher conversion', palette: '#e6d8c6', accent: '#211c18', dark: false,
  },
  {
    slug: 'signal', index: '08', name: 'SIGNAL', descriptor: 'Money, Clearly', category: 'Finance / Mobile', year: '2024',
    philosophy: 'Financial confidence begins with plain language.',
    summary: 'A humane money overview that replaces financial anxiety with clear choices and gentle momentum.',
    outcome: '39% more goals funded', palette: '#ff7a54', accent: '#24100a', dark: true,
  },
  {
    slug: 'civic', index: '09', name: 'CIVIC', descriptor: 'Move Together', category: 'Public Service / Transit', year: '2024',
    philosophy: 'Public tools should work for the hurried and the hesitant.',
    summary: 'An accessible multimodal transit planner that makes uncertainty visible and recovery effortless.',
    outcome: 'AA accessible throughout', palette: '#f5f2e8', accent: '#183cc7', dark: false,
  },
  {
    slug: 'lumen', index: '10', name: 'LUMEN', descriptor: 'Creative Canvas', category: 'SaaS / Collaboration', year: '2024',
    philosophy: 'Collaboration should preserve the spark, not bury it.',
    summary: 'A spatial idea room for distributed creative teams to collect fragments and discover patterns together.',
    outcome: '3.1× faster synthesis', palette: '#202020', accent: '#f0ff62', dark: true,
  },
  {
    slug: 'pantry', index: '11', name: 'PANTRY', descriptor: 'Everyday Table', category: 'Food / Marketplace', year: '2024',
    philosophy: 'Choice feels good when it starts with appetite.',
    summary: 'A food market organized around dinner moods, flexible bundles, and the pleasure of seasonal ingredients.',
    outcome: '26% larger baskets', palette: '#f4a7c3', accent: '#5e1632', dark: false,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
