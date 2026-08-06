/* =============================================================
   MAIN — punto de entrada del home. El orden importa: primero se
   escribe el DOM, luego se enganchan los observadores; al revés,
   los observadores no encontrarían nada que observar.
   ============================================================= */
import { renderAll } from './sections.js';
import { initMotion } from './motion.js';
import { initUI } from './ui.js';

renderAll();
initMotion();
initUI();

/* Ancla profunda al cargar: el CSS ya aplica scroll-padding-top, pero
   el contenido se inyecta después, así que hay que reposicionar. */
if (location.hash) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
}
