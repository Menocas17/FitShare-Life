import ProfileSettings from '@/components/settings/profile-settings';
import NotificationSettings from '@/components/settings/notification-settins';
import PrivacySettings from '@/components/settings/privacy-settings';
import AppearanceSettings from '@/components/settings/appearance-settings';

const SettingsPage = () => {
  return (
    <>
      <h2 className='text-2xl font-semibold mb-6'>Settings</h2>

      <div className='space-y-6'>
        <ProfileSettings />
        <NotificationSettings />
        <PrivacySettings />
        <AppearanceSettings />
      </div>
    </>
  );
};

export default SettingsPage;
