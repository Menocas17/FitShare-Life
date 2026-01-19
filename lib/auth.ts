import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

const COOKIE_NAME = 'sessionToken';

type UserSession = {
  userId: string;
  profileId: string;
};

export async function getUserAndProfileIds(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const { data: user, error } = await supabase
    .from('users')
    .select('id, profiles(id)')
    .eq('session_token', token)
    .single();

  if (error || !user) {
    console.warn('Session invalird or DB error', error?.message);
    return null;
  }

  const profileData = Array.isArray(user.profiles)
    ? user.profiles[0]
    : user.profiles;

  return {
    userId: user.id,
    profileId: profileData?.id,
  };
}
