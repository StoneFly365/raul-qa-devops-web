/* =============================================================
   Motor de la Radiografía de nivel QA: `npm test`.

   Sólo funciones puras. Lo que se comprueba aquí es lo que el
   visitante ve como diagnóstico, así que un fallo silencioso en
   estas cuentas es un consejo equivocado enviado a un lead.
   ============================================================= */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreAxes, bandOf, expectedFor, gaps, actionFor, report } from './radar.js';
import { items, axes, actions } from './radar.data.js';

/* Todas las respuestas al mismo valor: los extremos y los cortes
   se expresan mucho más claro así que con un objeto literal. */
const all = (v) => Object.fromEntries(items.map((i) => [i.id, v]));

test('scoreAxes: sin experiencia en nada, todos los ejes a 0', () => {
  const scores = scoreAxes(all(0));
  for (const axis of axes) assert.equal(scores[axis.id], 0);
});

test('scoreAxes: máximo en todo, todos los ejes a 100', () => {
  const scores = scoreAxes(all(4));
  for (const axis of axes) assert.equal(scores[axis.id], 100);
});

test('scoreAxes: el eje es la media de sus dos ítems por 25', () => {
  const scores = scoreAxes({ ...all(0), c1: 4, c2: 1 });
  assert.equal(scores.cicd, 62.5);   // (4 + 1) / 2 * 25
});

test('scoreAxes: un ítem sin responder cuenta como 0', () => {
  const answers = all(4);
  delete answers.c1;
  assert.equal(scoreAxes(answers).cicd, 50);
});

test('bandOf: los cortes caen del lado que dice la tabla', () => {
  assert.equal(bandOf(0), 'junior');
  assert.equal(bandOf(29), 'junior');
  assert.equal(bandOf(30), 'mid');
  assert.equal(bandOf(54), 'mid');
  assert.equal(bandOf(55), 'senior');
  assert.equal(bandOf(79), 'senior');
  assert.equal(bandOf(80), 'lead');
  assert.equal(bandOf(100), 'lead');
});

test('expectedFor: un rol sin excepciones pide lo mismo en los seis ejes', () => {
  const exp = expectedFor('senior');
  for (const axis of axes) assert.equal(exp[axis.id], 60);
});

test('expectedFor: SDET pide más en automatización, API y CI/CD', () => {
  const exp = expectedFor('sdet');
  assert.equal(exp.automation, 75);
  assert.equal(exp.api, 75);
  assert.equal(exp.cicd, 75);
  assert.equal(exp.strategy, 60);
});

test('expectedFor: un rol desconocido cae al menos exigente', () => {
  assert.deepEqual(expectedFor('astronauta'), expectedFor('mid'));
});

test('gaps: sólo los ejes por debajo de lo esperado, del mayor hueco al menor', () => {
  const scores = { strategy: 60, automation: 25, api: 60, cicd: 50, data: 60, ai: 60 };
  const found = gaps(scores, 'senior');   // espera 60 en todos
  assert.deepEqual(found.map((g) => g.axis), ['automation', 'cicd']);
  assert.equal(found[0].delta, 35);
  assert.equal(found[1].delta, 10);
});

test('gaps: igualar lo esperado no es una brecha', () => {
  const scores = Object.fromEntries(axes.map((a) => [a.id, 60]));
  assert.deepEqual(gaps(scores, 'senior'), []);
});

test('gaps: quien va sobrado no recibe brechas inventadas', () => {
  assert.deepEqual(gaps(scoreAxes(all(4)), 'lead'), []);
});

test('actionFor: devuelve la acción del eje y la banda pedidos', () => {
  assert.equal(actionFor('cicd', 'junior'), actions.cicd.junior);
});

test('actionFor: una banda sin acción propia cae a la de senior', () => {
  assert.equal(actionFor('cicd', 'lead'), actions.cicd.senior);
});

test('actionFor: todos los ejes tienen acción en junior, mid y senior', () => {
  for (const axis of axes) {
    for (const band of ['junior', 'mid', 'senior']) {
      assert.equal(typeof actionFor(axis.id, band), 'string', `${axis.id}/${band}`);
    }
  }
});

/* ---- report: lo que acaba en pantalla ---------------------- */
const ctx = { role: 'senior', experience: '2to5', situation: 'employed' };

test('report: el nivel global es la media de los seis ejes', () => {
  const r = report({ ...all(0), c1: 4, c2: 4 }, ctx);
  assert.equal(r.overall, 100 / 6);
});

test('report: el eje más débil es el de menor puntuación', () => {
  const answers = { ...all(4), d1: 0, d2: 0 };
  assert.equal(report(answers, ctx).weakest.axis, 'data');
});

test('report: el plan trae dos pasos como mucho, en el orden de las brechas', () => {
  const r = report(all(0), ctx);   // seis brechas de golpe
  assert.equal(r.plan.length, 2);
  assert.deepEqual(r.plan.map((p) => p.axis), r.gaps.slice(0, 2).map((g) => g.axis));
});

test('report: el plan trae la acción de la banda en la que está la persona', () => {
  const answers = { ...all(4), c1: 0, c2: 0 };   // CI/CD a 0 = junior
  const step = report(answers, ctx).plan.find((p) => p.axis === 'cicd');
  assert.equal(step.text, actions.cicd.junior);
});

test('report: sin brechas no se inventa un plan', () => {
  const r = report(all(4), ctx);
  assert.deepEqual(r.plan, []);
});

test('report: quien busca trabajo recibe el consejo de contexto', () => {
  const r = report(all(0), { ...ctx, situation: 'searching' });
  assert.equal(r.advice.length, 1);
  assert.match(r.advice[0], /rastro público/);
});

test('report: quien ya está empleado no recibe consejo de contexto', () => {
  assert.deepEqual(report(all(0), ctx).advice, []);
});
