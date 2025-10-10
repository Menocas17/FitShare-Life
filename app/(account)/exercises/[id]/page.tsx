'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AddExercise } from '@/lib/server_actions/workouts';
import { useRouter } from 'next/navigation';

type Exercise = {
  id: string;
  name: string;
  description: string;
  muscle_group: string;
  image_url?: string;
  url_link?: string;
};

export default function ExcerciseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [editLog, setEditLog] = useState(false);
  const [log, setLog] = useState(false);
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const editLogValue = sessionStorage.getItem('edit/log');
    const logValue = sessionStorage.getItem('log');
    const editValue = sessionStorage.getItem('edit');
    setEditLog(editLogValue === 'true');
    setLog(logValue === 'true');
    setEdit(editValue === 'true');
  }, []);

  useEffect(() => {
    const fetchExercise = async () => {
      const { data, error } = await supabase
        .from('excercises')
        .select('*')
        .eq('id', unwrappedParams.id)
        .single();
      if (!error && data) {
        setExercise(data as Exercise);
      }
    };
    fetchExercise();
  }, [unwrappedParams.id]);

  const showButton = sessionStorage.getItem('showButton') === 'true';

  const handleAddingExercise = () => {
    const savedExercises = sessionStorage.getItem('exercises');
    const exercisesArray = savedExercises ? JSON.parse(savedExercises) : [];
    if (
      exercise &&
      exercisesArray.some((ex: Exercise) => ex.id === exercise.id)
    ) {
      alert('Exercise already added to workout');
      return;
    }

    exercisesArray.push(exercise);

    sessionStorage.setItem('exercises', JSON.stringify(exercisesArray));
  };

  const workoutId = sessionStorage.getItem('workout_id');

  //This is meant to be used when the user comes from log or edit page
  async function handleAddingExerciseToDatabase(
    exerciseId: string,
    workout_id: string
  ) {
    if (localStorage.getItem(exerciseId)) {
      alert('Exercise already added to workout');
      return;
    } else {
      await AddExercise(exerciseId, workout_id);
    }
  }

  let redirectPath = '';
  if (log) {
    redirectPath = `/workout-management/log/${workoutId}`;
  }
  if (edit) {
    redirectPath = `/workout-management/edit/${workoutId}`;
  }

  if (!log && !edit) {
    redirectPath = `/workout-management/create`;
  }

  const handleClick = () => {
    if (editLog) {
      handleAddingExerciseToDatabase(exercise!.id, workoutId!);
      router.push(redirectPath);
    } else {
      handleAddingExercise();
      router.push(redirectPath);
    }
  };

  if (!exercise) return <p className='p-6'>Loading...</p>;

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-4 sm:flex-row items-center md:gap-10'>
        <h1 className='text-3xl font-bold'>{exercise.name}</h1>

        {showButton && <Button onClick={handleClick}>Add to Workout</Button>}
      </div>

      {exercise.image_url && (
        <Image
          src={exercise.image_url}
          alt={exercise.name}
          width={250}
          height={250}
          className=' max-w-md rounded mb-4'
        />
      )}
      <p className='mb-2'>
        <strong>Muscle Group:</strong> {exercise.muscle_group}
      </p>
      <p className='mb-4'>
        <strong>Description:</strong> {exercise.description}
      </p>
      {exercise.url_link && (
        <a
          href={exercise.url_link}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline'
        >
          More info
        </a>
      )}
    </div>
  );
}
