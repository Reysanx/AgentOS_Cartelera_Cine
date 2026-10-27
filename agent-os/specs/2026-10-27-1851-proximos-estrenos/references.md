# References for Próximos estrenos

## Similar Implementations

### Cartelera actual

- **Location:** `src/pages/Cartelera.jsx`
- **Relevance:** patrón de página para cargar y mostrar una colección de películas.
- **Key patterns:** `useFetch`, estados de carga/error/datos, cuadrícula responsive y filtros locales que no deben alterarse.

### Cabecera y rutas

- **Location:** `src/components/Header.jsx`, `src/App.jsx`
- **Relevance:** puntos de integración para hacer accesible la nueva sección.
- **Key patterns:** navegación con React Router y cabecera común a las rutas.

### Tarjetas y ficha de película

- **Location:** `src/components/MovieCard.jsx`
- **Relevance:** componente existente para presentar películas y navegar a su ficha.
- **Key patterns:** imagen con placeholder y enlace a `/pelicula/:id`.

### Cliente TMDB y estándares Agent OS

- **Location:** `src/services/tmdb.js`, `agent-os/standards/api/`
- **Relevance:** fuente de datos y estándares de idioma, imágenes y estados de interfaz.
- **Key patterns:** peticiones centralizadas, región e idioma por defecto, errores HTTP explícitos.

No se proporcionaron visuales.
