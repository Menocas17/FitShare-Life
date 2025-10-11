'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { getFullProfile } from '@/lib/server_actions/profileSettings';
import type { Tables } from '@/types/supabase';
import { Button } from '../ui/button';
import { updateProfile } from '@/lib/server_actions/profileSettings';
import ProfileSettingSkeleton from './profile-setting-skeleton';

type user = Tables<'users'>;
type profileSettings = Tables<'profiles'>;

export default function ProfileSettings() {
  const router = useRouter();

  const [user, setUser] = useState<user | null>(null);

  const [profileSettings, setProfileSettings] =
    useState<profileSettings | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // get user session
        const res = await fetch('/api/sessions');
        const data = await res.json();
        if (!data.user) {
          router.push('/login');
          return;
        }

        setUser(data.user);
        const profileArr = await getFullProfile(data.user.id);
        if (profileArr && profileArr.length > 0) {
          setProfileSettings(profileArr[0]);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <>
      {/* Profile Settings */}
      <div className='p-6 bg-card border border-border rounded-lg'>
        <div className='flex items-center gap-2 mb-4'>
          <User className='w-5 h-5 text-primary' />
          <h3 className='text-lg font-semibold'>Profile Settings</h3>
        </div>
        <div className='space-y-4'>
          {!user || !profileSettings ? (
            <ProfileSettingSkeleton />
          ) : (
            <form
              action={async (formData) => {
                const result = await updateProfile(formData);
                if (result?.success) {
                  window.location.reload();
                } else {
                  alert(`Error: ${result?.message}`);
                }
              }}
            >
              <input name='user_id' type='hidden' defaultValue={user?.id} />

              <div className='mt-4 mb-5'>
                <label className='block text-sm font-medium mb-2'>
                  Update Profile Image
                </label>
                <input
                  type='file'
                  accept='image/*'
                  name='avatar'
                  className='w-full lg:w-3/5 p-2 border border-border rounded-md bg-background'
                />
              </div>

              <label className='block text-sm font-medium mb-2'>
                Display Name
              </label>
              <input
                type='text'
                placeholder='Your display name'
                className='w-full lg:w-3/5  p-2 border border-border rounded-md bg-background'
                defaultValue={user?.name || ''}
                name='name'
              />

              <label className='block text-sm font-medium mb-2 mt-4'>
                User name
              </label>
              <input
                type='text'
                placeholder='Please enter a @usename'
                className='w-full lg:w-3/5  p-2 border border-border rounded-md bg-background'
                defaultValue={profileSettings?.user_name || ''}
                name='user_name'
              />

              <label className='block text-sm font-medium mb-2 mt-4'>Bio</label>
              <textarea
                placeholder='Tell us about yourself'
                className='w-full lg:w-3/5 p-2 border border-border rounded-md bg-background h-20'
                defaultValue={profileSettings?.bio || ''}
                name='bio'
              />

              <label className='block text-sm font-medium mb-2 mt-4'>
                My Height
              </label>
              <input
                type='number'
                placeholder='Your height in cm'
                className='w-full lg:w-3/5  p-2 border border-border rounded-md bg-background'
                defaultValue={profileSettings?.height || ''}
                name='height'
              />

              <label className='block text-sm font-medium mb-2 mt-4'>
                My current Weight
              </label>
              <input
                type='text'
                placeholder='Your current weight in kg'
                className='w-full lg:w-3/5  p-2 border border-border rounded-md bg-background'
                defaultValue={profileSettings?.weight || ''}
                name='weight'
              />

              <label className='block text-sm font-medium mb-2 mt-4'>
                My goal Weight
              </label>
              <input
                type='text'
                placeholder='Your goal weight in kg'
                className='w-full lg:w-3/5  p-2 border border-border rounded-md bg-background'
                defaultValue={profileSettings?.weight_goal || ''}
                name='weight_goal'
              />

              <div>
                <h4 className='mt-6 font-bold'>Body Measurements: </h4>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Chest
                    </label>
                    <input
                      type='number'
                      placeholder='Your chest size in cm'
                      className='w-full p-2 border border-border rounded-md bg-background'
                      defaultValue={
                        profileSettings?.body_measurements?.chest || ''
                      }
                      name='chest'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Waist
                    </label>
                    <input
                      type='number'
                      placeholder='Your waist size in cm'
                      className='w-full p-2 border border-border rounded-md bg-background'
                      defaultValue={
                        profileSettings?.body_measurements?.waist || ''
                      }
                      name='waist'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Hips
                    </label>
                    <input
                      type='number'
                      placeholder='Your hips size in cm'
                      className='w-full p-2 border border-border rounded-md bg-background'
                      defaultValue={
                        profileSettings?.body_measurements?.hips || ''
                      }
                      name='hips'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Thighs
                    </label>
                    <input
                      type='number'
                      placeholder='Your thighs size in cm'
                      className='w-full p-2 border border-border rounded-md bg-background'
                      defaultValue={
                        profileSettings?.body_measurements?.thighs || ''
                      }
                      name='thighs'
                    />
                  </div>
                </div>
              </div>
              <Button type='submit' className='mt-8'>
                Save Changes
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
