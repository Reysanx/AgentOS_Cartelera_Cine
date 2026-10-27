import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-gradient-to-b from-black to-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-2xl font-black tracking-wider text-cine-red">
          CARTELERA
        </Link>
        <nav aria-label="Navegación principal">
          <Link
            to="/proximos-estrenos"
            className="text-sm font-semibold text-white hover:text-cine-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cine-red"
          >
            Próximos estrenos
          </Link>
        </nav>
      </div>
    </header>
  );
}
