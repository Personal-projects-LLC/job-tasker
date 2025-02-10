import { TaskStatus } from '@/types/models/task';

export interface TaskStatusSelectProps {
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => Promise<void>;
  disabled?: boolean;
}

export interface StatusOption {
  value: TaskStatus;
  label: string;
  color: string;
}

export const statusOptions: StatusOption[] = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-500' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
  { value: 'done', label: 'Done', color: 'bg-green-500' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
];
