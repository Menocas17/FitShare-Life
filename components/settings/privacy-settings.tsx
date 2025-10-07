import { Shield } from 'lucide-react';
export default function PrivacySettings() {
  return (
    <>
      {/* Privacy Settings */}
      <div className='p-6 bg-card border border-border rounded-lg'>
        <div className='flex items-center gap-2 mb-4'>
          <Shield className='w-5 h-5 text-primary' />
          <h3 className='text-lg font-semibold'>Privacy & Security</h3>
        </div>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>
              Change Password
            </label>
            <div className='space-y-2'>
              <input
                type='password'
                placeholder='Current password'
                className='w-full p-2 border border-border rounded-md bg-background'
              />
              <input
                type='password'
                placeholder='New password'
                className='w-full p-2 border border-border rounded-md bg-background'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
