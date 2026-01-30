export interface SalesBreakdown {
  date: string;
  streams: number;
  revenue: number;
  downloads: number;
}

export interface SalesData {
  daily: SalesBreakdown[];
  weekly: SalesBreakdown[];
  monthly: SalesBreakdown[];
  totalRevenue: number;
  totalStreams: number;
}
