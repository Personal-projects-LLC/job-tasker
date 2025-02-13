import Button from '@/components/button';
import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useState } from 'react';
import { EditProjectDialogProps } from '@/types/components/edit-project-dialog';

const EditProjectDialog = ({
  projectId,
  projectTitle = '',
  projectDescription = '',
  trigger,
  onUpdate,
}: EditProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!event) {
      setError('Event is undefined');
      return;
    }
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    try {
      await onUpdate({
        id: projectId,
        title,
        description,
      });
      setOpen(false);
    } catch (error) {
      setError('Failed to update project');
      console.error('Project update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg w-full max-w-lg"
          aria-describedby="edit-project-description"
        >
          <Dialog.Title className="text-lg font-semibold mb-4">
            Edit Project
          </Dialog.Title>
          <Dialog.Description
            id="edit-project-description"
            className="text-muted-foreground mb-4"
          >
            Make changes to your project below.
          </Dialog.Description>
          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4"
            aria-label="Edit project form"
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
                defaultValue={projectTitle}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter project title"
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'project-form-error' : undefined}
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
                defaultValue={projectDescription}
                rows={3}
                className="w-full border rounded-md px-3 py-2 resize-none"
                placeholder="Enter project description"
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'project-form-error' : undefined}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={loading}
                aria-label="Cancel project edit"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                aria-label={loading ? 'Updating project...' : 'Update project'}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </div>
            {error && (
              <p
                className="text-sm text-destructive mt-2"
                role="alert"
                id="project-form-error"
              >
                {error}
              </p>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditProjectDialog;
