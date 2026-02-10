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

// Get sessions trained per week
export async function getWorkoutSessionWeek(profileId: string) {
  try {
    // Get workouts from the last week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const { data, error } = await supabase
      .from('workout_history')
      .select('created_at')
      .eq('profile_id', profileId)
      .gte('created_at', weekAgo.toISOString());

    if (error) {
      console.error('Error fetching workout history:', error);
      return 0;
    }

    const totalSessions = data?.length || 0;

    return totalSessions;
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
        avgIntensity: 0,
      };
    }

    const totalWorkouts = data?.length || 0;
    const totalWeight = data.reduce(
      (acc, session) => acc + session.total_weight,
      0,
    );
    const totalSets = data.reduce(
      (acc, session) => acc + session.total_sets,
      0,
    );

    const avgIntensity = totalSets > 0 ? totalWeight / totalSets : 0;

    return {
      totalWorkouts,
      totalWeight,
      totalSets,
      avgIntensity,
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      totalWorkouts: 0,
      totalWeight: 0,
      totalSets: 0,
      avgIntensity: 0,
    };
  }
}

//This is the mother function that calls the other and simplify it use in the server component
export async function getDashboardData(profileId: string | undefined) {
  if (!profileId) return console.error('The id provided is not working');
  try {
    const [
      workoutsCompleted,
      workoutSessionsPerWeek,
      recentWorkoutData,
      workoutStats,
      userPostsCount,
    ] = await Promise.all([
      getWorkoutCompletedCount(profileId),
      getWorkoutSessionWeek(profileId),
      getMostRecentWorkout(profileId),
      getWorkoutStats(profileId),
      getUserPostsCount(profileId),
    ]);

    return {
      recentWorkout: recentWorkoutData,
      dashboardStats: {
        workoutsCompleted: workoutsCompleted,
        sessionPerWeek: workoutSessionsPerWeek,
        ...workoutStats,
      },
      postsCount: userPostsCount,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
