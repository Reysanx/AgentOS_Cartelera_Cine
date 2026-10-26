import { Link } from 'react-router';
import { getImageUrl } from '../services/tmdb.js';

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/pelicula/${movie.id}`}
      className="group block rounded outline-none focus-visible:ring-2 focus-visible:ring-cine-red"
    >
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        loading="lazy"
        className="aspect-[2/3] w-full rounded bg-cine-surface object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <h3 className="mt-2 truncate text-sm text-cine-muted group-hover:text-white">{movie.title}</h3>
    </Link>
  );
}
