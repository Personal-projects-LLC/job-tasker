import { Project } from '@/types/models/project';

export interface EditProjectDialogProps {
  project: Project;
  onUpdate: (data: {
    id: string;
    title?: string;
    description?: string;
    status?: 'active' | 'completed' | 'archived';
  }) => Promise<void>;
  trigger: React.ReactNode;
}
