import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('styles.css', root), 'utf8');
const refs = [...html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)].map(m=>m[1]);
const urls = [...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m=>m[1]);
for (const ref of [...new Set([...refs, ...urls])]) {
  if (ref === '/about') continue;
  const relative = ref.replace(/^\//, '');
  await access(fileURLToPath(new URL(relative, root)));
}
console.log('Validated HTML, stylesheet asset references, and local assets.');
