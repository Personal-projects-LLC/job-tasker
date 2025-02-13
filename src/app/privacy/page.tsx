import Container from '@/components/container';
import ContentSection from '@/components/content-section';
import PageHeader from '@/components/page-header';

export const metadata = {
  title: 'Privacy Policy - JobTasker',
  description:
    'Learn about how JobTasker collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <Container>
      <PageHeader
        title="Privacy Policy"
        description="Last updated: February 12, 2025"
      />

      <div className="space-y-8">
        <ContentSection title="Introduction">
          <p>
            At JobTasker, we take your privacy seriously. This Privacy Policy
            describes how we collect, use, and protect your personal information
            when you use our project management platform.
          </p>
        </ContentSection>

        <ContentSection title="Information We Collect">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Name and email address</li>
            <li>Profile information and avatar</li>
            <li>Company/organization details</li>
            <li>
              Payment information (processed securely by our payment providers)
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Log data and device information</li>
            <li>Project and task activity</li>
            <li>Communication preferences</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </ContentSection>

        <ContentSection title="How We Use Your Information">
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and improve our services</li>
            <li>To communicate with you about your account</li>
            <li>To send important updates and announcements</li>
            <li>To analyze and improve our platform</li>
            <li>To protect against fraud and abuse</li>
          </ul>
        </ContentSection>

        <ContentSection title="Data Security">
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </ContentSection>

        <ContentSection title="Data Sharing">
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>
        </ContentSection>

        <ContentSection title="Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Export your data</li>
          </ul>
        </ContentSection>

        <ContentSection title="Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{' '}
            <a
              href="mailto:privacy@jobtasker.com"
              className="text-primary hover:underline"
            >
              privacy@jobtasker.com
            </a>
            .
          </p>
        </ContentSection>
      </div>
    </Container>
  );
}
