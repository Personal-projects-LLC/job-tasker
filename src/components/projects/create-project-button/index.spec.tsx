import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateProjectButton } from '.';
describe('CreateProjectButton', () => {
  const mockOnCreateProject = jest
    .fn()
    .mockImplementation(() => Promise.resolve()) as jest.MockedFunction<
    () => Promise<void>
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens dialog when clicked', () => {
    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    const button = screen.getByText('Create Project');
    fireEvent.click(button);

    expect(screen.getByText('Create New Project')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const projectData = {
      title: 'Test Project',
      description: 'Test Description',
    };

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog
    fireEvent.click(screen.getByText('Create Project'));

    // Fill form
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: projectData.title },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: projectData.description },
    });

    // Submit form
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockOnCreateProject).toHaveBeenCalledWith(projectData);
    });
  });

  it('shows loading state during submission', async () => {
    mockOnCreateProject.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog and submit form
    fireEvent.click(screen.getByText('Create Project'));
    fireEvent.click(screen.getByText('Create'));

    expect(screen.getByText('Creating...')).toBeInTheDocument();
    expect(screen.getByText('Creating...')).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText('Creating...')).not.toBeInTheDocument();
    });
  });

  it('disables buttons during submission', async () => {
    mockOnCreateProject.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog
    fireEvent.click(screen.getByText('Create Project'));

    // Submit form
    fireEvent.click(screen.getByText('Create'));

    const createButton = screen.getByText('Creating...');
    const cancelButton = screen.getByText('Cancel');

    expect(createButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText('Creating...')).not.toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog
    fireEvent.click(screen.getByText('Create Project'));

    // Try to submit empty form
    fireEvent.click(screen.getByText('Create'));

    // Check that onCreateProject wasn't called
    expect(mockOnCreateProject).not.toHaveBeenCalled();

    // Check for HTML5 validation
    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');

    expect(titleInput).toBeRequired();
    expect(descriptionInput).toBeRequired();
  });

  it('shows error message on submission failure', async () => {
    mockOnCreateProject.mockRejectedValue(new Error('Failed to create'));

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog and submit form
    fireEvent.click(screen.getByText('Create Project'));
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(screen.getByText('Failed to create project')).toBeInTheDocument();
    });
  });
});
