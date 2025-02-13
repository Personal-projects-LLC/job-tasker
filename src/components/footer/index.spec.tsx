import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer', () => {
  it('should render', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should display copyright text', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(
      screen.getByText(`© ${currentYear} JobTasker. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(<Footer />);
    const nav = screen.getByTestId('footer-nav');

    const links = [
      { text: 'About', href: '/about' },
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
      { text: 'Contact', href: '/contact' },
    ];

    links.forEach(({ text, href }) => {
      const link = nav.querySelector(`a[href="${href}"]`);
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(text);
    });
  });
});
