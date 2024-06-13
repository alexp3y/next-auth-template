'use client';

import { auth, googleAuthProvider } from '@/lib/firebase';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateCurrentUser,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

interface IAuthContext {
  currentUser: User | null;
  signUpWithPassowrd: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    termsAgree: boolean
  ) => Promise<User>;
  logInWithPassword: (email: string, password: string) => Promise<User>;
  logInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  initializing: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.authStateReady().finally(() => {
      setInitializing(false);
    });
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('auth state changed');
      setCurrentUser(currentUser);
      if (!currentUser) {
        router.push('/');
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logInWithPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } finally {
      setLoading(false);
    }
  };

  const logInWithGoogle = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleAuthProvider);
      return cred.user;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithPassowrd = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    termsAgree: boolean
  ) => {
    setLoading(true);
    try {
      if (!firstName || !lastName || !email || !password || !termsAgree) {
        throw new Error('Required field(s) missing');
      }
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      return cred.user;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    auth.signOut();
  };

  const value = {
    currentUser,
    signUpWithPassowrd,
    logInWithPassword,
    logInWithGoogle,
    signOut,
    loading,
    initializing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
