import { getUserInfoByProfileId } from '@/lib/server_actions/user_search';
import { getUserPosts } from '@/lib/server_actions/social';
import UserProfile from '@/components/social/UserProfile';
import { getUserAndProfileIds } from '@/lib/auth';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function userProfilePage({ params }: PageProps) {
  const { id } = await params;

  const userInfo = await getUserInfoByProfileId(id);
  const userPosts = await getUserPosts(id);
  const loggedUser = await getUserAndProfileIds();
  console.log(userInfo, userPosts, loggedUser);

  return (
    <UserProfile
      user={userInfo}
      userPosts={userPosts}
      loggedProfileId={loggedUser?.profileId}
    ></UserProfile>
  );
}
