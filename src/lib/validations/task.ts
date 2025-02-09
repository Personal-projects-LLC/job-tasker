import { z } from 'zod';

export const taskSchema = {
  create: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    dueDate: z.string().nullable().optional(),
    projectId: z.string().uuid(),
    assignedToId: z.string().optional(),
  }),

  update: z.object({
    id: z.string().uuid(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['todo', 'in_progress', 'done', 'cancelled']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    dueDate: z.string().nullable().optional(),
    assignedToId: z.string().nullable().optional(),
  }),

  delete: z.object({
    id: z.string().uuid(),
  }),

  getProjectTasks: z.object({
    projectId: z.string().uuid(),
  }),
};
