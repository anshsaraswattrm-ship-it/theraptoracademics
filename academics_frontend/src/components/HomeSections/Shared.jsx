import React from 'react';

export const RedUnderline = ({ children }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{children}</span>
    <svg
      className="absolute -bottom-2 left-0 w-full h-3.5 text-red-600 z-0 pointer-events-none"
      viewBox="0 0 200 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M3 9C55 2.5 145 1.5 197 7.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 12.5C75 7.5 135 6.5 185 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </span>
);