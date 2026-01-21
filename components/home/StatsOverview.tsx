import {
  Dumbbell,
  Weight,
  Clock,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import { DashboardStats, userProfile } from '@/types/types';

export default function StatsOverview({
  profile,
  dashboardStats,
  postsCount,
}: {
  profile: userProfile;
  dashboardStats: DashboardStats;
  postsCount: number;
}) {
  return (
    <>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4'>
        <div className='p-3 sm:p-4 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Dumbbell className='w-3 h-3 sm:w-4 sm:h-4 text-primary' />
            <span className='text-xs sm:text-sm font-medium'>Workouts</span>
          </div>
          <p className='text-lg sm:text-xl lg:text-2xl font-bold text-primary'>
            {dashboardStats.workoutsCompleted}
          </p>
        </div>
        <div className='p-3 sm:p-4 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Clock className='w-3 h-3 sm:w-4 sm:h-4 text-blue-600' />
            <span className='text-xs sm:text-sm font-medium'>Hours/Week</span>
          </div>
          <p className='text-lg sm:text-xl lg:text-2xl font-bold text-blue-600'>
            {dashboardStats.averageHoursTrained}
          </p>
        </div>
        <div className='p-3 sm:p-4 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Weight className='w-3 h-3 sm:w-4 sm:h-4 text-green-600' />
            <span className='text-xs sm:text-sm font-medium'>
              Current Weight
            </span>
          </div>
          <p className='text-lg sm:text-xl lg:text-2xl font-bold text-green-600'>
            {profile?.weight ? `${profile.weight} Kg` : 'Not set'}
          </p>
        </div>
        <div className='p-3 sm:p-4 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <MessageSquare className='w-3 h-3 sm:w-4 sm:h-4 text-purple-600' />
            <span className='text-xs sm:text-sm font-medium'>Posts</span>
          </div>
          <p className='text-lg sm:text-xl lg:text-2xl font-bold text-purple-600'>
            {postsCount}
          </p>
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
            {dashboardStats.workoutsCompleted}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Total sessions</p>
        </div>

        {/* Average Hours Trained */}
        <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 bg-blue-100 rounded-lg'>
              <Clock className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600' />
            </div>
            <h3 className='text-xs sm:text-sm font-medium text-muted-foreground'>
              Avg. Hours/Week
            </h3>
          </div>
          <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600'>
            {dashboardStats.averageHoursTrained}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>Last 4 weeks</p>
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
