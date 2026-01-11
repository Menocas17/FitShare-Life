import PostCreation from '@/components/social/PostCreation';
import { getSocialPosts } from '@/lib/server_actions/social';
import SocialFeed from '@/components/social/SocialFeed';
import ExploreDisplay from '@/components/social/ExploreDisplay';

export default async function ExplorePage() {
  const initialPosts = await getSocialPosts(null);

  return (
    <ExploreDisplay>
      <PostCreation profile_id='6d80879f-4c62-4e84-9ce6-e17bb0bc3bad' />
      <SocialFeed initialPosts={initialPosts} />
    </ExploreDisplay>
  );
}
