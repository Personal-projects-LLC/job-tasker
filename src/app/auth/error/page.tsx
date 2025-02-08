'use client';

import Button from '@/components/button';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An unknown error occurred';
  if (error === 'Configuration') {
    errorMessage = 'There is a problem with the server configuration.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'You do not have permission to sign in.';
  } else if (error === 'Verification') {
    errorMessage =
      'The verification token has expired or has already been used.';
  }

  return (
    <div className="container mx-auto max-w-md min-h-screen flex flex-col items-center justify-center">
      <div className="w-full p-6 bg-background rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-destructive">
          Authentication Error
        </h1>
        <p className="text-center text-muted-foreground">{errorMessage}</p>
        <div className="space-y-4">
          <Button
            onClick={() => router.push('/auth/signin')}
            className="w-full"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="w-full"
            variant="outline"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
