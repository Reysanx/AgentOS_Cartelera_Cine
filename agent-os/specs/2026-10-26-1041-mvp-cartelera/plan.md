# Plan: MVP Cartelera de Cine

## Contexto

El producto (`agent-os/product/`) busca resolver la información dispersa sobre las películas en cartelera: una sola cartelera y una ficha por película con sinopsis, tráiler, clasificación, duración y reparto. El repositorio todavía no tiene código de la app, solo la documentación de Agent OS y los estándares de `agent-os/standards/api/`. Esta spec, preparada con `shape-spec`, cubre todo el MVP del roadmap: el **listado de películas** y la **ficha de película**.

**Decisiones de shaping:**
- **Stack:** React + Vite en JavaScript (`.js`/`.jsx`), Tailwind CSS v4 y React Router.
- **Rutas:** la cartelera en `/` y la ficha en `/pelicula/:id`.
- **Datos:** la cartelera muestra `/movie/now_playing` de TMDB con `es-ES` y región `ES`.
- **Estilo:** inspirado en Netflix (fondo oscuro, cuadrícula de pósters), con un rojo más oscuro que el de Netflix.
- **Referencias:** no hay código de referencia; se siguen los tres estándares de `api/`.

**Entorno:** Node v24.22.1 y npm 11.19.1 están instalados en `C:\Program Files\nodejs\`, pero no en el PATH. En cada comando se antepone `$env:Path = "C:\Program Files\nodejs;" + $env:Path` (PowerShell).

---

## Tarea 1: Guardar la documentación de la spec

Crear `agent-os/specs/2026-10-26-1041-mvp-cartelera/` con:
- **plan.md**: este plan completo.
- **shape.md**: alcance (todo el MVP), las decisiones de arriba y el contexto (sin referencias de código; alineado con mission/roadmap). Incluye los estándares aplicados y por qué aplican.
- **standards.md**: contenido completo de `api/tmdb-client.md`, `api/loading-error-states.md` y `api/tmdb-language-images.md`.
- **references.md**: "Sin implementaciones de referencia; el repositorio no tenía código de la app."
- **visuals/notas.md**: "Estilo Netflix, pero con un rojo más oscuro". No se aportaron imágenes.

## Tarea 2: Preparar el proyecto (Vite + React + Tailwind + Router)

La raíz del repo ya tiene `.claude/`, `agent-os/`, `docs/`, `.gitignore`, `.env` y `README.md`. No se usa `npm create vite` (pregunta antes de tocar una carpeta que no está vacía); los archivos base se escriben a mano:
- `package.json`: `type: module` y los scripts `dev`, `build` y `preview`.
- `npm install react react-dom react-router`
- `npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite`
- `vite.config.js` con los plugins `react()` y `tailwindcss()`.
- `index.html` con `lang="es"`, título "Cartelera de Cine" y `<div id="root">`.
- `src/main.jsx` (monta `<BrowserRouter><App/></BrowserRouter>`) y `src/App.jsx` (las `<Routes>` de `/` y `/pelicula/:id`, más una 404 sencilla).
- `public/poster-placeholder.svg`: póster genérico en gris oscuro con un icono de claqueta.

No se modifican ni `.gitignore` (ya cubre `node_modules/` y `dist/`) ni `.env`.

## Tarea 3: Tema visual

`src/index.css`:
```css
@import "tailwindcss";
@theme {
  --color-cine-red: #8b0a1a;       /* rojo oscuro de marca */
  --color-cine-red-hover: #a50f22;
  --color-cine-bg: #0b0b0b;
  --color-cine-surface: #181818;
  --color-cine-muted: #a3a3a3;
}
body { @apply bg-cine-bg text-white antialiased; }
```
- La cabecera es fija, con degradado de negro a transparente y el logo "CARTELERA" en `text-cine-red` en negrita.
- Las tarjetas crecen ligeramente al pasar el ratón (`hover:scale-105`) y tienen un anillo rojo cuando reciben el foco.

## Tarea 4: Servicio TMDB y hook `useFetch`

Siguiendo exactamente los estándares:
- `src/services/tmdb.js`:
  - `request()` con `api_key`, `language: 'es-ES'` y `region: 'ES'`.
  - `getNowPlaying()`.
  - `getMovie(id)` con `append_to_response: 'videos,credits,release_dates'` e `include_video_language: 'es,en'`. Se añade `release_dates` (que el estándar no incluye) para obtener la clasificación.
  - `getImageUrl(path, size = 'w342')`, que devuelve `/poster-placeholder.svg` si no hay ruta.
- `src/hooks/useFetch.js`: el hook del estándar, añadiendo `console.error(error)` en el `.catch` (el pendiente que quedó anotado en la bitácora).

## Tarea 5: Componentes comunes (`src/components/`)

- `Header.jsx`: logo que enlaza a `/`.
- `Loader.jsx`: spinner rojo centrado.
- `ErrorMessage.jsx`: "No pudimos cargar las películas. Inténtalo de nuevo." y un botón "Reintentar" (`bg-cine-red`) que llama a `onRetry`. Nunca muestra `error.message`.
- `MovieCard.jsx`: un `<Link to={`/pelicula/${id}`}>` con el póster (`getImageUrl(poster_path)`, `loading="lazy"`, `alt` con el título) y el título debajo.

## Tarea 6: Página Cartelera (`src/pages/Cartelera.jsx`, ruta `/`)

- `useFetch(getNowPlaying, [])`, con los tres estados: carga, error y datos.
- Encabezado "En cines ahora".
- Cuadrícula responsive: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`.
- Se usa `data.results`. Si llega vacío, se muestra "No hay películas en cartelera".

## Tarea 7: Página Ficha (`src/pages/Ficha.jsx`, ruta `/pelicula/:id`)

- `useFetch(() => getMovie(id), [id])`, con los tres estados.
- Disposición: póster `w500` a la izquierda (arriba en móvil) y los datos a la derecha, sobre un degradado que va de `cine-red` a `cine-bg`.
- **Datos que se muestran:**
  - título y año
  - **clasificación:** de `release_dates.results` con `iso_3166_1 === 'ES'`, la primera `certification` que no esté vacía; si no hay, "Sin clasificar"
  - **duración:** `runtime` en formato "2 h 15 min"
  - géneros
  - **sinopsis:** `overview`, o "Sinopsis no disponible" si viene vacía
- **Tráiler:** de `videos.results`, el primero con `site === 'YouTube'` y `type === 'Trailer'`, prefiriendo `iso_639_1 === 'es'`. Se incrusta un `<iframe>` de `youtube-nocookie.com/embed/{key}` en proporción 16:9. Sin tráiler, "Tráiler no disponible".
- **Reparto:** los 10 primeros de `credits.cast`, con nombre y personaje (sin fotos, para respetar los tamaños de imagen del estándar).
- Enlace "← Volver a la cartelera".

## Tarea 8: Documentación y cierre

- `agent-os/product/tech-stack.md`: añadir Tailwind CSS v4 y React Router en Frontend.
- Volver a crear `.env.example` con `VITE_TMDB_API_KEY=` (se borró). **Antes, confirmarlo con el usuario.**
- `docs/bitacora.md`: añadir la etapa 6 (shape-spec con todas sus preguntas y respuestas) y la etapa 7 (implementación con comandos y archivos), y poner al día "Estado actual" y "Siguientes pasos".
- No hacer commit ni push salvo que el usuario lo pida.

---

## Archivos críticos
- `src/services/tmdb.js` y `src/hooks/useFetch.js`: base de todo el acceso a datos.
- `src/pages/Cartelera.jsx` y `src/pages/Ficha.jsx`.
- `src/index.css`: tema.
- `agent-os/specs/2026-10-26-1041-mvp-cartelera/*`

## Verificación
1. `npm run build` termina sin errores.
2. `npm run dev` y abrir `http://localhost:5173`. **Requiere la API key real en `.env`**; ahora contiene `tu_api_key_aqui`.
3. **Cartelera:** aparece la cuadrícula de now_playing en español, con un spinner mientras carga.
4. **Ficha:** al pulsar una tarjeta, la URL pasa a `/pelicula/:id` y se ven la clasificación, la duración, la sinopsis, el tráiler y el reparto. Recargar la página con esa URL también funciona.
5. **Error:** con una clave inválida en `.env` (y reiniciando el servidor), aparece el mensaje con "Reintentar" y el detalle solo sale en la consola.
6. **Responsive:** a 375 px de ancho hay 2 columnas y no aparece scroll horizontal.
