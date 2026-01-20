import { supabase } from './supabase';
import { getUserPostsCount } from './server_actions/social';

// Get user profile data including weight and body measurements
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Get total workout completed count for a user
export async function getWorkoutCompletedCount(profileId: string) {
  try {
    const { count, error } = await supabase
      .from('workout_history')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profileId);

    if (error) {
      console.error('Error fetching workout count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Unexpected error:', err);
    return 0;
  }
}

// Get average hours trained per week
export async function getAverageHoursTrained(profileId: string) {
  try {
    // Get workouts from the last 4 weeks
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const { data, error } = await supabase
      .from('workout_history')
      .select('created_at')
      .eq('profile_id', profileId)
      .gte('created_at', fourWeeksAgo.toISOString());

    if (error) {
      console.error('Error fetching workout history:', error);
      return 0;
    }

    // Estimate 1 hour per workout session
    const totalHours = data?.length || 0;
    const averagePerWeek = Math.round(totalHours / 4);

    return averagePerWeek;
  } catch (err) {
    console.error('Unexpected error:', err);
    return 0;
  }
}

// Get most recent workout details
export async function getMostRecentWorkout(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('workout_history')
      .select(
        `
        id,
        created_at,
        total_sets,
        total_weight,
        workouts (
          name
        )
      `,
      )
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching recent workout:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Get all user workouts
export async function getUserWorkouts(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user workouts:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

// Get workout statistics for the last 30 days
export async function getWorkoutStats(profileId: string) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from('workout_history')
      .select('total_sets, total_weight, created_at')
      .eq('profile_id', profileId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (error) {
      console.error('Error fetching workout stats:', error);
      return {
        totalWorkouts: 0,
        totalWeight: 0,
        totalSets: 0,
        averageWeight: 0,
      };
    }

    const totalWorkouts = data?.length || 0;
    const totalWeight =
      data?.reduce((sum, workout) => sum + (workout.total_weight || 0), 0) || 0;
    const totalSets =
      data?.reduce((sum, workout) => sum + (workout.total_sets || 0), 0) || 0;
    const averageWeight =
      totalWorkouts > 0 ? Math.round(totalWeight / totalWorkouts) : 0;

    return {
      totalWorkouts,
      totalWeight,
      totalSets,
      averageWeight,
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      totalWorkouts: 0,
      totalWeight: 0,
      totalSets: 0,
      averageWeight: 0,
    };
  }
}

//This is the mother function that calls the other and simplify it use in the server component
export async function getDashboardData(profileId: string | undefined) {
  if (!profileId) return console.error('The id provided is not working');
  try {
    const [
      workoutsCompleted,
      averageHours,
      recentWorkoutData,
      workoutStats,
      userPostsCount,
    ] = await Promise.all([
      getWorkoutCompletedCount(profileId),
      getAverageHoursTrained(profileId),
      getMostRecentWorkout(profileId),
      getWorkoutStats(profileId),
      getUserPostsCount(profileId),
    ]);

    return {
      recentWorkout: recentWorkoutData,
      dashboardStats: {
        workoutsCompleted: workoutsCompleted,
        averageHoursTrained: averageHours,
        ...workoutStats,
      },
      postsCount: userPostsCount,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
