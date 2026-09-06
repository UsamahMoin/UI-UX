export type FormStory = {
  slug: string;
  number: string;
  title: string;
  category: string;
  format: string;
  year: string;
  readTime: string;
  image: string;
  alt: string;
  color: string;
  dek: string;
  introduction: string;
  pullquote: string;
  body: string[];
  credit: string;
};

export const formStories: FormStory[] = [
  {
    slug: 'kinetic-chair', number: '01', title: 'A chair that refuses to sit still', category: 'Objects', format: 'Object study', year: '1984—Now', readTime: '6 min',
    image: '/images/form-kinetic-chair.png', alt: 'Kinetic postmodern chair displayed in a raw gallery workshop', color: '#ff6d57',
    dek: 'What changes when furniture stops behaving like a polite background object?',
    introduction: 'This is less a chair than a negotiation between balance, posture, and play. Its angled frame makes sitting feel active—and turns an ordinary room into a small stage.',
    pullquote: 'The object is finished only when somebody changes how it stands.',
    body: [
      'The most enduring objects rarely disappear into a room. They create a relationship: a pause before use, a new gesture, a slightly different way of understanding weight. This chair belongs to that restless family.',
      'Its value is not novelty for its own sake. The tilted planes reveal how comfort is constructed, and how quickly familiar typologies can be reopened with one decisive move.',
    ], credit: 'FORM object desk · Photography study',
  },
  {
    slug: 'dancing-building', number: '02', title: 'Dancing with the building', category: 'Ideas', format: 'Short film', year: '11:08', readTime: 'Watch',
    image: '/images/form-dancing-building.png', alt: 'Contemporary dancer moving through severe concrete architecture', color: '#f0ef4c',
    dek: 'A moving body finds the instructions hidden inside a building.',
    introduction: 'Architecture tells us where to pause, turn, gather, and look. Choreographer Aya Mori makes those quiet instructions visible by treating the building as a partner rather than a container.',
    pullquote: 'Every corridor proposes a tempo. Every threshold asks for a decision.',
    body: [
      'The film begins with restraint: a shoulder following a wall, a foot held above a seam in the concrete. Gradually the body leaves the expected path and the architecture seems to move with it.',
      'The result is not documentation of a performance. It is a study of two systems—one fixed, one adaptive—discovering a shared rhythm.',
    ], credit: 'Film by FORM moving-image unit · 11 minutes 08 seconds',
  },
  {
    slug: 'useful-accident', number: '03', title: 'The useful accident', category: 'People', format: 'Conversation', year: 'No. 042', readTime: '12 min',
    image: '/images/form-useful-accident.png', alt: 'Two designers in conversation across a material-covered studio table', color: '#20201e',
    dek: 'Two designers compare the mistakes they decided not to correct.',
    introduction: 'A crease, an off-register print, a model assembled backwards: the studio is full of events that were never in the brief. The question is whether we notice what they are offering.',
    pullquote: 'Taste is partly the ability to recognize when the wrong answer has more life.',
    body: [
      'Mina Cho and Rafael Bell speak about keeping experiments unresolved long enough for a different logic to appear. Both resist the mythology of spontaneous genius; useful accidents require attention and a process generous enough to absorb them.',
      'Their conversation becomes a practical argument for prototypes, loose materials, and critique that begins with curiosity instead of correction.',
    ], credit: 'Conversation recorded in Rotterdam · Edited for clarity',
  },
  {
    slug: 'soft-architecture', number: '04', title: 'Soft architecture', category: 'Ideas', format: 'Essay', year: 'Issue 14', readTime: '8 min',
    image: '/images/form-soft-architecture.png', alt: 'Translucent textile partitions shaping light around a small human silhouette', color: '#a7ddb9',
    dek: 'Curtains, air, sound, and light can organize space without pretending to be walls.',
    introduction: 'We often describe architecture through what resists us: structure, surface, boundary. Soft architecture begins somewhere else—with materials that move, filter, and make room negotiable.',
    pullquote: 'A boundary can guide us without becoming a barrier.',
    body: [
      'Textile partitions make occupancy visible through shadow and sound. They trade certainty for awareness, allowing a room to change without hiding the fact that other people are near.',
      'This softness is not fragility. It is a responsive form of order—one that accepts weather, bodies, and use as collaborators in the final shape of a place.',
    ], credit: 'Essay by FORM architecture editor · Issue 14',
  },
  {
    slug: 'mina-park', number: '05', title: 'Studio visit: Mina Park', category: 'People', format: 'Place', year: 'Seoul', readTime: '9 min',
    image: '/images/form-human.png', alt: 'Independent designer arranging work in a colorful studio', color: '#cbb8ff',
    dek: 'Inside a studio where every material sample is allowed to become evidence.',
    introduction: 'Mina Park works between graphic design, objects, and exhibition space. Her Seoul studio is not organized by discipline, but by questions that remain active across projects.',
    pullquote: 'I keep the things that still know something I do not.',
    body: [
      'Offcuts, failed bindings, color tests, and small plaster forms share the same long table. Nothing is displayed as precious; each piece is positioned to be picked up, compared, and returned to use.',
      'The studio reveals a practice built on translation. A fold from a book becomes a hinge in a display system. A ceramic glaze becomes the color logic for an identity. The archive is a working partner, not a record of finished work.',
    ], credit: 'Studio visit · Seoul · FORM Issue 14',
  },
];

export function getFormStory(slug: string) {
  return formStories.find((story) => story.slug === slug);
}
