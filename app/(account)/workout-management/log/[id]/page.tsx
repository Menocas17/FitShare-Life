import TrainingLog from '@/components/workout/log-workout/training-log';
import { getExercisesByWorkout } from '@/lib/workouts';
import { WorkoutExerciseWithDetails } from '@/types/types';

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
    <>
      <h2>{exercises[0]?.workouts?.name}</h2>
      <TrainingLog exercises={exercises} />
    </>
  );
}
