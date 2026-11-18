import React from 'react';

export const RedUnderline = ({ children }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10 text-red-600">{children}</span>
      <span
        aria-hidden="true"
        className="absolute left-0 -bottom-1.5 w-full h-[5px] rounded-full bg-gradient-to-r from-red-600 via-red-500 to-transparent opacity-85"
      />
    </span>
  );
};