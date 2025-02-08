import { Layout } from '@/components/layout';
import { Container } from '@/components/container';

export default function ProjectsLoading() {
  return (
    <Layout>
      <Container className="py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="h-9 w-40 bg-primary/10 rounded animate-pulse-slow" />
            <div className="h-5 w-72 bg-muted rounded mt-2 animate-pulse-slow" />
          </div>
          <div className="h-10 w-36 bg-primary/10 rounded animate-pulse-slow" />
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 -top-40 -bottom-40 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-[40px] blur-3xl" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`project-loading-placeholder-${crypto.randomUUID()}`}
                className="hover-card rounded-lg border p-4 space-y-3"
                style={{
                  animation: `fade-in 0.5s ease-out forwards ${i * 100}ms`,
                  opacity: 0,
                }}
              >
                <div className="h-6 w-3/4 bg-primary/10 rounded animate-pulse-slow" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded animate-pulse-slow" />
                  <div className="h-4 w-2/3 bg-muted rounded animate-pulse-slow" />
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse-slow" />
                  <div className="h-4 w-16 bg-muted rounded animate-pulse-slow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}
