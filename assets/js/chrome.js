/* =============================================================
   CHROME — cabecera y pie compartidos por las subpáginas.

   Existe para que blog y landings no dupliquen ochenta líneas de
   marcado cada una. La ruta raíz se deriva de import.meta.url, así
   que funciona igual a cualquier profundidad de carpetas.

   Nota SEO: los enlaces de navegación se inyectan con JS. Los enlaces
   que de verdad importan para el rastreo (breadcrumb, CTA y bloque
   "sigue leyendo") van en HTML estático dentro de cada subpágina.
   ============================================================= */
import { site } from './data.js';

const ROOT = new URL('../../', import.meta.url).href;
const url = (p = '') => ROOT + p;

const NAV = [
  ['servicios', 'Servicios'],
  ['casos',     'Casos'],
  ['proyectos', 'Proyectos'],
  ['ia',        'IA'],
  ['blog/',     'Blog'],
];

const header = () => `
<header class="nav is-stuck">
  <div class="nav-inner">
    <a class="brand" href="${url()}">
      <span class="brand-mark" aria-hidden="true">RM</span>
      <span>raul<span class="dim">@</span>qa-devops</span>
      <span class="visually-hidden">— ir al inicio</span>
    </a>
    <nav class="nav-links" id="nav-menu" aria-label="Secciones del sitio">
      ${NAV.map(([h, t]) => `<a href="${url(h.endsWith('/') ? h : `#${h}`)}">${t}</a>`).join('')}
      <a class="btn btn--primary btn--sm nav-cta" href="${url('#contacto')}" data-booking>Reservar una reunión</a>
    </nav>
    <button class="nav-toggle" type="button" aria-label="Abrir menú de navegación"
            aria-expanded="false" aria-controls="nav-menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
</header>`;

const footer = () => `
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${url()}">
          <span class="brand-mark" aria-hidden="true">RM</span>
          <span>raul<span class="dim">@</span>qa-devops</span>
        </a>
        <p>Ayudo a equipos de producto a entregar mejor software con QA, DevOps e ingeniería de IA.</p>
      </div>
      <nav class="footer-col" aria-labelledby="f-serv">
        <p class="footer-col-title" id="f-serv">Servicios</p>
        <ul>
          <li><a href="${url('qa/')}">QA Engineering</a></li>
          <li><a href="${url('test-automation/')}">Test Automation</a></li>
          <li><a href="${url('devops/')}">DevOps</a></li>
          <li><a href="${url('github-actions/')}">CI/CD</a></li>
          <li><a href="${url('solution-consulting/')}">Solution Consulting</a></li>
          <li><a href="${url('ai-engineering/')}">AI Engineering</a></li>
        </ul>
      </nav>
      <nav class="footer-col" aria-labelledby="f-site">
        <p class="footer-col-title" id="f-site">Sitio</p>
        <ul>
          <li><a href="${url('#casos')}">Cómo trabajo</a></li>
          <li><a href="${url('#proyectos')}">Proyectos</a></li>
          <li><a href="${url('#sobre-mi')}">Sobre mí</a></li>
          <li><a href="${url('blog/')}">Blog</a></li>
          <li><a href="${url('mentoringB2C/')}">Mentoría 1:1</a></li>
          <li><a href="${url('radiografia-qa/')}">Radiografía de nivel QA</a></li>
        </ul>
      </nav>
      <nav class="footer-col" aria-labelledby="f-cont">
        <p class="footer-col-title" id="f-cont">Contacto</p>
        <ul>
          <li><a href="mailto:${site.email}">Email</a></li>
          <li><a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="${site.github}" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </nav>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${site.name}</span>
      <span><a href="${url('privacidad/')}">Política de privacidad</a></span>
      <span>${site.location} · remoto-friendly</span>
    </div>
  </div>
</footer>`;

export function initChrome() {
  document.querySelector('[data-chrome="header"]')?.replaceWith(
    document.createRange().createContextualFragment(header()),
  );
  document.querySelector('[data-chrome="footer"]')?.replaceWith(
    document.createRange().createContextualFragment(footer()),
  );
}
