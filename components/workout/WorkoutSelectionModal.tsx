'use client';

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import Image from 'next/image';
import { WorkoutSelectionModalProps } from '@/types/types';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { getDefaultWorkouts } from '@/lib/server_actions/workouts';
import WorkoutGridSkeleton from './SelectionModalSkeleton';

interface WorkoutOption {
  id: string;
  name: string | null;
  description: string | null;
  image: string | null;
}

const WorkoutSelectionModal = ({
  isOpen,
  onClose,
  onSelectWorkout,
}: WorkoutSelectionModalProps) => {
  const [workoutOptions, setWorkoutOptions] = useState<WorkoutOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutOptions = async () => {
      setIsLoading(true);
      try {
        const options = await getDefaultWorkouts();
        setWorkoutOptions(options);
      } catch (error) {
        console.error('Error loading workouts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutOptions();
  }, []);

  const handleSelectWorkout = (WorkoutId: string) => {
    onSelectWorkout(WorkoutId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}

        <div className='flex flex-col'>
          <div className='flex items-center justify-between p-6 border-b border-border'>
            <h2 className='text-2xl font-semibold'>Choose Your Workout</h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-accent rounded-md transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <div className='flex flex-col items-center justify-center mt-8'>
            <Link href='/workout-management/create'>
              <Button>Create your own Workout</Button>
            </Link>
            <span className='mx-2 font-bold block mt-5'>OR</span>
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          <p className='text-muted-foreground mb-6 text-center'>
            Select a workout type to get started with your training session
          </p>

          {isLoading ? (
            <WorkoutGridSkeleton />
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {workoutOptions.map((workout) => (
                <div
                  key={workout.id}
                  onClick={() => handleSelectWorkout(workout.id)}
                  className='bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105'
                >
                  <div className='relative h-48'>
                    <Image
                      src={workout.image!}
                      alt={workout.name!}
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='p-4'>
                    <h3 className='text-lg font-semibold mb-2'>
                      {workout.name}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {workout.description}
                    </p>
                  </div>

                  <div className='px-4 pb-4'>
                    <button className='w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
                      Select {workout.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSelectionModal;
