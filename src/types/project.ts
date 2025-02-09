import { ProjectStatus as PrismaProjectStatus } from '@prisma/client';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: PrismaProjectStatus;
  tasksCount: number;
  updatedAt: Date;
}

export interface UpdateData {
  id: string;
  title?: string;
  description?: string;
  status?: PrismaProjectStatus;
}

export interface CreateProjectData {
  title: string;
  description: string;
  user: {
    id: string;
  };
}

export interface ServerActionResponse<T> {
  data?: T;
  error?: string;
}
