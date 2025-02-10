import { Project, ServerActionResponse } from '@/types/project';

export interface ProjectListProps {
  readonly projects?: Project[];
  readonly onDelete: (id: string) => Promise<ServerActionResponse<boolean>>;
  readonly onUpdate: (data: {
    id: string;
    title?: string;
    description?: string;
    status?: 'active' | 'completed' | 'archived';
  }) => Promise<void>;
}
