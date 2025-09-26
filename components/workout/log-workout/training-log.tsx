import Image from 'next/image';
import LogTable from './log-table';
import { WorkoutExerciseWithDetails } from '@/types/types';

export default function TrainingLog({
  exercises,
}: {
  exercises: WorkoutExerciseWithDetails[];
}) {
  return (
    <>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <Image
            src={exercise.excercises?.image_url ?? '/img/placeholder.jpg'}
            alt={exercise.excercises?.name ?? 'Placeholder'}
            width={100}
            height={100}
          />
          <h3>{exercise.excercises?.name ?? 'Unnamed Exercise'}</h3>
          <h4>Rest Time: {exercise.rest_time ?? 0} sec</h4>

          <LogTable sets={exercise.sets} />
        </div>
      ))}
    </>
  );
}
