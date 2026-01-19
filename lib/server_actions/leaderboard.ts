'use server';
import { supabase } from '../supabase';

export interface LeaderboardEntry {
  id: string;
  user_name: string;
  avatar_url?: string;
  totalWorkouts: number;
  totalWeight: number;
  totalSets: number;
  averageWeight: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface FriendsLeaderboardEntry extends LeaderboardEntry {
  isFollowing: boolean;
}

interface ProfileData {
  id: string;
  user_name: string | null;
  users: {
    avatar: string | null;
  } | null;
}

// Get global leaderboard based on total workouts and weight lifted
export async function getGlobalLeaderboard(
  currentProfileId: string,
  limit: number = 50,
): Promise<LeaderboardEntry[]> {
  try {
    // Get workout statistics for all users
    const { data: workoutStats, error } = await supabase.from('workout_history')
      .select(`
        profile_id,
        total_sets,
        total_weight,
        profiles!inner(
          id,
          user_name,
          users!inner(
            avatar
          )
        )
      `);

    if (error) {
      console.error('Error fetching global leaderboard:', error);
      return [];
    }

    // Group by profile and calculate totals
    const profileStats = new Map<
      string,
      {
        profile: ProfileData;
        totalWorkouts: number;
        totalWeight: number;
        totalSets: number;
      }
    >();

    workoutStats?.forEach((workout) => {
      const profileId = workout.profile_id;
      const existing = profileStats.get(profileId);

      if (existing) {
        existing.totalWorkouts += 1;
        existing.totalWeight += workout.total_weight || 0;
        existing.totalSets += workout.total_sets || 0;
      } else {
        profileStats.set(profileId, {
          profile: workout.profiles as ProfileData,
          totalWorkouts: 1,
          totalWeight: workout.total_weight || 0,
          totalSets: workout.total_sets || 0,
        });
      }
    });

    // Convert to leaderboard entries and sort
    const leaderboardEntries: LeaderboardEntry[] = Array.from(
      profileStats.entries(),
    )
      .map(([profileId, stats]) => ({
        id: profileId,
        user_name: stats.profile.user_name || 'Anonymous',
        avatar_url: stats.profile.users?.avatar || undefined,
        totalWorkouts: stats.totalWorkouts,
        totalWeight: stats.totalWeight,
        totalSets: stats.totalSets,
        averageWeight:
          stats.totalWorkouts > 0
            ? Math.round(stats.totalWeight / stats.totalWorkouts)
            : 0,
        rank: 0, // Will be set after sorting
        isCurrentUser: profileId === currentProfileId,
      }))
      .sort((a, b) => {
        // Primary sort: total workouts (descending)
        if (b.totalWorkouts !== a.totalWorkouts) {
          return b.totalWorkouts - a.totalWorkouts;
        }
        // Secondary sort: total weight lifted (descending)
        return b.totalWeight - a.totalWeight;
      })
      .slice(0, limit);

    // Add rank numbers
    leaderboardEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return leaderboardEntries;
  } catch (err) {
    console.error('Unexpected error fetching global leaderboard:', err);
    return [];
  }
}

// Get friends leaderboard (people you follow)
export async function getFriendsLeaderboard(
  currentProfileId: string | undefined,
  limit: number = 20,
): Promise<FriendsLeaderboardEntry[]> {
  if (!currentProfileId) return [];
  try {
    // Get list of people the current user follows with their profile data
    const { data: following, error: followingError } = await supabase
      .from('social_connections')
      .select(
        `
        followed_id,
        profiles!social_connections_followed_id_fkey(
          id,
          user_name,
          users!inner(
            avatar
          )
        )
      `,
      )
      .eq('follower_id', currentProfileId);

    if (followingError) {
      console.error('Error fetching following list:', followingError);
      return [];
    }

    // Get current user's profile data
    const { data: currentUserProfile, error: currentUserError } = await supabase
      .from('profiles')
      .select(
        `
        id,
        user_name,
        users!inner(
          avatar
        )
      `,
      )
      .eq('id', currentProfileId)
      .single();

    if (currentUserError) {
      console.error('Error fetching current user profile:', currentUserError);
      return [];
    }

    // Prepare all profiles including current user
    const allProfiles: ProfileData[] = [];
    const followedIds: string[] = [];

    // Add followed users
    following?.forEach((connection) => {
      if (connection.followed_id && connection.profiles) {
        followedIds.push(connection.followed_id);
        allProfiles.push(connection.profiles as ProfileData);
      }
    });

    // Add current user
    allProfiles.push(currentUserProfile as ProfileData);
    const allProfileIds = [...followedIds, currentProfileId];

    // Get workout statistics for all users
    const { data: workoutStats, error } = await supabase
      .from('workout_history')
      .select('profile_id, total_sets, total_weight')
      .in('profile_id', allProfileIds);

    if (error) {
      console.error('Error fetching workout stats:', error);
      return [];
    }

    // Group workout stats by profile ID
    const workoutStatsMap = new Map<
      string,
      { totalWorkouts: number; totalWeight: number; totalSets: number }
    >();

    workoutStats?.forEach((workout) => {
      const profileId = workout.profile_id;
      const existing = workoutStatsMap.get(profileId);

      if (existing) {
        existing.totalWorkouts += 1;
        existing.totalWeight += workout.total_weight || 0;
        existing.totalSets += workout.total_sets || 0;
      } else {
        workoutStatsMap.set(profileId, {
          totalWorkouts: 1,
          totalWeight: workout.total_weight || 0,
          totalSets: workout.total_sets || 0,
        });
      }
    });

    // Create leaderboard entries
    const leaderboardEntries: FriendsLeaderboardEntry[] = allProfiles.map(
      (profile) => {
        const stats = workoutStatsMap.get(profile.id) || {
          totalWorkouts: 0,
          totalWeight: 0,
          totalSets: 0,
        };

        return {
          id: profile.id,
          user_name: profile.user_name || 'Anonymous',
          avatar_url: profile.users?.avatar || undefined,
          totalWorkouts: stats.totalWorkouts,
          totalWeight: stats.totalWeight,
          totalSets: stats.totalSets,
          averageWeight:
            stats.totalWorkouts > 0
              ? Math.round(stats.totalWeight / stats.totalWorkouts)
              : 0,
          rank: 0, // Will be set after sorting
          isCurrentUser: profile.id === currentProfileId,
          isFollowing: followedIds.includes(profile.id),
        };
      },
    );

    // Sort by workouts first, then by total weight
    leaderboardEntries.sort((a, b) => {
      if (b.totalWorkouts !== a.totalWorkouts) {
        return b.totalWorkouts - a.totalWorkouts;
      }
      return b.totalWeight - a.totalWeight;
    });

    // Add rank numbers
    leaderboardEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return leaderboardEntries.slice(0, limit);
  } catch (err) {
    console.error('Unexpected error fetching friends leaderboard:', err);
    return [];
  }
}

// Get user's position in global leaderboard
export async function getUserGlobalRank(profileId: string): Promise<number> {
  try {
    const globalLeaderboard = await getGlobalLeaderboard(profileId, 1000);
    const userEntry = globalLeaderboard.find((entry) => entry.id === profileId);
    return userEntry?.rank || 0;
  } catch (err) {
    console.error('Error getting user global rank:', err);
    return 0;
  }
}
