# Cartelera de Cine 🎬

Una aplicación web moderna, rápida y responsiva para consultar películas en cartelera, próximos estrenos, catálogo general y fichas técnicas completas con tráilers, reparto y detalles de producción. Construida con **React 19**, **Vite**, **Tailwind CSS v4** y alimentada por la API de **TMDB (The Movie Database)**.

---

## ✨ Características

- 🎥 **Cartelera en Tiempo Real**: Consulta las películas actualmente en cines (`/`).
- 🗓️ **Próximos Estrenos**: Descubre los lanzamientos futuros confirmados (`/proximos-estrenos`).
- 📚 **Catálogo y Búsqueda**: Explora películas con paginación, filtros por año y buscador integrado en tiempo real (`/catalogo`).
- 📄 **Ficha Detallada**: Información exhaustiva de cada película:
  - Sinopsis completa y título original.
  - Puntuación de usuarios, duración y fecha de lanzamiento.
  - Géneros cinematográficos asociados.
  - Tráiler oficial integrado vía YouTube.
  - Reparto y equipo técnico principal.
- 📱 **Diseño Adaptativo (Mobile-First)**: Interfaz oscura moderna optimizada para móviles, tablets y escritorios.

---

## 🛠️ Stack Tecnológico

- **Frontend:** [React 19](https://react.dev/)
- **Enrutamiento:** [React Router v8](https://reactrouter.com/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Herramienta de Construcción (Build Tool):** [Vite](https://vitejs.dev/)
- **Fuente de Datos:** [The Movie Database (TMDB) API](https://www.themoviedb.org/)

---

## 📁 Estructura del Proyecto

```text
├── public/                 # Archivos estáticos y recursos públicos
├── src/
│   ├── components/         # Componentes reutilizables (Header, MovieCard, Loader, etc.)
│   ├── hooks/              # Custom hooks para lógica compartida
│   ├── pages/              # Vistas principales (Cartelera, ProximosEstrenos, Catalogo, Ficha)
│   ├── services/           # Cliente de conexión con la API de TMDB (tmdb.js)
│   ├── utils/              # Funciones de ayuda y utilidades
│   ├── App.jsx             # Definición de rutas y estructura principal
│   ├── index.css           # Estilos globales y directivas de Tailwind
│   └── main.jsx            # Punto de entrada de la aplicación
├── .env.example            # Plantilla de variables de entorno
├── index.html              # HTML base
├── package.json            # Dependencias y scripts
└── vite.config.js          # Configuración de Vite y plugins
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- [npm](https://www.npmjs.com/) (incluido con Node.js), `pnpm` o `yarn`.
- Una clave de API gratuita de [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api).

---

## 🚀 Instalación y Uso en Desarrollo

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/cartelera-cine.git
cd cartelera-cine
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```bash
cp .env.example .env
```

Abre `.env` y define tu clave de API de TMDB:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

> **Nota:** La clave debe tener el prefijo `VITE_` para que Vite la exponga al cliente.

### 4. Iniciar el servidor local
```bash
npm run dev
```

Abre en tu navegador la URL que indique la consola (normalmente `http://localhost:5173`).

---

## 📦 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida (HMR). |
| `npm run build` | Compila y optimiza la aplicación para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente la compilación de producción generada en `dist/`. |

---

## 🌐 Guía de Despliegue (Deployment)

Para poner en producción la aplicación en cualquier proveedor de hosting estático (Vercel, Netlify, Render, Cloudflare Pages, etc.):

### 1. Generar la compilación de producción
```bash
npm run build
```
Esto creará la carpeta optimizada `dist/`.

---

### Opción A: Despliegue en Vercel (Recomendado)

1. Conecta tu repositorio de GitHub a [Vercel](https://vercel.com/).
2. Configura los parámetros del proyecto:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. En la sección **Environment Variables**, añade:
   - Nombre: `VITE_TMDB_API_KEY`
   - Valor: `[Tu API Key de TMDB]`
4. **Configuración de rutas SPA (React Router):**  
   Crea o añade un archivo `vercel.json` en la raíz si experimentas errores 404 al recargar rutas internas:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
5. Haz clic en **Deploy**.

---

### Opción B: Despliegue en Netlify

1. Vincula tu repositorio en [Netlify](https://www.netlify.com/).
2. Ajusta los parámetros:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. En **Site configuration > Environment variables**, añade la variable `VITE_TMDB_API_KEY`.
4. **Manejo de rutas SPA:**  
   Crea un archivo llamado `_redirects` dentro de la carpeta `public/` con la siguiente regla:
   ```text
   /*    /index.html   200
   ```
5. Publica el sitio.

---

### Opción C: Servidor Nginx o Hosting Tradicional

Si utilizas un servidor web como Nginx o Apache:
1. Copia el contenido de la carpeta `dist/` a tu directorio raíz web (ej. `/var/www/html`).
2. Configura el servidor para redirigir todas las peticiones a `index.html` para permitir el enrutamiento del lado del cliente:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

---

## 🔒 Variables de Entorno

| Variable | Descripción | Obligatoria |
|---|---|:---:|
| `VITE_TMDB_API_KEY` | Clave pública de acceso a la API v3 de The Movie Database. | Sí |

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas aportar mejoras o corregir incidencias:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'feat: agrega nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).
