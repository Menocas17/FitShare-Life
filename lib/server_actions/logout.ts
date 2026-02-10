'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'sessionToken';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);

  redirect('/login');
}
