import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies.js';
import { getCatalogPage, searchMoviesPage } from '../services/tmdb.js';
import { formatReleaseDate } from '../utils/formatReleaseDate.js';

const FIRST_YEAR = 1900;
const SEARCH_DEBOUNCE_MS = 400;
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, i) => currentYear - i);

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [year, setYear] = useState('');
  const sentinelRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { movies, loading, loadingMore, error, loadMoreError, hasMore, loadMore, retry } =
    useInfiniteMovies(
      (page) =>
        debouncedSearch
          ? searchMoviesPage({ query: debouncedSearch, page, year })
          : getCatalogPage({ page, year }),
      [debouncedSearch, year],
    );

  const canObserve = hasMore && !loading && !loadingMore && !loadMoreError;
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!canObserve || !sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: '400px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [canObserve, movies.length, loadMore]);

  const hasActiveFilters = Boolean(searchTerm.trim() || year);

  function clearFilters() {
    setSearchTerm('');
    setDebouncedSearch('');
    setYear('');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Catálogo</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="catalog-search" className="mb-1 block text-sm text-cine-muted">
            Buscar por título
          </label>
          <input
            id="catalog-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Escribe un título"
            className="w-full rounded border border-neutral-700 bg-cine-surface px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-cine-red"
          />
        </div>
        <div>
          <label htmlFor="catalog-year" className="mb-1 block text-sm text-cine-muted">
            Año de estreno
          </label>
          <select
            id="catalog-year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="w-full rounded border border-neutral-700 bg-cine-surface px-3 py-2 text-white outline-none focus-visible:ring-2 focus-visible:ring-cine-red"
          >
            <option value="">Últimos 2 años</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
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
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage onRetry={retry} />
      ) : movies.length === 0 ? (
        <p className="text-cine-muted">
          {hasActiveFilters
            ? 'No hay películas que coincidan con la búsqueda y los filtros.'
            : 'No hay películas en el catálogo.'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                releaseDate={formatReleaseDate(movie.release_date)}
              />
            ))}
          </div>
          {loadingMore && (
            <div className="flex justify-center py-8" role="status" aria-label="Cargando más películas">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-cine-surface border-t-cine-red" />
            </div>
          )}
          {loadMoreError && (
            <ErrorMessage
              onRetry={loadMore}
              message="No pudimos cargar más películas. Inténtalo de nuevo."
              compact
            />
          )}
          <div ref={sentinelRef} aria-hidden="true" className="h-px" />
        </>
      )}
    </section>
  );
}
