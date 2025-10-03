"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Send,
  User,
  Calendar,
  Trash2,
} from "lucide-react";
import {
  getSocialPosts,
  getUserPosts,
  createSocialPost,
  deleteSocialPost,
} from "@/lib/server_actions/social";
import { SocialPost } from "@/types/types";

interface SocialFeedProps {
  currentUserId: string;
  currentProfileId: string;
  showUserPostsOnly?: boolean;
  hideCreateForm?: boolean;
  onPostCreated?: () => void;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  currentProfileId,
  showUserPostsOnly = false,
  hideCreateForm = false,
  onPostCreated,
}) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [creatingPost, setCreatingPost] = useState(false);

  // Debug logging
  //   console.log("SocialFeed rendered with:", {
  //     currentProfileId,
  //     showUserPostsOnly,
  //     showCreatePost,
  //     postsCount: posts.length,
  //     loading,
  //   });

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const postsData = showUserPostsOnly
        ? await getUserPosts(currentProfileId)
        : await getSocialPosts(20);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [currentProfileId, showUserPostsOnly]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handle create post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || creatingPost) return;

    setCreatingPost(true);
    try {
      const newPost = await createSocialPost(currentProfileId, newPostContent);
      if (newPost) {
        setPosts([newPost, ...posts]);
        setNewPostContent("");
        setShowCreatePost(false);
        // Trigger callback to update post count in parent component
        onPostCreated?.();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setCreatingPost(false);
    }
  };

  // Handle delete post
  const handleDeletePost = async (postId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    const success = await deleteSocialPost(postId, currentProfileId);
    if (success) {
      setPosts(posts.filter((post) => post.id !== postId));
      // Trigger callback to update post count in parent component
      onPostCreated?.();
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-lg p-6 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="space-y-1">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-16 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Post Section - Only show when not hiding create form */}
      {!hideCreateForm && (
        <div className="bg-card border-2 border-primary/20 rounded-lg p-6 shadow-sm">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-foreground">
              Create New Post
            </h3>
            <p className="text-sm text-muted-foreground">
              Share your workout achievements with the community
            </p>
          </div>
          {!showCreatePost ? (
            <button
              onClick={() => setShowCreatePost(true)}
              className="w-full lg:w-auto flex items-center gap-1 p-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">
                Share workout progress...
              </span>
            </button>
          ) : (
            <form onSubmit={handleCreatePost} className="space-y-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your workout achievements, tips, or motivation..."
                className="w-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {newPostContent.length}/500 characters
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreatePost(false);
                      setNewPostContent("");
                    }}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newPostContent.trim() || creatingPost}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {creatingPost ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {showUserPostsOnly ? "No posts yet" : "No posts in your feed yet"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {showUserPostsOnly
                ? "Share your first workout achievement!"
                : "Follow other users or create your first post to get started"}
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {post.profiles?.user_name || "Anonymous"}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>
                {post.profile_id === currentProfileId && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
                {post.media_url && (
                  <div className="mt-4">
                    <Image
                      src={post.media_url}
                      alt="Post media"
                      width={600}
                      height={400}
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialFeed;
