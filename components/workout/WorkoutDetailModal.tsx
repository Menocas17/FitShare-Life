'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Clock, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkoutDetailModalProps } from '@/types/types';
import {
  getDefaultWorkoutExercises,
  getWorkoutById,
} from '@/lib/server_actions/workouts';
import { useRouter } from 'next/navigation';
import { Tables } from '@/types/supabase';
import { getProfileInfo } from '@/lib/server_actions/social';
import {
  CreateWorkoutFromDefault,
  AddExercisesToDefaultWorkout,
} from '@/lib/server_actions/workouts';

interface WorkoutData {
  exercises: Exercise[];
  difficulty: string | null;
  duration: string | null;
  targetMuscles: string[] | null;
}
interface Exercise {
  name: string;
  sets: [
    {
      reps: number;
      weight: number;
    }
  ];
  rest_time: number;
  exercise_id: string;
}

interface WorkoutInfo {
  id: string;
  name: string | null;
  description: string | null;
  image: string | null;
}

interface Profile {
  id: string;
  user_id: string;
  user_name: string | null;
}
const WorkoutDetailModal = ({
  isOpen,
  onClose,
  workoutId,
}: WorkoutDetailModalProps) => {
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [workoutInfo, setWorkoutInfo] = useState<WorkoutInfo | null>(null);
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // get user session
        const res = await fetch('/api/sessions');
        const data = await res.json();
        if (!data.user) {
          router.push('/login');
          return;
        }
        const profileData = await getProfileInfo(data.user.id);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    if (isOpen && workoutId) {
      const getWorkoutDetails = async (workoutId: string) => {
        const data = await getDefaultWorkoutExercises(workoutId);
        setWorkoutData(data);

        const workoutInfo = await getWorkoutById(workoutId);
        setWorkoutInfo(workoutInfo);
      };

      getWorkoutDetails(workoutId);
    }
  }, [isOpen, workoutId]);

  const handleCreateWorkout = async () => {
    if (!workoutData) return;

    const createdWorkoutId = await CreateWorkoutFromDefault(
      workoutInfo!.name!,
      profile!.id
    );

    if (createdWorkoutId) {
      await AddExercisesToDefaultWorkout(
        createdWorkoutId,
        workoutData.exercises
      );
    }

    onClose();
    window.location.reload();
  };

  const targetMuscles = workoutData?.targetMuscles;
  const exercises = workoutData?.exercises;

  if (!isOpen || !workoutData) return null;

  return (
    <div className='fixed inset-0 bg-black/50 z-50'>
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-background shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-border'>
            <div>
              <h2 className='text-2xl font-semibold'>{workoutInfo?.name}</h2>
              <p className='text-muted-foreground'>
                {workoutInfo?.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-accent rounded-md transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {/* Workout Info */}
          <div className='p-6 border-b border-border'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-blue-500' />
                <span className='text-sm'>{workoutData.duration}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Target className='w-4 h-4 text-green-500' />
                <span className='text-sm'>{workoutData.difficulty}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 text-purple-500' />
                <span className='text-sm'>{exercises!.length} exercises</span>
              </div>
            </div>

            <div className='mt-4'>
              <h4 className='font-medium mb-2'>Target Muscles:</h4>
              <div className='flex flex-wrap gap-2'>
                {targetMuscles!.map((muscle: string) => (
                  <span
                    key={muscle}
                    className='px-2 py-1 bg-primary/10 text-primary rounded-full text-xs'
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Exercises List */}
          <div className='flex-1 overflow-y-auto p-6'>
            <h3 className='text-lg font-semibold mb-4'>Select Exercises</h3>
            <div className='space-y-3'>
              {workoutData.exercises.map((exercise) => (
                <div
                  key={exercise.exercise_id}
                  className={
                    'p-4 border rounded-lg cursor-pointer transition-all'
                  }
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h4 className='font-medium'>{exercise.name}</h4>
                      </div>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <span>{exercise.sets.length} sets</span>
                        <span>
                          {exercise.sets.reduce(
                            (acc, set) => acc + set.reps,
                            0
                          ) / exercise.sets.length}{' '}
                          avg reps
                        </span>
                        <span>rest time: {exercise.rest_time} secs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className='p-6 border-t border-border'>
            <div className='flex items-center justify-between'>
              <Button
                onClick={handleCreateWorkout}
                className='flex items-center gap-2'
              >
                <Plus className='w-4 h-4' />
                Create Workout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailModal;
