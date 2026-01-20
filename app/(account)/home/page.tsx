import {
  Dumbbell,
  TrendingUp,
  Clock,
  User,
  Weight,
  Ruler,
  MessageSquare,
} from 'lucide-react';
import { getDashboardData } from '@/lib/dashboard';
import { getUserAndProfileIds } from '@/lib/auth';
import { parseBodyMeasurements } from '@/lib/utils';

import Link from 'next/link';
import { getUserProfile } from '@/lib/profileInfo';

//TODO - todo esto deberia ser un componente a parte en si
export default async function Dashboard() {
  const user = await getUserAndProfileIds();
  const profile = await getUserProfile(user?.userId);
  const data = await getDashboardData(user?.profileId);
  if (!data) {
    return <div>Error in loading the data or user not found</div>;
  }
  const { recentWorkout, dashboardStats, postsCount } = data;
  // TODO - this helper should not be here in the page

  const bodyMeasurements = parseBodyMeasurements(
    profile?.body_measurements || null,
  );

  return (
    <div className='space-y-4 sm:space-y-6 px-2 sm:px-4 max-w-full overflow-hidden'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='min-w-0 flex-1'>
          <h1 className=' text-xs sm:text-sm lg:text-base font-semibold'>
            Welcome back, {user?.name}! Track your progress and connect with the
            community.
          </h1>
        </div>
      </div>

      <div className='space-y-4 sm:space-y-6'>
        {/* Quick Create Post Section */}
        <div className='bg-card border border-border rounded-lg p-3 sm:p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
            <div className='flex items-center gap-3 min-w-0 flex-1'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                <User className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='font-medium text-sm sm:text-base'>
                  Share Your Workout Progress
                </h3>
                <p className='text-xs sm:text-sm text-muted-foreground'>
                  Tell the community about your achievements
                </p>
              </div>
            </div>
            <div className='flex gap-2 flex-shrink-0 w-full sm:w-auto'>
              <Link href={'/myprofile#myPosts'}>
                <button className='flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm border border-border rounded-lg hover:bg-muted transition-colors whitespace-nowrap text-center'>
                  My Posts ({postsCount})
                </button>
              </Link>

              <Link href={'/home/explore'}>
                <button className='flex-1 sm:flex-none px-3 py-2 bg-primary text-primary-foreground text-xs sm:text-sm rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap'>
                  <MessageSquare className='w-4 h-4' />
                  <span className='hidden sm:inline'>Create Post</span>
                  <span className='sm:hidden'>Post</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Overview */}
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
              {profile?.weight ? `${profile.weight} lbs` : 'Not set'}
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
              {profile?.weight_goal ? `${profile.weight_goal} lbs` : 'Not set'}
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
              {dashboardStats.totalWeight} lbs
            </p>
            <p className='text-xs text-muted-foreground mt-1'>Last 30 days</p>
          </div>
        </div>

        {/* Recent Workout & Body Measurements */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6'>
          {/* Most Recent Workout */}
          <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
            <h3 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'>
              Most Recent Workout
            </h3>
            {recentWorkout ? (
              <div className='space-y-3'>
                <div>
                  <h4 className='font-medium text-sm sm:text-base'>
                    {recentWorkout.workouts?.name || 'Unnamed Workout'}
                  </h4>
                  <p className='text-xs sm:text-sm text-muted-foreground'>
                    {new Date(recentWorkout.created_at).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Total Sets
                    </p>
                    <p className='text-lg sm:text-xl lg:text-2xl font-bold'>
                      {recentWorkout.total_sets}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Total Weight
                    </p>
                    <p className='text-lg sm:text-xl lg:text-2xl font-bold'>
                      {recentWorkout.total_weight} lbs
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='text-center py-6 sm:py-8'>
                <Dumbbell className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2' />
                <p className='text-muted-foreground text-sm sm:text-base'>
                  No workouts completed yet
                </p>
                <p className='text-xs sm:text-sm text-muted-foreground'>
                  Start your first workout!
                </p>
              </div>
            )}
          </div>

          {/* Body Measurements */}
          <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
            <div className='flex items-center gap-2 mb-3 sm:mb-4'>
              <Ruler className='w-4 h-4 sm:w-5 sm:h-5' />
              <h3 className='text-base sm:text-lg font-semibold'>
                Body Measurements
              </h3>
            </div>
            {bodyMeasurements ? (
              <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                {bodyMeasurements.chest && (
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Chest
                    </p>
                    <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                      {bodyMeasurements.chest}&quot;
                    </p>
                  </div>
                )}
                {bodyMeasurements.waist && (
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Waist
                    </p>
                    <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                      {bodyMeasurements.waist}&quot;
                    </p>
                  </div>
                )}
                {bodyMeasurements.biceps && (
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Bicep
                    </p>
                    <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                      {bodyMeasurements.biceps}&quot;
                    </p>
                  </div>
                )}
                {bodyMeasurements.thigh && (
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Thigh
                    </p>
                    <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                      {bodyMeasurements.thigh}&quot;
                    </p>
                  </div>
                )}
                {bodyMeasurements.hips && (
                  <div>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Hips
                    </p>
                    <p className='text-sm sm:text-base lg:text-lg font-semibold'>
                      {bodyMeasurements.hips}&quot;
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className='text-center py-6 sm:py-8'>
                <User className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2' />
                <p className='text-muted-foreground text-sm sm:text-base'>
                  No measurements recorded
                </p>
                <p className='text-xs sm:text-sm text-muted-foreground'>
                  Add your measurements in settings
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Stats */}
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
            <p className='text-lg sm:text-xl lg:text-2xl font-bold text-blue-600'>
              {dashboardStats.averageWeight}
            </p>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Avg Weight per Session
            </p>
          </div>
          <div className='p-3 sm:p-4 bg-card border border-border rounded-lg text-center'>
            <p className='text-lg sm:text-xl lg:text-2xl font-bold text-green-600'>
              {profile?.height || 'Not set'}
            </p>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Height (inches)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
