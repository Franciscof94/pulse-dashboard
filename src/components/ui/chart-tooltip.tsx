"use client";

import { formatDate, formatRevenue } from "@/lib/utils";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: Record<string, unknown>;
    color?: string;
  }>;
  labelKey?: string;
  valueFormatter?: (value: number) => string;
  labelFormatter?: (label: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  labelKey = "date",
  valueFormatter = formatRevenue,
  labelFormatter = formatDate,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  const label = data[labelKey] as string;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">
        {labelFormatter(label)}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            {entry.color && (
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
            )}
            <span className="text-sm font-semibold text-foreground">
              {valueFormatter(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
