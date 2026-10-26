import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-gradient-to-b from-black to-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Link to="/" className="text-2xl font-black tracking-wider text-cine-red">
          CARTELERA
        </Link>
      </div>
    </header>
  );
}
