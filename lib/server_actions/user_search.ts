'use server';
import { supabase } from '../supabase';

// Search users by username
export async function searchUsersByUsername(username: string) {
  try {
    if (!username.trim()) {
      return [];
    }

    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        id,
        user_id,
        user_name,
        users (
          avatar,
          name
        )
      `
      )
      .ilike('user_name', `%${username}%`)
      .limit(10);

    if (error) {
      console.error('Error searching users:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

// Get user profile by ID
export async function getUserProfileById(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        id,
        user_id,
        user_name,
        weight,
        weight_goal,
        height,
        bio,
        body_measurements,
        created_at,
        users (
          avatar
        )
      `
      )
      .eq('id', profileId)
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

// Check if user is following another user
export async function isFollowing(followerId: string, followingId: string) {
  try {
    const { data, error } = await supabase
      .from('social_connections')
      .select('id')
      .eq('follower_id', followerId)
      .eq('followed_id', followingId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking follow status:', error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Follow a user
export async function followUser(followerId: string, followingId: string) {
  try {
    const { error } = await supabase.from('social_connections').insert({
      follower_id: followerId,
      followed_id: followingId,
    });

    if (error) {
      console.error('Error following user:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Unfollow a user
export async function unfollowUser(followerId: string, followingId: string) {
  try {
    const { error } = await supabase
      .from('social_connections')
      .delete()
      .eq('follower_id', followerId)
      .eq('followed_id', followingId);

    if (error) {
      console.error('Error unfollowing user:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Get follower/following counts
export async function getUserFollowCounts(profileId: string) {
  try {
    const [followersResult, followingResult] = await Promise.all([
      supabase
        .from('social_connections')
        .select('id')
        .eq('followed_id', profileId),
      supabase
        .from('social_connections')
        .select('id')
        .eq('follower_id', profileId),
    ]);

    const followers = followersResult.data?.length || 0;
    const following = followingResult.data?.length || 0;

    return { followers, following };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { followers: 0, following: 0 };
  }
}
