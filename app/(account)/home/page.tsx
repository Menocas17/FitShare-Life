import { getUserAndProfileIds } from '@/lib/auth';

import HomeDashboard from '@/components/home/Dasboard';
import StatsOverview from '@/components/home/StatsOverview';
import RecentWorkoutCard from '@/components/home/RecentWorkout';
import BodyMeasurements from '@/components/home/BodyMeasurements';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import StatsOverviewSkeleton from '@/components/home/Skeletons/StatsOverviewSkeleton';
import RecentWorkoutSkeleton from '@/components/home/Skeletons/RecentWorkoutSkeleton';
import BodyMeasurementsSkeleton from '@/components/home/Skeletons/BodyMeasurementsSkeleton';

export default async function Dashboard() {
  const user = await getUserAndProfileIds();
  if (!user) return redirect('/login');

  return (
    <HomeDashboard
      user={user}
      stats={
        <Suspense fallback={<StatsOverviewSkeleton />}>
          <StatsOverview userId={user.userId} profileId={user.profileId} />
        </Suspense>
      }
    >
      <Suspense fallback={<RecentWorkoutSkeleton />}>
        <RecentWorkoutCard profileId={user.profileId} />
      </Suspense>

      <Suspense fallback={<BodyMeasurementsSkeleton />}>
        <BodyMeasurements userId={user.userId} />
      </Suspense>
    </HomeDashboard>
  );
}
