/* =============================================================
   Suite de humo del sitio: `npm test`.

   No pretende cubrir la interacción del navegador — eso se ve
   abriendo la página. Cubre lo que se rompe en silencio y no se
   nota hasta que ya está desplegado:

     · las utilidades puras de dom.js (escape y reescritura),
     · un slug de tecnología sin su SVG,
     · un enlace interno que apunta a un archivo inexistente,
     · una página sin title, description, canonical u og:image,
     · un id duplicado en el mismo documento,
     · datos de data.js con la forma equivocada.

   Es el quality gate de esta web. Si falla, no se despliega.
   ============================================================= */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, withIndex, icon, techLogo, fmtDate } from './dom.js';
import { techGroups, aiStack, services, projects, career, posts, site } from './data.js';
import { prerenderIndex, prerenderRadar } from '../../scripts/prerender.mjs';

/* fileURLToPath y no url.pathname: la ruta del proyecto lleva un
   espacio y pathname lo devuelve como %20. */
const ROOT = fileURLToPath(new URL('../../', import.meta.url));
/* Prefijo que GitHub Pages antepone a las rutas absolutas de este
   repositorio. En dominio propio pasaría a ser '/'. */
const BASE_PATH = '/raul-qa-devops-web/';

const htmlFiles = (dir = ROOT, acc = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
};
const PAGES = htmlFiles();
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
/* Páginas que no son contenido publicable y por tanto no entran en las
   comprobaciones de SEO: la plantilla lleva marcadores {{...}} y el 404
   no se indexa nunca. */
const NO_INDEXABLE = new Set(['blog/_plantilla.html', '404.html']);
const INDEXABLES = PAGES.filter((f) => !NO_INDEXABLE.has(rel(f)));

/* =============================================================
   Utilidades puras
   ============================================================= */
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

test('techLogo cae al monograma sin slug y escapa el nombre', () => {
  assert.match(techLogo({ slug: 'playwright', name: 'Playwright' }), /assets\/logos\/playwright\.svg/);
  assert.match(techLogo({ name: 'Karate DSL', mono: 'KA' }), /class="tech-mono"[^>]*>KA</);
  assert.match(techLogo({ slug: 'x', name: 'A & B' }), /aria-label="A &amp; B"/);
});

test('fmtDate no se desplaza un día por zona horaria', () => {
  assert.match(fmtDate('2026-01-01'), /1 de enero de 2026/);
});

/* =============================================================
   Integridad de los datos
   ============================================================= */
/* El fallo que se evita: un slug sin archivo se renderiza como un
   hueco vacío en la pastilla, sin error de consola y sin petición
   fallida visible. Aquí se caza antes de desplegar. */
test('cada slug de tecnología tiene su SVG autoalojado', () => {
  const slugs = [...techGroups.flatMap((g) => g.items), ...aiStack]
    .map((t) => t.slug).filter(Boolean);
  const faltan = [...new Set(slugs)]
    .filter((s) => !fs.existsSync(path.join(ROOT, 'assets/logos', `${s}.svg`)));
  assert.deepEqual(faltan, [], `sin logo en assets/logos: ${faltan.join(', ')}`);
});

test('cada servicio tiene id único y apunta a una landing existente', () => {
  const ids = services.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'hay ids de servicio repetidos');
  for (const s of services) {
    assert.ok(s.page.endsWith('/'), `${s.id}: la landing debe acabar en "/"`);
    assert.ok(fs.existsSync(path.join(ROOT, s.page, 'index.html')),
      `${s.id}: falta ${s.page}index.html`);
    assert.ok(s.benefits.length >= 3, `${s.id}: menos de tres beneficios`);
  }
});

test('cada proyecto tiene repo, portada y enlace a GitHub', () => {
  for (const p of projects) {
    assert.match(p.github, /^https:\/\/github\.com\//, `${p.repo}: GitHub inválido`);
    assert.ok(p.github.endsWith(p.repo), `${p.repo}: el enlace no coincide con el repo`);
    assert.ok(p.cover?.glyph, `${p.repo}: falta el glifo de portada`);
    assert.ok(p.tech.length && p.tags.length, `${p.repo}: sin tecnologías o sin etiquetas`);
  }
});

test('la trayectoria tiene exactamente una etapa marcada como actual', () => {
  assert.equal(career.filter((c) => c.now).length, 1);
});

/* Decisión de contenido: el CV no se publica. La carpeta cv/ está en
   .gitignore, así que cualquier enlace a ella daría 404 en producción
   sin avisar en local, donde el archivo sí existe. La trayectoria vive
   en LinkedIn. */
test('ninguna página ni plantilla enlaza al CV en PDF', () => {
  const fuentes = [...PAGES, path.join(ROOT, 'assets/js/data.js'), path.join(ROOT, 'assets/js/chrome.js')];
  const culpables = fuentes
    .filter((f) => /cv\/[^"'\s]*\.pdf/.test(fs.readFileSync(f, 'utf8')))
    .map(rel);
  assert.deepEqual(culpables, [], `enlazan al CV, que no se publica: ${culpables.join(', ')}`);
});

test('los artículos publicados tienen la forma esperada', () => {
  for (const p of posts) {
    assert.match(p.date, /^\d{4}-\d{2}-\d{2}$/, `${p.slug}: fecha no ISO`);
    assert.ok(p.title && p.excerpt, `${p.slug}: sin título o sin resumen`);
    assert.ok(fs.existsSync(path.join(ROOT, 'blog', `${p.slug}.html`)),
      `${p.slug}: falta blog/${p.slug}.html`);
  }
});

/* =============================================================
   Salud de las páginas
   ============================================================= */
test('hay páginas HTML que auditar', () => {
  assert.ok(PAGES.length >= 10, `sólo se han encontrado ${PAGES.length} páginas`);
});

test('ningún enlace interno apunta a un archivo inexistente', () => {
  const rotos = [];
  for (const file of PAGES) {
    const html = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const raw = m[1];
      // Fuera: externos, anclas, protocolos y marcadores de la plantilla.
      if (/^(https?:|mailto:|#|data:|\{\{)/.test(raw)) continue;
      const clean = raw.split(/[?#]/)[0];
      if (!clean) continue;
      const target = clean.startsWith('/')
        ? path.join(ROOT, clean.slice(BASE_PATH.length))   // ruta absoluta de GitHub Pages
        : path.resolve(dir, clean);
      const ok = fs.existsSync(target)
        || fs.existsSync(path.join(target, 'index.html'));
      if (!ok) rotos.push(`${rel(file)} → ${raw}`);
    }
  }
  assert.deepEqual(rotos, [], `enlaces rotos:\n  ${rotos.join('\n  ')}`);
});

/* Los rangos son los que de verdad importan: por encima, Google trunca
   en el resultado de búsqueda y se pierde la llamada a la acción. */
test('toda página indexable declara title, description, canonical y og:image', () => {
  const fallos = [];
  for (const file of INDEXABLES) {
    const html = fs.readFileSync(file, 'utf8');
    const name = rel(file);
    const need = {
      '<title>':      /<title>[^<]{15,65}<\/title>/,
      'description':  /<meta name="description" content="[^"]{80,165}">/,
      'canonical':    /<link rel="canonical" href="https:\/\//,
      'og:image':     /<meta property="og:image" content="https:\/\//,
      'og:title':     /<meta property="og:title"/,
      'lang="es"':    /<html lang="es"/,
    };
    for (const [label, re] of Object.entries(need)) {
      if (!re.test(html)) fallos.push(`${name}: falta o es inválido ${label}`);
    }
  }
  assert.deepEqual(fallos, [], `\n  ${fallos.join('\n  ')}`);
});

test('ninguna página repite un id', () => {
  const fallos = [];
  for (const file of PAGES) {
    const html = fs.readFileSync(file, 'utf8');
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
    if (dup.length) fallos.push(`${rel(file)}: ${[...new Set(dup)].join(', ')}`);
  }
  assert.deepEqual(fallos, [], `ids duplicados:\n  ${fallos.join('\n  ')}`);
});

test('toda página tiene skip-link, un único h1 y main identificable', () => {
  const fallos = [];
  for (const file of PAGES) {
    const html = fs.readFileSync(file, 'utf8');
    const name = rel(file);
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) fallos.push(`${name}: ${h1} elementos <h1>`);
    if (!html.includes('id="main"')) fallos.push(`${name}: sin <main id="main">`);
    if (name !== '404.html' && !html.includes('class="skip-link"')) {
      fallos.push(`${name}: sin enlace de salto al contenido`);
    }
  }
  assert.deepEqual(fallos, [], `\n  ${fallos.join('\n  ')}`);
});

test('todo enlace que abre pestaña nueva lleva rel="noopener"', () => {
  const fallos = [];
  for (const file of [...PAGES, path.join(ROOT, 'assets/js/sections.js'), path.join(ROOT, 'assets/js/chrome.js')]) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) {
      if (!/rel="[^"]*noopener/.test(m[0])) fallos.push(`${rel(file)}: ${m[0].slice(0, 90)}`);
    }
  }
  assert.deepEqual(fallos, [], `\n  ${fallos.join('\n  ')}`);
});

test('las landings sin contenido extenso siguen en noindex y fuera del sitemap', () => {
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  // Sólo cuenta lo que está fuera de comentarios XML.
  const activo = sitemap.replace(/<!--[\s\S]*?-->/g, '');
  for (const s of services) {
    const html = fs.readFileSync(path.join(ROOT, s.page, 'index.html'), 'utf8');
    const enConstruccion = html.includes('class="wip"');
    const noindex = /content="noindex/.test(html);
    const enSitemap = activo.includes(`/${s.page}<`);
    assert.equal(enConstruccion, noindex,
      `${s.page}: el aviso de construcción y el noindex deben ir juntos`);
    assert.ok(!(noindex && enSitemap),
      `${s.page}: está en noindex pero aparece en el sitemap`);
  }
});

/* El contenido del home se inyecta con JS, pero también se prerenderiza
   en el estático (npm run build) para que crawlers y visitantes sin JS
   lo vean. Si alguien edita data.js y no reconstruye, index.html queda
   desfasado: aquí se caza antes de desplegar. */
test('index.html está prerenderizado y al día con data.js', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.equal(prerenderIndex(html), html,
    'index.html desfasado: ejecuta `npm run build` y vuelve a commitear');
});

test('el cuestionario servido está al día con radar.data.js', () => {
  const html = fs.readFileSync(path.join(ROOT, 'radiografia-qa', 'index.html'), 'utf8');
  assert.equal(prerenderRadar(html), html,
    'radiografia-qa desfasado: ejecuta `npm run build` y vuelve a commitear');
});

/* radar.ui.js no renderiza la página, la conduce: todo lo que busca
   tiene que existir ya en el HTML. Renombrar un data-* en la plantilla
   deja el cuestionario muerto sin que falle nada más, y en el navegador
   se ve como un botón que no responde. */
test('radar.ui.js no busca ningún gancho que el HTML no tenga', () => {
  const js = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'radar.ui.js'), 'utf8');
  const html = fs.readFileSync(path.join(ROOT, 'radiografia-qa', 'index.html'), 'utf8');

  /* Sólo los selectores literales: los que se componen con plantilla
     llevan comillas invertidas y dependen de datos, no del marcado. */
  const usados = [...js.matchAll(/\$\$?\('(#[\w-]+|\[data-[\w-]+\])'/g)].map((m) => m[1]);
  assert.ok(usados.length >= 10, 'el extractor de selectores dejó de encontrarlos');

  /* El atributo tiene que terminar donde termina el selector: sin el
     lookahead, buscar `data-nav` lo daría por bueno dentro de
     `data-navegacion` y el test no detectaría el renombrado. */
  const faltan = [...new Set(usados)].filter((sel) => (sel.startsWith('#')
    ? !html.includes(`id="${sel.slice(1)}"`)
    : !new RegExp(`${sel.slice(1, -1)}(?=[\\s=>])`).test(html)));

  assert.deepEqual(faltan, [], `ganchos que radar.ui.js busca y no existen:\n  ${faltan.join('\n  ')}`);
});

test('el canonical de cada página coincide con su ruta real', () => {
  const fallos = [];
  for (const file of INDEXABLES) {
    const html = fs.readFileSync(file, 'utf8');
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!m) continue;
    const esperado = site.url + rel(file).replace(/(^|\/)index\.html$/, '$1');
    if (m[1] !== esperado) fallos.push(`${rel(file)}: ${m[1]} ≠ ${esperado}`);
  }
  assert.deepEqual(fallos, [], `\n  ${fallos.join('\n  ')}`);
});
