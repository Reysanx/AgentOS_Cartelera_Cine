import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_PAGES = 500;

const initialState = {
  movies: [],
  page: 0,
  totalPages: 1,
  loading: true,
  loadingMore: false,
  error: null,
  loadMoreError: null,
};

export function useInfiniteMovies(fetchPage, deps = []) {
  const [state, setState] = useState(initialState);
  const [attempt, setAttempt] = useState(0);
  const fetchRef = useRef(fetchPage);
  const stateRef = useRef(state);
  const generation = useRef(0);
  const busy = useRef(false);

  fetchRef.current = fetchPage;
  stateRef.current = state;

  useEffect(() => {
    const gen = ++generation.current;
    busy.current = false;
    setState(initialState);
    fetchRef.current(1)
      .then((data) => {
        if (gen !== generation.current) return;
        setState({
          ...initialState,
          movies: data.results ?? [],
          page: 1,
          totalPages: Math.min(data.total_pages ?? 1, MAX_PAGES),
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        if (gen === generation.current) setState({ ...initialState, loading: false, error });
      });
    return () => { generation.current++; };
  }, [...deps, attempt]);

  const loadMore = useCallback(() => {
    const { loading, error, page, totalPages } = stateRef.current;
    if (busy.current || loading || error || page === 0 || page >= totalPages) return;

    const gen = generation.current;
    busy.current = true;
    setState((s) => ({ ...s, loadingMore: true, loadMoreError: null }));
    fetchRef.current(page + 1)
      .then((data) => {
        if (gen !== generation.current) return;
        setState((s) => {
          const known = new Set(s.movies.map((movie) => movie.id));
          const fresh = (data.results ?? []).filter((movie) => !known.has(movie.id));
          return { ...s, movies: [...s.movies, ...fresh], page: page + 1, loadingMore: false };
        });
      })
      .catch((loadMoreError) => {
        console.error(loadMoreError);
        if (gen === generation.current) setState((s) => ({ ...s, loadingMore: false, loadMoreError }));
      })
      .finally(() => {
        if (gen === generation.current) busy.current = false;
      });
  }, []);

  return {
    ...state,
    hasMore: state.page > 0 && state.page < state.totalPages,
    loadMore,
    retry: () => setAttempt((n) => n + 1),
  };
}
