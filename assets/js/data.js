/* =============================================================
   DATA — todo el contenido del sitio, separado del marcado.
   Añadir una tarjeta = añadir un objeto aquí. Nada más.

   Regla: aquí sólo entra contenido real. Ningún placeholder visible
   en producción — un "[PENDIENTE]" o un "Nombre Apellido" delante de
   un cliente potencial cuesta más credibilidad de la que aporta el
   hueco reservado. Las secciones que dependían de datos inexistentes
   (logos de cliente, testimonios, blog) se reactivan cuando haya
   contenido; ver README.
   ============================================================= */

export const site = {
  name: 'Raúl Molina Hernández',
  role: 'Business & Solutions Consulting Lead · QA & DevOps',
  url: 'https://stonefly365.github.io/raul-qa-devops-web/',
  email: 'raulmolinah.madrid@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raulmolinahernandez/',
  github: 'https://github.com/StoneFly365',
  /* ⚠ TODO: sustituir por la URL real de Calendly / Cal.com cuando exista.
     Mientras sea null, el CTA "Reservar una reunión" cae a un mailto. */
  bookingUrl: null,
};

export const mailto = (subject) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const bookingHref = site.bookingUrl || mailto('Reservar una reunión de 30 min · QA / DevOps');

/* -------------------------------------------------------------
   ICONOS — atributos de <path> de Heroicons (outline, 24×24).
   Se inyectan con la utilidad icon() de dom.js.
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
  cog:       'd="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z"',
  chart:     'd="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"',
  db:        'd="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"',
  download:  'd="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"',
  map:       'd="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"',
  info:      'd="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"',
  building:  'd="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01"',
  cart:      'd="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"',
  plane:     'd="M2.5 19h19M6 19l1.5-6.5L21 9l-1-2-13 2.5L4 6 2 6.5l1.5 4L2 12l.5 2 3-1"',
  train:     'd="M4 17h16M5 17V10l2-5h10l2 5v7M8 21v-2m8 2v-2M4 13h16M7 6.5h10"',
  car:       'd="M5 17h14M6 17V9l2-3h8l2 3v8M9 17v-3h6v3M7 21l-1-4m11 4l1-4"',
  game:      'd="M6 12h4m-2-2v4m7-3h.01M17.5 13h.01M15 8h4a3 3 0 013 3v2a3 3 0 01-3 3H5a3 3 0 01-3-3v-2a3 3 0 013-3h4"',
  signal:    'd="M12 20h.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0M2 9.5a15 15 0 0120 0"',
};

/* =============================================================
   SECTORES — prueba social sin logos
   ============================================================= */
/* Sin logos inventados: sólo sectores reales donde ha habido proyecto.
   Cuando haya autorización de marca, sustituir esta lista por
   <img src="assets/logos/…"> dentro del mismo contenedor. */
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
   PROBLEMAS → SOLUCIONES
   ============================================================= */
/* Una línea por síntoma y una línea por remedio: la tarjeta debe
   leerse de un vistazo, no en un párrafo. */
export const problems = [
  {
    icon: I.clock,
    title: 'Regresión manual',
    desc: 'Cada release se bloquea días esperando pruebas a mano.',
    solution: 'Framework mantenible con Playwright y Karate en cada pull request.',
  },
  {
    icon: I.bolt,
    title: 'El equipo, atascado',
    desc: 'Más tiempo re-ejecutando pruebas que diseñando cobertura nueva.',
    solution: 'Priorización por riesgo: primero lo que más cuesta y más se repite.',
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
    solution: 'Shift-left: criterios de aceptación testables desde el requisito.',
  },
  {
    icon: I.doc,
    title: 'Sin estrategia de QA',
    desc: 'Testing reactivo, sin plan de riesgos compartido con negocio.',
    solution: 'Estrategia basada en riesgo con métricas DORA visibles para dirección.',
  },
  {
    icon: I.sparkles,
    title: 'IA sin criterio',
    desc: 'Herramientas compradas y nunca integradas en el ciclo de calidad.',
    solution: 'Agentes y LLMs dentro del pipeline, con resultado medible.',
  },
];

/* =============================================================
   4 · SERVICIOS
   ============================================================= */
/* `desc` = una frase. Todo lo que se pueda decir en la lista de
   beneficios no se repite en el párrafo. */
export const services = [
  {
    tag: 'transformación',
    icon: I.map,
    title: 'QA Transformation',
    desc: 'De testing reactivo a ingeniería de calidad integrada en el desarrollo.',
    benefits: ['Diagnóstico y roadmap en semanas', 'Estrategia por riesgo, no por volumen', 'Métricas legibles por negocio'],
    cta: 'Diagnosticar mi equipo',
    subject: 'QA Transformation · Consulta',
  },
  {
    tag: 'automatización',
    icon: I.bolt,
    title: 'QA Automation',
    desc: 'Frameworks E2E, API y contrato con Playwright y Karate DSL, dentro de CI/CD.',
    benefits: ['Regresión completa en minutos', 'Suites estables, sin flakiness', 'Código que tu equipo mantiene sin mí'],
    cta: 'Automatizar mi regresión',
    subject: 'QA Automation · Consulta',
  },
  {
    tag: 'devops',
    icon: I.cog,
    title: 'DevOps Consulting',
    desc: 'Pipelines que bloquean un release roto antes de que llegue a producción.',
    benefits: ['Quality gates que el equipo respeta', 'Métricas DORA instrumentadas', 'Despliegues sin ventana de pánico'],
    cta: 'Revisar mi pipeline',
    subject: 'DevOps Consulting · Consulta',
  },
  {
    tag: 'ai for qa',
    icon: I.sparkles,
    title: 'AI for QA',
    desc: 'Agentes y LLMs integrados en el ciclo de pruebas, no como demo aislada.',
    benefits: ['Casos generados desde requisitos', 'Revisión automática de deuda en tests', 'Informe ejecutivo en cada build'],
    cta: 'Explorar IA aplicada',
    subject: 'AI for QA · Consulta',
  },
  {
    tag: 'liderazgo',
    icon: I.chart,
    title: 'Technical Leadership',
    desc: 'Fractional QA Lead: criterio senior en la mesa sin coste de estructura fija.',
    benefits: ['Criterio senior sin contratar un head', 'Interlocución técnica con negocio', 'Mes a mes, sin permanencia'],
    cta: 'Hablar de liderazgo fraccional',
    subject: 'Technical Leadership · Consulta',
  },
  {
    tag: 'formación',
    icon: I.academic,
    title: 'Training',
    desc: 'Formación in-company sobre vuestro propio código, no sobre ejemplos de juguete.',
    benefits: ['Sesiones sobre tu stack real', 'Material y ejercicios que quedan', 'Formato intensivo o distribuido'],
    cta: 'Solicitar programa',
    subject: 'Training · Consulta',
  },
  {
    tag: 'mentoring',
    icon: I.users,
    title: 'Mentoring',
    desc: 'Acompañamiento 1:1 para ingenieros que dan el salto a Quality Engineering.',
    benefits: ['Plan de crecimiento personalizado', 'Revisión de código y decisiones reales', 'Sesiones recurrentes'],
    cta: 'Ver mentoría individual',
    href: 'mentoringB2C/',
  },
];

/* =============================================================
   TRAYECTORIA / KPIs
   ============================================================= */
/* Sólo cifras confirmadas. `value` numérico → contador animado.
   Para añadir un KPI nuevo basta con otro objeto con la misma forma. */
export const metrics = [
  { value: 15, suffix: '+', label: 'años de experiencia', note: 'QA · Quality Engineering · DevOps' },
  { value: 30, suffix: '+', label: 'proyectos enterprise', note: 'banca, seguros, energía, retail…' },
  { value: 10, suffix: '+', label: 'sectores cubiertos', note: 'entornos regulados y de alta exigencia' },
];

/* =============================================================
   TECNOLOGÍAS
   ============================================================= */
/* slug = icono de Simple Icons servido vía jsDelivr y teñido con mask-image.
   Sin slug → se usa el monograma de `mono`. */
export const techGroups = [
  {
    name: 'Test Automation',
    items: [
      { name: 'Playwright', slug: 'playwright' },
      { name: 'Selenium', slug: 'selenium' },
      { name: 'Cypress', slug: 'cypress' },
      { name: 'Appium', slug: 'appium' },
      { name: 'WebdriverIO', slug: 'webdriverio' },
      { name: 'Karate DSL', mono: 'KA' },
    ],
  },
  {
    name: 'CI/CD & Infraestructura',
    items: [
      { name: 'GitHub Actions', slug: 'githubactions' },
      { name: 'Azure DevOps', slug: 'azuredevops' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Terraform', slug: 'terraform' },
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'Azure', slug: 'microsoftazure' },
    ],
  },
  {
    name: 'Lenguajes',
    items: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Python', slug: 'python' },
      { name: 'Java', slug: 'openjdk' },
      { name: 'Node.js', slug: 'nodedotjs' },
    ],
  },
  {
    name: 'IA & Calidad de código',
    items: [
      { name: 'Claude Code', slug: 'claude' },
      { name: 'GitHub Copilot', slug: 'githubcopilot' },
      { name: 'OpenAI', slug: 'openai' },
      { name: 'MCP', slug: 'modelcontextprotocol' },
      { name: 'SonarQube', slug: 'sonarqubeserver' },
      { name: 'OWASP ZAP', slug: 'owasp' },
    ],
  },
];

/* =============================================================
   METODOLOGÍA
   ============================================================= */
export const methodology = [
  { step: '01', name: 'Assessment', desc: 'Procesos, herramientas, deuda de pruebas y riesgos. Métricas objetivas, no opiniones.', output: 'Informe de madurez QA' },
  { step: '02', name: 'Roadmap',    desc: 'Plan priorizado por impacto y esfuerzo, con fechas realistas para tu capacidad.', output: 'Roadmap trimestral' },
  { step: '03', name: 'Automation', desc: 'Framework, suites y quality gates, implementados en pareja con tus ingenieros.', output: 'Suite en CI/CD' },
  { step: '04', name: 'AI',         desc: 'Agentes y LLMs donde aportan medible: generación, revisión y reporting.', output: 'Agentes en pipeline' },
  { step: '05', name: 'Training',   desc: 'Transferencia de conocimiento para que el equipo evolucione sin dependencia externa.', output: 'Equipo autónomo' },
];

/* =============================================================
   CASOS DE ÉXITO
   ============================================================= */
/* Anonimizados por confidencialidad. Sustituir por casos con nombre
   cuando el cliente autorice la publicación. */
export const caseStudies = [
  {
    tag: 'e-commerce',
    title: 'De 6 horas a 40 minutos de regresión',
    problem: 'La regresión manual bloqueaba cada release un día entero.',
    solution: 'Framework E2E con Playwright en el pipeline, con gates por umbral de cobertura.',
    result: 'Regresión completa en 40 minutos, en cada pull request y sin intervención manual.',
    kpis: ['6h → 40min', '0 releases bloqueados', 'Cobertura E2E +70%'],
  },
  {
    tag: 'fintech',
    title: 'Contratos de API validados antes de romper producción',
    problem: 'Los cambios de backend rompían integraciones de terceros sin avisar.',
    solution: 'Pruebas de contrato con Karate DSL como quality gate obligatorio.',
    result: 'Los breaking changes se detectan en CI, no en producción.',
    kpis: ['Incidentes de integración −80%', 'Detección en CI'],
  },
  {
    tag: 'banca',
    title: 'Seguridad de APIs validada en diseño, no en producción',
    problem: 'Los contratos se diseñaban sin validación de seguridad previa.',
    solution: 'Escaneo de los contratos con OWASP ZAP en fase de diseño, junto a desarrollo.',
    result: 'Las vulnerabilidades se corregían antes de escribir una línea de código.',
    kpis: ['Seguridad en fase de diseño', 'Contratos auditados vs OWASP', '0 retrabajos tardíos'],
  },
];

/* =============================================================
   IA APLICADA A QA
   ============================================================= */
export const aiCapabilities = [
  { icon: I.doc,      title: 'Generación de casos',        desc: 'Desde historias de usuario: casos, escenarios límite y datos de entrada.' },
  { icon: I.info,     title: 'Análisis de requisitos',     desc: 'Ambigüedades y huecos de cobertura antes del primer test.' },
  { icon: I.sparkles, title: 'Agentes autónomos',          desc: 'Ejecutan, revisan y proponen correcciones dentro del pipeline.' },
  { icon: I.check,    title: 'Quality gates inteligentes', desc: 'Umbrales que se ajustan al riesgo, no un porcentaje fijo.' },
  { icon: I.db,       title: 'Generación de datos',        desc: 'Datasets sintéticos realistas, sin exponer datos de producción.' },
  { icon: I.arrow,    title: 'Reporting ejecutivo',        desc: 'El resultado de cada build, traducido a informe de negocio.' },
];

/* =============================================================
   RECURSOS
   ============================================================= */
/* Sólo recursos que existen y se pueden abrir hoy. Una tarjeta
   "Próximamente" ocupa el mismo espacio que una útil y no convierte. */
export const resources = [
  {
    type: 'PDF',
    icon: I.doc,
    title: 'CV · Raúl Molina Hernández',
    desc: 'Trayectoria completa en QA, Quality Engineering y DevOps.',
    href: 'cv/cv_raul_molina_hernandez_2026.pdf',
    cta: 'Descargar PDF',
  },
  {
    type: 'Servicio',
    icon: I.users,
    title: 'Mentoría QA individual',
    desc: 'Programa de acompañamiento 1:1 para ingenieros de QA.',
    href: 'mentoringB2C/',
    cta: 'Ver programa',
  },
  {
    type: 'Repositorio',
    icon: I.sparkles,
    title: 'Demo Playwright + MCP + Claude Code',
    desc: 'Pipeline público que combina E2E con agentes de IA. Clonable hoy.',
    href: 'https://github.com/StoneFly365/playwright-demo-ia-mcp',
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
  { q: '¿Qué pasa si ya tenemos un equipo de QA?', a: 'Trabajo junto a tu equipo, no lo sustituyo. El mentoring existe para que el conocimiento se quede dentro.' },
  { q: '¿Trabajas en remoto?', a: 'Sí, remoto-friendly. Base en Madrid, zona horaria Europe/Madrid.' },
  { q: '¿Puedo empezar con algo pequeño?', a: 'Sí. El QA Assessment es un primer paso de bajo riesgo antes de comprometerse a más.' },
  { q: '¿Cómo empezamos?', a: 'Con una conversación de 30 minutos sin compromiso. Respondo en menos de 24 horas.' },
];

/* =============================================================
   PIPELINE (elemento de firma del hero)
   ============================================================= */
export const pipelineStages = [
  { name: 'commit',   time: '4s',      desc: 'Criterios de aceptación testables desde el inicio.' },
  { name: 'build',    time: '38s',     desc: 'Pipelines reproducibles en Azure DevOps o GitHub Actions.' },
  { name: 'test',     time: '1m 52s',  desc: 'Playwright y Karate, revisados por agentes de IA.' },
  { name: 'security', time: '47s',     desc: 'Quality gates de seguridad: SAST, SCA y OWASP.' },
  { name: 'deploy',   time: '12s',     desc: 'Entregas frecuentes y métricas DORA para negocio.' },
];

export const facts = [
  ['rol',      'Business & Solutions Consulting Lead'],
  ['foco',     'QA · DevOps · AI Testing'],
  ['stack',    'Playwright · Azure DevOps · GitHub Actions · MCP'],
  ['marcos',   'ISTQB · Risk-based testing · Métricas DORA'],
  ['idiomas',  'Español · Inglés'],
  ['base',     'Madrid, España · remoto-friendly'],
];
