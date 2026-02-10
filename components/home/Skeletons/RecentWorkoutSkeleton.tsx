import { Skeleton } from '@/components/ui/skeleton';

export default function RecentWorkoutSkeleton() {
  return (
    <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg h-full'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4 sm:mb-4'>
        <Skeleton className='w-5 h-5 rounded-full' />
        <Skeleton className='h-5 w-40' />
      </div>

      <div className='space-y-3 pl-3'>
        {/* Workout Name & Date */}
        <div className='mb-7'>
          <Skeleton className='h-5 w-48 mb-2' />
          <Skeleton className='h-3 w-32' />
        </div>

        {/* Stats Grid inside the card */}
        <div className='grid grid-cols-2 gap-3 sm:gap-4'>
          <div>
            <Skeleton className='h-3 w-16 mb-2' />
            <Skeleton className='h-7 w-12' />
          </div>
          <div>
            <Skeleton className='h-3 w-20 mb-2' />
            <Skeleton className='h-7 w-20' />
          </div>
        </div>
      </div>
    </div>
  );
}
