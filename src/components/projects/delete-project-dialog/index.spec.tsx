import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteProjectDialog from './index';
import { ServerActionResponse } from '@/types/project';

describe('DeleteProjectDialog', () => {
  const defaultProps = {
    projectId: '1',
    projectTitle: 'Test Project',
    onDelete: jest
      .fn<Promise<ServerActionResponse<boolean>>, [string]>()
      .mockResolvedValue({ data: true }),
    trigger: <button>Delete</button>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders trigger element', () => {
    render(<DeleteProjectDialog {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('opens dialog with proper accessibility attributes', () => {
    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // Check dialog content
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute(
      'aria-describedby',
      'delete-project-description'
    );

    // Check title and description
    expect(
      screen.getByRole('heading', { name: 'Delete Project' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete Test Project/)
    ).toBeInTheDocument();
  });

  it('calls onDelete when confirmed', async () => {
    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // Click delete button
    fireEvent.click(
      screen.getByRole('button', { name: 'Confirm delete project' })
    );

    await waitFor(() => {
      expect(defaultProps.onDelete).toHaveBeenCalledWith(
        defaultProps.projectId
      );
    });
  });

  it('shows loading state during deletion', async () => {
    defaultProps.onDelete.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // Click delete button
    fireEvent.click(
      screen.getByRole('button', { name: 'Confirm delete project' })
    );

    // Check loading state
    const deleteButton = screen.getByRole('button', {
      name: 'Deleting project',
    });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent('Deleting...');

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Deleting project' })
      ).not.toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    defaultProps.onDelete.mockRejectedValue(new Error('Failed to delete'));

    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // Click delete button
    fireEvent.click(
      screen.getByRole('button', { name: 'Confirm delete project' })
    );

    await waitFor(() => {
      expect(screen.getByText('Unexpected error occurred')).toBeInTheDocument();
    });
  });

  it('disables buttons during deletion', async () => {
    defaultProps.onDelete.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // Click delete button
    fireEvent.click(
      screen.getByRole('button', { name: 'Confirm delete project' })
    );

    // Check disabled states
    expect(
      screen.getByRole('button', { name: 'Deleting project' })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Cancel deletion' })
    ).toBeDisabled();
  });
});
