import { getUserAndProfileIds } from '@/lib/auth';

import HomeDashboard from '@/components/home/Dasboard';
import StatsOverview from '@/components/home/StatsOverview';
import RecentWorkoutCard from '@/components/home/RecentWorkout';
import BodyMeasurements from '@/components/home/BodyMeasurements';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const user = await getUserAndProfileIds();
  if (!user) return redirect('/login');

  return (
    <HomeDashboard
      user={user}
      stats={<StatsOverview userId={user.userId} profileId={user.profileId} />}
    >
      <RecentWorkoutCard profileId={user.profileId} />
      <BodyMeasurements userId={user.userId} />
    </HomeDashboard>
  );
}
