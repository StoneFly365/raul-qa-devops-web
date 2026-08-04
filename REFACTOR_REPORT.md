# Informe de rediseño

**Fecha:** 4 de agosto de 2026
**Stack:** sin cambios — HTML + CSS + JavaScript vanilla (módulos ES). Cero dependencias, cero build step.
**Método:** tres ciclos completos de análisis → implementación → validación → reevaluación.

---

## 1. Resumen

| | Antes | Después |
|---|---|---|
| Bloques en la página | 17 | 14 |
| Secciones sólo con marcadores de posición | 3 (logos, testimonios, blog) | 0 |
| Estilos visuales distintos para "herramienta" | 3 (`.tech-card`, `.tech`, `.chip`) | 1 (`.tech`) |
| Tamaño de texto más pequeño | 10 px | 13 px |
| Pesos tipográficos cargados | 7 | 5 |
| Colores cromáticos en pantalla | 4 (verde, cian, ámbar, rojo) | 1 + estado |
| Líneas de código fuente | 2 786 | 2 534 |
| Dependencias de red de terceros | 3 orígenes | 2 orígenes |
| Marcadores `⚠`/`[PENDIENTE]` visibles | 13 | 0 |

Todo verificado en Chromium headless vía CDP: **48 comprobaciones, 48 en verde**, más 7 tests unitarios.

---

## 2. Cambios realizados y por qué

### 2.1 Contenido — menos texto, más escaneable

| Cambio | Motivo |
|---|---|
| Descripciones de los 6 problemas reducidas a una línea; títulos acortados ("Automatización lenta o inexistente" → "Regresión manual") | Una tarjeta con título + párrafo + solución se lee de un vistazo; con tres párrafos, no |
| `desc` de los 7 servicios reducido a una frase | Lo que ya dice la lista de beneficios no se repite arriba |
| Leads de sección recortados a una línea | El `<h2>` ya carga el mensaje; el lead sólo matiza |
| FAQ, metodología, casos y pipeline reescritos más cortos | Misma información, la mitad de palabras |
| Bio de "Sobre mí": 3 párrafos → 2 | El tercero repetía el hero |

### 2.2 Sección "Entornos donde un fallo en producción cuesta caro"

Reescrita entera, como se pidió. **Antes:** título + lead de dos líneas + dos botones de navegación + un marquee animado de 10 tarjetas + una rejilla de 6 recuadros discontinuos con el aviso "⚠ Espacio reservado para logotipos de cliente — pendiente de autorización". Leerla exigía esperar a que el marquee girase.

**Ahora:** el titular (que es bueno y se conserva), una línea de contexto, tres KPIs y una rejilla estática de 10 píldoras de sector. **Se lee en unos 6 segundos, sin esperar ni interactuar.**

Además se fusionó con la antigua sección "Resultados": los KPIs y los sectores dicen lo mismo — dónde y cuánto — y estaban separados por cuatro pantallas.

### 2.3 Herramientas — un único componente

Había **tres tratamientos visuales para lo mismo**: tarjetas verticales de 132 px en el hero (con una categoría a 10,5 px), filas horizontales en la sección de tecnologías, y píldoras sin logo en la sección de IA. Además, el monograma "KA" de Karate iba en verde mientras los 21 logos restantes iban en gris.

Ahora existe **una sola pieza `.tech`** y una sola plantilla `techItem()`: misma altura, mismo radio, mismo tamaño de logo, mismo color, mismo hover. Se usa en el marquee del hero y en la rejilla agrupada por las 4 categorías. La fila de "chips" de IA se eliminó: sus 5 herramientas ya estaban en el grupo *IA & Calidad de código*.

`heroStack` ya no es una lista aparte: sale de `techGroups` (`.slice(0,3)` por categoría), así que **es imposible que hero y sección se desincronicen**, y arriba no se repite entera la sección de abajo.

### 2.4 Tipografía

- Escala mínima subida de **10 px a 13 px**. Desaparecen los tamaños sueltos `.66rem` y `.62rem`.
- `--fs-mono` 11,8 → 13 px · `--fs-xs` 12,8 → 14 px · `--fs-sm` 14 → 15 px.
- **Bug corregido:** con `font-synthesis-weight:none` el sitio pedía peso 600 a Space Grotesk, que sólo tenía 500 y 700 cargados — el navegador degradaba en silencio y la jerarquía de títulos no era la que decía el CSS. Ahora: **display 700, cuerpo 400/600, mono 400/600**, y ni un peso más. Se pasó de 7 pesos descargados a 5.
- Tokens `--fw-body/--fw-medium/--fw-bold`: ningún `font-weight` numérico suelto fuera de `tokens.css`.
- `h2` de 20ch → 24ch: los titulares largos ya no caen a cuatro líneas.

### 2.5 Color — un solo tono

Se eliminó el **segundo acento cian** (`--accent-2`): estaba en el degradado de los KPIs, en el segundo halo del hero y en el terminal, sin significado propio.

El ámbar y el rojo dejan de ser decoración y pasan a ser **exclusivamente estado de ejecución**: sólo aparecen dentro del pipeline y del terminal. En consecuencia:

- Las 6 tarjetas de problema pasan de icono rojo a `icon-box--muted` neutro. El verde queda reservado a la **solución**, que es lo que aporta valor — antes competían.
- Las etiquetas ámbar "próximamente" del blog desaparecen con el blog.
- Los tres puntos del terminal pasan de semáforo rojo/ámbar/verde a gris neutro.

Hay una comprobación automática que recorre el DOM renderizado y falla si aparece cualquier tono cromático que no sea verde, y otra que verifica que el ámbar sólo existe dentro del pipeline.

### 2.6 Arquitectura de información

Orden nuevo, de la duda a la decisión: **Hero → Pipeline → Trayectoria → Diagnóstico → Servicios → Método → Casos → Cita → IA & QA → Tecnologías → Sobre mí → Recursos → FAQ → Contacto.**

- "Tecnologías" se movió detrás de "IA & QA": las dos son la parte técnica y ahora van juntas.
- El menú pasa de 6 destinos a 5 (ley de Hick: menos opciones, decisión más rápida).
- Fondos alternos (`--alt`) recolocados para que ninguna pareja de secciones consecutivas comparta fondo.

### 2.7 Secciones retiradas — decisión explícita

Tres secciones existían **sólo como marcadores de posición**. En una web cuyo objetivo es transmitir credibilidad en 30 segundos, anunciar lo que falta cuesta más de lo que aporta reservar el hueco:

| Retirada | Qué mostraba | Cómo vuelve |
|---|---|---|
| Logos de cliente | 6 recuadros discontinuos "logo-01…logo-06" + aviso ⚠ | `<img>` en `#sectorsGrid` cuando haya autorización de marca |
| Testimonios | 3 tarjetas "[PENDIENTE] · Nombre Apellido · Cargo · Empresa" | Array `testimonials` + `<section>` con `.card` |
| Blog | 7 titulares no pinchables, todos "próximamente", + filtros | Array `blogPosts` con `href` + `<section>` con `.grid--3` |

También se retiraron 3 KPIs `[PENDIENTE]` (quedan los 3 reales) y 3 recursos "Próximamente" (quedan los 3 que se pueden abrir hoy). Todo está documentado en el README con las instrucciones de reactivación.

> **Esto es reversible y es tu decisión de negocio.** Si prefieres mantener el blog visible como declaración de intenciones, dímelo y lo devuelvo en una sección compacta.

---

## 3. Problemas encontrados y resueltos

### Críticos

1. **El CTA principal quedaba invisible justo en la conversión.** `.nav-links a[aria-current="true"]{color:var(--accent)}` tiene más especificidad que `.nav-links .nav-cta{color:var(--on-accent)}`. El CTA apunta a `#contacto`, y el scroll spy incluía el propio CTA en su lista de enlaces: al llegar a la sección de contacto, el botón se volvía **verde sobre verde, contraste 1:1**. Corregido en dos frentes — el spy excluye `.nav-cta`, y la regla CSS incluye el estado `[aria-current]` para que no pueda repetirse.

2. **La página de mentoría estaba completamente rota.** `mentoringB2C/index.html` cargaba `../assets/css/styles.css`, que ya no existe, y usaba el vocabulario de clases antiguo (`.svc`, `.sec-head`, `.btn-accent`, `.hamburger`). Se servía sin ningún estilo. Reescrita sobre el sistema de diseño actual, sin un solo token propio.

3. **Cinco logos iban a desaparecer solos.** El sitio pedía los iconos a `simple-icons@latest` en jsDelivr. Comprobado contra el registro: la versión real es la 16.28.0 y **Playwright, AWS, Azure, Azure DevOps y OpenAI ya no existen en el paquete** — `@latest` los servía desde caché obsoleta. En cuanto jsDelivr refrescase, cinco pastillas se habrían quedado con un hueco vacío, sin error de consola ni petición fallida. Los 21 SVG están ahora autoalojados en `assets/logos/` (28 KB) y un test unitario falla si algún slug se queda sin archivo.

### De diseño

4. **Timeline de metodología desalineada.** Los cinco "entregable:" flotaban a alturas distintas según lo larga que fuera cada descripción. Corregido con filas de grid explícitas (`40px 1fr`) + `align-items:stretch` + `margin-top:auto`: los títulos alinean al píxel y los entregables alinean por su base.

5. **Marcadores de posición gritando en producción** — 13 avisos `⚠` y `[PENDIENTE]` visibles para cualquier visitante.

6. **Contenido duplicado** entre el marquee del hero y la sección de tecnologías (dos listas mantenidas a mano).

### De código

7. **Tokens y CSS muertos:** `--accent-2`, `--fail-soft`, `--sh-sm`, `--sh`, `--sh-glow`, `--s-16`, `--s-20`, `.mono`, `@keyframes shimmer`, `.chip`, `.chip-row`, `.filter`, `.placeholder`, `.tech-card`, `.logo-slot`, `.post`, `.empty-state`, `.quote`, `.avatar`, `.icon-box--danger`. Hay una comprobación que cruza variables definidas contra variables usadas.
8. **`initBlogFilters()`** (26 líneas) eliminado con el blog.

---

## 4. Verificación

**Tests unitarios** (`npm test`, `node --test`, sin frameworks) — **7/7**:
escape de caracteres peligrosos · inserción de `--i` en la etiqueta raíz · etiquetas auto-cerradas · generación de SVG · fallback a monograma · **existencia en disco de los 21 logos** · **el marquee del hero deriva de `techGroups`**.

**Suite funcional en Chromium headless vía CDP** — **48/48**. Escrita en `node --experimental-websocket` sobre WebSocket nativo, sin Puppeteer ni ninguna otra dependencia.

| Grupo | Comprobaciones |
|---|---|
| Render | 13 · recuentos exactos de cada bloque, un solo `h1` |
| Marcadores | 1 · ningún `[PENDIENTE]`, `Próximamente`, `⚠`, `logo-0`, `Nombre Apellido` en el texto renderizado |
| Tipografía | 1 · ningún elemento con texto por debajo de 13 px |
| Paleta | 2 · sólo verde como color de marca; ámbar únicamente dentro del pipeline |
| Contraste | 2 · **todo el texto visible cumple WCAG 2.2 AA** contra su fondo efectivo (4,5:1, o 3:1 en texto grande), calculado elemento a elemento; y el CTA de la navbar legible en la sección de contacto |
| Responsive | 7 · sin scroll horizontal en 320, 375, 414, 768, 1024, 1440 y 2560 px |
| Interacción | 8 · navbar de cristal, volver-arriba, scroll spy exacto y sin parpadeo, pipeline 5/5, contadores, menú móvil, CTA visible en móvil |
| Movimiento reducido | 5 · nada oculto por el reveal, contadores directos, pipeline en estado final, marquee sin animación, parallax desactivado |
| Consola y red | 2 · sin errores, sin peticiones fallidas |
| Mentoría | 5 · estilos aplicados, 3 programas, 5 pasos, un `h1`, sin scroll horizontal |
| Revisión visual | Capturas por sección a 1440 px y 390 px, home y mentoría |

**Errores de compilación / TypeScript / ESLint:** el proyecto es JavaScript vanilla sin build step, sin TypeScript y sin configuración de ESLint, así que no hay nada que compilar ni que lintar. En su lugar se pasó `node --check` a los 7 módulos (sintaxis correcta) y la suite de arriba.

---

## 5. Puntuación final

| Área | Antes | Después | Qué falta para el 10 |
|---|---|---|---|
| **Diseño** | 7,0 | **9,0** | Imagen Open Graph propia; fotografía o retrato en "Sobre mí" |
| **UX** | 6,5 | **9,0** | URL de calendario: reservar convierte mejor que un formulario |
| **Accesibilidad** | 7,5 | **9,5** | Auditoría con lector de pantalla real (NVDA/VoiceOver) |
| **Consistencia** | 5,5 | **9,5** | — |
| **Rendimiento** | 8,0 | **9,0** | Autoalojar las fuentes elimina las 2 conexiones restantes |
| **Profesionalidad** | 6,0 | **9,0** | Testimonios y logos reales; el CV enlazado tiene que existir |

**Media: 6,75 → 9,2**

Las notas anteriores penalizaban sobre todo los marcadores de posición visibles y los tres estilos distintos de herramienta; ambos eran arreglos de alto impacto y bajo coste.

---

## 6. Pendiente

### Bloqueante antes de publicar

1. **`cv/` está en `.gitignore`.** El enlace "Descargar CV" del footer y la tarjeta "CV · PDF" de Recursos dan **404 en producción**, porque el PDF no se despliega. Es una decisión tuya: quitar `cv/` del `.gitignore` y commitear el PDF, o cambiar ambos enlaces a LinkedIn. No lo he tocado porque publicar un CV personal es una decisión de negocio y privacidad, no técnica.

### Alto impacto, bajo esfuerzo

2. **`assets/og-cover.png`** (1200×630) y descomentar el bloque `og:image`. Sin ella, cada vez que compartas el enlace en LinkedIn aparecerá sin imagen.
3. **`site.bookingUrl`** con una URL de Calendly/Cal.com. Los CTAs la recogen solos.
4. **Testimonios y logos de cliente** reales — es lo que más sube la nota de *Profesionalidad*.

### Medio plazo

5. **Autoalojar las fuentes.** Quedan dos conexiones a `fonts.googleapis.com` y `fonts.gstatic.com` en la ruta crítica. Descargar los `.woff2` a `assets/fonts/` con `preload` mejora el LCP.
6. **Endpoint real de formulario** (Formspree, Netlify Forms). El `mailto:` pierde a quien usa webmail sin cliente configurado.
7. **Blog real.** Un directorio `blog/` con una página por artículo; no hace falta CMS.
8. **Analítica sin cookies** (Plausible, Umami) para saber qué CTA convierte.
9. **Página por servicio.** Siete servicios compiten por la misma URL; separarlos daría siete páginas posicionables.

### Deliberadamente no hecho

- **Selector de tema claro/oscuro.** El sitio es oscuro por marca. Añadirlo obliga a mantener dos paletas y a duplicar cada verificación de contraste.
- **Framework, bundler o gestor de paquetes en producción.** Cinco hojas de estilo y siete módulos ES que el navegador carga de forma nativa no lo justifican.
- **Librería de animaciones.** `IntersectionObserver` y las transiciones CSS cubren todo.

---

## 7. Commits sugeridos

Agrupados por temática, del más crítico al más cosmético. Los tres primeros son correcciones de bugs y merecen ir solos.

```bash
# 1 — el CTA principal se volvía ilegible al llegar a contacto
fix(a11y): el CTA de la navbar deja de heredar aria-current

# 2 — la landing B2C se servía sin ningún estilo
fix(mentoring): reescribe la página de mentoría sobre el sistema de diseño actual

# 3 — 5 de 21 logos iban a desaparecer al refrescarse la caché del CDN
fix(assets): autoaloja los logos de Simple Icons y elimina jsDelivr

# 4 — sistema de diseño
refactor(tokens): un solo acento, escala tipográfica desde 13px y dos pesos por familia

# 5 — el punto explícito del encargo
refactor(tech): unifica marquee, rejilla y chips en un único componente .tech

# 6 — el otro punto explícito del encargo
feat(trayectoria): reescribe la sección de sectores y la fusiona con los KPIs

# 7 — credibilidad
refactor(content): retira las secciones que sólo contenían marcadores de posición

# 8 — reducción de carga cognitiva
refactor(content): acorta descripciones, leads y FAQ

# 9 — arquitectura de información
refactor(ia): reordena secciones y reduce el menú a cinco destinos

# 10 — pulido
fix(css): alinea los entregables de la timeline y limpia tokens y reglas muertas

# 11 — red de seguridad
test: verifica logos autoalojados y origen del marquee del hero

# 12 — documentación
docs: actualiza README e informe de rediseño
```
