import { Task } from '@/types/models/task';

export type SortKey = 'priority' | 'status' | 'dueDate' | 'createdAt';

export interface TaskListProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => Promise<void>;
}

export interface TaskSortOrders {
  priority: {
    urgent: 0;
    high: 1;
    medium: 2;
    low: 3;
  };
  status: {
    todo: 0;
    in_progress: 1;
    done: 2;
    cancelled: 3;
  };
}
