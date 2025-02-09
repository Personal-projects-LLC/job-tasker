import { ProjectStatus as PrismaProjectStatus } from '@prisma/client';
import { Task } from './task';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: PrismaProjectStatus;
  tasksCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tasks?: Task[];
}

export interface UpdateProjectData {
  id: string;
  title?: string;
  description?: string;
  status?: PrismaProjectStatus;
}

export interface CreateProjectData {
  title: string;
  description: string;
  user: { id: string };
}

export interface ServerActionResponse<T> {
  data?: T;
  error?: string;
}
