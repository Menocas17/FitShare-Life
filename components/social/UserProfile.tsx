"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Weight,
  Ruler,
  MessageSquare,
  ArrowLeft,
  UserPlus,
  UserMinus,
} from "lucide-react";
import {
  getUserProfileById,
  isFollowing,
  followUser,
  unfollowUser,
  getUserFollowCounts,
} from "@/lib/server_actions/user_search";
import { getUserPosts } from "@/lib/server_actions/social";
import { UserProfile as UserProfileType, SocialPost } from "@/types/types";
import { Json } from "@/types/supabase";
import LoadingSpinner from "@/components/ui-kit/LoadingSpinner";

interface UserProfileProps {
  profileId: string;
  currentProfileId: string;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  profileId,
  currentProfileId,
  onBack,
}) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  // Helper function to parse body measurements
  const parseBodyMeasurements = (measurements: Json | null) => {
    if (!measurements || typeof measurements !== "object") return null;
    return measurements as {
      chest?: number;
      waist?: number;
      hips?: number;
      bicep?: number;
      thigh?: number;
    };
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const [profileData, postsData, followData, followingStatus] =
          await Promise.all([
            getUserProfileById(profileId),
            getUserPosts(profileId),
            getUserFollowCounts(profileId),
            isFollowing(currentProfileId, profileId),
          ]);

        setProfile(profileData);
        setPosts(postsData);
        setFollowCounts(followData);
        setIsFollowingUser(followingStatus);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [profileId, currentProfileId]);

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (followLoading) return;

    setFollowLoading(true);
    try {
      let success = false;

      if (isFollowingUser) {
        success = await unfollowUser(currentProfileId, profileId);
        if (success) {
          setIsFollowingUser(false);
          setFollowCounts((prev) => ({
            ...prev,
            followers: prev.followers - 1,
          }));
        }
      } else {
        success = await followUser(currentProfileId, profileId);
        if (success) {
          setIsFollowingUser(true);
          setFollowCounts((prev) => ({
            ...prev,
            followers: prev.followers + 1,
          }));
        }
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-muted-foreground">User not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const bodyMeasurements = parseBodyMeasurements(profile.body_measurements);
  const isOwnProfile = currentProfileId === profileId;

  return (
    <div className="space-y-4 sm:space-y-6 px-1 sm:px-0">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">User Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            View user details and posts
          </p>
        </div>
      </div>

      {/* Profile Information Card */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold truncate">
                {profile.user_name || "Anonymous User"}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">
                  Joined {formatDate(profile.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          {!isOwnProfile && (
            <button
              onClick={handleFollowToggle}
              disabled={followLoading}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm whitespace-nowrap ${
                isFollowingUser
                  ? "bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              } ${followLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {followLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isFollowingUser ? (
                <UserMinus className="w-4 h-4" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {isFollowingUser ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="font-bold text-lg sm:text-xl">{posts.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Posts
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="font-bold text-lg sm:text-xl">
              {followCounts.followers}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Followers
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="font-bold text-lg sm:text-xl">
              {followCounts.following}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Following
            </div>
          </div>
        </div>
      </div>

      {/* Physical Stats */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Physical Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
            <Weight className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-semibold">
                {profile.weight ? `${profile.weight} lbs` : "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
            <Ruler className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-semibold">
                {profile.height ? `${profile.height}"` : "Not set"}
              </p>
            </div>
          </div>
          {bodyMeasurements?.chest && (
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <Ruler className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Chest</p>
                <p className="font-semibold">{bodyMeasurements.chest}&quot;</p>
              </div>
            </div>
          )}
          {bodyMeasurements?.waist && (
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <Ruler className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Waist</p>
                <p className="font-semibold">{bodyMeasurements.waist}&quot;</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Posts Card */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {isOwnProfile
              ? "My Posts"
              : `${profile.user_name || "User"}'s Posts`}
            <span className="text-sm text-muted-foreground">
              ({posts.length})
            </span>
          </h3>
        </div>

        <div className="h-96 overflow-y-auto">
          {posts.length > 0 ? (
            <div className="space-y-4 p-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">
                          {profile.user_name || "Anonymous User"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <p className="text-foreground whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-muted-foreground">
                {isOwnProfile
                  ? "You haven't posted anything yet"
                  : "No posts yet"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isOwnProfile
                  ? "Share your first workout achievement!"
                  : "Check back later for updates"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
