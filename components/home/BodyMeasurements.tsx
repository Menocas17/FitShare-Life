import { Ruler, User, GanttChart } from 'lucide-react';
import { bodyMeasurementsArray } from '@/types/types';

export default function BodyMeasurements({
  bodyMeasurements,
}: {
  bodyMeasurements: bodyMeasurementsArray | void;
}) {
  return (
    <div className='p-3 sm:p-4 lg:p-6 bg-card border border-border rounded-lg'>
      <div className='flex items-center gap-2 mb-4 sm:mb-4'>
        <GanttChart className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
        <h3 className='text-base sm:text-lg font-semibold'>
          Body Measurements
        </h3>
      </div>
      {bodyMeasurements ? (
        <div className='grid grid-cols-3 gap-3 sm:gap-4'>
          {bodyMeasurements.map((measurement) => {
            return (
              <div
                className='flex flex-row items-center gap-3 '
                key={measurement.key}
              >
                <Ruler
                  className={`w-5 h-5 ${measurement.key === 'chest' ? 'text-purple-600' : ''}
                  ${measurement.key === 'waist' || measurement.key === 'hips' ? 'text-orange-600' : ''}
                  ${measurement.key === 'biceps' ? 'text-green-500' : ''}
                  ${measurement.key === 'thighs' ? 'text-red-600' : ''}`}
                />
                <div>
                  <p className='text-xs sm:text-sm text-muted-foreground'>
                    {measurement.label}
                  </p>
                  <p className='text-sm sm:text-base lg:text-lg font-semibold text-center'>
                    {measurement.value ? `${measurement.value} cm` : '--'}
                  </p>
                </div>
              </div>
            );
          })}
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
  );
}
