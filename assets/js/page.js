/* =============================================================
   PAGE — punto de entrada de las subpáginas (blog y landings).
   Inyecta la cabecera y el pie compartidos, renderiza el listado de
   artículos si la página tiene uno y engancha el mismo comportamiento
   de navegación y animación que el home.
   ============================================================= */
import { initChrome } from './chrome.js';
import { renderPosts, wireBookingCtas } from './sections.js';
import { initMotion } from './motion.js';
import { initUI } from './ui.js';

initChrome();
renderPosts();
wireBookingCtas();
initMotion();
initUI();
