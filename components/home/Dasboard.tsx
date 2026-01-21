import { User, MessageSquare } from 'lucide-react';

import Link from 'next/link';

import { UserSession, userProfile, DashboardStast } from '@/types/types';

export default function HomeDashboard({
  profile,
  user,
  postsCount,
  children,
  dashboardStats,
  stats,
}: {
  profile: userProfile;
  user: UserSession;
  postsCount: number;
  children: React.ReactNode;
  dashboardStats: DashboardStast;
  stats: React.ReactNode;
}) {
  return (
    <div className='space-y-4 sm:space-y-6 px-2 sm:px-4 max-w-full overflow-hidden mb-4'>
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

        {/* The stats overview component */}
        {stats}

        {/* Recent Workout & Body Measurements */}
        <div className='grid grid-cols-1 lg1:grid-cols-2 gap-3 sm:gap-4 lg:gap-6'>
          {children}
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
              Height (cm)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
