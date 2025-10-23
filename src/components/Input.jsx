import React from 'react';

export default function Input(props) {
  const cls = 'w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400 outline-none transition';
  return <input className={cls} {...props} />;
}
