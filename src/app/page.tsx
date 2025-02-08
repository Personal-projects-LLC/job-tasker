import { Layout } from '@/components/layout';
import { Button } from '@/components/button';
import { Container } from '@/components/container';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Container className="py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <div className="space-y-4 animate-float">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
              Job Tasker
            </h1>
            <p className="text-xl text-muted-foreground">
              Intelligent job task analyzer and manager. Simplify your workflow
              with AI-powered insights.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="animate-fade-in [--animate-delay:200ms]"
            >
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="animate-fade-in [--animate-delay:400ms]"
            >
              <Link href="/projects/new">Create New Project</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="hover-card rounded-lg border p-6 space-y-3 animate-fade-in [--animate-delay:200ms]">
            <h3 className="text-lg font-semibold gradient-text">
              AI-Powered Analysis
            </h3>
            <p className="text-muted-foreground">
              Get intelligent insights about your projects and tasks using
              advanced AI.
            </p>
          </div>
          <div className="hover-card rounded-lg border p-6 space-y-3 animate-fade-in [--animate-delay:400ms]">
            <h3 className="text-lg font-semibold gradient-text">
              Smart Task Management
            </h3>
            <p className="text-muted-foreground">
              Organize and prioritize tasks efficiently with our smart
              management system.
            </p>
          </div>
          <div className="hover-card rounded-lg border p-6 space-y-3 animate-fade-in [--animate-delay:600ms]">
            <h3 className="text-lg font-semibold gradient-text">
              Team Collaboration
            </h3>
            <p className="text-muted-foreground">
              Work together seamlessly with built-in collaboration tools.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 grid gap-8 sm:grid-cols-3">
          <div className="text-center animate-fade-in [--animate-delay:200ms]">
            <div className="text-4xl font-bold gradient-text">500+</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Active Projects
            </div>
          </div>
          <div className="text-center animate-fade-in [--animate-delay:400ms]">
            <div className="text-4xl font-bold gradient-text">10k+</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Tasks Completed
            </div>
          </div>
          <div className="text-center animate-fade-in [--animate-delay:600ms]">
            <div className="text-4xl font-bold gradient-text">98%</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
