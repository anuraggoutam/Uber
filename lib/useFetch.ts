import { axiosAPI } from '@/lib/axiosAPI';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await axiosAPI<T>(url, config);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(config)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
