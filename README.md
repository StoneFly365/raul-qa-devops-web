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
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- Marquee CSS puro (`@keyframes` + `translateX(-50%)`) para las franjas de sectores y stack tecnológico — sin librería de carrusel externa
- Pipeline animado, contadores y scroll-spy con JS vanilla + Intersection Observer

## Estructura de carpetas

```
index.html              # marcado semántico + contenedores de sección (ids)
assets/
├── css/styles.css       # todo el CSS del sitio
└── js/
    ├── data.js          # contenido de todas las tarjetas/listas (edita aquí, no en el HTML)
    ├── render.js         # helpers genéricos data → DOM (renderCards, renderMarquee, renderChips)
    └── main.js           # orquesta el render inicial + comportamiento (reveal, contadores, scroll-spy, menú móvil, volver arriba, pipeline)
cv/                      # CV personal, ignorado por git (.gitignore)
```

## Personalización

| Qué cambiar | Dónde |
|---|---|
| Colores / tokens de diseño | Variables CSS en `:root` de `assets/css/styles.css` |
| Servicios, problemas, sectores, casos de éxito, tecnologías, timeline, blog | `assets/js/data.js` — añadir un objeto al array correspondiente añade una tarjeta, no hace falta tocar HTML |
| Textos fijos (hero, títulos de sección) | Directamente en `index.html` |
| Email | Busca `raulmolinah.madrid@gmail.com` |
| LinkedIn | Busca `linkedin.com/in/raulmolinahernandez` |
| GitHub | Busca `github.com/StoneFly365` |
| Stats del hero (números) | `data-count`/`data-suffix` en `.stats-bar` dentro de `index.html` |

## Decisiones técnicas

- **Sin build step**: GitHub Pages sirve estático; un bundler (Vite/Webpack) añadiría complejidad de CI sin necesidad real para este volumen de contenido. Los ES modules nativos ya dan separación de código sin esa dependencia.
- **Datos separados del marcado** (`data.js`): añadir un servicio o un caso de éxito no debería requerir editar HTML repetido; se añade un objeto y `render.js` lo pinta.
- **Sin librería de carrusel externa**: el `@blossom-carousel` (CDN) que usaba la versión anterior se sustituyó por un marquee de CSS puro (loop con contenido duplicado + `translateX(-50%)`), eliminando una dependencia de red y una render-blocking request.
- **`--text-faint` y contraste AA**: el token se aclaró (`#4D5D73` → `#6E8098`) tras auditar contraste; varios usos sobre fondos `--surface` se movieron a `--text-dim`, que sí cumple 4.5:1 en ambos fondos del sistema.

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
