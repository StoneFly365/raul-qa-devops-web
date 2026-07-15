# Raúl · QA & DevOps Consulting

Web personal de marca profesional — Business & Solution Consulting Lead especializado en QA, DevOps y AI aplicada al testing.

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
git branch -M main
git push -u origin main
```

## Publicar con GitHub Pages

1. Ve a **Settings → Pages** en tu repositorio
2. En **Source**, selecciona **Deploy from a branch**
3. Selecciona la rama `main` y la carpeta `/ (root)`
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

- HTML/CSS/JS vanilla (sin frameworks, sin build step)
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- [Blossom Carousel](https://blossom-carousel.com/) — carrusel nativo con drag support (CDN)
- Pipeline animado con CSS + JS vanilla
- Scroll reveal con Intersection Observer

## Personalización

| Qué cambiar | Dónde |
|---|---|
| Colores | Variables CSS en `:root` (línea ~19 de `index.html`) |
| Textos | Directamente en el HTML |
| Email | Busca `raulmolinah.madrid@gmail.com` |
| LinkedIn | Busca `linkedin.com/in/raulmolinahernandez` |
| GitHub | Busca `github.com/StoneFly365` |
| Stats (números) | Sección `.stats-bar` |
| Herramientas | Tarjetas dentro de `#stackCarousel` |

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
