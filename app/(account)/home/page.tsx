import { getDashboardData } from '@/lib/dashboard';
import { getUserAndProfileIds } from '@/lib/auth';
import { parseBodyMeasurements } from '@/lib/utils';
import { getUserProfile } from '@/lib/profileInfo';
import HomeDashboard from '@/components/home/Dasboard';
import StatsOverview from '@/components/home/StatsOverview';
import RecentWorkoutCard from '@/components/home/RecentWorkout';
import BodyMeasurements from '@/components/home/BodyMeasurements';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const user = await getUserAndProfileIds();
  if (!user) return redirect('/login');
  const [profile, data] = await Promise.all([
    getUserProfile(user.userId),
    getDashboardData(user.profileId),
  ]);

  if (!data || !profile) {
    return <div>Error in loading the data or user not found</div>;
  }
  const { recentWorkout, dashboardStats, postsCount } = data;

  const bodyMeasurements = parseBodyMeasurements(
    profile?.body_measurements || null,
  );

  return (
    <HomeDashboard
      profile={profile}
      user={user}
      dashboardStats={dashboardStats}
      stats={
        <StatsOverview
          profile={profile}
          dashboardStats={dashboardStats}
          postsCount={postsCount}
        />
      }
      postsCount={postsCount}
    >
      <RecentWorkoutCard recentWorkout={recentWorkout} />
      <BodyMeasurements bodyMeasurements={bodyMeasurements} />
    </HomeDashboard>
  );
}
