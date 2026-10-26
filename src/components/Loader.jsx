export default function Loader() {
  return (
    <div className="flex justify-center py-24" role="status" aria-label="Cargando">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cine-surface border-t-cine-red" />
    </div>
  );
}
