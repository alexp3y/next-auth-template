import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';
import LoginButton from './LoginButton';

const Navbar: React.FC = () => {
  return (
    <nav className="w-screen fixed top-0 bg-moonstone dark:bg-charcoal shadow-md">
      <div className="h-[60px] flex w-full justify-between px-12 items-center">
        <Logo />
        <div className="flex gap-x-6 items-center">
          <ThemeSwitch />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
