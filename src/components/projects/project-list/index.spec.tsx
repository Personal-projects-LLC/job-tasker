import { render, screen } from '@testing-library/react';
import ProjectList from '.';
import { Project } from '@/types/project';
import { ProjectStatus } from '@prisma/client';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ProjectList', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description 1',
      status: ProjectStatus.active,
      tasksCount: 3,
      createdAt: new Date('2025-02-05'),
      updatedAt: new Date('2025-02-05'),
      userId: '1',
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description 2',
      status: ProjectStatus.active,
      tasksCount: 5,
      createdAt: new Date('2025-02-05'),
      updatedAt: new Date('2025-02-05'),
      userId: '2',
    },
  ];

  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  it('renders all projects', () => {
    render(
      <ProjectList
        projects={mockProjects}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('applies responsive grid classes', () => {
    render(
      <ProjectList
        projects={mockProjects}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const grid = screen.getByTestId('project-grid');
    expect(grid).toHaveClass(
      'grid',
      'sm:grid-cols-2',
      'lg:grid-cols-3',
      'gap-4'
    );
  });

  it('passes onDelete to ProjectCards', () => {
    render(
      <ProjectList
        projects={mockProjects}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    // Verify that the onDelete prop is passed to each ProjectCard
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    expect(deleteButtons).toHaveLength(mockProjects.length);
  });

  it('handles empty projects array', () => {
    render(
      <ProjectList
        projects={[]}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const grid = screen.getByTestId('project-grid');
    expect(grid).toBeEmptyDOMElement();
  });
});
