# Estados de carga y error

Los componentes piden datos con `useFetch` (`src/hooks/useFetch.js`), nunca con useEffect + fetch propios.

```js
export function useFetch(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => !ignore && setState({ data, loading: false, error: null }))
      .catch((error) => !ignore && setState({ data: null, loading: false, error }));
    return () => { ignore = true; };
  }, [...deps, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
```

```jsx
const { data, loading, error, retry } = useFetch(() => getMovie(id), [id]);
if (loading) return <Loader />;
if (error) return <ErrorMessage onRetry={retry} />;
```

- Renderizar siempre los tres estados: carga, error, datos
- `ErrorMessage` muestra un texto amigable en español y un botón "Reintentar"
- Nunca mostrar `error.message` al usuario; solo `console.error`
