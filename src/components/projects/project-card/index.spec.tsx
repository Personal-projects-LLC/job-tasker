import { render, screen } from '@testing-library/react';
import ProjectCard from '.';
import { ProjectStatus } from '@prisma/client';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ProjectCard', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description',
    status: ProjectStatus.active,
    tasksCount: 3,
    createdAt: new Date('2025-02-05'),
    updatedAt: new Date('2025-02-05'),
    userId: 'test-user-id',
  };

  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  it('displays project information correctly', () => {
    render(
      <ProjectCard
        project={mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('3 tasks')).toBeInTheDocument();
    expect(screen.getByText('Updated Feb 5, 2025')).toBeInTheDocument();
  });

  it('displays correct status indicator', () => {
    render(
      <ProjectCard
        project={mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const statusText = screen.getByText('Active');
    const statusIndicator = statusText.previousElementSibling;
    expect(statusIndicator).toHaveClass('bg-success');
  });

  it('links to project details', () => {
    render(
      <ProjectCard
        project={mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const titleLink = screen.getByRole('link', { name: 'Test Project' });
    expect(titleLink).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('handles different status styles', () => {
    const completedProject = {
      ...mockProject,
      status: ProjectStatus.completed,
    };
    const { rerender } = render(
      <ProjectCard
        project={completedProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    let statusText = screen.getByText('Completed');
    let statusIndicator = statusText.previousElementSibling;
    expect(statusIndicator).toHaveClass('bg-info');

    const inProgressProject = {
      ...mockProject,
      status: ProjectStatus.archived,
    };
    rerender(
      <ProjectCard
        project={inProgressProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    statusText = screen.getByText('archived');
    statusIndicator = statusText.previousElementSibling;
    expect(statusIndicator).toHaveClass('bg-warning');
  });

  it('shows edit and delete buttons', () => {
    render(
      <ProjectCard
        project={mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
