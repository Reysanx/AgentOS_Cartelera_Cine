# Plan: Próximos estrenos

## Contexto

La aplicación muestra en `/` la cartelera actual de TMDB y permite consultar la ficha de cada película. El roadmap incluye una sección de próximos estrenos. Esta spec define una página independiente para descubrir películas que llegarán pronto a los cines, sin cambiar el comportamiento de la cartelera actual.

**Decisiones:**
- Crear la ruta `/proximos-estrenos` y enlazarla desde la cabecera común.
- Consultar el endpoint `/movie/upcoming` de TMDB mediante el cliente centralizado existente, conservando `language=es-ES` y `region=ES`.
- Mostrar las películas como tarjetas reutilizando `MovieCard`; cada tarjeta mantiene el enlace a la ficha existente.
- Mostrar la fecha de estreno proporcionada por TMDB para cada película, con formato localizado en español. Si no hay fecha, mostrar un texto explícito en lugar de omitirla.
- Mantener los estados de carga, error/reintento y lista vacía siguiendo los estándares existentes.
- No alterar los filtros de la cartelera actual, ni añadir filtros, paginación o nuevas fuentes de datos.

**Alcance:** se considera “próximo estreno” el resultado que TMDB devuelve para la región España en `/movie/upcoming`. La página presenta la primera página de resultados que devuelve la API.

## Tarea 1: Guardar la documentación de la spec (T001)

Crear este directorio con `plan.md`, `shape.md`, `standards.md` y `references.md` antes de implementar.

## Tarea 2: Implementar la página de próximos estrenos (T002)

Requisitos: REQ-001, REQ-002 y REQ-003.

- Añadir al cliente TMDB una función exportada para `/movie/upcoming`.
- Crear la página de próximos estrenos y registrarla en `/proximos-estrenos`.
- Añadir a la cabecera un enlace accesible a la nueva página sin quitar el enlace del logo a la cartelera.
- Mostrar título, póster y fecha de estreno; reutilizar `MovieCard` para conservar la navegación a la ficha.
- Usar `useFetch`, `Loader` y `ErrorMessage`, con acción de reintento y un mensaje para el estado sin resultados.
- Conservar sin cambios los filtros y la consulta de la página de cartelera.

## Tarea 3: Validar y reflejar el alcance (T003)

Depende de T002. Ejecutar el build disponible, comprobar las rutas y estados de la nueva página y actualizar el roadmap para reflejar que Próximos estrenos está implementado.

## Requirement Mapping

| Requirement | Criterio de aceptación | Tarea |
|---|---|---|
| REQ-001 | `/proximos-estrenos` muestra las películas próximas devueltas por TMDB para España, en español, con título, póster y fecha de estreno. | T002 |
| REQ-002 | La cabecera ofrece un enlace a Próximos estrenos; sus tarjetas abren la ficha de la película y el logo sigue llevando a `/`. | T002 |
| REQ-003 | La página presenta carga, error con reintento, lista vacía y datos siguiendo los estándares existentes. | T002 |
| REQ-004 | La cartelera actual y sus filtros mantienen su comportamiento. | T002, T003 |

## Verificación

- `npm run build`.
- Abrir `/proximos-estrenos` y comprobar que la lista corresponde a la región España y que los títulos y fechas están localizados.
- Comprobar que la cabecera navega entre cartelera y próximos estrenos, que las tarjetas abren la ficha existente y que recargar la nueva ruta funciona.
- Comprobar los estados de carga, error/reintento y lista vacía.
- Comprobar que la cartelera y sus filtros siguen funcionando.

No se encontró una suite de tests ni un script de contrato de API en el repositorio.
