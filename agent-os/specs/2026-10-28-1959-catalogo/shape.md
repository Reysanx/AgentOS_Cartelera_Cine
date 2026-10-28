# Catálogo — Shaping Notes

## Scope

Añadir un apartado **Catálogo** en `/catalogo` con películas ya estrenadas, además de "En cines ahora" y "Próximos estrenos". Por defecto muestra los últimos dos años, de más reciente a más antigua, y carga más conforme el usuario hace scroll. Permite filtrar por año y buscar por título.

## Decisions

- Nombre y ruta: "Catálogo", `/catalogo`, con enlace en la cabecera.
- Listado por defecto con `/discover/movie`: últimos 2 años hasta hoy, `sort_by=primary_release_date.desc`, `vote_count.gte=50`, `include_adult=false`. El tope en hoy evita solapar con Próximos estrenos.
- Filtro por año (de 1900 al año actual): sustituye la ventana de 2 años por `primary_release_year`.
- Búsqueda por título con `/search/movie`, debounce de ~400 ms, sobre todo TMDB; combinable con el año. No admite el umbral de votos (limitación de TMDB, aceptada).
- Scroll infinito con `IntersectionObserver`: solo se descarga lo visible, de modo que dos años no sobrecargan. Tope de 500 páginas de TMDB.
- Si falla una página posterior, se conservan las películas cargadas y se ofrece reintentar.
- Sin filtros de género ni idioma en este apartado.
- Hook nuevo `useInfiniteMovies`, porque `useFetch` no pagina.
- `formatReleaseDate` se extrae de `ProximosEstrenos.jsx` a `src/utils/` para reutilizarla, sin cambiar su comportamiento.

## Context

- **Visuals:** ninguno; mismo estilo que la cartelera (Netflix con rojo oscuro).
- **References:** `Cartelera.jsx` (controles de búsqueda y filtros), `ProximosEstrenos.jsx` (página con fecha en la tarjeta), `MovieCard.jsx`, `Header.jsx`, `App.jsx`, `tmdb.js` y `useFetch.js`.
- **Product alignment:** encaja con la misión de "todo en un solo lugar". Se añade a la fase 2 del roadmap como "Catálogo".
- **Constitution:** no existe `constitution.md`; se siguen la misión, el roadmap, el stack y los estándares de Agent OS.

## Standards Applied

- `api/tmdb-client` — nuevas funciones `getX` por endpoint en `src/services/tmdb.js`.
- `api/tmdb-language-images` — idioma `es-ES`, región `ES` y `getImageUrl` con placeholder.
- `api/loading-error-states` — carga, error con reintento y datos; extendido a las páginas siguientes.
