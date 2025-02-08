'use client';

import Button from '@/components/button';
import { useRouter } from 'next/navigation';

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
          {/* GitHub провайдер будет добавлен позже */}
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

export default SignInPage;
