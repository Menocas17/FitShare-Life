import { Skeleton } from '@/components/ui/skeleton';

export default function StatsOverviewSkeleton() {
  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4'>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'
          >
            <div className='flex items-center gap-2 sm:gap-3 mb-2'>
              <Skeleton className='h-8 w-8 rounded-lg' />
              <Skeleton className='h-4 w-20' />
            </div>
            <Skeleton className='h-8 w-16 mt-2' />
            <Skeleton className='h-3 w-12 mt-1' />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6'>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'
          >
            <div className='flex items-center gap-2 sm:gap-3 mb-2'>
              <Skeleton className='h-8 w-8 rounded-lg' />
              <Skeleton className='h-4 w-32' />
            </div>
            <Skeleton className='h-8 w-24 mt-2' />
            <Skeleton className='h-3 w-20 mt-1' />
          </div>
        ))}
      </div>
    </div>
  );
}
