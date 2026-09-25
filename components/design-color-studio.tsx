'use client';

import {
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import { contrast, hsl, onColor } from '@/lib/design-lab';
import { Slider } from '@/components/ui/slider';

type Role = 'bg' | 'ink' | 'accent';
type Palette = Record<Role, string>;
type Target = Role | 'palette';
const relations = {
  complementary: {
    name: 'Complementary',
    offsets: [0, 180],
    note: 'Opposite hues are 180° apart. Their difference can create emphasis. Let one dominate and use the other sparingly; two equally strong colors can compete.',
  },
  analogous: {
    name: 'Analogous',
    offsets: [-30, 0, 30],
    note: 'Neighboring hues share a family. This example uses 30° steps. They can create continuity, but similar lightness can make boundaries hard to see.',
  },
  triadic: {
    name: 'Triadic',
    offsets: [0, 120, 240],
    note: 'Three hues, 120° apart, give a broader range. Choose a lead color, then give the others specific roles instead of distributing them equally.',
  },
  monochrome: {
    name: 'Monochromatic',
    offsets: [0],
    note: 'One hue, several lightness levels. A shared hue can make a system feel cohesive; readable contrast still depends on the lightness of each pair.',
  },
};
function toHsl(hex: string) {
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  );
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min,
    l = (max + min) / 2;
  let h = 0;
  if (d) {
    h =
      max === r
        ? ((g - b) / d) % 6
        : max === g
          ? (b - r) / d + 2
          : (r - g) / d + 4;
    h *= 60;
  }
  return [
    Math.round((h + 360) % 360),
    Math.round(d === 0 ? 0 : (d / (1 - Math.abs(2 * l - 1))) * 100),
    Math.round(l * 100),
  ];
}
function HexField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const invalid = !/^#[0-9a-f]{6}$/i.test(draft);
  return (
    <label className="fg-hex-field">
      <span>{label}</span>
      <div>
        <input
          type="color"
          aria-label={`${label} color picker`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          aria-label={`${label} hex value`}
          spellCheck={false}
          value={draft}
          maxLength={7}
          aria-invalid={invalid}
          onChange={(e) => {
            const v = e.target.value;
            setDraft(v);
            if (/^#[0-9a-f]{6}$/i.test(v)) onChange(v);
          }}
        />
      </div>
      {invalid && (
        <small>
          Enter # and six hex digits. The last valid color stays in use.
        </small>
      )}
    </label>
  );
}
export function DesignColorStudio({
  name,
  palette,
  linkAction,
  onChange,
  onPaletteChange,
  onReset,
}: {
  name: string;
  palette: Palette;
  linkAction: boolean;
  onChange: (role: Role, color: string) => void;
  onPaletteChange: (palette: Palette) => void;
  onReset: () => void;
}) {
  const initial = toHsl(palette.accent);
  const [hue, setHue] = useState(initial[0]),
    [sat, setSat] = useState(initial[1]),
    [light, setLight] = useState(initial[2]);
  const [relationship, setRelationship] =
      useState<keyof typeof relations>('complementary'),
    [role, setRole] = useState<Target>('palette'),
    [notice, setNotice] = useState('');
  const [darkCanvas] = useState(() => toHsl(palette.bg)[2] < 50);
  const selectedColor = palette[role === 'palette' ? 'accent' : role];
  function applyColor(color: string) {
    if (role !== 'palette') {
      onChange(role, color);
      return;
    }
    const [h, s, l] = toHsl(color);
    onPaletteChange({
      accent: color,
      bg: hsl(h, Math.min(s, 38), darkCanvas ? 7 + l * 0.12 : 88 + l * 0.08),
      ink: hsl(h, Math.min(s, 35), darkCanvas ? 94 : 14),
    });
  }
  useEffect(() => {
    // Keep exact slider positions when the hex value came from those controls.
    // Converting back from rounded RGB can otherwise move hue by a degree.
    if (hsl(hue, sat, light).toLowerCase() === selectedColor.toLowerCase())
      return;
    const [h, s, l] = toHsl(selectedColor);
    setHue(h);
    setSat(s);
    setLight(l);
  }, [selectedColor, role, hue, sat, light]);
  function adjust(h: number, s: number, l: number) {
    setHue(h);
    setSat(s);
    setLight(l);
    applyColor(hsl(h, s, l));
  }
  function adjustHue(h: number) {
    adjust(h, sat, light);
  }
  function adjustSat(s: number) {
    adjust(hue, s, light);
  }
  function adjustLight(l: number) {
    adjust(hue, sat, l);
  }
  const relation = relations[relationship];
  const colors =
    relationship === 'monochrome'
      ? [hsl(hue, sat, 20), hsl(hue, sat, 50), hsl(hue, sat, 90)]
      : relation.offsets.map((o) => hsl((hue + o + 360) % 360, sat, light));
  function point(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect(),
      x = e.clientX - r.left - r.width / 2,
      y = e.clientY - r.top - r.height / 2;
    adjustHue(
      Math.round(((Math.atan2(x, -y) * 180) / Math.PI + 360) % 360) % 360,
    );
  }
  const checks = [
    ['Body text / canvas', contrast(palette.ink, palette.bg)],
    [
      'Action text',
      contrast(
        palette.accent,
        linkAction ? palette.bg : onColor(palette.accent),
      ),
    ],
  ] as const;
  return (
    <section
      className="fg-color-studio"
      id="color-studio"
      aria-labelledby="color-studio-title"
    >
      <header>
        <div>
          <p className="fg-label">COLOR STUDIO / {name.toUpperCase()}</p>
          <h2 id="color-studio-title">
            Find a relationship.
            <br />
            Give each color a job.
          </h2>
        </div>
        <p>
          Move the wheel to recolor the background, navigation, sections, and
          actions together. Choose an individual color below for finer control.
          Your copy stays the same.
        </p>
      </header>
      <label className="fg-color-target">
        Update
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Target)}
        >
          <option value="palette">Whole website palette</option>
          <option value="accent">Action accent</option>
          <option value="bg">Page canvas</option>
          <option value="ink">Page text</option>
        </select>
      </label>
      <div className="fg-color-workbench">
        <div className="fg-wheel-column">
          <div
            className="fg-color-wheel"
            role="slider"
            tabIndex={0}
            aria-label="Color wheel hue"
            aria-valuemin={0}
            aria-valuemax={359}
            aria-valuenow={hue}
            aria-valuetext={`${hue} degrees`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              point(e);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId)) point(e);
            }}
            onKeyDown={(e) => {
              if (
                [
                  'ArrowRight',
                  'ArrowUp',
                  'ArrowLeft',
                  'ArrowDown',
                  'Home',
                  'End',
                ].includes(e.key)
              ) {
                e.preventDefault();
                adjustHue(
                  e.key === 'Home'
                    ? 0
                    : e.key === 'End'
                      ? 359
                      : (hue +
                          (e.key === 'ArrowRight' || e.key === 'ArrowUp'
                            ? 1
                            : -1) +
                          360) %
                        360,
                );
              }
            }}
          >
            {relation.offsets.map((o, i) => (
              <span
                className="fg-wheel-marker"
                key={i}
                style={
                  { '--angle': `${(hue + o + 360) % 360}deg` } as CSSProperties
                }
              >
                <b>{i + 1}</b>
              </span>
            ))}
            <div className="fg-wheel-center" aria-hidden="true">
              <strong>{hue}°</strong>
              <span>HUE</span>
            </div>
          </div>
          <p className="fg-wheel-help">
            Drag the wheel or use arrow keys. The numbered markers show the
            relationship.
          </p>
          {(
            [
              ['Hue', hue, 0, 359, '°', adjustHue],
              ['Saturation', sat, 0, 100, '%', adjustSat],
              ['Lightness', light, 0, 100, '%', adjustLight],
            ] as const
          ).map(([label, value, min, max, unit, setter]) => (
            <div className="fg-color-range" key={label}>
              <label id={`color-${label}`}>
                {label}
                <span>
                  {value}
                  {unit}
                </span>
              </label>
              <Slider
                aria-labelledby={`color-${label}`}
                value={[value]}
                min={min}
                max={max}
                step={1}
                onValueChange={(v) => setter(Array.isArray(v) ? v[0] : v)}
              />
            </div>
          ))}
        </div>
        <div className="fg-color-relationships">
          <div
            className="fg-harmony-options"
            role="group"
            aria-label="Color relationship"
          >
            {Object.entries(relations).map(([key, r]) => (
              <button
                key={key}
                aria-pressed={key === relationship}
                onClick={() => setRelationship(key as keyof typeof relations)}
              >
                {r.name}
              </button>
            ))}
          </div>
          <h3>{relation.name}</h3>
          <p>{relation.note}</p>
          <div className="fg-color-swatches">
            {colors.map((color, i) => (
              <button
                key={i}
                style={{ background: color, color: onColor(color) }}
                onClick={() => {
                  applyColor(color);
                  setNotice(
                    `${color} applied to ${role === 'palette' ? 'whole website palette' : role === 'accent' ? 'action accent' : role === 'bg' ? 'page canvas' : 'page text'} in ${name}.`,
                  );
                }}
                aria-label={`Apply ${color} to ${role}`}
              >
                <span>{i + 1}</span>
                <strong>{color}</strong>
                <small>Apply color</small>
              </button>
            ))}
          </div>
          <p className="fg-color-note">
            Hue harmony is not text contrast. HSL is a useful control model, but
            equal HSL steps do not look equally different. Try changing
            lightness without changing hue.
          </p>
          <div className="fg-color-fields">
            <HexField
              label="Page canvas"
              value={palette.bg}
              onChange={(v) => onChange('bg', v)}
            />
            <HexField
              label="Page text"
              value={palette.ink}
              onChange={(v) => onChange('ink', v)}
            />
            <HexField
              label="Action accent"
              value={palette.accent}
              onChange={(v) => onChange('accent', v)}
            />
          </div>
          <p className="fg-color-note">
            Whole website palette creates coordinated surface and text colors
            from your chosen accent, keeping this design's light or dark
            character. Individual controls change just that role. Photographs
            stay unchanged.
          </p>
          <div className="fg-color-checks">
            {checks.map(([label, ratio]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{ratio.toFixed(2)}:1</strong>
                <p>
                  {ratio >= 4.5 ? 'Meets' : 'Below'} 4.5:1 for ordinary text
                </p>
              </div>
            ))}
          </div>
          <p className="fg-color-note">
            Checks use the exact ratio before rounding. These solid-color pairs
            do not cover image overlays, every surface, or full accessibility
            conformance.
          </p>
          <div className="fg-color-actions">
            <a href="#study-top">View your changes ↑</a>
            <button
              onClick={() => {
                onReset();
                setNotice(`${name} palette restored.`);
              }}
            >
              Reset this palette
            </button>
          </div>
          <p className="fg-color-status" role="status">
            {notice}
          </p>
        </div>
      </div>
      <div className="fg-color-lessons">
        <article>
          <h3>Complementary does not mean equal.</h3>
          <p>
            Try a large, low-saturation blue field with a small orange action.
            Reverse the proportions. Which element attracts attention first? The
            relationship is the same; the hierarchy changes.
          </p>
        </article>
        <article>
          <h3>Assign roles before adding colors.</h3>
          <p>
            A canvas gives content a home. Text needs contrast. An action accent
            tells you where to go. Reserve status colors for labeled feedback; a
            red or green dot alone is not enough.
          </p>
        </article>
        <article>
          <h3>Test the context.</h3>
          <p>
            A palette that feels energetic on a fashion campaign may distract
            from a public service. Keep the same colors, change their
            proportions, and explain which treatment serves the audience.
          </p>
        </article>
      </div>
    </section>
  );
}
