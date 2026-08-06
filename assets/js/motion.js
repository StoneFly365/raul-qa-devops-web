/* =============================================================
   MOTION — animaciones. Todas se degradan a "estado final visible"
   si el usuario pide movimiento reducido o falta IntersectionObserver.
   Ninguna animación puede dejar contenido oculto de forma permanente.
   ============================================================= */
import { $, $$, prefersReducedMotion } from './dom.js';

const reduced = prefersReducedMotion();

/* Observa una vez y deja de observar: nada queda escuchando scroll. */
function observeOnce(elements, onEnter, options) {
  if (reduced || !('IntersectionObserver' in window)) {
    elements.forEach(onEnter);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      onEnter(e.target);
      io.unobserve(e.target);
    });
  }, options);
  elements.forEach((el) => io.observe(el));
}

/* ---- Reveal on scroll ------------------------------------ */
export function initReveal() {
  observeOnce($$('[data-reveal]'), (el) => el.classList.add('is-in'), {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.06,
  });
}

/* ---- Parallax ligero ------------------------------------- */
/* Un solo listener de scroll para toda la página, coalescido con rAF.
   data-parallax="0.06" = 6 % de la distancia recorrida. */
export function initParallax() {
  const els = $$('[data-parallax]');
  if (reduced || !els.length) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;   // fuera de pantalla: no calcular
      const factor = Number(el.dataset.parallax) || 0.06;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.setProperty('--py', `${(progress * factor * 100).toFixed(1)}px`);
    });
    ticking = false;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* ---- Pipeline (elemento de firma) ------------------------ */
/* Arranca cuando entra en viewport, no al cargar: así la animación se
   ve aunque el visitante llegue directamente por un ancla. */
export function initPipeline() {
  const root = $('#pipeline');
  if (!root) return;
  const stages = $$('.stage', root);
  const status = $('#pipeStatus', root);
  const head = $('.pipe-head', root);
  if (!stages.length || !status) return;

  const finish = () => {
    head.classList.add('is-done');
    status.textContent = 'passed · 2m 46s';
  };

  const start = () => {
    if (reduced) {
      stages.forEach((s) => s.classList.add('is-passed'));
      finish();
      return;
    }
    let i = 0;
    const next = () => {
      if (i > 0) stages[i - 1].classList.replace('is-running', 'is-passed');
      if (i >= stages.length) { finish(); return; }
      stages[i].classList.add('is-running');
      status.textContent = `running: ${stages[i].querySelector('.stage-name').textContent.trim()}…`;
      i += 1;
      setTimeout(next, 850);
    };
    setTimeout(next, 450);
  };

  observeOnce([root], start, { threshold: 0.25 });
}

export function initMotion() {
  initReveal();
  initParallax();
  initPipeline();
}
