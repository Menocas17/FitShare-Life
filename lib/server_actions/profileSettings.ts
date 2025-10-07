'use server';
import { supabase } from '../supabase';

//this function will get all  the data from the profile
export async function getFullProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`*`)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching profile:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

//this function update the entire profile settings of the user
export async function updateProfile(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const user_id = data.user_id as string;
  const name = data.name as string;
  const user_name = data.user_name as string;
  const bio = data.bio as string;

  const height = data.height ? Number(data.height) : null;
  const weight = data.weight ? Number(data.weight) : null;
  const weight_goal = data.weight_goal ? Number(data.weight_goal) : null;
  const chest = data.chest ? Number(data.chest) : null;
  const waist = data.waist ? Number(data.waist) : null;
  const hips = data.hips ? Number(data.hips) : null;
  const thighs = data.thighs ? Number(data.thighs) : null;

  try {
    // update the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        user_name,
        bio,
        height,
        weight,
        weight_goal,
        body_measurements: {
          chest,
          waist,
          hips,
          thighs,
        },
      })
      .eq('user_id', user_id);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return { success: false, message: profileError.message };
    }

    // update the name in users
    const { error: userError } = await supabase
      .from('users')
      .update({ name })
      .eq('id', user_id);

    if (userError) {
      console.error('Error updating user:', userError);
      return { success: false, message: userError.message };
    }

    return { success: true, message: 'Profile updated successfully!' };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, message: 'Unexpected error occurred.' };
  }
}
