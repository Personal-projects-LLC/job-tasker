'use client';

import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-md min-h-screen flex flex-col items-center justify-center">
      <div className="w-full p-6 bg-background rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <p className="text-center text-muted-foreground">
          Sign in to continue to TaskJobber
        </p>
        <div className="space-y-4">
          <Button
            data-testid="github-signin-button"
            onClick={() => {
              signIn('github', { callbackUrl: '/' })
                .then((data) => {
                  console.log('Успешный вход:', data);
                })
                .catch((error) => {
                  console.error('Ошибка при входе:', error);
                });
            }}
            className="w-full"
            variant="default"
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
              Sign in with GitHub
            </div>
          </Button>
          <Button
            data-testid="return-home-button"
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

export default SignInPage;
