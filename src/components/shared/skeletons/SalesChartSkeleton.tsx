import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SalesChartSkeleton() {
  // Fixed heights to avoid hydration mismatch
  const barHeights = [48, 85, 68, 55, 72, 41, 63, 77, 52, 66, 44, 58, 81, 39, 70];
  
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex flex-col justify-end gap-2">
          <div className="flex items-end gap-1 h-full">
            {barHeights.map((height, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
