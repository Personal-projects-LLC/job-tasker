import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  beforeAll(() => {
    // Mock Date to ensure consistent year in tests
    const mockDate = new Date(2025, 0, 1);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders logo with home link', () => {
    render(<Footer />);
    const logo = screen.getByText('JobTasker');
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('displays current year in copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025/)).toBeInTheDocument();
  });

  it('renders all footer links', () => {
    render(<Footer />);

    const links = [
      { name: 'About', href: '/about' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Contact', href: '/contact' },
    ];

    links.forEach((link) => {
      const linkElement = screen.getByText(link.name);
      expect(linkElement).toHaveAttribute('href', link.href);
      expect(linkElement).toHaveClass('text-muted-foreground');
    });
  });

  it('has responsive layout classes', () => {
    render(<Footer />);

    const container = screen
      .getByText('JobTasker')
      .closest('div')?.parentElement;
    expect(container).toHaveClass('flex-col', 'md:flex-row');
  });
});
