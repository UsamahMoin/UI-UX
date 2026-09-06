'use client';

import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';

type Artifact = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  rotation: number;
  shape: 'ring' | 'dot' | 'cross' | 'line' | 'corner';
  color: string;
};

const shapes: Artifact['shape'][] = ['ring', 'dot', 'cross', 'line', 'corner'];
const colors = ['#141412', '#d9ff43', '#ff8069', '#8da9ff'];

export function HeroArtifacts({ children }: { children: ReactNode }) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const nextId = useRef(0);

  function createArtifacts(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0 || (event.target as HTMLElement).closest('a, button')) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const burst = Array.from({ length: 5 }, (_, index): Artifact => ({
      id: nextId.current++,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      dx: (Math.random() - 0.5) * (70 + index * 10),
      dy: (Math.random() - 0.5) * (70 + index * 10),
      size: 7 + Math.random() * 17,
      rotation: Math.random() * 180,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const ids = new Set(burst.map(({ id }) => id));
    setArtifacts(current => [...current.slice(-25), ...burst]);
    window.setTimeout(() => {
      setArtifacts(current => current.filter(({ id }) => !ids.has(id)));
    }, 950);
  }

  return (
    <section className="hero-grid" onPointerDown={createArtifacts}>
      {children}
      <div className="hero-click-hint" aria-hidden="true"><i /> Click or tap<br />to make a mark</div>
      <div className="artifact-layer" aria-hidden="true">
        {artifacts.map(artifact => (
          <i
            key={artifact.id}
            className={`click-artifact artifact-${artifact.shape}`}
            style={{
              left: artifact.x,
              top: artifact.y,
              width: artifact.size,
              height: artifact.size,
              color: artifact.color,
              '--artifact-dx': `${artifact.dx}px`,
              '--artifact-dy': `${artifact.dy}px`,
              '--artifact-rotation': `${artifact.rotation}deg`,
            } as CSSProperties}
          />
        ))}
      </div>
    </section>
  );
}
