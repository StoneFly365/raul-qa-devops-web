# Raúl Molina · QA, Quality Engineering & DevOps Consulting

Web de consultoría B2B — Business & Solution Consulting Lead especializado en QA, Quality Engineering, DevOps y AI aplicada al testing.

## Ejecutar en local

```bash
# Opción 1: con npm (live-server con hot reload)
npm start

# Opción 2: sin instalar nada
# Abre index.html directamente en tu navegador

# Opción 3: con Python (si lo tienes instalado)
python -m http.server 3000
```

La web se abrirá en `http://localhost:3000`.

## Subir a GitHub

```bash
# 1. Inicializar el repositorio
git init
git add .
git commit -m "feat: web personal QA & DevOps consulting"

# 2. Crear el repo en GitHub (con GitHub CLI)
gh repo create raul-qa-devops-web --public --source=. --push

# O si prefieres hacerlo manual:
git remote add origin https://github.com/StoneFly365/raul-qa-devops-web.git
git branch -M master
git push -u origin master
```

## Publicar con GitHub Pages

1. Ve a **Settings → Pages** en tu repositorio
2. En **Source**, selecciona **Deploy from a branch**
3. Selecciona la rama `master` y la carpeta `/ (root)`
4. Guarda y espera ~1 minuto

Tu web estará disponible en:
`https://stonefly365.github.io/raul-qa-devops-web/`

### Dominio personalizado (opcional)

Si tienes un dominio propio:

1. Añade un archivo `CNAME` con tu dominio:
   ```
   tudominio.com
   ```
2. Configura en tu proveedor DNS un registro `CNAME` apuntando a `stonefly365.github.io`
3. En **Settings → Pages**, introduce tu dominio personalizado

## Stack

- HTML/CSS/JS vanilla (sin frameworks, sin bundler, sin build step) — GitHub Pages sirve los archivos tal cual
- ES modules nativos del navegador para separar datos y renderizado (sin npm en producción)
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) 700 + [Inter](https://fonts.google.com/specimen/Inter) 400/600 + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) 400/600 — dos pesos por familia, ni uno más
- Logos de herramientas autoalojados (Simple Icons, CC0) como `mask-image` monocroma: sin CDN de terceros y sin variante para modo oscuro
- Marquee CSS puro (`@keyframes` + `translateX(-50%)`) — sin librería de carrusel
- Pipeline animado, contadores y scroll-spy con JS vanilla + Intersection Observer

## Estructura de carpetas

```
index.html               # marcado semántico + contenedores de sección (ids)
mentoringB2C/index.html  # landing B2C, mismo sistema de diseño y mismo CSS
robots.txt / sitemap.xml
assets/
├── logos/               # 21 SVG monocromos de Simple Icons (autoalojados)
├── css/                 # se cargan en este orden; ninguno usa @import
│   ├── tokens.css       # color, tipografía, espaciado, radios, sombras, tiempos
│   ├── base.css         # reset, tipografía base, primitivas de layout (.wrap, .grid, .section)
│   ├── motion.css       # keyframes y utilidades de animación
│   ├── components.css   # botones, cards, tags, .tech, marquee, navbar, formulario
│   └── sections.css     # composición específica de cada sección
└── js/
    ├── data.js          # TODO el contenido del sitio (edita aquí, no en el HTML)
    ├── dom.js           # utilidades puras: $, esc, icon, render, renderMarquee
    ├── dom.test.js      # smoke test — `npm test`
    ├── sections.js      # plantillas data → HTML de cada bloque
    ├── motion.js        # reveal, contadores, parallax, pipeline
    ├── ui.js            # navbar, scroll spy, menú móvil, formulario
    └── main.js          # punto de entrada
cv/                      # CV personal, ignorado por git (.gitignore) — ver aviso abajo
```

Ver [REFACTOR_REPORT.md](REFACTOR_REPORT.md) para el detalle del rediseño.

## Personalización

| Qué cambiar | Dónde |
|---|---|
| Colores / tipografía / espaciado / sombras | `assets/css/tokens.css` — es la única fuente de verdad |
| Servicios, problemas, KPIs, sectores, tecnologías, metodología, casos, recursos, FAQ | `assets/js/data.js` — añadir un objeto al array correspondiente añade una tarjeta, no hace falta tocar HTML |
| Textos fijos (hero, títulos de sección) | Directamente en `index.html` |
| URL de reserva de reunión | `site.bookingUrl` en `data.js`. Si es `null`, los CTAs llevan al formulario |
| Email | Busca `raulmolinah.madrid@gmail.com` |
| LinkedIn | Busca `linkedin.com/in/raulmolinahernandez` |
| GitHub | Busca `github.com/StoneFly365` |

### ⚠ Antes de publicar

1. **`cv/` está en `.gitignore`.** El enlace "Descargar CV" del footer y la tarjeta
   "CV · PDF" de Recursos apuntan a `cv/cv_raul_molina_hernandez_2026.pdf`, que **no
   se despliega**: en producción dan 404. Decide una de las dos:
   quitar `cv/` del `.gitignore` y commitear el PDF, o cambiar ambos enlaces a LinkedIn.
2. **`assets/og-cover.png`** (1200×630) no existe; el bloque `og:image` está comentado
   en `index.html`. Sin él, LinkedIn comparte el enlace sin imagen.
3. **`site.bookingUrl`** sigue a `null` en `data.js`: los CTAs "Reservar una reunión"
   llevan al formulario. Al poner una URL de Calendly/Cal.com apuntan a ella solos.

### Contenido que se reactiva cuando exista

No hay ningún marcador de posición visible en producción — un `[PENDIENTE]` o un
"Nombre Apellido" delante de un cliente cuesta más credibilidad de la que aporta el
hueco reservado. Estas secciones se retiraron y vuelven en cuanto haya contenido real:

| Sección | Qué hace falta | Cómo se reactiva |
|---|---|---|
| Logos de cliente | Autorización de marca | `<img>` dentro de `#sectorsGrid`, sustituyendo las píldoras de sector |
| Testimonios | Recomendaciones reales de LinkedIn | Array `testimonials` + una `<section>` con `.card` |
| Blog | Al menos un artículo publicado | Array `blogPosts` con `href` + `<section>` con `.grid--3` |
| KPIs adicionales | Cifras confirmadas | Un objeto más en `metrics`; el contador ya es automático |

## Decisiones técnicas

- **Sin build step**: GitHub Pages sirve estático; un bundler (Vite/Webpack) añadiría complejidad de CI sin necesidad real para este volumen de contenido. Los ES modules nativos ya dan separación de código sin esa dependencia.
- **Datos separados del marcado** (`data.js`): añadir un servicio o un caso de éxito no debería requerir editar HTML repetido; se añade un objeto y `sections.js` lo pinta.
- **CSS en cinco archivos, no en uno**: se cargan en paralelo sobre HTTP/2 y ninguno usa `@import` (que serializaría las descargas). A este tamaño el coste de red es despreciable frente a la mantenibilidad.
- **Sin listeners de `scroll` para el trabajo pesado**: reveal, contadores, navbar y pipeline usan `IntersectionObserver` y dejan de observar en cuanto disparan.
- **Formulario sin backend**: compone un `mailto:` con los datos ya validados y codificados. Para usar un endpoint real, añade `action`/`method` al `<form>` y elimina `initContactForm()`.
- **Sin librería de carrusel externa**: marquee de CSS puro (loop con contenido duplicado + `translateX(-50%)`), sin dependencia de red ni request bloqueante.
- **Un solo color de marca**: verde y neutros. El ámbar y el rojo existen sólo como *estado de ejecución* dentro del pipeline y el terminal; ninguna tarjeta los usa de adorno. Cualquier color nuevo en el sistema es una decisión, no un detalle.
- **Un solo componente de herramienta** (`.tech`): el marquee del hero y la rejilla de tecnologías comparten pieza y plantilla. Antes había tres tratamientos visuales para lo mismo.
- **Logos autoalojados**: `simple-icons@latest` en jsDelivr servía desde caché cinco iconos que ya no existen en el paquete (Playwright, AWS, Azure, Azure DevOps, OpenAI). Habrían desaparecido en silencio; ahora viven en `assets/logos/` (28 KB en total).
- **Dos pesos por familia**: con `font-synthesis-weight:none`, pedir un peso no cargado degradaba en silencio al más cercano — de ahí que la jerarquía de títulos no fuera consistente.

## Claude Code · Ponytail

Ponytail es un modo de desarrollo para Claude Code que fuerza la solución más simple que funciona. Activo por defecto en este proyecto mediante startup hook.

**Principio:** parar en el primer escalón que aguante — stdlib antes que librería, una línea antes que cincuenta, borrar antes que añadir.

### Instalación

Ponytail se activa automáticamente vía `.claude/settings.local.json`. Sin instalación manual.

Si lo necesitas en otro proyecto, añade en `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'PONYTAIL MODE ACTIVE — level: full'"
          }
        ]
      }
    ]
  }
}
```

### Uso

Escribe tu tarea con normalidad. Ponytail filtra en cada respuesta:

```
"Añade caché a esta función"
→ @lru_cache(maxsize=1000), no una clase custom

"Necesito validar emails"
→ regex de una línea o stdlib, no una librería

"Crea un endpoint para X"
→ mínimo que funciona, sin capas innecesarias
```

### Comandos

| Comando | Qué hace |
|---|---|
| `/ponytail-review` | Revisa el diff actual buscando qué borrar o simplificar |
| `/ponytail-audit` | Audita todo el repo: lista qué borrar, simplificar o reemplazar |
| `/ponytail-debt` | Lista los shortcuts marcados con `ponytail:` en el código |
| `/ponytail-gain` | Muestra el impacto medido: menos código, menos coste, más velocidad |
| `/ponytail-help` | Referencia rápida de todos los modos y comandos |
| `/ponytail lite` | Reduce la intensidad del filtro |
| `/ponytail ultra` | Máxima austeridad |
| `stop ponytail` | Desactiva el modo y vuelve al comportamiento normal |

### Marcas en el código

Cuando ponytail deja un shortcut deliberado, lo marca con un comentario:

```js
// ponytail: global lock, per-account locks if throughput matters
```

Usa `/ponytail-debt` para listar todos estos marcadores.

## Licencia

MIT
