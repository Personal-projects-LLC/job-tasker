'use client';

import { useTheme } from '@/contexts/theme-context';
import { MoonIcon, SunIcon } from '@/components/icons';
import Button from '@/components/button';

type ThemeToggleProps = Readonly<{
  className?: string;
}>;

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeToggle;
