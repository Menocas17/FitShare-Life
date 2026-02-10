import { getUserProfile, getWorkoutStats } from '@/lib/dashboard';

export default async function AdditionalStats({
  userId,
  profileId,
}: {
  userId: string;
  profileId: string;
}) {
  const [profile, dashboardStats] = await Promise.all([
    getUserProfile(userId),
    getWorkoutStats(profileId),
  ]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
      <div className='p-3 sm:p-4 bg-card border border-border rounded-lg text-center'>
        <p className='text-lg sm:text-xl lg:text-2xl font-bold text-primary'>
          {dashboardStats.totalSets}
        </p>
        <p className='text-xs sm:text-sm text-muted-foreground'>
          Total Sets (30 days)
        </p>
      </div>

      <div className='p-3 sm:p-4 bg-card border border-border rounded-lg text-center'>
        <p className='text-lg sm:text-xl lg:text-2xl font-bold text-green-600'>
          {profile?.height || 'Not set'}
        </p>
        <p className='text-xs sm:text-sm text-muted-foreground'>Height (cm)</p>
      </div>
    </div>
  );
}
