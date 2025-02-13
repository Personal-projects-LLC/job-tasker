import Container from '@/components/container';
import ContentSection from '@/components/content-section';
import PageHeader from '@/components/page-header';

export const metadata = {
  title: 'About - JobTasker',
  description:
    'Learn about JobTasker - A modern project and task management solution.',
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About JobTasker"
        description="Modern project and task management solution for teams and individuals"
      />

      <div className="space-y-8">
        <ContentSection title="Our Mission">
          <p>
            JobTasker was created with a simple but powerful mission: to make
            project and task management accessible, efficient, and enjoyable for
            everyone. We believe that great tools should empower teams to focus
            on what matters most - creating and achieving their goals.
          </p>
        </ContentSection>

        <ContentSection title="What We Offer">
          <ul className="list-disc list-inside space-y-2">
            <li>Intuitive project management with real-time updates</li>
            <li>Flexible task organization and tracking</li>
            <li>Team collaboration features</li>
            <li>Detailed progress analytics</li>
            <li>Customizable workflows</li>
            <li>Integration with popular development tools</li>
          </ul>
        </ContentSection>

        <ContentSection title="Built for Modern Teams">
          <p>
            Whether you&apos;re a small startup or a large enterprise, JobTasker
            adapts to your needs. Our platform is built using cutting-edge
            technologies to ensure reliability, speed, and security. With
            features like real-time updates, automated workflows, and detailed
            analytics, we help teams stay productive and organized.
          </p>
        </ContentSection>

        <ContentSection title="Open Source">
          <p>
            We believe in transparency and community-driven development.
            That&apos;s why JobTasker is open source, allowing developers to
            contribute, customize, and improve the platform. Join our growing
            community of contributors and help shape the future of project
            management.
          </p>
        </ContentSection>
      </div>
    </Container>
  );
}
