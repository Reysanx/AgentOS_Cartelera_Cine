import { Link, useParams } from 'react-router';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loader from '../components/Loader.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { getImageUrl, getMovie } from '../services/tmdb.js';

function getCertification(movie) {
  const spain = movie.release_dates?.results.find((r) => r.iso_3166_1 === 'ES');
  return spain?.release_dates.find((d) => d.certification)?.certification || 'Sin clasificar';
}

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h ${m} min` : `${m} min`;
}

function getTrailer(movie) {
  const trailers = (movie.videos?.results ?? []).filter((v) => v.site === 'YouTube' && v.type === 'Trailer');
  return trailers.find((v) => v.iso_639_1 === 'es') ?? trailers[0];
}

export default function Ficha() {
  const { id } = useParams();
  const { data: movie, loading, error, retry } = useFetch(() => getMovie(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onRetry={retry} message="No pudimos cargar la película. Inténtalo de nuevo." />;

  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const trailer = getTrailer(movie);
  const cast = (movie.credits?.cast ?? []).slice(0, 10);

  return (
    <article className="bg-gradient-to-b from-cine-red/40 via-cine-bg to-cine-bg">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/" className="text-sm text-cine-muted hover:text-white">
          ← Volver a la cartelera
        </Link>

        <div className="mt-6 flex flex-col gap-8 md:flex-row">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full max-w-xs self-center rounded shadow-2xl md:self-start"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold md:text-4xl">
              {movie.title} {year && <span className="font-normal text-cine-muted">({year})</span>}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-cine-muted">
              <span className="rounded border border-cine-muted px-2 py-0.5">{getCertification(movie)}</span>
              {runtime && <span>{runtime}</span>}
              {movie.genres?.length > 0 && <span>{movie.genres.map((g) => g.name).join(', ')}</span>}
            </div>

            <h2 className="mt-6 text-lg font-semibold">Sinopsis</h2>
            <p className="mt-2 leading-relaxed text-neutral-300">{movie.overview || 'Sinopsis no disponible.'}</p>

            <h2 className="mt-6 text-lg font-semibold">Reparto</h2>
            {cast.length > 0 ? (
              <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                {cast.map((person) => (
                  <li key={person.credit_id}>
                    <span className="text-white">{person.name}</span>
                    {person.character && <span className="text-cine-muted"> · {person.character}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-cine-muted">Reparto no disponible.</p>
            )}
          </div>
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Tráiler</h2>
          {trailer ? (
            <div className="aspect-video w-full overflow-hidden rounded bg-cine-surface">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                title={`Tráiler de ${movie.title}`}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <p className="text-sm text-cine-muted">Tráiler no disponible.</p>
          )}
        </section>
      </div>
    </article>
  );
}
