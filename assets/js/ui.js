/* =============================================================
   UI — interacción: navegación, scroll spy, filtros y formulario.
   ============================================================= */
import { $, $$, prefersReducedMotion } from './dom.js';
import { site } from './data.js';

const reduced = prefersReducedMotion();

/* ---- Navbar: transparente arriba, cristal al hacer scroll -- */
export function initNavbar() {
  const nav = $('.nav');
  if (!nav) return;
  const sentinel = $('#nav-sentinel');
  if (!sentinel || !('IntersectionObserver' in window)) {
    // Alternativa sin IO: un único listener pasivo.
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return;
  }
  // El centinela evita escuchar scroll: el navegador avisa al cruzarlo.
  new IntersectionObserver(
    ([e]) => nav.classList.toggle('is-stuck', !e.isIntersecting),
    { threshold: 0 },
  ).observe(sentinel);
}

/* ---- Menú móvil ----------------------------------------- */
export function initMobileNav() {
  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (!e.target.closest('.nav-inner')) setOpen(false);
  });
  // Al pasar a escritorio el menú vuelve a su estado natural.
  window.matchMedia('(min-width:901px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* ---- Scroll spy ------------------------------------------ */
/* Marca el enlace de la sección visible más alta. Usa un único IO
   con una banda de disparo bajo la navbar. */
export function initScrollSpy() {
  // El CTA queda fuera: apunta a #contacto y, al llegar ahí, recibía
  // aria-current y se pintaba en verde sobre verde — invisible justo
  // en el punto de conversión.
  const links = $$('.nav-links a[href^="#"]:not(.nav-cta)');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const targets = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const visible = new Set();

  const paint = () => {
    // Primera sección visible en orden de documento: evita parpadeos
    // cuando dos secciones cortas comparten la banda de disparo.
    const active = targets.find((t) => visible.has(t.id))?.id;
    // Entre secciones sin entrada en el menú (cita, sobre mí, FAQ…) no hay
    // candidata: se conserva la última en vez de apagar el indicador.
    if (!active) return;
    links.forEach((a) => {
      const on = a.getAttribute('href') === `#${active}`;
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
    paint();
  }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

  targets.forEach((t) => io.observe(t));
}

/* ---- Botón volver arriba -------------------------------- */
export function initBackToTop() {
  const btn = $('.to-top');
  if (!btn) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
      ticking = false;
    });
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    $('.brand')?.focus();
  });
}

/* ---- Formulario de contacto ------------------------------ */
/* Sin backend: compone un mailto con los datos ya validados.
   Cambiar `action`/`method` en el HTML si algún día hay endpoint. */
const MAILTO_MAX = 1800;   // límite práctico de longitud de URL en clientes de correo

export function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  const status = $('#formStatus', form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const get = (k) => String(data.get(k) || '').trim();

    const body = [
      `Nombre: ${get('name')}`,
      `Empresa: ${get('company') || '—'}`,
      `Email: ${get('email')}`,
      `Servicio de interés: ${get('service')}`,
      '',
      get('message'),
    ].join('\n');

    const href = `mailto:${site.email}`
      + `?subject=${encodeURIComponent(`[Web] ${get('service')} · ${get('name')}`)}`
      + `&body=${encodeURIComponent(body)}`;

    if (href.length > MAILTO_MAX) {
      status.textContent = 'El mensaje es demasiado largo para abrirse en tu gestor de correo. '
        + `Escríbeme directamente a ${site.email}.`;
      return;
    }

    window.location.href = href;
    status.textContent = 'Abriendo tu gestor de correo con el mensaje preparado…';
  });
}

export function initUI() {
  initNavbar();
  initMobileNav();
  initScrollSpy();
  initBackToTop();
  initContactForm();
}
