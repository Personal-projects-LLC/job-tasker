import { Task } from '@/types/models/task';

export type SortKey = 'priority' | 'status' | 'dueDate' | 'createdAt';

export interface TaskListProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => Promise<void>;
}

export interface TaskSortOrders {
  priority: {
    urgent: number;
    high: number;
    medium: number;
    low: number;
  };
  status: {
    todo: number;
    in_progress: number;
    done: number;
    cancelled: number;
  };
}

export const sortOrders: TaskSortOrders = {
  priority: { urgent: 0, high: 1, medium: 2, low: 3 },
  status: { todo: 0, in_progress: 1, done: 2, cancelled: 3 },
};
