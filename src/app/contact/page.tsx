import Container from '@/components/container';
import ContentSection from '@/components/content-section';
import PageHeader from '@/components/page-header';
import ContactForm from '@/components/contact-form';

export const metadata = {
  title: 'Contact Us - JobTasker',
  description:
    "Get in touch with the JobTasker team. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        title="Contact Us"
        description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContentSection>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-muted-foreground">
                <a
                  href="mailto:support@jobtasker.com"
                  className="hover:text-primary"
                >
                  support@jobtasker.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Office Location</h3>
              <p className="text-muted-foreground">
                123 Project Street
                <br />
                Suite 100
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Business Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM PST
                <br />
                Saturday & Sunday: Closed
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Connect With Us</h3>
              <p className="text-muted-foreground">
                Follow us on social media for the latest updates and news.
              </p>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://twitter.com/jobtasker"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/jobtasker"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/company/jobtasker"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection>
          <ContactForm />
        </ContentSection>
      </div>
    </Container>
  );
}
