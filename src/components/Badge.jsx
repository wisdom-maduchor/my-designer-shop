import React from 'react';

export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-pink-500/15 text-pink-300 border border-pink-400/30 ${className}`}>
      {children}
    </span>
  );
}
