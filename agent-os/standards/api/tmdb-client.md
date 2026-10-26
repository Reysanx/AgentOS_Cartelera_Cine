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
