'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  readonly children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      {/* Auth provider will be added here */}
      {/* Theme provider will be added here */}
      {children}
    </>
  );
};

export default Providers;
