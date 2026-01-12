import { getUserInfoByProfileId } from '@/lib/server_actions/user_search';
import { getUserPosts } from '@/lib/server_actions/social';
import UserProfile from '@/components/social/UserProfile';

interface PageProps {
  params: { id: string };
}

export default async function userProfilePage({ params }: PageProps) {
  const { id } = params;

  const userInfo = await getUserInfoByProfileId(id);
  const userPosts = await getUserPosts(id);
  console.log(userInfo, userPosts);

  return <UserProfile user={userInfo} userPosts={userPosts}></UserProfile>;
}
