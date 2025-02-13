import Button from '@/components/button';
import { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateProjectButtonProps } from '@/types/components/create-project-button';
import { useSession } from 'next-auth/react';

const sanitizeInput = (input: string): string => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
};

const CreateProjectButton = ({ onCreateProject }: CreateProjectButtonProps) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!session?.user?.id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    try {
      const result = await onCreateProject({
        title: sanitizeInput(title),
        description: sanitizeInput(description),
      });

      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setError('Unexpected error occurred');
      console.error('Project creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          onClick={() => setOpen(true)}
          aria-label="Open create project dialog"
        >
          Create Project
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg w-full max-w-lg"
          aria-describedby="create-project-description"
        >
          <Dialog.Title className="text-lg font-semibold mb-4">
            Create New Project
          </Dialog.Title>
          <Dialog.Description
            id="create-project-description"
            className="text-muted-foreground mb-4"
          >
            Fill in the details below to create a new project.
          </Dialog.Description>
          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4"
            aria-label="Create project form"
          >
            <div>
              <label
                htmlFor="title"
                className="text-sm font-medium block mb-1.5"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter project title"
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'project-form-error' : undefined}
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium block mb-1.5"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                className="w-full border rounded-md px-3 py-2 resize-none"
                placeholder="Enter project description"
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'project-form-error' : undefined}
                disabled={loading}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={loading}
                aria-label="Cancel project creation"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                aria-label={loading ? 'Creating project...' : 'Create project'}
                data-testid="submit-button"
              >
                {loading ? 'Creating project...' : 'Create project'}
              </Button>
            </div>
            {error && (
              <div
                className="text-sm text-destructive mt-2"
                role="alert"
                id="project-form-error"
                aria-live="polite"
              >
                {error}
              </div>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateProjectButton;
