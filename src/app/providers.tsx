'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  readonly children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      {/* Theme provider will be added here */}
      {children}
    </SessionProvider>
  );
};

export default Providers;
