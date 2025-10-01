'use client';

import Image from 'next/image';
import LogTable from './log-table';
import { WorkoutExerciseWithDetails } from '@/types/types';
import { getAllData } from '@/lib/utils';
import { UpdateWorkout } from '@/lib/server_actions/workouts';
import { Button } from '@/components/ui/button';
import SummaryModal from '@/components/workout/log-workout/summary_modal';
import { useState } from 'react';
import DiscardModal from './discard_modal';
import { UpdateWorkoutHistory } from '@/lib/server_actions/workouts';

interface Summary {
  totalWeight: number;
  totalSets: number;
}

export default function TrainingLog({
  exercises,
}: {
  exercises: WorkoutExerciseWithDetails[];
}) {
  const [finished, setFinished] = useState(false);
  const [summaryData, setSummaryData] = useState<Summary>();
  const [openDiscard, setOpenDiscard] = useState(false);

  //function to update the workout in the database when the user clicks in the end workout with the server action

  function handleUpdateWorkout() {
    const trainingData = getAllData(); // getting all the data from the localsotrage

    const summaryData = trainingData.summary ?? {
      //setting the summary data
      totalSets: 0,
      totalWeight: 0,
    };
    const clearedData = trainingData.formatedData; // getting the formated data for saving in the data base

    clearedData.forEach((exercise) => {
      // for each loop for saving each excercise log in the database
      UpdateWorkout(exercise.id, exercise.sets);
    });

    setSummaryData(summaryData); // settign the summary data for using it in the workout history or setting the state

    //saving the sumary in the database
    const workoutId = exercises[0].workout_id;
    UpdateWorkoutHistory(summaryData, workoutId);

    setFinished(true);
    localStorage.clear();
  }

  //function to handle de discard of the workout

  function handleOpenDiscard() {
    setOpenDiscard(!openDiscard);
  }

  return (
    <>
      {exercises.map((exercise) => (
        <div key={exercise.id} className='overflow-x-auto flex flex-col mb-6'>
          <div className='flex gap-4 items-center mb-6'>
            <Image
              src={exercise.excercises?.image_url ?? '/img/placeholder.jpg'}
              alt={exercise.excercises?.name ?? 'Placeholder'}
              width={70}
              height={80}
              className='rounded-full border-2'
            />
            <div className='flex flex-col'>
              <h3 className='text-xl sm:text-xl font-semibold '>
                {exercise.excercises?.name ?? 'Unnamed Exercise'}
              </h3>
              <h4>
                <span className='font-bold'>Rest Time:</span>{' '}
                {exercise.rest_time ?? 0} sec
              </h4>
            </div>
          </div>

          <LogTable sets={exercise.sets} id={exercise.exercise_id} />
        </div>
      ))}

      <div className='flex gap-4 justify-center mt-10 md:justify-start md:ml-5'>
        <Button
          variant='destructive'
          className='bg-[#96150c]'
          onClick={handleOpenDiscard}
        >
          Discard Workout
        </Button>
        <Button
          onClick={handleUpdateWorkout}
          variant='outline'
          className='bg-[#2fb981] hover:bg-[#0a9667] text-white'
        >
          Save Workout
        </Button>
      </div>

      {finished && summaryData && (
        <SummaryModal
          summaryData={summaryData}
          workoutName={exercises[0].workouts?.name ?? ''}
        />
      )}

      {openDiscard && <DiscardModal handleClose={handleOpenDiscard} />}
    </>
  );
}
