import { render, screen } from '@testing-library/react';
import { Container } from './index';

describe('Container', () => {
  it('renders as a div by default', () => {
    render(<Container>Content</Container>);
    const container = screen.getByText('Content');
    expect(container.tagName).toBe('DIV');
  });

  it('renders with custom element', () => {
    render(<Container as="section">Content</Container>);
    const container = screen.getByText('Content');
    expect(container.tagName).toBe('SECTION');
  });

  it('includes base classes', () => {
    render(<Container>Content</Container>);
    const container = screen.getByText('Content');
    expect(container).toHaveClass('mx-auto', 'w-full', 'max-w-7xl');
  });

  it('accepts and merges additional className', () => {
    render(<Container className="test-class">Content</Container>);
    const container = screen.getByText('Content');
    expect(container).toHaveClass('test-class');
    expect(container).toHaveClass('mx-auto'); // Base class still present
  });
});
