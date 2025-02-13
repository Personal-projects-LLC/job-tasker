import { render, screen } from '@testing-library/react';
import Layout from '.';

// Mock the Header and Footer components
jest.mock('../header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Mock Header</div>;
  };
});

jest.mock('../footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Mock Footer</div>;
  };
});

describe('Layout', () => {
  it('renders header, main content, and footer', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('wraps content in flex container', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const container = screen.getByTestId('layout-container');
    expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col');
  });

  it('applies flex-1 to main content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const main = screen.getByTestId('layout-main');
    expect(main).toHaveClass('flex-1');
  });
});
