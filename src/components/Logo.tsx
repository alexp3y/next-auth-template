import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <span className="text-[30px] flex leading-none border-[2px] rounded-[3px] px-[4px] pb-[8px] pt-[2px] cursor-pointer shadow-sm">
        p3y
      </span>
    </Link>
  );
};

export default Logo;
