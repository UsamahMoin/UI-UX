export type Project = {
  slug: string;
  index: string;
  name: string;
  descriptor: string;
  category: string;
  year: string;
  philosophy: string;
  summary: string;
  theme: string;
  intentHeadline: string;
  colorRationale: string;
  systemRationale: string;
  interactionRationale: string;
  paletteColors: Array<{ name: string; value: string }>;
  principles: string[];
  palette: string;
  accent: string;
  dark: boolean;
};

export const projects: Project[] = [
  {
    slug: 'nova', index: '01', name: 'NOVA', descriptor: 'Intelligence Console', category: 'Product / Data', year: '2026',
    philosophy: 'Complexity should feel composed, never concealed.',
    summary: 'A decision cockpit that turns noisy operations data into a calm daily rhythm for product leaders.',
    theme: 'Operational calm',
    intentHeadline: 'A dashboard that earns attention by rationing it.',
    colorRationale: 'Acid lime is reserved for momentum: the active tool, the useful signal, and the next action. Warm whites reduce the clinical feeling common to analytics products, while near-black gives the daily focus panel enough gravity to organize the page.',
    systemRationale: 'A restrained sans-serif hierarchy carries decisions; compact monospaced labels carry evidence. Rounded modules soften dense information without making the product feel casual, and consistent spacing lets users compare states before reading every number.',
    interactionRationale: 'Range controls, notifications, data import, and drill-down panels reveal detail in place. The interface keeps the summary stable while allowing the user to ask progressively sharper questions, reducing context switching.',
    paletteColors: [{ name: 'Signal lime', value: '#d9ff43' }, { name: 'Warm white', value: '#f7f7f3' }, { name: 'Graphite', value: '#1b1b19' }, { name: 'Success', value: '#126d40' }],
    principles: ['Hierarchy before density', 'Action color has meaning', 'Details arrive on demand'],
    palette: '#d9ff43', accent: '#141412', dark: false,
  },
  {
    slug: 'serein', index: '02', name: 'SEREIN', descriptor: 'Digital Retreat', category: 'Hospitality / Editorial', year: '2026',
    philosophy: 'Digital hospitality should lower your pulse.',
    summary: 'A tactile, unhurried booking world for remote stays shaped around weather, ritual, and quiet.',
    theme: 'Seasonal quiet',
    intentHeadline: 'A hospitality interface paced like a deep breath.',
    colorRationale: 'Cedar sand and rice-paper white create material warmth without luxury clichés. Blue-hour navy shifts the same scene into evening, while coral is used as the portfolio marker—a human note that keeps the quiet palette from becoming anonymous.',
    systemRationale: 'Large editorial serif type slows scanning and gives the landscape emotional weight. Fine monospaced coordinates and room details add precision, balancing atmosphere with useful information.',
    interactionRationale: 'The Dawn/Dusk control changes both photography and surrounding color temperature so time feels like part of the product. Residence pages unfold through three rituals rather than a conventional amenity checklist.',
    paletteColors: [{ name: 'Cedar', value: '#d8c1a9' }, { name: 'Rice paper', value: '#f8f3e8' }, { name: 'Blue hour', value: '#10192a' }, { name: 'Human coral', value: '#ff8d77' }],
    principles: ['Atmosphere remains legible', 'Time is an interface', 'Rituals replace feature lists'],
    palette: '#ff8d77', accent: '#4a180f', dark: false,
  },
  {
    slug: 'form', index: '03', name: 'FORM', descriptor: 'Culture Archive', category: 'Culture / Discovery', year: '2025',
    philosophy: 'Archives live when discovery feels accidental.',
    summary: 'An expressive cultural index that invites visitors to wander across artists, objects, and conversations.',
    theme: 'Useful collision',
    intentHeadline: 'An archive designed for wandering, not obedient retrieval.',
    colorRationale: 'Periwinkle establishes an open, curious field instead of an institutional white archive. Tomato, pale yellow, mint, and ink give every format a distinct energy, helping dissimilar material collide while remaining scannable.',
    systemRationale: 'Oversized grotesk headlines behave like posters; Georgia introduces an essayistic voice; monospaced metadata keeps issue, format, and reading time consistently findable. Thick rules make the editorial structure visible.',
    interactionRationale: 'Filters narrow by curiosity—Objects, People, Ideas—while search supports direct retrieval. Uneven card proportions resist the feeling of a database grid, and every preview becomes a complete long-form story with its own pace.',
    paletteColors: [{ name: 'Open periwinkle', value: '#8fb4ff' }, { name: 'Tomato', value: '#ff6d57' }, { name: 'Pale yellow', value: '#f0ef4c' }, { name: 'Editorial ink', value: '#20201e' }],
    principles: ['Discovery can be nonlinear', 'Metadata stays dependable', 'Formats deserve different rhythms'],
    palette: '#8fb4ff', accent: '#081f52', dark: false,
  },
  {
    slug: 'aura', index: '04', name: 'AURA', descriptor: 'Listening Room', category: 'Wellness / Audio', year: '2025',
    philosophy: 'Sound interfaces should leave room for silence.',
    summary: 'A generative listening tool for focus rituals, built around emotional tone instead of genre.',
    theme: 'Quiet signal',
    intentHeadline: 'An audio interface that does not compete with the listening.',
    colorRationale: 'Dusty lavender suggests introspection without borrowing wellness green. Deep violet supplies contrast for playback states, while soft gray text keeps secondary controls present but deliberately quiet.',
    systemRationale: 'The composition uses generous negative space and one luminous orb as the emotional center. Serif emphasis describes feeling; compact interface type handles duration, state, and control labels.',
    interactionRationale: 'Users choose an emotional quality—Still, Open, or Warm—before pressing play. The orb, progress line, and time respond together, making state visible without adding another layer of controls.',
    paletteColors: [{ name: 'Hushed lavender', value: '#c8b7ff' }, { name: 'Deep violet', value: '#25194d' }, { name: 'Cloud', value: '#eeeaf4' }, { name: 'Soft signal', value: '#c5bdd4' }],
    principles: ['One dominant state', 'Emotion before genre', 'Motion supports listening'],
    palette: '#c8b7ff', accent: '#25194d', dark: true,
  },
  {
    slug: 'vernacular', index: '05', name: 'VERNACULAR', descriptor: 'Type Laboratory', category: 'Tools / Typography', year: '2025',
    philosophy: 'A typeface is a voice before it is a system.',
    summary: 'A browser-based specimen and trial tool that makes type exploration playful, physical, and immediate.',
    theme: 'Graphic provocation',
    intentHeadline: 'A type laboratory that treats testing as performance.',
    colorRationale: 'Safety yellow creates the blunt confidence of a printed specimen poster. Ink black delivers uncompromised contrast and keeps the typography—not decorative interface chrome—as the primary visual material.',
    systemRationale: 'The grid is deliberately visible, with squared borders and compressed labels borrowed from production tools. Scale changes are dramatic so users can judge personality, spacing, and rhythm rather than viewing a decorative alphabet.',
    interactionRationale: 'Editable specimen text and a live size control produce immediate, reversible feedback. The tool keeps licensing and family context nearby while giving most of the screen to the user’s own words.',
    paletteColors: [{ name: 'Specimen yellow', value: '#ffed4a' }, { name: 'Ink', value: '#111111' }, { name: 'Paper', value: '#f5f1df' }],
    principles: ['The specimen is the interface', 'Feedback is immediate', 'Production details stay visible'],
    palette: '#ffed4a', accent: '#111111', dark: false,
  },
  {
    slug: 'field', index: '06', name: 'FIELD', descriptor: 'Trail Companion', category: 'Outdoor / Mobile', year: '2025',
    philosophy: 'Wayfinding should support attention, not steal it.',
    summary: 'An offline-first trail companion that gives hikers confidence without turning nature into a dashboard.',
    theme: 'Field legibility',
    intentHeadline: 'Wayfinding that gives confidence and then gets out of the way.',
    colorRationale: 'Moss green and mineral off-white connect the interface to trail materials without camouflaging information. A darker forest tone anchors navigation, while the route line uses stronger contrast only where direction matters.',
    systemRationale: 'Contour geometry supplies place without imitating a satellite map. The floating route card uses plain-language distance, elevation, and time so the most consequential facts survive glare, motion, and a quick glance.',
    interactionRationale: 'One control cycles between realistic trail alternatives while the map and trip facts update as a unit. Offline access, saved routes, and locate controls are placed as primary field tools rather than buried settings.',
    paletteColors: [{ name: 'Moss', value: '#9bd18b' }, { name: 'Forest', value: '#17351b' }, { name: 'Map paper', value: '#eff1e7' }, { name: 'Trail mark', value: '#d85839' }],
    principles: ['Glanceable under pressure', 'Map and facts stay synchronized', 'Nature remains the focus'],
    palette: '#9bd18b', accent: '#17351b', dark: false,
  },
  {
    slug: 'atelier', index: '07', name: 'ATELIER', descriptor: 'Object Edition', category: 'Commerce / Fashion', year: '2024',
    philosophy: 'Commerce can feel like collecting, not consuming.',
    summary: 'A restrained store for limited objects where material, origin, and process carry the persuasion.',
    theme: 'Material honesty',
    intentHeadline: 'A product page that persuades through construction, not urgency.',
    colorRationale: 'Bone, clay, ochre, and ink echo ash wood, oil, stone, and workshop marks. The palette is intentionally desaturated so finish selection feels like evaluating material rather than choosing a fashionable colorway.',
    systemRationale: 'The object occupies the largest visual field and the purchase column reads like a museum label: edition, material, lead time, and price. Serif copy adds tactility; small utility type keeps provenance precise.',
    interactionRationale: 'Finish swatches change the object in place, save state is explicit, and the acquisition action includes its lead time before commitment. Scarcity is communicated as numbered production—not artificial countdown pressure.',
    paletteColors: [{ name: 'Bone', value: '#e6d8c6' }, { name: 'Oiled ochre', value: '#a94e18' }, { name: 'Workshop ink', value: '#211c18' }, { name: 'Natural ash', value: '#d0bc95' }],
    principles: ['Material leads persuasion', 'Scarcity stays factual', 'Commitment has context'],
    palette: '#e6d8c6', accent: '#211c18', dark: false,
  },
  {
    slug: 'signal', index: '08', name: 'SIGNAL', descriptor: 'Money, Clearly', category: 'Finance / Mobile', year: '2024',
    philosophy: 'Financial confidence begins with plain language.',
    summary: 'A humane money overview that replaces financial anxiety with clear choices and gentle momentum.',
    theme: 'Financial warmth',
    intentHeadline: 'A money interface built around comprehension, not intimidation.',
    colorRationale: 'Near-black gives balances visual stability without default banking blue. Coral marks the active period and chart, bringing warmth to an anxious category; restrained green is reserved for verified positive movement.',
    systemRationale: 'Large numerals establish balance first, followed by plain-language concepts such as “safe to spend.” Cards use consistent reading order and muted support text, separating current truth from future planning.',
    interactionRationale: 'Time-range controls update the chart focus, while goal and scheduled-payment cards show how today connects to what comes next. The interface avoids celebratory animation or red-alert theatrics that could distort financial meaning.',
    paletteColors: [{ name: 'Night ledger', value: '#121110' }, { name: 'Active coral', value: '#ff7a54' }, { name: 'Paper', value: '#f5f1e8' }, { name: 'Positive', value: '#7bd49c' }],
    principles: ['Plain language before jargon', 'Color never fabricates urgency', 'Present and future stay connected'],
    palette: '#ff7a54', accent: '#24100a', dark: true,
  },
  {
    slug: 'civic', index: '09', name: 'CIVIC', descriptor: 'Move Together', category: 'Public Service / Transit', year: '2024',
    philosophy: 'Public tools should work for the hurried and the hesitant.',
    summary: 'An accessible multimodal transit planner that makes uncertainty visible and recovery effortless.',
    theme: 'Public clarity',
    intentHeadline: 'A transit planner designed for imperfect attention.',
    colorRationale: 'Civic blue provides a familiar, high-contrast service anchor; yellow highlights transfers and decisions; warm cream reduces glare while preserving map readability. The palette remains legible without relying on color alone.',
    systemRationale: 'A visible grid connects the journey form to public signage and street geometry. Large destination inputs, lettered endpoints, icons, and written mode labels create redundant cues for hurried riders and assistive technology.',
    interactionRationale: 'Switching between train, bike, and walk updates the journey time without erasing the entered trip. Elevator status, low-floor access, and live-arrival confidence are treated as core route information rather than secondary disclosures.',
    paletteColors: [{ name: 'Civic blue', value: '#183cc7' }, { name: 'Transfer yellow', value: '#ffdb42' }, { name: 'Public cream', value: '#f7f5ec' }, { name: 'Sign ink', value: '#111111' }],
    principles: ['Redundant cues improve access', 'Recovery preserves input', 'Accessibility is route data'],
    palette: '#f5f2e8', accent: '#183cc7', dark: false,
  },
  {
    slug: 'lumen', index: '10', name: 'LUMEN', descriptor: 'Creative Canvas', category: 'SaaS / Collaboration', year: '2024',
    philosophy: 'Collaboration should preserve the spark, not bury it.',
    summary: 'A spatial idea room for distributed creative teams to collect fragments and discover patterns together.',
    theme: 'Constructive mess',
    intentHeadline: 'A collaboration space where unfinished thinking remains visible.',
    colorRationale: 'A charcoal canvas recedes behind the work. Acid lime identifies the active tool and strongest principle; coral and lavender distinguish voices and artifacts without turning collaborators into a rainbow of status colors.',
    systemRationale: 'Sticky notes, image fragments, rings, cursors, and connecting lines create a spatial grammar closer to a studio wall than a document editor. The dark dot grid supplies orientation without becoming a rigid template.',
    interactionRationale: 'Tool selection changes cursor intent, zoom controls preserve spatial awareness, and collaborator presence stays visible but compact. The concept prioritizes shared context and visible relationships over activity feeds.',
    paletteColors: [{ name: 'Canvas', value: '#252525' }, { name: 'Active lime', value: '#f0ff62' }, { name: 'Dialogue coral', value: '#ff8d77' }, { name: 'Connection lavender', value: '#c8b7ff' }],
    principles: ['Artifacts stay spatial', 'Presence stays lightweight', 'Relationships beat activity logs'],
    palette: '#202020', accent: '#f0ff62', dark: true,
  },
  {
    slug: 'pantry', index: '11', name: 'PANTRY', descriptor: 'Everyday Table', category: 'Food / Marketplace', year: '2024',
    philosophy: 'Choice feels good when it starts with appetite.',
    summary: 'A food market organized around dinner moods, flexible bundles, and the pleasure of seasonal ingredients.',
    theme: 'Appetite before taxonomy',
    intentHeadline: 'A marketplace organized around the question people actually ask: what sounds good?',
    colorRationale: 'Beet ink and warm cream feel edible and editorial without borrowing generic grocery green. Tomato, leaf, and lilac backgrounds separate dinner directions while keeping every card inside one saturated seasonal family.',
    systemRationale: 'Oversized serif language creates appetite before the product grid appears. Mood filters use everyday words—Bright, Comfort, Quick—while maker and ingredient details remain structured underneath.',
    interactionRationale: 'Search accepts an intention instead of a SKU, category chips change the meal frame, and add buttons update the shared bag count immediately. The flow supports exploration without hiding price or commitment.',
    paletteColors: [{ name: 'Beet ink', value: '#5e1632' }, { name: 'Market cream', value: '#fff4df' }, { name: 'Tomato', value: '#ff806e' }, { name: 'Leaf', value: '#b6d86b' }],
    principles: ['Start with human language', 'Price stays visible', 'Feedback connects every card'],
    palette: '#f4a7c3', accent: '#5e1632', dark: false,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
