/* =============================================================
   RADAR UI — punto de entrada de /radiografia-qa/.

   Hace lo mismo que page.js (cabecera, pie, movimiento) y además
   conduce el cuestionario. Toda la aritmética vive en radar.js y
   todo el marcado en radar.view.js: aquí sólo queda mover el foco,
   enseñar y esconder pasos, y hablar con Formspree.
   ============================================================= */
import { initChrome } from './chrome.js';
import { initMotion } from './motion.js';
import { initUI } from './ui.js';
import { wireBookingCtas } from './sections.js';
import { $, $$, prefersReducedMotion } from './dom.js';
import { site } from './data.js';
import { report } from './radar.js';
import { resultHtml } from './radar.view.js';
import { axes, items, roles } from './radar.data.js';

initChrome();
wireBookingCtas();
initMotion();
initUI();

/* Quien pide menos movimiento no recibe scroll animado: los saltos
   entre pasos son largos y son justo los que marean. */
const scrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

/* Versión en la clave: si algún día cambian los ítems, un progreso
   guardado con las preguntas viejas dejaría de significar nada. */
const STORE = 'radiografia-qa.v1';

const form = $('#radarForm');
if (form) wireQuiz();

function wireQuiz() {
  const steps = $$('.radar-step', form);
  const nav = $('[data-nav]');
  const progress = $('[data-progress]');
  const error = $('[data-error]');
  const result = $('#radarResult');
  const after = $('[data-after]');

  /* La navegación y la barra viven ocultas en el HTML: sin JavaScript
     los siete pasos se leen seguidos, que es la degradación correcta. */
  for (const el of [nav, progress]) el.hidden = false;
  $('[data-step-total]').textContent = steps.length;

  let current = 0;

  restore();
  /* En la primera pintada no se mueve ni el foco ni el scroll: el
     visitante acaba de llegar y aún no ha leído el encabezado. */
  show(0, { move: false });

  form.addEventListener('change', save);
  $('[data-next]').addEventListener('click', () => go(+1));
  $('[data-prev]').addEventListener('click', () => go(-1));
  form.addEventListener('submit', finish);
  $('[data-restart]').addEventListener('click', restart);
  $('[data-print]').addEventListener('click', () => window.print());
  wireLead();

  /* ---- Pasos --------------------------------------------- */

  function show(n, { move = true } = {}) {
    current = n;
    steps.forEach((s, i) => { s.hidden = i !== n; });
    error.hidden = true;

    const last = n === steps.length - 1;
    $('[data-next]').hidden = last;
    $('[data-finish]').hidden = !last;
    $('[data-prev]').disabled = n === 0;

    $('[data-step-now]').textContent = n + 1;
    $('[data-progress-fill]').style.setProperty('--p', `${(n / (steps.length - 1)) * 100}%`);

    if (!move) return;

    /* El foco al título del paso, no al primer radio: quien navega con
       lector de pantalla necesita oír dónde ha llegado antes de que le
       lean la primera opción. */
    const title = $('h2', steps[n]);
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
    steps[n].scrollIntoView({ block: 'start', behavior: scrollBehavior });
  }

  function go(delta) {
    if (delta > 0 && !validate(steps[current])) return;
    show(Math.min(Math.max(current + delta, 0), steps.length - 1));
  }

  /* Un paso está completo cuando cada grupo de radios tiene uno
     marcado. Se valida a mano porque el navegador no sabe que los
     pasos ocultos no cuentan todavía. */
  function validate(step) {
    const groups = new Set($$('input[type="radio"]', step).map((i) => i.name));
    const missing = [...groups].filter((name) => !$(`input[name="${name}"]:checked`, step));
    if (!missing.length) return true;

    error.textContent = missing.length === 1
      ? 'Falta una respuesta en este paso.'
      : `Faltan ${missing.length} respuestas en este paso.`;
    error.hidden = false;
    $(`input[name="${missing[0]}"]`, step).focus();
    return false;
  }

  /* ---- Estado -------------------------------------------- */

  const answers = () => Object.fromEntries(
    $$('input[type="radio"]:checked', form).map((i) => [i.name, i.value]),
  );

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify(answers()));
    } catch {
      /* Modo privado o almacenamiento lleno: perder el progreso al
         recargar es peor que nada, pero no es motivo para romper el
         cuestionario a quien lo está rellenando. */
    }
  }

  function restore() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    } catch {
      return;
    }
    for (const [name, value] of Object.entries(saved)) {
      const input = $(`input[name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`, form);
      if (input) input.checked = true;
    }
  }

  function restart() {
    try { localStorage.removeItem(STORE); } catch { /* ver save() */ }
    form.reset();
    result.hidden = true;
    after.hidden = true;
    form.hidden = false;
    progress.hidden = false;
    nav.hidden = false;
    show(0);
  }

  /* ---- Resultado ----------------------------------------- */

  function finish(event) {
    event.preventDefault();
    if (!validate(steps[current])) return;

    const raw = answers();
    const context = { role: raw.role, experience: raw.experience, situation: raw.situation };
    const scored = report(raw, context);

    result.innerHTML = resultHtml(scored, context);
    result.hidden = false;
    after.hidden = false;
    form.hidden = true;
    progress.hidden = true;
    nav.hidden = true;

    $('input[name="resultado"]', $('#radarLead')).value = asText(scored, context, raw);

    result.focus({ preventScroll: true });
    result.scrollIntoView({ block: 'start', behavior: scrollBehavior });
  }

  /* Resumen legible para el correo: quien lo abre es Raúl, no una
     máquina, y un JSON crudo obliga a descifrarlo antes de responder. */
  function asText(scored, context, raw) {
    const role = roles.find((r) => r.id === context.role)?.name ?? context.role;
    const lines = [
      `Rol objetivo: ${role}`,
      `Experiencia: ${context.experience}`,
      `Situación: ${context.situation}`,
      `Nivel global: ${Math.round(scored.overall)}/100 (${scored.overallBand})`,
      '',
      'Ejes:',
      ...axes.map((a) => `  ${a.name}: ${Math.round(scored.scores[a.id])} (se esperan ${scored.expected[a.id]})`),
      '',
      'Plan sugerido:',
      ...(scored.plan.length
        ? scored.plan.map((p) => `  · ${axisName(p.axis)} [${p.band}]`)
        : ['  (sin brechas contra el rol elegido)']),
      '',
      'Respuestas:',
      ...items.map((i) => `  ${i.id}: ${raw[i.id] ?? '-'}`),
    ];
    return lines.join('\n');
  }

  const axisName = (id) => axes.find((x) => x.id === id)?.name ?? id;

  /* ---- Lead ---------------------------------------------- */

  function wireLead() {
    const lead = $('#radarLead');
    const status = $('[data-lead-status]', lead);
    const button = $('button[type="submit"]', lead);

    lead.addEventListener('submit', async (event) => {
      event.preventDefault();
      button.disabled = true;
      status.textContent = 'Enviando…';
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          body: new FormData(lead),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        lead.reset();
        status.textContent = 'Recibido. Te respondo en menos de 48 horas.';
      } catch {
        status.textContent = `No se ha podido enviar. Escríbeme a ${site.email} y te contesto igual.`;
      } finally {
        button.disabled = false;
      }
    });
  }
}
