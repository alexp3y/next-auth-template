'use client';
import React from 'react';
import { useAuth } from '../AuthProvider';

const ProfileDashboard: React.FC = () => {
  const auth = useAuth();

  return (
    <div className="w-full h-full flex flex-col">
      Profile
      <span>{auth.currentUser?.email!}</span>
    </div>
  );
};

export default ProfileDashboard;
