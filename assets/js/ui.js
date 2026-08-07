/* =============================================================
   UI — interacción: navegación, scroll spy, volver arriba y
   formulario de contacto. Nada de renderizado aquí.
   ============================================================= */
import { $, $$, prefersReducedMotion } from './dom.js';
import { site } from './data.js';

const reduced = prefersReducedMotion();

/* ---- Navbar: transparente arriba, cristal al bajar -------- */
export function initNavbar() {
  const nav = $('.nav');
  if (!nav) return;
  const sentinel = $('#nav-sentinel');

  if (!sentinel || !('IntersectionObserver' in window)) {
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

/* ---- Menú móvil ------------------------------------------ */
export function initMobileNav() {
  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !e.target.closest('.nav-inner')) setOpen(false);
  });
  // Al pasar a escritorio el panel vuelve a su estado natural.
  window.matchMedia('(min-width:901px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* ---- Scroll spy ------------------------------------------ */
/* Marca el enlace de la sección visible más alta. Un único observador
   con una banda de disparo bajo la navbar; sin listener de scroll. */
export function initScrollSpy() {
  // El CTA queda fuera a propósito: apunta a #contacto y, al llegar,
  // recibía aria-current y se pintaba acento sobre acento — ilegible
  // justo en el punto de conversión.
  const links = $$('.nav-links a[href^="#"]:not(.nav-cta)');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const ids = links.map((a) => a.getAttribute('href').slice(1));
  const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const visible = new Set();

  const paint = () => {
    // Primera sección visible en orden de documento: evita parpadeos
    // cuando dos secciones cortas comparten la banda de disparo.
    const active = targets.find((t) => visible.has(t.id))?.id;
    // Entre secciones sin entrada en el menú no hay candidata: se
    // conserva la última en lugar de apagar el indicador.
    if (!active) return;
    links.forEach((a) => {
      if (a.getAttribute('href') === `#${active}`) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
    paint();
  }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

  targets.forEach((t) => io.observe(t));
}

/* ---- Volver arriba --------------------------------------- */
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
    // Devolver el foco al principio del documento: sin esto, el
    // teclado seguiría donde estaba y el salto sería sólo visual.
    $('.brand')?.focus();
  });
}

/* ---- Formulario de contacto ------------------------------ */
/* Dos caminos según haya endpoint en data.js:
   · site.formEndpoint vacío → compone un mailto (el de siempre).
   · site.formEndpoint con URL → POST por fetch al servicio (Formspree,
     Basin…): el lead se captura y el visitante no sale de la página. */
const MAILTO_MAX = 1800;   // longitud práctica de URL en clientes de correo

function submitViaMailto(get, status) {
  const body = [
    `Nombre: ${get('name')}`,
    `Empresa: ${get('company') || '—'}`,
    `Email: ${get('email')}`,
    `Interés: ${get('service')}`,
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
  status.textContent = 'Abriendo tu gestor de correo con el mensaje ya preparado…';
}

async function submitViaEndpoint(form, data, status, submitBtn) {
  submitBtn.disabled = true;
  status.textContent = 'Enviando…';
  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    form.reset();
    status.textContent = 'Mensaje enviado. Te respondo en menos de 24 horas.';
  } catch {
    status.textContent = 'No se ha podido enviar. Escríbeme directamente a '
      + `${site.email}.`;
  } finally {
    submitBtn.disabled = false;
  }
}

export function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  const status = $('#formStatus', form);
  const submitBtn = $('button[type="submit"]', form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const get = (k) => String(data.get(k) || '').trim();

    if (site.formEndpoint) submitViaEndpoint(form, data, status, submitBtn);
    else submitViaMailto(get, status);
  });
}

export function initUI() {
  initNavbar();
  initMobileNav();
  initScrollSpy();
  initBackToTop();
  initContactForm();
}
