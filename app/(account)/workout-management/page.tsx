import React from 'react';
import WorkoutManagement from '@/components/workout/WorkoutManagement';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserInfo, getProfileInfo } from '@/lib/server_actions/social';

export default async function Page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken');

  if (!sessionToken) {
    redirect('/login');
  }

  const userInfo = await getUserInfo(sessionToken.value);
  const profileInfo = await getProfileInfo(userInfo!.id);

  return <WorkoutManagement UserProfile={profileInfo} />;
}
