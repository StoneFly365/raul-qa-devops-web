# Informe de refactorización — v4

**Proyecto:** raul-qa-devops-web · Web de marca personal de Raúl Molina Hernández
**Fecha:** 5 de agosto de 2026
**Alcance:** refactorización completa — identidad visual, arquitectura de
contenido, SEO técnico, accesibilidad, rendimiento y calidad de código.

---

## 1. Resumen ejecutivo

La web pasa de ser una landing de consultoría QA a una web de marca personal
con tres pilares equiparados —**QA Engineering, DevOps y AI Engineering**— y
con la infraestructura necesaria para crecer sin volver a tocar la estructura.

Lo que ha cambiado, en una línea cada cosa:

- **Identidad visual nueva.** Lienzo de tinta (`#08090C`) y un único gesto
  cromático azul → violeta. El verde deja de decorar y pasa a significar
  exclusivamente *estado de ejecución*.
- **Tipografía propia y autoalojada.** Geist y Geist Mono variables, 52 KB,
  sin una sola petición a Google Fonts.
- **Seis secciones nuevas o rehechas:** *How I Help* (los seis frentes),
  *Casos de éxito* con métrica destacada, *Proyectos* (seis repositorios
  reales), *Trayectoria profesional* (timeline de cinco etapas), *AI
  Engineering* ampliada y un *Blog* preparado para publicar.
- **Once páginas nuevas:** blog + plantilla + RSS, siete landings SEO y un 404.
- **`npm test` deja de ser un smoke test y pasa a ser el quality gate del
  sitio:** 20 comprobaciones que incluyen enlaces rotos, metadatos SEO,
  encabezados, `noopener` y coherencia entre `noindex` y sitemap.
- **Lighthouse 100/100/100/100 en escritorio** y 97–98 de rendimiento en móvil
  con throttling 4× de CPU.

**Lo que NO ha cambiado, a propósito:** sigue siendo 100 % estático, sin
backend, sin base de datos, sin framework, sin paso de build y sin una sola
dependencia en tiempo de ejecución. Se despliega en GitHub Pages con un
`git push`.

---

## 2. Decisiones de diseño y UX

### Identidad

| Antes (v3)                          | Ahora (v4)                                  |
|-------------------------------------|---------------------------------------------|
| Verde esmeralda como acento único   | Azul señal → violeta como gesto de marca     |
| Verde también para estado           | Verde reservado **sólo** a "ha pasado"        |
| Space Grotesk + Inter + JetBrains Mono desde Google Fonts | Geist + Geist Mono autoalojadas |
| Marca `raul@qa-devops:~$`           | Monograma en gradiente + `raul@qa-devops`     |

La razón del cambio de acento no es estética: con el verde haciendo de color
de marca **y** de color de estado, un pipeline en verde y una tarjeta en verde
significaban lo mismo, o sea nada. Separarlos devuelve significado al verde:
si algo está verde en esta web, es que ha pasado un test.

### Comprensión en menos de cinco segundos

El hero responde las cuatro preguntas en el primer viewport:

- **Quién:** "Soy **Raúl Molina**" en la entradilla, monograma en la barra.
- **Qué:** eyebrow `QA Engineering · DevOps · AI Engineering`.
- **Qué resuelve:** titular *"Mejor software, entregado antes"* + la entradilla.
- **Por qué contactar:** CTA primario `Reservar una reunión`, secundario
  `Cómo puedo ayudarte`, y cuatro cifras de confianza (15+ años, 30+ proyectos,
  10+ sectores, respuesta en <24 h).

### Composición visual del hero

Tres superficies apiladas en lugar de una ilustración: un terminal con la
salida real de una suite de Playwright, una pastilla de agente de IA y una de
métrica DORA. **Peso en red: 0 bytes** — todo es texto, SVG y CSS. Comunica los
tres pilares a la vez sin explicarlos.

### Orden de la página

Diagnóstico → solución → prueba → credibilidad → conversión:

```
Hero → Pipeline (firma) → Sectores → Diagnóstico → How I Help →
Casos de éxito → Cita → Proyectos → Trayectoria → AI Engineering →
Metodología → Stack → Sobre mí → Blog → Recursos → FAQ → Contacto
```

El visitante ve **el problema antes que la oferta**. Las secciones que dan
credibilidad (casos con métrica, código público, quince años de trayectoria)
van antes del formulario, no después.

### CTA distribuidos

Nueve puntos de conversión repartidos: navbar, hero, cada tarjeta de servicio,
cada landing (×2), banda de cierre de cada subpágina y el formulario final.
Todos apuntan al mismo destino y **todos se reconfiguran cambiando una línea**
(`site.bookingUrl` en `data.js`) el día que haya un Calendly.

### Sistema de componentes

Un solo contenedor (`.card`) con modificadores. Tres jerarquías de botón y ni
una más. Toda tarjeta clicable usa el mismo patrón (`.stretch`), sin anidar
`<a>` ni duplicar destinos en JavaScript.

---

## 3. Mejoras de SEO

**Por página**

- `title` de 15–65 caracteres y `description` de 80–165, con un test que falla
  si alguna se pasa del rango que Google trunca.
- `canonical` verificado contra la ruta real del archivo — también por test.
- Open Graph y Twitter Card completos, con `og:image` de 1200×630 generada para
  esta identidad (antes la etiqueta estaba comentada: LinkedIn compartía el
  enlace sin imagen).
- `lang="es"`, `robots` con `max-image-preview:large` y `max-snippet:-1`.

**Datos estructurados**

- Home: grafo con `WebSite`, `Person`, `ProfessionalService` (+ `OfferCatalog`
  de seis servicios con URL) y `FAQPage` de siete preguntas.
- Cada landing: `Service` + `BreadcrumbList`.
- Blog: `Blog`; la plantilla de artículo trae `BlogPosting` + `BreadcrumbList`.
- Mentoría: `Service` + `OfferCatalog` de los tres programas + `BreadcrumbList`.

**Arquitectura de URLs**

Siete landings temáticas listas: `/qa/`, `/test-automation/`, `/playwright/`,
`/devops/`, `/github-actions/`, `/solution-consulting/`, `/ai-engineering/`.
Cada una con enlaces internos cruzados a otras tres.

> **Decisión deliberada:** están en `noindex` y fuera del sitemap hasta que
> tengan contenido extenso. Indexar siete páginas delgadas rebaja la calidad
> percibida del dominio entero, y recuperarse de eso cuesta meses. El README
> documenta los tres pasos para publicarlas, y `npm test` verifica que se den
> los tres a la vez.

**Otros**

- `sitemap.xml` reescrito, con las landings preparadas en comentario.
- `robots.txt` bloquea `blog/_plantilla.html` (contiene marcadores `{{...}}`).
- `blog/feed.xml`: RSS 2.0 válido y suscribible **desde hoy**, para que quien
  se suscriba ahora reciba el primer artículo.
- Breadcrumbs visibles y marcados en todas las subpáginas.
- `404.html`, que GitHub Pages sirve automáticamente.

---

## 4. Mejoras de accesibilidad

**Lighthouse: 100 en las cuatro páginas auditadas, escritorio y móvil.**

- **Contraste.** Todo el texto ≥ 4.5:1 sobre su fondo; los valores calculados
  están anotados junto a cada token en `tokens.css`.
- **Bug corregido de contraste real:** el selector `.nav-links > a` (0,1,1)
  ganaba a `.btn--primary` (0,1,0) y dejaba el CTA principal con el gris del
  menú sobre el gradiente — texto casi ilegible justo en el punto de
  conversión. Resuelto con `:not(.btn)` y documentado en el CSS.
- **Jerarquía de encabezados sin saltos.** Los títulos de columna del pie eran
  `<h4>` después de un `<h2>`; ahora son `<p>` con `aria-labelledby`, porque
  son etiquetas de navegación y no secciones del documento.
- **Teclado.** Un único anillo de foco (`:focus-visible`), `skip-link` en todas
  las páginas, menú móvil que cierra con `Escape` y devuelve el foco al botón,
  y "volver arriba" que reposiciona el foco además del scroll.
- **ARIA.** `aria-expanded` y `aria-controls` en el menú, `aria-current` en la
  navegación activa, `aria-label` en cada `<nav>`, `role="status"` con
  `aria-live` en el estado del pipeline y del formulario, todos los SVG
  decorativos con `aria-hidden`.
- **Semántica.** `<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`,
  `<time datetime>`, `<dl>` para pares dato/valor y `<ol>` para timeline y
  metodología.
- **Movimiento reducido.** Con `prefers-reduced-motion` todas las animaciones
  quedan en su estado final **visible**. Ninguna animación puede dejar
  contenido oculto de forma permanente.
- **Formulario.** `<label>` asociado a cada campo, campos obligatorios
  marcados, `maxlength`, `autocomplete` y validación nativa del navegador.

---

## 5. Mejoras de rendimiento

**Lighthouse (servidor local, Lighthouse 13)**

| Página          | Escritorio               | Móvil (CPU 4×, 150 ms RTT) |
|-----------------|--------------------------|----------------------------|
| Home            | 100 / 100 / 100 / 100    | **97** / 100 / 100 / 100   |
| Blog            | 100 / 100 / 100 / 100    | **98** / 100 / 100 / 100   |
| Mentoría        | 100 / 100 / 100 / 100    | **97** / 100 / 100 / 100   |
| Landing `/qa/`  | 100 / 100 / 100 / 66\*   | 98 / 100 / 100 / 66\*      |

\* El 66 de SEO es el `noindex` deliberado, no un defecto.

**De dónde sale**

- **Fuentes autoalojadas con `preload`.** Se eliminan `preconnect` +
  descarga de CSS + descarga de woff2 desde `fonts.gstatic.com`: dos orígenes
  externos y una cadena de peticiones menos en la ruta crítica.
- **Cero imágenes de contenido.** Portadas de proyecto en gradiente CSS, logos
  en SVG teñidos con `mask-image`. La única imagen del sitio, `og-cover.png`,
  no se descarga nunca al visitar la web.
- **Cero dependencias en tiempo de ejecución.** El JS propio suma ~50 KB sin
  minificar, en módulos nativos.
- **Animaciones sólo en `transform` y `opacity`**, siempre en el compositor.
- **Sin listeners de scroll donde se puede evitar.** La navbar usa un
  centinela con `IntersectionObserver`; el scroll spy, otro. Los dos únicos
  listeners de scroll (parallax y botón "arriba") están coalescidos con
  `requestAnimationFrame` y son pasivos.
- **Los observers se desenganchan** en cuanto disparan: nada queda escuchando.
- **Peso total del repositorio: 811 KB**, fuentes y CV incluidos.

---

## 6. Archivos creados

**Páginas (11)**

```
404.html
blog/index.html
blog/_plantilla.html
blog/feed.xml
qa/index.html
test-automation/index.html
playwright/index.html
devops/index.html
github-actions/index.html
solution-consulting/index.html
ai-engineering/index.html
```

**Código (2)**

```
assets/js/chrome.js        Cabecera y pie compartidos por las subpáginas
assets/js/page.js          Punto de entrada de las subpáginas
```

**Activos (3)**

```
assets/fonts/geist-latin-wght-normal.woff2       29 KB
assets/fonts/geist-mono-latin-wght-normal.woff2  23 KB
assets/og-cover.png                              1200×630, generada para esta identidad
```

**Recuperado del stash y ahora versionado**

```
cv/cv_raul_molina_hernandez_2026.pdf
```

---

## 7. Archivos modificados

| Archivo                     | Qué se ha hecho |
|-----------------------------|-----------------|
| `index.html`                | Reescrito completo: 17 bloques, JSON-LD nuevo, SEO nuevo |
| `mentoringB2C/index.html`   | Reescrito con el sistema v4 + secciones "Para quién" y cierre |
| `assets/css/tokens.css`     | Paleta, tipografía y escalas nuevas; `@font-face` autoalojado |
| `assets/css/base.css`       | Reset, textura de fondo, rejillas con tope de columnas |
| `assets/css/components.css` | Componentes reescritos; corregido el bug de contraste del CTA |
| `assets/css/sections.css`   | Reescrito; secciones nuevas de proyectos, trayectoria y subpáginas |
| `assets/css/motion.css`     | Reducido a lo que se usa: reveal, hero, parallax y un keyframe |
| `assets/js/data.js`         | Reescrito: `projects`, `career`, `aiStack`, `heroStats`, `posts` |
| `assets/js/sections.js`     | Plantillas nuevas para todas las secciones |
| `assets/js/dom.js`          | Añadidos `ext()` y `fmtDate()` |
| `assets/js/ui.js`           | Limpieza; `aria-label` dinámico en el botón de menú |
| `assets/js/motion.js`       | Eliminado `initCounters()` (sin uso); pipeline adaptado |
| `assets/js/main.js`         | Comentarios actualizados |
| `assets/js/dom.test.js`     | De 6 tests a **20**: enlaces, SEO, a11y y datos |
| `assets/favicon.svg`        | Marca nueva: check sobre gradiente |
| `sitemap.xml`               | Reescrito, con las landings preparadas en comentario |
| `robots.txt`                | Bloqueo de la plantilla del blog |
| `package.json`              | v3.0.0; `npm test` arreglado para Node ≥ 22 |
| `.gitignore`                | Excepción para el PDF del CV (ver §11) |
| `README.md`                 | Reescrito: cómo editar, qué comprueba el test, limitaciones |

---

## 8. Archivos eliminados

| Archivo                | Motivo |
|------------------------|--------|
| `REFACTOR_REPORT.md`   | Sustituido por este documento |

**Código muerto retirado** (no son archivos, pero cuentan):

- `.grid--4` — definida, nunca usada.
- `@keyframes marquee` y `.marquee-track` — del carrusel de logos descartado.
- `@keyframes dash-flow`, `node-pulse`, `sweep` — de una versión del hero que
  no se llegó a usar.
- `initCounters()` en `motion.js` — las cifras del hero ahora son cadenas
  (`15+`, `<24h`), no números que se puedan contar.
- Clases sin una sola regla CSS (`.problem`, `.case`, `.post`, `.resource`,
  `.ai-card`) en las plantillas de `sections.js`.
- Todo el CSS de componentes de la v3 que ya no existían (`.card--edge`,
  `.tl-step`, `.service-benefits`, `.hero-trust`, `.brand-dot`…).

---

## 9. Recomendaciones para la próxima versión

**Por impacto en conversión, de mayor a menor:**

1. **⏳ PENDIENTE — poner una URL de Calendly o Cal.com en `site.bookingUrl`.**
   Es una línea, y convierte los nueve CTA de "rellenar un formulario" en
   "elegir un hueco". Es la mejora individual más rentable de esta lista, y
   queda anotada como pendiente en `data.js` y en el README. Hasta entonces
   los CTA llevan al formulario, que es el comportamiento correcto: mejor un
   formulario que un calendario roto.
2. **Escribir los tres primeros artículos del blog.** La infraestructura ya
   está: plantilla, RSS, JSON-LD, listado y sitemap. Publicar es copiar un
   archivo y añadir un objeto.
3. **Desarrollar dos landings SEO**, empezando por `/playwright/` y
   `/github-actions/`, que son las de mayor volumen de búsqueda de esa lista.
4. **Sustituir un caso anonimizado por uno con nombre y logo** en cuanto haya
   autorización. Un logo real convierte más que "sector e-commerce".
5. **Una foto tuya en "Sobre mí".** En consultoría de marca personal, la cara
   es un activo de confianza; ahora mismo esa sección es sólo texto.
6. **Testimonios.** Dos o tres citas con nombre, cargo y empresa, entre casos
   y proyectos.

---

## 10. Mejoras a medio plazo

- **Prerenderizado.** Un script de Node que lea `data.js` y escriba el HTML de
  las tarjetas antes de commitear. Elimina la única limitación seria de SEO
  del sitio sin romper el modelo estático ni cambiar cómo se edita.
- **Versión en inglés.** El perfil (AI Engineering, DevOps, consultoría) tiene
  mercado internacional y la web es 100 % en español. Con `hreflang` y una
  carpeta `/en/` que reutilice el mismo `data.js` traducido.
- **CI en GitHub Actions.** `npm test` en cada push, más Lighthouse CI con
  presupuestos. Encaja con el discurso de la propia web: la web de un
  consultor de calidad debería tener su propio quality gate en el pipeline.
- **Analítica sin cookies** (Plausible, Umami o GoatCounter) para saber qué
  secciones se leen y cuáles se saltan. Sin banner de cookies.
- **Concatenar el CSS** en un solo archivo si algún día importa el 97 → 100 de
  móvil. Mantener las cinco fuentes y unirlas en el mismo script de
  prerenderizado.
- **Casos de éxito como páginas propias** cuando haya cinco o más, con su
  `CaseStudy` en JSON-LD.

---

## 11. Riesgos y limitaciones detectadas

**1. Renderizado en cliente (limitación de diseño, asumida).**
El HTML servido lleva el `<h1>`, los `<h2>`, los `lead` de cada sección, todos
los `meta` y el JSON-LD completo. Las tarjetas (servicios, casos, proyectos)
se pintan con JavaScript. Google las rastrea sin problema, pero un rastreador
que no ejecute JS no las verá. Se ha mantenido porque el renderizado desde
`data.js` es lo que hace el sitio fácil de mantener y ampliar, que era un
requisito explícito. La vía de salida está en §10.

**2. Las landings están en `noindex` a propósito.**
No es un olvido. Publicarlas requiere los tres pasos del README, y el test
falla si se dan a medias.

**3. ~~El CV en PDF~~ — resuelto: no se publica.**
Decisión del cliente: la trayectoria completa vive en LinkedIn, que además
está siempre al día. `cv/` vuelve a estar íntegramente en `.gitignore` y se han
retirado los cuatro enlaces al PDF (tarjeta de recursos, botón de "Sobre mí" y
pie de `index.html` y de `chrome.js`). En su lugar, la tarjeta de recursos
enlaza a LinkedIn. Un test nuevo falla si alguien vuelve a enlazar el PDF: el
archivo existe en local pero no en producción, así que el enlace roto no se
notaría hasta después de desplegar.

**4. Cifras del hero y del pipeline.**
`15+ años`, `30+ proyectos`, `10+ sectores` y las métricas de los casos vienen
del contenido anterior y del CV. Los tiempos del pipeline y la salida del
terminal son **ilustrativos**, no telemetría real: si en algún momento un
cliente los interpreta como datos de un proyecto suyo, conviene matizarlo.

**5. Los casos de éxito son reales pero anonimizados.**
No hay nada inventado, pero un evaluador exigente no puede verificarlos. Ver
recomendación 4 de §9.

**6. Cambio de dominio.**
Si la web se mueve a un dominio propio hay que cambiar el prefijo
`/raul-qa-devops-web/` de las rutas absolutas de `404.html` y las URL absolutas
de los `canonical`, `og:url` y JSON-LD. El test de canonical lo detectará
en cuanto se cambie `site.url` en `data.js`.

**7. Compatibilidad de navegador.**
Se usan `mask-image`, `backdrop-filter`, `:focus-visible`, `text-wrap: balance`
y `<details name>` para el acordeón exclusivo. Todo tiene degradación limpia
en navegadores antiguos (el acordeón simplemente deja de ser exclusivo), pero
Internet Explorer y Safari < 15.4 no están soportados. No es un problema para
el público objetivo de esta web.

---

## 12. Verificación realizada

Antes de dar el trabajo por terminado:

- ✅ **20/20 tests** de `npm test` en verde.
- ✅ **Lighthouse en 4 páginas × 2 form factors** (8 auditorías): rendimiento
  97–100, accesibilidad 100, buenas prácticas 100, SEO 100 salvo el `noindex`
  intencionado.
- ✅ **Cero errores de consola y cero peticiones fallidas** en las ocho páginas
  cargadas con Playwright.
- ✅ **Cero desbordamiento horizontal** en 390 px (móvil), 834 px (tablet),
  1440 px (portátil) y 2560 px (ultrawide).
- ✅ **Todos los enlaces internos** resueltos contra el sistema de archivos,
  incluidas las rutas absolutas del 404.
- ✅ **404 verificado** con un servidor que simula el comportamiento de
  GitHub Pages.
- ✅ **Revisión visual sección por sección** en escritorio y móvil. De ahí
  salieron seis correcciones: el contraste del CTA de la navbar, la rejilla
  de dos columnas que pintaba tres, las cifras del hero que rompían a 3+1, la
  pastilla de IA que tapaba la salida del terminal, el nombre de repositorio
  que se desbordaba de la portada y la banda muerta sobre el terminal de IA.

---

**Tiempo total empleado (inicio → fin): 00:41:00**
