/* Contenido del sitio, separado del marcado. Añadir una tarjeta = añadir un objeto aquí. */

export const techStackHero = [
  { icon: 'PW', name: 'Playwright', cat: 'Test Automation' },
  { icon: 'AZ', name: 'Azure DevOps', cat: 'CI/CD & ALM' },
  { icon: 'GH', name: 'GitHub Actions', cat: 'CI/CD' },
  { icon: 'CC', name: 'Claude Code', cat: 'AI Agents' },
  { icon: 'MP', name: 'MCP', cat: 'AI Protocol' },
  { icon: 'SQ', name: 'SonarQube', cat: 'SAST' },
  { icon: 'KA', name: 'Karate DSL', cat: 'API Testing' },
  { icon: 'LB', name: 'Liquibase', cat: 'DB Migrations' },
  { icon: 'OS', name: 'OpenSpec', cat: 'AI Spec Framework' },
  { icon: 'JS', name: 'Node.js', cat: 'Runtime' },
  { icon: 'AP', name: 'Appium', cat: 'Mobile Automation' },
  { icon: 'WD', name: 'WebdriverIO', cat: 'Test Automation' },
];

/* Franja "empresas / sectores": sin logos inventados, solo slots preparados. */
export const sectors = [
  { name: 'Banca', icon: 'path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01"' },
  { name: 'Seguros', icon: 'path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"' },
  { name: 'Energía', icon: 'path d="M13 10V3L4 14h7v7l9-11h-7z"' },
  { name: 'Retail', icon: 'path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"' },
  { name: 'Educación superior', icon: 'path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"' },
  { name: 'Aviación y viajes', icon: 'path d="M2.5 19h19M6 19l1.5-6.5L21 9l-1-2-13 2.5L4 6 2 6.5l1.5 4L2 12l.5 2 3-1"' },
  { name: 'Transporte ferroviario', icon: 'path d="M4 17h16M5 17V10l2-5h10l2 5v7M8 21v-2m8 2v-2M4 13h16M7 6.5h10"' },
  { name: 'Automoción', icon: 'path d="M5 17h14M6 17V9l2-3h8l2 3v8M9 17v-3h6v3M7 21l-1-4m11 4l1-4"' },
  { name: 'Gaming', icon: 'path d="M6 12h4m-2-2v4m7-3h.01M17.5 13h.01M15 8h4a3 3 0 013 3v2a3 3 0 01-3 3H5a3 3 0 01-3-3v-2a3 3 0 013-3h4"' },
  { name: 'Telecom', icon: 'path d="M12 20h.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0M2 9.5a15 15 0 0120 0"' },
];

export const problems = [
  { title: 'Automatización insuficiente', desc: 'La mayoría de la regresión sigue siendo manual, lo que frena cada release.', icon: 'path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"' },
  { title: 'Regresiones lentas', desc: 'Las suites tardan horas en ejecutarse y nadie espera a que terminen para desplegar.', icon: 'path d="M13 10V3L4 14h7v7l9-11h-7z"' },
  { title: 'Defectos en producción', desc: 'Los bugs críticos se detectan después del despliegue, no antes.', icon: 'path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-8.99-9.75h.008v.008h-.008v-.008z"' },
  { title: 'Pipelines poco fiables', desc: 'Tests inestables (flaky) que el equipo aprende a ignorar en lugar de confiar.', icon: 'path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"' },
  { title: 'Ausencia de estrategia QA', desc: 'Testing reactivo sin un plan de riesgos ni criterios de calidad compartidos con negocio.', icon: 'path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"' },
  { title: 'Uso ineficiente de IA', desc: 'Herramientas de IA adoptadas sin criterio, sin integrarlas realmente en el ciclo de calidad.', icon: 'path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"' },
];

export const services = [
  { tag: 'assessment', title: 'QA Strategy & Assessment', desc: 'Diagnóstico del estado actual de calidad y definición de estrategia basada en riesgo, alineada con negocio y ciclo de desarrollo.', benefit: 'Beneficio: sabes dónde estás y hacia dónde vas antes de invertir en automatización.', icon: 'path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"' },
  { tag: 'automatización', title: 'Test Automation', desc: 'Frameworks de automatización mantenibles con Playwright y Karate DSL, con pruebas E2E y de API integradas en CI/CD.', benefit: 'Beneficio: feedback de regresión en minutos y contratos de API validados antes de romper producción.', icon: 'path d="M13 10V3L4 14h7v7l9-11h-7z"' },
  { tag: 'performance', title: 'Performance Testing', desc: 'Pruebas de carga y estrés para validar la capacidad real del sistema antes del pico de tráfico.', benefit: 'Beneficio: conoces tus límites antes que tus usuarios.', icon: 'path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3.75m8.5-3.75l1 3.75m-9.5 0h9.5"' },
  { tag: 'devops', title: 'DevOps Quality', desc: 'Integración de quality gates reales en pipelines de CI/CD: SAST, SCA, cobertura y umbrales.', benefit: 'Beneficio: la calidad bloquea el pipeline antes de llegar a producción, no después.', icon: 'path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"' },
  { tag: 'ai for qa', title: 'AI for QA', desc: 'Agentes de IA aplicados a generación y revisión de tests, análisis de requisitos y reporting.', benefit: 'Beneficio: tu equipo de QA dedica el tiempo a criterio, no a tareas repetitivas.', icon: 'path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"' },
  { tag: 'liderazgo', title: 'Liderazgo fraccional & Mentoring', desc: 'Mentoring técnico a equipos de QA y desarrollo, o liderazgo de calidad a tiempo parcial como Fractional QA Lead.', benefit: 'Beneficio: criterio senior — en la formación de tu equipo o en la mesa de decisiones — sin coste de estructura fija.', icon: 'path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"' },
];

/* Casos de éxito: anonimizados, sin nombre de cliente. Sustituye por datos reales cuando el cliente autorice publicarlos. */
export const caseStudies = [
  {
    tag: 'e-commerce',
    title: 'De 6 horas a 40 minutos de regresión',
    problem: 'La suite de regresión manual bloqueaba cada release un día entero antes de sacarlo a producción.',
    solution: 'Framework de automatización E2E con Playwright integrado en el pipeline de CI/CD, con quality gates por umbral de cobertura.',
    result: 'Regresión completa en 40 minutos sin intervención manual, ejecutada en cada pull request.',
    kpis: ['De 6h a 40min', '0 releases bloqueados por regresión manual', 'Cobertura E2E +70%'],
  },
  {
    tag: 'fintech',
    title: 'Contratos de API validados antes de romper producción',
    problem: 'Los cambios de backend rompían integraciones de terceros sin que nadie lo detectara hasta después del despliegue.',
    solution: 'Suite de pruebas de contrato de API con Karate DSL, ejecutada como quality gate obligatorio en el pipeline.',
    result: 'Los breaking changes se detectan en CI, antes de llegar a producción.',
    kpis: ['Incidentes de integración -80%', 'Detección en CI, no en producción'],
  },
  {
    tag: 'SaaS B2B',
    title: 'IA aplicada a la generación de casos de prueba',
    problem: 'El equipo de QA dedicaba la mayor parte del sprint a escribir casos de prueba a partir de historias de usuario.',
    solution: 'Agente de IA integrado en el flujo de refinamiento que genera casos de prueba y escenarios edge a partir de las historias de usuario, revisados por el equipo.',
    result: 'El equipo de QA pasó de escribir casos a revisar y priorizar por riesgo.',
    kpis: ['Tiempo de diseño de pruebas -50%', 'Más cobertura de edge cases'],
  },
];

export const aiCapabilities = [
  { title: 'Generación automática de casos de prueba', desc: 'A partir de historias de usuario o especificaciones, generación asistida de casos de prueba y escenarios edge.', icon: 'path d="M9 13.5h6m-6 3h6m-7.5 6h9a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 005.25 6.75v13.5A2.25 2.25 0 007.5 22.5z"' },
  { title: 'Análisis de requisitos', desc: 'Detección de ambigüedades y huecos de cobertura en requisitos antes de escribir el primer test.', icon: 'path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"' },
  { title: 'Agentes IA', desc: 'Agentes autónomos que ejecutan, revisan y corrigen suites de test dentro del pipeline.', icon: 'path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"' },
  { title: 'Quality Gates inteligentes', desc: 'Umbrales de calidad que se ajustan según riesgo y contexto, no solo un porcentaje fijo de cobertura.', icon: 'path d="M9 12.75L11.25 15 15 9.75m6-3a9 9 0 11-18 0 9 9 0 0118 0z"' },
  { title: 'Generación de datos', desc: 'Datasets sintéticos realistas para pruebas, sin exponer datos reales de producción.', icon: 'path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"' },
  { title: 'Automatización con LLM', desc: 'Modelos de lenguaje integrados en el pipeline para revisión de selectores frágiles y reporting ejecutivo.', icon: 'path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"' },
];

export const aiTools = ['MCP', 'OpenAI', 'Claude', 'GitHub Copilot'];

export const technologies = [
  { name: 'Playwright', abbr: 'PW' },
  { name: 'Karate', abbr: 'KA' },
  { name: 'Docker', abbr: 'DK' },
  { name: 'Kubernetes', abbr: 'K8' },
  { name: 'Azure DevOps', abbr: 'AZ' },
  { name: 'GitHub Actions', abbr: 'GH' },
  { name: 'GitLab', abbr: 'GL' },
  { name: 'OpenAI', abbr: 'OA' },
  { name: 'Claude', abbr: 'CL' },
  { name: 'Java', abbr: 'JV' },
  { name: 'TypeScript', abbr: 'TS' },
  { name: 'Node', abbr: 'ND' },
  { name: 'REST', abbr: 'RS' },
  { name: 'GraphQL', abbr: 'GQ' },
  { name: 'PostgreSQL', abbr: 'PG' },
  { name: 'SonarQube', abbr: 'SQ' },
  { name: 'Liquibase', abbr: 'LB' },
  { name: 'OpenSpec', abbr: 'OS' },
];

/* Blog: solo estructura, sin backend. */
export const blogPosts = [
  { title: 'ROI de QA: cómo medir el retorno de invertir en calidad', tag: 'estrategia' },
  { title: 'Quality Engineering: de QA a ingeniería de calidad', tag: 'quality engineering' },
  { title: 'Playwright en 2026: patrones que sí escalan', tag: 'automatización' },
  { title: 'IA aplicada al testing: qué funciona hoy y qué no', tag: 'ai for qa' },
];

export const faqs = [
  { q: '¿Cuánto dura un proyecto típico?', a: 'Depende del formato: un assessment inicial son días, una implementación de pipeline suele ser semanas, y el advisory continuado no tiene fecha de fin fija — se revisa mes a mes.' },
  { q: '¿Trabajáis con equipos pequeños o solo con grandes cuentas?', a: 'Con ambos. El método se adapta al tamaño y madurez de cada organización, no al revés.' },
  { q: '¿Qué pasa si ya tenemos un equipo de QA?', a: 'Trabajo junto a tu equipo, no lo sustituyo. La parte de mentoring existe precisamente para que el conocimiento se quede dentro, no dependa de un externo.' },
  { q: '¿Trabajáis en remoto?', a: 'Sí, remoto-friendly. Base en Madrid, zona horaria Europe/Madrid.' },
  { q: '¿Puedo empezar con algo pequeño antes de comprometerme a más?', a: 'Sí — el QA Assessment es precisamente eso: un primer paso de bajo riesgo antes de decidir si seguimos con automatización o estrategia a largo plazo.' },
  { q: '¿Cómo empezamos?', a: 'Con una primera conversación de 30 minutos sin compromiso. Respondo en menos de 24h.' },
];
