import { supabase } from './supabase';

export async function getUserProfile(userId: string | undefined) {
  if (!userId) return console.error('The id provided is not working');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
