'use client';
import React, { useState } from 'react';
import EntryModal from './EntryModal';
import classNames from 'classnames';
import { useAuth } from './AuthProvider';

const LoginButton: React.FC = () => {
  const auth = useAuth();

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div
      className={classNames('w-[70x]', {
        hidden: auth.currentUser,
      })}
    >
      <button
        className="border px-3 py-1 rounded-md cursor-pointer"
        onClick={() => setLoginModalOpen(true)}
      >
        Log In
      </button>
      <EntryModal
        isOpen={loginModalOpen}
        close={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default LoginButton;
