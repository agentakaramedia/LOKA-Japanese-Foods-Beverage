// Cloudflare (Workers static assets / Pages) rejects any single file over 25 MiB.
// Runs after `astro build` so an oversized upload fails here, with a clear message, instead of in the deploy.
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = 'dist';
const LIMIT = 25 * 1024 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const tooLarge = [];
for await (const file of walk(DIR)) {
  const { size } = await stat(file);
  if (size > LIMIT) tooLarge.push(`  ${file} (${(size / 1024 / 1024).toFixed(1)} MiB)`);
}
if (tooLarge.length) {
  console.error(`check-asset-sizes: files over Cloudflare's 25 MiB limit:\n${tooLarge.join('\n')}`);
  process.exit(1);
}
console.log('check-asset-sizes: all files are under 25 MiB');
