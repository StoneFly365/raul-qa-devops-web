/* =============================================================
   SECTIONS — plantillas de cada bloque de contenido.
   Data (data.js) → HTML. Cero lógica de interacción aquí.
   ============================================================= */
import {
  sectors, problems, services, metrics, techGroups, heroStack,
  methodology, caseStudies, aiCapabilities, resources,
  faqs, pipelineStages, facts, mailto, bookingHref,
} from './data.js';
import { render, renderMarquee, icon, techLogo, esc } from './dom.js';

const arrow = '<svg class="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* Herramienta: una única plantilla para el marquee del hero y para la
   rejilla de tecnologías. Si cambia aquí, cambia en los dos sitios. */
const techItem = (t) => `<div class="tech">${techLogo(t)}<span class="tech-name">${esc(t.name)}</span></div>`;

export function renderAll() {
  /* ---- Hero: marquee de stack ---------------------------- */
  renderMarquee('#heroStack', heroStack, techItem);

  /* ---- Pipeline ------------------------------------------ */
  render('#pipeStages', pipelineStages, (s) => `
    <div class="stage" role="listitem">
      <div class="stage-name"><span class="stage-badge" aria-hidden="true"></span>${esc(s.name)}</div>
      <p>${esc(s.desc)}</p>
      <span class="stage-time">✓ ${esc(s.time)}</span>
    </div>`);

  /* ---- Trayectoria: KPIs + sectores ---------------------- */
  render('#metricsGrid', metrics, (m) => `
    <article class="card metric" data-reveal="scale">
      <div class="metric-value" data-count="${m.value}" data-suffix="${esc(m.suffix || '')}">0${esc(m.suffix || '')}</div>
      <div class="metric-label">${esc(m.label)}</div>
      <div class="metric-note">${esc(m.note)}</div>
    </article>`, { stagger: true });

  render('#sectorsGrid', sectors, (s) => `
    <div class="sector">${icon(s.icon, 18)}${esc(s.name)}</div>`);

  /* ---- Problemas → soluciones ---------------------------- */
  render('#problemsGrid', problems, (p) => `
    <article class="card card--hover problem" data-reveal>
      <span class="icon-box icon-box--muted" aria-hidden="true">${icon(p.icon)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="problem-solution">
        ${icon('d="M4.5 12.75l6 6 9-13.5"', 16)}
        <p><b>Solución:</b> ${esc(p.solution)}</p>
      </div>
    </article>`, { stagger: true });

  /* ---- Servicios ----------------------------------------- */
  render('#servicesGrid', services, (s) => {
    const href = s.href || mailto(s.subject);
    const ext = s.href && s.href.startsWith('http');
    return `
    <article class="card card--hover card--edge service" data-reveal>
      <span class="tag">${esc(s.tag)}</span>
      <span class="icon-box" aria-hidden="true">${icon(s.icon, 22)}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.desc)}</p>
      <ul class="service-benefits">
        ${s.benefits.map((b) => `<li>${esc(b)}</li>`).join('')}
      </ul>
      <div class="card-foot">
        <a class="btn btn--quiet" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>
          ${esc(s.cta)} ${arrow}
          <span class="visually-hidden">— servicio ${esc(s.title)}</span>
        </a>
      </div>
    </article>`;
  }, { stagger: true });

  /* ---- Tecnologías --------------------------------------- */
  render('#techGroups', techGroups, (g) => `
    <div class="tech-group" data-reveal>
      <h3>${esc(g.name)}</h3>
      <div class="tech-grid">${g.items.map(techItem).join('')}</div>
    </div>`, { stagger: true });

  /* ---- Metodología --------------------------------------- */
  render('#timeline', methodology, (m) => `
    <li class="tl-step" data-reveal>
      <span class="tl-node" aria-hidden="true">${esc(m.step)}</span>
      <div class="tl-body">
        <h3>${esc(m.name)}</h3>
        <p>${esc(m.desc)}</p>
        <span class="tl-out">entregable: <b>${esc(m.output)}</b></span>
      </div>
    </li>`, { stagger: true });

  /* ---- Casos de éxito ------------------------------------ */
  render('#casesGrid', caseStudies, (c) => `
    <article class="card card--hover case" data-reveal>
      <span class="tag">${esc(c.tag)}</span>
      <h3>${esc(c.title)}</h3>
      <dl>
        <div class="case-row"><dt>Problema</dt><dd>${esc(c.problem)}</dd></div>
        <div class="case-row"><dt>Solución</dt><dd>${esc(c.solution)}</dd></div>
        <div class="case-row case-row--result"><dt>Resultado</dt><dd>${esc(c.result)}</dd></div>
      </dl>
      <div class="case-kpis">${c.kpis.map((k) => `<span class="case-kpi">${esc(k)}</span>`).join('')}</div>
    </article>`, { stagger: true });

  /* ---- IA para QA ---------------------------------------- */
  render('#aiGrid', aiCapabilities, (a) => `
    <article class="card card--glass card--hover ai-card" data-reveal>
      <span class="icon-box" aria-hidden="true">${icon(a.icon)}</span>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.desc)}</p>
    </article>`, { stagger: true });

  /* ---- Recursos ------------------------------------------ */
  render('#resourcesGrid', resources, (r) => `
    <article class="card card--hover card--edge resource" data-reveal>
      <span class="icon-box" aria-hidden="true">${icon(r.icon)}</span>
      <span class="resource-type">${esc(r.type)}</span>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.desc)}</p>
      <div class="card-foot">
        <a class="btn btn--quiet stretch" href="${esc(r.href)}"${
          r.external ? ' target="_blank" rel="noopener"' : ''}${
          r.type === 'PDF' ? ' download' : ''}>${esc(r.cta)} ${arrow}</a>
      </div>
    </article>`, { stagger: true });

  /* ---- FAQ ----------------------------------------------- */
  render('#faqList', faqs, (f) => `
    <details class="faq-item" name="faq">
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>`);

  /* ---- Sobre mí ------------------------------------------ */
  /* <div> dentro de <dl> es el único envoltorio válido para agrupar dt/dd */
  render('#facts', facts, ([k, v]) => `
    <div class="fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`);

  /* ---- CTAs de reserva ----------------------------------- */
  /* Sin URL de calendario, el CTA se queda apuntando al formulario:
     mejor que abrir un cliente de correo a ciegas. */
  if (bookingHref.startsWith('http')) {
    document.querySelectorAll('[data-booking]').forEach((el) => { el.href = bookingHref; });
  }
}
