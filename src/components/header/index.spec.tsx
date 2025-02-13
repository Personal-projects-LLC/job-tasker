import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/utils/test-utils';
import { usePathname } from 'next/navigation';
import Header from './index';

jest.mock('next/navigation');
jest.mock('../theme-toggle', () => ({
  __esModule: true,
  default: () => <button aria-label="Toggle theme">Toggle theme</button>,
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReset();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders logo and navigation links', () => {
    render(<Header />);

    // Logo
    expect(screen.getByText(/JobTasker/i)).toBeInTheDocument();

    // Navigation links
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tasks/i })).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    (usePathname as jest.Mock).mockReturnValue('/projects');
    render(<Header />);

    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const tasksLink = screen.getByRole('link', { name: /tasks/i });

    expect(projectsLink).toHaveClass('text-primary');
    expect(tasksLink).toHaveClass('text-muted-foreground');
  });

  it('renders new project link', () => {
    render(<Header />);

    const createLink = screen.getByRole('link', { name: /new project/i });
    expect(createLink).toBeInTheDocument();
  });

  it('is responsive with hidden navigation on mobile', () => {
    render(<Header />);

    const navLinks = screen
      .getByRole('navigation')
      .querySelector('.hidden.md\\:flex');
    expect(navLinks).toBeInTheDocument();
  });
});
