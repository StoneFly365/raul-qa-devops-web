# Radiografía de nivel QA — diseño

Fecha: 2026-08-08
Estado: aprobado, pendiente de plan de implementación

## Qué es

Una autoevaluación de competencias QA que vive en `/radiografia-qa/`. El
visitante se puntúa en seis ejes técnicos contra el rol al que aspira, y
recibe un diagnóstico que le dice qué le está bloqueando el salto. Es el
lead magnet de la línea B2C (mentoría QA: 50 € sesión, 200 € pack Growth,
400 € pack Leadership).

## Por qué este y no una auditoría de perfil de LinkedIn

Un lead magnet debe demostrar la competencia que se vende. La línea B2C
vende criterio técnico QA; una auditoría de LinkedIn demuestra criterio de
marca personal, compite con decenas de herramientas equivalentes y produce
un resultado que el usuario aplica solo. La radiografía, en cambio,
convierte el propio cuestionario en la muestra gratuita del criterio que se
está vendiendo, y el diagnóstico apunta a brechas que no se cierran leyendo
documentación.

El módulo de LinkedIn queda como continuación posterior, no como primer
paso.

## Principios de construcción

- Sitio estático sobre GitHub Pages: sin backend, sin servicios nuevos, sin
  claves de API.
- Sin dependencias en tiempo de ejecución, igual que el resto del sitio.
- Motor de puntuación en funciones puras, testeado con `node --test`, que es
  lo que ya usa `npm test`.
- Reutilizar CSS, `page.js` y el POST a Formspree que ya existen.

## Los seis ejes

| id | Nombre | Qué mide |
|----|--------|----------|
| `strategy` | Estrategia de pruebas | Qué probar, qué no, riesgo, criterios de release |
| `automation` | Automatización | Código, patrones, mantenibilidad de la suite |
| `api` | API e integración | Contratos, mocks, capa de servicio |
| `cicd` | CI/CD | Pipelines, ejecución en PR, paralelización, inestabilidad |
| `data` | Datos y entornos | Fixtures, aislamiento, reproducibilidad |
| `ai` | IA aplicada a QA | Asistentes en el flujo de pruebas y prueba de sistemas con LLM |

## La escala

Cada ítem se responde en una escala de evidencia de cinco niveles, no de
conocimiento:

| Valor | Etiqueta |
|-------|----------|
| 0 | Nunca lo he visto |
| 1 | Lo he usado |
| 2 | Lo he mantenido |
| 3 | Lo he diseñado |
| 4 | Lo he enseñado |

Es autoinforme, pero calibrado: preguntar por lo que se ha hecho, y no por
lo que se sabe, hace difícil inflar la respuesta sin darse cuenta de que se
está exagerando. Además evita la trivia técnica, que aburre y se contesta
buscando en Google.

## Borrador de los doce ítems

Dos por eje. Este borrador es el punto de partida de la fase 0; los textos
finales los fija Raúl.

**Estrategia de pruebas**

1. Decidir qué **no** se automatiza y justificarlo ante negocio con
   criterio de riesgo.
2. Definir la estrategia de pruebas de un producto entero: niveles,
   cobertura, criterios de entrada y salida de release.

**Automatización**

3. Una suite organizada en capas que otra persona puede extender sin
   preguntarte.
4. Diagnosticar y eliminar la causa raíz de un test inestable, sin
   reintentos ni esperas fijas.

**API e integración**

5. Pruebas de API que cubren contratos y códigos de error, no solo el
   camino feliz.
6. Mocks o virtualización para probar una integración cuyo sistema externo
   no está disponible.

**CI/CD**

7. Un pipeline que ejecuta la suite en cada pull request y bloquea el merge
   si falla.
8. Ejecución paralela o distribuida para bajar el tiempo de la suite en CI.

**Datos y entornos**

9. Tests que crean y limpian sus propios datos y se ejecutan en cualquier
   orden sin interferir.
10. Un entorno de pruebas reproducible que se levanta desde cero.

**IA aplicada a QA**

11. Usar un asistente de IA para generar o mantener casos de prueba,
    revisando y corrigiendo su salida.
12. Probar un sistema que incorpora un LLM: no determinismo, evaluaciones,
    criterios de aceptación.

## Las tres preguntas de contexto

Se hacen antes del cuestionario y son las que permiten comparar contra algo
en vez de dar una puntuación suelta.

1. **A qué apuntas en los próximos doce meses**: QA Automation Mid ·
   QA Automation Senior · SDET · QA Lead.
2. **Años de experiencia**: menos de 2 · 2-5 · 5-10 · más de 10.
3. **Situación**: empleado y quiero crecer · buscando trabajo · freelance ·
   quiero entrar en QA.

## Puntuación

Cada ítem vale de 0 a 4. La puntuación de un eje es la media de sus dos
ítems multiplicada por 25, con lo que queda en una escala de 0 a 100.

Bandas por defecto:

| Banda | Rango |
|-------|-------|
| Junior | 0 – 29 |
| Mid | 30 – 54 |
| Senior | 55 – 79 |
| Lead | 80 – 100 |

El nivel global es la media simple de los seis ejes, y se muestra siempre
acompañado del eje más débil. No se aplica ninguna fórmula de penalización
del eslabón débil: sería más difícil de explicar que de calcular, y el
mensaje que vende sale de la brecha, no del número global.

Los cortes de banda y el perfil esperado por rol son constantes calibrables
declaradas al principio de `radar.data.js`. Son estimaciones hasta que haya
respuestas reales con las que ajustarlas.

Perfil esperado por rol objetivo:

| Rol objetivo | Esperado en todos los ejes | Excepciones |
|--------------|---------------------------|-------------|
| QA Automation Mid | 40 | — |
| QA Automation Senior | 60 | — |
| SDET | 60 | `automation`, `api`, `cicd`: 75 |
| QA Lead | 65 | `strategy`: 80 |

Una **brecha** es un eje cuya puntuación queda por debajo del valor
esperado para el rol objetivo. Se ordenan de mayor a menor diferencia y se
muestran las dos primeras.

## El plan de acción

Una tabla de acciones indexada por eje y banda actual: para cada brecha se
recupera la acción correspondiente a la banda en la que está el usuario. No
hay motor de reglas con predicados; una tabla cubre el caso general con una
fracción del código.

Encima de eso, dos o tres reglas de contexto que sí necesitan mirar las
respuestas de contexto, para los casos en que el consejo cambia de raíz:
quien está buscando trabajo y quien quiere entrar en QA desde fuera.

## Interfaz

Siete pantallas: una de contexto y seis de eje, con sus dos ítems cada una.
Después, la pantalla de resultado.

- Radios nativos dentro de `<fieldset>`. El soporte de teclado y de lector
  de pantalla sale gratis, sin código de accesibilidad propio.
- Las preguntas se escriben en el HTML estático, no se inyectan desde
  JavaScript: la página es indexable y su contenido existe sin JS.
- El avance se guarda en `localStorage` para no perderlo al recargar.
- El resultado se representa con **seis barras horizontales** con el nivel
  esperado marcado, no con un gráfico de radar. Un hexágono es más vistoso
  y menos legible; las barras se leen de un vistazo y son bastante menos
  código.
- Hoja de impresión con `@media print` para que el resultado sea
  imprimible y guardable como PDF. Sin librería de generación de PDF.

## Captura del lead

El resultado se muestra completo y gratis. El email se pide para algo que
la página no puede dar por sí sola:

> ¿Quieres que lo revise yo? Te digo por dónde empezar. Gratis, respondo en
> 48 horas.

Se envía por Formspree, reutilizando `submitViaEndpoint` de `ui.js`, con el
email y el JSON de respuestas y puntuaciones. La respuesta la escribe Raúl
a mano: con el volumen de un sitio de marca personal es asumible, y
convierte mejor que una secuencia automatizada.

En paralelo, un CTA directo a la sesión de 50 €.

**Protección de datos**: recoger emails obliga a una casilla de
consentimiento explícito y a una página de política de privacidad. El
repositorio no tiene ninguna todavía; `/privacidad/` entra en el alcance de
esta entrega.

## Distribución

- Página indexable, al contrario que las siete landings actuales, que están
  en `noindex`.
- Alta en `sitemap.xml`.
- Enlazada desde el home y desde `/mentoringB2C/`.
- Más adelante, un artículo de blog por eje, cada uno cerrando con enlace
  al test.

## Pruebas

`assets/js/radar.test.js` entra sin cambios en el glob actual
(`assets/js/*.test.js`). Casos mínimos:

- Todas las respuestas a 0 y todas a 4: extremos de la escala.
- Un eje justo en el corte de banda, por ambos lados.
- Detección y orden de brechas contra cada rol objetivo.
- Perfil sin ninguna brecha: no debe inventarse un plan.
- Recuperación de la acción correcta para eje y banda.

La suite existente de `dom.test.js` ya comprueba enlaces internos rotos,
metadatos obligatorios e ids duplicados en cada HTML del repositorio. La
página nueva tiene que pasarla sin excepciones.

## Fases

| Fase | Qué |
|------|-----|
| 0 | Contenido: doce ítems, bandas y textos del plan, fijados por Raúl |
| 1 | Motor `radar.js` + `radar.data.js` + tests, sin interfaz |
| 2 | Página, cuestionario y pantalla de resultado |
| 3 | Captura del lead y página de privacidad |
| 4 | SEO, hoja de impresión y enlaces entrantes |

La fase 0 es un requisito previo real, no papeleo: los textos son el
producto y el código es andamiaje.

## Fuera de alcance

- Análisis con LLM de cualquier tipo. Exigiría un backend y una clave de
  API, y el diagnóstico por reglas es más específico y defendible.
- Generación de PDF por librería.
- Herramienta de email marketing o secuencias automatizadas.
- Analítica nueva, hasta que haya tráfico que medir.
- Módulo de perfil de LinkedIn: continuación posterior, ya no es este
  producto.
- Versión B2B del mismo motor sobre un equipo entero: continuación
  posterior.

## Decisiones tomadas

- URL y nombre: `/radiografia-qa/`, "Radiografía de nivel QA".
- Gancho del email: revisión personal gratuita en 48 horas.
- El borrador de los doce ítems lo redacta Claude y lo corrige Raúl.
