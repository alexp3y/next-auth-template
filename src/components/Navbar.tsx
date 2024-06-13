import React from 'react';
import LoginButton from './LoginButton';
import Logo from './Logo';
import ProfileButton from './ProfileButton';
import ThemeSwitch from './ThemeSwitch';

const Navbar: React.FC = () => {
  return (
    <nav className="w-screen fixed top-0 bg-moonstone dark:bg-charcoal shadow-md">
      <div className="h-[60px] flex w-full justify-between px-4 md:px-12 items-center">
        <Logo />
        <div className="flex gap-x-4 items-center">
          <ThemeSwitch />
          <ProfileButton />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
