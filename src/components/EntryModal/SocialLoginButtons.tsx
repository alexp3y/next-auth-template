import { auth, googleAuthProvider } from '@/lib/firebase';
import cn from 'classnames';
import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import React from 'react';

interface Props {
  loading: boolean;
}

const SocialLoginButtons: React.FC<Props> = ({ loading }) => {
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleAuthProvider);
    console.log(`User Created via Social Lnk: ` + cred);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <button
        disabled={loading}
        className={cn(
          'flex h-14 items-center justify-center gap-3 rounded-md border border-secondary-dark-20 p-3 text-center',
          {
            'hover:bg-secondary hover:bg-opacity-70 active:bg-opacity-100':
              !loading,
          }
        )}
        onClick={loginWithGoogle}
      >
        <Image
          src={'/images/google.png'}
          width={30}
          height={30}
          alt="Google Logo"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLoginButtons;
