/* Smoke test de las utilidades puras de dom.js: `node --test assets/js/`.
   Cubre lo único con lógica real (escape y reescritura de atributos);
   el resto de dom.js es DOM directo y se valida abriendo la página. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { esc, withIndex, icon, techLogo } from './dom.js';
import { techGroups } from './data.js';

test('esc neutraliza los cinco caracteres peligrosos', () => {
  assert.equal(esc('<img src=x onerror="a&b\'c">'),
    '&lt;img src=x onerror=&quot;a&amp;b&#39;c&quot;&gt;');
  assert.equal(esc('texto normal'), 'texto normal');
});

test('withIndex inserta --i en la etiqueta raíz, no en las hijas', () => {
  const out = withIndex('\n  <article class="card" data-reveal>\n  <span>x</span></article>', 3);
  assert.match(out, /<article class="card" data-reveal style="--i:3">/);
  assert.equal(out.match(/--i:/g).length, 1);
});

test('withIndex respeta las etiquetas auto-cerradas', () => {
  assert.equal(withIndex('<hr />', 1), '<hr style="--i:1" />');
});

test('icon produce un SVG oculto a lectores de pantalla', () => {
  const svg = icon('d="M1 2"', 16);
  assert.match(svg, /width="16"/);
  assert.match(svg, /aria-hidden="true"/);
  assert.match(svg, /<path d="M1 2"\/>/);
});

test('techLogo cae al monograma cuando no hay slug y escapa el nombre', () => {
  assert.match(techLogo({ slug: 'playwright', name: 'Playwright' }), /assets\/logos\/playwright\.svg/);
  assert.match(techLogo({ name: 'Karate DSL', mono: 'KA' }), /class="tech-mono"[^>]*>KA</);
  assert.match(techLogo({ slug: 'x', name: 'A & B' }), /aria-label="A &amp; B"/);
});

/* El fallo que se quiere evitar: un slug sin archivo se renderiza como un
   hueco vacío en la pastilla, sin error de consola y sin petición fallida
   visible. Esto lo caza en `npm test`, antes de desplegar. */
test('cada slug de tecnología tiene su SVG autoalojado', () => {
  const slugs = techGroups.flatMap((g) => g.items).map((t) => t.slug).filter(Boolean);
  const faltan = slugs.filter((s) => !fs.existsSync(new URL(`../logos/${s}.svg`, import.meta.url)));
  assert.deepEqual(faltan, [], `sin logo en assets/logos: ${faltan.join(', ')}`);
});
