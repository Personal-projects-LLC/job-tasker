'use client';

import { SessionProvider } from 'next-auth/react';
import { ProvidersProps } from '@/types/components/providers';

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      {/* Theme provider will be added here */}
      {children}
    </SessionProvider>
  );
};

export default Providers;
