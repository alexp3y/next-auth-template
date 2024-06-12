'use client';
import React, { useState } from 'react';
import EntryModal from './EntryModal';

const LoginButton: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <div>
      <button
        className="border px-3 py-1 rounded-lg cursor-pointer active:bg-platinum dark:active:bg-black"
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
