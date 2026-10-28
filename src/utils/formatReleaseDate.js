const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function formatReleaseDate(releaseDate) {
  if (!releaseDate) return 'Fecha por confirmar';

  const date = new Date(`${releaseDate}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? 'Fecha por confirmar' : dateFormatter.format(date);
}
