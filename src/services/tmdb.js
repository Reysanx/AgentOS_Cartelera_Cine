const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

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

export const getMovie = (id) =>
  request(`/movie/${id}`, {
    append_to_response: 'videos,credits,release_dates',
    include_video_language: 'es,en',
  });

export const getImageUrl = (path, size = 'w342') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '/poster-placeholder.svg';
