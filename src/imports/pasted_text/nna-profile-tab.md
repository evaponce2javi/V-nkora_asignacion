

## PROMPT 



Diseña una **aplicación web de escritorio (dashboard institucional)** en español para un sistema público de protección de la niñez en Chile. La plataforma recomienda —de forma explicable— la asignación óptima de Niños, Niñas y Adolescentes (NNA) a residencias o familias de acogida, usando un motor de matching. **El sistema recomienda; el juez y la dupla psicosocial deciden.** Genera todas las pantallas listadas y conéctalas en un prototipo navegable.



### 1. Tono y principios de diseño

- **Institucional, serio y confiable**, pero moderno y limpio. Es una herramienta judicial: cero elementos infantiles o lúdicos, cero degradados llamativos.

- **Claridad sobre densidad:** mucho dato tabular, pero legible, con jerarquía visual fuerte y espacios en blanco generosos.

- **Calma y accesibilidad:** contraste alto (WCAG 2.1 AA), tipografía grande y clara, ningún color como único portador de significado (usar también íconos/texto).

- La sensación debe transmitir **transparencia y responsabilidad**: la explicabilidad del score es protagonista, nunca una "caja negra".



### 2. Sistema de diseño

- **Paleta:**

  - Primario institucional: azul profundo `#1B3A6B`.

  - Secundario/acento: teal `#2A9D8F`.

  - Fondo app: gris muy claro `#F4F6F9`; superficies/cards: blanco `#FFFFFF`.

  - Texto: `#1A2233` (principal), `#5B6472` (secundario).

  - **Semánticos del score de idoneidad:** verde `#2E7D5B` (alta ≥ 75), ámbar `#E0A526` (media 50–74), rojo `#C0492E` (baja < 50).

  - Semánticos de estado: éxito verde, advertencia ámbar, error rojo, informativo azul.

- **Tipografía:** familia sans-serif geométrica y legible (Inter o similar). Títulos en semibold/bold; cuerpo regular; números tabulares para tablas y métricas.

- **Layout:** grilla de 8px. Esquinas redondeadas 8px. Sombras sutiles (elevación baja). Bordes finos `#E2E7EE`.

- **Componentes base a reutilizar:** barra lateral de navegación colapsable, top bar, tarjetas KPI, tablas de datos con filtros/paginación/orden, chips/etiquetas de estado, badges de rol, medidor circular (gauge) para el score, barras de progreso (ocupación de cupos), pestañas, breadcrumbs, modales, drawers laterales, toasts/notificaciones, banners de alerta.

- **Estados:** incluir en las pantallas relevantes estados vacío (empty state con ilustración sobria y CTA), carga (skeleton), y error.

- **Idioma:** todo el texto de la interfaz en español de Chile.



### 3. Estructura de navegación (layout global, en todas las pantallas salvo Login)

- **Barra lateral izquierda** (colapsable, con íconos + etiqueta) con los ítems:

  1. Panel principal (Dashboard)

  2. NNA

  3. Residencias y cupos

  4. Familias de acogida

  5. Motor de asignación

  6. Decisiones (bandeja del juez)

  7. Salud mental y reservas

  8. Analítica y déficit

  9. Auditoría

  10. Configuración

- **Top bar:** logo/nombre del sistema a la izquierda; buscador global al centro; a la derecha: campana de notificaciones con contador, avatar del usuario con **badge de rol** (Juez / Dupla psicosocial / Coordinador residencia / Encargado FA / Administrador / Auditor), y menú de cuenta.

- Muestra que la navegación se adapta al rol (indícalo visualmente), pero diseña la versión completa con todos los ítems.



### 4. Roles a representar

Juez de Familia, Dupla psicosocial, Coordinador de residencia, Encargado de familias de acogida, Administrador del sistema, Auditor. Cada uno con permisos distintos.



### 5. Pantallas (genera todas)



**5.1 Inicio de sesión**

Pantalla centrada, fondo sobrio. Card con logo, nombre del sistema, campos usuario/contraseña, paso de verificación en dos factores (MFA), botón "Ingresar" y enlace de recuperación. Pie con aviso de tratamiento de datos sensibles.



**5.2 Panel principal (Dashboard)**

Encabezado con saludo y rol. Fila de **tarjetas KPI**: "NNA sin asignación", "Cupos disponibles", "Reservas activas por internación", "Residencias en el límite legal (15/15)". Debajo, dos columnas: (a) **panel de alertas prioritarias** (reserva de cupo por vencer, NNA en espera crítica, residencia al tope) con severidad por color; (b) **casos recientes** en tabla compacta. Barra de accesos rápidos ("Nuevo NNA", "Solicitar recomendación").



**5.3 NNA — Listado**

Título "Niños, niñas y adolescentes" + botón "Nuevo NNA". Barra de filtros (comuna, estado, salud mental, grupo de hermanos, edad). **Tabla de datos**: ID/nombre, edad, comuna, escuela, indicador de salud mental (chip), grupo de hermanos (badge), condición (vulnerado/infractor), estado de asignación (Asignado / Pendiente / Reservado — chips de color). Paginación y orden por columna.



**5.4 NNA — Ficha de perfil**

Cabecera con nombre, ID, edad, comuna y **chip de estado**. Columna derecha fija con resumen del estado y CTA destacado **"Solicitar recomendación de asignación"**. Cuerpo con **pestañas**: "Datos generales", "Salud mental" (necesidades, tratamientos, restricciones clínicas), "Vínculos y escuela" (cercanía, referentes significativos), "Hermanos" (grupo que debe permanecer junto), "Historial" (línea de tiempo de asignaciones y decisiones).



**5.5 Residencias y cupos — Listado**

Vista de tarjetas o tabla por residencia: nombre, comuna, tipo, especialización (p. ej. salud mental), y **barra de ocupación "X/15"** con color (verde/ámbar/rojo según acercamiento al máximo legal). Filtros por comuna, tipo y disponibilidad.



**5.6 Residencia — Detalle**

Datos del centro, medidor de ocupación, especialización, y lista de NNA actualmente asignados. Aviso visible si está al tope legal (15/15).



**5.7 Familias de acogida — Listado y detalle**

Tabla de familias acreditadas: comuna, disponibilidad, perfil de idoneidad, rango etario que reciben. Detalle con perfil y estado de disponibilidad.



**5.8 Motor de asignación — Solicitud**

Paso previo: seleccionar un NNA o un **grupo de hermanos**, confirmar restricciones cargadas, botón "Generar recomendación". Muestra estado de cálculo (skeleton/loader breve).



**5.9 Motor de asignación — Resultados (PANTALLA ESTRELLA, máximo detalle)**

Layout en dos zonas:

- **Recomendación principal** (card destacada): residencia/familia sugerida, **medidor circular grande del "Score de idoneidad" (0–100)** con color semántico, distancia a escuela/comuna, y bloque **"Restricciones que respaldan"**: chips verdes para las cumplidas (máx. 15 respetado, hermanos juntos, sin mezcla vulnerado/infractor, cercanía, especialización) y chips ámbar para las tensiones/compromisos.

- **Panel de explicabilidad**: desglose del score por factor con **barras horizontales** (compatibilidad de perfil, salud mental, cercanía, continuidad de vínculos, capacidad legal), cada uno con su peso y aporte. Texto en lenguaje claro, apto para un juez no técnico.

- **Alternativas**: lista ordenada de 3–4 opciones adicionales, cada una con su score, residencia y una línea de justificación.

- **Barra de acciones** fija: "Aprobar", "Rechazar", "Solicitar otra recomendación". Deja claro que la decisión es humana.



**5.10 Decisiones — Bandeja del juez**

Lista de recomendaciones pendientes de resolución. Vista de revisión con la recomendación, el motivo requerido al aprobar/rechazar, y confirmación de **resolución** que quedará en el expediente. Estilo formal.



**5.11 Salud mental y reservas de cupo**

Tabla de NNA internados en psiquiatría con **estado del "hold" de cupo**, días restantes de reserva, residencia reservada y alertas de vencimiento. CTA "Reintegrar al alta" y "Re-ejecutar motor". Esta pantalla resuelve el problema del niño que, tras el alta, se queda sin residencia: hazlo evidente en el diseño.



**5.12 Analítica y déficit**

Dashboard de nivel nacional: **mapa/heatmap por comuna** del déficit de cupos, gráfico de barras "déficit por tipo de cupo" (salud mental, por tramo etario, etc.), tendencias temporales y tarjetas resumen. Filtros por región/comuna y periodo.



**5.13 Auditoría y trazabilidad**

**Línea de tiempo inmutable** de eventos: cada recomendación generada y cada decisión humana (quién, cuándo, qué, por qué). Filtros por caso, usuario y fecha. Aspecto de "registro de solo lectura", sin acciones de edición.



**5.14 Configuración (Administrador)**

Pestañas: "Usuarios y roles" (tabla + permisos RBAC), "Pesos del motor" (sliders para las restricciones blandas: cercanía, vínculos, especialización), "Catálogo" (residencias, tipos, parámetros legales como el máximo de 15). Deja claro que las reglas son configurables.



**5.15 Notificaciones**

Drawer lateral desplegable desde la campana: alertas agrupadas por severidad (crítica/advertencia/informativa), con marca de leído/no leído.



### 6. Flujo del prototipo (conecta estas pantallas)

Login → Dashboard → NNA (listado) → Ficha de NNA → [CTA "Solicitar recomendación"] → Motor: Solicitud → Motor: Resultados → [Aprobar] → Decisiones (resolución) → vuelta al Dashboard.

Ramas adicionales: Dashboard → Salud mental y reservas → (al alta) Motor: Resultados. Y Dashboard → Analítica y déficit. Los ítems de la barra lateral navegan a su pantalla correspondiente.



### 7. Requisitos transversales

- Diseño **responsive** priorizando escritorio (uso profesional), pero que no se rompa en tablet.

- Contraste y tamaños accesibles (WCAG 2.1 AA); foco visible en elementos interactivos.

- Consistencia total de componentes entre pantallas (mismo estilo de tabla, card, chip y botón en todas).

- Copy realista en español de Chile en cada pantalla (nada de "Lorem ipsum" en títulos y etiquetas clave).



