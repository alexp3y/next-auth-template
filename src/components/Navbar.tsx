import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="w-screen fixed top-0 bg-moonstone dark:bg-charcoal shadow-md">
      <div className="h-[60px] flex w-full justify-between px-12 items-center">
        <Logo />
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
