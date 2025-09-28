import TrainingLog from '@/components/workout/log-workout/training-log';
import { getExercisesByWorkout } from '@/lib/server_actions/workouts';
import { WorkoutExerciseWithDetails } from '@/types/types';
import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function LogPage({ params }: PageProps) {
  const { id } = params;
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
        <Button
          variant='outline'
          className='bg-[#2fb981] hover:bg-[#0a9667] text-white'
        >
          Add New
        </Button>
      </div>

      <TrainingLog exercises={exercises} />
    </div>
  );
}
