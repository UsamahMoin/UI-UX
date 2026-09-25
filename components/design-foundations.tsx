'use client';
import { useState, type CSSProperties } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Landmark,
  Cpu,
  MoveUpRight,
  BookOpen,
  Compass,
  CircleHelp,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { DesignColorStudio } from '@/components/design-color-studio';
import { directions, sharedCopy } from '@/lib/design-foundations';
import { contrast, onColor } from '@/lib/design-lab';
import { sitePath } from '@/lib/site-path';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
const icons = [Landmark, Cpu, MoveUpRight, BookOpen, Compass, CircleHelp];
export function DesignFoundations() {
  const [active, setActive] = useState(0),
    [inspect, setInspect] = useState(false),
    [editor, setEditor] = useState(false),
    [copy, setCopy] = useState(sharedCopy),
    [frame, setFrame] = useState(0),
    [openDetail, setOpenDetail] = useState<number | null>(null),
    [custom, setCustom] = useState<
      Record<
        string,
        {
          accent?: string;
          bg?: string;
          ink?: string;
          font?: string;
          space?: number;
        }
      >
    >({});
  const theme = directions[active],
    Icon = icons[active],
    values = custom[theme.id] || {},
    accent = values.accent || theme.accent,
    bg = values.bg || theme.bg,
    ink = values.ink || theme.ink,
    font = values.font || theme.font;
  function change(key: string, value: string | number) {
    setCustom((v) => ({ ...v, [theme.id]: { ...v[theme.id], [key]: value } }));
  }
  function choose(i: number) {
    setActive(i);
    setFrame(0);
    setOpenDetail(null);
  }
  const style = {
    '--study-bg': bg,
    '--study-ink': ink,
    '--study-accent': accent,
    '--study-on-accent': onColor(accent),
    '--study-on-ink': onColor(ink),
    '--grunge-texture': `url("${sitePath('/images/design-foundations/grunge-texture.png')}")`,
    '--study-space': `${values.space ?? 32}px`,
    '--study-font':
      font === 'grunge'
        ? '"Rubik Distressed", Impact, sans-serif'
        : font === 'display'
          ? 'Impact, Haettenschweiler, Arial Narrow, sans-serif'
          : font === 'serif'
            ? 'Georgia, serif'
            : font === 'mono'
              ? 'var(--font-geist-mono), monospace'
              : 'var(--font-geist-sans), Arial, sans-serif',
  } as CSSProperties;
  const actionRatio = contrast(
    accent,
    ['editorial', 'luxury'].includes(theme.id) ? bg : onColor(accent),
  );
  const photo = (n: number, className = '') => (
    <div
      className={`fg-photo ${className}`}
      role="img"
      aria-label={theme.photos[n]}
    >
      <span
        className="fg-photo-art"
        style={{
          backgroundImage: `url("${sitePath(`/images/design-foundations/${theme.id}.png`)}")`,
          backgroundPosition: `${n * 50}% center`,
        }}
      />
    </div>
  );
  const ActionArrow = ArrowRight;
  const action = (label = copy.action) => (
    <a className="fg-action" href="#study-details">
      {label}
      <ActionArrow aria-hidden="true" />
    </a>
  );
  const heading = (
    <>
      <span className="fg-eyebrow">{copy.eyebrow}</span>
      <h2>{copy.title}</h2>
      <p className="fg-description">{copy.description}</p>
      {action()}
    </>
  );
  const nav = (
    <nav
      className="fg-site-nav"
      aria-label={`${theme.name} example navigation`}
    >
      <a className="fg-brand" href="#study-top">
        <Icon aria-hidden="true" />
        <span>{copy.brand}</span>
      </a>
      <div>
        <a href="#study-details">Discover</a>
        <a href="#study-details">Details</a>
        <a href="#study-approach">Approach</a>
      </div>
    </nav>
  );
  const detail = (n: number) => (
    <div className="fg-detail-copy">
      <span className="fg-index">0{n + 1}</span>
      <h3>{n === 0 ? copy.first : copy.second}</h3>
      <p>{n === 0 ? copy.firstBody : copy.secondBody}</p>
      <button className="fg-text-link" onClick={() => setOpenDetail(n)}>
        Look closer <ArrowRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
  return (
    <main className="foundations">
      <header className="fg-lab-header">
        <a href={sitePath('/')} className="fg-back">
          ← Portfolio
        </a>
        <a href="#" className="fg-lab-brand">
          FORM<span> & </span>FEEL
        </a>
        <a className="fg-color-shortcut" href="#color-studio">
          Color studio
        </a>
        <button onClick={() => setEditor(true)}>
          <SlidersHorizontal size={16} /> Edit the experiment
        </button>
      </header>
      <section className="fg-intro">
        <div>
          <p className="fg-label">DESIGN FOUNDATIONS / AN INTERACTIVE STUDY</p>
          <h1>
            Same words.
            <br />
            <span>A different world.</span>
          </h1>
        </div>
        <p>
          A university should invite you to belong. A technology product should
          make complexity feel manageable. A sneaker label should have a point
          of view.
          <br />
          <strong>Keep the message. Change how it feels.</strong>
        </p>
      </section>
      <div className="fg-selector" role="group" aria-label="Website direction">
        {directions.map((d, i) => {
          const Symbol = icons[i];
          return (
            <button
              key={d.id}
              aria-pressed={active === i}
              onClick={() => choose(i)}
            >
              <Symbol size={18} />
              <span>{d.name}</span>
              <small>0{i + 1}</small>
            </button>
          );
        })}
      </div>
      <div className="fg-brief">
        <div>
          <span className="fg-label">INTENDED FEELING</span>
          <strong>“{theme.feeling}”</strong>
        </div>
        <button aria-pressed={inspect} onClick={() => setInspect(!inspect)}>
          {inspect ? 'Hide design notes' : 'Show design notes'}{' '}
          <CircleHelp size={17} />
        </button>
      </div>
      {inspect && (
        <aside className="fg-inspect">
          <div>
            <span className="fg-label">THE BRIEF</span>
            <p>{theme.brief}</p>
          </div>
          <div>
            <span className="fg-label">THE PRINCIPLE</span>
            <p>{theme.philosophy}</p>
          </div>
          <div>
            <span className="fg-label">WATCH THE TRADEOFF</span>
            <p>{theme.tradeoff}</p>
          </div>
        </aside>
      )}
      <article
        id="study-top"
        className={`fg-website fg-${theme.id}`}
        style={style}
        aria-label={`${theme.name} website example`}
      >
        {active === 0 && (
          <>
            <div className="fg-institution-line">
              <span>DISCOVER / CONNECT / BELONG</span>
              <span>COMMON GROUND · EDITION 01</span>
            </div>
            {nav}
            <section className="fg-hero">
              <div className="fg-hero-copy">{heading}</div>
              {photo(0)}
            </section>
            <div className="fg-value-line">
              {theme.principles.map((p) => (
                <span key={p}>
                  {p}
                  <ArrowRight size={20} />
                </span>
              ))}
            </div>
            <section id="study-details" className="fg-details">
              <div>
                {photo(1)}
                {detail(0)}
              </div>
              <div>
                {photo(2)}
                {detail(1)}
              </div>
            </section>
          </>
        )}
        {active === 1 && (
          <>
            {nav}
            <section className="fg-hero">
              <div className="fg-hero-copy">{heading}</div>
              <div className="fg-tech-image">
                {photo(0)}
                <span>01 / A CLOSER LOOK</span>
              </div>
            </section>
            <section id="study-details" className="fg-details">
              <div className="fg-tech-feature">
                {detail(0)}
                {photo(1)}
              </div>
              <div className="fg-tech-feature">
                {detail(1)}
                {photo(2)}
              </div>
            </section>
          </>
        )}
        {active === 2 && (
          <>
            {nav}
            <section className="fg-fashion-intro">
              <div className="fg-fashion-fabric" aria-hidden="true">
                {photo(2)}
              </div>
              <div className="fg-fashion-message">
                <span className="fg-eyebrow">{copy.eyebrow}</span>
                <h2>{copy.title}</h2>
                <p>{copy.description}</p>
                {action()}
              </div>
            </section>
            <section id="study-details" className="fg-fashion-collection">
              <h3>{copy.first}</h3>
              <div className="fg-fashion-grid">
                {[
                  'Cobalt varsity jacket with charcoal trousers',
                  'Rust sweatshirt with cream wide-leg trousers',
                  'Cream overshirt with cobalt layers and a knit beanie',
                ].map((label, n) => (
                  <button
                    className="fg-fashion-look"
                    key={label}
                    onClick={() => {
                      setFrame(n);
                      setOpenDetail(0);
                    }}
                    aria-label={`View look ${n + 1}: ${label}`}
                  >
                    <span className="fg-photo" role="img" aria-label={label}>
                      <span
                        className="fg-photo-art"
                        style={{
                          backgroundImage: `url("${sitePath('/images/design-foundations/streetwear-lookbook.png')}")`,
                          backgroundPosition: `${n * 50}% center`,
                        }}
                      />
                    </span>
                    <span className="fg-fashion-caption">
                      <span>LOOK 0{n + 1}</span>
                      <ArrowRight aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
              <div className="fg-fashion-note">
                <p>{copy.firstBody}</p>
                <button
                  className="fg-text-link"
                  onClick={() => setOpenDetail(0)}
                >
                  Look closer <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </section>
            <section className="fg-fashion-product">
              {detail(1)}
              <div className="fg-product-stage">
                {photo(frame)}
                <div
                  className="fg-frame-controls"
                  role="group"
                  aria-label="Campaign image"
                >
                  {['Product', 'On foot', 'Material'].map((label, n) => (
                    <button
                      key={label}
                      aria-pressed={frame === n}
                      aria-label={`Show campaign image ${n + 1}: ${label}`}
                      onClick={() => setFrame(n)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {active === 3 && (
          <>
            <div className="fg-edition">
              <span>INDEPENDENT PERSPECTIVES</span>
              <span>EDITION 01</span>
            </div>
            {nav}
            <section className="fg-hero">
              <div className="fg-hero-copy">{heading}</div>
              <figure>
                {photo(0)}
                <figcaption>01 / {copy.eyebrow}</figcaption>
              </figure>
            </section>
            <section id="study-details" className="fg-details">
              <div>
                {photo(1)}
                {detail(0)}
              </div>
              <div>
                {detail(1)}
                {photo(2)}
              </div>
            </section>
          </>
        )}
        {active === 4 && (
          <>
            {nav}
            <section className="fg-hero">
              <div className="fg-hero-copy">{heading}</div>
              {photo(0)}
            </section>
            <section id="study-details" className="fg-details">
              <div>
                {photo(1)}
                {detail(0)}
              </div>
              <div>
                {detail(1)}
                {photo(2)}
              </div>
            </section>
          </>
        )}
        {active === 5 && (
          <>
            <div className="fg-service-line">
              <Check size={17} />
              <span>A fictional service example · designed for everyone</span>
            </div>
            {nav}
            <section className="fg-hero">
              <div className="fg-hero-copy">{heading}</div>
              <div className="fg-task-links">
                <a href="#study-details">
                  {copy.first}
                  <ArrowRight />
                </a>
                <a href="#study-approach">
                  {copy.second}
                  <ArrowRight />
                </a>
              </div>
            </section>
            {photo(0, 'fg-community-image')}
            <section id="study-details" className="fg-details">
              <div>
                {detail(0)}
                {photo(1)}
              </div>
              <div>
                {detail(1)}
                {photo(2)}
              </div>
            </section>
          </>
        )}
        <footer className="fg-site-footer">
          <span>{copy.brand}</span>
          <a href="#study-top">Back to top ↑</a>
        </footer>
      </article>
      <DesignColorStudio
        key={theme.id}
        name={theme.name}
        palette={{ bg, ink, accent }}
        linkAction={['editorial', 'luxury'].includes(theme.id)}
        onChange={change}
        onReset={() =>
          setCustom((v) => ({
            ...v,
            [theme.id]: {
              ...v[theme.id],
              bg: undefined,
              ink: undefined,
              accent: undefined,
            },
          }))
        }
      />
      <section id="study-approach" className="fg-explanation">
        <header>
          <p className="fg-label">REVERSE-ENGINEER THE FEELING</p>
          <h2>
            Why this feels like
            <br />
            <em>{theme.name.toLowerCase()}.</em>
          </h2>
          <p>{theme.philosophy}</p>
        </header>
        <div className="fg-decisions">
          {[
            ['01', 'Structure', theme.layout],
            ['02', 'Typography', theme.type],
            ['03', 'Image direction', theme.image],
            ['04', 'Interaction', theme.motion],
          ].map(([n, t, b]) => (
            <article key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="fg-foundation-strip">
        <div>
          <p className="fg-label">PALETTE / ASSIGN ROLES FIRST</p>
          <div className="fg-palette">
            {[bg, ink, accent].map((c, i) => (
              <span key={i} style={{ background: c, color: onColor(c) }}>
                <b>{['Canvas', 'Text', 'Action'][i]}</b>
                {c}
              </span>
            ))}
          </div>
          <p>
            These associations come from the whole composition and its context.
            No color guarantees a feeling.
          </p>
        </div>
        <div>
          <p className="fg-label">ACCESSIBILITY / CHECK THE PAIR</p>
          <strong className="fg-ratio">
            {contrast(ink, bg).toFixed(2)}
            <small>:1</small>
          </strong>
          <p>
            Body text against the page. Ordinary text needs at least 4.5:1 at
            WCAG 2.2 AA. This is one check, not a full accessibility audit.
          </p>
          <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">
            Read the contrast guidance ↗
          </a>
        </div>
        <div>
          <p className="fg-label">TRY THE EXPERIMENT</p>
          <h3>
            Change the purpose.
            <br />
            Keep the message.
          </h3>
          <p>
            Switch from University to Streetwear. What changes first in your
            attention? Then try the same font on both. Explain which choice
            supports the audience and why.
          </p>
          <button onClick={() => setEditor(true)}>
            Change a variable <SlidersHorizontal size={16} />
          </button>
        </div>
      </section>
      <footer className="fg-lab-footer">
        <span>FORM & FEEL / A DESIGN FOUNDATIONS LAB</span>
        <p>
          Six fictional websites. Shared core copy. Original AI-generated image
          studies. Feelings are design intentions, not measured research
          outcomes.
        </p>
        <a href={sitePath('/')}>Return to portfolio ↗</a>
      </footer>
      <Dialog open={editor} onOpenChange={setEditor}>
        <DialogContent className="fg-editor">
          <DialogTitle>Edit the experiment</DialogTitle>
          <DialogDescription>
            Core copy stays identical across all six websites. Visual changes
            apply to the current direction.
          </DialogDescription>
          <label>
            Shared heading
            <input
              value={copy.title}
              maxLength={110}
              onChange={(e) =>
                setCopy((c) => ({ ...c, title: e.target.value }))
              }
            />
          </label>
          <label>
            Shared paragraph
            <textarea
              rows={3}
              value={copy.description}
              maxLength={350}
              onChange={(e) =>
                setCopy((c) => ({ ...c, description: e.target.value }))
              }
            />
          </label>
          <label>
            Action color
            <input
              type="color"
              value={accent}
              onChange={(e) => change('accent', e.target.value)}
            />
          </label>
          <label>
            Heading typeface
            <select
              value={font}
              onChange={(e) => change('font', e.target.value)}
            >
              <option value="grunge">Distressed / Rubik Distressed</option>
              <option value="display">Condensed / Impact</option>
              <option value="serif">Serif / Georgia</option>
              <option value="sans">Sans / Geist</option>
              <option value="mono">Monospace / Geist Mono</option>
            </select>
          </label>
          <label>
            Section spacing · {values.space ?? 32}px
            <input
              type="range"
              min="16"
              max="64"
              value={values.space ?? 32}
              onChange={(e) => change('space', Number(e.target.value))}
            />
          </label>
          <p className="fg-editor-check">
            Action text: {actionRatio.toFixed(2)}:1 ·{' '}
            {actionRatio >= 4.5
              ? 'Meets the AA text contrast threshold.'
              : 'Below AA: choose a darker action color.'}
          </p>
          <button
            className="fg-editor-reset"
            onClick={() => {
              setCopy(sharedCopy);
              setCustom({});
            }}
          >
            Reset all experiments
          </button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDetail !== null}
        onOpenChange={(v) => !v && setOpenDetail(null)}
      >
        <DialogContent className="fg-editor">
          <DialogTitle>
            {openDetail === 0 ? copy.first : copy.second}
          </DialogTitle>
          <DialogDescription>
            {openDetail === 0 ? copy.firstBody : copy.secondBody}
          </DialogDescription>
          {theme.id === 'streetwear' && openDetail === 0 && (
            <div
              className="fg-photo fg-look-dialog"
              role="img"
              aria-label={`Streetwear look ${frame + 1}`}
            >
              <span
                className="fg-photo-art"
                style={{
                  backgroundImage: `url("${sitePath('/images/design-foundations/streetwear-lookbook.png')}")`,
                  backgroundPosition: `${frame * 50}% center`,
                }}
              />
            </div>
          )}
          <p>
            <strong>Design observation:</strong> {theme.layout}
          </p>
          <p>
            The same detail opens in every direction. Predictable behavior
            supports a distinct visual identity.
          </p>
        </DialogContent>
      </Dialog>
    </main>
  );
}
