import { copyFile, mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist/client');
const workOutput = path.join(output, 'work');
const prefixedAssets = path.join(output, 'UI-UX', '_next');
const rootAssets = path.join(output, '_next');

// GitHub Pages already mounts this artifact at /UI-UX. Vinext writes assets
// beneath an additional UI-UX directory when assetPrefix is set, so flatten
// that generated directory while keeping the public URLs prefixed.
await rm(rootAssets, { recursive: true, force: true });
await rename(prefixedAssets, rootAssets);
await rm(path.join(output, 'UI-UX'), { recursive: true, force: true });

await mkdir(workOutput, { recursive: true });
await copyFile(path.join(output, 'work.html'), path.join(workOutput, 'index.html'));

async function addDirectoryIndexes(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await addDirectoryIndexes(entryPath);
      continue;
    }
    if (!entry.name.endsWith('.html') || entry.name === 'index.html') continue;
    const routeDirectory = path.join(directory, entry.name.slice(0, -5));
    await mkdir(routeDirectory, { recursive: true });
    await copyFile(entryPath, path.join(routeDirectory, 'index.html'));
  }
}

await addDirectoryIndexes(workOutput);

await writeFile(path.join(output, '.nojekyll'), '');
