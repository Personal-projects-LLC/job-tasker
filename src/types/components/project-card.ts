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

export const statusColors = {
  active: 'bg-green-500',
  completed: 'bg-blue-500',
  archived: 'bg-gray-500',
} as const;

export type StatusColor = typeof statusColors;
