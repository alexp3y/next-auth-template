import cn from 'classnames';
import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  closeMenu: () => void;
}

const DropdownMenu: React.FC<Props> = ({ open, closeMenu }) => {
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = async () => {
    closeMenu();
    await auth.signOut();
  };

  const handleClickaway = (e: any) => {
    const menuContainer = e.target.closest('#dropdown-menu');
    if (!menuContainer) {
      e.stopPropagation();
      closeMenu();
    }
  };
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  useEffect(() => {
    if (open) {
      const body = document.getElementsByTagName('body')[0];
      body.addEventListener('click', handleClickaway);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        body.removeEventListener('click', handleClickaway);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [open]);

  return (
    <div
      id="dropdown-menu"
      className={cn(
        `dropdown-menu absolute right-2 z-50 w-[300px] translate-y-[52px] overflow-hidden shadow-2xl rounded-lg ease-in-out h-fit transition-opacity duration-100`,
        {
          'pointer-events-none opacity-0': !open,
        }
      )}
    >
      <div className="flex flex-col justify-center items-center p-6 border border-charcoal rounded-lg bg-platinum dark:bg-black gap-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-xl">{auth.currentUser?.displayName}</span>
          <button
            className="border rounded-full px-6 py-[4px] bg-blue text-black"
            onClick={() => {
              closeMenu();
              router.push('/profile');
            }}
          >
            Edit Profile
          </button>
          <span className="text-sm">{auth.currentUser?.email}</span>
        </div>
        <button
          className="border rounded-md text-sm px-6 py-1 bg-blue text-black"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
