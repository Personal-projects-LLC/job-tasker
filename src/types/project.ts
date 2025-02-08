export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  tasksCount: number;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
}

export interface ServerActionResponse<T> {
  data?: T;
  error?: string;
}
