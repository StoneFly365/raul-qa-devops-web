/* =============================================================
   MOTION — animaciones. Todas se degradan a "estado final visible"
   si el usuario pide movimiento reducido o falta IntersectionObserver.
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

/* ---- Reveal on scroll ---------------------------------- */
export function initReveal() {
  observeOnce($$('[data-reveal]'), (el) => el.classList.add('is-in'), {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.06,
  });
}

/* ---- Contadores animados -------------------------------- */
export function initCounters() {
  const els = $$('[data-count]');
  if (!els.length) return;

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduced || !Number.isFinite(target)) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1200;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) ** 3;           // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  observeOnce(els, run, { threshold: 0.4 });
}

/* ---- Parallax ligero ------------------------------------ */
/* Un único listener de scroll para toda la página, coalescido con rAF.
   data-parallax="0.08" = 8% de la distancia recorrida. */
export function initParallax() {
  const els = $$('[data-parallax]');
  if (reduced || !els.length) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;   // fuera de pantalla: no calcular
      const factor = Number(el.dataset.parallax) || 0.08;
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

/* ---- Pipeline (elemento de firma) ----------------------- */
/* Arranca cuando entra en viewport, no al cargar: así la animación
   se ve aunque el usuario llegue por un ancla. */
export function initPipeline() {
  const root = $('#pipeline');
  if (!root) return;
  const stages = $$('.stage', root);
  const head = $('.pipe-head', root);
  const status = $('#pipeStatus', root);
  if (!stages.length) return;

  const finish = () => {
    head.classList.add('is-done');
    status.textContent = 'passed · 3m 33s';
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
      setTimeout(next, 900);
    };
    setTimeout(next, 500);
  };

  observeOnce([root], start, { threshold: 0.25 });
}

export function initMotion() {
  initReveal();
  initCounters();
  initParallax();
  initPipeline();
}
