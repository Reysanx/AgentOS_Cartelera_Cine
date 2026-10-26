# Idioma e imágenes TMDB

Todas las peticiones usan `language=es-ES` y `region=ES`, añadidos por defecto en `request()`:

```js
const query = new URLSearchParams({
  api_key: import.meta.env.VITE_TMDB_API_KEY,
  language: 'es-ES',
  region: 'ES',
  ...params,
});
```

URLs de imágenes solo con `getImageUrl` (`src/services/tmdb.js`):

```js
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path, size = 'w342') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '/poster-placeholder.svg';
```

- Tamaños: `w342` en la cartelera, `w500` en la ficha, `original` nunca
- Sin `poster_path` → placeholder local, nunca ocultar la película
- Para tráilers, usar `videos` en `es-ES` y si no hay, pedir `include_video_language=es,en`
