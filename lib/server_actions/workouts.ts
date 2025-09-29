'use server';
import { supabase } from '../supabase';
import { SetType } from '@/types/supabase';
import { WorkoutHystory } from '@/types/types';

//This gets all the excercises with additional info that belongs to certain workout
export async function getExercisesByWorkout(workoutId: string) {
  try {
    const { data, error } = await supabase
      .from('workout_excercises')
      .select(
        `
        *,
        excercises (
          name,
          image_url
        ),
        workouts (
          name
        )
      `
      )
      .eq('workout_id', workoutId)
      .order('sets', { ascending: true });

    if (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

//This will get all the details of the excercises
export async function getExerciseDetails(exerciseId: string) {
  try {
    const { data, error } = await supabase
      .from('excercises')
      .select('*')
      .eq('id', exerciseId);
    if (error) {
      console.error('Error fetching exercise:', error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

//This will upsert the excercise sets information to the database updating the workout

export async function UpdateWorkout(excercise_id: string, sets: SetType[]) {
  try {
    const { data, error } = await supabase
      .from('workout_excercises')
      .update({ sets })
      .eq('exercise_id', excercise_id);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

//This will get all the workout detailsa by it's ID

export async function GetWorkoutDetails(workout_id: string) {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('id', workout_id);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

//This will insert the workout history once the workout is finished

export async function UpdateWorkoutHistory(
  workout_history: WorkoutHystory,
  workout_id: string
) {
  const workoutDetails = await GetWorkoutDetails(workout_id);
  const workout = workoutDetails[0];
  if (!workout) {
    console.error('Workout not found');
    return [];
  }

  try {
    const { data, error } = await supabase.from('workout_history').insert([
      {
        workout_id: workout_id,
        profile_id: workout.profile_id ?? undefined,
        total_weight: workout_history.totalWeight,
        total_sets: workout_history.totalSets,
      },
    ]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}
