import Profile from '@/components/social/Profile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyProfilePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken');

  if (!sessionToken) {
    redirect('/login');
  }

  return <Profile session={sessionToken.value} />;
}
