/* =============================================================
   RAIN — "digital rain" estilo matrix, acotado al hero.
   Canvas nativo, cero dependencias. Se apaga con
   prefers-reduced-motion y se pausa cuando el hero sale de
   pantalla, así no gasta CPU/batería de fondo.
   ============================================================= */
import { $, prefersReducedMotion } from './dom.js';

const GLYPHS = 'アイウエオカキクケコサシスセソABCDEF0123456789{}[]<>/=;$#';
const FONT = 16;           // px por celda
const FPS = 14;            // caída lenta; matrix no corre, gotea
const FADE = 0.06;         // rastro: menor = estelas más largas

export function initRain() {
  const canvas = $('#heroRain');
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim() || '#34D399';

  let cols = 0, drops = [], dpr = 1;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);   // ponytail: cap a 2, retina 3x no aporta aquí
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / FONT);
    // arranque escalonado: columnas empiezan a alturas aleatorias
    drops = Array.from({ length: cols }, () => Math.random() * -50);
    ctx.font = `${FONT}px ui-monospace, monospace`;
  }

  function frame() {
    const { width, height } = canvas.getBoundingClientRect();
    // capa translúcida encima = desvanece el frame previo (estela)
    ctx.fillStyle = `rgba(8, 9, 12, ${FADE})`;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = accent;

    for (let i = 0; i < cols; i++) {
      const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      ctx.fillText(ch, i * FONT, drops[i] * FONT);
      // al salir por abajo, reinicia arriba con probabilidad -> densidad irregular
      if (drops[i] * FONT > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  // reloj propio a FPS fijo, no requestAnimationFrame a 60/120Hz
  let timer = null;
  const start = () => { if (!timer) timer = setInterval(frame, 1000 / FPS); };
  const stop = () => { clearInterval(timer); timer = null; };

  resize();
  addEventListener('resize', resize, { passive: true });

  // pausa cuando el hero no se ve
  const hero = canvas.closest('.hero');
  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    ).observe(hero);
  } else {
    start();
  }
}
