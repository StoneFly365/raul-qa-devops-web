import {
  techStackHero, sectors, problems, services, caseStudies,
  aiCapabilities, aiTools, technologies, timeline, blogPosts, faqs,
} from './data.js';
import { renderCards, renderMarquee, renderChips, icon } from './render.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Render: contenido dinámico desde data.js ---------- */

renderMarquee('#heroStackTrack', techStackHero, (t) => `
  <div class="tech-card">
    <div class="tc-icon">${t.icon}</div>
    <div class="tc-name">${t.name}</div>
    <div class="tc-cat">${t.cat}</div>
  </div>`);

renderMarquee('#sectorsTrack', sectors, (s) => `
  <div class="sector">
    <div class="sector-icon">${icon(s.icon)}</div>
    <h3>${s.name}</h3>
    <span class="sector-logo-slot">logo próximamente</span>
  </div>`);

renderCards('#problemsGrid', problems, (p) => `
  <div class="problem">
    <div class="problem-icon">${icon(p.icon)}</div>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
  </div>`);

renderCards('#servicesGrid', services, (s) => `
  <article class="svc">
    <span class="svc-tag">${s.tag}</span>
    <div class="svc-icon">${icon(s.icon)}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <p class="svc-benefit">${s.benefit}</p>
  </article>`);

renderCards('#casesGrid', caseStudies, (c) => `
  <article class="case-card">
    <span class="case-tag">${c.tag}</span>
    <h3>${c.title}</h3>
    <div class="case-row"><span class="case-label">Problema</span><p>${c.problem}</p></div>
    <div class="case-row"><span class="case-label">Solución</span><p>${c.solution}</p></div>
    <div class="case-row"><span class="case-label">Resultado</span><p>${c.result}</p></div>
    <div class="case-kpis">${c.kpis.map((k) => `<span class="case-kpi">${k}</span>`).join('')}</div>
  </article>`);

renderCards('#aiGrid', aiCapabilities, (a) => `
  <div class="ai-card">
    <div class="ai-icon">${icon(a.icon)}</div>
    <h3>${a.title}</h3>
    <p>${a.desc}</p>
  </div>`);

renderChips('#aiToolsChips', aiTools);

renderCards('#techGrid', technologies, (t) => `
  <div class="tech-card">
    <div class="tc-icon">${t.abbr}</div>
    <div class="tc-name">${t.name}</div>
  </div>`);

renderCards('#timelineList', timeline, (t) => `
  <li class="tl-item">
    <div class="tl-role">${t.role}</div>
    <div class="tl-meta">${t.period}</div>
    <p>${t.desc}</p>
  </li>`);

renderCards('#blogGrid', blogPosts, (b) => `
  <article class="blog-card">
    <span class="blog-soon">Próximamente</span>
    <h3>${b.title}</h3>
    <span class="blog-cat">${b.tag}</span>
  </article>`);

renderCards('#faqList', faqs, (f) => `
  <details class="faq-item">
    <summary>${f.q}</summary>
    <p>${f.a}</p>
  </details>`);

/* ---------- Pipeline animation (elemento de firma) ---------- */
(function pipeline() {
  const stages = Array.prototype.slice.call(document.querySelectorAll('#pipeline .stg'));
  const head = document.getElementById('pipeHead');
  const statusEl = document.getElementById('pipeStatus');
  if (!stages.length) return;
  function finish() {
    stages.forEach((s) => { s.classList.remove('running'); s.classList.add('passed'); });
    head.classList.add('done');
    statusEl.textContent = 'passed · 3m 33s';
  }
  if (reduced) { finish(); return; }
  let i = 0;
  function runNext() {
    if (i > 0) { stages[i - 1].classList.remove('running'); stages[i - 1].classList.add('passed'); }
    if (i >= stages.length) { head.classList.add('done'); statusEl.textContent = 'passed · 3m 33s'; return; }
    stages[i].classList.add('running');
    statusEl.textContent = 'running: ' + stages[i].querySelector('.stg-name').textContent.trim() + '…';
    i++;
    setTimeout(runNext, 950);
  }
  setTimeout(runNext, 700);
})();

/* ---------- Reveal on scroll ---------- */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .1 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- Contadores animados en las stats del hero ---------- */
(function counters() {
  const stats = document.querySelectorAll('.stat-n[data-count]');
  if (!stats.length) return;
  function animate(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const duration = 1100;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: .4 });
    stats.forEach((el) => io.observe(el));
  } else {
    stats.forEach(animate);
  }
})();

/* ---------- Menú móvil ---------- */
(function mobileNav() {
  const btn = document.querySelector('.hamburger');
  const links = document.querySelector('nav.links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
})();

/* ---------- Indicador de sección activa en la navbar ---------- */
(function scrollSpy() {
  const links = Array.from(document.querySelectorAll('nav.links a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = '#' + e.target.id;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  sections.forEach((s) => io.observe(s));
})();

/* ---------- Botón volver arriba ---------- */
(function backToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
})();
