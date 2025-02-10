import { TaskStatus, TaskPriority } from '@prisma/client';

export type { TaskStatus, TaskPriority };

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  createdById: string;
  assignedToId: string | null;
}
