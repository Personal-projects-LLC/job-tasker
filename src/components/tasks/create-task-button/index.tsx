'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from '@/components/button';
import { createTask } from '@/app/_actions/task';
import { TaskPriority } from '@/types/models/task';
import { CreateTaskButtonProps } from '@/types/components/create-task-button';

const CreateTaskButton = ({
  projectId,
  onTaskCreated,
}: CreateTaskButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as TaskPriority;
    const dueDate = formData.get('dueDate') as string;

    try {
      const result = await createTask({
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        projectId,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
        onTaskCreated();
      }
    } catch (err) {
      setError('Failed to create task');
      console.error('Task creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Add Task</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-lg w-full max-w-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Create New Task
          </Dialog.Title>
          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4"
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
                placeholder="Enter task title"
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
                placeholder="Enter task description"
              />
            </div>
            <div>
              <label
                htmlFor="priority"
                className="text-sm font-medium block mb-1.5"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                required
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="text-sm font-medium block mb-1.5"
              >
                Due Date (optional)
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                className="w-full border rounded-md px-3 py-2"
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
                {loading ? 'Creating...' : 'Create Task'}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateTaskButton;
