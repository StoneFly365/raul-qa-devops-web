/* =============================================================
   RADAR DATA — contenido de la Radiografía de nivel QA.

   Mismo criterio que data.js: aquí sólo entra contenido real. Los
   textos son el producto; radar.js es andamiaje que los ordena.

   Los números de este archivo (cortes de banda y perfil esperado por
   rol) son estimaciones fundamentadas, no medidas. Se calibran cuando
   haya respuestas reales con las que compararlas: son constantes
   sueltas justamente para poder moverlas sin tocar el motor.
   ============================================================= */

/* -------------------------------------------------------------
   ESCALA — de evidencia, no de conocimiento. Se pregunta por lo
   que la persona ha hecho y no por lo que sabe: es más difícil
   inflar la respuesta sin darse cuenta de que se está exagerando,
   y evita la trivia técnica, que aburre y se contesta buscando.
   ------------------------------------------------------------- */
export const scale = [
  'Nunca lo he visto',
  'Lo he usado',
  'Lo he mantenido',
  'Lo he diseñado',
  'Lo he enseñado',
];

export const MAX = scale.length - 1;   // 4

/* -------------------------------------------------------------
   EJES
   ------------------------------------------------------------- */
export const axes = [
  { id: 'strategy',   name: 'Estrategia de pruebas', desc: 'Qué probar, qué no, y con qué criterio de riesgo.' },
  { id: 'automation', name: 'Automatización',        desc: 'Código de pruebas que otra persona puede mantener.' },
  { id: 'api',        name: 'API e integración',     desc: 'La capa donde los fallos salen baratos.' },
  { id: 'cicd',       name: 'CI/CD',                 desc: 'Una suite que no corre sola no protege nada.' },
  { id: 'data',       name: 'Datos y entornos',      desc: 'La causa real de la mitad de los tests inestables.' },
  { id: 'ai',         name: 'IA aplicada a QA',      desc: 'Usarla en el flujo, y probar lo que la lleva dentro.' },
];

/* -------------------------------------------------------------
   ÍTEMS — dos por eje. El orden dentro de cada eje va de menor a
   mayor alcance: el segundo siempre implica decisiones de diseño.
   ------------------------------------------------------------- */
export const items = [
  { id: 's1', axis: 'strategy',   text: 'Decidir qué <b>no</b> se automatiza y defenderlo ante negocio con criterio de riesgo.' },
  { id: 's2', axis: 'strategy',   text: 'Definir la estrategia de pruebas de un producto entero: niveles, cobertura y criterios de entrada y salida de release.' },

  { id: 'a1', axis: 'automation', text: 'Una suite organizada en capas que otra persona puede extender sin preguntarte.' },
  { id: 'a2', axis: 'automation', text: 'Diagnosticar y eliminar la causa raíz de un test inestable, sin reintentos ni esperas fijas.' },

  { id: 'p1', axis: 'api',        text: 'Pruebas de API que cubren contratos y códigos de error, no sólo el camino feliz.' },
  { id: 'p2', axis: 'api',        text: 'Mocks o virtualización para probar una integración cuyo sistema externo no está disponible.' },

  { id: 'c1', axis: 'cicd',       text: 'Un pipeline que ejecuta la suite en cada pull request y bloquea el merge si falla.' },
  { id: 'c2', axis: 'cicd',       text: 'Ejecución paralela o distribuida para bajar el tiempo de la suite en CI.' },

  { id: 'd1', axis: 'data',       text: 'Tests que crean y limpian sus propios datos, y se ejecutan en cualquier orden sin interferir.' },
  { id: 'd2', axis: 'data',       text: 'Un entorno de pruebas reproducible que se levanta desde cero.' },

  { id: 'i1', axis: 'ai',         text: 'Usar un asistente de IA para generar o mantener casos de prueba, revisando y corrigiendo su salida.' },
  { id: 'i2', axis: 'ai',         text: 'Probar un sistema que incorpora un LLM: no determinismo, evaluaciones y criterios de aceptación.' },
];

/* -------------------------------------------------------------
   BANDAS — cortes sobre la escala 0-100 de cada eje.
   ------------------------------------------------------------- */
export const bands = [
  { id: 'junior', name: 'Junior', min: 0 },
  { id: 'mid',    name: 'Mid',    min: 30 },
  { id: 'senior', name: 'Senior', min: 55 },
  { id: 'lead',   name: 'Lead',   min: 80 },
];

/* -------------------------------------------------------------
   CONTEXTO — las tres preguntas previas. Sin ellas la puntuación
   sería un número suelto: son las que permiten comparar contra algo.
   ------------------------------------------------------------- */
export const roles = [
  { id: 'mid',    name: 'QA Automation Mid',    expected: 40 },
  { id: 'senior', name: 'QA Automation Senior', expected: 60 },
  { id: 'sdet',   name: 'SDET',                 expected: 60, overrides: { automation: 75, api: 75, cicd: 75 } },
  { id: 'lead',   name: 'QA Lead',              expected: 65, overrides: { strategy: 80 } },
];

export const experience = [
  { id: 'lt2',  name: 'Menos de 2 años' },
  { id: '2to5', name: 'Entre 2 y 5 años' },
  { id: '5to10', name: 'Entre 5 y 10 años' },
  { id: 'gt10', name: 'Más de 10 años' },
];

export const situations = [
  { id: 'employed',  name: 'Empleado y quiero crecer' },
  { id: 'searching', name: 'Buscando trabajo' },
  { id: 'freelance', name: 'Freelance o consultor' },
  { id: 'entering',  name: 'Quiero entrar en QA' },
];

/* -------------------------------------------------------------
   ACCIONES — indexadas por eje y por la banda en la que está la
   persona. No hay motor de reglas con predicados: una tabla cubre
   el caso general con una fracción del código.

   Sólo hacen falta junior, mid y senior: una brecha exige estar por
   debajo de lo esperado, y el máximo esperado (80) es justo el corte
   de lead, así que quien esté en lead no tiene brecha en ese eje.
   actionFor cae a 'senior' si alguna vez pasara.
   ------------------------------------------------------------- */
export const actions = {
  strategy: {
    junior: 'Coge la última release que probaste y escribe, en una página, qué habría pasado si cada área hubiera fallado en producción. Ordena por coste. Eso es una matriz de riesgo, y es el punto de partida de toda estrategia.',
    mid:    'Elige un área que hoy se prueba entera y recorta la mitad de forma argumentada. Escribe por qué esos casos no aportan. Saber quitar pesa más que saber añadir.',
    senior: 'Escribe los criterios de entrada y salida de release de tu producto y llévalos a la reunión donde se decide desplegar. Una estrategia que no cambia decisiones no es una estrategia.',
  },
  automation: {
    junior: 'Coge tus diez tests más frágiles y extrae los selectores y los datos a una capa aparte. El objetivo no es que pasen, es que un cambio de UI toque un solo archivo.',
    mid:    'Da tu suite a alguien que no la ha escrito y pídele que añada un caso sin ayuda. Donde se atasque está tu deuda de diseño.',
    senior: 'Documenta las convenciones de la suite y conviértelas en revisión de código. Una suite mantenible por una persona es un cuello de botella con buena prensa.',
  },
  api: {
    junior: 'Coge un endpoint que ya pruebas por interfaz y cúbrelo a nivel de API: 200, 4xx y el error de validación. Comparado con el mismo caso por UI, verás la diferencia en segundos y en estabilidad.',
    mid:    'Añade pruebas de contrato entre dos servicios que se hablan. La pregunta que respondes es si el consumidor se entera antes de que el proveedor rompa algo.',
    senior: 'Monta virtualización del sistema externo que más te bloquea. Que tu suite no dependa de la disponibilidad de un tercero es una decisión de arquitectura, y te toca a ti proponerla.',
  },
  cicd: {
    junior: 'Monta en un repositorio tuyo un workflow que ejecute la suite en cada push. Con GitHub Actions es un archivo YAML. Es la evidencia técnica más barata de conseguir y la que más se nota en una entrevista.',
    mid:    'Haz que el pipeline bloquee el merge cuando la suite falla, y negocia esa regla con el equipo. La parte técnica es media hora; la conversación es el trabajo real.',
    senior: 'Paraleliza la suite y mide el antes y el después. Un tiempo de feedback de veinte minutos cambia cómo trabaja el equipo entero; uno de dos horas hace que la gente deje de mirar.',
  },
  data: {
    junior: 'Coge un test que dependa de un dato que ya existe en el entorno y hazlo crear el suyo y borrarlo al terminar. Después ejecuta la suite en orden inverso: lo que se rompa te estaba mintiendo.',
    mid:    'Levanta tus dependencias con contenedores en local y ejecuta la suite contra ellas. Si tu entorno de pruebas sólo existe en un servidor compartido, tu suite tiene un único punto de fallo humano.',
    senior: 'Lleva el entorno de pruebas a infraestructura como código, de forma que cualquiera lo levante desde cero. Mientras dependa de que alguien recuerde cómo se montó, es conocimiento tribal.',
  },
  ai: {
    junior: 'Coge un requisito real y pide a un asistente los casos de prueba. Luego corrígelos y anota qué se ha dejado. Ese listado de omisiones es tu criterio hecho explícito, y vale más que los casos.',
    mid:    'Mete el asistente en el punto más caro de tu flujo: mantener tests que se rompen por cambios de interfaz, o redactar casos a partir de historias. Mide horas antes y después, sin estimaciones.',
    senior: 'Prueba una funcionalidad con LLM detrás. Necesitas criterios de aceptación sobre salidas no deterministas y un conjunto de evaluación que se ejecute en CI. Es el hueco de competencia más grande del mercado ahora mismo.',
  },
};

/* -------------------------------------------------------------
   REGLAS DE CONTEXTO — los dos casos en que el consejo cambia de
   raíz y no depende del eje. Se añaden al final del plan.
   ------------------------------------------------------------- */
export const contextAdvice = [
  {
    id: 'searching',
    when: (ctx) => ctx.situation === 'searching',
    text: 'Estás buscando trabajo: cada acción del plan tiene que dejar rastro público. Un repositorio con el pipeline en verde convence más que una línea de "conocimientos de CI/CD" en el currículum, y se revisa en dos minutos.',
  },
  {
    id: 'entering',
    when: (ctx) => ctx.situation === 'entering',
    text: 'Vienes de fuera de QA: no intentes cubrir los seis ejes. Elige el más débil de los dos que te salen arriba, hazlo bien y enséñalo. Un perfil con una competencia demostrable entra antes que uno con seis a medias.',
  },
];
