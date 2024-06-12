'use client';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setTheme(
      theme && theme !== 'system'
        ? theme
        : window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 relative h-[25px] w-[44px]">
      <label className="switch w-1/2 rounded-full">
        <input
          checked={
            typeof window !== 'undefined'
              ? theme
                ? theme === 'dark'
                : window.matchMedia &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches
              : true
          }
          type="checkbox"
          onChange={toggleTheme}
        />
        <span
          className={
            'slider absolute cursor-pointer bg-blue dark:bg-black border border-black dark:border-blue rounded-xl before:transition-transform before:duration-300 before:rounded-full before:bg-charcoal before:dark:bg-platinum'
          }
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
