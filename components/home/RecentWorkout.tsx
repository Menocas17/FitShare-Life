import { Dumbbell, Award } from 'lucide-react';
import { RecentWorkout } from '@/types/types';

export default function RecentWorkoutCard({
  recentWorkout,
}: {
  recentWorkout: RecentWorkout;
}) {
  return (
    <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
      <div className='flex items-center gap-2  mb-4 sm:mb-4'>
        <Award className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
        <h3 className='text-base sm:text-lg font-semibold'>
          Most Recent Workout
        </h3>
      </div>

      {recentWorkout ? (
        <div className='space-y-3 pl-3'>
          <div className='mb-7'>
            <h4 className='font-medium text-sm sm:text-base'>
              {recentWorkout.workouts?.name || 'Unnamed Workout'}
            </h4>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              {new Date(recentWorkout.created_at).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
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
                {recentWorkout.total_weight} Kg
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
  );
}
