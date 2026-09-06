import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist/client');
const workOutput = path.join(output, 'work');

await mkdir(workOutput, { recursive: true });
await copyFile(path.join(output, 'work.html'), path.join(workOutput, 'index.html'));

for (const file of await readdir(workOutput)) {
  if (!file.endsWith('.html') || file === 'index.html') continue;
  const routeDirectory = path.join(workOutput, file.slice(0, -5));
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(path.join(workOutput, file), path.join(routeDirectory, 'index.html'));
}

await writeFile(path.join(output, '.nojekyll'), '');
