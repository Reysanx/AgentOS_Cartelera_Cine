import { useEffect, useState } from 'react';

export function useFetch(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => !ignore && setState({ data, loading: false, error: null }))
      .catch((error) => {
        console.error(error);
        if (!ignore) setState({ data: null, loading: false, error });
      });
    return () => { ignore = true; };
  }, [...deps, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
