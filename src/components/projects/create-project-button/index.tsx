'use client';

import { Button } from '@/components/button';
import { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface CreateProjectButtonProps {
  onCreateProject: (data: {
    title: string;
    description: string;
  }) => Promise<void>;
}

const sanitizeInput = (input: string): string => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
};

export function CreateProjectButton({
  onCreateProject,
}: Readonly<CreateProjectButtonProps>) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    try {
      await onCreateProject({
        title: sanitizeInput(title),
        description: sanitizeInput(description),
      });
      setOpen(false);
    } catch (err) {
      setError('Failed to create project');
      console.error('Project creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button onClick={() => setOpen(true)}>Create Project</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg w-full max-w-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Create New Project
          </Dialog.Title>
          <form onSubmit={() => handleSubmit} className="space-y-4">
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
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
