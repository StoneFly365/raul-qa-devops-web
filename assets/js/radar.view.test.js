/* =============================================================
   Plantillas de la Radiografía: `npm test`.

   El cuestionario se prerenderiza desde radar.data.js, así que un
   fallo aquí llega al HTML servido. Lo que se comprueba es que no
   se pierdan preguntas por el camino y que el resultado no afirme
   cosas que el informe no dice.
   ============================================================= */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stepsHtml, resultHtml } from './radar.view.js';
import { report } from './radar.js';
import { items, axes, scale, roles, situations, experience } from './radar.data.js';

const all = (v) => Object.fromEntries(items.map((i) => [i.id, v]));
const ctx = { role: 'senior', experience: '2to5', situation: 'employed' };

test('stepsHtml: cada ítem tiene su grupo de radios con la escala entera', () => {
  const html = stepsHtml();
  for (const item of items) {
    const radios = html.match(new RegExp(`name="${item.id}"`, 'g')) || [];
    assert.equal(radios.length, scale.length, `${item.id} debería tener ${scale.length} opciones`);
  }
});

test('stepsHtml: las tres preguntas de contexto traen todas sus opciones', () => {
  const html = stepsHtml();
  for (const [name, opts] of [['role', roles], ['experience', experience], ['situation', situations]]) {
    const radios = html.match(new RegExp(`name="${name}"`, 'g')) || [];
    assert.equal(radios.length, opts.length, `${name} debería tener ${opts.length} opciones`);
  }
});

test('stepsHtml: un paso de contexto y uno por eje', () => {
  const steps = stepsHtml().match(/class="radar-step"/g) || [];
  assert.equal(steps.length, axes.length + 1);
});

test('resultHtml: pinta una barra por eje', () => {
  const html = resultHtml(report(all(2), ctx), ctx);
  for (const axis of axes) assert.match(html, new RegExp(`data-axis="${axis.id}"`));
});

test('resultHtml: sin brechas no aparece la sección de plan', () => {
  const html = resultHtml(report(all(4), ctx), ctx);
  assert.doesNotMatch(html, /data-plan/);
});

test('resultHtml: con brechas aparece un paso de plan por brecha mostrada', () => {
  const r = report(all(0), ctx);
  const html = resultHtml(r, ctx);
  const steps = html.match(/data-plan-step/g) || [];
  assert.equal(steps.length, r.plan.length);
});

test('resultHtml: las barras de los ejes del plan llevan el flag "empieza aquí"', () => {
  const r = report(all(0), ctx);
  const html = resultHtml(r, ctx);
  const flags = html.match(/radar-bar-flag/g) || [];
  assert.equal(flags.length, r.plan.length);
});

test('resultHtml: nombra el rol objetivo elegido', () => {
  const html = resultHtml(report(all(2), ctx), ctx);
  assert.match(html, /QA Automation Senior/);
});
