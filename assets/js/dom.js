/* =============================================================
   DOM — utilidades puras. Sin estado y sin efectos secundarios
   más allá de escribir en el contenedor que se les indica.
   ============================================================= */

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Escapa texto antes de interpolarlo en una plantilla HTML.
   El contenido de data.js es de confianza, pero el formulario compone
   strings con entrada del usuario: en ese camino, siempre. */
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

/* Atributos de un enlace externo. `noopener` evita que la pestaña
   destino pueda tocar window.opener; se repetía en diez plantillas. */
export const ext = (isExternal) =>
  (isExternal ? ' target="_blank" rel="noopener"' : '');

/* Icono SVG a partir de los atributos del <path> de un Heroicon. */
export const icon = (pathAttr, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
     stroke-linejoin="round" aria-hidden="true"><path ${pathAttr}/></svg>`;

/* Logo monocromo (Simple Icons, CC0) teñido por CSS vía mask-image.
   Autoalojado: servirlos desde un CDN dejaba huecos silenciosos en
   cuanto un slug desaparecía del paquete upstream.
   La ruta sale de import.meta.url para que funcione desde cualquier
   página, esté a la profundidad de carpetas que esté. */
const LOGOS = new URL('../logos/', import.meta.url).href;
export const techLogo = ({ slug, mono, name }) => (slug
  ? `<span class="tech-logo" style="--logo:url('${LOGOS}${slug}.svg')" role="img" aria-label="${esc(name)}"></span>`
  : `<span class="tech-mono" aria-hidden="true">${esc(mono || name.slice(0, 2).toUpperCase())}</span>`);

/* Inyecta --i en el elemento raíz de un fragmento para escalonar su
   animación de entrada. Pura y exportada para poder testearla. */
export const withIndex = (html, i) =>
  html.replace(/^(\s*<[a-zA-Z][^>]*?)(\s*\/?>)/, `$1 style="--i:${i}"$2`);

/* Fecha ISO → texto legible en español, sin librería de fechas. */
export const fmtDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric',
});

/* Escribe una lista de items renderizados en un contenedor.
   Devuelve el contenedor (o null si no existe en esta página, que es
   lo normal: el mismo módulo sirve al home y a las subpáginas). */
export function render(selector, items, template, { stagger = false } = {}) {
  const host = $(selector);
  if (!host) return null;
  host.innerHTML = items
    .map((item, i) => (stagger ? withIndex(template(item, i), i) : template(item, i)))
    .join('');
  return host;
}
