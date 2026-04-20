#!/usr/bin/env node
// Rasterize SVG logos to the PNG assets required by the manifest, iOS, and OG tags.
// Also regenerates favicon.ico (multi-size) from the mark.
// Run: `npm run logos`

import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const pub = (p) => path.join(root, 'public', p);

const pngJobs = [
  { src: pub('logo-mark.svg'), out: pub('apple-touch-icon.png'), size: 180 },
  { src: pub('logo-mark.svg'), out: pub('icon-192.png'), size: 192 },
  { src: pub('logo-mark.svg'), out: pub('icon-512.png'), size: 512 },
  { src: pub('og-default.svg'), out: pub('og-default.png'), width: 1200, height: 630 },
];

for (const job of pngJobs) {
  const svg = await readFile(job.src);
  const pipeline = sharp(svg, { density: 288 });
  if (job.size) pipeline.resize(job.size, job.size, { fit: 'contain' });
  else pipeline.resize(job.width, job.height, { fit: 'contain' });
  await pipeline.png({ compressionLevel: 9 }).toFile(job.out);
  console.log(`✓ ${path.relative(root, job.out)}`);
}

// Multi-size favicon.ico — 16/32/48 are the classic set most tools still ask for.
const markSvg = await readFile(pub('favicon.svg'));
const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map((s) =>
    sharp(markSvg, { density: 288 }).resize(s, s, { fit: 'contain' }).png().toBuffer(),
  ),
);
await writeFile(pub('favicon.ico'), await pngToIco(icoBuffers));
console.log(`✓ ${path.relative(root, pub('favicon.ico'))} (${icoSizes.join(', ')})`);
