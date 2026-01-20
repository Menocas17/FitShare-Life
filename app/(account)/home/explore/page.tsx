import PostCreation from '@/components/social/PostCreation';
import { getSocialPosts } from '@/lib/server_actions/social';
import SocialFeed from '@/components/social/SocialFeed';
import ExploreDisplay from '@/components/social/ExploreDisplay';
import { getUserAndProfileIds } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ExplorePage() {
  const initialPosts = await getSocialPosts(null);
  const user = await getUserAndProfileIds();
  console.log(user);

  if (!user) {
    redirect('/login');
  }

  //TODO - Implement a loading.tsx with an skeleton to improve the UX
  return (
    <ExploreDisplay loggedProfile={user.profileId}>
      <PostCreation profile_id={user.profileId} />
      <SocialFeed initialPosts={initialPosts} />
    </ExploreDisplay>
  );
}
