# Búsqueda y filtros — Shaping Notes

## Scope

Añadir búsqueda por título y filtros de género e idioma original a la cartelera existente. Operan sobre los resultados actuales de TMDB `/movie/now_playing`; los filtros se pueden combinar.

El filtro por formato de exhibición queda aplazado: la API actual no proporciona datos de 2D/3D/IMAX y el usuario eligió esperar a disponer de una fuente adecuada.

## Decisions

- Mantener TMDB y la carga de cartelera existentes; filtrar localmente los resultados ya cargados.
- Buscar por título sin distinguir mayúsculas/minúsculas; recortar espacios exteriores.
- Consultar los nombres de género al endpoint de géneros de TMDB.
- Usar `original_language` para el idioma y exponer sus códigos disponibles en los resultados.
- Aplicar criterios simultáneamente y ofrecer una acción para limpiarlos.
- No añadir una fuente externa ni inferir formatos que TMDB no informa.

## Context

- **Visuals:** no se proporcionaron.
- **References:** `src/pages/Cartelera.jsx`, `src/services/tmdb.js`, `src/components/MovieCard.jsx` y los estándares TMDB existentes.
- **Product alignment:** facilita encontrar películas en cartelera, alineado con la misión de concentrar información para decidir qué ver.
- **User confirmation:** alcance limitado a la cartelera actual; idioma entendido como idioma original; formato pospuesto.
- **Constitution:** no existe `constitution.md`; se siguen la misión, roadmap, stack y estándares de Agent OS.

## Standards Applied

- `api/tmdb-client` — centralizar la consulta de géneros junto al resto de llamadas a TMDB.
- `api/tmdb-language-images` — conservar `es-ES`, región `ES` y las reglas de imágenes existentes.
- `api/loading-error-states` — mantener carga, error y datos con el patrón `useFetch`.
