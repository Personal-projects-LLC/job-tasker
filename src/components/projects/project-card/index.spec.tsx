import { render, screen } from '@testing-library/react';
import ProjectCard from '.';
import { ServerActionResponse, UpdateProjectData } from '@/types/project';

describe('ProjectCard', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description',
    status: 'active' as const,
    tasksCount: 3, // Убедитесь, что tasksCount имеет правильный тип
    updatedAt: new Date('2025-02-05T12:00:00.000Z'),
  };

  const mockOnDelete = jest.fn<
    Promise<ServerActionResponse<boolean>>,
    [string]
  >();
  const mockOnUpdate = jest.fn<Promise<void>, [UpdateProjectData]>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders project information', () => {
    render(
      <ProjectCard
        {...mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByText(/3 tasks/)).toBeInTheDocument();
    expect(screen.getByText(/Updated/)).toBeInTheDocument();
  });

  it('displays correct status indicator', () => {
    render(
      <ProjectCard
        {...mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );

    const statusIndicator = screen.getByText('active').previousSibling;
    expect(statusIndicator).toHaveClass('bg-green-500');
  });

  it('links to project details and edit pages', () => {
    render(
      <ProjectCard
        {...mockProject}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );

    const titleLink = screen.getByText(mockProject.title).closest('a');
    const editButton = screen.getByText('Edit').closest('a');

    expect(titleLink).toHaveAttribute('href', `/projects/${mockProject.id}`);
    expect(editButton).toHaveAttribute(
      'href',
      `/projects/${mockProject.id}/edit`
    );
  });

  it('handles different status styles', () => {
    const { rerender } = render(
      <ProjectCard
        {...mockProject}
        status="completed"
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );
    let statusIndicator = screen.getByText('completed').previousSibling;
    expect(statusIndicator).toHaveClass('bg-blue-500');

    rerender(
      <ProjectCard
        {...mockProject}
        status="archived"
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );
    statusIndicator = screen.getByText('archived').previousSibling;
    expect(statusIndicator).toHaveClass('bg-gray-500');
  });

  it('displays correct task count text', () => {
    const { rerender } = render(
      <ProjectCard
        {...mockProject}
        tasksCount={1}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );
    expect(screen.getByText('1 task')).toBeInTheDocument();

    rerender(
      <ProjectCard
        {...mockProject}
        tasksCount={0}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        createdAt={new Date()}
        userId="actual-user-id"
      />
    );
    expect(screen.getByText('0 tasks')).toBeInTheDocument();
  });
});
