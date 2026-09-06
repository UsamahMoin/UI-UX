const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix public routes and assets when the portfolio is built for GitHub Pages. */
export function sitePath(path: string) {
  if (!path.startsWith('/')) return path;
  if (path === '/') return basePath ? `${basePath}/` : '/';
  return `${basePath}${path}`;
}
