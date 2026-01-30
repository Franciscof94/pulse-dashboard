import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
}

export const MetricCard: FC<MetricCardProps> = ({
  icon,
  label,
  value,
  subtext,
}) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-2 rounded-lg bg-brand-red/10 text-brand-red">
            {icon}
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {label}
          </span>
        </div>
        <p className="text-xl sm:text-2xl font-bold">{value}</p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </CardContent>
    </Card>
  );
};
