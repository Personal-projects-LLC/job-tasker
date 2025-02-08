'use client';

import { useEffect } from 'react';

interface ErrorComponentProps {
  // Define an interface for the props
  readonly error: Error & { digest?: string }; // Mark 'error' as readonly
  readonly reset: () => void; // Mark 'reset' as readonly
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
