'use client';

import { motion } from 'framer-motion';
import { RecentReleases } from '@/components/dashboard/RecentReleases';
import { SalesAnalytics } from '@/components/dashboard/SalesAnalytics';
import { FanEngagement } from '@/components/dashboard/FanEngagement';

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Welcome back, Marcus
        </p>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
          Fan Engagement
        </h2>
        <FanEngagement />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
        <SalesAnalytics />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Releases</h2>
        <RecentReleases />
      </motion.section>
    </div>
  );
}
