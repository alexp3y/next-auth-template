'use client';
import cn from 'classnames';
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import DropdownMenu from './DropdownMenu';

const ProfileButton: React.FC = () => {
  const auth = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn('relative w-[70px] flex justify-end pr-2', {
        hidden: !auth.currentUser || auth.initializing,
      })}
    >
      <button
        id="profile-button"
        className={cn(
          'border rounded-full h-[38px] aspect-square dark:bg-black bg-blue dark:border-blue flex justify-center items-center border-charcoal',
          {
            hidden: !auth.currentUser || auth.initializing,
          }
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="text-2xl">
          {auth.currentUser?.email![0].toUpperCase()}
        </span>
      </button>
      <DropdownMenu open={open} closeMenu={() => setOpen(false)} />
    </div>
  );
};

export default ProfileButton;
