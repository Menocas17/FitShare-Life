'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Dumbbell, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkoutSelectionModal from './WorkoutSelectionModal';
import WorkoutDetailModal from './WorkoutDetailModal';
import LoadingSpinner from '../ui-kit/LoadingSpinner';
import {
  getUserWorkouts,
  getWeeklyWorkoutHistory,
} from '@/lib/server_actions/workouts';
import WorkoutCard from './workoutCard';

interface WorkoutManagementProps {
  UserProfile: {
    id: string;
    user_id: string;
    user_name: string | null;
  } | null;
}

interface Workout {
  id: string;
  name: string;
}

interface weeklyWorkoutHistory {
  id: string;
  workout_id: string;
  created_at: string;
}

export default function WorkoutManagement({
  UserProfile,
}: WorkoutManagementProps) {
  // Modal states
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('');

  //Data states
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weeklyWorkoutHistory, setWeeklyWorkoutHistory] = useState<
    weeklyWorkoutHistory[]
  >([]);

  const [loading, setLoading] = useState(true);

  //fetching data with the server actions

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!UserProfile?.id) return;
      const userWorkouts = await getUserWorkouts(UserProfile.id);
      setWorkouts(userWorkouts);

      const weeklyWorkoutHistory = await getWeeklyWorkoutHistory(
        UserProfile.id,
      );
      setWeeklyWorkoutHistory(weeklyWorkoutHistory);

      setLoading(false);
    };

    fetchWorkouts();
  }, [UserProfile?.id]);

  const handleCreateWorkout = () => {
    setIsSelectionModalOpen(true);
  };

  const handleSelectWorkout = (workoutType: string) => {
    setSelectedWorkoutType(workoutType);
    setIsDetailModalOpen(true);
  };

  const closeAllModals = () => {
    setIsSelectionModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedWorkoutType('');
  };

  function getFormattedLastPerformedDate(
    weeklyWorkoutHistory: weeklyWorkoutHistory[],
    workout_id: string,
  ): string {
    const history = weeklyWorkoutHistory.find(
      (h) => h.workout_id === workout_id && h.created_at,
    );
    if (history && !isNaN(Date.parse(history.created_at))) {
      const date = new Date(history.created_at);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return 'Have not performed this workout yet';
  }

  if (loading) {
    return <LoadingSpinner text='Loading your Workouts' />;
  }

  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
        <h2 className='text-xl sm:text-2xl font-semibold'>
          Workout Management
        </h2>
        <Button
          onClick={handleCreateWorkout}
          className='flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 w-full sm:w-auto'
        >
          <Plus className='w-4 h-4' />
          <span className='sm:block'>Create Workout</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8'>
        <div className='p-4 sm:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Dumbbell className='w-5 h-5 text-primary' />
            <h3 className='text-base sm:text-lg font-semibold'>
              Total Workouts
            </h3>
          </div>
          <p className='text-2xl sm:text-3xl font-bold text-primary'>
            {workouts.length}
          </p>
        </div>

        {/* <div className='p-4 sm:p-6 bg-card border border-border rounded-lg'>
          <div className='flex items-center gap-2 mb-2'>
            <Clock className='w-5 h-5 text-blue-500' />
            <h3 className='text-base sm:text-lg font-semibold'>Avg Duration</h3>
          </div>
          <p className='text-2xl sm:text-3xl font-bold text-primary'>
            {avgDuration}min
          </p>
        </div> */}

        <div className='p-4 sm:p-6 bg-card border border-border rounded-lg sm:col-span-2 lg:col-span-1'>
          <div className='flex items-center gap-2 mb-2'>
            <Target className='w-5 h-5 text-green-500' />
            <h3 className='text-base sm:text-lg font-semibold'>This Week</h3>
          </div>
          <p className='text-2xl sm:text-3xl font-bold text-primary'>
            {weeklyWorkoutHistory.length}
          </p>
        </div>
      </div>

      {/* Workout List */}
      <div className='space-y-4'>
        <h3 className='text-base sm:text-lg font-semibold'>Your Workouts</h3>

        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workoutId={workout.id}
            lastPerformedWorkout={getFormattedLastPerformedDate(
              weeklyWorkoutHistory,
              workout.id,
            )}
            name={workout.name}
          />
        ))}
      </div>

      {/* Empty State if no workouts */}
      {workouts.length === 0 && (
        <div className='text-center py-8 sm:py-12 px-4'>
          <Dumbbell className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-base sm:text-lg font-semibold text-gray-600 mb-2'>
            No workouts yet
          </h3>
          <p className='text-sm sm:text-base text-gray-500 mb-4'>
            Create your first workout to get started
          </p>
          <button
            onClick={handleCreateWorkout}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 mx-auto w-full sm:w-auto max-w-xs'
          >
            <Plus className='w-4 h-4' />
            Create Your First Workout
          </button>
        </div>
      )}

      {/* Modals */}
      <WorkoutSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        onSelectWorkout={handleSelectWorkout}
      />

      <WorkoutDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeAllModals}
        workoutId={selectedWorkoutType}
      />
    </div>
  );
}
