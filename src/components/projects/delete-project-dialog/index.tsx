'use client';

import Button from '@/components/button';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { DeleteProjectDialogProps } from '@/types/components/delete-project-dialog';

const DeleteProjectDialog = ({
  projectId,
  projectTitle,
  onDelete,
  trigger,
}: DeleteProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await onDelete(projectId);

      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
      }
    } catch (err) {
      setError('Unexpected error occurred');
      console.error('Project deletion error: ', err);
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
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg w-full max-w-md"
          aria-describedby="delete-project-description"
        >
          <Dialog.Title className="text-lg font-semibold mb-4">
            Delete Project
          </Dialog.Title>
          <Dialog.Description
            id="delete-project-description"
            className="text-muted-foreground mb-4"
          >
            Are you sure you want to delete {projectTitle}? This action cannot
            be undone and all associated tasks will be permanently deleted.
          </Dialog.Description>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              aria-label="Cancel deletion"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => void handleDelete()}
              disabled={loading}
              aria-label={
                loading ? 'Deleting project' : 'Confirm delete project'
              }
            >
              {loading ? 'Deleting...' : 'Delete Project'}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive mt-2" role="alert">
              {error}
            </p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteProjectDialog;
