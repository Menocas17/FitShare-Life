'use client';

import Image from 'next/image';
import LogTable from './log-table';
import { WorkoutExerciseWithDetails } from '@/types/types';
import { getAllData } from '@/lib/utils';
import { UpdateWorkout } from '@/lib/server_actions/workouts';
import { Button } from '@/components/ui/button';

export default function TrainingLog({
  exercises,
}: {
  exercises: WorkoutExerciseWithDetails[];
}) {
  const trainingData = getAllData();
  const summaryData = trainingData.summary;
  const clearedData = trainingData.formatedData;

  //function to update the workout in the database when the user clicks in the end workout

  function handleUpdateWorkout() {
    clearedData.forEach((exercise) => {
      UpdateWorkout(exercise.id, exercise.sets);
    });
  }

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

          <LogTable sets={exercise.sets} id={exercise.exercise_id} />
        </div>
      ))}

      <Button onClick={handleUpdateWorkout}>Save Workout</Button>
    </>
  );
}
