import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useReleases } from "./useReleases";

describe("useReleases", () => {
  it("should return releases data after loading", async () => {
    const { result } = renderHook(() => useReleases());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).not.toBe(null);
    expect(result.current.data!.length).toBeGreaterThan(0);
    expect(result.current.error).toBe(null);
  });

  it("should have release with required properties", async () => {
    const { result } = renderHook(() => useReleases());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const firstRelease = result.current.data![0];
    expect(firstRelease).toHaveProperty("id");
    expect(firstRelease).toHaveProperty("title");
    expect(firstRelease).toHaveProperty("artist");
    expect(firstRelease).toHaveProperty("streams");
  });
});
