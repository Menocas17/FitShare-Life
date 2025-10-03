"use server";
import { supabase } from "../supabase";

// Get all social posts with user profiles (for social feed)
export async function getSocialPosts(limit: number = 10, offset: number = 0) {
  try {
    const { data, error } = await supabase
      .from("social_posts")
      .select(
        `
        *,
        profiles:profile_id (
          id,
          user_id,
          user_name
        )
      `
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching social posts:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

// Get posts by specific user
export async function getUserPosts(profileId: string) {
  try {
    const { data, error } = await supabase
      .from("social_posts")
      .select(
        `
        *,
        profiles:profile_id (
          id,
          user_id,
          user_name
        )
      `
      )
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user posts:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

// Create a new social post
export async function createSocialPost(
  profileId: string,
  content: string,
  mediaUrl?: string
) {
  try {
    const { data, error } = await supabase
      .from("social_posts")
      .insert({
        profile_id: profileId,
        content,
        media_url: mediaUrl || null,
      })
      .select(
        `
        *,
        profiles:profile_id (
          id,
          user_id,
          user_name
        )
      `
      )
      .single();

    if (error) {
      console.error("Error creating social post:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}

// Delete a social post (only by the owner)
export async function deleteSocialPost(postId: string, profileId: string) {
  try {
    const { error } = await supabase
      .from("social_posts")
      .delete()
      .eq("id", postId)
      .eq("profile_id", profileId);

    if (error) {
      console.error("Error deleting social post:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
}

// Get total posts count for a user
export async function getUserPostsCount(profileId: string) {
  try {
    const { data, error } = await supabase
      .from("social_posts")
      .select("id")
      .eq("profile_id", profileId);

    if (error) {
      console.error("Error fetching user posts count:", error);
      return 0;
    }

    return data?.length || 0;
  } catch (err) {
    console.error("Unexpected error:", err);
    return 0;
  }
}
