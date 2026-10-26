import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { getMovieGenres, getNowPlaying } from '../services/tmdb.js';

const languageNames = new Intl.DisplayNames(['es-ES'], { type: 'language' });
const getLanguageLabel = (language) => languageNames.of(language) ?? language;

export default function Cartelera() {
  const { data, loading, error, retry } = useFetch(getNowPlaying, []);
  const {
    data: genreData,
    loading: genresLoading,
    error: genresError,
    retry: retryGenres,
  } = useFetch(getMovieGenres, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreId, setGenreId] = useState('');
  const [languageCode, setLanguageCode] = useState('');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onRetry={retry} />;

  const movies = data.results ?? [];
  const genres = genreData?.genres ?? [];
  const languages = [...new Set(movies.map((movie) => movie.original_language).filter(Boolean))]
    .sort((a, b) => getLanguageLabel(a).localeCompare(getLanguageLabel(b), 'es'));
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es');
  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = !normalizedSearch || movie.title.toLocaleLowerCase('es').includes(normalizedSearch);
    const matchesGenre = !genreId || movie.genre_ids?.includes(Number(genreId));
    const matchesLanguage = !languageCode || movie.original_language === languageCode;
    return matchesTitle && matchesGenre && matchesLanguage;
  });
  const hasActiveFilters = Boolean(normalizedSearch || genreId || languageCode);

  function clearFilters() {
    setSearchTerm('');
    setGenreId('');
    setLanguageCode('');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">En cines ahora</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="movie-search" className="mb-1 block text-sm text-cine-muted">
            Buscar por título
          </label>
          <input
            id="movie-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Escribe un título"
            className="w-full rounded border border-neutral-700 bg-cine-surface px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-cine-red"
          />
        </div>
        <div>
          <label htmlFor="genre-filter" className="mb-1 block text-sm text-cine-muted">
            Género
          </label>
          <select
            id="genre-filter"
            value={genreId}
            onChange={(event) => setGenreId(event.target.value)}
            disabled={genresLoading || Boolean(genresError)}
            className="w-full rounded border border-neutral-700 bg-cine-surface px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-cine-red disabled:opacity-60"
          >
            <option value="">{genresLoading ? 'Cargando géneros...' : 'Todos los géneros'}</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language-filter" className="mb-1 block text-sm text-cine-muted">
            Idioma original
          </label>
          <select
            id="language-filter"
            value={languageCode}
            onChange={(event) => setLanguageCode(event.target.value)}
            className="w-full rounded border border-neutral-700 bg-cine-surface px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-cine-red"
          >
            <option value="">Todos los idiomas</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {languageNames.of(language) ?? language}
              </option>
            ))}
          </select>
        </div>
      </div>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="mb-6 rounded bg-cine-red px-4 py-2 font-semibold text-white hover:bg-cine-red-hover"
        >
          Limpiar filtros
        </button>
      )}
      {genresError && (
        <ErrorMessage
          onRetry={retryGenres}
          message="No pudimos cargar los géneros. Inténtalo de nuevo."
          compact
        />
      )}
      {movies.length === 0 ? (
        <p className="text-cine-muted">No hay películas en cartelera.</p>
      ) : filteredMovies.length === 0 ? (
        <div className="text-cine-muted">
          <p>No hay películas que coincidan con la búsqueda y los filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
