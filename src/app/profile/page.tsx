'use client';
import Authenticated from '@/components/Authenticated';
import ProfileDashboard from '@/components/ProfilePage/ProfileDashboard';
import SettingsDashboard from '@/components/ProfilePage/SettingsDashboard';
import { useState } from 'react';

enum UserDashboard {
  PROFILE_DASHBOARD,
  SETTINGS_DASHBOARD,
  ADMIN_DASHBOARD,
}

export default function Profile() {
  const [dashboard, setDashboard] = useState(UserDashboard.PROFILE_DASHBOARD);

  const getDashboard = () => {
    switch (dashboard) {
      case UserDashboard.PROFILE_DASHBOARD:
        return <ProfileDashboard />;
      case UserDashboard.SETTINGS_DASHBOARD:
        return <SettingsDashboard />;
      default:
        break;
    }
  };

  return (
    <Authenticated>
      <main className="w-screen h-screen flex justify-center items-centr pt-[76px] p-4">
        <div className="w-full md:w-4/5 h-full bg-moonstone dark:bg-charcoal rounded-lg p-3 flex gap-x-3">
          <div className="min-w-[240px] max-w-[280px] h-fit rounded-lg gap-y-3 flex flex-col items-center">
            <button
              className="w-full h-12 rounded-full bg-blue text-black"
              onClick={() => setDashboard(UserDashboard.PROFILE_DASHBOARD)}
            >
              Profile
            </button>
            <button
              className="w-full h-12 rounded-full bg-blue text-black"
              onClick={() => setDashboard(UserDashboard.SETTINGS_DASHBOARD)}
            >
              Settings
            </button>
          </div>
          <div className="flex flex-grow h-full bg-platinum dark:bg-black rounded-lg p-8">
            {getDashboard()}
          </div>
        </div>
      </main>
    </Authenticated>
  );
}
