import { TaskStatus, TaskPriority } from '@prisma/client';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  createdById: string;
  assignedToId: string | null;
}
