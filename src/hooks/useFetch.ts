import { AxiosPromise } from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(promise: () => AxiosPromise<T>) {
  const [state, setState] = useState<{
    loading: boolean;
    error: any;
    data: T | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    setState({ loading: true, error: null, data: null });
    promise().then(
      (response) =>
        setState({ loading: false, error: null, data: response.data }),
      (error) => setState({ loading: false, error, data: null })
    );
  }, []);

  return state;
}
