'use client';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState(true);
  return (
    <>
      {/* Notification Settings */}
      <div className='p-6 bg-card border border-border rounded-lg'>
        <div className='flex items-center gap-2 mb-4'>
          <Bell className='w-5 h-5 text-primary' />
          <h3 className='text-lg font-semibold'>Notifications</h3>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-medium'>Workout Reminders</p>
              <p className='text-sm text-muted-foreground'>
                Get reminded about your scheduled workouts
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className='sr-only peer'
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
