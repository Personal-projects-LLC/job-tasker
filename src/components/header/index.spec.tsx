import { render, screen } from '@testing-library/react';
import { Header } from './index';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    // Reset usePathname mock
    (usePathname as jest.Mock).mockReset();
  });

  it('renders logo and navigation links', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);

    // Check logo
    expect(screen.getByText('JobTasker')).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    (usePathname as jest.Mock).mockReturnValue('/projects');
    render(<Header />);

    const projectsLink = screen.getByText('Projects').closest('a');
    const tasksLink = screen.getByText('Tasks').closest('a');

    expect(projectsLink).toHaveClass('text-primary');
    expect(tasksLink).toHaveClass('text-muted-foreground');
  });

  it('renders new project button', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);

    const newProjectButton = screen.getByText('New Project').closest('a');
    expect(newProjectButton).toHaveAttribute('href', '/projects/new');
  });

  it('is responsive with hidden navigation on mobile', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);

    const nav = screen.getByText('Projects').closest('div');
    expect(nav).toHaveClass('hidden', 'md:flex');
  });
});
