/* =============================================================
   MAIN — punto de entrada. Renderiza el contenido y engancha
   la interacción. El orden importa: primero DOM, luego observers.
   ============================================================= */
import { renderAll } from './sections.js';
import { initMotion } from './motion.js';
import { initUI } from './ui.js';

renderAll();
initMotion();
initUI();

/* Ancla profunda al cargar: el CSS ya aplica scroll-padding-top,
   pero el contenido se inyecta después, así que reposicionamos. */
if (location.hash) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
}
