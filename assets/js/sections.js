/* =============================================================
   SECTIONS — plantillas de cada bloque de contenido.
   Data (data.js) → HTML. Cero lógica de interacción aquí.

   Cada render() es un no-op si su contenedor no existe, así que
   este mismo módulo sirve al home, al blog y a las landings sin
   una sola comprobación de "¿en qué página estoy?".
   ============================================================= */
import {
  heroStats, sectors, problems, services, approaches, projects,
  career, aiCapabilities, aiStack, methodology, techGroups, resources,
  faqs, pipelineStages, facts, posts, bookingHref,
} from './data.js';
import { render, icon, techLogo, esc, ext, fmtDate } from './dom.js';

const arrow = '<svg class="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const techPill = (t) => `<div class="tech">${techLogo(t)}<span>${esc(t.name)}</span></div>`;

const postByDate = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
const postCard = (p, base = '') => `
    <article class="card card--hover" data-reveal>
      <div class="post-meta">
        <time datetime="${esc(p.date)}">${esc(fmtDate(p.date))}</time>
        ${p.readingTime ? `<span class="dim">· ${esc(p.readingTime)} de lectura</span>` : ''}
      </div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.excerpt)}</p>
      <div class="tag-row">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="card-foot">
        <a class="btn btn--quiet stretch" href="${base}${esc(p.slug)}.html">Leer artículo ${arrow}</a>
      </div>
    </article>`;

/* =============================================================
   BLOQUES DEL HOME — un único origen para el navegador y el prerender.
   Cada bloque: { sel, items, template, opts }. renderAll() los escribe
   en el DOM; scripts/prerender.mjs escribe el mismo HTML en el estático
   para que crawlers y visitantes sin JS vean el contenido igual.
   ============================================================= */
export function homeBlocks() {
  const blocks = [
    /* ---- Hero: cifras de confianza ------------------------ */
    { sel: '#heroStats', items: heroStats, template: (s) => `
    <div class="hstat">
      <span class="hstat-value">${esc(s.value)}</span>
      <span class="hstat-label">${esc(s.label)}</span>
    </div>` },

    /* ---- Pipeline (elemento de firma) --------------------- */
    { sel: '#pipeStages', items: pipelineStages, template: (s) => `
    <div class="stage" role="listitem">
      <div class="stage-name"><span class="stage-dot" aria-hidden="true"></span>${esc(s.name)}</div>
      <p>${esc(s.desc)}</p>
      <span class="stage-time">${esc(s.time)}</span>
    </div>` },

    /* ---- Sectores ----------------------------------------- */
    { sel: '#sectorsGrid', items: sectors, template: (s) => `
    <div class="sector">${icon(s.icon, 17)}<span>${esc(s.name)}</span></div>` },

    /* ---- Problemas → soluciones --------------------------- */
    { sel: '#problemsGrid', items: problems, template: (p) => `
    <article class="card card--hover" data-reveal>
      <span class="icon-box icon-box--muted icon-box--sm" aria-hidden="true">${icon(p.icon, 18)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <p class="problem-fix"><b>Lo que hago:</b> ${esc(p.solution)}</p>
    </article>`, opts: { stagger: true } },

    /* ---- How I Help --------------------------------------- */
    { sel: '#servicesGrid', items: services, template: (s) => `
    <article class="card card--hover service" id="svc-${esc(s.id)}" data-reveal>
      <div class="service-top">
        <span class="icon-box" aria-hidden="true">${icon(s.icon, 21)}</span>
        <span class="tag">${esc(s.tag)}</span>
      </div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.desc)}</p>
      <ul class="checks">${s.benefits.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      <div class="card-foot">
        <a class="btn btn--quiet stretch" href="${esc(s.page)}">
          Cómo trabajo en ${esc(s.title)} ${arrow}
        </a>
      </div>
    </article>`, opts: { stagger: true } },

    /* ---- Cómo trabajo ------------------------------------- */
    { sel: '#casesGrid', items: approaches, template: (c) => `
    <article class="card card--hover" data-reveal>
      <div class="tag-row"><span class="tag">${esc(c.tag)}</span></div>
      <h3>${esc(c.title)}</h3>
      <dl class="case-body">
        <div><dt>Situación</dt><dd>${esc(c.problem)}</dd></div>
        <div><dt>Enfoque</dt><dd>${esc(c.solution)}</dd></div>
        <div class="is-result"><dt>A qué se llega</dt><dd>${esc(c.result)}</dd></div>
      </dl>
      <div class="tag-row card-foot">
        ${c.kpis.map((k) => `<span class="tag tag--pass">${esc(k)}</span>`).join('')}
      </div>
    </article>`, opts: { stagger: true } },

    /* ---- Proyectos ---------------------------------------- */
    /* La portada es CSS, no una imagen: cero bytes que descargar, cero
       peticiones y ninguna miniatura que se quede obsoleta. */
    { sel: '#projectsGrid', items: projects, template: (p) => `
    <article class="card card--hover project${p.featured ? ' project--featured' : ''}" data-reveal>
      <div class="project-cover" style="--hue:${Number(p.cover.hue) || 0}deg" aria-hidden="true">
        <span class="project-glyph">${esc(p.cover.glyph)}</span>
        <span class="project-repo">${esc(p.repo)}</span>
      </div>
      <div class="tag-row">${p.tags.map((t) => `<span class="tag tag--accent">${esc(t)}</span>`).join('')}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="project-tech">${p.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="card-foot project-links">
        <a class="btn btn--quiet stretch" href="${esc(p.github)}"${ext(true)}>
          Ver código ${arrow}<span class="visually-hidden">de ${esc(p.title)} en GitHub</span>
        </a>
        ${p.demo ? `<a class="btn btn--quiet" href="${esc(p.demo)}"${ext(true)}>Demo en vivo</a>` : ''}
      </div>
    </article>`, opts: { stagger: true } },

    /* ---- Trayectoria profesional -------------------------- */
    { sel: '#careerList', items: career, template: (c) => `
    <li class="career-item${c.now ? ' is-now' : ''}" data-reveal="left">
      <span class="career-node" aria-hidden="true"></span>
      <span class="career-period">${esc(c.period)}</span>
      <div class="career-body">
        <h3>${esc(c.role)}${c.now ? ' <span class="tag tag--accent">actual</span>' : ''}</h3>
        <p class="career-org">${esc(c.org)}</p>
      </div>
    </li>`, opts: { stagger: true } },

    /* ---- AI Engineering ----------------------------------- */
    { sel: '#aiGrid', items: aiCapabilities, template: (a) => `
    <article class="card card--glass card--hover" data-reveal>
      <span class="icon-box icon-box--sm" aria-hidden="true">${icon(a.icon, 18)}</span>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.desc)}</p>
    </article>`, opts: { stagger: true } },

    { sel: '#aiStack', items: aiStack, template: (t) => `
    <div class="ai-tool">
      ${techLogo(t)}
      <span class="ai-tool-name">${esc(t.name)}</span>
      <span class="ai-tool-note">${esc(t.note)}</span>
    </div>`, opts: { stagger: true } },

    /* ---- Metodología -------------------------------------- */
    { sel: '#methodList', items: methodology, template: (m) => `
    <li class="method-step" data-reveal>
      <span class="method-num" aria-hidden="true">${esc(m.step)}</span>
      <div>
        <h3>${esc(m.name)}</h3>
        <p>${esc(m.desc)}</p>
        <span class="method-out">entregable: <b>${esc(m.output)}</b></span>
      </div>
    </li>`, opts: { stagger: true } },

    /* ---- Stack -------------------------------------------- */
    { sel: '#techGroups', items: techGroups, template: (g) => `
    <div class="tech-group" data-reveal>
      <h3>${esc(g.name)}</h3>
      <div class="tech-grid">${g.items.map(techPill).join('')}</div>
    </div>`, opts: { stagger: true } },

    /* ---- Recursos ----------------------------------------- */
    { sel: '#resourcesGrid', items: resources, template: (r) => `
    <article class="card card--hover" data-reveal>
      <span class="icon-box icon-box--muted icon-box--sm" aria-hidden="true">${icon(r.icon, 18)}</span>
      <span class="resource-type">${esc(r.type)}</span>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.desc)}</p>
      <div class="card-foot">
        <a class="btn btn--quiet stretch" href="${esc(r.href)}"${ext(r.external)}${r.download ? ' download' : ''}>
          ${esc(r.cta)} ${arrow}
        </a>
      </div>
    </article>`, opts: { stagger: true } },

    /* ---- FAQ ---------------------------------------------- */
    /* `name="faq"` hace que el navegador cierre el resto al abrir uno:
       acordeón exclusivo sin una línea de JavaScript. */
    { sel: '#faqList', items: faqs, template: (f) => `
    <details class="faq-item" name="faq">
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>` },

    /* ---- Sobre mí ----------------------------------------- */
    /* <div> es el único envoltorio válido para agrupar dt/dd en un <dl>. */
    { sel: '#facts', items: facts, template: ([k, v]) => `
    <div class="fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>` },
  ];

  /* Teaser del blog: sólo si hay artículos. Sin ellos, la sección se
     retira en el navegador (renderPosts) y no se prerenderiza nada. */
  if (posts.length) {
    blocks.push({
      sel: '#postsTeaser',
      items: postByDate().slice(0, 3),
      template: (p) => postCard(p, 'blog/'),
      opts: { stagger: true },
    });
  }
  return blocks;
}

export function renderAll() {
  for (const { sel, items, template, opts } of homeBlocks()) render(sel, items, template, opts);
  renderPosts();
  wireBookingCtas();
}

/* =============================================================
   BLOG — mismo renderizador para el teaser del home y para /blog/
   ============================================================= */
export function renderPosts() {
  /* Sin artículos, la sección del home entera se retira del DOM en
     lugar de enseñar una rejilla vacía. */
  if (!posts.length) {
    document.querySelector('[data-hide-if-empty="posts"]')?.remove();
    return;
  }

  const byDate = postByDate();
  render('#postsTeaser', byDate.slice(0, 3), (p) => postCard(p, 'blog/'), { stagger: true });
  render('#postList',    byDate,             (p) => postCard(p, ''),      { stagger: true });
  document.querySelector('[data-hide-if-posts]')?.remove();
}

/* =============================================================
   CTA de reserva — un único punto de verdad para el destino
   ============================================================= */
/* Sin URL de calendario en data.js, los CTA se quedan apuntando al
   formulario (#contacto), que es lo que ya trae el HTML. En cuanto
   `site.bookingUrl` tenga valor, se reescriben todos de una vez. */
export function wireBookingCtas() {
  if (!bookingHref.startsWith('http')) return;
  document.querySelectorAll('[data-booking]').forEach((el) => {
    el.href = bookingHref;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}
