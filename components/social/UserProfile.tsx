'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  User,
  Calendar,
  Weight,
  Ruler,
  MessageSquare,
  ArrowLeft,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import {
  getUserProfileById,
  isFollowing,
  followUser,
  unfollowUser,
  getUserFollowCounts,
} from '@/lib/server_actions/user_search';
import { getUserPosts } from '@/lib/server_actions/social';
import { UserProfile as UserProfileType, SocialPost } from '@/types/types';
import { Json } from '@/types/supabase';
import LoadingSpinner from '@/components/ui-kit/LoadingSpinner';
import { Button } from '../ui/button';

interface UserInfo {
  userInfo: {
    id: string;
    user_id: string;
    user_name: string | null;
    bio: string | null;
    created_at: string;
    users: {
      avatar: string | null;
      name: string | null;
    };
  } | null;
  userFollowers: {
    followers: number;
    following: number;
  };
}

interface userPosts {
  content: string;
  created_at: string;
  id: string;
  media_url: string | null;
  profile_id: string;
  profiles: {
    id: string;
    user_id: string;
    user_name: string | null;
  };
}

export default function UserProfile({
  user,
  userPosts,
}: {
  user: UserInfo;
  userPosts: userPosts[];
}) {
  // const [isFollowingUser, setIsFollowingUser] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [followLoading, setFollowLoading] = useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle follow/unfollow
  // const handleFollowToggle = async () => {
  //   if (followLoading) return;

  //   setFollowLoading(true);
  //   try {
  //     let success = false;

  //     if (isFollowingUser) {
  //       success = await unfollowUser(currentProfileId, profileId);
  //       if (success) {
  //         setIsFollowingUser(false);
  //         setFollowCounts((prev) => ({
  //           ...prev,
  //           followers: prev.followers - 1,
  //         }));
  //       }
  //     } else {
  //       success = await followUser(currentProfileId, profileId);
  //       if (success) {
  //         setIsFollowingUser(true);
  //         setFollowCounts((prev) => ({
  //           ...prev,
  //           followers: prev.followers + 1,
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error toggling follow:', error);
  //   } finally {
  //     setFollowLoading(false);
  //   }
  // };

  // if (loading) {
  //   return <LoadingSpinner text='Loading Profile' />;
  // }

  return (
    <div className='space-y-4 sm:space-y-6 px-1 sm:px-0'>
      {/* Header with Back Button */}
      {/* <div className='flex items-center gap-4'>
        <button
          onClick={onBack}
          className='p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0'
        >
          <ArrowLeft className='w-5 h-5' />
        </button>
        <div className='min-w-0 flex-1'>
          <h1 className='text-2xl sm:text-3xl font-bold'>User Profile</h1>
          <p className='text-muted-foreground text-sm sm:text-base'>
            View user details and posts
          </p>
        </div>
      </div> */}

      {/* Profile Information Card */}
      <div className=' p-4 sm:p-6'>
        <div className='flex  flex-col mb-6 gap-4'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div>
              <div className='flex items-center gap-4 min-w-0 flex-1'>
                {user.userInfo?.users.avatar ? (
                  <Image
                    src={user.userInfo.users!.avatar}
                    alt={user.userInfo.user_name!}
                    width={100}
                    height={100}
                    className='w-20 h-20 rounded-full'
                  />
                ) : (
                  <div className='w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl'>
                    {user.userInfo?.user_name![0]}
                  </div>
                )}

                <div className='min-w-0 flex-1'>
                  <h2 className='text-xl sm:text-2xl font-bold truncate'>
                    {user.userInfo?.user_name || 'Anonymous User'}
                  </h2>
                  <p className='text-muted-foreground'>
                    {user.userInfo?.users.name}
                  </p>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Calendar className='w-4 h-4 flex-shrink-0' />
                    <span className='text-xs sm:text-sm truncate'>
                      Joined {formatDate(user.userInfo?.created_at as string)}
                    </span>
                  </div>
                </div>
              </div>

              <p className='font-light m-4'>{user.userInfo?.bio}</p>
            </div>

            <Button className='md:w-40'>Follow</Button>
          </div>

          {/* Statistics */}
          <div className='grid grid-cols-3 gap-3 sm:gap-4 text-center'>
            <div className='p-2 sm:p-3 bg-muted/50 rounded-lg'>
              <div className='font-bold text-lg sm:text-xl'>
                {userPosts.length}
              </div>
              <div className='text-xs sm:text-sm text-muted-foreground'>
                Posts
              </div>
            </div>
            <div className='p-2 sm:p-3 bg-muted/50 rounded-lg'>
              <div className='font-bold text-lg sm:text-xl'>
                {user.userFollowers.followers}
              </div>
              <div className='text-xs sm:text-sm text-muted-foreground'>
                Followers
              </div>
            </div>
            <div className='p-2 sm:p-3 bg-muted/50 rounded-lg'>
              <div className='font-bold text-lg sm:text-xl'>
                {user.userFollowers.following}
              </div>
              <div className='text-xs sm:text-sm text-muted-foreground'>
                Following
              </div>
            </div>
          </div>
        </div>

        {/* User Posts Card */}
        <div className='bg-card border-t-2'>
          <div className='p-4 border-b '>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <MessageSquare className='w-5 h-5' />
              {`${user.userInfo?.user_name}'s Posts`}
            </h3>
          </div>

          <div className=''>
            {userPosts.length > 0 ? (
              <div className='space-y-4 p-4'>
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className='border border-border rounded-lg p-4'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                        <User className='w-5 h-5 text-primary' />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <span className='font-medium'>
                            {user.userInfo?.user_name || 'Anonymous User'}
                          </span>
                          <span className='text-sm text-muted-foreground'>
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                        <p className='text-foreground whitespace-pre-wrap'>
                          {post.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-center p-8'>
                <MessageSquare className='w-12 h-12 text-gray-400 mb-3' />
                <p className='text-muted-foreground'>No posts yet</p>
                <p className='text-sm text-muted-foreground'>
                  Check back later for updates
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
