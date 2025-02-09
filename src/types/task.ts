export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

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

export interface CreateTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
  projectId: string;
  assignedToId?: string;
}

export interface UpdateTaskData {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
  assignedToId?: string | null;
}
