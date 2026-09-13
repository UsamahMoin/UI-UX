import type { ReactNode } from 'react';

const marks: Record<string, ReactNode> = {
  nova: <><path d="M5 5h12v12H5zM31 5h12v12H31zM5 31h12v12H5zM31 31h12v12H31z"/><path d="m19 24 5-5 5 5-5 5z" fill="currentColor" stroke="none"/></>,
  serein: <><ellipse cx="24" cy="26" rx="16" ry="19" strokeWidth="1"/><path d="M31 15c-3-5-15-4-15 3 0 8 17 6 17 15 0 8-14 10-19 3M15 35v5M32 12v5" strokeWidth="2"/><path d="m24 1 3 4-3 3-3-3z" fill="currentColor" stroke="none"/></>,
  form: <><path d="M6 5h12v38H6zM23 5h19v10H23zM23 22h13v10H23z" fill="currentColor" stroke="none"/></>,
  aura: <><path d="M7 35C7 18 16 6 26 6c10 0 16 9 16 21v9H30V24c0-6-2-9-5-9s-6 5-6 12v8Z" fill="currentColor" stroke="none"/><path d="M7 42c12-6 23-6 35-2" strokeWidth="2"/></>,
  vernacular: <><path d="M4 6h13l8 23L35 6h10L28 43H17Z" fill="currentColor" stroke="none"/><path d="m20 7 8 19" strokeWidth="1.5"/></>,
  field: <><path d="M7 42V6h32v8H17v9h17v8H17v11Z" fill="currentColor" stroke="none"/><path d="m30 43 7-10 7 10Z" fill="currentColor" stroke="none"/></>,
  atelier: <><path d="M3 41h10M31 41h13M8 41 24 6l15 35M14 28h19M17 6h15" strokeWidth="2" strokeLinecap="square"/><path d="M24 7v33M18 40h12" strokeWidth="1.4" strokeLinecap="square"/></>,
  signal: <><path d="M5 36h12V25h12V13h9"/><circle cx="40" cy="13" r="4" fill="currentColor" stroke="none"/><path d="M5 43h38" strokeWidth="1.5"/></>,
  civic: <><path d="M5 40h38v5H5zM8 20h7v16H8zM21 20h7v16h-7zM34 20h7v16h-7zM4 15 24 3l20 12v3H4Z" fill="currentColor" stroke="none"/></>,
  lumen: <><path d="M6 17h36v22H6zM12 39v5M36 39v5"/><path d="m8 5 8 1-1 7-8-1zM21 4h7v9h-7zM34 6l7-1 1 7-7 1z" fill="currentColor" stroke="none"/></>,
  pantry: <><path d="M5 23q19-5 38 0M7 24q2 16 17 16 14-1 17-16M13 45l23-1M24 20c-1-9 5-14 13-14-1 8-7 13-13 14ZM24 20 17 9"/></>,
};

export function BrandMark({ slug, className = '' }: { slug: string; className?: string }) {
  return <svg className={`brand-mark brand-${slug} ${className}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{marks[slug] ?? marks.form}</svg>;
}
