import { useState, useEffect, useCallback } from "react";
import { mockFanMetrics } from "@/lib/mock-data";
import type { FanMetrics } from "@/types/fan";

interface UseFanMetricsReturn {
  data: FanMetrics | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useFanMetrics = (): UseFanMetricsReturn => {
  const [data, setData] = useState<FanMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 500);
          controller.signal.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new Error("Aborted"));
          });
        });

        if (controller.signal.aborted) return;

        setData(mockFanMetrics);
        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err : new Error("Failed to fetch fan metrics"),
        );
        setData(null);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [refetchTrigger]);

  return { data, isLoading, error, refetch };
};
