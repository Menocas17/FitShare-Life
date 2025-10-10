'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  if (!exercise) return <p className='p-6'>Loading...</p>;

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-4 sm:flex-row items-center md:gap-10'>
        <h1 className='text-3xl font-bold'>{exercise.name}</h1>

        {showButton && (
          <Link href={`/workout-management/create`}>
            <Button onClick={handleAddingExercise}>Add to Workout</Button>
          </Link>
        )}
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
