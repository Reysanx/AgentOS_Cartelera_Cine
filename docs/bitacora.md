# Bitácora: Cartelera de Cine con Agent OS

Registro de todo lo que se hace en el proyecto (comandos, preguntas, decisiones y archivos). Al principio estaba en `.gitignore`; desde la etapa 11 (27/10/2026) se versiona en el repositorio.

**Proyecto:** `C:\Users\roberto.sepulveda\Desktop\AgentOs\AgentOS_Cartelera_Cine`

---

## Contexto inicial (26/10/2026)

Ni `/plan-product` ni `/discover-standards` estaban instalados como comandos en la sesión de Claude Code. Los dos existen como archivos del proyecto en `.claude/commands/agent-os/`, así que en ambos casos se leyó la definición y se siguieron sus pasos a mano.

**Estado inicial del repositorio** (git, ramas `main` y `setup`):
```
.claude/commands/agent-os/
  discover-standards.md
  index-standards.md
  inject-standards.md
  plan-product.md
  shape-spec.md
agent-os/standards/index.yml   (solo con el encabezado "# Agent OS Standards Index")
README.md                      ("Desarrollar una Cartelera de Cine usando las metodología Agent OS")
```

---

## Etapa 1: `/plan-product` (26/10/2026)

### Comandos de exploración
| # | Comando | Para qué |
|---|---|---|
| 1 | `ls -la` y `find . -maxdepth 4 -iname "*plan-product*"` en `AgentOs/` | Buscar la definición del comando |
| 2 | `find . -maxdepth 4` en `AgentOS_Cartelera_Cine/` | Listar la estructura del proyecto |
| 3 | `cat .claude/commands/agent-os/plan-product.md`, `README.md`, `agent-os/standards/index.yml` | Leer el comando y el contexto |

**Paso 1 del comando:** se comprobó si había documentación previa en `agent-os/product/`. No había nada, así que se pasó directamente a las preguntas.

### Preguntas y respuestas

**Misión (mission.md)**

| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué problema resuelve la Cartelera de Cine? | Ver horarios fácil · Info dispersa · Gestión del cine | **Info dispersa** |
| ¿Para quién es este producto? | Público general · Cine y público · Proyecto académico | **Público general** |
| ¿Qué hace única a tu solución? | Todo en un lugar · Rápida y simple · Filtros inteligentes | **Todo en un lugar** |

**Roadmap (roadmap.md)**

| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué funcionalidades son imprescindibles para el MVP? (varias opciones) | Listado de películas · Ficha de película · Horarios por día · Búsqueda y filtros | **Listado de películas, Ficha de película** |
| ¿Qué funcionalidades vienen después del lanzamiento? (varias opciones) | Horarios por día · Búsqueda y filtros · Próximos estrenos · Panel de administración | **Búsqueda y filtros, Próximos estrenos** |

**Tech stack (tech-stack.md)**

No existía `agent-os/standards/global/tech-stack.md`, así que la pregunta se hizo directamente.

| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué tecnologías usará el proyecto? | React + Vite + API · HTML/CSS/JS vanilla · Next.js + Supabase · React + Node + DB | **React + Vite + API** (TMDB, sin backend propio) |

### Archivos creados
Comando: `mkdir -p agent-os/product`, y luego cada archivo escrito con `cat > ... <<'EOF'`.

| Archivo | Contenido |
|---|---|
| `agent-os/product/mission.md` | Problema: la información de las películas está dispersa. Usuarios: público general. Solución: una ficha única por película con sinopsis, tráiler, clasificación, duración y reparto. |
| `agent-os/product/roadmap.md` | Fase 1 (MVP): listado y ficha de película. Fase 2: búsqueda y filtros, próximos estrenos. |
| `agent-os/product/tech-stack.md` | Frontend: React + Vite. Backend: N/A. Base de datos: N/A. Otros: API de TMDB. |

**Advertencia:** sin backend propio, la API key de TMDB queda visible en el código que llega al navegador.

---

## Etapa 2: `.env` y `.gitignore` (26/10/2026)

**Petición:** "créame el .env y .gitignore para añadir mi api key de la cartelera"

### Comandos
| # | Comando | Para qué |
|---|---|---|
| 1 | `ls -a`, `git status --short`, `git ls-files` | Revisar qué existía y qué estaba versionado |
| 2 | `cat > .env`, `cat > .env.example`, `cat > .gitignore` | Crear los archivos |
| 3 | `git check-ignore -v .env` | Comprobar que git ignora `.env` (resultado: `.gitignore:2:.env`) |

### Archivos creados
| Archivo | Contenido |
|---|---|
| `.env` | `VITE_TMDB_API_KEY=tu_api_key_aqui` (con comentarios). **No se sube a git.** |
| `.env.example` | `VITE_TMDB_API_KEY=` vacío. Es la plantilla que sí se sube al repositorio. |
| `.gitignore` | `.env`, `.env.local`, `.env.*.local`, `node_modules/`, `dist/`, `dist-ssr/`, logs, `.vscode/*` (excepto `extensions.json`), `.idea/`, `.DS_Store`, `Thumbs.db` |

**Notas:**
- Vite solo pasa al navegador las variables que empiezan por `VITE_`.
- En el código, la clave se lee con `import.meta.env.VITE_TMDB_API_KEY`.
- Si cambias el `.env`, hay que reiniciar el servidor de desarrollo.

---

## Etapa 3: `/discover-standards` (26/10/2026)

### Comando de exploración
`cat .claude/commands/agent-os/discover-standards.md`

**Cambio respecto al comando original:** está pensado para sacar estándares de código existente, y el proyecto aún no tiene código. Por eso se definieron los estándares de antemano a partir del stack planificado.

### Paso 1: elegir el área
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué área quieres definir primero? | Consumo de API TMDB · Componentes React · Estructura y nombres · Esperar al código | **Consumo de API TMDB** |

### Paso 2: elegir los estándares
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Cuáles quieres documentar? (varias opciones) | Cliente API centralizado · API key por env · Estados carga/error · Idioma e imágenes | **Cliente API centralizado, Estados carga/error, Idioma e imágenes** (descartado: API key por env) |

### Pasos 3 y 4: un ciclo de preguntas, borrador, confirmación y archivo por estándar

**Estándar 1: Cliente TMDB**
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué debe devolver cada función del servicio? | Datos o lanza error · `{ data, error }` · Datos ya mapeados | **Datos o lanza error** |
| ¿Creo `api/tmdb-client.md`? | Sí, crearlo · Omitir | **Sí** |

**Estándar 2: Estados de carga y error**
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Cómo se gestionan los estados en los componentes? | Hook useFetch propio · useState + useEffect · TanStack Query | **Hook useFetch propio** |
| ¿Qué ve el usuario cuando falla una petición? | Mensaje + reintentar · Solo mensaje | **Mensaje + reintentar** |
| ¿Creo `api/loading-error-states.md`? | Sí, crearlo · Omitir | **Sí** |

**Estándar 3: Idioma e imágenes**
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué idioma y región pedir a TMDB? | es-ES · es-MX · es-CL | **es-ES** (región ES) |
| ¿Qué hacer si una película no tiene póster? | Imagen placeholder · Ocultar película | **Imagen placeholder** |
| ¿Creo `api/tmdb-language-images.md` y actualizo el ejemplo de `tmdb-client.md`? | Sí, crearlo · Omitir | **Sí** |

### Paso 5: índice
| Pregunta | Respuesta |
|---|---|
| ¿Acepto las descripciones propuestas para `index.yml`? | **Sí, aceptar** |

### Paso 6: continuar
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Otra área o terminamos? | Terminar · Componentes React · Estructura y nombres | **Terminar** |

### Archivos creados o modificados
Comandos: `mkdir -p agent-os/standards/api`, `cat > ...` por archivo, un script de Python para actualizar `tmdb-client.md` y `cat >> index.yml`.

| Archivo | Contenido |
|---|---|
| `agent-os/standards/api/tmdb-client.md` | Todas las llamadas pasan por `src/services/tmdb.js` con una función `request()`. Una función `getX` por endpoint. Devuelve el JSON o lanza un `Error`. Los componentes nunca usan `fetch` directamente. |
| `agent-os/standards/api/loading-error-states.md` | Hook `useFetch(fn, deps)` en `src/hooks/useFetch.js` que devuelve `{ data, loading, error, retry }`. Siempre se pintan los tres estados. `ErrorMessage` muestra un texto en español y un botón "Reintentar". Nunca se enseña `error.message` al usuario. |
| `agent-os/standards/api/tmdb-language-images.md` | `language=es-ES` y `region=ES` por defecto en todas las peticiones. Las URLs de imagen se construyen solo con `getImageUrl(path, size)`: `w342` en la cartelera, `w500` en la ficha y nunca `original`. Sin póster se usa `/poster-placeholder.svg`. Los tráilers usan `include_video_language=es,en` cuando no hay versión en español. |
| `agent-os/standards/api/tmdb-client.md` *(modificado)* | El ejemplo de `request()` ahora incluye `language` y `region`. |
| `agent-os/standards/index.yml` *(modificado)* | Se añadió la sección `api:` con `loading-error-states`, `tmdb-client` y `tmdb-language-images`. |

**Pendiente:** en `loading-error-states.md`, el ejemplo del hook no llama a `console.error`, aunque la regla lo pide. Hay que añadirlo en el `.catch` al escribir el hook de verdad.

---

## Etapa 4: creación de esta bitácora (26/10/2026)

**Petición:** crear la bitácora, actualizarla cada vez que se haga algo y dejarla fuera de git porque es de uso interno.

| Acción | Detalle |
|---|---|
| Archivo creado | `docs/bitacora.md` (este archivo) |
| `.gitignore` modificado | Se añadió `docs/bitacora.md` en una sección "Documentación interna" |
| Verificación | `git check-ignore -v docs/bitacora.md` |

**Regla a partir de ahora:** cada tarea nueva añade una etapa al final con la petición, los comandos, las preguntas y respuestas, y los archivos tocados. También se actualizan "Estado actual" y "Siguientes pasos".

---

## Etapa 5: subir el trabajo al repositorio (26/10/2026)

**Petición:** "sube al repo todo lo que tenemos hasta ahora"

### Comandos
| # | Comando | Para qué |
|---|---|---|
| 1 | `git branch -a`, `git remote -v`, `git log --oneline -5`, `git status --short` | Revisar la rama, el remoto y los cambios pendientes |
| 2 | `ls -a`, `git check-ignore -v .env.example` | Ver por qué `.env.example` no aparecía: el archivo ya no existía (borrado fuera de la sesión), así que no se volvió a crear |
| 3 | `git add .gitignore agent-os/` | Preparar los archivos del commit |
| 4 | `git commit` | Commit `f531d1d`: "Definir producto y estándares de API con Agent OS" |
| 5 | `git push origin setup/agent-os` | Subida a GitHub (`e5004d6..f531d1d`) |

**Repositorio:** https://github.com/Reysanx/AgentOS_Cartelera_Cine (rama `setup/agent-os`)

### Archivos incluidos en el commit
- `.gitignore`
- `agent-os/product/mission.md`, `roadmap.md`, `tech-stack.md`
- `agent-os/standards/api/loading-error-states.md`, `tmdb-client.md`, `tmdb-language-images.md`
- `agent-os/standards/index.yml` (modificado)

### No subidos (ignorados por git)
- `.env` (API key)
- `docs/bitacora.md` (este archivo)

---

## Etapa 6: `/shape-spec` (26/10/2026)

`/shape-spec` no estaba instalado como comando en la sesión, así que se leyó `.claude/commands/agent-os/shape-spec.md` (`cat`) y se siguieron sus pasos a mano. El comando exige el modo plan de Claude Code, y estaba activo.

### Paso 1: qué vamos a construir
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué vamos a construir? | Todo el MVP · Listado de películas · Ficha de película | **Todo el MVP** |
| ¿Cómo se abre la ficha? | Ruta propia · Modal | **Ruta propia** (`/pelicula/:id`) |
| ¿Qué películas muestra la cartelera? | En cines (now_playing) · Populares | **En cines (now_playing)** |
| ¿Cómo quieres el estilo visual? | CSS Modules · Tailwind CSS · CSS global simple | **Tailwind CSS** |
| ¿JavaScript o TypeScript? | JavaScript · TypeScript | **JavaScript** |

### Pasos 2 y 3: visuales y referencias
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Tienes material visual de referencia? | Ninguno · Sí, te paso rutas | **"Estilo Netflix pero con un rojo más oscuro"** (respuesta libre) |
| ¿Hay código de referencia? | Sin referencias · Sí, te indico | **Sin referencias** |

### Pasos 4 y 5: producto y estándares
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Alineo la spec con `agent-os/product/`? | Sí, alinear · Ajustar | **Sí, alinear** |
| ¿Incluyo los estándares api/tmdb-client, api/loading-error-states y api/tmdb-language-images? | Sí, los tres · Ajustar | **Sí, los tres** |

### Comandos de entorno
| Comando | Resultado |
|---|---|
| `date +%Y-%m-%d-%H%M` | `2026-10-26-1041` (para el nombre de la carpeta de la spec) |
| `node -v` / `npm -v` (Bash) | No encontrados en el PATH |
| `Test-Path "C:\Program Files\nodejs\node.exe"` y las versiones | Node v24.22.1 y npm 11.19.1 instalados, pero fuera del PATH |

### Pasos 7 a 9: estructura y aprobación del plan
| Pregunta | Respuesta |
|---|---|
| ¿Te parece bien la estructura de 8 tareas? | **Sí, completar** |
| Plan final (ExitPlanMode) | **Aprobado** |

**Plan:** `agent-os/specs/2026-10-26-1041-mvp-cartelera/plan.md`

---

## Etapa 7: implementación del MVP (26/10/2026)

### Tarea 1: documentación de la spec
Se creó `agent-os/specs/2026-10-26-1041-mvp-cartelera/` con `plan.md`, `shape.md`, `standards.md` (los 3 estándares completos), `references.md` (sin referencias) y `visuals/notas.md` (nota de estilo).

### Tarea 2: proyecto base
| Comando | Para qué |
|---|---|
| Archivos escritos a mano: `package.json`, `vite.config.js`, `index.html`, `public/poster-placeholder.svg` | No se usó `npm create vite` porque la carpeta no estaba vacía |
| `npm install react react-dom react-router` | React 19.3.1 y React Router 8.5.0 |
| `npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite` | Vite 8.3.5 y Tailwind 4.3.3 |
| `node -e "import('react-router')..."` | Comprobar que v8 mantiene `BrowserRouter`, `Routes`, `Route`, `Link` y `useParams` (sí) |

Todos los comandos de npm se ejecutaron en PowerShell, con `$env:Path = "C:\Program Files\nodejs;" + $env:Path`.

### Tareas 3 a 7: código
| Archivo | Contenido |
|---|---|
| `src/index.css` | Tailwind con el tema `cine-red` `#8b0a1a`, `cine-bg` `#0b0b0b`, `cine-surface` y `cine-muted` |
| `src/main.jsx`, `src/App.jsx` | `BrowserRouter`; rutas `/`, `/pelicula/:id` y la 404 |
| `src/services/tmdb.js` | `request()`, `getNowPlaying()`, `getMovie(id)` (videos, credits, release_dates) y `getImageUrl()` |
| `src/hooks/useFetch.js` | El hook del estándar, con el `console.error` que estaba pendiente |
| `src/components/` | `Header`, `Loader`, `ErrorMessage` (con "Reintentar") y `MovieCard` |
| `src/pages/Cartelera.jsx` | "En cines ahora", cuadrícula de 2 a 6 columnas |
| `src/pages/Ficha.jsx` | Póster, título y año, clasificación ES, duración, géneros, sinopsis, reparto (10) y tráiler de YouTube (nocookie) |

**Incidencia:** el primer intento de escribir el código con un heredoc de Bash falló por un error de sintaxis del shell y no llegó a crear nada. Se rehízo archivo por archivo con la herramienta Write.

### Verificación
| Comando | Resultado |
|---|---|
| `npm run build` | OK: 100 módulos; JS de 262 kB (83 kB gzip) y CSS de 15,6 kB |
| Script de Node contra TMDB con la clave de `.env` | now_playing 200, 20 películas; ficha con duración de 98 min, clasificación ES "12", tráiler (en) y reparto |
| `npm run dev -- --port 5173 --strictPort` (en segundo plano) | Servidor en http://localhost:5173 |
| `curl` a `/` y `/pelicula/123` | 200 en las dos (funciona la recarga directa de una ficha) |

**Hallazgo de seguridad:** `.env` tiene también `VITE_TMDB_READ_TOKEN`. Por llevar el prefijo `VITE_`, Vite lo envía al navegador en modo desarrollo aunque la app no lo use. Se recomienda quitarle el prefijo o eliminarlo. No se ha tocado `.env`.

### Tarea 8: cierre
| Pregunta | Respuesta |
|---|---|
| ¿Vuelvo a crear `.env.example`? | **Sí, crearlo** |

- `.env.example` creado con `VITE_TMDB_API_KEY=` vacío.
- `agent-os/product/tech-stack.md`: se añadieron Tailwind CSS v4, React Router y JavaScript.
- No se ha hecho commit.

---

## Etapa 8: cambiar a `main` y hacer los commits (26/10/2026)

**Petición:** "cambia a main y haz los commit"

### Comandos
| # | Comando | Para qué / resultado |
|---|---|---|
| 1 | `git fetch origin` y `git log --graph --all` | Se vio que `origin/main` ya tenía fusionados los PR #1 y #2 (merge `9fc4fda`) |
| 2 | `git checkout main` | **Falló:** la rama `main` local estaba desactualizada y no tenía `tech-stack.md`, que estaba modificado |
| 3 | `git stash push agent-os/product/tech-stack.md` | Guardar ese cambio temporalmente |
| 4 | `git checkout main` y `git pull --ff-only origin main` | `main` local actualizada a `9fc4fda` |
| 5 | `git stash pop` | Recuperar el cambio de `tech-stack.md` |
| 6 | `git add agent-os/specs/ agent-os/product/tech-stack.md` y `git commit` | Commit `06f32e5`: "Añadir spec del MVP de la cartelera" |
| 7 | `git add .env.example index.html package*.json public/ src/ vite.config.js` y `git commit` | Commit `a492bb4`: "Implementar MVP: cartelera y ficha de película" |
| 8 | `git show --stat HEAD` | Comprobar que `.env` no está en el commit |

**Push:** en ese momento no se hizo; los dos commits quedaron solo en `main` local.

---

## Etapa 9: push de `main` (26/10/2026)

**Petición:** "haz push"

| Comando | Resultado |
|---|---|
| `git push origin main` | `9fc4fda..a492bb4  main -> main` |
| `git status -sb` | `main...origin/main`, sincronizada |

---

## Etapa 10: búsqueda y filtros (PR #3, #4 y #5, 26-27/10/2026)

Trabajo hecho fuera de esta sesión por Alex en la rama `spec_Busqueda-Filtrado`. Se registra a partir del historial de git tras el `git pull` de la etapa 11.

| Commit | Autor y fecha | Contenido |
|---|---|---|
| `da149d6` | Alex, 26/10/2026 12:01 | "Añade búsqueda y filtros a la cartelera" (co-autor: Copilot) |
| `e89a1bb` | 26/10/2026 13:52 | Merge del PR #3 (`spec_Busqueda-Filtrado` → `main`) |
| `486e486` | 27/10/2026 18:09 | Merge del PR #4 (`main` → `spec_Busqueda-Filtrado`) |
| `339e5c2` | 27/10/2026 18:10 | Merge del PR #5 (`spec_Busqueda-Filtrado` → `main`) |

### Spec `agent-os/specs/2026-10-26-1105-busqueda-filtros/`
`plan.md`, `shape.md`, `standards.md`, `references.md`, `batch-report.yaml` y `checkpoints/tasks-to-impl.yaml`.

**Decisiones (de `shape.md`):**
- Búsqueda por título sin distinguir mayúsculas y minúsculas, con los espacios exteriores recortados.
- Filtros por género (nombres sacados del endpoint de géneros de TMDB) y por idioma original (`original_language`). Se pueden combinar y hay una acción para limpiarlos.
- Se filtra en local sobre los resultados ya cargados de `/movie/now_playing`.
- El filtro por formato (2D/3D/IMAX) queda aplazado porque TMDB no da ese dato.
- Estándares aplicados: `api/tmdb-client`, `api/tmdb-language-images` y `api/loading-error-states`.

### Código
| Archivo | Cambio |
|---|---|
| `src/services/tmdb.js` | Nueva función `getMovieGenres()` → `/genre/movie/list` |
| `src/pages/Cartelera.jsx` | Buscador y filtros de género e idioma (+106 líneas) |
| `src/components/ErrorMessage.jsx` | Nueva prop `compact` para mostrar el error en un bloque más pequeño |
| `agent-os/product/roadmap.md` | La entrada de "Búsqueda y filtros" detalla el alcance y deja el formato pendiente |

---

## Etapa 11: README, pull y bitácora en el repositorio (27/10/2026)

**Petición:** "haz pull, actualiza la bitacora con los cambios nuevos y luego push añadiendo la bitacora y quitandola del gitignore"

### Cambios recibidos
| Commit | Autor | Contenido |
|---|---|---|
| `7da4710` | Alex, 27/10/2026 18:33 | "Readme actualizado": `README.md` pasa de 2 a 178 líneas. Explica la metodología Agent OS (`product/`, `standards/`, `specs/`), el ciclo de cada vuelta con un diagrama Mermaid, los pasos 0 a 5 con sus comandos, una tabla resumen de comandos y la instalación (`npm install`, `.env`, `npm run dev`, `npm run build`). |

### Comandos
| # | Comando | Resultado |
|---|---|---|
| 1 | `git pull` | Fast-forward `e89a1bb..7da4710`; también apareció la rama remota `origin/spec_Busqueda-Filtrado` |
| 2 | `git log`, `git show --stat` | Revisar los commits nuevos para las etapas 10 y 11 |
| 3 | Edición de `docs/bitacora.md` | Etapas 10 y 11, estado actual y siguientes pasos |
| 4 | Edición de `.gitignore` | Se quitó la sección "Documentación interna" con `docs/bitacora.md` |
| 5 | `git add .gitignore docs/bitacora.md`, `git commit` y `git push origin main` | Bitácora subida al repositorio |

**Aviso:** al estar versionada, la bitácora ya es pública en GitHub. No contiene claves, solo los nombres de las variables de `.env`.

---

## Etapa 12: próximos estrenos (PR #6, 27/10/2026)

Trabajo hecho fuera de esta sesión por González Rosas (fork `lgonros0510`). Se registra a partir del historial de git.

| Commit | Autor y fecha | Contenido |
|---|---|---|
| `ae57e51` | González Rosas, 27/10/2026 20:21 | "Añade sección de próximos estrenos" (co-autor: Copilot) |
| `d6813e2` | González Rosas, 27/10/2026 20:22 | Merge de `main` en su rama |
| `1d42e80` | Samuel Fernández, 27/10/2026 22:40 | Merge del PR #6 (`lgonros0510/main` → `main`) |

### Spec `agent-os/specs/2026-10-27-1851-proximos-estrenos/`
`plan.md`, `shape.md`, `standards.md` y `references.md`.

**Decisiones (de `plan.md` y `shape.md`):**
- Página independiente en la ruta `/proximos-estrenos`, enlazada desde la cabecera; el logo sigue llevando a `/`.
- Datos de `/movie/upcoming` de TMDB con `language=es-ES` y `region=ES`, solo la primera página de resultados.
- Se reutiliza `MovieCard`, con la fecha de estreno en español. Si no hay fecha, se muestra "Fecha por confirmar".
- Estados de carga, error con reintento y lista vacía, según los estándares existentes.
- Sin paginación, filtros ni fuentes nuevas; la cartelera y sus filtros no cambian.

### Código
| Archivo | Cambio |
|---|---|
| `src/services/tmdb.js` | Nueva función `getUpcoming()` → `/movie/upcoming` |
| `src/pages/ProximosEstrenos.jsx` | Página nueva: cuadrícula de tarjetas con fecha formateada (`Intl.DateTimeFormat` `es-ES`, `dateStyle: 'long'`, zona UTC) |
| `src/App.jsx` | Ruta `/proximos-estrenos` |
| `src/components/Header.jsx` | Navegación con el enlace "Próximos estrenos" (`aria-label="Navegación principal"`) |
| `src/components/MovieCard.jsx` | Nueva prop opcional `releaseDate` que pinta la fecha bajo el título |
| `agent-os/product/roadmap.md` | "Próximos estrenos" pasa a describir la página implementada |

---

## Etapa 13: poner en marcha la app en local (27/10/2026)

**Petición:** leer el proyecto, instalar lo necesario y levantar el servidor; después reiniciarlo, cerrarlo y diagnosticar que la cartelera no se veía.

### Comandos
| # | Comando | Resultado |
|---|---|---|
| 1 | `npm install` | 39 paquetes, 0 vulnerabilidades |
| 2 | `npm run dev` (segundo plano) | Vite 8.3.5 en http://localhost:5173/. Aviso: Node 20.13.1, Vite pide 20.19+ o 22.12+; arrancó igualmente |
| 3 | Reinicio del servidor | El 5173 seguía ocupado por un proceso anterior y el nuevo subió en el **5174** |
| 4 | `Get-NetTCPConnection` y `Get-CimInstance Win32_Process` | Los dos puertos estaban ocupados por `node.exe` con `vite.js` de este proyecto |
| 5 | `Stop-Process` sobre esos dos procesos | Puertos 5173 y 5174 libres; el usuario arranca después con `npm run dev` |

### Incidencia: la cartelera no se veía
- La consola del navegador mostraba **HTTP 401** de TMDB en `/movie/now_playing` y `/genre/movie/list`.
- Causa: la `VITE_TMDB_API_KEY` del `.env` tenía **31 caracteres**; las claves v3 de TMDB tienen 32 (se perdió un carácter al copiarla). El código y el servidor funcionan bien.
- Solución indicada: copiar de nuevo la "Clave de API" (no el token de lectura) de https://www.themoviedb.org/settings/api, pegarla en `.env` sin espacios ni comillas y reiniciar `npm run dev`, porque Vite solo lee `.env` al arrancar.
- Aviso: la clave se pegó completa en un mensaje de la conversación, así que conviene regenerarla en TMDB cuando acabe el trabajo.
- No se modificó ningún archivo del repositorio en esta etapa.

---

## Etapa 14: `/shape-spec` e implementación del Catálogo (28/10/2026)

`/shape-spec` en modo plan. Spec: `agent-os/specs/2026-10-28-1959-catalogo/` (`plan.md`, `shape.md`, `standards.md`, `references.md`).

### Preguntas y respuestas
| Pregunta | Opciones ofrecidas | Respuesta |
|---|---|---|
| ¿Qué vamos a construir? | Filtro por formato · Horarios por día · Mejora de la ficha · Paginación | **Respuesta libre:** un apartado con películas antiguas, cargando por ejemplo el último año o los dos últimos, con scroll infinito, orden de más reciente a más antigua y filtro por año |
| ¿Nombre y ruta? | Biblioteca · Catálogo · Estrenos anteriores | **Catálogo** (`/catalogo`) |
| ¿Filtros? | Año · Género · Idioma · Búsqueda por título | **Año y búsqueda por título** |
| ¿Carga por defecto? | Scroll infinito 2 años · 1 año · Botón "Cargar más" | **Scroll infinito, 2 años** |
| ¿Filtrar películas poco conocidas? | Solo con popularidad · Todas | **Solo con popularidad** (`vote_count.gte=50`) |
| Visuales / referencias / roadmap / estándares | — | **Ninguno / Cartelera + Próximos estrenos / añadir al roadmap / los tres estándares de API** |

### Código
| Archivo | Cambio |
|---|---|
| `src/services/tmdb.js` | Nuevas `getCatalogPage({ page, year })` (`/discover/movie`) y `searchMoviesPage({ query, page, year })` (`/search/movie`). `request()` descarta los parámetros `null`/`undefined` |
| `src/hooks/useInfiniteMovies.js` | Hook de paginación: reinicia al cambiar filtros, descarta respuestas obsoletas, evita duplicados, tope de 500 páginas, error de páginas posteriores sin perder lo cargado |
| `src/pages/Catalogo.jsx` | Buscador con debounce de 400 ms, selector de año (1900 al actual), "Limpiar filtros" y centinela con `IntersectionObserver` |
| `src/utils/formatReleaseDate.js` | Extraída de `ProximosEstrenos.jsx`, que ahora la importa |
| `src/App.jsx`, `src/components/Header.jsx` | Ruta `/catalogo` y enlace "Catálogo" en la cabecera |
| `agent-os/product/roadmap.md` | Entrada "Catálogo" en la fase 2 |

### Hallazgo
Con `region=ES`, `/discover/movie` aplica los filtros de fecha a la fecha de estreno regional pero devuelve la fecha global: aparecían películas de diciembre con tope en octubre y el orden se rompía. El Catálogo envía `region: null` (sin región) tanto en discover como en search.

### Verificación
| Comando | Resultado |
|---|---|
| `npm run build` | OK, 104 módulos |
| Script de Node contra TMDB con las funciones reales | Por defecto: 68 páginas, fechas descendentes y sin futuras; año 2010 y "matrix" (con y sin 1999) devuelven lo esperado. La clave del `.env` ya tiene 32 caracteres y responde 200 |

Pendiente: probar el scroll infinito y los estados de error en el navegador (`npm run dev`). No se ha hecho commit.

---

## Estado actual del proyecto

```
AgentOS_Cartelera_Cine/
├── .claude/commands/agent-os/   (sin cambios)
├── agent-os/
│   ├── product/
│   │   ├── mission.md
│   │   ├── roadmap.md
│   │   └── tech-stack.md
│   ├── specs/
│   │   ├── 2026-10-26-1041-mvp-cartelera/
│   │   │   ├── plan.md, shape.md, standards.md, references.md
│   │   │   └── visuals/notas.md
│   │   ├── 2026-10-26-1105-busqueda-filtros/
│   │   │   ├── plan.md, shape.md, standards.md, references.md
│   │   │   └── batch-report.yaml, checkpoints/tasks-to-impl.yaml
│   │   ├── 2026-10-27-1851-proximos-estrenos/
│   │   │   └── plan.md, shape.md, standards.md, references.md
│   │   └── 2026-10-28-1959-catalogo/
│   │       └── plan.md, shape.md, standards.md, references.md
│   └── standards/
│       ├── index.yml
│       └── api/
│           ├── loading-error-states.md
│           ├── tmdb-client.md
│           └── tmdb-language-images.md
├── docs/
│   └── bitacora.md
├── public/
│   └── poster-placeholder.svg
├── src/
│   ├── components/  (Header, Loader, ErrorMessage, MovieCard)
│   ├── hooks/       (useFetch, useInfiniteMovies)
│   ├── pages/       (Cartelera, Ficha, ProximosEstrenos, Catalogo)
│   ├── utils/formatReleaseDate.js
│   ├── services/tmdb.js
│   ├── App.jsx, main.jsx, index.css
├── .env                         (ignorado por git)
├── .env.example
├── .gitignore
├── index.html
├── package.json, package-lock.json
├── vite.config.js
└── README.md
```

Rama actual: `main`, sincronizada con GitHub (último commit `1d42e80`). Incluye los PR #1 a #6: producto y estándares, spec y MVP de la cartelera, búsqueda y filtros, el README nuevo (`7da4710`), esta bitácora y próximos estrenos. La fase 2 del roadmap está completa salvo el filtro por formato.

## Siguientes pasos
1. Corregir la `VITE_TMDB_API_KEY` del `.env` (31 caracteres en lugar de 32, da 401) y arrancar con `npm run dev` en http://localhost:5173.
2. Regenerar la clave de TMDB, porque se pegó completa en una conversación.
3. Quitar el prefijo `VITE_` a `VITE_TMDB_READ_TOKEN` en `.env`, o eliminarlo.
4. Filtro por formato de exhibición, cuando haya una fuente de datos que lo dé.
5. Actualizar Node a 20.19+ o 22.12+ (requisito de Vite 8).
6. Opcional: ejecutar `discover-standards` sobre el código real (componentes React, estructura y nombres).
