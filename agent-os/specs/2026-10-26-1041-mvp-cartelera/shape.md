# MVP Cartelera de Cine — Shaping Notes

## Scope

Todo el MVP del roadmap en una sola spec: preparar el proyecto (Vite + React), el **listado de películas** (cartelera en `/`) y la **ficha de película** (`/pelicula/:id`).

## Decisions

- JavaScript (`.js`/`.jsx`), no TypeScript, para coincidir con los ejemplos de los estándares
- React Router: ruta propia para la ficha, con URL que se puede compartir
- La cartelera usa `/movie/now_playing` de TMDB, en `es-ES` y región `ES`
- Tailwind CSS v4 para los estilos
- Estilo inspirado en Netflix, con un rojo más oscuro (`#8b0a1a`)
- La ficha incluye sinopsis, tráiler, clasificación, duración y reparto (alineado con la misión: "todo en un lugar")
- La clasificación sale de `release_dates` (ES), que se añade a `append_to_response`
- Reparto sin fotos, para respetar los tamaños de imagen del estándar

## Context

- **Visuals:** sin imágenes; nota de estilo en `visuals/notas.md`
- **References:** ninguna; el repositorio no tenía código de la app
- **Product alignment:** misión "información dispersa → todo en un lugar"; público general; React + Vite + TMDB sin backend

## Standards Applied

- api/tmdb-client — todo el acceso a TMDB pasa por `src/services/tmdb.js`
- api/loading-error-states — la cartelera y la ficha usan `useFetch` y muestran los tres estados
- api/tmdb-language-images — idioma y región en las peticiones; pósters con `getImageUrl` y placeholder
