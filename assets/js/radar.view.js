/* =============================================================
   RADAR VIEW — plantillas de la Radiografía.

   Dos consumidores y una sola fuente:
     · scripts/prerender.mjs escribe stepsHtml() en el HTML servido,
       para que las preguntas existan sin JavaScript y sean rastreables;
     · radar.ui.js pinta resultHtml() en el navegador al terminar.

   Sin DOM y sin estado, igual que dom.js: así el prerender y el test
   ejecutan exactamente el mismo código que el navegador.
   ============================================================= */
import { esc } from './dom.js';
import { bandOf } from './radar.js';
import {
  axes, items, scale, roles, experience, situations, bands,
} from './radar.data.js';

const bandName = (id) => bands.find((b) => b.id === id)?.name ?? '';
const axisName = (id) => axes.find((a) => a.id === id)?.name ?? id;

/* Una pregunta con sus opciones. `required` en todas las de un grupo:
   el navegador ya sabe pedirlas sin que haya que validar a mano. */
const question = (name, text, options) => `
<fieldset class="q">
  <legend class="q-text">${text}</legend>
  <div class="q-options">
    ${options.map((opt, i) => `
    <label class="q-option">
      <input type="radio" name="${esc(name)}" value="${esc(opt.value)}" required>
      <span class="q-option-mark" aria-hidden="true">${i + 1}</span>
      <span class="q-option-text">${esc(opt.label)}</span>
    </label>`).join('')}
  </div>
</fieldset>`;

/* La escala de evidencia, idéntica para los doce ítems. */
const scaleOptions = scale.map((label, value) => ({ value, label }));

const namedOptions = (list) => list.map((o) => ({ value: o.id, label: o.name }));

const step = (n, eyebrow, title, lead, body) => `
<section class="radar-step" data-step="${n}"${n > 0 ? ' hidden' : ''}
         aria-labelledby="step-${n}-title">
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h2 id="step-${n}-title">${esc(title)}</h2>
  <p class="lead">${esc(lead)}</p>
  ${body}
</section>`;

/* Los siete pasos del cuestionario: contexto y un eje cada uno. */
export function stepsHtml() {
  const context = step(0, 'Antes de empezar', 'Contra qué te vamos a comparar',
    'Sin esto la puntuación sería un número suelto. Con esto es una comparación.',
    [
      question('role', '¿A qué apuntas en los próximos doce meses?', namedOptions(roles)),
      question('experience', '¿Cuántos años llevas en tecnología?', namedOptions(experience)),
      question('situation', '¿En qué situación estás ahora mismo?', namedOptions(situations)),
    ].join(''));

  const axisSteps = axes.map((axis, i) => step(
    i + 1, `Eje ${i + 1} de ${axes.length}`, axis.name, axis.desc,
    items.filter((it) => it.axis === axis.id)
      .map((it) => question(it.id, it.text, scaleOptions))
      .join(''),
  ));

  return [context, ...axisSteps].join('\n');
}

/* -------------------------------------------------------------
   RESULTADO
   ------------------------------------------------------------- */

/* Una barra por eje, con la marca de lo que se espera para el rol
   objetivo. La marca es la mitad del mensaje: una barra sola no dice
   si 55 está bien o mal. */
const bar = (axis, score, expected, inPlan) => `
<li class="radar-bar${inPlan ? ' is-plan' : ''}" data-axis="${axis.id}">
  <div class="radar-bar-head">
    <span class="radar-bar-name">${esc(axis.name)}${inPlan ? ' <span class="radar-bar-flag">empieza aquí</span>' : ''}</span>
    <span class="radar-bar-band">${esc(bandName(bandOf(score)))}</span>
  </div>
  <div class="radar-bar-track" role="img"
       aria-label="${esc(axis.name)}: ${Math.round(score)} sobre 100, se esperan ${Math.round(expected)}">
    <div class="radar-bar-fill${score < expected ? ' is-gap' : ''}" style="--v:${score}%"></div>
    <span class="radar-bar-target" style="--t:${expected}%"></span>
  </div>
</li>`;

export function resultHtml(report, context = {}) {
  const role = roles.find((r) => r.id === context.role) || roles[0];
  const weak = axisName(report.weakest.axis);
  const planAxes = new Set(report.plan.map((s) => s.axis));

  const plan = report.plan.length ? `
<div class="radar-plan" data-plan>
  <h3>Por dónde empezar</h3>
  <p class="lead">Dos frentes, no seis. Lo demás puede esperar a que estos dos estén hechos.</p>
  <ol class="radar-plan-list">
    ${report.plan.map((s) => `
    <li data-plan-step>
      <p class="radar-plan-axis">${esc(axisName(s.axis))}</p>
      <p>${esc(s.text)}</p>
    </li>`).join('')}
  </ol>
  ${report.advice.map((t) => `<p class="radar-note">${esc(t)}</p>`).join('')}
</div>` : `
<div class="radar-plan">
  <h3>No hay brechas contra ${esc(role.name)}</h3>
  <p>Llegas a lo que se espera en los seis ejes. Si el resultado te sabe a poco,
     el problema no es tu nivel técnico: es que estás apuntando bajo.
     Vuelve a hacerlo eligiendo el rol siguiente.</p>
</div>`;

  return `
<header class="radar-result-head">
  <p class="eyebrow">Tu radiografía</p>
  <h2>Apuntas a ${esc(role.name)}</h2>
  <p class="lead">Nivel global <b>${esc(bandName(report.overallBand))}</b>
     (${Math.round(report.overall)} sobre 100). Tu eje más débil es <b>${esc(weak)}</b>,
     y es el que marca el techo: la media no te va a sacar de ahí.</p>
</header>

<ul class="radar-bars">
  ${axes.map((a) => bar(a, report.scores[a.id], report.expected[a.id], planAxes.has(a.id))).join('')}
</ul>
<p class="radar-legend">
  <span class="radar-legend-key" aria-hidden="true"></span>
  La marca vertical es lo que se espera en ese eje para ${esc(role.name)}.
</p>

${plan}`;
}
