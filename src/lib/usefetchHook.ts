"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

export function useFetch(url, options = null, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // prevent infinite retries
  const hasFetchedRef = useRef(false);

  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          ...(options ?? {}),
          ...overrideOptions,
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (!immediate || !url || hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    fetchData();
  }, [fetchData, immediate, url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
