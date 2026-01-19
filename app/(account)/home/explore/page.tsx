import PostCreation from '@/components/social/PostCreation';
import { getSocialPosts } from '@/lib/server_actions/social';
import SocialFeed from '@/components/social/SocialFeed';
import ExploreDisplay from '@/components/social/ExploreDisplay';
import { getUserAndProfileIds } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ExplorePage() {
  const initialPosts = await getSocialPosts(null);
  const user = await getUserAndProfileIds();

  if (!user) {
    redirect('/login');
  }

  return (
    <ExploreDisplay>
      {/* //TODO - I need to make this page reload when the user created a new post */}
      <PostCreation profile_id={user.profileId} />
      <SocialFeed initialPosts={initialPosts} />
    </ExploreDisplay>
  );
}
