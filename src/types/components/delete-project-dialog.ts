import { ReactNode } from 'react';
import { ServerActionResponse } from '@/types/api';

export interface DeleteProjectDialogProps {
  readonly projectId: string;
  readonly projectTitle: string;
  readonly onDelete: (id: string) => Promise<ServerActionResponse<boolean>>;
  readonly trigger: ReactNode;
}
