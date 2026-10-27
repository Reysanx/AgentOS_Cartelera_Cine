# Próximos estrenos — Shaping Notes

## Scope

Añadir una página independiente de próximos estrenos en `/proximos-estrenos`, accesible desde la cabecera. La lista se obtiene de TMDB para España y permite abrir la ficha existente de cada película.

## Decisions

- Usar el endpoint `/movie/upcoming` de TMDB; la región por defecto `ES` delimita los estrenos al mercado español.
- Mantener el idioma `es-ES` y las imágenes a través de las funciones ya existentes del cliente TMDB.
- Añadir un enlace a la nueva ruta en la cabecera; conservar el logo enlazado a la cartelera.
- Reutilizar `MovieCard` y añadir la fecha de estreno localizada, con un texto alternativo claro cuando falte.
- Mantener la lista en la primera página de resultados de TMDB, sin introducir paginación, filtros o fuentes adicionales.
- Mantener intacta la búsqueda y los filtros de la cartelera actual.

## Context

- **Visuals:** no se proporcionaron.
- **References:** página de cartelera, cabecera, tarjetas, cliente TMDB, hook `useFetch` y estándares existentes.
- **Product alignment:** completa la fase Post-Launch del roadmap y ayuda al público general a descubrir películas antes de su estreno en cines.
- **User confirmation:** la funcionalidad será una página propia con ruta `/proximos-estrenos` y enlace en la cabecera.
- **Constitution:** no existe `constitution.md`; se siguen la misión, el roadmap, el stack y los estándares de Agent OS.

## Standards Applied

- `api/tmdb-client` — centralizar la consulta del endpoint upcoming en `src/services/tmdb.js`.
- `api/tmdb-language-images` — conservar el idioma, la región y el uso de `getImageUrl` con placeholder.
- `api/loading-error-states` — usar `useFetch` y renderizar carga, error/reintento y datos.
