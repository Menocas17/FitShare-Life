import { Skeleton } from '@/components/ui/skeleton';

export default function BodyMeasurementsSkeleton() {
  return (
    <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg h-full'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4 sm:mb-4'>
        <Skeleton className='w-5 h-5 rounded-full' />
        <Skeleton className='h-5 w-44' />
      </div>

      {/* Grid of measurements */}
      <div className='grid grid-cols-3 gap-3 sm:gap-4'>
        {[...Array(6)].map((_, i) => (
          <div className='flex flex-row items-center gap-3' key={i}>
            <Skeleton className='w-5 h-5 rounded-sm' />
            <div className='space-y-1'>
              <Skeleton className='h-3 w-16' />
              <Skeleton className='h-5 w-12' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
