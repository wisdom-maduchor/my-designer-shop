import React from 'react';

export default function Button({ as: Tag = 'button', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950';
  return (
    <Tag className={`${base} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
