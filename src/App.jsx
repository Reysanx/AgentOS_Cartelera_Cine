import { Link, Route, Routes } from 'react-router';
import Header from './components/Header.jsx';
import Cartelera from './pages/Cartelera.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Ficha from './pages/Ficha.jsx';
import ProximosEstrenos from './pages/ProximosEstrenos.jsx';

function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <Link to="/" className="mt-4 inline-block text-cine-muted hover:text-white">
        ← Volver a la cartelera
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Cartelera />} />
          <Route path="/proximos-estrenos" element={<ProximosEstrenos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/pelicula/:id" element={<Ficha />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
