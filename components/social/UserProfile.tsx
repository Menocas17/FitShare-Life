import Image from 'next/image';
import { User, Calendar, MessageSquare } from 'lucide-react';
import { isFollowing } from '@/lib/server_actions/user_search';

import { UserInfo, userPosts } from '@/types/types';
import FollowButton from './FollowUserButton';

export default async function UserProfile({
  user,
  userPosts,
  loggedProfileId,
}: {
  user: UserInfo;
  userPosts: userPosts[];
  loggedProfileId: string | undefined;
}) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  //check if the logged user is following the user results

  const targetUserId = user.userInfo?.id;

  const isFollowed =
    loggedProfileId && targetUserId
      ? await isFollowing(loggedProfileId, targetUserId)
      : false;

  //handle the follow and unfollow action

  return (
    <div className='space-y-4 sm:space-y-6 px-1 sm:px-0'>
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

            <FollowButton
              loggedProfileId={loggedProfileId}
              targetUserId={targetUserId}
              isFollowing={isFollowed}
            />
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
