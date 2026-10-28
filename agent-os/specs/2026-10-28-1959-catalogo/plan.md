# Plan: Catálogo de películas anteriores

## Contexto

La app ya tiene "En cines ahora" (`/`) y "Próximos estrenos" (`/proximos-estrenos`). Falta un tercer apartado para consultar películas que ya se estrenaron: un **Catálogo** en `/catalogo`. No debe cargar todo el histórico: por defecto muestra los últimos dos años, de más reciente a más antigua, y va pidiendo más conforme el usuario hace scroll. Un filtro por año permite ir a cualquier otro año, y un buscador por título permite encontrar una película concreta.

**Decisiones:**
- Ruta `/catalogo`, enlace "Catálogo" en la cabecera (junto a "Próximos estrenos"), título de página "Catálogo".
- Listado por defecto con `/discover/movie`: `primary_release_date.gte` = hoy − 2 años, `primary_release_date.lte` = hoy, `sort_by=primary_release_date.desc`, `vote_count.gte=50`, `include_adult=false`. El tope de fecha en hoy evita solapar con "Próximos estrenos".
- Filtro por año: un `<select>` de año (del actual a 1900). Con año elegido, se usa `/discover/movie` con `primary_release_year` (en lugar del rango de 2 años), mismo orden y mismo umbral de votos.
- Búsqueda por título: `/search/movie` (con `primary_release_year` si hay año elegido), `include_adult=false`, con debounce de ~400 ms. Busca en todo TMDB (no se limita a los 2 años) y se ordena por relevancia, que es lo que devuelve la API. TMDB no permite aplicar el umbral de votos a la búsqueda; es una limitación aceptada.
- Scroll infinito: páginas de 20, nueva página cuando un elemento centinela entra en pantalla (`IntersectionObserver`, `rootMargin` ~400 px). Solo se descarga lo que se ve, así que dos años no sobrecargan. Se para al llegar a `total_pages` (máximo 500 de TMDB).
- Carga de páginas siguientes: spinner pequeño al final; si falla una página posterior, las películas ya cargadas se mantienen y se muestra `ErrorMessage` compacto con "Reintentar".
- Sin géneros ni idioma en el Catálogo (fuera de alcance, el usuario eligió solo año y título).
- Hook nuevo `useInfiniteMovies` (el estándar `useFetch` no pagina); respeta el mismo contrato de estados.
- Extraer `formatReleaseDate` de `ProximosEstrenos.jsx` a un módulo compartido y reutilizarlo en el Catálogo mostrando la fecha en cada tarjeta. Es un refactor mínimo, sin cambio de comportamiento en Próximos estrenos.

**Alineación con el producto:** encaja con la misión de "todo en un solo lugar". Se añade al roadmap (Phase 2) como "Catálogo".

**Estándares:** `api/tmdb-client`, `api/tmdb-language-images`, `api/loading-error-states`. No hay `constitution.md`.

## Tarea 1: Guardar documentación de la spec (T001)

Crear `agent-os/specs/2026-10-28-1959-catalogo/` con:
- `plan.md` — este plan.
- `shape.md` — notas de shaping (alcance, decisiones, contexto, estándares aplicados).
- `standards.md` — contenido completo de los tres estándares.
- `references.md` — Cartelera.jsx, ProximosEstrenos.jsx, MovieCard.jsx, Header.jsx/App.jsx, tmdb.js, useFetch.js.
- Sin `visuals/` (no se proporcionaron; mismo estilo Netflix con rojo oscuro).

## Tarea 2: Cliente TMDB y hook de scroll infinito (T002)

Requisitos: REQ-001, REQ-002, REQ-003, REQ-004.

- `src/services/tmdb.js`: añadir `getCatalogPage({ page, year })` → `/discover/movie` y `searchMoviesPage({ query, page, year })` → `/search/movie`. Reutilizan `request()` (idioma/región por defecto) y siguen el estándar: una función `getX` por endpoint, devuelven JSON o lanzan `Error`. Calcular las fechas del rango por defecto en el servicio o en la página, en formato `YYYY-MM-DD`.
- `src/hooks/useInfiniteMovies.js`: recibe `fetchPage(page)` y `deps`; devuelve `{ movies, loading, loadingMore, error, loadMoreError, hasMore, loadMore, retry }`.
  - Al cambiar `deps` (año o búsqueda) reinicia lista y página, y descarta respuestas obsoletas (patrón `ignore` de `useFetch`).
  - Evita duplicados por `id` al concatenar páginas.
  - `console.error` en los fallos, como el estándar; nunca expone `error.message`.
  - `hasMore` = `page < Math.min(total_pages, 500)`.
- `src/utils/formatReleaseDate.js`: función extraída de `ProximosEstrenos.jsx` (que pasa a importarla).

## Tarea 3: Página Catálogo, ruta y cabecera (T003)

Requisitos: REQ-001 a REQ-005. Depende de T002.

- `src/pages/Catalogo.jsx`:
  - Controles reutilizando el estilo de `Cartelera.jsx`: buscador (`type="search"`, label accesible) y selector de año ("Últimos 2 años" como opción por defecto), más botón "Limpiar filtros" cuando hay algo activo.
  - Debounce del texto de búsqueda (~400 ms) y recorte de espacios; búsqueda vacía → vuelve al listado por defecto.
  - Cuadrícula idéntica a la de Cartelera/Próximos estrenos con `MovieCard` y `releaseDate`.
  - Estados: carga inicial (`Loader`), error inicial (`ErrorMessage` con reintento), sin resultados ("No hay películas que coincidan…"), carga de más (spinner) y error de página siguiente (`ErrorMessage` compact).
  - Centinela con `IntersectionObserver` que llama a `loadMore` solo si `hasMore` y no hay carga en curso.
- `src/App.jsx`: `<Route path="/catalogo" element={<Catalogo />} />`.
- `src/components/Header.jsx`: segundo enlace "Catálogo" en el `<nav>` existente, con las mismas clases de foco.
- No tocar `Cartelera.jsx` ni su comportamiento.

## Tarea 4: Validar y reflejar el alcance (T004)

Depende de T003. Ejecutar `npm run build`, comprobar la verificación manual y actualizar `agent-os/product/roadmap.md` con la entrada "Catálogo" en Phase 2 (ruta, ventana de 2 años, filtros de año y título, scroll infinito). Añadir la etapa correspondiente a `docs/bitacora.md`.

## Requirement Mapping

| Requirement | Criterio de aceptación | Tarea |
|---|---|---|
| REQ-001 | `/catalogo` muestra por defecto las películas de los últimos 2 años con votos suficientes, de más reciente a más antigua, con póster, título y fecha. | T002, T003 |
| REQ-002 | Al hacer scroll se cargan páginas adicionales hasta agotar resultados, sin duplicados, y sin descargar más de lo visible al inicio. | T002, T003 |
| REQ-003 | El filtro por año sustituye la ventana de 2 años por ese año; "Limpiar filtros" restaura el listado por defecto. | T002, T003 |
| REQ-004 | La búsqueda por título (con debounce) encuentra películas de cualquier año, combinable con el año, y distingue "sin coincidencias" de error. | T002, T003 |
| REQ-005 | Hay enlace "Catálogo" en la cabecera, las tarjetas abren `/pelicula/:id`, y carga, error con reintento (inicial y de páginas siguientes) y lista vacía siguen los estándares. La cartelera y Próximos estrenos no cambian. | T003, T004 |

## Verificación

- `npm run build` (sin tests ni script de contrato de API en el repo).
- Con una `VITE_TMDB_API_KEY` válida (hoy da 401 por tener 31 caracteres) y `npm run dev`:
  - `/catalogo` carga 20 películas ordenadas por fecha descendente, todas dentro de los últimos 2 años; en la pestaña Network aparece una sola petición `discover/movie?page=1`.
  - Al hacer scroll aparecen `page=2`, `page=3`… sin títulos repetidos.
  - Elegir un año (p. ej. 2010) reinicia la lista con películas solo de ese año; "Limpiar filtros" vuelve al estado por defecto.
  - Buscar "matrix" devuelve películas de cualquier año; combinada con un año filtra por él; un texto sin coincidencias muestra el mensaje de vacío.
  - Cambiar rápido de filtro no mezcla resultados antiguos (descarte de respuestas obsoletas).
  - Simular un fallo de red (offline) en la página 2: se mantienen las películas y aparece "Reintentar".
  - El enlace de la cabecera navega entre Cartelera, Próximos estrenos y Catálogo; recargar `/catalogo` funciona; las fichas abren con normalidad.
  - Cartelera (filtros) y Próximos estrenos siguen igual, incluida la fecha formateada.
