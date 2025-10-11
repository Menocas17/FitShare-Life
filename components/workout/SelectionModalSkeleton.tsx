import { Skeleton } from '@/components/ui/skeleton';

export default function WorkoutGridSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className='bg-card border border-border rounded-lg overflow-hidden animate-pulse'
        >
          {/* Image placeholder */}
          <div className='relative h-48'>
            <Skeleton className='absolute inset-0 h-full w-full object-cover' />
          </div>

          {/* Text content */}
          <div className='p-4 space-y-2'>
            <Skeleton className='h-6 w-2/3' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>

          {/* Button placeholder */}
          <div className='px-4 pb-4'>
            <Skeleton className='h-10 w-full rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}
