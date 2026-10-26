export default function ErrorMessage({ onRetry, message = 'No pudimos cargar las películas. Inténtalo de nuevo.' }) {
  return (
    <div className="px-4 py-24 text-center" role="alert">
      <p className="text-cine-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded bg-cine-red px-5 py-2 font-semibold hover:bg-cine-red-hover"
      >
        Reintentar
      </button>
    </div>
  );
}
