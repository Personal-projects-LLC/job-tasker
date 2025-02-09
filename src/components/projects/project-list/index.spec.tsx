// src/app/_actions/project.ts

import { render, screen } from '@testing-library/react';
import ProjectList from '.';
import { UpdateProjectData, ServerActionResponse } from '@/types/project';

describe('ProjectList', () => {
  const mockProjects = [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description 1',
      status: 'active' as const,
      tasksCount: 3,
      updatedAt: new Date(),
      createdAt: new Date(),
      userId: 'user-1',
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description 2',
      status: 'completed' as const,
      tasksCount: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
      userId: 'user-1',
    },
  ];

  const mockOnDelete = jest.fn<
    Promise<ServerActionResponse<boolean>>,
    [string]
  >();
  const mockOnUpdate = jest.fn<Promise<void>, [UpdateProjectData]>();

  mockOnDelete.mockResolvedValue({
    data: true,
    // error: 'Описание ошибки', если необходимо
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders multiple projects', () => {
    render(
      <ProjectList
        projects={mockProjects}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('displays empty state when no projects', () => {
    render(
      <ProjectList
        projects={[]}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Create your first project to get started/i)
    ).toBeInTheDocument();
  });

  it('applies responsive grid classes', () => {
    render(
      <ProjectList
        projects={mockProjects}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const grid = screen.getByText('Project 1').closest('div')?.parentElement;
    expect(grid).toHaveClass('grid', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('passes onDelete to ProjectCards', () => {
    render(
      <ProjectList
        projects={mockProjects}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(mockProjects.length);
  });
});
