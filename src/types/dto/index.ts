import { TaskStatus, TaskPriority, ProjectStatus } from '@prisma/client';

export interface CreateProjectData {
  title: string;
  description: string;
}

export interface UpdateProjectData {
  id: string;
  title?: string;
  description?: string;
  status?: ProjectStatus;
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
