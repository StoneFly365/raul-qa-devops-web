/* =============================================================
   DOM — utilidades puras. Sin estado, sin efectos secundarios
   más allá de escribir en el contenedor que se les indica.
   ============================================================= */

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Escapa texto antes de interpolarlo en una plantilla HTML.
   El contenido de data.js es de confianza, pero el formulario
   compone strings con entrada del usuario: usar siempre en ese caso. */
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

/* Icono SVG a partir de los atributos de un <path> de Heroicons. */
export const icon = (pathAttr, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
     stroke-linejoin="round" aria-hidden="true"><path ${pathAttr}/></svg>`;

/* Logo monocromo (Simple Icons, CC0) teñido por CSS vía mask-image.
   Autoalojado en assets/logos: jsDelivr servía `simple-icons@latest`
   desde caché y cinco de los iconos ya no existen en el paquete real
   (Playwright, AWS, Azure, Azure DevOps, OpenAI) — habrían desaparecido
   en silencio en cuanto la caché se refrescara.
   La ruta se deriva de import.meta.url para que funcione desde cualquier
   página, esté a la profundidad que esté. */
const LOGOS = new URL('../logos/', import.meta.url).href;
export const techLogo = ({ slug, mono, name }) => slug
  ? `<span class="tech-logo" style="--logo:url('${LOGOS}${slug}.svg')" role="img" aria-label="${esc(name)}"></span>`
  : `<span class="tech-mono" aria-hidden="true">${esc(mono || name.slice(0, 2).toUpperCase())}</span>`;

/* Inyecta --i en el elemento raíz de un fragmento para escalonar su
   animación de entrada. Pura y exportada para poder testearla. */
export const withIndex = (html, i) =>
  html.replace(/^(\s*<[a-zA-Z][^>]*?)(\s*\/?>)/, `$1 style="--i:${i}"$2`);

/* Escribe una lista de items renderizados en un contenedor. */
export function render(selector, items, template, { stagger = false } = {}) {
  const host = $(selector);
  if (!host) return null;
  host.innerHTML = items
    .map((item, i) => (stagger ? withIndex(template(item, i), i) : template(item, i)))
    .join('');
  return host;
}

/* Marquee infinito: un set visible + un set duplicado oculto para
   lectores de pantalla, condición necesaria para que translateX(-50%)
   sea un bucle sin salto. */
export function renderMarquee(selector, items, template) {
  const track = $(selector);
  if (!track) return null;
  const html = items.map(template).join('');
  track.innerHTML = `${html}<div class="marquee-dup" aria-hidden="true">${html}</div>`;
  return track;
}
