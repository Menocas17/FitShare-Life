import FriendsLeaderboard from '@/components/leaderboard/FriendsLeaderboard';
import GlobalLeaderboard from '@/components/leaderboard/GlobalLeaderboard';
import {
  getGlobalLeaderboard,
  getFriendsLeaderboard,
} from '@/lib/server_actions/leaderboard';
import { getUserAndProfileIds } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Leaderboard() {
  const user = await getUserAndProfileIds();

  if (!user) {
    redirect('/login');
  }

  const gloabalData = await getGlobalLeaderboard(user.profileId, 50);
  const friendsData = await getFriendsLeaderboard(user.profileId, 20);

  return (
    <>
      <GlobalLeaderboard globalData={gloabalData} />
      <FriendsLeaderboard friendsData={friendsData} />
    </>
  );
}
