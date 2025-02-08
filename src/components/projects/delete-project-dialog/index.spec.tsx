import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeleteProjectDialog } from './index';

describe('DeleteProjectDialog', () => {
  const defaultProps = {
    projectId: '1',
    projectTitle: 'Test Project',
    onDelete: jest.fn() as jest.MockedFunction<(id: string) => Promise<void>>,
    trigger: <button>Delete</button>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders trigger element', () => {
    render(<DeleteProjectDialog {...defaultProps} />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('opens dialog when trigger is clicked', () => {
    render(<DeleteProjectDialog {...defaultProps} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText(/Are you sure/)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.projectTitle)).toBeInTheDocument();
  });

  it('calls onDelete when confirmed', async () => {
    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByText('Delete'));

    // Click delete button
    fireEvent.click(screen.getByText('Delete Project'));

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
    fireEvent.click(screen.getByText('Delete'));

    // Click delete button
    fireEvent.click(screen.getByText('Delete Project'));

    expect(screen.getByText('Deleting...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Deleting...')).not.toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    defaultProps.onDelete.mockRejectedValue(new Error('Failed to delete'));

    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByText('Delete'));

    // Click delete button
    fireEvent.click(screen.getByText('Delete Project'));

    await waitFor(() => {
      expect(screen.getByText('Failed to delete project')).toBeInTheDocument();
    });
  });

  it('disables buttons during deletion', async () => {
    defaultProps.onDelete.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<DeleteProjectDialog {...defaultProps} />);

    // Open dialog
    fireEvent.click(screen.getByText('Delete'));

    // Click delete button
    fireEvent.click(screen.getByText('Delete Project'));

    const deleteButton = screen.getByText('Deleting...');
    const cancelButton = screen.getByText('Cancel');

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});
