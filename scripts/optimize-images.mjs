// Generates WebP versions of the photos in public/uploads into public/opt/:
//   <name>.webp       same pixel size as the original (keeps layouts that rely on natural size)
//   <name>-800.webp   800px wide variant for phones, thumbnails and galleries
// Runs incrementally: files are only regenerated when the source is newer.
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';

const SRC = 'public/uploads';
const OUT = 'public/opt';
const SMALL_WIDTH = 800;
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield path;
  }
}

const isFresh = async (src, out) => {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
};

let made = 0;
for await (const file of walk(SRC)) {
  const base = join(OUT, relative(SRC, file)).slice(0, -extname(file).length);
  const targets = [
    [`${base}.webp`, null],
    [`${base}-${SMALL_WIDTH}.webp`, SMALL_WIDTH],
  ];
  for (const [out, width] of targets) {
    if (await isFresh(file, out)) continue;
    await mkdir(dirname(out), { recursive: true });
    const img = sharp(file);
    if (width) img.resize({ width, withoutEnlargement: true });
    await img.webp({ quality: QUALITY }).toFile(out);
    made++;
  }
}
console.log(`optimize-images: ${made} file(s) written to ${OUT}`);
