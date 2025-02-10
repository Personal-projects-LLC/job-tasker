import { Task } from './models/task';

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type { Task };

export interface CreateTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: Date | null;
  projectId: string;
  assignedToId?: string;
}

export interface UpdateTaskData {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
  assignedToId?: string | null;
}
