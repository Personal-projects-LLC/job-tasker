import Container from '@/components/container';
import ContentSection from '@/components/content-section';
import PageHeader from '@/components/page-header';

export const metadata = {
  title: 'Terms of Service - JobTasker',
  description: 'Read our terms of service and user agreement.',
};

export default function TermsPage() {
  return (
    <Container>
      <PageHeader
        title="Terms of Service"
        description="Last updated: February 12, 2025"
      />

      <div className="space-y-8">
        <ContentSection title="Agreement to Terms">
          <p>
            By accessing or using JobTasker, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this platform.
          </p>
        </ContentSection>

        <ContentSection title="Use License">
          <p className="mb-4">
            Permission is granted to temporarily use JobTasker for personal or
            business project management purposes, subject to the following
            conditions:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>You must not modify or copy the platform&apos;s source code</li>
            <li>You must not use the platform for any illegal purposes</li>
            <li>
              You must not attempt to decompile or reverse engineer the software
            </li>
            <li>You must not remove any copyright or proprietary notations</li>
            <li>You must not transfer the license to any third party</li>
          </ul>
        </ContentSection>

        <ContentSection title="User Account">
          <p className="mb-4">
            To access certain features of JobTasker, you must create an account.
            You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your account information</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Not share your account credentials with third parties</li>
          </ul>
        </ContentSection>

        <ContentSection title="Content Guidelines">
          <p className="mb-4">When using JobTasker, you agree not to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Upload or share any unlawful or inappropriate content</li>
            <li>Infringe upon intellectual property rights</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Spam or distribute malware</li>
            <li>Attempt to gain unauthorized access to other accounts</li>
          </ul>
        </ContentSection>

        <ContentSection title="Service Modifications">
          <p>
            JobTasker reserves the right to modify or discontinue the service,
            temporarily or permanently, with or without notice. We shall not be
            liable to you or any third party for any modification, suspension,
            or discontinuance of the service.
          </p>
        </ContentSection>

        <ContentSection title="Payment Terms">
          <p className="mb-4">For paid subscriptions:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Payments are processed securely through our payment providers
            </li>
            <li>
              Subscriptions auto-renew unless cancelled before renewal date
            </li>
            <li>Refunds are handled according to our refund policy</li>
            <li>Prices may change with notice to subscribers</li>
          </ul>
        </ContentSection>

        <ContentSection title="Limitation of Liability">
          <p>
            JobTasker shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or
            inability to use the service.
          </p>
        </ContentSection>

        <ContentSection title="Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the United States, without regard to its conflict of law
            provisions.
          </p>
        </ContentSection>

        <ContentSection title="Contact Information">
          <p>
            For any questions about these Terms, please contact us at{' '}
            <a
              href="mailto:legal@jobtasker.com"
              className="text-primary hover:underline"
            >
              legal@jobtasker.com
            </a>
            .
          </p>
        </ContentSection>
      </div>
    </Container>
  );
}
