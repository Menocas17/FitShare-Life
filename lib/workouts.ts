import { supabase } from './supabase';

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
