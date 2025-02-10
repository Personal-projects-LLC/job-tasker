import { ProjectStatus } from '@prisma/client';
import { Task } from './task';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tasksCount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tasks?: Task[];
}
