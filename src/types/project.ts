import { ProjectStatus as PrismaProjectStatus } from '@prisma/client';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: PrismaProjectStatus;
  tasksCount: number;
  updatedAt: Date;
}

export interface CreateProjectData {
  title: string;
  description: string;
}

export interface ServerActionResponse<T> {
  data?: T;
  error?: string;
}
