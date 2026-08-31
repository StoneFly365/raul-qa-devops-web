/* =============================================================
   DATA — todo el contenido del sitio, separado del marcado.
   Añadir una tarjeta = añadir un objeto aquí. Nada más.

   Regla que gobierna este archivo: sólo entra contenido real.
   Ningún "[PENDIENTE]" ni "Lorem ipsum" delante de un cliente
   potencial: el hueco reservado cuesta más credibilidad de la que
   aporta. Lo que aún no existe (artículos del blog) se declara
   como lista vacía y la sección se oculta sola.
   ============================================================= */

export const site = {
  name: 'Raúl Molina Hernández',
  role: 'QA · DevOps · AI Engineering',
  title: 'Business & Solutions Consulting Lead',
  url: 'https://stonefly365.github.io/raul-qa-devops-web/',
  email: 'raulmolinah.madrid@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raulmolinahernandez/',
  github: 'https://github.com/StoneFly365',
  location: 'Madrid, España',

  /* Agenda online. Los nueve CTA "Reservar una reunión" abren este
     calendario en pestaña nueva (`wireBookingCtas()` en sections.js).
     Si algún día vuelve a ser null, caen solos al formulario
     (#contacto): mejor un formulario que un calendario roto. */
  bookingUrl: 'https://calendly.com/raulmolinah-madrid/30min',

  /* Endpoint del formulario de contacto (Formspree, Basin, Netlify…).
     Vacío = el formulario compone un mailto (puede fallar en silencio si
     el visitante usa webmail sin cliente de correo configurado).
     Con una URL aquí, el envío pasa a POST por fetch: el lead se captura
     de verdad y el visitante no sale de la página. Pega tu endpoint
     (p. ej. https://formspree.io/f/xxxxxxx) y listo, sin backend. */
  formEndpoint: 'https://formspree.io/f/xdenkpey',
};

export const mailto = (subject) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const bookingHref = site.bookingUrl || '#contacto';

/* -------------------------------------------------------------
   ICONOS — atributos del <path> de Heroicons (outline, 24×24).
   Se inyectan con la utilidad icon() de dom.js. Un solo trazo por
   icono: los de dos paths no encajan con el resto del set.
   ------------------------------------------------------------- */
const I = {
  bolt:      'd="M13 10V3L4 14h7v7l9-11h-7z"',
  clock:     'd="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"',
  alert:     'd="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-8.99-9.75h.008v.008h-.008v-.008z"',
  cross:     'd="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"',
  doc:       'd="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"',
  sparkles:  'd="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"',
  check:     'd="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"',
  arrow:     'd="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"',
  users:     'd="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"',
  academic:  'd="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"',
  shield:    'd="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"',
  cog:       'd="M4.5 12a7.5 7.5 0 0113.06-5.04M19.5 12a7.5 7.5 0 01-13.06 5.04M16.5 3.75h3.75v3.75M7.5 20.25H3.75V16.5"',
  chart:     'd="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"',
  db:        'd="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"',
  map:       'd="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"',
  info:      'd="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"',
  building:  'd="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01"',
  cart:      'd="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"',
  plane:     'd="M2.5 19h19M6 19l1.5-6.5L21 9l-1-2-13 2.5L4 6 2 6.5l1.5 4L2 12l.5 2 3-1"',
  train:     'd="M4 17h16M5 17V10l2-5h10l2 5v7M8 21v-2m8 2v-2M4 13h16M7 6.5h10"',
  car:       'd="M5 17h14M6 17V9l2-3h8l2 3v8M9 17v-3h6v3M7 21l-1-4m11 4l1-4"',
  game:      'd="M6 12h4m-2-2v4m7-3h.01M17.5 13h.01M15 8h4a3 3 0 013 3v2a3 3 0 01-3 3H5a3 3 0 01-3-3v-2a3 3 0 013-3h4"',
  signal:    'd="M12 20h.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0M2 9.5a15 15 0 0120 0"',
  terminal:  'd="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"',
  branch:    'd="M6 3v12m0 0a3 3 0 103 3 3 3 0 00-3-3zm0-12a3 3 0 100 6 3 3 0 000-6zm12 0a3 3 0 100 6 3 3 0 000-6zm0 6c0 6-12 3-12 9"',
  cube:      'd="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"',
  target:    'd="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"',
  rocket:    'd="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.9 14.9 0 01-5.84 2.58m0 0a6 6 0 01-7.38-5.84h4.8m2.58-5.96a14.9 14.9 0 00-2.58 5.84m2.58-5.84a14.9 14.9 0 015.84-2.58"',
};

/* =============================================================
   HERO — señales de confianza bajo los CTA
   ============================================================= */
export const heroStats = [
  { value: '15+',  label: 'años en QA & DevOps' },
  { value: '30+',  label: 'proyectos enterprise' },
  { value: '10+',  label: 'sectores regulados' },
  { value: '<24h', label: 'tiempo de respuesta' },
];

/* =============================================================
   SECTORES — prueba social sin logos de cliente
   ============================================================= */
/* Sin logos inventados: sólo sectores donde ha habido proyecto real.
   Cuando haya autorización de marca, sustituir por <img> dentro del
   mismo contenedor sin tocar nada más. */
export const sectors = [
  { name: 'Banca',                  icon: I.building },
  { name: 'Seguros',                icon: I.shield },
  { name: 'Energía',                icon: I.bolt },
  { name: 'Retail',                 icon: I.cart },
  { name: 'Educación superior',     icon: I.academic },
  { name: 'Aviación y viajes',      icon: I.plane },
  { name: 'Transporte ferroviario', icon: I.train },
  { name: 'Automoción',             icon: I.car },
  { name: 'Gaming',                 icon: I.game },
  { name: 'Telecomunicaciones',     icon: I.signal },
];

/* =============================================================
   HOW I HELP — los seis frentes de trabajo
   ============================================================= */
/* `desc` es UNA frase. Todo lo que quepa en `benefits` no se repite
   en el párrafo: la tarjeta debe leerse en cinco segundos.
   `page` enlaza a la landing SEO correspondiente cuando exista. */
export const services = [
  {
    id: 'qa-engineering',
    tag: 'estrategia',
    icon: I.target,
    title: 'QA Engineering',
    desc: 'De testing reactivo a ingeniería de calidad integrada en el desarrollo.',
    benefits: [
      'Estrategia basada en riesgo, no en volumen de casos',
      'Criterios de aceptación testables desde el requisito',
      'Métricas que dirección entiende y usa para decidir',
    ],
    page: 'qa/',
    subject: 'QA Engineering · Consulta',
  },
  {
    id: 'test-automation',
    tag: 'automatización',
    icon: I.bolt,
    title: 'Test Automation',
    desc: 'Frameworks E2E, API y contrato que tu equipo mantiene sin depender de mí.',
    benefits: [
      'Playwright, Karate DSL, Cypress y WebdriverIO',
      'Suites deterministas: se acaba el "vuelve a lanzarlo"',
      'Regresión completa en minutos, en cada pull request',
    ],
    page: 'test-automation/',
    subject: 'Test Automation · Consulta',
  },
  {
    id: 'devops',
    tag: 'entrega',
    icon: I.cog,
    title: 'DevOps',
    desc: 'Entornos que no fallan y métricas que no se estiman, para entregar a diario.',
    benefits: [
      'Entornos de prueba efímeros, creados y destruidos por el pipeline',
      'Contenedores que acaban con el "en mi máquina funciona"',
      'Métricas DORA instrumentadas, no estimadas',
    ],
    page: 'devops/',
    subject: 'DevOps · Consulta',
  },
  {
    id: 'cicd',
    tag: 'pipelines',
    icon: I.branch,
    title: 'CI/CD',
    desc: 'Pipelines que bloquean un release roto antes de que llegue a producción.',
    benefits: [
      'Quality gates que el equipo respeta, no esquiva',
      'GitHub Actions y Azure DevOps de punta a punta',
      'Paralelización y caché: pipelines de minutos, no de horas',
    ],
    page: 'github-actions/',
    subject: 'CI/CD · Consulta',
  },
  {
    id: 'solution-consulting',
    tag: 'preventa',
    icon: I.chart,
    title: 'Solution Consulting',
    desc: 'El puente entre lo que negocio necesita y lo que ingeniería puede construir.',
    benefits: [
      'Diseño de solución y estimación defendible',
      'Interlocución técnica en preventa y comité',
      'Roadmap priorizado por impacto y esfuerzo',
    ],
    page: 'solution-consulting/',
    subject: 'Solution Consulting · Consulta',
  },
  {
    id: 'ai-engineering',
    tag: 'ia aplicada',
    icon: I.sparkles,
    title: 'AI Engineering',
    desc: 'Agentes y LLMs dentro del ciclo de entrega, con resultado medible.',
    benefits: [
      'Claude Code, MCP y GitHub Copilot en el pipeline',
      'Generación y mantenimiento asistido de tests',
      'Productividad medida, no prometida',
    ],
    page: 'ai-engineering/',
    subject: 'AI Engineering · Consulta',
  },
];

/* =============================================================
   PROBLEMAS QUE RESUELVO
   ============================================================= */
export const problems = [
  {
    icon: I.clock,
    title: 'Regresión manual',
    desc: 'Cada release se bloquea días esperando pruebas a mano.',
    solution: 'Framework mantenible ejecutándose en cada pull request.',
  },
  {
    icon: I.cross,
    title: 'CI/CD frágil',
    desc: 'Tests flaky que el equipo aprende a ignorar en vez de a confiar.',
    solution: 'Quality gates deterministas y datos de test aislados.',
  },
  {
    icon: I.alert,
    title: 'Fallos en producción',
    desc: 'Los defectos críticos aparecen después del despliegue, no antes.',
    solution: 'Shift-left: la calidad empieza en el requisito, no en el sprint final.',
  },
  {
    icon: I.doc,
    title: 'Sin estrategia de QA',
    desc: 'Testing reactivo, sin plan de riesgos compartido con negocio.',
    solution: 'Estrategia por riesgo con métricas DORA visibles para dirección.',
  },
  {
    icon: I.sparkles,
    title: 'IA sin criterio',
    desc: 'Herramientas compradas y nunca integradas en el ciclo de calidad.',
    solution: 'Agentes dentro del pipeline, con impacto medible en cada build.',
  },
  {
    icon: I.users,
    title: 'Equipo atascado',
    desc: 'Más tiempo re-ejecutando pruebas que diseñando cobertura nueva.',
    solution: 'Transferencia de conocimiento para que el equipo avance solo.',
  },
];

/* =============================================================
   CASOS DE ÉXITO
   ============================================================= */
/* Anonimizados por confidencialidad. Para añadir uno: copia un objeto
   y cambia los campos. `metric` es la cifra grande de la tarjeta;
   `kpis` son las secundarias. */
/* Escenarios de encargo, no casos de cliente con métricas.
   Deliberadamente SIN cifras: los proyectos públicos de `projects` son
   la prueba verificable, y una métrica de cliente que no se puede
   comprobar resta más credibilidad de la que suma. Si algún día hay
   datos reales y autorización para publicarlos, este array vuelve a
   ser `caseStudies` — no antes. */
export const approaches = [
  {
    tag: 'Regresión manual',
    title: 'Cuando la regresión bloquea cada release',
    problem: 'El equipo dedica el final de cada ciclo a ejecutar casos a mano. La release depende de que alguien termine a tiempo y no queda margen para diseñar cobertura nueva.',
    solution: 'Empiezo por los flujos críticos de negocio, no por la cobertura total: framework E2E con Playwright, datos de test aislados por ejecución y ejecución en cada pull request. El quality gate llega después, cuando la suite ya es fiable.',
    result: 'La regresión deja de ser un hito del calendario y pasa a ser un paso del pipeline. QA recupera el tiempo para lo que no se puede automatizar.',
    kpis: ['Playwright', 'Datos aislados', 'Ejecución en cada PR'],
  },
  {
    tag: 'Integraciones frágiles',
    title: 'Cuando un cambio de backend rompe a terceros',
    problem: 'Los contratos entre servicios viven en la documentación, no en el pipeline. Un cambio aparentemente menor rompe a un consumidor y se descubre en producción.',
    solution: 'Pruebas de contrato con Karate DSL como paso obligatorio en el merge, más un mock server para que los equipos consumidores dejen de esperarse entre sí.',
    result: 'Los breaking changes aparecen en CI, delante de quien los ha escrito, en vez de en una llamada de incidencia de madrugada.',
    kpis: ['Karate DSL', 'Contract testing', 'Mock server'],
  },
  {
    tag: 'Dependencia externa',
    title: 'Cuando el conocimiento se va con el consultor',
    problem: 'La mejora de calidad depende de una persona de fuera. Mientras está, funciona; cuando termina el contrato la suite se degrada y nadie sabe por qué falla.',
    solution: 'Mentoring técnico y pair-programming sobre el código real del cliente, documentación viva en el propio repositorio y rotación del rol de owner de la suite desde el primer mes.',
    result: 'El objetivo del encargo es que deje de hacer falta: el equipo mantiene y amplía la suite sin soporte externo.',
    kpis: ['Pair-programming', 'Documentación viva', 'Traspaso desde el día uno'],
  },
];

/* =============================================================
   PROYECTOS — código público, clonable hoy
   ============================================================= */
/* `cover` define la ilustración generada por CSS (sin imágenes que
   descargar): `glyph` es el símbolo y `hue` gira el gradiente base.
   Para añadir un proyecto basta con otro objeto igual. */
export const projects = [
  {
    title: 'Framework de API testing con Karate DSL',
    repo: 'karate-exercises',
    desc: 'Plantilla Maven para pruebas de API y de contrato con Karate: ejecución en paralelo, filtrado por tags (@smokeTest, @regression) y configuración por entorno, contenedorizada con Docker.',
    tech: ['Karate DSL', 'Java', 'Maven', 'Docker'],
    tags: ['Test Automation'],
    github: 'https://github.com/StoneFly365/karate-exercises',
    cover: { glyph: '▣', hue: 0 },
  },
  {
    title: 'Quality Gate propio en GitHub Actions',
    repo: 'devsecops-pipeline-sonarqube-defectdojo',
    desc: 'Pipeline con SonarQube y DefectDojo sobre una aplicación de referencia: Quality Gate propio de 13 condiciones que bloquea el merge y hallazgos centralizados en un único panel.',
    tech: ['GitHub Actions', 'SonarQube', 'DefectDojo', 'Docker'],
    tags: ['CI/CD'],
    github: 'https://github.com/StoneFly365/devsecops-pipeline-sonarqube-defectdojo',
    cover: { glyph: '⬡', hue: 28 },
  },
  {
    title: 'E2E con MCP y Claude Code',
    repo: 'playwright-demo-ia-mcp',
    desc: 'Pipeline público que ejecuta la suite E2E, revisa los selectores frágiles con un agente y genera un informe ejecutivo en cada build.',
    tech: ['Playwright', 'MCP', 'Claude Code', 'GitHub Actions'],
    tags: ['AI Engineering', 'CI/CD'],
    github: 'https://github.com/StoneFly365/playwright-demo-ia-mcp',
    cover: { glyph: '◈', hue: 56 },
    featured: true,
  },
  {
    title: 'Calidad del dato con IA',
    repo: 'data-quality-ia',
    desc: 'Detección de anomalías en datos y reducción de incidencias en producción mediante modelos de lenguaje sobre los propios flujos de negocio.',
    tech: ['TypeScript', 'LLM', 'Data Quality'],
    tags: ['AI Engineering'],
    github: 'https://github.com/StoneFly365/data-quality-ia',
    cover: { glyph: '⌗', hue: 84 },
  },
  {
    title: 'De reunión grabada a plan de pruebas',
    repo: 'faster-whisper',
    desc: 'Transcribe vídeo con faster-whisper y, mediante una skill propia de Claude Code, genera un plan de pruebas en Markdown listo para llevar a Playwright.',
    tech: ['Python', 'faster-whisper', 'Claude Code'],
    tags: ['AI Engineering', 'Developer Productivity'],
    github: 'https://github.com/StoneFly365/faster-whisper',
    cover: { glyph: '❯', hue: 112 },
  },
  {
    title: 'Testing de APIs con Playwright',
    repo: 'api-playwright-reqres',
    desc: 'Suite de pruebas de API sobre ReqRes: validación de endpoints, esquemas de respuesta y escenarios de error reales.',
    tech: ['Playwright', 'TypeScript', 'API Testing'],
    tags: ['Test Automation'],
    github: 'https://github.com/StoneFly365/api-playwright-reqres',
    cover: { glyph: '⇄', hue: 140 },
  },
];

/* =============================================================
   TRAYECTORIA PROFESIONAL
   ============================================================= */
/* Cinco etapas reales, no cinco títulos inventados. `now: true`
   marca la etapa actual y pinta el nodo con el acento.

   Sólo período, rol y empresas: la línea de tiempo cuenta la
   progresión, no la sustituye. El detalle de cada etapa vive en
   LinkedIn, que además está al día. */
export const career = [
  { period: '2011 — 2014', role: 'QA Engineer', org: 'MTP · NTT DATA · Glokal Consulting' },
  { period: '2015 — 2019', role: 'Automation Engineer', org: 'Leda MC · BBVA · Exceltic · FCM Travel' },
  { period: '2019 — 2022', role: 'QA Lead', org: 'Sngular · Z1 · Clicars' },
  { period: '2023 — 2025', role: 'Quality Engineer & DevOps', org: 'BBVA Next · iryo · itegGO' },
  { period: '2026 — hoy', role: 'Solution Consulting & AI Engineering', org: 'atmira · Tech Hub', now: true },
];

/* =============================================================
   AI ENGINEERING
   ============================================================= */
export const aiCapabilities = [
  { icon: I.doc,      title: 'Generación de casos',        desc: 'Desde historias de usuario: escenarios límite, datos de entrada y criterios de aceptación testables.' },
  { icon: I.info,     title: 'Análisis de requisitos',     desc: 'Ambigüedades y huecos de cobertura detectados antes de escribir el primer test.' },
  { icon: I.sparkles, title: 'Agentes autónomos',          desc: 'Ejecutan, revisan y proponen correcciones dentro del pipeline, no en una demo aparte.' },
  { icon: I.check,    title: 'Quality gates inteligentes', desc: 'Umbrales que se ajustan al riesgo del cambio, no un porcentaje fijo para todo.' },
  { icon: I.db,       title: 'Datos sintéticos',           desc: 'Datasets realistas para pruebas sin exponer un solo registro de producción.' },
  { icon: I.rocket,   title: 'Developer productivity',     desc: 'Automatización del trabajo repetitivo del equipo, con el ahorro medido en horas.' },
];

/* Herramientas de IA con las que trabajo a diario. `slug` = SVG
   autoalojado en assets/logos. */
export const aiStack = [
  { name: 'Claude Code',       slug: 'claude',                 note: 'Agente en terminal y en CI' },
  { name: 'MCP',               slug: 'modelcontextprotocol',   note: 'Contexto de la app para el agente' },
  { name: 'OpenAI',            slug: 'openai',                 note: 'Modelos para análisis y generación' },
  { name: 'GitHub Copilot',    slug: 'githubcopilot',          note: 'Asistencia en el editor y en PR' },
  { name: 'Prompt Engineering', mono: 'PE',                    note: 'Prompts versionados como código' },
  { name: 'AI Workflows',      mono: 'AW',                     note: 'Orquestación de agentes en pipeline' },
];

/* =============================================================
   METODOLOGÍA
   ============================================================= */
export const methodology = [
  { step: '01', name: 'Assessment', desc: 'Procesos, herramientas, deuda de pruebas y riesgos. Métricas objetivas, no opiniones.', output: 'Informe de madurez QA' },
  { step: '02', name: 'Roadmap',    desc: 'Plan priorizado por impacto y esfuerzo, con fechas realistas para tu capacidad real.', output: 'Roadmap trimestral' },
  { step: '03', name: 'Automation', desc: 'Framework, suites y quality gates implementados en pareja con tus ingenieros.',       output: 'Suite viva en CI/CD' },
  { step: '04', name: 'AI',         desc: 'Agentes y LLMs donde aportan medible: generación, revisión y reporting.',             output: 'Agentes en pipeline' },
  { step: '05', name: 'Training',   desc: 'Transferencia de conocimiento para que el equipo evolucione sin dependencia externa.', output: 'Equipo autónomo' },
];

/* =============================================================
   STACK
   ============================================================= */
/* slug = SVG monocromo autoalojado en assets/logos (Simple Icons, CC0),
   teñido con mask-image. Sin slug → monograma de `mono`.
   El test de dom.test.js falla si un slug se queda sin archivo. */
export const techGroups = [
  {
    name: 'Test Automation',
    items: [
      { name: 'Playwright',  slug: 'playwright' },
      { name: 'Selenium',    slug: 'selenium' },
      { name: 'Cypress',     slug: 'cypress' },
      { name: 'Appium',      slug: 'appium' },
      { name: 'WebdriverIO', slug: 'webdriverio' },
      { name: 'Cucumber',    slug: 'cucumber' },
      { name: 'Postman',     slug: 'postman' },
      { name: 'Karate DSL',  mono: 'KA' },
    ],
  },
  {
    name: 'Control de versiones & CI/CD',
    items: [
      { name: 'GitHub',         slug: 'github' },
      { name: 'GitLab',         slug: 'gitlab' },
      { name: 'GitHub Actions', slug: 'githubactions' },
      { name: 'Azure DevOps',   slug: 'azuredevops' },
      { name: 'Jenkins',        slug: 'jenkins' },
      { name: 'Docker',         slug: 'docker' },
      { name: 'Azure',          slug: 'microsoftazure' },
    ],
  },
  {
    name: 'Lenguajes',
    items: [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Java',       slug: 'openjdk' },
      { name: 'Node.js',    slug: 'nodedotjs' },
    ],
  },
  {
    name: 'IA & Calidad de código',
    items: [
      { name: 'Claude Code',    slug: 'claude' },
      { name: 'GitHub Copilot', slug: 'githubcopilot' },
      { name: 'OpenAI',         slug: 'openai' },
      { name: 'MCP',            slug: 'modelcontextprotocol' },
      { name: 'SonarQube',      slug: 'sonarqubeserver' },
    ],
  },
];

/* =============================================================
   RECURSOS
   ============================================================= */
/* El CV no se publica como PDF descargable: la trayectoria completa
   vive en LinkedIn, que además está siempre actualizada. */
export const resources = [
  {
    type: 'Perfil',
    icon: I.doc,
    title: 'Trayectoria completa',
    desc: 'Quince años de proyectos, tecnologías y equipos, al día en LinkedIn.',
    href: site.linkedin,
    external: true,
    cta: 'Ver en LinkedIn',
  },
  {
    type: 'Gratis',
    icon: I.shield,
    title: 'Radiografía de nivel QA',
    desc: 'Doce preguntas y sabrás en qué ejes estás por debajo del rol al que apuntas.',
    href: 'radiografia-qa/',
    cta: 'Hacer la radiografía',
  },
  {
    type: 'Servicio',
    icon: I.users,
    title: 'Mentoría QA individual',
    desc: 'Programa 1:1 para ingenieros que dan el salto a Quality Engineering.',
    href: 'mentoringB2C/',
    cta: 'Ver programa',
  },
  {
    type: 'Código',
    icon: I.terminal,
    title: 'Repositorios públicos',
    desc: 'Pipelines, agentes y frameworks de prueba que puedes clonar hoy.',
    href: 'https://github.com/StoneFly365',
    external: true,
    cta: 'Ver en GitHub',
  },
];

/* =============================================================
   FAQ
   ============================================================= */
export const faqs = [
  { q: '¿Cuánto dura un proyecto típico?', a: 'Un assessment son días; una implementación de pipeline, semanas; el advisory continuado se revisa mes a mes.' },
  { q: '¿Trabajas con equipos pequeños o solo con grandes cuentas?', a: 'Con ambos. El método se adapta al tamaño y madurez de cada organización, no al revés.' },
  { q: '¿Qué pasa si ya tenemos un equipo de QA?', a: 'Trabajo junto a tu equipo, no lo sustituyo. El mentoring existe precisamente para que el conocimiento se quede dentro.' },
  { q: '¿La IA va a sustituir a mi equipo de QA?', a: 'No. Sustituye el trabajo repetitivo del equipo de QA. El criterio sobre qué merece la pena probar sigue siendo humano, y ahí es donde tu equipo aporta.' },
  { q: '¿Trabajas en remoto?', a: 'Sí, remoto-friendly. Base en Madrid, zona horaria Europe/Madrid.' },
  { q: '¿Puedo empezar con algo pequeño?', a: 'Sí. El assessment inicial es un primer paso de bajo riesgo antes de comprometerse a nada más.' },
  { q: '¿Cómo empezamos?', a: 'Con una conversación de 30 minutos sin compromiso. Respondo en menos de 24 horas.' },
];

/* =============================================================
   PIPELINE — elemento de firma bajo el hero
   ============================================================= */
export const pipelineStages = [
  { name: 'commit',   time: '4s',     desc: 'Criterios de aceptación testables desde el primer día.' },
  { name: 'build',    time: '38s',    desc: 'Entornos reproducibles en GitHub Actions o Azure DevOps.' },
  { name: 'test',     time: '1m 52s', desc: 'Playwright y Karate, revisados por agentes de IA.' },
  { name: 'deploy',   time: '12s',    desc: 'Entregas frecuentes y métricas DORA para negocio.' },
];

/* =============================================================
   SOBRE MÍ
   ============================================================= */
export const facts = [
  ['rol',     'Business & Solutions Consulting Lead'],
  ['foco',    'QA · DevOps · AI Engineering'],
  ['stack',   'Playwright · GitHub Actions · Claude Code · MCP'],
  ['marcos',  'ISTQB · Risk-based testing · Shift-left'],
  ['idiomas', 'Español · Inglés'],
  ['base',    'Madrid, España · remoto-friendly'],
];

/* =============================================================
   BLOG
   ============================================================= */
/* La infraestructura está lista (plantilla, RSS, JSON-LD, listado).
   Mientras este array esté vacío, la sección del home se oculta sola
   y /blog/ muestra el estado "todavía no hay artículos".

   Para publicar:
   1. Copia blog/_plantilla.html a blog/<slug>.html y rellénalo.
   2. Añade aquí el objeto correspondiente.
   3. Añade el <item> en blog/feed.xml y la <url> en sitemap.xml.

   Forma de un artículo:
   { slug, title, excerpt, date: 'AAAA-MM-DD', readingTime: '7 min', tags: [] }
*/
export const posts = [
  {
    slug: 'testing-no-funcional-ia',
    title: 'Testing no funcional en sistemas de IA',
    excerpt: 'Rendimiento, escalabilidad, confiabilidad y robustez adversarial: qué cambia cuando el sistema bajo prueba responde con una probabilidad en lugar de una certeza.',
    date: '2026-08-31',
    readingTime: '8 min',
    tags: ['IA', 'Testing no funcional', 'Rendimiento'],
  },
];
