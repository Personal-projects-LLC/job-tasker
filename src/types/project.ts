import { Project as PrismaProject, ProjectStatus } from '@prisma/client';

export type Project = PrismaProject;
export { ProjectStatus };

export interface UpdateProjectData {
  id: string;
  title?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface CreateProjectData {
  title: string;
  description: string;
}

export interface ServerActionResponse<T> {
  data?: T;
  error?: string;
}
