# References for Catálogo

## Similar Implementations

### Cartelera actual

- **Location:** `src/pages/Cartelera.jsx`
- **Relevance:** controles de búsqueda y filtros que el Catálogo debe imitar visualmente.
- **Key patterns:** `label` + `input type="search"`, `select` con estilos Tailwind, botón "Limpiar filtros", cuadrícula responsive. Sus filtros no deben alterarse.

### Próximos estrenos

- **Location:** `src/pages/ProximosEstrenos.jsx`
- **Relevance:** página con cuadrícula de tarjetas y fecha de estreno.
- **Key patterns:** `formatReleaseDate` (se extrae a `src/utils/`), `MovieCard` con `releaseDate`, estados de carga/error/vacío.

### Tarjetas, cabecera y rutas

- **Location:** `src/components/MovieCard.jsx`, `src/components/Header.jsx`, `src/App.jsx`
- **Relevance:** reutilización de la tarjeta y puntos de integración del nuevo enlace y ruta.
- **Key patterns:** enlace a `/pelicula/:id`, `<nav>` con clases de foco, `<Routes>` de React Router.

### Cliente TMDB y carga de datos

- **Location:** `src/services/tmdb.js`, `src/hooks/useFetch.js`
- **Relevance:** base para las nuevas funciones y para el hook paginado.
- **Key patterns:** `request()` con idioma y región por defecto; patrón `ignore` para descartar respuestas obsoletas; `console.error` en los fallos.

No se proporcionaron visuales.
