# Plan: Búsqueda y filtros de cartelera

## Contexto

La cartelera actual consume la primera página de `/movie/now_playing` de TMDB y muestra sus películas. Esta spec añade búsqueda por título y filtros por género e idioma original, combinables entre sí, sin cambiar la fuente ni el alcance actual de los resultados.

TMDB no proporciona el formato de exhibición de una película (por ejemplo, 2D, 3D o IMAX). Por decisión del usuario, ese filtro queda pospuesto hasta disponer de una fuente de datos adecuada.

**Decisiones:**
- Buscar y filtrar localmente los resultados actuales de `/movie/now_playing`.
- Buscar por título, sin distinguir mayúsculas/minúsculas y eliminando espacios al principio y al final.
- Obtener los nombres de género del endpoint de lista de géneros de TMDB.
- Filtrar idioma por `original_language`, con los nombres de idioma localizados al español.
- Combinar búsqueda y filtros con lógica AND; permitir restablecerlos.
- No mostrar ni simular un filtro de formato sin datos que lo respalden.

**Principios y restricciones:** seguir los estándares existentes de TMDB y de estados de carga/error. No hay `constitution.md` ni checklist en el repositorio; aplicar `agent-os/product/` y `agent-os/standards/`.

## Tarea 1: Guardar documentación de la spec (T001)

Crear este directorio con `plan.md`, `shape.md`, `standards.md` y `references.md` antes de implementar.

## Tarea 2: Implementar búsqueda y filtros (T002)

Requisitos: REQ-001, REQ-002, REQ-003 y REQ-004.

- Añadir al cliente TMDB la consulta de géneros.
- Añadir controles accesibles de búsqueda por título, género e idioma original en `Cartelera`.
- Filtrar los resultados cargados localmente; permitir combinar criterios y limpiar la selección.
- Mantener los estados existentes de carga, error y lista vacía; distinguir una búsqueda sin coincidencias de una cartelera vacía.
- Mantener los enlaces y tarjetas de película existentes.

## Tarea 3: Validar y reflejar el alcance (T003)

Depende de T002. Ejecutar el build disponible y comprobar los cambios; actualizar el roadmap para precisar qué filtros están implementados y que el formato queda pendiente de fuente de datos.

## Requirement Mapping

| Requirement | Criterio de aceptación | Tarea |
|---|---|---|
| REQ-001 | La búsqueda reduce la cartelera por título, ignorando mayúsculas y espacios exteriores. | T002 |
| REQ-002 | El selector de género ofrece géneros de TMDB y filtra por `genre_ids`. | T002 |
| REQ-003 | El selector de idioma filtra por `original_language`. | T002 |
| REQ-004 | Los criterios son combinables, se pueden limpiar y muestran estado sin coincidencias; sin filtros se conserva la cartelera. | T002 |
| REQ-005 | No se presenta un filtro de formato sin datos fiables; su aplazamiento queda documentado. | T001, T003 |

## Verificación

- `npm run build`.
- Revisar que los géneros e idiomas se derivan de los resultados cargados, los filtros se combinan correctamente y las tarjetas mantienen su navegación.
- Revisar el estado vacío general y el estado sin coincidencias de filtros.

No se encontró script de contrato de API ni suite de tests en el repositorio.
