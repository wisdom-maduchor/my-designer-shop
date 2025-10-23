import React, { useEffect, useState } from 'react';

const THEME_KEY = 'designer_shop_theme'; // 'dark' | 'light' | 'system'

function applyTheme(mode) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-system');
  if (mode === 'light') root.classList.add('theme-light');
  else if (mode === 'system') root.classList.add('theme-system');
  // default (dark) uses :root values
}

export default function ThemeToggle(){
  const [mode, setMode] = useState(() => localStorage.getItem(THEME_KEY) || 'dark');

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">Theme</span>
      <select
        aria-label="Theme"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="bg-[var(--muted)] text-[color:var(--foreground)] border border-[color:var(--border)] rounded-md px-2 py-1"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
