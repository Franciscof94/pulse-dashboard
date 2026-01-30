"use client";

import { FC } from "react";
import { Users, TrendingUp, Activity, Globe } from "lucide-react";
import { formatStreams } from "@/lib/utils";
import { useFanMetrics } from "@/hooks";
import { FanMetricsSkeleton } from "@/components/shared/skeletons";
import { ErrorState } from "@/components/shared/ErrorState";
import { MetricCard } from "./MetricCard";

export const FanEngagement: FC = () => {
  const { data, isLoading, error, refetch } = useFanMetrics();

  if (isLoading) {
    return <FanMetricsSkeleton />;
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error?.message || "Failed to load fan metrics"}
        onRetry={refetch}
      />
    );
  }

  const topCountry = data.topCountries[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      <MetricCard
        icon={<Users className="h-5 w-5" />}
        label="Total Fans"
        value={formatStreams(data.totalFans)}
        subtext="Across all platforms"
      />
      <MetricCard
        icon={<TrendingUp className="h-5 w-5" />}
        label="New Fans"
        value={`+${formatStreams(data.newFans)}`}
        subtext="This month"
      />
      <MetricCard
        icon={<Activity className="h-5 w-5" />}
        label="Engagement Rate"
        value={`${data.engagementRate}%`}
        subtext="Avg. interactions"
      />
      <MetricCard
        icon={<Globe className="h-5 w-5" />}
        label="Top Country"
        value={topCountry?.country || "N/A"}
        subtext={topCountry ? `${topCountry.percentage}% of fans` : undefined}
      />
    </div>
  );
};
