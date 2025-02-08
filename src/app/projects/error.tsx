'use client';

import { Layout } from '@/components/layout';
import { Container } from '@/components/container';
import { Button } from '@/components/button';
import { useEffect } from 'react';
import Link from 'next/link';

interface ProjectsErrorProps {
  // Define an interface for the props
  readonly error: Error & { digest?: string }; // Mark 'error' as readonly
  readonly reset: () => void; // Mark 'reset' as readonly
}

export default function ProjectsError({ error, reset }: ProjectsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <Container>
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
          <div className="animate-float space-y-6 max-w-md">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold gradient-text">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground">
                {error.message || 'There was an error loading the projects.'}
              </p>
            </div>
            <div className="p-6 hover-card rounded-lg border space-y-4">
              <p className="text-sm text-muted-foreground">
                Don&apos;t worry, your data is safe. You can try these options:
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={reset}
                  size="lg"
                  className="animate-fade-in [--animate-delay:200ms]"
                >
                  Try again
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="animate-fade-in [--animate-delay:400ms]"
                >
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
