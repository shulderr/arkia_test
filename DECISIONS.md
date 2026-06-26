# Decisiones Técnicas

Este documento registra las decisiones técnicas clave tomadas durante la
construcción del Task Inbox: el problema que aborda cada una, las alternativas
consideradas, la opción elegida y el razonamiento detrás de ella.

---

## 1. Configuración declarativa de filtros

**Problema**
La prueba exige explícitamente que los filtros se construyan a partir de una
configuración (mock) en lugar de estar hardcodeados en la UI.

**Alternativas consideradas**
- **Hardcodear cada filtro** directamente en el JSX del `FilterPanel`.
- **Construir el panel a partir de un arreglo de configuración** que describa
  cada filtro.

**Decisión**
Definir los filtros en `mocks/filtersConfig.js` como un arreglo de objetos,
cada uno con `key`, `label`, `type` y `options`. El `FilterPanel` recorre esta
configuración y renderiza un control por cada entrada.

**Razonamiento**
Esto desacopla la UI de los filtros concretos: agregar un filtro nuevo (por
ejemplo, "Responsable" o "Etiquetas") es un cambio de configuración, no de
componente. La lógica de filtrado (`filterTasks`) lee los criterios activos de
forma genérica mediante `Object.entries(...).every(...)`, por lo que se
mantiene en sintonía con la configuración sin necesidad de modificarla. En un
sistema real, estas opciones probablemente vendrían de un catálogo del backend;
queda anotado como mejora futura.

---

## 2. Persistencia selectiva con `persist` + `partialize` de Zustand

**Problema**
Los filtros seleccionados (y, por extensión, la búsqueda y el orden) deben
sobrevivir a una recarga de página.

**Alternativas consideradas**
- **`localStorage` manual** con lecturas/escrituras dispersas en los
  componentes.
- **Persistir todo el store** con el middleware `persist` de Zustand.
- **Persistir solo las selecciones de UI del usuario** con `persist` +
  `partialize`.

**Decisión**
Usar el middleware `persist` de Zustand con `partialize` para guardar
únicamente `searchTerm`, `filters` y `sortOrder` bajo una sola clave de
localStorage.

**Razonamiento**
Persistir todo guardaría también `tasks`, que vienen frescas del "backend" en
cada carga. Duplicarlas en localStorage arriesga mostrar datos obsoletos que se
desincronizan de la fuente de verdad. El estado transitorio (`loading`,
`error`, `selectedTask`) tampoco aporta valor entre sesiones. `partialize` nos
permite persistir exactamente la intención del usuario y nada más. Un siguiente
paso natural sería agregar `version` + `migrate` para manejar cambios en la
forma del estado persistido a lo largo del tiempo.

---

## 3. Funciones puras en `utils/` para testeabilidad

**Problema**
La lógica de derivación es la parte con mayor probabilidad de contener bugs
sutiles (combinaciones de filtros, dirección del orden, búsqueda
insensible a mayúsculas), por lo que necesita ser verificable.

**Alternativas consideradas**
- **Mantener toda la lógica dentro del hook `useFilteredTasks`**: funciona,
  pero testearla requiere renderizar React.
- **Extraer cada operación a una función pura independiente**.

**Decisión**
Extraer `searchTasks`, `filterTasks` y `sortTasks` a `utils/` como funciones
puras, y que el hook las componga en orden (buscar → filtrar → ordenar).

**Razonamiento**
Las funciones puras son triviales de testear sin montar React ni un DOM, razón
por la cual el entorno de pruebas corre sobre Node en vez de jsdom. El hook se
convierte en un orquestador legible, y cada operación se verifica de forma
independiente (11 pruebas unitarias cubren entrada vacía, criterios
simples/múltiples, semántica de filtros AND-entre-criterios /
OR-dentro-del-criterio, insensibilidad a mayúsculas y la garantía de
no-mutación del ordenamiento).