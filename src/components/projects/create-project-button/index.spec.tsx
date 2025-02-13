import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateProjectButton from '.';
import {
  CreateProjectData,
  Project,
  ServerActionResponse,
} from '@/types/project';

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { id: '123' } },
    status: 'authenticated',
  }),
}));

describe('CreateProjectButton', () => {
  const mockOnCreateProject = jest.fn<
    Promise<ServerActionResponse<Project>>,
    [CreateProjectData]
  >();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with proper accessibility attributes', () => {
    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    const button = screen.getByRole('button', {
      name: 'Open create project dialog',
    });
    expect(button).toBeInTheDocument();
  });

  it('opens dialog with proper accessibility structure', () => {
    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog
    fireEvent.click(
      screen.getByRole('button', { name: 'Open create project dialog' })
    );

    // Check dialog structure
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute(
      'aria-describedby',
      'create-project-description'
    );

    // Check title and description
    expect(
      screen.getByRole('heading', { name: 'Create New Project' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Fill in the details below to create a new project.')
    ).toBeInTheDocument();

    // Check form elements
    expect(
      screen.getByRole('form', { name: 'Create project form' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeRequired();
    expect(screen.getByRole('textbox', { name: 'Description' })).toBeRequired();
  });

  it('handles form submission with proper validation', async () => {
    const projectData = {
      title: 'Test Project',
      description: 'Test Description',
    };

    mockOnCreateProject.mockResolvedValue({ data: {} as Project });
    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog
    fireEvent.click(
      screen.getByRole('button', { name: 'Open create project dialog' })
    );

    // Fill form
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
      target: { value: projectData.title },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Description' }), {
      target: { value: projectData.description },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Create project' }));

    await waitFor(() => {
      expect(mockOnCreateProject).toHaveBeenCalledWith(projectData);
    });
  });

  it('shows loading state with proper accessibility', async () => {
    mockOnCreateProject.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog and submit form
    fireEvent.click(
      screen.getByRole('button', { name: 'Open create project dialog' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create project' }));

    // Check loading state
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Creating project...' })
      ).not.toBeInTheDocument();
    });
  });

  it('shows error message with proper accessibility', async () => {
    mockOnCreateProject.mockRejectedValue(new Error('Failed to create'));

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog and submit form
    fireEvent.click(
      screen.getByRole('button', { name: 'Open create project dialog' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create project' }));

    await waitFor(
      () => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent('Unexpected error occurred');
      },
      { timeout: 2000 }
    );

    // Check that form fields are marked as invalid
    const titleInput = screen.getByRole('textbox', { name: 'Title' });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    });
    expect(titleInput).toHaveAttribute('aria-invalid', 'true');
    expect(descriptionInput).toHaveAttribute('aria-invalid', 'true');
    expect(titleInput).toHaveAttribute(
      'aria-describedby',
      'project-form-error'
    );
    expect(descriptionInput).toHaveAttribute(
      'aria-describedby',
      'project-form-error'
    );
  });

  it('disables all interactive elements during submission', async () => {
    mockOnCreateProject.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<CreateProjectButton onCreateProject={mockOnCreateProject} />);

    // Open dialog
    fireEvent.click(
      screen.getByRole('button', { name: 'Open create project dialog' })
    );

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Create project' }));

    // Check disabled states
    const loadingButton = screen.getByTestId('submit-button');
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Cancel project creation' })
    ).toBeDisabled();
  });
});
