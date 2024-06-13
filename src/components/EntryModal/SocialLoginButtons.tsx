import cn from 'classnames';
import Image from 'next/image';
import React from 'react';
import { useAuth } from '../AuthProvider';
import { LoadingSpinner } from '../LoadingSpinner';

interface Props {
  setError: (msg: string) => void;
  closeDialog: () => void;
}

const SocialLoginButtons: React.FC<Props> = ({ setError, closeDialog }) => {
  const auth = useAuth();

  const handleLoginWithGoogle = async () => {
    try {
      const user = await auth.logInWithGoogle();
      closeDialog();
    } catch (err: any) {
      console.error(err);
      setError('Unable to Authenticate');
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <button
        disabled={auth.loading}
        className={cn(
          'flex h-14 items-center justify-center gap-3 rounded-md border p-3 text-center',
          {
            'hover:bg-opacity-70 active:bg-opacity-100': !auth.loading,
          }
        )}
        onClick={handleLoginWithGoogle}
      >
        <Image
          src={'/images/google.png'}
          width={30}
          height={30}
          alt="Google Logo"
        />
        {auth.loading ? (
          <LoadingSpinner style="h-8 fill-platinum dark:fill-black dark:text-blue" />
        ) : (
          'Continue with Google'
        )}
      </button>
    </div>
  );
};

export default SocialLoginButtons;
