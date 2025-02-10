import { Task } from '@/types/models/task';

export interface TaskCardProps extends Task {
  onStatusChange: (taskId: string, status: Task['status']) => Promise<void>;
}

export const priorityColors = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
} as const;

export type PriorityColor = typeof priorityColors;
