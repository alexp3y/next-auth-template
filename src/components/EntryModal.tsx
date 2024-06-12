'use client';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import SignUpForm from './EntryModal/SignUpForm';
import LoginForm from './EntryModal/LoginForm';

interface Props {
  isOpen: boolean;
  signUp?: boolean;
  close: () => void;
}

const EntryModal: React.FC<Props> = ({ isOpen, signUp, close }) => {
  const [signUpForm, setSignUpForm] = useState(signUp);

  const handleClickAway = (e: any) => {
    if (e.target.id! === 'dialog-backdrop') {
      close();
    }
  };

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div
      id="dialog-backdrop"
      className={cn(
        'fixed left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40',
        {
          flex: isOpen,
          invisible: !isOpen,
        }
      )}
      onClick={handleClickAway}
    >
      <dialog
        className="flex max-w-md w-[90%] h-5/6 flex-col rounded-lg bg-moonstone dark:bg-charcoal shadow-xl"
        open={isOpen}
      >
        <div className="flex w-full">
          <button
            className={cn('w-1/2 h-[56px] rounded-tl-md', {
              'bg-blue text-black': signUpForm,
            })}
            onClick={() => setSignUpForm(false)}
          >
            Log In
          </button>
          <button
            className={cn('w-1/2 h-[56px] rounded-tr-md', {
              'bg-blue text-black': !signUpForm,
            })}
            onClick={() => setSignUpForm(true)}
          >
            Sign Up
          </button>
          <button
            className={cn(
              'w-7 absolute right-[8px] top-[12px] border rounded-full h-7 hover:',
              {
                'border-black text-black': !signUpForm,
              }
            )}
            onClick={() => close()}
          >
            X
          </button>
        </div>
        {signUpForm ? (
          <SignUpForm moveToLogin={() => setSignUpForm(false)} />
        ) : (
          <LoginForm
            moveToSignUp={() => setSignUpForm(true)}
            onLoginSuccess={() => close()}
          />
        )}
      </dialog>
    </div>
  );
};

export default EntryModal;
