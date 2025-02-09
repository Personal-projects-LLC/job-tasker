import { CreateProjectData, CreateTaskData } from '@/types';

export interface CreateProjectParams extends CreateProjectData {
  userId: string;
}

export interface CreateTaskParams extends CreateTaskData {
  createdById: string;
}
