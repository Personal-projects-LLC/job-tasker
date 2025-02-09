import { ProjectStatus } from '@prisma/client';
import { Task } from './task';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tasksCount: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tasks?: Task[];
}
