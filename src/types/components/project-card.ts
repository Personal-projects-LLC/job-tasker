import { Project, ServerActionResponse } from '@/types/project';

export interface ProjectCardProps extends Project {
  readonly onDelete: (id: string) => Promise<ServerActionResponse<boolean>>;
  readonly onUpdate: (data: {
    id: string;
    title?: string;
    description?: string;
    status?: 'active' | 'completed' | 'archived';
  }) => Promise<void>;
}

// Обновленные цвета статусов, используя новые переменные темы
export const statusColors = {
  active: 'bg-success',
  completed: 'bg-info',
  archived: 'bg-secondary',
} as const;

export const statusBadgeClasses = {
  active: 'status-badge success',
  completed: 'status-badge info',
  archived: 'status-badge secondary',
} as const;

export type ProjectStatus = keyof typeof statusColors;
export type StatusColor = (typeof statusColors)[ProjectStatus];

export const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  archived: 'Archived',
} as const;
