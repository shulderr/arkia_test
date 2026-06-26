# Task Inbox

Aplicación frontend en React que visualiza y gestiona tareas.
Permite buscar, filtrar y ordenar tareas, ver el detalle de cada una, y
conserva los filtros determinados por el usuario entre recargas de página.

---

## Stack tecnológico

- **React** (sin TypeScript) sobre **Vite**
- **Ant Design** para los componentes de UI (tabla, tags, inputs, drawer)
- **Zustand** para el manejo de estado, con su middleware `persist` para la
  persistencia en `localStorage`
- **day.js** para el formateo de fechas
- **Vitest** para las pruebas unitarias

---

## Requisitos cubiertos

1. Listado de tareas con título, proceso, responsable, prioridad, estado y
   fecha de creación.
2. Búsqueda dinámica por texto libre (resultados en tiempo real, sin botón).
3. Filtros construidos a partir de una configuración (mock), no hardcodeados.
4. Ordenamiento por fecha de creación (ascendente / descendente).
5. Vista de detalle al seleccionar una tarea.
6. Persistencia de los filtros, búsqueda y orden seleccionados tras recargar.

---

## Instalación y ejecución

Requisitos previos: Node.js 18+ y npm.

```bash
# Instalar dependencias
npm install

# iniciar el entorno de desarrollo
npm run dev

# Generar el build de producción
npm run build

# Previsualizar el build
npm run preview
```

---

## Pruebas

Las pruebas unitarias cubren la lógica de derivación (búsqueda, filtrado y
ordenamiento), implementada como funciones puras en `src/utils/`.

```bash
# Ejecutar las pruebas (modo watch)
npm run test

# Ejecutar una sola corrida
npx vitest run
```

Se cubren los casos de entrada vacía, criterios simples y múltiples, la
búsqueda insensible a mayúsculas y la garantía de no-mutación del array al
ordenar.

---

## Arquitectura

La estructura separa responsabilidades para que cada pieza sea fácil de razonar
y de testear:

```
src/
├── components/        # Componentes (reciben datos, emiten eventos)
│   ├── FilterPanel.jsx
│   ├── SearchBar.jsx
│   ├── SortControl.jsx
│   ├── TaskTable.jsx
│   └── TaskDetail.jsx
├── hooks/
│   └── useFilteredTasks.js   # Orquesta: buscar -> filtrar -> ordenar
├── mocks/
│   └── filtersConfig.js      # Configuración declarativa de los filtros
├── services/
│   └── taskService.js        # Capa de datos: carga las tareas (fetch a JSON)
├── store/
│   └── useTaskStore.js       # Estado global + persistencia (Zustand)
├── utils/                    # Lógica de negocio como funciones puras
│   ├── searchTasks.js
│   ├── filterTasks.js
│   └── sortTasks.js
├── pages/
│   └── TaskInbox.jsx         # Orquesta y compone toda la bandeja
├── App.jsx
└── main.jsx

public/
└── tasks.json                # Datos mock de las tareas
```

### Flujo de datos

1. `taskService` carga las tareas (simulando una API) y las deja en el store.
2. El usuario interactúa con `SearchBar`, `FilterPanel` y `SortControl`, que
   solo escriben su selección en el store (`useTaskStore`).
3. `useFilteredTasks` está suscrito al store; ante cualquier cambio recalcula
   el resultado componiendo las funciones puras de `utils/` en orden:
   buscar → filtrar → ordenar.
4. `TaskTable` recibe la lista ya procesada y únicamente la renderiza.

La idea central es que **toda la lógica de derivación vive en el store y en las
funciones puras**, mientras que los componentes son presentacionales. Esto
mantiene una única fuente de verdad, facilita las pruebas y desacopla la lógica
de la librería de UI.

### Configuración de filtros

Los filtros no están escritos a mano en la UI: se generan a partir de
`mocks/filtersConfig.js`, un arreglo donde cada filtro se describe con `key`,
`label`, `type` y `options`. El `FilterPanel` recorre esa configuración y pinta
un control por entrada, de modo que agregar o quitar un filtro es un cambio de
configuración y no de componente.

### Persistencia

El estado se persiste con el middleware `persist` de Zustand. Mediante
`partialize` se guarda únicamente lo que el usuario seleccionó (búsqueda,
filtros y orden), excluyendo deliberadamente las tareas (que se recargan desde
el origen) y el estado transitorio.

---

## Decisiones técnicas

Las decisiones de diseño más relevantes, con su problema, alternativas y
justificación, están documentadas en [`DECISIONS.md`](./DECISIONS.md).

---

## Mejoras futuras

- **Catálogos de filtros desde backend**: hoy las opciones de filtro son un
  mock; en producción vendrían de un endpoint de catálogos dinámicos.
- **Pruebas de componentes**: complementar las pruebas de lógica pura con
  React Testing Library para los componentes presentacionales.
- **Ordenamiento por múltiples campos**: generalizar `sortTasks` para ordenar
  por otros campos además de la fecha de creación.
- **Mock de API más realista**: usar MSW (Mock Service Worker) para interceptar
  peticiones y simular estados de red con mayor fidelidad.