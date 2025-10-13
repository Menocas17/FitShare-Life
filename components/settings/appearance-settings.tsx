'use client';
import { useState } from 'react';
import { Palette } from 'lucide-react';

export default function AppearanceSettings() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      {/* Appearance Settings */}
      <div className='p-6 bg-card border border-border rounded-lg'>
        <div className='flex items-center gap-2 mb-4'>
          <Palette className='w-5 h-5 text-primary' />
          <h3 className='text-lg font-semibold'>Appearance</h3>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-medium'>Dark Mode</p>
              <p className='text-sm text-muted-foreground'>
                Switch to dark theme
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
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
