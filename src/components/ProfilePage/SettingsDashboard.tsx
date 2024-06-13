'use client';
import React from 'react';
import { useAuth } from '../AuthProvider';

const SettingsDashboard: React.FC = () => {
  const auth = useAuth();

  return <div className="w-full h-full">Settings</div>;
};

export default SettingsDashboard;
