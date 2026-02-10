import {
  Dumbbell,
  Weight,
  NotebookTabs,
  TrendingUp,
  Activity,
  RulerDimensionLine,
} from 'lucide-react';

import {
  getUserProfile,
  getWorkoutStats,
  getWorkoutCompletedCount,
  getWorkoutSessionWeek,
} from '@/lib/dashboard';

export default async function StatsOverview({
  userId,
  profileId,
}: {
  userId: string;
  profileId: string;
}) {
  const [profile, dashboardStats, workoutsCompleted, sessionsPerWeek] =
    await Promise.all([
      getUserProfile(userId),
      getWorkoutStats(profileId),
      getWorkoutCompletedCount(profileId),
      getWorkoutSessionWeek(profileId),
    ]);

  return (
    <>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4'>
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-green-100 rounded-lg'>
              <Weight className='w-4 h-4 sm:w-5 sm:h-5 text-green-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Current Weight
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-green-600'>
            {profile?.weight_goal ? `${profile.weight_goal} Kg` : 'Not set'}
          </p>
        </div>
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-purple-100 rounded-lg'>
              <Activity className='w-4 h-4 sm:w-5 sm:h-5 text-purple-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Average intensity
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600'>
            {dashboardStats.avgIntensity}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Avg. per set</p>
        </div>
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-green-100 rounded-lg'>
              <RulerDimensionLine className='w-4 h-4 sm:w-5 sm:h-5 text-green-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Height
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-green-600'>
            {profile?.height ? `${profile.height} cm` : 'Not set'}
          </p>
        </div>

        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-primary/10 rounded-lg'>
              <TrendingUp className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Total Sets
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600'>
            {dashboardStats.totalSets}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Last 30 days</p>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6'>
        {/* Workouts Completed */}
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-primary/10 rounded-lg'>
              <Dumbbell className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Workouts Completed
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-primary'>
            {workoutsCompleted}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Total sessions</p>
        </div>

        {/* Average Hours Trained */}
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-blue-100 rounded-lg'>
              <NotebookTabs className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Workouts Completed
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600'>
            {sessionsPerWeek}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>This week</p>
        </div>

        {/* Current Weight */}
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-green-100 rounded-lg'>
              <Weight className='w-4 h-4 sm:w-5 sm:h-5 text-green-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Weight Goal
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-green-600'>
            {profile?.weight_goal ? `${profile.weight_goal} Kg` : 'Not set'}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Last updated</p>
        </div>

        {/* Total Weight Lifted */}
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-purple-100 rounded-lg'>
              <TrendingUp className='w-4 h-4 sm:w-5 sm:h-5 text-purple-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Total Weight Lifted
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600'>
            {dashboardStats.totalWeight} Kg
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Last 30 days</p>
        </div>
      </div>
    </>
  );
}
