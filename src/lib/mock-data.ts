import { FanMetrics, Release, SalesBreakdown, SalesData } from "@/types";

export const mockReleases: Release[] = [
  {
    id: "rel_001",
    title: "Sunday Morning Gospel",
    artist: "Marcus Cole",
    releaseDate: "2026-01-15",
    coverArt: "/covers/sunday-morning-gospel.jpg",
    streams: 4_823_491,
    revenue: 18_329.27,
    type: "single",
  },
  {
    id: "rel_002",
    title: "Southside Summer",
    artist: "Marcus Cole",
    releaseDate: "2025-12-01",
    coverArt: "/covers/southside-summer.jpg",
    streams: 2_156_832,
    revenue: 8_195.96,
    type: "album",
  },
  {
    id: "rel_003",
    title: "Blessings on Blessings",
    artist: "Marcus Cole",
    releaseDate: "2025-11-08",
    coverArt: "/covers/blessings-on-blessings.jpg",
    streams: 1_432_567,
    revenue: 5_443.76,
    type: "single",
  },
  {
    id: "rel_004",
    title: "Late Night Confessions (feat. Noname)",
    artist: "Marcus Cole",
    releaseDate: "2025-10-22",
    coverArt: "/covers/late-night-confessions.jpg",
    streams: 892_341,
    revenue: 3_390.9,
    type: "single",
  },
  {
    id: "rel_005",
    title: "Grateful EP",
    artist: "Marcus Cole",
    releaseDate: "2025-09-14",
    coverArt: "/covers/grateful-ep.jpg",
    streams: 567_892,
    revenue: 2_158.19,
    type: "ep",
  },
  {
    id: "rel_006",
    title: "Chicago Winters",
    artist: "Marcus Cole",
    releaseDate: "2025-08-03",
    coverArt: "/covers/chicago-winters.jpg",
    streams: 234_156,
    revenue: 889.79,
    type: "single",
  },
];

function generateDailySalesData(): SalesBreakdown[] {
  const data: SalesBreakdown[] = [];
  const baseStreams = 45000;
  const baseRevenue = 1500;
  const baseDownloads = 120;

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();

    let multiplier = 1;
    if (dayOfWeek === 5) multiplier = 1.35; // Friday
    if (dayOfWeek === 6) multiplier = 1.52; // Saturday
    if (dayOfWeek === 0) multiplier = 1.28; // Sunday

    const variance = 0.85 + Math.random() * 0.3;
    const finalMultiplier = multiplier * variance;

    data.push({
      date: date.toISOString().split("T")[0],
      streams: Math.round(baseStreams * finalMultiplier),
      revenue: Math.round(baseRevenue * finalMultiplier * 100) / 100,
      downloads: Math.round(baseDownloads * finalMultiplier),
    });
  }

  return data;
}

function generateWeeklySalesData(daily: SalesBreakdown[]): SalesBreakdown[] {
  const weeks: SalesBreakdown[] = [];

  for (let i = 0; i < 4; i++) {
    const weekData = daily.slice(i * 7, (i + 1) * 7);
    const weekStart = weekData[0]?.date || "";

    weeks.push({
      date: weekStart,
      streams: weekData.reduce((sum, d) => sum + d.streams, 0),
      revenue:
        Math.round(weekData.reduce((sum, d) => sum + d.revenue, 0) * 100) / 100,
      downloads: weekData.reduce((sum, d) => sum + d.downloads, 0),
    });
  }

  return weeks;
}

function generateMonthlySalesData(): SalesBreakdown[] {
  return [
    {
      date: "2025-08-01",
      streams: 1_123_456,
      revenue: 4_269.13,
      downloads: 2_890,
    },
    {
      date: "2025-09-01",
      streams: 1_345_892,
      revenue: 5_114.39,
      downloads: 3_456,
    },
    {
      date: "2025-10-01",
      streams: 1_567_234,
      revenue: 5_955.49,
      downloads: 4_012,
    },
    {
      date: "2025-11-01",
      streams: 1_892_567,
      revenue: 7_191.75,
      downloads: 4_867,
    },
    {
      date: "2025-12-01",
      streams: 2_234_891,
      revenue: 8_492.59,
      downloads: 5_734,
    },
    {
      date: "2026-01-01",
      streams: 2_456_123,
      revenue: 9_333.27,
      downloads: 6_298,
    },
  ];
}

const dailyData = generateDailySalesData();
const weeklyData = generateWeeklySalesData(dailyData);
const monthlyData = generateMonthlySalesData();

export const mockSalesData: SalesData = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
  totalRevenue:
    Math.round(dailyData.reduce((sum, d) => sum + d.revenue, 0) * 100) / 100,
  totalStreams: dailyData.reduce((sum, d) => sum + d.streams, 0),
};

export const mockFanMetrics: FanMetrics = {
  totalFans: 248_732,
  newFans: 12_456,
  engagementRate: 4.2,
  topCountries: [
    {
      country: "United States",
      countryCode: "US",
      fans: 156_892,
      percentage: 63.1,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      fans: 28_456,
      percentage: 11.4,
    },
    {
      country: "Canada",
      countryCode: "CA",
      fans: 19_234,
      percentage: 7.7,
    },
    {
      country: "Germany",
      countryCode: "DE",
      fans: 12_567,
      percentage: 5.1,
    },
    {
      country: "Australia",
      countryCode: "AU",
      fans: 8_923,
      percentage: 3.6,
    },
  ],
};
