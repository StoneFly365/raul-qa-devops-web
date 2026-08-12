/* =============================================================
   PRERENDER — escribe en index.html el HTML que hasta ahora sólo
   generaba el navegador. Así crawlers (Bing, unfurl de LinkedIn/Slack,
   bots de IA) y visitantes sin JS ven servicios, proyectos, trayectoria,
   FAQ, etc. — no una rejilla vacía.

   Único origen de verdad: data.js + las plantillas de sections.js. Este
   script no duplica contenido, lo pinta con las mismas funciones que el
   navegador. `npm run build` antes de desplegar.

   Es idempotente: correrlo sobre un index.html ya prerenderizado no
   cambia nada. De ahí sale el quality gate anti-desfase del test.
   ============================================================= */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { homeBlocks } from '../assets/js/sections.js';
import { renderToString } from '../assets/js/dom.js';
import { stepsHtml } from '../assets/js/radar.view.js';

const INDEX = fileURLToPath(new URL('../index.html', import.meta.url));
const RADAR = fileURLToPath(new URL('../radiografia-qa/index.html', import.meta.url));

/* En Node, techLogo resuelve la ruta del logo contra un file:// (import.
   meta.url del módulo). En el estático que sirve GitHub Pages tiene que
   ser relativa. index.html vive en la raíz, así que assets/logos/ vale. */
const fixLogoPaths = (html) =>
  html.replace(/url\('file:\/\/[^']*\/assets\/logos\//g, "url('assets/logos/");

/* Sustituye el contenido interno del elemento con ese id, respetando el
   anidamiento del mismo tag (los .tech-group dentro de #techGroups son
   todos <div>). Sin dependencias de DOM: cuenta apertura/cierre. */
export function injectInto(html, id, inner) {
  const open = new RegExp(`<([a-zA-Z][\\w-]*)([^>]*\\sid="${id}"[^>]*)>`).exec(html);
  if (!open) throw new Error(`prerender: no existe el contenedor #${id} en index.html`);
  const tag = open[1];
  const start = open.index + open[0].length;

  const tagRe = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
  tagRe.lastIndex = start;
  let depth = 1;
  let m;
  while ((m = tagRe.exec(html))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + inner + html.slice(m.index);
  }
  throw new Error(`prerender: no se encontró el cierre de #${id}`);
}

/* Puro: HTML de entrada → HTML con todos los bloques inyectados. */
export function prerenderIndex(html) {
  for (const { sel, items, template, opts } of homeBlocks()) {
    html = injectInto(html, sel.slice(1), renderToString(items, template, opts));
  }
  return fixLogoPaths(html);
}

/* Puro: los siete pasos de la Radiografía, escritos desde radar.data.js.
   Sin esto el cuestionario existiría sólo si el visitante ejecuta JS, y
   Google no vería ni una de las doce preguntas. */
export function prerenderRadar(html) {
  return injectInto(html, 'radarSteps', stepsHtml());
}

/* Ejecutado directamente (no importado por el test): reescribe los archivos. */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [file, render, name] of [
    [INDEX, prerenderIndex, 'index.html'],
    [RADAR, prerenderRadar, 'radiografia-qa/index.html'],
  ]) {
    const before = fs.readFileSync(file, 'utf8');
    const after = render(before);
    fs.writeFileSync(file, after);
    console.log(after === before ? `${name} ya estaba al día` : `${name} prerenderizado`);
  }
}
