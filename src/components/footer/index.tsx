import Container from '../container';
import Link from 'next/link';

const footerLinks = [
  { name: 'About', href: '/about' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Contact', href: '/contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 border-t" data-testid="footer">
      <Container className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="font-bold">
              JobTasker
            </Link>
            <p className="text-sm text-muted-foreground">
              © {currentYear} JobTasker. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-6" data-testid="footer-nav">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
