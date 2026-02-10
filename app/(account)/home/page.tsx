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
      {/* TODO Add button to go to the workouts in the recent workout section */}
      <Suspense fallback={<RecentWorkoutSkeleton />}>
        <RecentWorkoutCard profileId={user.profileId} />
      </Suspense>

      {/* TODO Add button to go to edit the body measurements in the profile settings */}
      <Suspense fallback={<BodyMeasurementsSkeleton />}>
        <BodyMeasurements userId={user.userId} />
      </Suspense>
    </HomeDashboard>
  );
}
