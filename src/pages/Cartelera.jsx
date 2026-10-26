import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { getNowPlaying } from '../services/tmdb.js';

export default function Cartelera() {
  const { data, loading, error, retry } = useFetch(getNowPlaying, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onRetry={retry} />;

  const movies = data.results ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">En cines ahora</h1>
      {movies.length === 0 ? (
        <p className="text-cine-muted">No hay películas en cartelera.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
