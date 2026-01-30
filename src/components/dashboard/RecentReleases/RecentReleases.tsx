"use client";

import { FC } from "react";
import { ReleaseCard } from "./ReleaseCard";
import { useReleases } from "@/hooks";
import { ReleaseGridSkeleton } from "@/components/shared/skeletons";
import { ErrorState } from "@/components/shared/ErrorState";

export const RecentReleases: FC = () => {
  const { data, isLoading, error, refetch } = useReleases();

  if (isLoading) {
    return <ReleaseGridSkeleton />;
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error?.message || "Failed to load releases"}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
};
