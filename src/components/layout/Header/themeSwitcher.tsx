'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
    >
      {resolvedTheme === 'dark' ? (
        <MoonIcon className="text-gray-700 dark:text-gray-300 w-6 h-6" />
      ) : (
        <SunIcon className="text-yellow-500 w-6 h-6" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
