"""Create editable, self-contained source starters without account/deployment secrets.
Run before either production build. Only public project assets enter each ZIP.
"""
from pathlib import Path
import json, re, zipfile
root=Path(__file__).resolve().parent.parent
slugs=['nova','serein','form','aura','vernacular','field','atelier','signal','civic','lumen','pantry']
names={s:s.upper() for s in slugs}; names['pantry']='SCRIBBLE'
out=root/'public/downloads'; out.mkdir(exist_ok=True)
package=json.loads((root/'package.json').read_text())
package['scripts']={'dev':'vinext dev','build':'vinext build','start':'vinext start'}
package['devDependencies'].pop('@openai/sites-vite-plugin',None)
package['devDependencies'].pop('@cloudflare/vite-plugin',None)
package['devDependencies'].pop('@cloudflare/workers-types',None)
package['devDependencies'].pop('wrangler',None)
common=[]
for folder in ['components','lib','hooks']:
 common += [p for p in (root/folder).rglob('*') if p.is_file() and p.suffix in ['.ts','.tsx']]
common += list((root/'app').glob('*.css'))
common += [root/p for p in ['app/layout.tsx','app/work/projects.ts','tsconfig.json']]
# Shared components refer to this editorial data even when their route is not used.
common += [root/'app/work/form/archive/content.ts']
common += [p for p in (root/'public').glob('*') if p.is_file()]
for slug in slugs:
 files={str(p.relative_to(root)):p.read_bytes() for p in common}
 files.update({str(p.relative_to(root)):p.read_bytes() for p in (root/'public/images').glob(slug+'-*') if p.is_file()})
 if (root/'app/work'/slug).exists():
  files.update({str(p.relative_to(root)):p.read_bytes() for p in (root/'app/work'/slug).rglob('*') if p.is_file() and p.suffix in ['.ts','.tsx']})
 display=names[slug]
 package['name']=slug+'-editable-starter'
 files['package.json']=json.dumps(package,indent=2).encode()
 files['vite.config.ts']=b"import { defineConfig } from 'vite';\nimport vinext from 'vinext';\nimport tailwindcss from '@tailwindcss/postcss';\nexport default defineConfig({plugins:[vinext()],css:{postcss:{plugins:[tailwindcss()]}}});\n"
 files['next.config.ts']=b"export default {images:{unoptimized:true}};\n"
 files['.gitignore']=b"node_modules/\ndist/\n.vinext/\n.env*\n"
 if slug=='serein':
  entry="export {default,metadata} from './work/serein/residence/page';\n"
 else:
  entry=f"import {{ProjectExperience}} from '@/components/project-experience';\nimport {{SiteFooter}} from '@/components/site-footer';\nexport const metadata={{title:{json.dumps(display)}}};\nexport default function Home(){{return <main className=\"standalone-site site-{slug}\" id=\"site-top\"><ProjectExperience slug=\"{slug}\"/><SiteFooter slug=\"{slug}\"/></main>}}\n"
  files[f'app/work/{slug}/experience/page.tsx']=b"export {default,metadata} from '@/app/page';\n"
 files['app/page.tsx']=entry.encode()
 about=f'''import {{sitePath}} from '@/lib/site-path';
import {{experiencePath}} from '@/lib/experience-path';
import {{identities}} from '@/lib/project-identities';
export default function About(){{const i=identities['{slug}'];return <main style={{{{maxWidth:900,margin:'auto',padding:'60px 24px',fontFamily:'sans-serif',lineHeight:1.7}}}}><a href={{sitePath(experiencePath('{slug}'))}}>Open {display}</a><h1>{display}</h1><h2>{{i.name}}</h2><p>{{i.idea}}</p><p>{{i.signature}}</p><section id="download"><h2>Make it your own</h2><p>This folder contains the editable source. See README.md for setup and customization.</p><a href="https://usamahmoin.github.io/UI-UX/work/{slug}/">Original case study and source download</a></section></main>}}
'''
 files[f'app/work/{slug}/page.tsx']=about.encode()
 # Retain public portfolio as a reference, not a dependency of the local site.
 readme=f'''# {display} — editable website

A local React / TypeScript starter from Usamah Moin's interface portfolio.

## Run

1. Install Node.js 22.13 or newer.
2. In this folder run `npm install`.
3. Run `npm run dev` and open the localhost URL printed in the terminal.
4. `npm run build` checks and builds the production site; `npm start` serves it.

No Sites account, Cloudflare account, API key, or private deployment configuration is included or required.

## Make changes

- `app/page.tsx`: the project's entry page.
- `components/project-experience.tsx`: the project interface and interactions.
- `components/nova-dashboard.tsx` and `components/signal-dashboard.tsx`: data dashboards.
- `components/brand-mark.tsx`: editable vector marks.
- `app/*.css`: base and project styles; `experience.css` holds the full-page refinements.
- `app/work/{slug}/`: internal pages, where this project has them.
- `public/images/`: this project's image assets.
- `lib/`: data calculations and helpers.

Shared components are included so imports remain editable without a private package.
Only this project's pages and images are exposed. Paths work from a localhost origin; set
`NEXT_PUBLIC_BASE_PATH` and adjust the build configuration if deploying below a subdirectory.

## Demo boundaries

This is a fictional portfolio concept. Payments, hotel availability, civic submissions,
commerce, and account connections are demonstrations, not connected services. Local-only
state and reset behavior are labeled in the interface. Add your own backend and credentials
before using it as a real service. Photography includes AI-generated concept images.

## Reuse

You may edit and adapt the original interface code and included concept assets for your own
projects. Third-party dependencies keep their respective licenses. This is provided as-is.
Original design and implementation: Usamah Moin. Do not represent fictional products,
people, places or generated photography as verified real-world offerings.
'''
 files['README.md']=readme.encode()
 with zipfile.ZipFile(out/f'{slug}-source.zip','w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for name,data in sorted(files.items()):
   info=zipfile.ZipInfo(f'{slug}-starter/{name}',date_time=(2026,9,12,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
   z.writestr(info,data)
 print(f'{slug}: {len(files)} files, {(out/f"{slug}-source.zip").stat().st_size/1024/1024:.1f} MB')
