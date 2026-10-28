const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

async function request(path, params = {}) {
  const query = new URLSearchParams(
    Object.entries({
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      language: 'es-ES',
      region: 'ES',
      ...params,
    }).filter(([, value]) => value != null),
  );
  const res = await fetch(`${BASE_URL}${path}?${query}`);
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${path}`);
  return res.json();
}

export const getNowPlaying = () => request('/movie/now_playing');

export const getUpcoming = () => request('/movie/upcoming');

const toIsoDate = (date) => date.toLocaleDateString('sv-SE');

export const getCatalogPage = ({ page = 1, year } = {}) => {
  const today = new Date();
  // region: null → con región ES TMDB filtra por estreno regional y desordena las fechas globales
  const params = {
    region: null,
    page,
    sort_by: 'primary_release_date.desc',
    'vote_count.gte': 50,
    include_adult: false,
    'primary_release_date.lte': toIsoDate(today),
  };
  if (year) {
    params.primary_release_year = year;
  } else {
    const twoYearsAgo = new Date(today);
    twoYearsAgo.setFullYear(today.getFullYear() - 2);
    params['primary_release_date.gte'] = toIsoDate(twoYearsAgo);
  }
  return request('/discover/movie', params);
};

export const searchMoviesPage = ({ query, page = 1, year } = {}) =>
  request('/search/movie', {
    region: null,
    query,
    page,
    include_adult: false,
    ...(year && { primary_release_year: year }),
  });

export const getMovieGenres =() => request('/genre/movie/list');

export const getMovie = (id) =>
  request(`/movie/${id}`, {
    append_to_response: 'videos,credits,release_dates',
    include_video_language: 'es,en',
  });

export const getImageUrl = (path, size = 'w342') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '/poster-placeholder.svg';
