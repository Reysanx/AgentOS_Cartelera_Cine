# Standards for Catálogo

The following standards apply to this work.

---

## api/tmdb-client

# Cliente TMDB

Todas las llamadas a TMDB pasan por `src/services/tmdb.js`.

```js
const BASE_URL = 'https://api.themoviedb.org/3';

async function request(path, params = {}) {
  const query = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'es-ES',
    region: 'ES',
    ...params,
  });
  const res = await fetch(`${BASE_URL}${path}?${query}`);
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${path}`);
  return res.json();
}

export const getNowPlaying = () => request('/movie/now_playing');
export const getMovie = (id) => request(`/movie/${id}`, { append_to_response: 'videos,credits' });
```

- Los componentes nunca llaman a `fetch` directamente
- Una función exportada por endpoint, con nombre `getX`
- Devuelve el JSON parseado; si la respuesta no es ok, lanza `Error`
- El componente captura el error (ver api/loading-error-states.md)

---

## api/tmdb-language-images

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

---

## api/loading-error-states

# Estados de carga y error

Los componentes piden datos con `useFetch` (`src/hooks/useFetch.js`), nunca con useEffect + fetch propios.

```js
export function useFetch(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => !ignore && setState({ data, loading: false, error: null }))
      .catch((error) => !ignore && setState({ data: null, loading: false, error }));
    return () => { ignore = true; };
  }, [...deps, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
```

```jsx
const { data, loading, error, retry } = useFetch(() => getMovie(id), [id]);
if (loading) return <Loader />;
if (error) return <ErrorMessage onRetry={retry} />;
```

- Renderizar siempre los tres estados: carga, error, datos
- `ErrorMessage` muestra un texto amigable en español y un botón "Reintentar"
- Nunca mostrar `error.message` al usuario; solo `console.error`
