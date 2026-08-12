/* =============================================================
   RADAR — motor de la Radiografía de nivel QA.

   Funciones puras: entra un objeto de respuestas, sale un informe.
   Ni DOM ni estado, para que la suite de `npm test` pueda ejecutarlo
   sin navegador y el diagnóstico sea verificable línea a línea.
   ============================================================= */
import { items, axes, bands, roles, actions, contextAdvice, MAX } from './radar.data.js';

/* Pasos del plan que se muestran. Más de dos y deja de ser un plan
   para ser una lista de deseos: nadie ataca seis frentes a la vez. */
const PLAN_STEPS = 2;

/* Puntuación 0-100 de cada eje: media de sus ítems llevada a
   porcentaje. Un ítem sin responder cuenta como 0 y no como
   ausente: el visitante que salta una pregunta está diciendo algo. */
export function scoreAxes(answers = {}) {
  const out = {};
  for (const axis of axes) {
    const own = items.filter((i) => i.axis === axis.id);
    const total = own.reduce((sum, i) => sum + (Number(answers[i.id]) || 0), 0);
    out[axis.id] = (total / own.length) * (100 / MAX);
  }
  return out;
}

/* La banda más alta cuyo mínimo alcanza la puntuación. */
export function bandOf(score) {
  return bands.reduce((best, b) => (score >= b.min ? b.id : best), bands[0].id);
}

/* Lo que se espera en cada eje para el rol al que apunta la persona.
   Un rol desconocido cae al menos exigente en vez de reventar: es una
   página pública y el parámetro puede venir de un localStorage viejo. */
export function expectedFor(roleId) {
  const role = roles.find((r) => r.id === roleId) || roles[0];
  return Object.fromEntries(
    axes.map((a) => [a.id, role.overrides?.[a.id] ?? role.expected]),
  );
}

/* Ejes por debajo de lo esperado, del hueco mayor al menor. Es el
   corazón del diagnóstico: lo que se muestra arriba es lo que la
   persona va a intentar arreglar primero. */
export function gaps(scores, roleId) {
  const expected = expectedFor(roleId);
  return axes
    .map((a) => ({ axis: a.id, score: scores[a.id], expected: expected[a.id] }))
    .filter((g) => g.score < g.expected)
    .map((g) => ({ ...g, delta: g.expected - g.score }))
    .sort((x, y) => y.delta - x.delta);
}

/* La acción que le toca a quien está en esa banda de ese eje. La
   tabla sólo cubre junior, mid y senior porque tener una brecha
   implica estar por debajo de lo esperado, y lo máximo que se espera
   (80) es justo el corte de lead. El fallback existe por si algún día
   se sube ese número y nadie se acuerda de esta nota. */
export function actionFor(axisId, band) {
  const byBand = actions[axisId];
  return byBand?.[band] ?? byBand?.senior;
}

/* El informe entero, que es lo único que consume la página. */
export function report(answers, context = {}) {
  const scores = scoreAxes(answers);
  const found = gaps(scores, context.role);

  const values = axes.map((a) => scores[a.id]);
  const overall = values.reduce((s, v) => s + v, 0) / axes.length;

  /* El eje más débil se muestra junto al nivel global: la media sola
     deja pasar a alguien con un cero en un eje y un buen promedio. */
  const weakest = axes
    .map((a) => ({ axis: a.id, score: scores[a.id] }))
    .reduce((min, cur) => (cur.score < min.score ? cur : min));

  const plan = found.slice(0, PLAN_STEPS).map((g) => ({
    axis: g.axis,
    band: bandOf(g.score),
    text: actionFor(g.axis, bandOf(g.score)),
  }));

  return {
    scores,
    expected: expectedFor(context.role),
    overall,
    overallBand: bandOf(overall),
    weakest,
    gaps: found,
    plan,
    advice: contextAdvice.filter((r) => r.when(context)).map((r) => r.text),
  };
}
