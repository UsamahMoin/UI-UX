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
    colorRationale: 'Cedar sand and rice-paper white create material warmth without luxury clichés. Blue-hour navy shifts the same scene into evening, while coral is used as the portfolio marker, a human note that keeps the quiet palette from becoming anonymous.',
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
    interactionRationale: 'Filters narrow by curiosity across Objects, People, and Ideas, while search supports direct retrieval. Uneven card proportions resist the feeling of a database grid, and every preview becomes a complete long-form story with its own pace.',
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
    systemRationale: 'The composition uses generous negative space and a peripheral field of slow light as the emotional center. Serif emphasis describes feeling; compact interface type handles duration, state, and control labels.',
    interactionRationale: 'Users choose an emotional quality such as Still, Open, or Warm before pressing play. The lightscape, progress line, and time respond together, making state visible without adding another layer of controls.',
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
    colorRationale: 'Safety yellow creates the blunt confidence of a printed specimen poster. Ink black delivers uncompromised contrast and keeps the typography, rather than decorative interface chrome, as the primary visual material.',
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
    slug: 'atelier', index: '07', name: 'ATELIER', descriptor: 'Study in Motion', category: 'Commerce / Fashion', year: '2026',
    philosophy: 'Dress is architecture completed by movement.',
    summary: 'An editorial fashion study where three silhouettes become a complete philosophy of form, restraint, and attachment.',
    theme: 'Architectural dressing',
    intentHeadline: 'A fashion world built around practice, not novelty.',
    colorRationale: 'Bone gives the photography the quiet of pattern paper, near-black turns structure into silhouette, and oxblood marks the body’s warmth inside an otherwise architectural system. Color appears as material, never decoration.',
    systemRationale: 'Monumental serif type carries the point of view while compact monospaced labels act like construction notes. Images alternate between full spatial scenes and close garment studies, giving the collection both atmosphere and usable product detail.',
    interactionRationale: 'Look selection, prototype sizing, saving, and a local fitting bag turn editorial philosophy into a working commerce flow. Every transaction state names itself as a prototype so the concept never pretends that an order or impact claim is real.',
    paletteColors: [{ name: 'Pattern bone', value: '#eee9df' }, { name: 'Construction ink', value: '#171513' }, { name: 'Body oxblood', value: '#6d2527' }, { name: 'Studio stone', value: '#aaa397' }],
    principles: ['Form follows movement', 'Restraint creates recognition', 'Attachment precedes longevity'],
    palette: '#eee9df', accent: '#171513', dark: false,
  },
  {
    slug: 'signal', index: '08', name: 'SIGNAL', descriptor: 'Money, Clearly', category: 'Finance / Mobile', year: '2024',
    philosophy: 'Financial confidence begins with plain language.',
    summary: 'A humane money overview that replaces financial anxiety with clear choices and gentle momentum.',
    theme: 'Financial warmth',
    intentHeadline: 'A money interface built around comprehension, not intimidation.',
    colorRationale: 'Near-black gives balances visual stability without default banking blue. Coral marks the active period and chart, bringing warmth to an anxious category; restrained green is reserved for verified positive movement.',
    systemRationale: 'Large numerals establish balance first, followed by plain-language concepts such as “safe to spend.” Cards use consistent reading order and muted support text, separating current truth from future planning.',
    interactionRationale: 'A working local ledger connects transactions, account balances, monthly budgets, savings reserves, and bill reminders. Time ranges draw from recorded activity; edits recalculate the overview, while backup, restore, and undo keep personal planning recoverable.',
    paletteColors: [{ name: 'Night ledger', value: '#121110' }, { name: 'Active coral', value: '#ff7a54' }, { name: 'Paper', value: '#f5f1e8' }, { name: 'Positive', value: '#7bd49c' }],
    principles: ['Plain language before jargon', 'Color never fabricates urgency', 'Present and future stay connected'],
    palette: '#ff7a54', accent: '#24100a', dark: true,
  },
  {
    slug: 'civic', index: '09', name: 'CIVIC', descriptor: 'Shared Interface', category: 'Public Service / Participation', year: '2026',
    philosophy: 'A public interface should explain the institution through the next useful action.',
    summary: 'A transparent neighborhood service commons for checking city systems, reporting problems, and seeing what happens next.',
    theme: 'Visible public work',
    intentHeadline: 'A civic service layer designed around trust, not department charts.',
    colorRationale: 'Service blue anchors official information, safety yellow marks action, warm paper improves long-form readability, and signal red is reserved for attention. Every status also uses text, shape, or position so color never carries meaning alone.',
    systemRationale: 'The visual language combines municipal wayfinding with a neighborhood newspaper: direct headlines, ruled records, confirmation numbers, and a street-grid motif. Information is organized around resident questions: what is working, what is open, and what happens next.',
    interactionRationale: 'Filters reveal request states without hiding context, issue categories make the form faster to scan, and the priority selector provides reversible feedback. The request and participation flows remain explicitly local simulations so the prototype demonstrates behavior without pretending to contact a real institution.',
    paletteColors: [{ name: 'Service blue', value: '#2146c7' }, { name: 'Action yellow', value: '#ffdc3e' }, { name: 'Public paper', value: '#f4f0e4' }, { name: 'Signal red', value: '#ff5138' }],
    principles: ['Plain language before structure', 'Status should show ownership', 'Simulation must identify itself'],
    palette: '#f4f0e4', accent: '#2146c7', dark: false,
  },
  {
    slug: 'lumen', index: '10', name: 'LUMEN', descriptor: 'The Shared Worktable', category: 'Planning / Collaboration', year: '2026',
    philosophy: 'Coordination should feel like gathering around a table, not operating a machine.',
    summary: 'An analog-first planning room built from one daily promise, movable index cards, and three honest time horizons.',
    theme: 'Boring on purpose',
    intentHeadline: 'A collaboration tool that restores the useful constraints of a shared table.',
    colorRationale: 'Warm paper and graphite recall index cards and workroom ledgers. Signal red holds the single daily promise, ochre marks what comes next, and institutional blue keeps later work visible without letting it compete with today.',
    systemRationale: 'A shared promise, paper cards, initials, and three columns replace the dashboard, feed, folder tree, and toolbar. The whole plan stays visible without requiring anyone to learn a software model first.',
    interactionRationale: 'People write one card, give it an owner, and move it only when the evidence changes. Completion, reassignment, and a single team decision are local, reversible, and immediately legible.',
    paletteColors: [{ name: 'Workroom paper', value: '#f1eadb' }, { name: 'Promise red', value: '#d34832' }, { name: 'Next ochre', value: '#e7a84c' }, { name: 'Later blue', value: '#315c7d' }],
    principles: ['One promise before many tasks', 'Three horizons are enough', 'Movement requires evidence'],
    palette: '#f1eadb', accent: '#d34832', dark: false,
  },
  {
    slug: 'pantry', index: '11', name: 'PANTRY', descriptor: 'Sketch Market', category: 'Food / Marketplace', year: '2026',
    philosophy: 'Choice feels good when it starts with appetite.',
    summary: 'A sketch-led meal market where loose marker drawings turn seasonal ingredients into clear, purchasable dinner ideas.',
    theme: 'The cook’s field notebook',
    intentHeadline: 'A marketplace that feels drawn by the people who picked and cooked the food.',
    colorRationale: 'Tomato red, leaf green, harvest yellow, and beet ink come directly from the ingredients. Warm paper keeps the palette tactile while black outlines give each energetic marker shape a readable edge.',
    systemRationale: 'Every recipe behaves like a page from a working illustrator’s notebook: oversized food drawings, taped swatches, handwritten energy, and precise product details. The contrast between expressive art and quiet structure keeps the experience playful without making it hard to shop.',
    interactionRationale: 'Live search and mood filters narrow the table immediately. Add controls open a usable bag with quantities and subtotal, while prototype checkout feedback clearly states that nothing was purchased or transmitted.',
    paletteColors: [{ name: 'Paper', value: '#f5f0e4' }, { name: 'Tomato marker', value: '#f0523a' }, { name: 'Leaf marker', value: '#6aa43b' }, { name: 'Graphite ink', value: '#17130f' }],
    principles: ['Illustration creates appetite', 'Structure keeps the play legible', 'Every action explains its state'],
    palette: '#f0523a', accent: '#17130f', dark: false,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
