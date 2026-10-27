import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { getUpcoming } from '../services/tmdb.js';

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

function formatReleaseDate(releaseDate) {
  if (!releaseDate) return 'Fecha por confirmar';

  const date = new Date(`${releaseDate}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? 'Fecha por confirmar' : dateFormatter.format(date);
}

export default function ProximosEstrenos() {
  const { data, loading, error, retry } = useFetch(getUpcoming, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onRetry={retry} />;

  const movies = data.results ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Próximos estrenos</h1>
      {movies.length === 0 ? (
        <p className="text-cine-muted">No hay próximos estrenos.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              releaseDate={formatReleaseDate(movie.release_date)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
