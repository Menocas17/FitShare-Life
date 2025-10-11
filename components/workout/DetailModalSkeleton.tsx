import { Skeleton } from '../ui/skeleton';

export default function DetailSkeleton() {
  return (
    <div className='fixed inset-0 bg-black/50 z-50'>
      <div className='fixed right-0 top-0 h-full w-full max-w-2xl bg-background shadow-xl transform transition-transform duration-300 translate-x-0'>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-border'>
            <div className='space-y-2'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-4 w-64' />
            </div>
            <Skeleton className='h-8 w-8 rounded-md' />
          </div>

          {/* Workout Info */}
          <div className='p-6 border-b border-border space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </div>

            <div>
              <Skeleton className='h-5 w-32 mb-2' />
              <div className='flex flex-wrap gap-2'>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className='h-6 w-16 rounded-full' />
                ))}
              </div>
            </div>
          </div>

          {/* Exercises List */}
          <div className='flex-1 overflow-y-auto p-6'>
            <Skeleton className='h-6 w-40 mb-4' />
            <div className='space-y-3'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='p-4 border rounded-lg space-y-2 animate-pulse'
                >
                  <Skeleton className='h-5 w-40' />
                  <div className='flex gap-4'>
                    <Skeleton className='h-4 w-16' />
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className='p-6 border-t border-border'>
            <Skeleton className='h-10 w-40 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
