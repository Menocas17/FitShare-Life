import { Skeleton } from '@/components/ui/skeleton';
import StatsOverviewSkeleton from '@/components/home/Skeletons/StatsOverviewSkeleton';
import RecentWorkoutSkeleton from '@/components/home/Skeletons/RecentWorkoutSkeleton';
import BodyMeasurementsSkeleton from '@/components/home/Skeletons/BodyMeasurementsSkeleton';

export default function HomeLoading() {
  return (
    <div className='space-y-4 sm:space-y-6 px-2 sm:px-4 max-w-full overflow-hidden mb-4'>
      {/* 1. Header Skeleton - Matchea el texto de bienvenida */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='min-w-0 flex-1 py-1'>
          <Skeleton className='h-4 sm:h-5 lg:h-6 w-3/4 max-w-[450px] rounded-md' />
        </div>
      </div>

      <div className='space-y-4 sm:space-y-6'>
        {/* 2. Quick Create Post Section Skeleton */}
        <div className='bg-card border border-border rounded-lg p-3 sm:p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
            {/* Izquierda: Icono + Textos */}
            <div className='flex items-center gap-3 min-w-0 flex-1'>
              <Skeleton className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0' />
              <div className='min-w-0 flex-1 space-y-2'>
                <Skeleton className='h-4 sm:h-5 w-48 max-w-full rounded-md' />
                <Skeleton className='h-3 sm:h-4 w-64 max-w-[80%] rounded-md' />
              </div>
            </div>

            {/* Derecha: Botones (Flex-1 en móvil, fijos en desktop) */}
            <div className='flex gap-2 flex-shrink-0 w-full sm:w-auto'>
              <Skeleton className='h-9 sm:h-[38px] flex-1 sm:flex-none sm:w-[100px] rounded-lg' />
              <Skeleton className='h-9 sm:h-[38px] flex-1 sm:flex-none sm:w-[120px] rounded-lg' />
            </div>
          </div>
        </div>

        {/* 3. Stats Overview Skeleton */}
        <StatsOverviewSkeleton />

        {/* 4. Recent Workout & Body Measurements Skeletons */}
        <div className='grid grid-cols-1 lg1:grid-cols-2 gap-3 sm:gap-4 lg:gap-6'>
          <RecentWorkoutSkeleton />
          <BodyMeasurementsSkeleton />
        </div>
      </div>
    </div>
  );
}
