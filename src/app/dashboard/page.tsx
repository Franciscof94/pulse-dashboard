import { RecentReleases } from '@/components/dashboard/RecentReleases';
import { SalesAnalytics } from '@/components/dashboard/SalesAnalytics';
import { FanEngagement } from '@/components/dashboard/FanEngagement';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Marcus</p>
      </div>

      {/* Fan Metrics */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Fan Engagement</h2>
        <FanEngagement />
      </section>

      {/* Sales Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
        <SalesAnalytics />
      </section>

      {/* Recent Releases */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Releases</h2>
        <RecentReleases />
      </section>
    </div>
  );
}
