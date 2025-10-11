import { User, Calendar, Weight, Ruler, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { getOwnProfile, getUserInfo } from '@/lib/server_actions/social';
import Link from 'next/link';
import { Button } from '../ui/button';
import FriendsLeaderboard from '../leaderboard/FriendsLeaderboard';
import ProgressPhotos from "./progressPhotos";

interface BodyMeasurements {
  waist?: number | null;
  hips?: number | null;
  thighs?: number | null;
  chest?: number | null;
}

export default async function Profile({ session }: { session: string }) {
  const user = await getUserInfo(session);
  const profile = await getOwnProfile(user!.id);
  const followers = profile?.followers || [];
  const following = profile?.following || [];
  const bodyMeasurements: BodyMeasurements = profile?.body_measurements || {};
  const posts = profile?.social_posts || [];
  const followCounts = {
    followers: followers.length,
    following: following.length,
  };
  

  // console.log(profile);
  const isDefaultUser = /_[a-f0-9]{8}$/i.test(profile!.user_name as string);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <div className='flex flex-col gap-4'>
      {/* Profile Information Card */}
      <div className='bg-card border border-border rounded-lg p-4 sm:p-6'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4'>
          <div className='flex flex-col gap-4 min-w-0 flex-1'>
            <div className='flex items-center gap-5'>
              {user!.avatar ? (
                <Image
                  src={user!.avatar}
                  alt={profile!.user_name!}
                  width={100}
                  height={100}
                  className='w-20 h-20 rounded-full'
                />
              ) : (
                <div className='w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl'>
                  {profile!.user_name![0]}
                </div>
              )}

              <div className='min-w-0 flex-1'>
                <h2 className='text-xl sm:text-2xl font-bold truncate'>
                  {profile!.user_name || 'Anonymous User'}
                  {isDefaultUser && (
                    <span className='text-xs text-muted-foreground'>
                      {' '}
                      (Default user name)
                    </span>
                  )}
                </h2>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Calendar className='w-4 h-4 flex-shrink-0' />
                  <span className='text-xs sm:text-sm truncate'>
                    Joined {formatDate(profile!.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className='ml-3'>{profile!.bio || 'No bio available'}</p>
            </div>
          </div>
          <Link href={'/setting'}>
            <Button>Edit Profile</Button>
          </Link>
        </div>

        <div className='grid grid-cols-3 gap-3 sm:gap-4 text-center'>
          <div className='p-2 sm:p-3 bg-muted/50 rounded-lg'>
            <div className='font-bold text-lg sm:text-xl'>{posts.length}</div>
            <div className='text-xs sm:text-sm text-muted-foreground'>
              Posts
            </div>
          </div>
          <div className='p-2 sm:p-3 bg-muted/50 rounded-lg'>
            <div className='font-bold text-lg sm:text-xl'>
              {followCounts.followers}
            </div>
            <div className='text-xs sm:text-sm text-muted-foreground'>
              Followers
            </div>
          </div>
          <div className='p-2 sm:p-3 bg-muted/50 rounded-lg'>
            <div className='font-bold text-lg sm:text-xl'>
              {followCounts.following}
            </div>
            <div className='text-xs sm:text-sm text-muted-foreground'>
              Following
            </div>
          </div>
        </div>
      </div>

      <div className='bg-card border border-border rounded-lg p-4 sm:p-6'>
        <h3 className='text-lg font-semibold mb-4'>Physical Stats</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='flex items-center gap-3 p-3 border border-border rounded-lg'>
            <Weight className='w-5 h-5 text-green-600' />
            <div>
              <p className='text-sm text-muted-foreground'>Weight</p>
              <p className='font-semibold'>
                {profile!.weight ? `${profile!.weight} lbs` : 'Not set'}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 p-3 border border-border rounded-lg'>
            <Ruler className='w-5 h-5 text-blue-600' />
            <div>
              <p className='text-sm text-muted-foreground'>Height</p>
              <p className='font-semibold'>
                {profile!.height ? `${profile!.height}"` : 'Not set'}
              </p>
            </div>
          </div>
          {bodyMeasurements?.chest && (
            <div className='flex items-center gap-3 p-3 border border-border rounded-lg'>
              <Ruler className='w-5 h-5 text-purple-600' />
              <div>
                <p className='text-sm text-muted-foreground'>Chest</p>
                <p className='font-semibold'>{bodyMeasurements.chest}&quot;</p>
              </div>
            </div>
          )}
          {bodyMeasurements?.waist && (
            <div className='flex items-center gap-3 p-3 border border-border rounded-lg'>
              <Ruler className='w-5 h-5 text-orange-600' />
              <div>
                <p className='text-sm text-muted-foreground'>Waist</p>
                <p className='font-semibold'>{bodyMeasurements.waist}&quot;</p>
              </div>
            </div>
          )}
          {bodyMeasurements?.hips && (
            <div className='flex items-center gap-3 p-3 border border-border rounded-lg'>
              <Ruler className='w-5 h-5 text-orange-600' />
              <div>
                <p className='text-sm text-muted-foreground'>Hips</p>
                <p className='font-semibold'>{bodyMeasurements.hips}&quot;</p>
              </div>
            </div>
          )}
          {bodyMeasurements?.thighs && (
            <div className='flex items-center gap-3 p-3 border border-border rounded-lg'>
              <Ruler className='w-5 h-5 text-red-600' />
              <div>
                <p className='text-sm text-muted-foreground'>Thighs</p>
                <p className='font-semibold'>{bodyMeasurements.thighs}&quot;</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/**Progress photo section */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <ProgressPhotos profileId={profile!.id}/>
      </div>

      <div className='bg-card border border-border rounded-lg'>
        <div className='p-4 border-b border-border flex items-center justify-between'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <MessageSquare className='w-5 h-5' />
            My posts
            <span className='text-sm text-muted-foreground'>
              ({posts.length})
            </span>
          </h3>
          <Link href={'/dashboard'}>
            <Button>Create Post</Button>
          </Link>
        </div>

        <div className='h-96 overflow-y-auto'>
          {posts.length > 0 ? (
            <div className='space-y-4 p-4'>
              {posts.map((post) => (
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
                          {profile!.user_name || 'Anonymous User'}
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
              <p className='text-muted-foreground'>You have no posts yet</p>
              <p className='text-sm text-muted-foreground'>
                Share your workout achievements!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Friends Leaderboard */}
      <FriendsLeaderboard currentProfileId={profile!.id} />
    </div>
  );
}
