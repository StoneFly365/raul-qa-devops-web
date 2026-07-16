/* Funciones puras data → DOM, reutilizadas por todas las secciones con tarjetas repetidas. */

export function renderCards(containerSelector, items, templateFn) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = items.map(templateFn).join('');
}

/* Construye un marquee autoscroll: un set visible + un set duplicado (aria-hidden)
   dentro del mismo track, condición necesaria para que translateX(-50%) sea un loop continuo. */
export function renderMarquee(trackSelector, items, templateFn) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  const html = items.map(templateFn).join('');
  track.innerHTML = html + `<div class="marquee-dup" aria-hidden="true">${html}</div>`;
}

export function renderChips(containerSelector, items) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = items.map((label) => `<span class="chip">${label}</span>`).join('');
}

export function icon(pathAttr, size = 20) {
  return `<svg width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><${pathAttr}/></svg>`;
}
