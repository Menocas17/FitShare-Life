import TrainingLog from '@/components/workout/log-workout/training-log';
import { getExercisesByWorkout } from '@/lib/server_actions/workouts';
import { WorkoutExerciseWithDetails } from '@/types/types';
import { Dumbbell } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function LogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const exercises: WorkoutExerciseWithDetails[] = await getExercisesByWorkout(
    id
  );

  console.log(exercises);

  return (
    <div className='mx-auto overflow-x-auto w-full'>
      <div className='flex gap-15'>
        <div className='flex gap-2 justify-center md:justify-start'>
          <h2 className='text-2xl sm:text-2xl font-semibold  mb-10'>
            {exercises[0]?.workouts?.name}
          </h2>
          <Dumbbell className='w-8 h-8 text-primary' />
        </div>
      </div>

      <TrainingLog exercises={exercises} />
    </div>
  );
}
