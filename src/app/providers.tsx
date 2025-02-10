'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/contexts/theme-context';
import { ProvidersProps } from '@/types/components/providers';

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
