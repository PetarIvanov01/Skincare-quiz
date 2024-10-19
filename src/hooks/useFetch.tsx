import { useCallback, useEffect, useState } from "react";

type ReturnData<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  updateOpitons: (options: RequestInit) => void;
};

export default function useFetch<T>(
  initUrl: string,
  initOptions: RequestInit = {
    method: "GET",
  }
): ReturnData<T> {
  const [data, setDate] = useState<null | T>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState(initOptions);

  // Handle request canceling
  const init = useCallback(async () => {
    setLoading(true);
    try {
      const request = await fetch(initUrl, options);
      if (!request.ok) {
        throw new Error("Error occur while fetching data");
      }
      const response = await request.json();

      setDate(response);
    } catch (error: unknown) {
      const er = error as Error;
      setError(er.message);
    } finally {
      setLoading(false);
    }
  }, [initUrl, options]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    data,
    error,
    isLoading,
    updateOpitons: (options: RequestInit) => {
      setOptions(options);
    },
  };
}
