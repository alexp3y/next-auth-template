'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

const Authenticated = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  useEffect(() => {
    if (!auth.initializing) {
      if (!auth.currentUser) {
        return redirect('/');
      }
    }
  }, [auth.initializing]);
  return auth.currentUser ? children : null;
};

export default Authenticated;
