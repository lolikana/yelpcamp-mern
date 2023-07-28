/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect, useRef, useState } from 'react';

interface ISendRequest {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: BodyInit | null | undefined;
}

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async ({ url = '', method = 'GET', headers = {}, body = null }: ISendRequest) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      try {
        const res = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal
        });
        const responseData = await res.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortController
        );

        if (!res.ok) throw new Error((responseData as { message: string }).message);
        setIsLoading(false);
        return responseData;
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
