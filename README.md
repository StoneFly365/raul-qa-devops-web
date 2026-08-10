# raul-qa-devops-web

Web de marca personal de **Raúl Molina Hernández** — QA Engineering, DevOps
y AI Engineering.

HTML, CSS y JavaScript de navegador. Sin framework, sin paso de build, sin
dependencias en tiempo de ejecución. Se despliega copiando el repositorio a
GitHub Pages.

---

## Arrancar en local

```bash
npm run dev      # live-server en http://localhost:3000
npm run build    # prerenderiza el home y el cuestionario de la Radiografía
npm test         # suite de auditoría y motor de la Radiografía — 51 comprobaciones
```

`npm test` no necesita instalar nada: usa el runner nativo de Node (≥ 18).

---

## Enlaces

| Qué                | Dónde |
|--------------------|-------|
| Local              | http://localhost:3000 |
| Producción         | https://stonefly365.github.io/raul-qa-devops-web/ |
| Repositorio        | https://github.com/StoneFly365/raul-qa-devops-web |
| GitHub (perfil)    | https://github.com/StoneFly365 |
| LinkedIn           | https://www.linkedin.com/in/raulmolinahernandez/ |
| RSS del blog       | https://stonefly365.github.io/raul-qa-devops-web/blog/feed.xml |
| Sitemap            | https://stonefly365.github.io/raul-qa-devops-web/sitemap.xml |

Estas URLs no son configuración: viven en `assets/js/data.js` (`site.*`,
`projects[].url`) y en los `canonical` de cada página. Esta tabla es un atajo
para consultarlas, no un sitio donde cambiarlas.

---

## Pendiente

- **⏳ Agenda online.** `site.bookingUrl` en `data.js` sigue a `null`. En cuanto
  haya URL de Calendly o Cal.com, ponerla ahí: los nueve CTA "Reservar una
  reunión" pasan de llevar al formulario a abrir el calendario, en una línea
  y sin tocar nada más.
- **Contenido de las siete landings SEO** (siguen en `noindex`, ver más abajo).
- **Primeros artículos del blog** (la infraestructura ya está lista).
- **Calibrar la Radiografía.** Los cortes de banda y el perfil esperado por rol
  en `radar.data.js` son estimaciones, no medidas. Cuando haya respuestas
  reales, ajustarlos ahí: el motor no cambia.
- **Aviso legal.** `/privacidad/` cubre el RGPD. Si se factura desde la web,
  la LSSI-CE pide además NIF y domicilio en un aviso legal aparte.

---

## Estructura

```
index.html                 Home
404.html                   Página de error (rutas absolutas: GitHub Pages la sirve
                           desde cualquier profundidad de URL)
robots.txt · sitemap.xml

blog/
  index.html               Listado; muestra estado vacío mientras no haya artículos
  _plantilla.html          Plantilla de artículo (copiar, no editar)
  feed.xml                 Canal RSS 2.0, ya válido y suscribible

qa/ · test-automation/ · playwright/ · devops/ · github-actions/
solution-consulting/ · ai-engineering/
                           Landings SEO — estructura lista, contenido largo pendiente
mentoringB2C/              Mentoría 1:1 (B2C)
radiografia-qa/            Autoevaluación de nivel QA — el lead magnet de B2C.
                           Las preguntas las escribe `npm run build` desde
                           radar.data.js: no editarlas a mano en el HTML
privacidad/                Política de privacidad (obligatoria desde que hay
                           formularios que recogen email)
cv/                        Ignorado por git. El CV no se publica: la web enlaza
                           a LinkedIn, que además está siempre al día

assets/
  css/
    tokens.css             Color, tipografía, espaciado, radios, sombras, tiempos
    base.css               Reset, elementos nativos, layout primitivo, utilidades
    motion.css             Keyframes y utilidades de animación
    components.css         Piezas reutilizables (nav, botón, tarjeta, formulario…)
    sections.css           Composición propia de cada sección
  js/
    data.js                TODO el contenido del sitio
    dom.js                 Utilidades puras (escape, iconos, render)
    sections.js            Plantillas data → HTML
    ui.js                  Navegación, scroll spy, formulario
    motion.js              Reveal, parallax, animación del pipeline
    chrome.js              Cabecera y pie compartidos por las subpáginas
    main.js                Punto de entrada del home
    page.js                Punto de entrada de las subpáginas
    radar.data.js          Contenido de la Radiografía: ejes, ítems, bandas,
                           acciones. Es el producto; lo demás es andamiaje
    radar.js               Motor de puntuación — funciones puras, sin DOM
    radar.view.js          Plantillas de la Radiografía (prerender + navegador)
    radar.ui.js            Punto de entrada de /radiografia-qa/
    dom.test.js            Suite de auditoría (`npm test`)
    radar.test.js          Motor de la Radiografía
    radar.view.test.js     Plantillas de la Radiografía
  fonts/                   Geist y Geist Mono variables, subset latino (52 KB)
  logos/                   SVG monocromos de tecnologías (Simple Icons, CC0)
  favicon.svg · og-cover.png
```

---

## Cómo se edita

### Cambiar contenido

Casi todo vive en [`assets/js/data.js`](assets/js/data.js). Añadir una tarjeta
es añadir un objeto al array correspondiente; el marcado sale solo.

| Quiero…                        | Edito en `data.js`       |
|--------------------------------|--------------------------|
| Otro servicio                  | `services`               |
| Otro escenario de encargo      | `approaches`             |
| Otro proyecto de GitHub        | `projects`               |
| Otra etapa de trayectoria      | `career`                 |
| Otra capacidad de IA           | `aiCapabilities`         |
| Otra tecnología del stack      | `techGroups`             |
| Otra pregunta frecuente        | `faqs` **y** el JSON-LD `FAQPage` de `index.html` |
| URL de calendario para los CTA | `site.bookingUrl`        |

**Regla de este archivo:** sólo entra contenido real. Nada de `[PENDIENTE]`
ni nombres de cliente inventados delante de alguien que está evaluando si te
contrata. Lo que aún no existe se declara como lista vacía y su sección
desaparece sola (así funciona hoy el blog).

**Tras editar `data.js`, ejecuta `npm run build`** y commitea el `index.html`
resultante: el contenido del home también se prerenderiza en el estático
(sección [Prerender](#prerender)). `npm test` falla si se te olvida.

### Publicar un artículo

```bash
cp blog/_plantilla.html blog/mi-articulo.html
```

1. Sustituye los marcadores `{{...}}` del archivo, incluido el `<meta robots>`
   (la plantilla viene en `noindex`).
2. Añade el objeto a `posts` en `data.js`.
3. Añade el `<item>` en `blog/feed.xml`.
4. Añade la `<url>` en `sitemap.xml`.
5. `npm test` — comprueba que el archivo del artículo existe y que la fecha
   es válida.

### Publicar una landing SEO

Las siete landings existen con su estructura, su copy corto real, su JSON-LD
y sus enlaces internos, pero **están en `noindex` y fuera del sitemap** a
propósito: una página delgada indexada perjudica al dominio entero. Cuando
termines el contenido de una:

1. Cambia su `<meta name="robots">` a `index,follow,max-image-preview:large`.
2. Borra el bloque `.wip` de esa página.
3. Descomenta su `<url>` en `sitemap.xml`.

`npm test` verifica que esos tres pasos vayan juntos.

### Cambiar el diseño

Todo el color, la tipografía y el espaciado salen de
[`assets/css/tokens.css`](assets/css/tokens.css). Fuera de ese archivo no hay
valores mágicos: cambiar `--accent` cambia el sitio entero.

Dos reglas del sistema que conviene no romper:

- **Un solo gesto cromático.** El acento va siempre del azul (`--accent`) al
  violeta (`--accent-2`), en ese orden. No hay un tercer color decorativo.
- **El verde es estado, no decoración.** `--pass` sólo aparece donde algo ha
  pasado: el pipeline, el terminal, un KPI de resultado. Si una tarjeta se
  pinta de verde, el verde deja de significar nada.

---

## Qué comprueba `npm test`

La suite existe para cazar lo que se rompe en silencio y no se nota hasta
que ya está desplegado:

- utilidades puras de `dom.js` (escape de HTML, reescritura de atributos);
- un slug de tecnología sin su SVG (se vería como un hueco vacío, sin error);
- **enlaces internos rotos** en todas las páginas, incluidas rutas absolutas;
- `title`, `description`, `canonical` y `og:image` presentes y con la longitud
  que Google no trunca;
- canonical que no coincide con la ruta real del archivo;
- ids duplicados en un documento;
- páginas sin `skip-link`, sin `<main id="main">` o con más de un `<h1>`;
- `target="_blank"` sin `rel="noopener"`;
- landings en `noindex` que se hayan colado en el sitemap;
- **enlaces al CV en PDF**, que no se publica: `cv/` está en `.gitignore`, así
  que un enlace ahí funcionaría en local y daría 404 en producción;
- forma de los datos de `data.js` (servicios, proyectos, trayectoria, posts).

---

## Decisiones que conviene conocer antes de tocar nada

**Sin framework y sin build.** El contenido se renderiza en el navegador desde
`data.js`. La ventaja es que no hay nada que compilar y que publicar es un
`git push`. El coste está anotado abajo, en limitaciones.

**Fuentes autoalojadas.** Geist Variable en woff2 subset latino, 52 KB los dos
ejes completos. Cero peticiones a terceros, cero CLS y una petición menos
bloqueando el render que con Google Fonts.

**Cero imágenes de contenido.** Las portadas de proyecto son gradientes CSS y
los logos de tecnología son SVG teñidos con `mask-image`. Nada pesado que
descargar y ninguna miniatura que se quede obsoleta. La única imagen del sitio
es `og-cover.png`, y sólo se descarga cuando alguien comparte el enlace.

**Formulario sin backend.** Compone un `mailto:` con los datos ya validados
por el navegador. Para usar un endpoint real (Formspree, Cloudflare Worker):
añade `action`/`method` al `<form>` de `index.html` y borra
`initContactForm()` de `ui.js`.

**Accesibilidad.** Contraste mínimo 4.5:1 en todo el texto, un único anillo de
foco en `:focus-visible`, animaciones que se apagan con
`prefers-reduced-motion` sin dejar contenido oculto, y jerarquía de encabezados
sin saltos (los títulos de columna del pie son `<p>`, no `<h4>`: son etiquetas
de navegación, no secciones del documento).

---

## Resultados de auditoría

Lighthouse 13, servidor local, última ejecución:

| Página          | Escritorio (P/A/BP/SEO)  | Móvil (P/A/BP/SEO)      |
|-----------------|--------------------------|-------------------------|
| Home            | 100 / 100 / 100 / 100    | 97 / 100 / 100 / 100    |
| Blog            | 100 / 100 / 100 / 100    | 98 / 100 / 100 / 100    |
| Mentoría        | 100 / 100 / 100 / 100    | 97 / 100 / 100 / 100    |
| Landing `/qa/`  | 100 / 100 / 100 / **66** | 98 / 100 / 100 / **66** |

El 66 de SEO en las landings es correcto: Lighthouse penaliza el `noindex`
deliberado. Subirá a 100 en cuanto se publique su contenido.

---

## Limitaciones conocidas

- **CSS repartido en cinco archivos.** Son cinco peticiones bloqueantes. Con
  HTTP/2 apenas cuesta, pero es lo que separa el 97 del 100 en móvil.
- **Casos de éxito anonimizados.** Sustituir por casos con nombre y logo en
  cuanto haya autorización del cliente: un logo real convierte más que
  "sector e-commerce".

---

## Prerender

El contenido del home se pinta con JS a partir de `data.js`, pero también se
escribe en `index.html` en tiempo de build con `npm run build`
([`scripts/prerender.mjs`](scripts/prerender.mjs)). Así crawlers que no ejecutan
JS (Bing, unfurl de LinkedIn/Slack, algunos bots de IA) y visitantes sin JS ven
servicios, proyectos, trayectoria y FAQ, no una rejilla vacía.

Sin duplicar contenido: usa las mismas plantillas que el navegador (`homeBlocks()`
en `sections.js`). Es idempotente y `npm test` falla si `index.html` quedó
desfasado respecto a `data.js` — obliga a reconstruir antes de desplegar.

## Despliegue

GitHub Pages sirve la rama por defecto. **Ejecuta `npm run build` y commitea el
`index.html`** antes de publicar (o el gate de `npm test` te avisa).

Si algún día se mueve a un dominio propio, hay que cambiar el prefijo
`/raul-qa-devops-web/` de las rutas absolutas de `404.html` por `/`.

## Licencia

MIT — ver [LICENSE](LICENSE). Los logos de `assets/logos/` son de
[Simple Icons](https://simpleicons.org) (CC0). Geist es de Vercel (OFL).
