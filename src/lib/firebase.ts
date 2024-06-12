import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  connectAuthEmulator,
  getAuth,
} from 'firebase/auth';

const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const createFirebaseApp = (config: FirebaseOptions) => {
  console.log('initializing firebase');
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
};

export const firebaseApp = createFirebaseApp(firebaseOptions);

export const auth = getAuth(firebaseApp);
auth.languageCode = 'en';
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  console.log('connected to auth emulator');
}
export const googleAuthProvider = new GoogleAuthProvider();
