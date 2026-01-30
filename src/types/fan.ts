export interface CountryMetric {
  country: string;
  countryCode: string;
  fans: number;
  percentage: number;
}

export interface FanMetrics {
  totalFans: number;
  newFans: number;
  engagementRate: number;
  topCountries: CountryMetric[];
}
