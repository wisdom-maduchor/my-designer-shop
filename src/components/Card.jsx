import React from 'react';

export default function Card({ className = '', children }) {
  return (
    <div className={`bg-[var(--surface)] border border-[color:var(--border)] rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}
