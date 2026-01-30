import { useState, useEffect, useCallback } from "react";
import { mockSalesData } from "@/lib/mock-data";
import type { SalesData } from "@/types/sales";

interface UseSalesDataReturn {
  data: SalesData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useSalesData = (): UseSalesDataReturn => {
  const [data, setData] = useState<SalesData | null>(null);
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

        setData(mockSalesData);
        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err : new Error("Failed to fetch sales data"),
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
