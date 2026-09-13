export type ResidenceSpace = {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  image: string;
  alt: string;
  galleryAlt: string; galleryCaption: string; secondImage: string; secondAlt: string; secondCaption: string;
  invitation: string;
  introduction: string;
  philosophy: string;
  details: Array<{ label: string; value: string }>;
};

export const residenceSpaces: ResidenceSpace[] = [
  {
    slug: 'suite',
    galleryAlt: 'Tea service beside a cedar balcony overlooking the misty valley', galleryCaption: 'Morning tea, with the valley for company.', secondImage: '/images/serein-human.webp', secondAlt: 'A guest resting in the residence lounge', secondCaption: 'The lounge opens toward the mountains.',
    number: '01',
    name: 'The Cedar Suite',
    shortName: 'Sleep deeply',
    image: '/images/serein-residence-suite.webp',
    alt: 'Low linen bed in a warm cedar suite facing misty forested mountains',
    invitation: 'A room that lets the valley set the pace.',
    introduction: 'Each suite turns toward the mountain and away from interruption. Low furniture, hand-finished cedar, and woven linen create a horizon that feels deliberately close to the earth.',
    philosophy: 'Nothing asks for attention. The room simply makes space for it to return.',
    details: [
      { label: 'Suites', value: '08, each unique' },
      { label: 'View', value: 'Eastern valley' },
      { label: 'Materials', value: 'Kiso cedar · stone · linen' },
      { label: 'Morning', value: 'Tea placed at 07:00' },
    ],
  },
  {
    slug: 'onsen',
    galleryAlt: 'Stone path and lanterns beside the forest bathing pavilion', galleryCaption: 'The lantern path to the bath.', secondImage: '/images/serein-dusk-v2.webp', secondAlt: 'Warm cedar interiors at blue hour', secondCaption: 'Return to cedar warmth after the water.',
    number: '02',
    name: 'The Forest Onsen',
    shortName: 'Soak slowly',
    image: '/images/serein-residence-onsen.webp',
    alt: 'Steaming dark-stone onsen surrounded by moss and old-growth cedar forest',
    invitation: 'Mountain water, stone, steam, and no clock.',
    introduction: 'The private bath rests at the forest edge where mineral water meets rain-dark stone. Steam shifts with the weather; a single cedar lantern marks the path back.',
    philosophy: 'The ritual is not an amenity. It is the architecture of slowing down.',
    details: [
      { label: 'Water', value: 'Natural mineral spring' },
      { label: 'Temperature', value: '40–42°C' },
      { label: 'Setting', value: 'Old-growth forest' },
      { label: 'Hours', value: 'Dawn until midnight' },
    ],
  },
  {
    slug: 'table',
    galleryAlt: 'Seasonal dishes and handmade ceramics on a cedar dining table', galleryCaption: 'Mountain vegetables, river fish, and the season on a plate.', secondImage: '/images/serein-suite-detail.webp', secondAlt: 'Handmade tea service overlooking the valley', secondCaption: 'The day begins with a quieter table.',
    number: '03',
    name: 'The Seasonal Table',
    shortName: 'Eat what is here',
    image: '/images/serein-residence-table.webp',
    alt: 'Chef carefully plating a seasonal course at an intimate cedar counter',
    invitation: 'Dinner follows the valley, not a fixed menu.',
    introduction: 'One counter, eight seats, and ingredients gathered at their clearest moment. The evening meal moves from mountain vegetables to river fish, handmade noodles, and a final cup of roasted tea.',
    philosophy: 'A place becomes memorable when you can taste the season you found it in.',
    details: [
      { label: 'Seats', value: '08 at the counter' },
      { label: 'Service', value: 'One evening sitting' },
      { label: 'Menu', value: 'Nine seasonal courses' },
      { label: 'Sourcing', value: 'Within 40 kilometers' },
    ],
  },
];

export function getResidenceSpace(slug: string) {
  return residenceSpaces.find((space) => space.slug === slug);
}
